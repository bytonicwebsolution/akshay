const Adminauth = require("../../models/Adminauth");
const imageFilter = require("../../config/imageFilter");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const fs = require("fs");

// Set storage engine for users
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(root, "/public/dist/staff"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`);
    },
});

// Init upload for users
const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
}).single("image");

class staffController {
    static list = async (req, res) => {
        let staffs = await Adminauth.find().sort({
            created_at: -1,
        });
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const startIndex = (page - 1) * limit;
        try {
            const staff = await Adminauth.find({ type: "s" })
                .skip(startIndex)
                .limit(limit);
            const totalStaffs = await Adminauth.countDocuments();
            const totalPages = Math.ceil(totalStaffs / limit);
            return res.render("admin/staff", {
                staff,
                staffs,
                totalPages,
                currentPage: page,
                totalStaffs,
            });
        } catch (error) {
            return res.status(500).send({
                message: "Error fetching categories: " + error.message,
            });
        }
    };
    static GETadd = async (req, res) => {
        try {
            // let staff = await Staff.aggregate([
            //     {
            //         $sort: {
            //             created_at: -1,
            //         },
            //     },
            // ]).exec();

            res.render("admin/staff-add");
        } catch (error) {
            return res.status(500).send({
                message: "Error fetching categories: " + error.message,
            });
        }
    };

    static POSTadd = async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: err.message });
            }

            const {
                username,
                first_name,
                last_name,
                email,
                phone,
                password,
                currentpassword,
            } = req.body;

            if (password !== currentpassword) {
                return res.status(401).json({
                    message: "Password and Confirm Password do not match",
                });
            }

            try {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(password, salt);

                const staffExists = await Adminauth.findOne({
                    email: email,
                    username:username,
                    type: "s",
                });

                if (staffExists) {
                    return res
                        .status(401)
                        .json({ message: "Staff already exists" });
                }

                const staff = new Adminauth({
                    image: req.file.filename,
                    type: "s",
                    username:username,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    password: hashedPassword,
                });


                await staff.save();
                
                return res.json({
                    message: "Staff registered successfully",
                    success: true,
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: "Something went wrong, please try again later",
                    error: error.message,
                });
            }
        });
    };

    static edit = async (req, res) => {
        try {
            upload(req, res, async function (err) {
                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                } else if (err instanceof multer.MulterError) {
                    console.log(err);
                    return res.send(err);
                } else if (err) {
                    console.log(err);
                    return res.send(err);
                }

                const staff = await Adminauth.findOne({ _id: req.body.editid });

                if (!staff) {
                    return res.status(404).send({ message: "user not found" });
                }

                let updatedData = {
                    image: req.file ? req.file.filename : "",
                    username: req.body.edit_user_name,
                    first_name: req.body.edit_first_name,
                    last_name: req.body.edit_last_name,
                    email: req.body.edit_email,
                    phone: req.body.edit_phone,
                    updated_at: Date.now(),
                };
                if (req.file) {
                    updatedData.image = req.file.filename;
                }
                await Adminauth.findOneAndUpdate(
                    { _id: req.body.editid },
                    updatedData,
                    { new: true }
                );

                if (req.file && staff.image) {
                    fs.unlink(
                        path.join(
                            root,
                            "/public/dist/staff/" + staff.image
                        ),
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                        }
                    );
                }
                return res.send({
                    success: true,
                    status: 200,
                    message: "Staff updated successfully",
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Something went wrong please try again later",
                error: error.message,
            });
        }
    };

    static delete = async (req, res) => {
        try {
            await Adminauth.findByIdAndDelete(req.params.id);

            return res.send({
                success: true,
                status: 200,
                message: " Staff deleted successfully",
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send({ message: "Error deleting slider: " + error.message });
        }
    };
}

module.exports = staffController;
