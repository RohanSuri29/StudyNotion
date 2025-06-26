const Otp = require("../models/Otp");
const Profile = require("../models/Profile");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpgenerator = require('otp-generator');
const mailSender = require("../utils/nodemailer");
const { passwordUpdated } = require("../Mail/Templates/PasswordUpdate");
require('dotenv').config();

//signUp handler
exports.signUpHandler = async (req , res) => {

    try{

        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;

        if(!email || !firstName || !lastName || !password || !confirmPassword || !otp){
            return res.status(403).json(
                {
                    success:false,
                    message:"Please fill the required details"
                }
            )
        }

        if(password !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Password and confirm password do not match"
            })
        }

        const user = await User.findOne({email});

        if(user) {
            return res.status(403).json({
                success: false,
                message:"User already exists"
            })
        }

        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);

        if(recentOtp.length === 0){
            return res.status(404).json({
                success:false,
                message:"Otp do not found"
            })
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(403).json({
                success:false,
                message:"Otp is invalid"
            })
        }

        let hashedPassword
        try{

            hashedPassword = await bcrypt.hash(password , 10)
        }
        catch(error){
            console.error(error);
            return res.status(403).json({
                success: false,
                message:"Unable to Hash Password"
            })
        }

        const profileDetails = await Profile.create({gender:null,dateOfBirth:null,contact:null,about:null});

        const response = await User.create(
            {
                firstName,
                lastName,
                email,
                contactNumber,
                password:hashedPassword,
                accountType,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            }
        );

        res.status(200).json({
            success:true,
            data:response,
            message:"User is registered successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Unable to Sign in'
        })
    }
};

//login Handler
exports.loginHandler = async (req , res) => {

    try{

        const {email , password} = req.body;

        if(!email || !password) {
            return res.status(403).json({
                success: false,
                message:"Please Fill the required details"
            })
        };

        const user = await User.findOne({email}).populate("additionalDetails").exec();

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User is not registered"
            })
        }

        if(await bcrypt.compare(password , user.password)){

            const payload = {
                email:user.email,
                id: user._id,
                accountType: user.accountType
            }

            const token = jwt.sign(payload , process.env.Secret_Key , {expiresIn:"2h"});
            user.token = token;
            user.password = undefined;

            const options = {
                httpOnly:true,
                expires: new Date(Date.now() + 3*24*60*60*1000)
            }

            res.cookie('token' , token , options).status(200).json({
                success: true,
                user:user,
                token:token,
                message:'Logged In Successfully'
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message: "Password is incorrect" 
            })
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to Log In"
        })
    };
};

//sendOtp
exports.sendOtp = async (req , res) => {

    try{

        const {email} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already exists"
            })
        }

        //generate otp
        var otp = otpgenerator.generate(6 , {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        //check if otp already exists in the db
        let result = await Otp.findOne({otp:otp});

        //generate an otp until a unqiue otp is generated
        while(result){
            otp = otpgenerator.generate(6 , {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })

            result = await Otp.findOne({otp:otp})
        }

        await Otp.create({email , otp});

        res.status(200).json({
            success:true,
            otp,
            message:"Otp generated successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message: "Error in generating Otp"
        })
    }
};

//change password
exports.changePassword = async (req,res) => {

    try{

        const id = req.user.id;

        const user = await User.findById(id);

        const {password , newPassword , confirmNewPassword} = req.body;

        if(!password || !newPassword || !confirmNewPassword) {
            return res.status(403).json({
                succesS:false,
                message:"Please fill the required passwords"
            })
        };

        if(! await bcrypt.compare(password , user.password)) {
            return res.status(403).json({
                success:false,
                message:"Please fill the correct password"
            })
        };

        if(newPassword !== confirmNewPassword){
            return res.status(403).json({
                succesS:false,
                message:"new password and confirm new password do not match"
            })
        };

        const hashedPassword = await bcrypt.hash(newPassword , 10);

        const updatedUser = await User.findByIdAndUpdate(id , {password:hashedPassword} , {new:true});

        await mailSender(updatedUser.email , "Your Password is changed Successfully" , passwordUpdated(updatedUser.email , `${updatedUser.firstName} ${updatedUser.lastName}`));

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
