const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    },
    name: {
        type: String,
        min: 4,
        max: 30,
    },
    email: {
        type: String,
        max: 50,
    },
    phone: {
        type: String,
        max: 255,
    },
    address: {
        type: String,
        max: 255,
    },
    address2: {
        type: String,
        max: 255,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    created_at: {
        type: String,
        default: Date,
    },
    updated_at: {
        type: String,
        default: Date,
    },
});

module.exports = mongoose.model("BillingAddress", Schema);
