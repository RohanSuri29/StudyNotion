const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true
        },
        description:{
            type:String,
            required: true,
            trim: true
        },
        instructor:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        whatYouWillLearn:{
            type:String,
            required: true,
            trim: true
        },
        content:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Section"
            }
        ],
        price:{
            type: Number,
            required: true
        },
        thumbnail:{
            type:String,
            required: true
        },
        studentsEnrolled:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        ],
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        RatingandReviews:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Ratings"
        }],
        tags:[{
            type:String,
            required: true
        }],
        instructions:[{
            type:String,
            required:true
        }],
        status:{
            type: String,
            enum: ["Draft" , "Published"]
        },
        createdAt:{
            type:Date,
            default: Date.now()
        },
        totalTime:{
            type:String
        },
        averageRating:{
            type:Number
        },
        sold:{
            type:Number
        }
    }

);
module.exports = mongoose.model('Course' , courseSchema);