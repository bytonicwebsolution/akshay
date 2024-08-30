const Rating = require("../../models/Rating");
const Status = require("../../models/Status");
class ProductReviewController {
    static list = async (req, res) => {
        try {
            const ratings = await Rating.find()
                .sort({ created_at: -1 })
                .populate("product_id")
                .populate("user_id")
                .populate("status_id");

            return res.render("admin/product-review", {
                ratings,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send("An error occurred while fetching ratings");
        }
    };

    static showRatingsStatus = async (req, res) => {
        try {
            const { ids } = req.body;

            const showStatus = await Status.findOne({
                name: { $regex: new RegExp("^show$", "i") },
                type: { $regex: new RegExp("^rating$", "i") },
            });

            if (!showStatus) {
                return res
                    .status(404)
                    .json({ status: 404, message: "Show status not found." });
            }
            await Rating.updateMany(
                { _id: { $in: ids } },
                { status_id: showStatus._id }
            );

            res.status(200).json({
                status: 200,
                message: "Ratings status updated to 'show' successfully.",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 500,
                message: "An error occurred while updating ratings status.",
            });
        }
    };

    static hideRatingsStatus = async (req, res) => {
        try {
            const { ids } = req.body;
            const hideStatus = await Status.findOne({
                name: { $regex: new RegExp("^hide$", "i") },
                type: { $regex: new RegExp("^rating$", "i") },
            });

            if (!hideStatus) {
                return res
                    .status(404)
                    .json({ status: 404, message: "Hide status not found." });
            }

            await Rating.updateMany(
                { _id: { $in: ids } },
                { status_id: hideStatus._id }
            );

            res.status(200).json({
                status: 200,
                message: "Ratings status updated to 'hide' successfully.",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                status: 500,
                message: "An error occurred while updating ratings status.",
            });
        }
    };

    static filterRatings = async (req, res) => {
        try {
            const { status, rating } = req.body;
            console.log(status, rating);
            let ratings;

            const statusDoc = await Status.find({
                name: { $regex: new RegExp(`^${status}$`, "i") },
                type: { $regex: new RegExp("^rating$", "i") },
            });

            console.log(statusDoc);
            if (!status) {
                ratings = await Rating.find({
                    rating: rating,
                })
                    .populate("product_id")
                    .populate("user_id")
                    .populate("status_id");
            } else if (!rating) {
                ratings = await Rating.find({
                    status_id: statusDoc[0]._id,
                })
                    .populate("product_id")
                    .populate("user_id")
                    .populate("status_id");
            }
            else{
                ratings = await Rating.find({
                    rating: rating,
                    status_id: statusDoc[0]._id,
                })
                    .populate("product_id")
                    .populate("user_id")
                    .populate("status_id");
            }

            return res.status(200).json({ ratings });
        } catch (error) {
            console.error("Error filtering ratings:", error);
            res.status(500).json({ message: "Error filtering ratings." });
        }
    };
}

module.exports = ProductReviewController;
