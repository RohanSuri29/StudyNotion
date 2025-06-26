const mongoose = require("mongoose");
const Course = require("../models/Courses");
const Ratings = require("../models/RatingandReview");

//create Rating and Review
exports.RatingandReviews = async (req , res) => {

    try{

        const {rating , review , courseId} = req.body;

        const userId = req.user.id;

        if(!rating || !courseId) {
            return res.status(403).json({
                success:false,
                message:"Please fill the required details"
            })
        }

        //check if user is already enrolled or not
        const courseDetails = await Course.findById(courseId);
        
        const isEnrolled = courseDetails.studentsEnrolled.includes(userId);
        
        if(!isEnrolled) {
            return res.status(404).json({
                success: false,
                message:"User is not enrolled in the course"
            })
        };

        //check whether user has already reviewed or not
        const alreadyReview = await Ratings.findOne({course:courseId , user:userId});

        if(alreadyReview) {
            return res.status(403).json({
                success:false,
                message:"You have already reviewed for the course"
            })
        };

        const ratingAndReview = await Ratings.create({user:userId , course:courseId , rating, review});

        await Course.findByIdAndUpdate(courseId , {$push:{RatingandReviews:ratingAndReview._id}} , {new:true});

        res.status(200).json({
            success:true,
            data:ratingAndReview,
            message:"Thank You for your ratings and review"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to add the ratings"
        })
    }
};

//get Average Rating and Reviews
exports.getAverageRating = async (req , res) => {
    
    try{
        const {courseId} = req.body;

        const result = await Ratings.aggregate([
            {
                $match:{
                    course: mongoose.Types.ObjectId.createFromHexString(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg:"$rating"}
                }
            }
        ]);
        
        await Course.findByIdAndUpdate(courseId , {averageRating:result[0]?.averageRating})

        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating: result[0]?.averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:"no user has reviewed the course",
            averageRating : 0
        })
    }
    catch(error){
        console.error(error);
        return res.status(200).json({
            success:true,
            message:"no user has reviewed the course",
            averageRating : 0
        })
    }
};

//get All Ratings and Reviews
exports.getAllRating = async (req , res) => {
    
    try{

        const allReviews = await Ratings.find({})
                                        .sort({rating: "desc"})
                                        .populate({path:"user" , select:"firstName lastName email image"})
                                        .populate({path:"course" , select:"name"})
                                        .exec();
       
        res.status(200).json({
            success:true,
            data:allReviews,
            mesasge:"All ratings are fetched successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch the ratings and reviews"
        })
    }
};

//delete a review
exports.deleteReview = async(req , res) => {

    try{

        const {reviewId} = req.body;

        if(!reviewId) {
            return res.status(403).json({
                success:false,
                message:"Please fill the required details"
            })
        };

        const review = await Ratings.findById(reviewId);

        if(!review) {
            return res.status(404).json({
                success:false,
                message:"Unable to find the review for the given id"
            })
        };

        const courseId = review.course;
        
        const updatedCourse = await Course.findByIdAndUpdate(courseId , {$pull:{RatingandReviews:reviewId}} , {new:true});

        await Ratings.findByIdAndDelete(reviewId);

        res.status(200).json({
            success:true,
            data: updatedCourse,
            message:"Your review is deleted successfully"
        })
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete a review"
        })
    }
}

//get reviews of a course
exports.getCourseReviews = async (req , res) => {

    try{

        const {courseId} = req.body;

        if(!courseId){
            return res.status(401).json({
                success:false,
                message:"Please provide with required id"
            })
        };

        const course = await Course.findById(courseId , {name:true , RatingandReviews:true}).populate({path:"RatingandReviews" , populate:{path:"user" , select:"firstName lastName email image"}}).exec();

        if(!course) {
            return res.status(404).json({
                success:false,
                message:"Unable to find course for the id"
            })
        };

        res.status(200).json({
            success:true,
            data:course,
            message:"your course reviews are fetched successfully"
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch reviews of a course"
        })
    }
}
