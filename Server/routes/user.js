const express = require('express');
const router = express.Router();

//importing auth
const {loginHandler , signUpHandler , sendOtp , changePassword} = require('../controllers/Auth');

//importing reset password
const {resetPasswordToken , resetPassword} = require('../controllers/ResetPassword');

//importing middleware
const authentication = require('../middlewares/Authentication');

//***************************** Routes ***************************

//auth routes
router.post('/login' , loginHandler);
router.post('/signup' , signUpHandler);
router.post('/sendotp' , sendOtp);
router.put('/changepassword' , authentication , changePassword);

//reset password routes
router.put('/reset-password-token' , resetPasswordToken);
router.put('/reset-password' , resetPassword);

module.exports = router;