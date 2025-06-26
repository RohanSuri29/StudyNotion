const Section = require("../models/Section");
const Course = require('../models/Courses');
const Subsection = require("../models/Subsection");

//create Section
exports.createSection = async (req , res) => {

    try{

        const {sectionName , courseId} = req.body;

        if(!sectionName || !courseId) {
            return res.status(403).json({
                success:false,
                message:"Please fill the name of the section"
            })
        };

        const newSection = await Section.create({sectionName});

        const updatedCourse = await Course.findByIdAndUpdate(courseId , {$push:{content:newSection._id}} , {new:true}).populate({path:"content" , populate:{path:"subSection"}}); 

        res.status(200).json({
            success:true,
            data:updatedCourse,
            message:"New Section for the course is created"
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"There is an error in creating section"
        })
    };
};

//update Section
exports.updateSection = async (req , res) => {

    try{
        
        const {sectionName , sectionId , courseId} = req.body;

        if(!sectionName || !sectionId) {
            return res.status(403).json({
                success:false,
                message:"Plase fill the required details"
            })
        };

        const updatedSection = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true});

        const updatedCourse = await Course.findById(courseId).populate({path:"content" , populate:{path:"subSection"}}).exec();

        res.status(200).json({
            success:true,
            data:updatedCourse,
            message:"Section name is updated Successfully"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"There is an error in updating the section"
        })
    }

};

//delete Section
exports.deleteSection = async (req , res) => {

    try{

        const {sectionId , courseId} = req.body 

        if(!sectionId || !courseId){
            return res.status(403).json({
                success:false,
                message:"Unable to fetch the section id and course id"
            })
        };

        const section = await Section.findById(sectionId);

        if(!section) {
            return res.status(404).json({
                success:false,
                message:"section not found"
            })
        }

        const updatedCourse = await Course.findByIdAndUpdate(courseId , {$pull:{content:sectionId}} , {new:true}).populate({path:"content" , populate:{path:"subSection"}});

        await Subsection.deleteMany({_id: { $in : section.subSection }})
        await Section.findByIdAndDelete(sectionId);

        res.status(200).json({
            success:true,
            data:updatedCourse,
            message:"Section deleted Successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in deleting section"
        })
    }
};
