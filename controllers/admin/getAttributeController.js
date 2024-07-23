const express = require("express");
const AttributeValue = require("../../models/AttributeValue");
const AttributeSets = require("../../models/AttributeSets");

class getAttributeController {
    static getAttribute = async (req, res) => {
        try {
            const attributesetId = req.body.attribute_sets_id;

            if (!attributesetId) {
                return res.status(400).send({
                    success: false,
                    status: 400,
                    message: "Attribute Set Id is required!",
                });
            }
            let attributeValue = await AttributeValue.find({
                attribute_sets_id: attributesetId,
            });

            let attributeSet = await AttributeSets.findOne({
                _id: attributesetId,
            });

            // Creating a new object to maintain the desired order
            let orderedAttributeSet = {
                category_id: attributeSet.category_id,
                _id: attributeSet._id,
                title: attributeSet.title,
                created_at: attributeSet.created_at,
                updated_at: attributeSet.updated_at,
                __v: attributeSet.__v,
                attributeValues: attributeValue,
            };

            res.status(200).send(orderedAttributeSet);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error in getting product attribute " + error.message,
            });
        }
    };
}

module.exports = getAttributeController;
