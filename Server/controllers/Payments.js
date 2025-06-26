const mongoose = require("mongoose");
const Course = require("../models/Courses");
const instance = require("../config/razorpay");
const User = require("../models/User");
const mailSender = require("../utils/nodemailer");
const { courseEnrollmentEmail } = require("../Mail/Templates/CourseEnrollment");
const { paymentSuccessEmail } = require("../Mail/Templates/paymentSuccessfullEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

//capturing the payment and initiate the razorpay order
exports.capturePayment = async (req , res) => {

    try{

        const {courses} = req.body;
        const userId = req.user.id;
        
        if(courses.length === 0) {
            return res.status(500).json({
                success: false,
                message: "Please provide with the courseId"
            })
        }

        let totalAmount = 0;

        for(const courseId of courses) {

            let course;
            try{

                course = await Course.findById(courseId);

                if(!course){
                    return res.status(404).json({
                        success: false,
                        message: "Unable to find course for the id"
                    })
                }
                
                const uid = mongoose.Types.ObjectId.createFromHexString(userId);

                if(course.studentsEnrolled.includes(uid))  {
                    return res.status(403).json({
                        success: false,
                        message: "User already registered"
                    })
                }

                totalAmount += course?.price;
        
            }
            catch(error){
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: "Unable to fetch course price"
                })
            }
        }
        
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Math.random(Date.now()).toString()
        }

        try{
            const paymentResponse = await instance.orders.create(options);

            res.status(200).json({
                success: true,
                data: paymentResponse,
                message: "Order created successfully"
            })
        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Unable to create order"
            })
        }

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to capture payment"
        })
    }
}

exports.verifySignature = async (req , res) =>{

    try{

        const {razorpay_order_id , razorpay_payment_id , razorpay_signature , courses} = req.body;
        const userId = req?.user?.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses) {
            return res.status(403).json({
                success: false,
                message: "Payment failed"
            })
        }

        let body = razorpay_order_id + "|" +razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256" , process.env.Razorpay_Secret).update(body.toString()).digest("hex");

        if(expectedSignature === razorpay_signature){

            await enrolledStudents(courses , userId , res)

            return res.status(200).json({
                success: true,
                message: "Payment Authorized"
            })
        }

        return res.status(403).json({
            success: false,
            message: "Payment failed"
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to verify signature"
        }) 
    }
}

const enrolledStudents = async (courses , userId , res) => {

    for(const courseId of courses) {

        try{

            const course = await Course.findByIdAndUpdate(courseId , {$push:{studentsEnrolled:userId}} , {new:true});

            if(!course){
                return res.status(404).json({
                    succes: false,
                    message: "Course not found"
                })
            }

            const courseProgress = await CourseProgress.create({courseId:courseId , userId:userId , completedVideos:[]})

            const student = await User.findByIdAndUpdate(userId , {$push:{Courses:courseId , CourseProgress:courseProgress._id}} , {new:true});

            if(!student) {
                return res.status(404).json({
                    success: false,
                    message: "Unable to found the user"
                })
            }

            const emailResponse = await mailSender(student.email , `Successfully enrolled to ${course.name}` , courseEnrollmentEmail(course.name , student.firstName))
        
        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Unable to enroll student"
            })
        }
    }
}

exports.sendSuccessfullEmail = async (req , res) => {

    try{

        const {orderId , paymentId , amount} = req.body;
        const userId = req.user.id;

        if(!amount || !paymentId || !orderId) {
            return res.status(403).json({
                success: false,
                message: "Please provide with the required fields"
            })
        }

        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Unable to find the user"
            })
        }

        const mailResponse = await mailSender(user?.email , "Your Payment is Successfull!" , paymentSuccessEmail(`${user?.firstName}`, amount/100 , orderId , paymentId));

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"Unable to send email to the user"
        })
    }
}



// another method 

// async function catchPayment(req , res) {

//     try{

//         const {courses} = req.body;

//         const userId = req.user.id;

//         if(courses.length === 0) {
//             return res.status(403).json({
//                 success:false,
//                 message:"Please send the valid courseId"
//             })
//         };

//         const course = await Course.findById(courseId);

//         if(!course) {
//             return res.status(403).json({
//                 success:false,
//                 message:`Course not found for the courseId ${courseId}`
//             })
//         };

//         //to check whether user is already enrolled in 
//         const uid = mongoose.Types.ObjectId(userId);

//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(400).json({
//                 success:false,
//                 message:`User is already enrolled in the course ${course.name}`
//             })
//         };

//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount:amount*100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:{courseId , userId}
//         }

//         let paymentResponse;
//         try{

//             paymentResponse = await instance.orders.create(options);
//             console.log("paymentResponse ->" ,paymentResponse);
//         }
//         catch(error){
//             console.error(error);
//             return res.status(500).json({
//                 success:false,
//                 message:"Error in creating order"
//             })
//         }

//         res.status(200).json({
//             success: true,
//             courseName: course.name,
//             courseDescription: course.description,
//             thumbnail: course.thumbnail,
//             order_id: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount
//         })
//     }
//     catch(error){
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:"There is an error in catching payment"
//         })
//     }
// };
// module.exports = catchPayment;

// //verify signature of razorpay and server
// async function verifySignature(req , res) {
    
//     const webhook = "123456";

//     const signature = req.headers["x-razorpay-signature"]; // --> this signature is send by razorpay in this key written in brackets

//     const shasum = crypto.createHmac("sha256" , webhook); // --> using hmac algorithm to hash the webhook
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex"); // --> when we run the hashing algorithm on the the input the output we get is refered as digest

//     if(signature === digest) {

//         console.log("Payment is Authorized");

//         const {userId , courseId} = req.body.payload.payment.entity.notes;

//         try{

//             const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId} , {$push:{studentsEnrolled:userId}} , {new:true});

//             if(!enrolledCourse) {
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             };
    
//             const enrolledUser = await User.findByIdAndUpdate({_id:userId} , {$push:{Courses:courseId}} , {new:true});
    
//             if(!enrolledUser) {
//                 return res.status(500).json({
//                     success:false,
//                     message:"Student not found"
//                 })
//             };

//             //send mail
//             const mailResponse = await mailSender(enrolledUser.email , "Congratulations you have enrolled in a new course" , courseEnrollmentEmail(enrolledCourse.name , `${enrolledUser.firstName} ${enrolledUser.lastName}`));

//             console.log("mailResponse" , mailResponse);

//             res.status(200).json({
//                 success:true,
//                 message:"Signature verified and course added"
//             })
//         }
//         catch(error){
//             console.error(error);
//             return res.status(500).json({
//                 success:false
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"invalid response"
//         })
//     }
// };
// module.exports = verifySignature;