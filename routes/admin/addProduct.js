const addProductController = require("../../controllers/admin/addProductController");
const router = require("express").Router();
router.post("/add", addProductController.add);

module.exports = router;
