const router = require('express').Router();
const GetAttributeController = require("../../controllers/admin/getAttributeController");

router.get("/get-product-attributes", GetAttributeController.getAttribute);


module.exports = router;
