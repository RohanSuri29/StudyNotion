const { resetPasswordTemplate } = require("../Mail/Templates/resetPassword");
const User = require("../models/User");
const mailSender = require("../utils/nodemailer");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//Reset Password Token
exports.resetPasswordToken = async (req , res) => {

    try{

        const {email} = req.body;

        if(!email){
            return res.status(403).json({
                success:false,
                message:"Please fill the email"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(403).json({
                sucess: false,
                message:"Your email is not registered"
            })
        }

        const token = crypto.randomBytes(20).toString('hex');

        const updatedDetails = await User.findOneAndUpdate({email} , {token: token , resetPasswordExpires: Date.now() + 5*60*1000} , {new:true});

        const url = `http://localhost:3000/update-password/${token}`

        await mailSender(email , "Request to reset Password" , resetPasswordTemplate(`${url}` , `${user.firstName} ${user.lastName}`));

        res.status(200).json({
            success:true,
            message:"Email sent successfully at your email"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reseting your password'
        })
    }
};

//reset Password
exports.resetPassword = async (req , res) => {

    try{

        const {password , confirmPassword , token} = req.body;

        if(!password || !confirmPassword) {
            return res.status(403).json({
                success:false,
                message:"Please fill the required passwords"
            })
        };

        if(password !== confirmPassword) {
            return res.status(403).json({
                success:false,
                message:"Password and Confirm Password do not match"
            })
        };

        const userDetails = await User.findOne({token});

        if(!userDetails) {
            return res.status(404).json({
                success:false,
                message:"Token is Invalid"
            })
        };

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
                success:false,
                message:"Your token is expired"
            })
        };

        const hashedPassword = await bcrypt.hash(password , 10);

        await User.findOneAndUpdate({token} , {password:hashedPassword} , {new:true});

        res.status(200).json({
            success:true,
            message:"Your Password is changed Successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            succesS:false,
            message:"Something went wrong while changing your password"
        })
    }
};
