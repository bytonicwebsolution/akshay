const dashboardS = require("./routes/seller/dashboard");
const product = require("./routes/seller/product");
const orders = require("./routes/seller/orders");
const reports = require("./routes/seller/reports");
const marketing = require("./routes/seller/marketing");
const payout = require("./routes/seller/payout");
const shopSettings = require("./routes/seller/shop_settings");
const support = require("./routes/seller/support");
const SellerRoutes = (app) => {
    app.use("/seller", dashboardS);
    app.use("/seller/product", product);
    app.use("/seller/orders", orders);
    app.use("/seller/reports", reports);
    app.use("/seller/marketing", marketing);
    app.use("/seller/payout", payout);
    app.use("/seller/shop-settings", shopSettings);
    app.use("/seller/support", support);
};

module.exports = SellerRoutes;
