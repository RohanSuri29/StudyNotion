const express = require('express');
const router = express.Router();

//importing middlewares
const authentication = require('../middlewares/Authentication');
const instructorHandler = require('../middlewares/IsInstructor');
const isStudent = require('../middlewares/IsStudent');
const adminHandler = require('../middlewares/IsAdmin');

//importing courses
const {createCourse , getAllCourses , getCourseDetails , getInstructorCourses , deleteCourse, editCourse, getFullCourseDetails} = require('../controllers/Course');

//importing category
const {createCategory , getCategories , categoryPageDetails} = require('../controllers/Category');

//importing section
const {createSection , updateSection , deleteSection} = require('../controllers/Section'); 

//importing subsection
const {createSubsection , updateSubsection , deleteSubsection} = require('../controllers/Subsection');

//import rating and review
const {RatingandReviews , getAverageRating , getAllRating , deleteReview , getCourseReviews} = require('../controllers/RatingandReview');

//importing course progress
const { courseProgress } = require('../controllers/CourseProgress');

// ************************** Routes ************************

//courses routes
router.post('/createCourse' , authentication , instructorHandler , createCourse);
router.get('/getAllCourses' , getAllCourses);
router.post('/getCourseDetails' , getCourseDetails);
router.get('/getInstructorCourses' , authentication , instructorHandler , getInstructorCourses);
router.delete('/deleteCourse' , authentication , instructorHandler , deleteCourse);
router.put('/editCourse' , authentication , instructorHandler , editCourse);
router.post('/getFullCourseDetails' , authentication , getFullCourseDetails);
router.post('/updateCourseProgress' , authentication , isStudent , courseProgress)

//category routes(only by admin)
router.post('/createCategory' , authentication , adminHandler , createCategory);
router.get('/showAllCategories' , getCategories);
router.post('/getCategoryPageDetails' , categoryPageDetails);

//section routes(only by instructor)
router.post('/addSection' , authentication , instructorHandler , createSection);
router.put('/updateSection' , authentication , instructorHandler , updateSection);
router.delete('/deleteSection' , authentication , instructorHandler , deleteSection);

//subsection routes(only by instructor)
router.post('/addSubSection' , authentication , instructorHandler , createSubsection);
router.put('/updateSubSection' , authentication , instructorHandler , updateSubsection);
router.delete('/deleteSubSection' , authentication , instructorHandler , deleteSubsection);

//rating and review routes
router.post('/createRating' , authentication , isStudent , RatingandReviews);
router.post('/getAverageRating' , getAverageRating);
router.get('/getReviews' , getAllRating);
router.delete('/deleteReview' , deleteReview);
router.get('/getCourseReviews' , getCourseReviews)

module.exports = router;