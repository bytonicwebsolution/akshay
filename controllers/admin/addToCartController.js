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

            // Testcase-01 : Find the ProductStock document by product_id
            const stockData = await ProductStock.find({
                product_id: req.body.product_id,
            });

            if (!stockData[0]) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "product_id not found in ProductStock",
                });
            }
            // find the index of the sku in productStocks which equals to the req.product.sku
            let skuArray = stockData[0].sku;
            let skuIndex = 0;

            for (skuIndex = 0; skuIndex < skuArray.length; skuIndex++) {
                if (skuArray[skuIndex] === req.body.sku) {
                    break;
                }
            }

            if (skuIndex === skuArray.length) {
                return res.status(404).send({
                    success: false,
                    status: 404,
                    message: "sku not found in ProductStock",
                });
            }


            

            // Testcase-04 : if product_id and sku present in the productStocks then we proceed on Insert and Update functionality.
            /* Testcase-03 : I want to check sku and user_id is already present or not in the collection, 
               if present then update and else insert new document
            */
            if (
                skuArray[skuIndex] == req.body.sku &&
                stockData[0].product_id == req.body.product_id
            ) {
                
                const insertitem = new Cart({
                    product_id: req.body.product_id,
                    user_id: userId,
                    quantity: req.body.quantity,
                    sku: req.body.sku,
                    product_stock_id: stockData._id, // Store the stock document's _id
                });
                const cartData = await Cart.find({
                    user_id: userId,
                    sku: req.body.sku,
                });

                

                if (cartData) {
                    const updateitem = await Cart.findOneAndUpdate(
                        { sku: req.body.sku },
                        {
                            $set: {
                                quantity:
                                    cartData[0].quantity +
                                    Number(req.body.quantity),
                            },
                        },
                        { new: true }
                    );

                    
                    /* Testcase-05 : if req.body.sku is present in the ProductStock collection, 
                then find the index of an array and accordinig to index find the current stock */
                    if (
                        cartData[0].quantity + req.body.quantity >
                        stockData[0].current_stock[skuIndex]
                    ) {
                        return res.status(400).send({
                            success: false,
                            status: 400,
                            message: "Quantity is greater than current stock",
                        });
                    }
                    await updateitem.save();
                    return res.status(200).send({
                        success: true,
                        status: 200,
                        message: "Product Update to cart",
                    });
                } else {
                    await insertitem.save();
                    return res.send({
                        success: true,
                        status: 200,
                        message: "Item added successfully",
                    });
                }
            }
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

            const payload = jwt.decode(token, process.env.TOKEN_SECRET);

            const cart = await Cart.find().populate(
                "product_stock_id product_id user_id"
            );
            res.send(cart);
        } catch (error) {}
    };
}

module.exports = addToCartController;
