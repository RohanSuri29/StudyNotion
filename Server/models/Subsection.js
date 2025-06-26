const mongoose = require('mongoose');

const subsectionSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            required: true,
            trim: true
        },
        timeDuration:{
            type: String
        },
        videoUrl:{
            type: String,
        }
    }
);

module.exports = mongoose.model("Subsection" , subsectionSchema);