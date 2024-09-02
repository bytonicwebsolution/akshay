const jwt = require("jsonwebtoken");
const Order = require("../../models/Order");
const OrderHistory = require("../../models/OrderHistory");
const User = require("../../models/User");
const BillingAddress = require("../../models/BillingAddress");
const UserBillingAddress = require("../../models/UserBillingAddress");
const Transaction = require("../../models/Transaction");
const Coupon = require("../../models/Coupon");
const razorpay = require("../../config/razorpay");
const Status = require("../../models/Status");
const Product = require("../../models/Product");
const ProductStock = require("../../models/ProductStock");
const config = require("../../config/createStatus");

const incrementInvoiceNumber = (lastInvoiceNumber) => {
    const [prefix, number] = lastInvoiceNumber.split("-");
    const incrementedNumber = (parseInt(number) + 1)
        .toString()
        .padStart(number.length, "0");
    return `${prefix}-${incrementedNumber}`;
};

class PaymentController {
    static createOrder = async (req, res) => {
        try {
            const {
                items,
                billingAddress,
                additional_info,
                coupon_code,
                save_address,
            } = req.body;
            const token = req.body.token;

            if (!token) {
                return res.status(400).send({
                    status: 400,
                    key: "token",
                    message: "token is required",
                });
            }

            const payload = jwt.decode(token, process.env.TOKEN_SECRET);
            const user = await User.findById(payload.id);
            if (!user) return res.status(401).send("User not found");
            req.login_user = user;

            let totalAmount = 0;
            let subTotal = 0;
            let orderItems = [];
            let couponDiscount = 0;

            for (let item of items) {
                // Validate required fields
                if (!item.product_id || !item.sku || !item.quantity) {
                    return res.status(400).send({
                        status: 400,
                        key: !item.product_id
                            ? "product_id"
                            : !item.sku
                            ? "sku"
                            : "quantity",
                        message: !item.product_id
                            ? "product_id is required"
                            : !item.sku
                            ? "sku is required"
                            : "quantity is required",
                    });
                }

                const product = await Product.findById(item.product_id);
                if (!product) {
                    return res.status(400).send({
                        message: "Product not found",
                    });
                }

                // Query ProductStock
                const productStock = await ProductStock.findOne({
                    product_id: item.product_id,
                    sku: item.sku,
                });

                if (!productStock) {
                    return res.status(400).send({
                        message: `Product stock not found for product ID: ${item.product_id} with SKU: ${item.sku}`,
                    });
                }

                // Ensure stock is sufficient
                const skuIndex = productStock.sku.indexOf(item.sku);
                if (
                    skuIndex === -1 ||
                    productStock.current_stock[skuIndex] < item.quantity
                ) {
                    return res.status(400).send({
                        message: `The current stock for product ID (${item.product_id}) is only ${productStock.current_stock[skuIndex]} available.`,
                    });
                }

                // Update stock
                productStock.current_stock[skuIndex] -= item.quantity;
                await ProductStock.updateOne(
                    { _id: productStock._id },
                    {
                        $set: {
                            current_stock: productStock.current_stock,
                        },
                    }
                );

                // Calculate total price
                let totalPrice = 0;
                let specialDiscountApplied = false;
                let specialDiscountValue = null;

                if (
                    product.special_discount &&
                    product.special_discount_period &&
                    !product.variant
                ) {
                    const currentDate = new Date();
                    const [startDateString, endDateString] =
                        product.special_discount_period.split(" - ");

                    const parseDate = (dateString) => {
                        const [datePart, timePart, period] =
                            dateString.split(" ");
                        const [day, month, year] = datePart.split("/");
                        const [hour, minute] = timePart.split(":");
                        let hours = parseInt(hour, 10);
                        if (period === "PM" && hours !== 12) {
                            hours += 12;
                        }
                        if (period === "AM" && hours === 12) {
                            hours = 0;
                        }
                        return new Date(
                            `${year}-${month}-${day}T${hours
                                .toString()
                                .padStart(2, "0")}:${minute}:00Z`
                        );
                    };

                    const startDate = parseDate(startDateString);
                    const endDate = parseDate(endDateString);

                    if (currentDate >= startDate && currentDate <= endDate) {
                        totalPrice = product.special_discount * item.quantity;
                        specialDiscountApplied = true;
                        specialDiscountValue = product.special_discount;
                    } else {
                        totalPrice = product.unit_price * item.quantity;
                    }
                } else if (product.variant || item.attribute_value_id) {
                    totalPrice = productStock.price[skuIndex] * item.quantity;
                } else {
                    totalPrice = product.unit_price * item.quantity;
                }

                totalAmount += totalPrice;
                subTotal += totalPrice;

                const orderHistory = await OrderHistory.create({
                    order_id: null,
                    product_id: item.product_id,
                    product_name: product.product_name,
                    sku: item.sku,
                    attribute_value_id: item.attribute_value_id || [],
                    variants: item.variants
                        ? item.variants.map((v) => JSON.stringify(v))
                        : [],
                    unit_price: item.attribute_value_id
                        ? productStock.price[skuIndex]
                        : product.unit_price,
                    quantity: item.quantity,
                    special_discount: specialDiscountValue,
                    sub_total: totalPrice,
                });
                orderItems.push(orderHistory);

                await ProductStock.updateOne(
                    { _id: productStock._id },
                    {
                        $set: {
                            current_stock: productStock.current_stock,
                        },
                    }
                );
            }

            // Apply coupon discount after calculating totalAmount if coupon_code is provided
            if (coupon_code) {
                const coupon = await Coupon.findOne({
                    coupon_code,
                    date_range: { $exists: true, $ne: null },
                });
                if (!coupon) {
                    return res.status(400).send({
                        status: 400,
                        message: "Invalid coupon code",
                    });
                }

                const currentDate = new Date();
                const [startDateString, endDateString] =
                    coupon.date_range.split(" - ");

                const parseDate = (dateString) => {
                    const [datePart, timePart, period] = dateString.split(" ");
                    const [day, month, year] = datePart.split("/");
                    const [hour, minute] = timePart.split(":");
                    let hours = parseInt(hour, 10);
                    if (period === "PM" && hours !== 12) {
                        hours += 12;
                    }
                    if (period === "AM" && hours === 12) {
                        hours = 0;
                    }
                    return new Date(
                        `${year}-${month}-${day}T${hours
                            .toString()
                            .padStart(2, "0")}:${minute}:00Z`
                    );
                };

                const startDate = parseDate(startDateString);
                const endDate = parseDate(endDateString);

                if (currentDate < startDate || currentDate > endDate) {
                    return res.status(400).send({
                        status: 400,
                        message: "Coupon code expired",
                    });
                }

                if (coupon.type === "percentage") {
                    couponDiscount = (coupon.discount / 100) * totalAmount;
                } else if (coupon.type === "flat") {
                    couponDiscount = coupon.discount;
                } else {
                    return res.status(400).send({
                        status: 400,
                        message: "Invalid coupon type",
                    });
                }

                if (couponDiscount > 0) {
                    totalAmount -= couponDiscount;
                    totalAmount = Math.max(totalAmount, 0); // Ensure total amount doesn't go below 0
                    await Coupon.updateOne(
                        { coupon_code },
                        { $set: { is_applied: true } }
                    );
                }
            }

            const lastInvoiceNumber = await Order.findOne(
                {},
                { order_no: 1, _id: 0 }
            ).sort({ order_no: -1 });
            let newInvoiceNumber = "INV-0001";
            if (lastInvoiceNumber) {
                newInvoiceNumber = incrementInvoiceNumber(
                    lastInvoiceNumber.order_no
                );
            }
            const options = {
                amount: totalAmount * 100, // amount in the smallest currency unit
                currency: "INR",
                receipt: newInvoiceNumber,
            };

            const razorpayOrder = await razorpay.orders.create(options);

            await config.creatOrderStatus();
            let order_status = await Status.findOne({
                name: { $regex: new RegExp("^created$", "i") },
                type: { $regex: new RegExp("^order$", "i") },
            });
            const order = await Order.create({
                user_id: req.login_user ? req.login_user._id : "",
                order_no: options.receipt,
                order_total_amount: totalAmount,
                order_discount_amount: couponDiscount ? couponDiscount : 0,
                coupon_code: coupon_code ? coupon_code : null,
                order_subtotal_amount: subTotal,
                additional_info: additional_info,
                status_id: order_status._id,
            });

            orderItems = await Promise.all(
                orderItems.map(async (item) => {
                    item.order_id = order._id;
                    await item.save();
                    return item;
                })
            );

            // Check if _id exists in billingAddress and delete it
            if (billingAddress._id) {
                delete billingAddress._id;
            }
            const billingAddr = new BillingAddress({
                ...billingAddress,
                order_id: order._id,
            });
            await billingAddr.save();

            if (save_address) {
                const userBillingAddress = new UserBillingAddress({
                    ...billingAddress,
                    user_id: req.login_user._id,
                });
                await userBillingAddress.save();
            }

            await config.creatTransactionStatus();
            let transaction_status = await Status.findOne({
                name: { $regex: new RegExp("^pending$", "i") },
                type: { $regex: new RegExp("^transaction$", "i") },
            });
            const transaction = await Transaction.create({
                order_id: order._id,
                user_id: req.login_user ? req.login_user._id : "",
                orderId: razorpayOrder.id,
                payment_id: null, // Will be updated later
                signature: null, // Will be updated later
                amount: totalAmount,
                currency: "INR",
                status_id: transaction_status._id,
            });

            res.send({
                orderId: razorpayOrder.id,
                order_id: order._id,
                amount: totalAmount,
                currency: "INR",
            });
        } catch (error) {
            console.error("Error in order", error);
            return res.status(500).send({
                message: "Something went wrong, please try again later",
                error: error.message,
            });
        }
    };

