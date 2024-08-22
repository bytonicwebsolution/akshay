const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const SettingsController = require("../../controllers/admin/bannerController");

router.get("/banner/list", NotLoggedIn, SettingsController.list);
router.post("/banner/add", NotLoggedIn, SettingsController.add);
router.post("/banner/edit/:id", NotLoggedIn, SettingsController.edit);
router.post("/banner/delete/:id", NotLoggedIn, SettingsController.delete);

module.exports = router;
