const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const SettingsController = require("../../controllers/admin/settingsController");

router.get("/banner/list", NotLoggedIn, SettingsController.list);
router.post("/banner/add", NotLoggedIn, SettingsController.addBanner);
router.get("/settings_view", NotLoggedIn, SettingsController.settings_view);
router.post("/web-settings", NotLoggedIn, SettingsController.webSettings);

module.exports = router;
