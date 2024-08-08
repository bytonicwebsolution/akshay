const router = require("express").Router();
const MarketingController = require("../../controllers/seller/marketingController");

router.get("/coupons",MarketingController.coupons);


module.exports = router;
