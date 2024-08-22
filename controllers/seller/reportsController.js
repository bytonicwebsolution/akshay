const { model } = require("mongoose");
const Wishlist = require("../../models/Wishlist");
const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductStock = require("../../models/ProductStock");
const OrderHistory = require("../../models/OrderHistory");

class ReportsController {
    static product_sale = async (req, res) => {

        try {

            const products = await Product.find({
                vendor_id: req.session.seller._id,
            })
                .populate("category_id")
                .sort({ created_at: -1 });

            const orderhistory = await OrderHistory.find({product_id:products._id});




            return res.render("seller/product-sale");
        } catch (error) {
            console.error("Error fetching Product List:", error);
            return res.status(500).send({
                message: "Error fetching Product List: " + error.message,
            });
        }

    };
    static product_stock = async (req, res) => {
        try { 
            const products = await Product.find({
                vendor_id: req.session.seller._id,
            })
                .populate("category_id")
                .sort({ created_at: -1 });

            // Calculate stock for each product
            const productsWithStock = await Promise.all(
                products.map(async (product) => {
                    let totalStock = 0;
                    if (product.variant) {
                        const productStocks = await ProductStock.find({
                            product_id: product._id,
                        });
                        totalStock = productStocks.reduce(
                            (sum, stock) =>
                                sum +
                                stock.current_stock.reduce((a, b) => a + b, 0),
                            0
                        );
                    } else {
                        totalStock = await ProductStock.findOne({
                            product_id: product._id,
                        });
                        totalStock = totalStock
                            ? totalStock.current_stock.reduce(
                                  (a, b) => a + b,
                                  0
                              )
                            : 0;
                    }
                    return {
                        ...product._doc,
                        totalStock,
                    };
                })
            );

            return res.render("seller/product-stock", {
                products: productsWithStock,
            });
        } catch (error) {
            console.error("Error fetching Product List:", error);
            return res.status(500).send({
                message: "Error fetching Product List: " + error.message,
            });
        }
    };
    static product_wishlist = async (req, res) => {
        const seller_id = req.session.seller._id;
        const wishlist = await Wishlist.find({ user_id: seller_id })
            .populate({
                path: "product_id",
                populate: {
                    path: "category_id",
                    model: "Category",
                    select: "name",
                },
            })
            .exec();
        return res.render("seller/product-wishlist", { wishlist });
    };
    static commission_history = async (req, res) => {
        return res.render("seller/commission-history");
    };
}

module.exports = ReportsController;
