class OrderController {
    static list = async (req, res) => {
        return res.render("seller/order");
    };
    static orders_overview = async (req, res) => {
        return res.render("seller/order-overview");
    };
}

module.exports = OrderController;