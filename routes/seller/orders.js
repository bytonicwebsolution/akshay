const router = require("express").Router();

const OrderController = require("../../controllers/seller/orderController");

router.get("/list", OrderController.list);
router.get("/order-overview", OrderController.orders_overview)

module.exports = router;