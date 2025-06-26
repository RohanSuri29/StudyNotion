const express = require('express');
const router = express.Router();

//importing middleware
const authentication = require('../middlewares/Authentication');
const isStudent = require('../middlewares/IsStudent');
const instructorHandler = require('../middlewares/IsInstructor');

//importing profile
const {deleteAccount , updateProfile , getUser , updatePicture, enrolledCourses, instructorDashboard} = require('../controllers/Profile');

//************************** Routes ******************************

//profile routes
router.delete('/deleteProfile' , authentication , deleteAccount);
router.put('/updateProfile' , authentication , updateProfile);
router.get('/getUserDetails' , authentication , getUser);
router.put('/updateDisplayPicture' , authentication , updatePicture);
router.get('/getEnrolledCourses' , authentication , isStudent , enrolledCourses)
router.get('/instructorDashboard' , authentication , instructorHandler , instructorDashboard)

module.exports = router;