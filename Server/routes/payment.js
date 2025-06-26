const express = require('express');
const router = express.Router();

//importing middlewares
const authentication = require('../middlewares/Authentication');
const isStudent = require('../middlewares/IsStudent');
const { capturePayment, verifySignature, sendSuccessfullEmail } = require('../controllers/Payments');

// ******************************* Routes ***********************************

//payment routes
router.post('/capturePayment' , authentication , isStudent , capturePayment);
router.post('/verifyPayment' , authentication , isStudent , verifySignature);
router.post('/sendPaymentSuccessEmail' , authentication , isStudent , sendSuccessfullEmail);

module.exports = router;