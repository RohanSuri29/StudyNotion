const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

//create Category
exports.createCategory = async (req , res) => {

    try{

        const {name , description} = req.body;

        if(!name || !description) {
            return res.status(403).json({
                success:false,
                message:"Please fill the required details of category"
            })
        };

        const newCategory = await Category.create({name , description});

        res.status(200).json({
            success:true,
            data:newCategory,
            message:"Your Tag is created successfully"
        })
    }
    catch(error){
        console.error;
        return res.status(500).json({
            success:false,
            message:"There is an error in creating category"
        })
    }
};

//show all categories
exports.getCategories = async (req , res) => {

    try{

        const categories = await Category.find({} , {name:true , description:true , Courses:true}); // --> it means all the tags returned must have name and description

        res.status(200).json({
            success:true,
            data:categories,
            message:"Success in fecthing your categories"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"There is an error in fecthing your categories"
        })
    }
};

//category Page Details
exports.categoryPageDetails = async (req , res) => {

    try{

        const {categoryId} = req.body;

        const selectedCategory = await Category.findById(categoryId)
                                                .populate({path:"Courses" , match:{status: "Published"} , populate:[{path:"RatingandReviews"} , {path:"instructor"}]})
                                                .exec();
  
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:"No Category found for the id"
            })
        };

        if(selectedCategory.Courses.length === 0) {
            return res.status(404).json({
                success:false,
                message:"No courses found for the given category"
            })
        };

        const categoriesExcept = await Category.find({_id : {$ne: categoryId}});
      
        let differentCategory = await Category.findOne(categoriesExcept[getRandomInt(categoriesExcept.length)]._id).populate({path:"Courses" , match:{status : "Published"} , populate:[{path:"RatingandReviews"} , {path:"instructor"}]})
        .exec();
        
        const allCategories = await Category.find()
                                            .populate({path:"Courses" , match:{status:"Published"} , populate:[{path:"RatingandReviews"} , {path:"instructor"}]})
                                            .exec();
                                
        const allCourses = allCategories.flatMap((category) => category.Courses); // flatMap merges the nested arrsys into a single array

        const mostSelling = allCourses.sort((a,b) => b.sold - a.sold).slice(0,10);

        res.status(200).json({
            success:true,
            data:{selectedCategory , differentCategory , mostSelling},
            message:"all courses fetched for the category successfully"
        })

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch the courses for the category"
        })
    }
};