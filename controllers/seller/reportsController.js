class ReportsController {
    static product_sale = async (req, res) => {
        return res.render("seller/product-sale");
    };
    static product_stock = async (req, res) => {
        return res.render("seller/product-stock");
    };
    static product_wishlist = async (req, res) => {
        return res.render("seller/product-wishlist");
    };
    static commision_history = async (req, res) => {
        return res.render("seller/commision-history");
    };
}

module.exports = ReportsController;