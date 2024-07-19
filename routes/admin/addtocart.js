const router = require("express").Router();
const addToCart = require("../../controllers/admin/addToCartController");

router.post("/cart", addToCart.cart);

module.exports = router;
