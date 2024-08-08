class MarketingController {
    static coupons = async (req, res) => {
        return res.render("seller/coupons");
    };
}

module.exports = MarketingController;