const { model } = require("mongoose");
const Wishlist = require("../../models/Wishlist");

class ReportsController {
    static product_sale = async (req, res) => {
        return res.render("seller/product-sale");
    };
    static product_stock = async (req, res) => {
        return res.render("seller/product-stock");
    };
    static product_wishlist = async (req, res) => {
        const seller_id = req.session.seller._id;
        const wishlist = await Wishlist.find({ user_id: seller_id })
            .populate({
                path: "product_id",
                populate: {
                    path: "category_id",
                    model: "Category",
                    select: "name",
                },
            })
            .exec();
        return res.render("seller/product-wishlist", { wishlist });
    };
    static commision_history = async (req, res) => {
        return res.render("seller/commision-history");
    };
}

module.exports = ReportsController;
