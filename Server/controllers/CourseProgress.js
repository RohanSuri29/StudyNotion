const CourseProgress = require("../models/CourseProgress");
const Subsection = require("../models/Subsection");

//upadte Course progress
exports.courseProgress = async (req , res) => {

    try{

        const {courseId , subsectionId} = req.body;

        const userId = req.user.id;

        if(!courseId || !subsectionId) {
            return res.status(403).json({
                success:false,
                message:"Please provide with valid courseId and subsectionId"
            })
        };

        const subsection = await Subsection.findById(subsectionId);
        
        if(!subsection) {
            return res.status(404).json({
                success:false,
                message:"Subsection not found for the id"
            })
        };

        const courseProgress = await CourseProgress.findOne({courseId:courseId , userId:userId});

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"courseProgress not found"
            })
        }    

        if(courseProgress.completedVideos.includes(subsectionId)){
            return res.status(403).json({
                success:false,
                message:"Subsection already exists"
            })
        };

        courseProgress.completedVideos.push(subsection._id);

        await courseProgress.save();

        res.status(200).json({
            success:true,
            message:"CourseProgress is updated"
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong in updating courseProgress"
        })
    }
};