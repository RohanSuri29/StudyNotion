const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            trim:true
        },
        lastName:{
            type:String,
            required:true,
            trim: true
        },
        password:{
            type:String,
            required:true
        },
        contactNumber:{
            type: Number,
        },
        email:{
            type:String,
            required:true,
            trim: true
        },
        accountType:{
            type:String,
            enum:["Student" , "Admin" , "Instructor"],
            required:true
        },
        additionalDetails:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Profile"
        },
        Courses:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Course"
            }
        ],
        image:{
            type:String
        },
        CourseProgress:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"CourseProgress"
            }
        ],
        token:{
            type: String
        },
        resetPasswordExpires:{
            type:Date
        }
    }
);

module.exports = mongoose.model('User' , userSchema);