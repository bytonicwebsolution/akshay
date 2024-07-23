const express = require("express");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const ProductStock = require("../../models/ProductStock");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

class addToCartController {
    static addCart = async (req, res) => {
        try {
            if (!req.body.sku) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "SKU is required!",
                });
            }

            var token = req.body.token;
            const payload = jwt.decode(token, process.env.TOKEN_SECRET);
            const userId = payload.id;

            // Find the ProductStock document by product_id
            const stockData = await ProductStock.findOne({
                product_id: req.body.product_id,
            });

            const findquantityCount = await Cart.find({
                sku: req.body.sku,
                product_id: req.body.product_id,
            });

            let quantityCount = 0;

            for (let i = 0; i < findquantityCount.length; i++) {
                quantityCount += findquantityCount[i].quantity;
            }


            if (!stockData) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "product_id not found in ProductStock",
                });
            }

            let skuArray = stockData.sku;
            let skuIndex = 0;

            skuIndex = skuArray.findIndex((sku) => sku === req.body.sku);

            if (skuIndex === -1) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "SKU is not Present in Product Stock",
                });
            }
            const insertitem = new Cart({
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                user_id: userId,
                sku: req.body.sku,
                product_stock_id: stockData._id, // Store the stock document's _id
            });
            if (
                Number(req.body.quantity) + Number(quantityCount)>
                stockData.current_stock[skuIndex]
            ) {

                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: "Product is Out of Stock!",
                });
            }

            // CartData
            const cartData = await Cart.find({
                user_id: userId,
                product_id: req.body.product_id,
                sku: req.body.sku,
            });
            if (cartData.length == 0) {
                await insertitem.save();
                return res.send({
                    success: true,
                    status: 200,
                    message: "Item is add to cart successfully!",
                });
            }

            // If user is already present in the Cart then Update the quantity of the product in the Cart

            if (cartData) {
                const updateitem = await Cart.findOneAndUpdate(
                    { sku: req.body.sku },
                    {
                        $set: {
                            quantity: Number(req.body.quantity),
                        },
                    },
                    { new: true }
                );

                if (
                    Number(req.body.quantity) + Number(quantityCount) >
                    stockData.current_stock[skuIndex]
                ) {
                    return res.status(400).send({
                        success: false,
                        status: 400,
                        message: "Product is Out of Stock!",
                    });
                }
                await updateitem.save();
                return res.status(200).send({
                    success: true,
                    status: 200,
                    message: "Cart is Update!",
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error in getting Cart  " + error.message,
            });
        }
    };

    static getCart = async (req, res) => {
        try {
            let cart = [];
            var token = req.body.token;

            const payload = jwt.decode(token, process.env.TOKEN_SECRET);

            const userId = payload.id;
            cart = await Cart.find({ user_id: userId });

            res.status(200).send(cart);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error in getting Cart  " + error.message,
            });
        }
    };
}

module.exports = addToCartController;
