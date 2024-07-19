const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        // required: true
    },

    slug: {
        type: String,
        required: true,
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    meta_title: {
        type: String,
    },
    meta_description: {
        type: String,
    },
    is_featured:{
        type: Boolean,
        default:false
    },
    commision_type: {
        type: String,
        default: null,
    },
    commision: {
        type: Number,
        default: 0,
    },
    status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        default: null,
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

module.exports = mongoose.model("Category", Schema);
