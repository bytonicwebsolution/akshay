const router = require("express").Router();
const ApiController = require("../../controllers/website/apiController");

router.get("/get_all_attributes", ApiController.getAllAttribute);
router.get("/get_all_brands", ApiController.getAllBrands);
router.get("/get_all_categories", ApiController.getAllCategories)
router.post("/add_product", ApiController.add_product);
router.post("/get_all_products", ApiController. get_all_products);

module.exports = router;
