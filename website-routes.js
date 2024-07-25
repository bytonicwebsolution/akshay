const website = require("./routes/website/website");
const webAuth = require("./routes/website/webAuth");
const vendor = require("./routes/website/vendor");
const apiR = require("./routes/website/api");
const contactR = require("./routes/website/contactus")

const WebsiteRoutes = (app) => {
    app.use("/website", website);
    app.use("/web/user", webAuth);
    app.use("/web/vendor", vendor);
    app.use("/api", apiR)
    app.use("/api", contactR)
};

module.exports = WebsiteRoutes;
