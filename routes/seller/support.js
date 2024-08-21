const router = require("express").Router();

const SupportController = require("../../controllers/seller/supportController");

router.get("/list", SupportController.list);
router.post("/add", SupportController.add);
router.post("/delete/:id", SupportController.delete);

module.exports = router;
