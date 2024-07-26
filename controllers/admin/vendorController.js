const User = require("../../models/User");
const Vendor = require("../../models/Vendor");
const config = require("../../config/createStatus");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
require("dotenv").config;
const Status = require("../../models/Status");

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
                    message: "Vendor registered successfully",
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
    static edit = async (req, res) => {
        try {
            let id = req.params.id;
            let statuses = await Status.find().sort({ created_at: -1 });
            const users = await User.findOne({ _id: id });
            const vendors = await Vendor.findOne({ user_id: users._id });

            res.render("admin/edit-vendor", { vendors, statuses, users });
        } catch (error) {
            console.error("Error fetching user:", error);
            return res
                .status(500)
                .send("Error fetching user details", error.message);
        }
    };

    static update = async (req, res) => {
        try {
            const user = await User.findOne({
                _id: req.body.editid,
                type: "v",
            });
            const vendor = await Vendor.findOne({ user_id: req.body.editid });

            console.log("req.files", req.files);
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

            const fileUploadPromises = [];

            // Check if files are uploaded
            if (req.files) {
                if (req.files.image) {
                    fileUploadPromises.push(
                        new Promise((resolve, reject) => {
                            uploadUser.single("image")(req, res, (err) => {
                                if (err) {
                                    return reject(
                                        "Error uploading user image."
                                    );
                                }
                                updatedUserData.image = req.file.filename;
                                resolve();
                            });
                        })
                    );
                }

                if (
                    req.files.aadhar_front_photo ||
                    req.files.aadhar_back_photo ||
                    req.files.pan_front_photo ||
                    req.files.signature
                ) {
                    fileUploadPromises.push(
                        new Promise((resolve, reject) => {
                            uploadVendor.fields([
                                { name: "aadhar_front_photo", maxCount: 1 },
                                { name: "aadhar_back_photo", maxCount: 1 },
                                { name: "pan_front_photo", maxCount: 1 },
                                { name: "signature", maxCount: 1 },
                            ])(req, res, (err) => {
                                if (err) {
                                    return reject(
                                        "Error uploading vendor documents."
                                    );
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
                                resolve();
                            });
                        })
                    );
                }
            }

            await Promise.all(fileUploadPromises);

            await User.updateOne({ _id: req.body.editid }, updatedUserData);
            await Vendor.updateOne(
                { user_id: req.body.editid },
                updatedVendorData
            );

            res.status(200).send({
                status: 200,
                message: "Vendor details updated successfully",
            });
        } catch (error) {
            console.error("Error updating vendor details:", error);
            return res.status(500).send({
                status: 500,
                message: "Error updating vendor details",
                error: error.message,
            });
        }
    };

    static status_ban = async (req, res) => {
        try {
            const { userId } = req.body;
            const bannedStatus = await Status.findOne({
                type: "user",
                name: { $regex: new RegExp("^banned$", "i") },
            });
            await config.createUserStatus();
            await User.findOneAndUpdate(
                { _id: userId },
                { $set: { status_id: bannedStatus._id } } // upsert option to create if not exists
            );

            // Update user's status_id
            await User.findByIdAndUpdate(userId, {
                status_id: bannedStatus._id,
            });

            // Send a success response
            res.status(200).json({
                status: 200,
                message: "Status Change Successfully!",
            });
        } catch (error) {
            console.error("Error banning user:", error);
            return res.status(500).send({
                status: 500,
                message: "Error ban user",
                error: error.message,
            });
        }
    };

    static status_change = async (req, res) => {
        try {
            const { userId, status } = req.body;

            const findStatus = await Status.findOne({
                name: status,
                type: "user",
            });

            await config.createUserStatus();

            if (findStatus) {
                await User.findOneAndUpdate(
                    { _id: findStatus._id },
                    { $set: { status_id: findStatus._id } } // Return the updated document
                );

                // Update user's status_id
                await User.findByIdAndUpdate(userId, {
                    status_id: findStatus._id,
                });
            }

            // Send a success response
            res.status(200).send({
                status: 200,
                message: "Status Change Successfully!",
            });
        } catch (error) {
            console.error("Error banning user:", error);
            return res.status(500).send({
                status: 500,
                message: "Error Status Change",
                error: error.message,
            });
        }
    };

    static delete = async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.send({
                success: true,
                status: 200,
                message: "Vendor deleted successfully",
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send({ message: "Error deleting Vendor: " + error.message });
        }
    };
}

// Storage configuration for User images
const userStorage = multer.diskStorage({
    destination: path.join(root, "/public/dist/users"),
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

// Storage configuration for Vendor documents
const vendorStorage = multer.diskStorage({
    destination: path.join(root, "/public/dist/vendor"),
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});

// Multer configurations
const uploadUser = multer({ storage: userStorage, fileFilter: imageFilter });
const uploadVendor = multer({
    storage: vendorStorage,
    fileFilter: imageFilter,
});

module.exports = VendorController;
