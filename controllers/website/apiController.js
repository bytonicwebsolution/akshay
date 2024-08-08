const Category = require("../../models/Category");
const Status = require("../../models/Status");
const Product = require("../../models/Product");
const ProductStock = require("../../models/ProductStock");
const multer = require("multer");
const path = require("path");
const root = process.cwd();
const imageFilter = require("../../config/imageFilter");
const pdfFilter = require("../../config/pdfFilter");
const AttributeSets = require("../../models/AttributeSets");
const AttributeValue = require("../../models/AttributeValue");
const Brand = require("../../models/Brand");

class ApiController {
    static add_product = async (req, res) => {
        try {
            upload(req, res, async function (err) {
                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                } else if (!req.files.thumbnail) {
                    return res.send({
                        error: true,
                        message: "Please upload thumbnail",
                    });
                } else if (!req.files.gallery_image) {
                    return res.send({
                        error: true,
                        message: "Please upload gallery_image",
                    });
                } else if (!req.files.description_image) {
                    return res.send({
                        error: true,
                        message: "Please upload description_image",
                    });
                } else if (!req.files.meta_image) {
                    return res.send({
                        error: true,
                        message: "Please upload meta_image",
                    });
                } else if (!req.files.pdf) {
                    return res.send({
                        error: true,
                        message: "Please upload PDF file",
                    });
                } else if (err instanceof multer.MulterError) {
                    console.log(err);
                    return res.send(err);
                } else if (err) {
                    console.log(err);
                    return res.send(err);
                }

                const files = req.files || {};
                const insertRecord = new Product({
                    vendor_id: req.body.vendor_id,
                    product_name: req.body.product_name,
                    category_id: req.body.category_id,
                    brand_id: req.body.brand_id,
                    unit: req.body.unit,
                    min_order_quantity: req.body.min_order_quantity,
                    tags: req.body.tags,
                    slug: req.body.slug,
                    status_id: req.body.status_id,
                    thumbnail: files.thumbnail
                        ? files.thumbnail[0].filename
                        : "",
                    gallery_image: Array.isArray(files.gallery_image)
                        ? files.gallery_image.map((f) => f.filename)
                        : files.gallery_image
                        ? [files.gallery_image[0].filename]
                        : [],
                    video_url: req.body.video_url,
                    unit_price: req.body.unit_price,
                    special_discount_type: req.body.special_discount_type,
                    special_discount: req.body.special_discount,
                    special_discount_period: req.body.special_discount_period,
                    min_stock_quantity: req.body.min_stock_quantity,
                    stock_visibility: req.body.stock_visibility,
                    variant: req.body.variant === "on" ? true : false,
                    short_description: req.body.short_description,
                    long_description: req.body.long_description,
                    description_image: Array.isArray(files.description_image)
                        ? files.description_image.map((f) => f.filename)
                        : files.description_image
                        ? [files.description_image[0].filename]
                        : [],
                    pdf: files.pdf ? files.pdf[0].filename : "",
                    is_featured: req.body.is_featured === "on" ? true : false,
                    todays_deal: req.body.todays_deal === "on" ? true : false,
                    meta_title: req.body.meta_title,
                    meta_description: req.body.meta_description,
                    meta_keywords: req.body.meta_keywords,
                    meta_image: Array.isArray(files.meta_image)
                        ? files.meta_image.map((f) => f.filename)
                        : files.meta_image
                        ? [files.meta_image[0].filename]
                        : [],
                });

                if (req.body.variant === "on") {
                    const attributeValueIds = Array.isArray(
                        req.body.attribute_value_id
                    )
                        ? req.body.attribute_value_id
                        : [req.body.attribute_value_id];
                    const skus = Array.isArray(req.body.sku)
                        ? req.body.sku
                        : [req.body.sku];
                    const currentStocks = Array.isArray(req.body.current_stock)
                        ? req.body.current_stock
                        : [req.body.current_stock];
                    const prices = Array.isArray(req.body.price)
                        ? req.body.price
                        : [req.body.price];
                    const images = Array.isArray(files.image)
                        ? files.image.map((f) => f.filename)
                        : [];

                    const filteredAttributeValueIds = attributeValueIds.filter(
                        (val) => val
                    );
                    const filteredSkus = skus.filter((val) => val);
                    const filteredCurrentStocks = currentStocks.filter(
                        (val) => val
                    );
                    const filteredPrices = prices.filter((val) => val);

                    const productStock = new ProductStock({
                        attribute_value_id: filteredAttributeValueIds,
                        product_id: insertRecord._id,
                        sku: filteredSkus,
                        current_stock: filteredCurrentStocks,
                        price: filteredPrices,
                        image: images,
                    });
                    await productStock.save();
                }
                await insertRecord.save();
                return res.send({
                    success: true,
                    status: 200,
                    message: "Product added successfully",
                });
            });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .send({ message: "Error creating Product: " + error.message });
        }
    };

    static getAllAttribute = async (req, res) => {
        try {
            let finalJson = [];
            let attributeSet = await AttributeSets.find();

            for (let i = 0; i < attributeSet.length; i++) {
                let attributeSetId = attributeSet[i]._id;

                let attributevalue = await AttributeValue.find({
                    attribute_sets_id: attributeSetId,
                });
                let attributeset = await AttributeSets.findOne({
                    _id: attributeSetId,
                });

                let orderedAttributeSet = {
                    category_id: attributeset.category_id,
                    _id: attributeset._id,
                    title: attributeset.title,
                    created_at: attributeset.created_at,
                    updated_at: attributeset.updated_at,
                    __v: attributeset.__v,
                    attributeValues: attributevalue,
                };
                finalJson.push(orderedAttributeSet);
            }

            res.send(finalJson);
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                message: "Error in getting product attribute " + error.message,
            });
        }
    };

    static getAllBrands = async (req, res) => {
        try {
            const statusData = await Status.findOne({ name: "Active" });

            if (!statusData) {
                return res.status(200).json([]);
            }
            const brandData = await Brand.find({ status_id: statusData._id });

            res.status(200).json(brandData);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    static getAllCategories = async (req, res) => {
        try {
            const statusData = await Status.findOne();

            if (!statusData) {
                return res.status(200).json([]);
            }

            const categories = await Category.aggregate([
                {
                    $match: {
                        parent_id: null,
                        status_id: statusData._id,
                    },
                },
                {
                    $lookup: {
                        from: "Category",
                        localField: "_id",
                        foreignField: "parent_id",
                        as: "children",
                    },
                },
            ]);

            const populateChildren = async (category) => {
                const children = await Category.find({
                    parent_id: category._id,
                    status_id: statusData._id,
                });
                category.children = children;
            };

            await Promise.all(categories.map(populateChildren));

            res.status(200).json(categories);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };


    static get_all_products = async(req,res)=>{
        try {
            console.log(req.body)
            const products = await Product.find();
            res.status(200).json(products)
        } catch (error) {
            res.status(500).send(error.message);
        }

      
    }
}



const storage = multer.diskStorage({
    destination: path.join(root, "/public/dist/product"),
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const fileFilter = function (req, file, cb) {
    const imageFields = [
        "thumbnail",
        "gallery_image",
        "description_image",
        "meta_image",
        "image",
    ];
    if (imageFields.includes(file.fieldname)) {
        imageFilter(req, file, cb);
    } else if (file.fieldname === "pdf") {
        pdfFilter(req, file, cb);
    } else {
        req.fileValidationError = "Unexpected field";
        return cb(new Error("Unexpected field"), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000,
    },
    fileFilter: fileFilter,
}).fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "gallery_image", maxCount: 10 },
    { name: "description_image", maxCount: 10 },
    { name: "pdf", maxCount: 1 },
    { name: "meta_image", maxCount: 10 },
    { name: "image", maxCount: 10 },
]);

module.exports = ApiController;
