const router = require("express").Router();
const ApiController = require("../../controllers/website/apiController");

router.get("/get_all_attributes", ApiController.getAllAttribute);
router.get("/get_all_brands", ApiController.getAllBrands);
router.get("/get_all_categories", ApiController.getAllCategories)
router.post("/add_product", ApiController.add_product);

module.exports = router;
