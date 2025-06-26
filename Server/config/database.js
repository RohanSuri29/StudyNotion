const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {

    mongoose.connect(process.env.Database_Url)
    .then(() => console.log('Database connected Successfully'))
    .catch((error) =>{
        console.error(error);
        process.exit(1)
    })
};

module.exports = dbConnect;