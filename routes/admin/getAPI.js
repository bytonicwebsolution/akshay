const router = require("express").Router();
const webauthController = require("../../controllers/website/webauthController");
const GetAPIController = require("../../controllers/admin/getAPIController");

router.get("/getOrders", GetAPIController.getOrders);
router.get("/getdetails",  GetAPIController.getdetails);

// function verifyToken(req, res, next) {
//     const bearerHeader =req.headers['authorization'];
//     console.log(bearerHeader)
//     console.log(typeof bearerHeader)
//     if (typeof bearerHeader != undefined) {
//         const bearer = bearerHeader.split("");
//         const bearerToken = bearer[1];
//         req.bearerToken = bearerToken;
//         next();
//     } else {
//         res.send({
//             result: "Token is not Valid",
//         });
//     }
// }

module.exports = router;
