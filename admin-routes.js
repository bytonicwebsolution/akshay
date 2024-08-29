const mainR = require("./routes/admin/main");
const dashboardR = require("./routes/admin/dashboard");
const authR = require("./routes/admin/auth");
const category = require("./routes/admin/category");
const status = require("./routes/admin/status");
const attributeSets = require("./routes/admin/attributeSets");
const attributeValues = require("./routes/admin/attributeValues");
const brand = require("./routes/admin/brand");
const product = require("./routes/admin/product");
const user = require("./routes/admin/user");
const vendor = require("./routes/admin/vendor");
const order = require("./routes/admin/order");
const unit = require("./routes/admin/unit");
const static_pagesR = require("./routes/admin/static_pages");
const faqR = require("./routes/admin/faq");
const coupon = require("./routes/admin/coupon");
const sliderR = require("./routes/admin/slider");
const contactusR = require("./routes/admin/contactus");
const staffR = require("./routes/admin/staff");
const settingsR = require("./routes/admin/settings");
const productReview = require("./routes/admin/product-reviews")

const AdminRoutes = (app) => {
    app.use("/", mainR);
    app.use("/admin", dashboardR);
    app.use("/admin", authR);
    app.use("/admin/category", category);
    app.use("/admin/status", status);
    app.use("/admin/attribute", attributeSets);
    app.use("/admin/attribute-values", attributeValues);
    app.use("/admin/product-review", productReview);
    app.use("/admin/brand", brand);
    app.use("/admin/product", product);
    app.use("/admin/user", user);
    app.use("/admin/vendor", vendor);
    app.use("/admin/order", order);
    app.use("/admin/unit", unit);
    app.use("/admin/static-pages", static_pagesR);
    app.use("/admin/faq", faqR);
    app.use("/admin/coupon", coupon);
    app.use("/admin/slider", sliderR);
    app.use("/admin/contactus", contactusR);
    app.use("/admin/staff", staffR);
    app.use("/admin", settingsR);
};

module.exports = AdminRoutes;
