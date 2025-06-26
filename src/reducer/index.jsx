import { combineReducers } from "@reduxjs/toolkit";
import  authSlice  from "../slices/authSlice";
import  profileSlice  from "../slices/profileSlice";
import  cartSlice  from "../slices/cartSlice";
import  viewCourseSlice  from "../slices/viewCourseSlice";
import  courseSlice  from "../slices/courseSlice";


const rootReducer = combineReducers({
    auth: authSlice,
    profile: profileSlice,
    cart: cartSlice,
    viewCourse: viewCourseSlice,
    course: courseSlice
})

export default rootReducer