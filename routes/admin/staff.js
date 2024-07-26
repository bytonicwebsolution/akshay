const router = require('express').Router();
const staffController = require("../../controllers/admin/staffController")
router.get("/list", staffController.list)
router.get("/add", staffController.GETadd)
router.post("/add", staffController.POSTadd)

module.exports= router;