const { contactUsEmail } = require("../Mail/Templates/ContactForm");
const Contact = require("../models/Contact");
const mailSender = require("../utils/nodemailer");

async function contactUs(req , res) {

    try{

        const {firstName , lastName , email , message , phoneNo , countryCode} = req.body;

        if(!firstName || !lastName || !email || !message || !phoneNo || !countryCode) {
            return res.status(403).json({
                success:false,
                message:"Please fill the required details",
            })
        };

        const mailResponse = await mailSender(email , "Your Data Sent Successfully" , contactUsEmail(email,firstName,lastName,message,phoneNo,countryCode));
        const response = await Contact.create({firstName , lastName , email , message , phoneNo , countryCode})

        res.status(200).json({
            success:true,
            data:response,
            message:"Thanks for contacting us"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:true,
            message:"Something went wrong"
        })
    }
};
module.exports = contactUs;