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
const unit = require("./routes/admin/unit");
const getAPI = require("./routes/admin/getAPI");
const addToCart = require("./routes/admin/addtocart");
const addProduct = require("./routes/admin/addProduct");
const getAttribute = require("./routes/admin/getAttribute");


const AdminRoutes = (app) => {
    app.use("/", mainR);
    app.use("/admin", dashboardR);
    app.use("/admin", authR);
    app.use("/admin/category", category);
    app.use("/admin/status", status);
    app.use("/admin/attribute", attributeSets);
    app.use("/admin/attribute-values", attributeValues);
    app.use("/admin/brand", brand);
    app.use("/admin/product", product);
    app.use("/admin/user", user);
    app.use("/admin/vendor", vendor);
    app.use("/admin/unit", unit);
    app.use("/admin/getapi", getAPI);
    app.use("/admin/addtocart", addToCart);
    app.use("/admin/add-product", addProduct)
    app.use("/admin/getattributes", getAttribute);
};

module.exports = AdminRoutes;
