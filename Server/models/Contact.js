const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            trim : true
        },
        lastName:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            trim: true
        },
        countryCode:{
            type: Number,
            required: true
        },
        phoneNo:{
            type: Number,
            required: true
        },
        message:{
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("Contact" , contactSchema);
