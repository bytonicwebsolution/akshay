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

            const finalArray = {
                attributeSet,
                attributeValue,
            };

            res.send(finalArray);
        } catch (error) {
            res.send(error);
        }
    };
}

module.exports = getAttributeController;
