const Course = require("../models/Courses");
const Category = require("../models/Category");
const User = require("../models/User");
const imageUploader = require("../utils/imageUploader");
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const convertSecondsToDuration = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

require('dotenv').config();

//create Course
exports.createCourse = async (req , res) => {

    try{

        let {name , description , whatYouWillLearn , price, category , tags , instructions , status} = req.body;

        const thumbnail = req.files.thumbnailFile;

        if(!name || !description || !whatYouWillLearn || !price || !category || !tags.length) {
            return res.status(403).json({
                success:false,
                message:"Please fill the required details"
            })
        };

        if(!status || status === undefined){
            status = "Draft"
        }

        const id = req.user.id;
        const instructorDetails = await User.findById(id);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor Not found'
            })
        };

        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Please fill the valid category"
            })
        };

        const info = await imageUploader(thumbnail , process.env.Folder);

        const newCourse = await Course.create({
            name,
            description,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tags: JSON.parse(tags),
            thumbnail: info.secure_url,
            category:categoryDetails._id,
            instructor:instructorDetails._id,
            status: status,
            instructions:JSON.parse(instructions)
        })

        await User.findByIdAndUpdate({_id:instructorDetails._id} , {$push:{Courses:newCourse._id}} , {new:true});

        await Category.findByIdAndUpdate({_id:categoryDetails._id} , {$push:{Courses:newCourse._id}} , {new:true});

        res.status(200).json({
            success:true,
            data:newCourse,
            message:"Your Course is created successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"There is an error in creating the course"
        })
    }
};
//edit course
exports.editCourse = async  (req , res) => {

    try{

        const {courseId} = req.body;
        const updates = req.body;

        if(!courseId) {
            res.status(403).json({
                success:false,
                message:"Plaese provide with the courseId"
            })
        }

        const course = await Course.findById(courseId);

        if(!course) {
            res.status(404).json({
                success:false,
                message:"Course not found for the courseId"
            })
        }

        if(req.files && req.files.thumbnailFile !== undefined) {
            
            const thumbnail = req?.files?.thumbnailFile;

            const response = await imageUploader(thumbnail , process.env.Folder);

            course.thumbnail = response?.secure_url;   
        }

        for (const key in updates) {

            if(updates.hasOwnProperty(key)) {

                if(key === "tags" || key === "instructions"){
                    course[key] = JSON.parse(updates[key])
                }
                else{
                    course[key] = updates[key]
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findById(courseId).populate({path:"instructor" , populate:{path:"additionalDetails"}})
                                                            .populate("category")
                                                            .populate("RatingandReviews")
                                                            .populate({path:"content" , populate:{path:"subSection"}}).exec();
        
        res.status(200).json({
            success:true,
            data:updatedCourse,
            message:"Course updated successfully"
        })

    }
    catch(error) {

        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to edit course"
        })
    }
};

//delete course
exports.deleteCourse = async (req , res) => {

    try{

        const {courseId} = req.body;
        const instructorId = req.user.id;

        if(!courseId) {
            return res.status(403).json({
                success:false,
                message:"Please provide valid courseId"
            })
        };

        const course = await Course.findById(courseId);

        if(!course) {
            return res.status(403).json({
                success:false,
                message:"Unable to find the course for the id"
            })
        };

        const studentsEnrolled = course.studentsEnrolled;

        for (const studentId of studentsEnrolled) {
            await User.findByIdAndUpdate(studentId , {$pull:{Courses:courseId}} , {new:true})
        };

        const content = course.content;

        for(const sectionId of content) {
            const section = await Section.findById(sectionId);
            const subsection = section.subSection;
            for(const subsectionId of subsection){
                await Subsection.findByIdAndDelete(subsectionId);
            }
            await Section.findByIdAndDelete(sectionId);
        }

        const categoryId = course.category;

        const category = await Category.findOneAndUpdate({_id:categoryId} , {$pull:{Courses:courseId}} , {new:true})

        const upadtedInstructor = await User.findByIdAndUpdate({_id:instructorId} , {$pull:{Courses:courseId}} , {new:true});

        await Course.findByIdAndDelete(courseId);

        res.status(200).json({
            success:true,
            message:"Your Course is deleted successfully"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Unable to delete course"
        })
    }
};

//get All Courses
exports.getAllCourses = async (req , res) => {

    try{

        const allCourses = await Course.find({status:"Published"} , {name:true , price:true , thumbnail:true , instructor:true , RatingandReviews:true , studentsEnrolled:true}).populate('instructor').exec();

        res.status(200).json({
            success:true,
            courses:allCourses,
            message:"Courses are fetched Successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"There is an error inn fetching the courses"
        })

    }
};

//get Instructor Courses
exports.getInstructorCourses = async (req , res) => {

    try{

        const instructorId = req.user.id;

        if(!instructorId) {
            return res.status(404).json({
                success:false,
                message:"Instructor id not found"
            })
        };

        const instructor = await User.findById(instructorId);

        if(!instructor) {
            return res.status(404).json({
                success:false,
                message:"Instructor not found"
            })
        };

        const courses = await Course.find({instructor:instructorId}).sort({createdAt:-1}).populate({path:"content" , populate:{path:"subSection"}});
        
        courses.forEach((course) => {

            let totalTimeinSec = 0;
            course.content.forEach((section) => {

                section.subSection.forEach((subsection) => {

                    const timeDuration = parseInt(subsection.timeDuration);
                    totalTimeinSec += timeDuration;
                })
            })
            const total = convertSecondsToDuration(totalTimeinSec);
            course.totalTime = total;
        })
    

        res.status(200).json({
            success:true,
            data:courses,
            message:"The courses of instructor are fetched successfully"
        })
    }
    catch(error){

        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Instructor courses"
        })
    }
};

