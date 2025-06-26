const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Courses");
const imageUploader = require("../utils/imageUploader");
const mongoose = require('mongoose');
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const convertSecondsToDuration = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
require('dotenv').config();

//update Profile
exports.updateProfile = async (req , res) => {

    try{

        const {firstName , lastName , dateOfBirth="" , about="" , contact , gender} = req.body;

        const id = req.user.id;

        if(!gender || !contact) {
            return res.status(403).json({
                success:false,
                message:"Please fill the required details"
            })
        };

        const userDetails = await User.findByIdAndUpdate(id , {firstName:firstName , lastName:lastName});

        const profileId = userDetails.additionalDetails;

        await Profile.findByIdAndUpdate(profileId , {dateOfBirth:dateOfBirth , gender:gender , contact:contact , about:about} , {new:true});
        const upadtedUser = await User.findById(id).populate("additionalDetails").exec();

        res.status(200).json({
            success:true,
            profile:upadtedUser,
            message:'Your Profile is Updated Successfully'
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating your profile"
        })
    }
};

//delete user error in logic not able to delete user is from enrolled courses
exports.deleteAccount = async (req , res) => {
    
    try{

        const id = req.user.id;

        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"Unable to find the User"
            })
        };

        if(req?.user?.accountType === "Instructor") {

            //to remove courses of the instructor
            for (const courseId of userDetails.Courses) {

                const course = await Course.findById(courseId);
                for (const sectionId of course.content) {

                    const section = await Section.findById(sectionId);
                    for(const subsectionId of section.subSection) {

                        await Subsection.findByIdAndDelete(subsectionId);
                    }
                    await Section.findByIdAndDelete(sectionId)
                }
                await Course.findByIdAndDelete(courseId)
            }
        }

        const profileId = userDetails.additionalDetails;

        await Profile.findByIdAndDelete(profileId);
   
        //to remove the user id from the students enrolled for the course bought by the user
        if(req?.user?.accountType === "Student") {
            for (const courseId of userDetails.Courses) {
                await Course.findByIdAndUpdate(courseId , {$pull:{studentsEnrolled:id}}, {new:true});
            }
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Your Account is deleted Successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to delete your account"
        })
    }
};

//get user details
exports.getUser = async (req , res) => {

    try{

        const id = req.user.id;

        if(!id){
            return res.status(403).json({
                success:false,
                message:"User does not found"
            })
        };

        const user = await User.findById(id).populate('additionalDetails').exec();

        res.status(200).json({
            success:true,
            data:user,
            message:"User details are fetched successfully"
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to get the user details"
        })
    }
};

//update display Picture
exports.updatePicture = async (req , res) => {

    try{

        const image = req.files.profileImage;
        const id = req.user.id;

        if(!image) {
            return res.status(401).json({
                success:false,
                message:"Please provide with the profile image"
            })
        };

        const response = await imageUploader(image , process.env.Folder , 1000 , 100);

        const updatedProfile = await User.findByIdAndUpdate(id , {image:response.secure_url} , {new:true});

        res.status(200).json({
            success:true,
            data:updatedProfile,
            message:"Profile photo updated successfully"
        })

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to update profile picture"
        })
    };
}; 

//get enrolled courses
exports.enrolledCourses = async (req , res) => {

    try{

        const id = req.user.id;

        const user = await User.findById(id).populate({path:"Courses" , populate:{path:"content" , populate:{path:"subSection"}}}).lean();

        if(!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const courses = user.Courses;

        for (var i = 0; i < courses.length; i++){

            let totalTimeDuration = 0;
            let totalLectures = 0;

            for (var j = 0 ; j < courses[i]?.content.length ; j++){

                for (var k = 0 ; k < courses[i]?.content[j]?.subSection.length ; k++) {

                    const timeDuration = parseInt(courses[i]?.content[j]?.subSection[k]?.timeDuration);
                    totalTimeDuration += timeDuration

                }

                totalLectures += courses[i]?.content[j]?.subSection.length
            }


            const totalTime = convertSecondsToDuration(totalTimeDuration);
            courses[i].totalTime = totalTime

            let courseProgress = await CourseProgress.findOne({courseId:courses[i]?._id , userId:id});
            
            const courseProgressCount = courseProgress?.completedVideos?.length;
            
            if(totalLectures === 0){
                courses[i].progressPercentage = 100
            }
            else{

                const multiplier = Math.pow(10,2);
                const percentage = Math.round((courseProgressCount / totalLectures) * 100 * multiplier)/multiplier;
                courses[i].progressPercentage = percentage;
            }
        }

        return res.status(200).json({
            success:true,
            data:courses,
            message:"User Courses fetched successfully"
        })

    }
    catch(error) {
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Unable to get enrolled courses",

        })
    }
}

//instructor dashboard
exports.instructorDashboard = async (req , res) => {

    try{

        const id = req.user.id;

        const courses = await Course.find({instructor:id});

        const totalCourses = courses?.length;
        let totalStudentsEnrolled = 0;
        let totalIncome = 0;

        const coursesData = courses.map((course) =>{

            const totalStudents = course?.studentsEnrolled?.length;
            totalStudentsEnrolled += totalStudents;

            const totalAmountGenerated = course?.price * totalStudents;
            totalIncome += totalAmountGenerated;

            // const courseStats = {
            //     _id: course?._id,
            //     courseName: course?.name,
            //     coursePrice: course?.price,
            //     totalStudents: totalStudents,
            //     totalAmountGenerated: totalAmountGenerated
            // }

            // return courseStats
        })

        res.status(200).json({
            success: true,
            data: {totalCourses , totalStudentsEnrolled , totalIncome},
            message: "Instructor dashboard data fetched Successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to get instructor dashboard data"
        })
    }
}