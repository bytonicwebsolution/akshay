const express = require("express");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const ProductStock = require("../../models/ProductStock")
const User = require("../../models/User");
const jwt = require("jsonwebtoken");


class addToCartController {
    static addCart = async (req, res) => {
        try {
            // Find the stock document by product_id
            const stockData = await ProductStock.findOne({ product_id: req.body.product_id }, { projection: { _id: 1 } });

            if (!stockData) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "Product not found in ProductStock",
                });
            }

            const insertitem = new Cart({
                product_id: req.body.product_id,
                user_id: req.body.user_id,
                quantity: req.body.quantity,
                product_stock_id: stockData._id // Store the stock document's _id
            });

            console.log(insertitem);


            await insertitem.save();
            return res.send({
                success: true,
                status: 200,
                message: "Item added successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error adding unit: " + error.message,
            });
        }
    };

    static getCart = async (req, res) => {
        try {
            var token = req.body.token;
            console.log(token);
            const payload = jwt.decode(token, process.env.TOKEN_SECRET);

            console.log(payload.id);
            const cart = await Cart.find().populate("product_stock_id product_id user_id")
            res.send(cart);
        } catch (error) {}
    };
}

module.exports = addToCartController;
