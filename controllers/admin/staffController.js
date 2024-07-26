const Adminauth = require("../../models/Adminauth");

const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const root = process.cwd();

// Set storage engine for users
const storage = multer.diskStorage({
    destination: path.join(root, "/public/dist/staff"),
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`);
    },
});

// Init upload for users
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).fields([{ name: "image" }]);

class staffController {
    static list = async (req, res) => {
        try {
            // let staff = await Staff.aggregate([
            //     {
            //         $sort: {
            //             created_at: -1,
            //         },
            //     },
            // ]).exec();

            res.render("admin/staff");
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
                return res.status(400).send({ message: err });
            }
            const { file, body } = req;
            const {
                first_name,
                last_name,
                email,
                phone,
                password,
                currentpassword,
            } = body;

            const image = file ? file.filename : null;
            
            if (password !== currentpassword) {
                return res.status(401).json({
                    message: "Password and Confirm Password do not match",
                });
            }
            if (!image) {
                return res.status(400).send({ message: "Image is required" });
            }
            try {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                const hashedPassword = await bcrypt.hash(password, salt);

                const staffExists = await Adminauth.findOne({
                    email: email,
                    type: "s",
                });

                if (staffExists) {
                    return res
                        .status(401)
                        .json({ message: "Staff already exists" });
                }

                const staff = new Adminauth({
                    image: image,
                    type: "s",
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
}

module.exports = staffController;
