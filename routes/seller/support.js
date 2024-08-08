const router = require("express").Router();

const SupportController = require("../../controllers/seller/supportController");

router.get("/list", SupportController.list);

module.exports = router;
