const express = require('express');
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const User = require("../../models/User")


class addToCartController{
    static cart = async (req, res) => {
        try {
            const insertitem = new Cart({
                product_id:req.body.product_id,
                user_id: req.body.user_id,
                quantity: req.body.quantity,

            });

            console.log(insertitem);

            await insertitem.save();
            return res.send({
                success: true,
                status: 200,
                message: "Item added successfully",
            });
        } 
        catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error adding unit: " + error.message,
            });
        }
    };
}


module.exports = addToCartController;