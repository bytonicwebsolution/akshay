const Banner = require("../../models/Banner");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
class BannerController {
    static list = async (req, res) => {
        try {

            const banners = await Banner.findOne();

            
            return res.render("admin/banner",
                {
                    
                    home_banner_top_url : banners? banners.home_banner_top.url:" ",
                    home_banner_2_url : banners? banners.home_banner_2.url:" ",
                    home_banner_3_url : banners? banners.home_banner_3.url:" ",
                    home_banner_4_url : banners? banners.home_banner_4.url:" ",
                    subscription_banner_url : banners? banners.subscription_banner.url:" ",

                    home_banner_top_image : banners? banners.home_banner_top.image:" ",
                    home_banner_2_image : banners? banners.home_banner_2.image:" ",
                    home_banner_3_image : banners? banners.home_banner_3.image:" ",
                    home_banner_4_image : banners? banners.home_banner_4.image:" ",
                    subscription_banner_image : banners? banners.subscription_banner.image:" "


                }
            );
        } catch (error) {}
    };

    static add = async (req, res) => {
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


               
                const data = req.body;
                const files = req.files || {};

                console.log(data, files);

                const bannerData = {
                    home_banner_top: {
                        image: files["home_banner_top_image"]
                            ? files["home_banner_top_image"][0].path
                            : "",
                        url: data.home_banner_top_url,
                    },
                    home_banner_2: {
                        image: files["home_banner_2_image"]
                            ? files["home_banner_2_image"][0].path
                            : "",
                        url: data.home_banner_2_url,
                    },
                    home_banner_3: {
                        image: files["home_banner_3_image"]
                            ? files["home_banner_3_image"][0].path
                            : "",
                        url: data.home_banner_3_url,
                    },
                    home_banner_4: {
                        image: files["home_banner_4_image"]
                            ? files["home_banner_4_image"][0].path
                            : "",
                        url: data.home_banner_4_url,
                    },
                    subscription_banner: {
                        image: files["subscription_banner_image"]
                            ? files["subscription_banner_image"][0].path
                            : "",
                        url: data.subscription_banner_url,
                    },
                };

                let exist = await Banner.findOne();
                if (exist) {
                    bannerData.updated_at = Date.now();
                    await Banner.updateOne({}, bannerData);
                } else {
                    const newBanner = new Banner(bannerData);
                    await newBanner.save();
                }

                return res.send({
                    status: 200,
                    message: "Banner added successfully",
                });
            });
        } catch (error) {
            console.error(error);
            return res.send({
                status: 500,
                message: "Failed to add banner: " + error.message,
            });
        }
    };

    static edit = async (req, res) => {
        try {
        } catch (error) {}
    };

    static delete = async (req, res) => {
        try {
        } catch (error) {}
    };
}

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: path.join(root, "/public/dist/banner"),
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

// Combined file filter
const fileFilter = function (req, file, cb) {
    const imageFields = [
        "home_banner_top_image",
        "home_banner_2_image",
        "home_banner_3_image",
        "home_banner_4_image",
        "subscription_banner_image",
    ];
    if (imageFields.includes(file.fieldname)) {
        imageFilter(req, file, cb);
    } else {
        req.fileValidationError = "Unexpected field";
        return cb(new Error("Unexpected field"), false);
    }
};

// Init Upload
const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 5000000
    // },
    fileFilter: fileFilter,
}).fields([
    { name: "home_banner_top_image", maxCount: 1 },
    { name: "home_banner_2_image", maxCount: 10 },
    { name: "home_banner_3_image", maxCount: 10 },
    { name: "home_banner_4_image", maxCount: 1 },
    { name: "subscription_banner_image", maxCount: 10 },
]);

module.exports = BannerController;
