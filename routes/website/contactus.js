const router = require("express").Router();
const ContactusController = require("../../controllers/website/contactusController");
const { NotLoggedIn } = require("../../middlewares/WebAuth");

router.post("/contactus", ContactusController.contactus);
router.get("/get_contactus", ContactusController.get_contactus);

module.exports = router;
