const Section = require("../models/Section");
const Subsection = require("../models/Subsection");
const Course = require("../models/Courses");
const videoUploader = require("../utils/videoUploader");
require('dotenv').config();

//create Subsection
exports.createSubsection = async (req , res) => {

    try{

        const {title , description, sectionId , courseId} = req.body;

        const video = req.files.videoFile;

        if(!title || !description || !sectionId || !video){
            return res.status(403).json({
                success:false,
                message:"Please fill the require details to create a Subsection"
            })
        };

        const info = await videoUploader(video , process.env.Folder);
        
        const newSubsection = await Subsection.create({title , description , timeDuration:`${info.duration}` , videoUrl:info.secure_url});

        const result = await Section.findByIdAndUpdate({_id:sectionId} , {$push:{subSection:newSubsection._id} } , {new:true})

        const updatedCourse = await Course.findById(courseId).populate({path:"content" , populate:{path:"subSection"}}).exec();

        res.status(200).json({
            success:true,
            data: updatedCourse,
            message:"Your new Subsection is created successfully"
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            mesasge:"Something went wrong while creating a subsection"
        })
    }
};

//Update Subsection
exports.updateSubsection = async (req , res) => {

    try{

        let {title , description , subsectionId , courseId} = req.body;

        const subsection = await Subsection.findById(subsectionId);

        if(!subsection) {
            return res.status(404).json({
                success:false,
                message:"Unable to find subsection for the subsection id"
            })
        };
        

        if(req.files && req.files.videoFile !== undefined){

            const video = req.files.videoFile;

            const response = await videoUploader(video , process.env.Folder);

            subsection.videoUrl = response.secure_url;
            subsection.timeDuration = `${response.duration}`;
        }

        if(title !== undefined) {
            subsection.title = title;
        };

        if(description !== undefined) {
            subsection.description = description;
        };
      
        await subsection.save();

        const updatedCourse = await Course.findById(courseId).populate({path:"content" , populate:{path:"subSection"}}).exec();
        
        res.status(200).json({
            success:true,
            data:updatedCourse,
            message:"Subsection updatd successfully"
        });
        
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in updating subsection"
        })
    }
};

//Delete Subsection
exports.deleteSubsection = async (req , res) => {
    
    try {

        const {subsectionId , sectionId , courseId} = req.body;

        if(!subsectionId || !sectionId) {
            return res.status(403).json({
                success:false,
                mesasge:"Unable to fetch the id of the subsection and section"
            })
        };

        const subsection = await Subsection.findById(subsectionId);

        if(!subsection){
            return res.status(403).json({
                success:false,
                message:"Unable to find subsection for the id"
            })
        };

        await Section.findByIdAndUpdate(sectionId , {$pull:{subSection:subsectionId}} , {new:true});

        await Subsection.findByIdAndDelete(subsectionId);

        const updatedCourse = await Course.findById(courseId).populate({path:"content" , populate:{path:"subSection"}})

        res.status(200).json({
            success:true,
            data:updatedCourse,
            message:"Your subsection is deleted successfully"
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in deleting the subsection"
        })
    }
};
