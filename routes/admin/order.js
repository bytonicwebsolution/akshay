const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const OrderController = require("../../controllers/admin/orderController");

router.get("/list", NotLoggedIn, OrderController.list);
router.get("/details/:id", NotLoggedIn, OrderController.order_overview);

module.exports = router;
