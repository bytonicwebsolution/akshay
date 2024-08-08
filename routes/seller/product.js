const router = require("express").Router();
const ProductController = require("../../controllers/seller/productController");

router.get("/list",ProductController.list);
router.get("/add", ProductController.addGet);
router.post("/add-product",ProductController.add_product);
router.get("/categories", ProductController.categories);

router.post("/edit",  ProductController.edit);
router.post("/delete",  ProductController.delete);

module.exports = router;
