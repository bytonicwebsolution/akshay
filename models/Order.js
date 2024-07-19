const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true,
    },
    order_no: {
        type: String,
    },
    order_date: {
        type: String,
    },
    order_total_amount: {
        type: Number,
    },
    order_discount_amount: {
        type: Number,
    },
    coupon_code: {
        type: String,
    },
    order_subtotal_amount: {
        type: Number,
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

module.exports = mongoose.model("Order", orderSchema);

// There are 4 collection, I have to populate the all the data using user_id, write only the populate code, dont write again all the modals