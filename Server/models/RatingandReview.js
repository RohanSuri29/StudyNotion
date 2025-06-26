const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        rating:{
            type: Number,
            required: true
        },
        review:{
            type: String,
            required: true,
            trim: true
        },
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
            required:true
        }
    }
);

module.exports = mongoose.model("Ratings" , ratingSchema);