const router = require("express").Router();
const addToCart = require("../../controllers/admin/addToCartController");


router.post("/addcart", addToCart.addCart);
router.get("/getcart", addToCart.getCart);


module.exports = router;
