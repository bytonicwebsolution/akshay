const Transaction = require("../../models/Transaction");
const BillingAddress = require("../../models/BillingAddress");
const OrderHistory = require("../../models/OrderHistory");
const Order = require("../../models/Order");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
class GetAPIController {

    static getOrders = async (req, res) => {
        try {
            var token = req.body.token;
            console.log(token);
            const payload = jwt.decode(token, process.env.TOKEN_SECRET);

            console.log(payload);
            const userId = await Order.findById(payload.id);

            let orders;

            if (userId) {
                orders = await Order.find({ user_id: user_Id });
            } else {
                orders = await Order.find();
            }
            res.json(orders);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    static getdetails = async (req, res) => {
        try {
            var token = req.body.token;
            console.log(token);
            const payload = jwt.decode(token, process.env.TOKEN_SECRET);

            const userId = await User.findById(payload.id);
            console.log(userId);

            const USER_ID = userId._id;

            let finalArray = {};

            if (USER_ID) {
                const transactions = await Transaction.find({
                    user_id: USER_ID,
                });
                // find transactionIds in order_id in Transaction
                const transactionIds = transactions.map(
                    (Transaction) => Transaction.order_id
                );

                const billingAddresses = await BillingAddress.find({
                    order_id: { $in: transactionIds },
                }).exec();

                const billingOrderIds = billingAddresses.map(
                    (BillingAddress) => BillingAddress.order_id._id
                );
                const orderHistories = await OrderHistory.find({
                    order_id: { $in: billingOrderIds },
                }).exec();

                finalArray = {
                    transactions,
                    billingAddresses,
                    orderHistories,
                };
            }

            res.send(finalArray);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
}

module.exports = GetAPIController;
