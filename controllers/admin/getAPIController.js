const Transaction = require("../../models/Transaction");
const BillingAddress = require("../../models/BillingAddress");
const OrderHistory = require("../../models/OrderHistory");
const Order = require("../../models/Order");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { query } = require("express");
class GetAPIController {
    static getOrders = async (req, res) => {
        try {
            var token = req.body.token;
            const payload = jwt.decode(token, process.env.TOKEN_SECRET);
            const userId = payload.id;

            let orders;

            orders = await Order.find({ user_id: userId });

            res.send(orders);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error in getting orders " + error.message,
            });
        }
    };

    static getdetails = async (req, res) => {
        try {
            const order_id = req.body.order_id;

            let finalArray = {};

            if (order_id) {
                const transactions = await Transaction.find({
                    order_id: order_id,
                });

                const billingAddresses = await BillingAddress.find({
                    order_id: order_id,
                }).exec();

                const orderHistories = await OrderHistory.find({
                    order_id: order_id,
                }).exec();

                finalArray = {
                    transactions,
                    billingAddresses,
                    orderHistories,
                };
            }

            res.status(200).send(finalArray);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error in getting Order details " + error.message,
            });
        }
    };
}

module.exports = GetAPIController;