    static checkout = async (req, res) => {
        try {
            const {
                orderId,
                payment_id,
                // signature,
                order_id,
            } = req.body;

            // const generated_signature = crypto
            //     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            //     .update(orderId + "|" + payment_id)
            //     .digest("hex");

            // if (generated_signature !== signature) {
            //     return res.status(400).send({ message: "Invalid signature" });
            // }

            await config.creatTransactionStatus();
            let status = await Status.findOne({
                name: { $regex: new RegExp("^completed$", "i") },
                type: { $regex: new RegExp("^transaction$", "i") },
            });
            await Transaction.updateOne(
                { orderId: orderId },
                {
                    $set: {
                        payment_id: payment_id,
                        // signature: signature,
                        status_id: status._id,
                    },
                }
            );

            await config.creatOrderStatus();
            let order_status = await Status.findOne({
                name: { $regex: new RegExp("^completed$", "i") },
                type: { $regex: new RegExp("^order$", "i") },
            });
            await Order.updateOne(
                { _id: order_id },
                {
                    $set: {
                        status_id: order_status._id,
                    },
                }
            );
            await OrderHistory.updateOne(
                { order_id: order_id },
                {
                    $set: {
                        orderId: orderId,
                    },
                }
            );
            res.send({
                status: 200,
                message: "Payment verified successfully",
                orderId: orderId,
                payment_id: payment_id,
            });
        } catch (error) {
            console.log("Error in checkout", error);
            return res.status(500).send({
                message: "Something went wrong, please try again later",
                error: error.message,
            });
        }
    };
}

module.exports = PaymentController;
