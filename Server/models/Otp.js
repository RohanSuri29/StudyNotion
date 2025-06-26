const mongoose = require("mongoose");
const mailSender = require("../utils/nodemailer");
const { otpTemplate } = require("../Mail/Templates/otpTemplate");

const otpSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            trim: true
        },
        otp:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            expires: 5*60*1000
        }
    }
);

//do not use callback function here because it does not bind this keyword with the mongoose document being saved
otpSchema.pre('save' , async function (next) {

    try{
        
        const mailResponse = await mailSender(this.email , 'Verification Email from StudyNotion' , otpTemplate(this.otp));
        console.log('Email Sent Successfully' , mailResponse);
    }
    catch(error) {
        console.error(error)
    }
    next();
})

module.exports = mongoose.model('Otp' , otpSchema);