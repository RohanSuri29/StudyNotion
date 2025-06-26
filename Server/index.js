const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();

//importing Routes
const contactRoutes = require('./routes/contact');
const courseRoutes = require('./routes/course');
const profileRoutes = require('./routes/profile');
const userRoutes = require('./routes/user');
const paymentRoutes = require('./routes/payment')

//importing database connecting functions
const dbConnect = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');

const app = express();

//importing middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: "/tmp/"
}));
app.use(cors({                                  //--> using this middleware so that our backend can entertain the request coming from the frontend
    origin:"https://study-notion-fawn-eight.vercel.app"
}));

//activating server at port 
const Port = process.env.Port || 4000;
app.listen(Port , ()=>{
    console.log(`Your app is started successfull at port number ${Port}`)
});

//mounting Routes
app.use('/api/v1/reach' , contactRoutes);
app.use('/api/v1/course' , courseRoutes);
app.use('/api/v1/profile' , profileRoutes);
app.use('/api/v1/auth' , userRoutes);
app.use('/api/v1/payment' , paymentRoutes);
app.use('/public' , express.static('public'));

//default route
app.get('/' , (req , res) => {
    res.send(`<h1> Your server is running </h1>`)
})

//calling functions to connect database
dbConnect();
cloudinaryConnect();