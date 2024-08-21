const Razorpay = require("razorpay");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: "rzp_test_rFXwtHIILu1CTU",
    key_secret: "OagCUpxf4bDzhU7igpiUOxK2",
});

module.exports = razorpay;