//get Course Details
exports.getCourseDetails = async (req , res) => {

    try{

        const { courseId } = req.body;

        if(!courseId) {
            return res.status(403).json({
                success:false,
                message:"Please enter valid courseId"
            })
        }

        const courseDetails = await Course.findOne({_id:courseId})
                                                .populate({path:"instructor" , populate:{path:"additionalDetails"}})
                                                .populate({path:"content" , populate:{path:"subSection"}})
                                                .populate("category")
                                                .populate({path:"RatingandReviews" , populate:{path:"user"}})
                                                .exec();
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:`Could not found the course for the id ${courseId}`
            })
        }                                          
        
        let totalTimeinSec = 0;

        courseDetails?.content.forEach((section) => {

            section.subSection.forEach((subsection)=> {

                const timeDuration = parseInt(subsection.timeDuration);
                totalTimeinSec += timeDuration
            })
        })

        const totalTime = convertSecondsToDuration(totalTimeinSec);
        courseDetails.totalTime = totalTime;

        res.status(200).json({
            success:true,
            data: {courseDetails, totalTime},
            message:"Course details are fetched Successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to get Course details"
        })
    }
};

//get Full Course Details
exports.getFullCourseDetails = async (req , res) => {

    try{

        const {courseId} = req.body;
        const id = req.user.id;

        const courseDetails = await Course.findById(courseId).populate({path:"instructor" , populate:{path:"additionalDetails"}})
                                                            .populate({path:"content" , populate:{path:"subSection"}})
                                                            .populate("category")
                                                            .populate({path:"RatingandReviews" , populate:{path:"user"}})
                                                            .exec();

        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Unable to find course"
            })
        }

        const courseProgress = await CourseProgress.findOne({courseId:courseId , userId:id});

        let totalTimeinSec = 0;

        courseDetails?.content?.forEach((section) => {

            section?.subSection?.forEach((subsection) => {

                const timeDuration = subsection?.timeDuration;
                totalTimeinSec += timeDuration
            })
        })

        const totalTime = convertSecondsToDuration(totalTimeinSec);

        res.status(200).json({
            success: true,
            data:{
                courseDetails: courseDetails,
                totalTime: totalTime,
                completedVideos: courseProgress?.completedVideos ? courseProgress?.completedVideos : []
            },
            message: "Course details fetched successfully"
        })
    }
    catch(error){

        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Failed to get courses"
        })
    }
}