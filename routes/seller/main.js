const router = require("express").Router();
const MainController = require("../../controllers/seller/mainController");

router.get("/", MainController.main);

module.exports = router;
