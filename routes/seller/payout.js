const router = require("express").Router();

const PayoutController = require("../../controllers/seller/payoutController");

router.get("/list", PayoutController.list);

module.exports = router;
