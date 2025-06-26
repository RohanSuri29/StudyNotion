//create an instance of razorpay
const Razorpay = require('razorpay');
require('dotenv').config();

//instantiate razorpay
const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret
});

module.exports = instance;