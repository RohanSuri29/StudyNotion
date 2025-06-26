import toast from "react-hot-toast";
import apiConnector from "../apiconnector";
import { categories, courseEndpoints } from "../apis";

//show all categories
export async function getCourseCategories() {

    let result = []

    try{

        const response = await apiConnector("GET" , categories.CATEGORIES_API)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response?.data?.data
    }
    catch(error) {
        console.error(error);
        toast.error("Unable to get Categories")
    }

    return result
}

//edit course details
export async function editCourseDetails(data , token) {

    const toastId = toast.loading("Loading...");
    let result = null;

    try{

        const response = await apiConnector("PUT" , courseEndpoints.EDIT_COURSE_API , data , {"Content-Type": "multipart/form-data" , Authorization: `Bearer ${token}`})
        
        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        result = response?.data?.data;
        toast.success("Updated Successfully")
    }
    catch(error) {
        console.error(error);
        toast.error("Failed to update")
    }

    toast.dismiss(toastId)
    return result
}

//add course details
export async function addCourseDetails(data , token) {
    
    const toastId = toast.loading("Loading...")
    let result = null;

    try{

        const response = await apiConnector("POST" , courseEndpoints.CREATE_COURSE_API , data , {"Content-Type": "multipart/form-data" , Authorization: `Bearer ${token}`})
        
        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }

        result = response?.data?.data;
        toast.success("Course added successfully")
    }
    catch(error){
        console.error(error);
        toast.error("Failed to add course")
    }

    toast.dismiss(toastId)
    return result
}

//update section
export async function updateSection(data , token) {

    const toastId = toast.loading("Loading...")
    let result = null;

    try{

        const response = await apiConnector("PUT" , courseEndpoints.UPDATE_SECTION_API , data , {Authorization: `Bearer ${token}`})

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        toast.success("Section updated successfully")
        result = response.data.data
    }
    catch(error) {
        console.error(error);
        toast.error("Failed to update")
    }

    toast.dismiss(toastId)
    return result
}

//create section
export async function addSection(data,token) {

    const toastId = toast.loading("Loading...")
    let result = null;

    try{

        const response = await apiConnector("POST" , courseEndpoints.CREATE_SECTION_API , data , {Authorization:`Bearer ${token}`})

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        result = response.data.data;
        toast.success("Section created successfully")
    }
    catch(error){
        console.error(error);
        toast.error("Failed to create section")
    }

    toast.dismiss(toastId);
    return result
}

//delete section
export async function deleteSection(data,token) {

    const toastId = toast.loading("Loading...")
    let result = null;

    try{
    
        const response = await apiConnector("DELETE" , courseEndpoints.DELETE_SECTION_API , data , {Authorization: `Bearer ${token}`})

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        result = response.data.data
        toast.success("Section deleted successfully")

    }
    catch(error){
        console.error(error);
        toast.error("Failed to delete section")
    }

    toast.dismiss(toastId)
    return result
}

//delete subsection
export async function deleteSubsection(data , token) {

    const toastId = toast.loading("Loading...")
    let result = null;

    try{

        const response = await apiConnector("Delete" , courseEndpoints.DELETE_SUBSECTION_API , data , {Authorization: `Bearer ${token}`});

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        result = response.data.data;
        toast.success("Subsection deleted successfully")
    }
    catch(error) {
        console.error(error);
        toast.error("Failed to delete subsection")
    }

    toast.dismiss(toastId);
    return result
}

//create subsection
export async function addSubSection(data,token){

    const toastId = toast.loading("Loading...");
    let result = null;

    try{
        const response = await apiConnector("POST" , courseEndpoints.CREATE_SUBSECTION_API , data , {Authorization:`Bearer ${token}`});

        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }

        result = response?.data?.data;
        toast.success("Subsection created successfully")
    }
    catch(error){
        console.error(error);
        toast.error("Failed to create subsection")
    }

    toast.dismiss(toastId);
    return result
}

//update subsection
export async function updateSubSection(data , token) {

    const toastId = toast.loading("Loading...");
    let result = null;

    try{

        const response = await apiConnector("PUT" , courseEndpoints.UPDATE_SUBSECTION_API , data , {Authorization:`Bearer ${token}`});

        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }

        result = response?.data?.data;
        toast.success("Subsection updated successfully")

    }
    catch(error){
        console.error(error);
        toast.error("Failed to update subsection")
    }

    toast.dismiss(toastId);
    return result
}

//fetch instructor courses
export async function fetchInstructorCourses(token) {

    const toastId = toast.loading('Loading...')
    let result = null;

    try{

        const response = await apiConnector('GET' , courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API , null , {Authorization: `Bearer ${token}`});

        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        result = response?.data?.data;
        toast.success("Courses fetched successfully")
    }
    catch(error){
        console.error(error);
        toast.error("Unable to fetch courses")
    }

    toast.dismiss(toastId);
    return result
}

//delete course
export async function deleteCourse(data , token) {

    const toastId = toast.loading("Loading...");
    
    try{

        const response = await apiConnector("DELETE" , courseEndpoints.DELETE_COURSE_API , data , {Authorization:`Bearer ${token}`});

        if(!response?.data?.success){

            throw new Error(response?.data?.message);
        }

        toast.success("Deleted Sucessfully")
    }
    catch(error){
        console.error(error);
        toast.error("Failed to delete")
    }

    toast.dismiss(toastId)
}

//get Course details
export async function fetchCourseDetails(courseId) {

    const toastId = toast.loading("Loading...")
    let result = null;

    try{

        const response = await apiConnector("POST" , courseEndpoints.COURSE_DETAILS_API , {courseId})
      
        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }

        result = response?.data?.data;
    }
    catch(error){
        console.error(error);
        toast.error("Failed to add course")
    }

    toast.dismiss(toastId)
    return result
}

//get full course details
export async function fetchFullCourseDetails(courseId , token) {

    const toastId = toast.loading("Loading...");
    let result = null;

    try{

        const response = await apiConnector("POST" , courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED , {courseId} , {Authorization:`Bearer ${token}`})
    
        if(!response?.data?.success){
            throw new Error(response?.data?.message)
        }

        result = response?.data?.data

        toast.dismiss(toastId);
        toast.success("Course details fetched Successfully")
    }
    catch(error){
        console.error(error);
        toast.error("Unable to fetch course details")
    }

    return result
}

//update course progress
export async function updateProgress(data , token) {

    const toastId = toast.loading("Loading...");
  
    try{

        const response = await apiConnector("POST" , courseEndpoints.LECTURE_COMPLETION_API , data , {Authorization:`Bearer ${token}`});

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        toast.success("Marked as Completed")
    }
    catch(error){
       console.error(error);
       toast.error("Unable to update course progress") 
    }

    toast.dismiss(toastId)
}