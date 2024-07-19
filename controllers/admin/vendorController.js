const User = require("../../models/User");
const Vendor = require("../../models/Vendor");
// const Coupon = require("../../models/Coupon");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const root = process.cwd();

require("dotenv").config;
const Status = require("../../models/Status");

// Set storage engine for users
const storage1 = multer.diskStorage({
    destination: path.join(root, "/public/dist/users"),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`);
    },
});

// Set storage engine for vendors
const storage2 = multer.diskStorage({
    destination: path.join(root, "/public/dist/vendor"),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`);
    },
});

// Init upload for users
const upload = multer({
    storage: storage1,
    limits: { fileSize: 1000000 },
}).fields([{ name: "image" }]);

// Init upload for vendors
const upload2 = multer({
    storage: storage2,
    limits: { fileSize: 1000000 },
}).fields([
    { name: "aadhar_front_photo" },
    { name: "aadhar_back_photo" },
    { name: "pan_front_photo" },
    { name: "signature" },
]);

class VendorController {
    static list = async (req, res) => {
        let statuses = await Status.find().sort({
            created_at: -1,
        });
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const startIndex = (page - 1) * limit;
        try {
            const users = await User.find({ user_type: "v" })
                .skip(startIndex)
                .limit(limit)
                .populate("status_id");
            const totalUsers = await User.countDocuments();
            const totalPages = Math.ceil(totalUsers / limit);
            return res.render("admin/vendor", {
                statuses,
                users,
                currentPage: page,
                totalUsers,
                totalPages,
            });
        } catch (error) {
            return res
                .status(500)
                .send("Error fetching vendors: " + error.message);
        }
    };

    static add = async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: err });
            }

            const { file, body } = req;
            const image = file ? file.filename : null;
            const {
                first_name,
                last_name,
                email,
                password,
                confirmpassword: confirm_password,
                status_id,
            } = body;

            if (!image) {
                return res.status(400).send({ message: "Image is required" });
            }

            if (password !== confirm_password) {
                return res.status(401).send({
                    message: "Password and Confirm Password do not match",
                });
            }

            try {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedpassword = await bcrypt.hash(password, salt);

                const vendorExists = await User.findOne({
                    email: email,
                    user_type: "v",
                });

                if (vendorExists) {
                    return res.status(401).send({
                        message: "User already exists",
                    });
                }

                const vendor = new User({
                    image: image,
                    user_type: "v",
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedpassword,
                    status_id: status_id,
                });

                await vendor.save();
                return res.send({
                    message: "User registered successfully",
                    status: true,
                    success: true,
                });
            } catch (error) {
                console.log(error);
                return res.status(500).send({
                    message: "Something went wrong, please try again later",
                    error: error.message,
                });
            }
        });
    };

    static datepicker = async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            // Convert query string dates to Date objects
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999); // Include the entire end date

            // Format created_at to MM/DD/YYYY
            const formattedUsers = users.map((user) => ({
                ...user.toObject(),
                created_at: new Date(user.created_at).toLocaleDateString(
                    "en-US"
                ),
            }));

            return res.json({ users: formattedUsers }); // Send JSON response
        } catch (error) {
            return res
                .status(500)
                .send("Error fetching vendors: " + error.message);
        }
    };

    // POST route to handle the edit operation
    // POST route to handle the edit operation
    static edit = async (req, res) => {
        try {
            let statuses = await Status.find().sort({ created_at: -1 });
            let id = req.params.id;
            const vendors = await Vendor.findOne({ user_id: id });
            const users = await User.findOne({ _id: id });

            res.render("admin/edit-vendor", { vendors, statuses, users });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res.status(500).send("Error fetching user details");
        }
    };

    static update = async (req, res) => {
        try {
            const user = await User.findOne({
                _id: req.body.editid,
            });

            const vendor = await Vendor.findOne({
                user_id: req.body.editid,
            });

            let updatedUserData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                status_id: req.body.status_id,
                address: req.body.address,
                address2: req.body.address2,
                pincode: req.body.pincode,
                additional_info: req.body.additional_info,
                updated_at: Date.now(),
            };
            console.log("updatedUserData", updatedUserData);

            let updatedVendorData = {
                aadhar_no: req.body.aadhar_no,
                pan_no: req.body.pan_no,
                gst_no: req.body.gst_no,
                account_holder_name: req.body.account_holder_name,
                ifsc_code: req.body.ifsc_code,
                bank_name: req.body.bank_name,
                account_no: req.body.account_no,
                updated_at: Date.now(),
            };
            console.log("updatedVendorData", updatedVendorData);

            // Check if files are uploaded and update the paths accordingly
            if (req.files) {
                if (req.files.image) {
                    updatedUserData.image = req.files.image[0].filename;
                }
                if (req.files.aadhar_front_photo) {
                    updatedVendorData.aadhar_front_photo =
                        req.files.aadhar_front_photo[0].filename;
                }
                if (req.files.aadhar_back_photo) {
                    updatedVendorData.aadhar_back_photo =
                        req.files.aadhar_back_photo[0].filename;
                }
                if (req.files.pan_front_photo) {
                    updatedVendorData.pan_front_photo =
                        req.files.pan_front_photo[0].filename;
                }
                if (req.files.signature) {
                    updatedVendorData.signature =
                        req.files.signature[0].filename;
                }
            }

            await User.updateOne({ _id: req.body.editid }, updatedUserData);
            await Vendor.updateOne(
                { user_id: req.body.editid },
                updatedVendorData
            );
            res.status(200).json({
                status: 200,
                message: "Vendor details updated successfully",
            });
        } catch (error) {
            console.error("Error updating vendor details:", error);
            return res.status(500).json({
                status: 500,
                message: "Error updating vendor details",
            });
        }
    };

    static status_change = async (req, res) => {
        const userId = req.body.userId;
        const status = req.body.status;

        console.log(status)

        try {
            // Find the status document with name 'Banned'
            const bannedStatus = await Status.findOne({ name: "Banned" });

            if (!bannedStatus && !statusDoc) {
                return res.status(400).json({
                    status: 400,
                    message: "Status not found",
                });
            }

            // Find the status document corresponding to the status name
            const statusDoc = await Status.findOne({ name: status });
            console.log(bannedStatus)
            console.log(statusDoc)

            // Update user's status_id to the _id of the 'Banned' status
            // Using findOneAndUpdate to handle creation if status_id doesn't exist
            await User.findOneAndUpdate(
                { _id: userId },
                { $set: { status_id: bannedStatus._id } } // upsert option to create if not exists
            );

            // Update user's status_id
            await User.findByIdAndUpdate(userId, { status_id: statusDoc._id });

            // Send a success response
            res.status(200).json({
                status: 200,
                message: "Status Change Successfully!",
            });
        } catch (error) {
            console.error("Error banning user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

module.exports = VendorController;
