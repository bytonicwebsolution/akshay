const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const ProductReviewController = require("../../controllers/admin/productReviewController");


router.get("/list", ProductReviewController.list);
router.post("/show", ProductReviewController.showRatingsStatus);
router.post("/hide", ProductReviewController.hideRatingsStatus);
router.post("/filter", ProductReviewController.filterRatings);

module.exports = router;