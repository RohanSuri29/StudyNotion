import toast from "react-hot-toast";
import { setLoading, setUser } from "../../slices/profileSlice"
import { logout } from "./authAPI";
import apiConnector from "../apiconnector";
import { profileEndpoints } from "../apis";

//get user details
export function getUserdetails(token , navigate) {

    return async(dispatch) => {

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("GET" , profileEndpoints.GET_USER_DETAILS_API , null , {Authorization:`Bearer ${token}`});

            if(!response?.data?.success) {
                throw new Error(response.data.message)
            }

            const userImage = response?.data?.data?.image ? response?.data?.data?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            
            dispatch(setUser({...response?.data?.data , image:userImage}));
            toast.success("User details fetched successfully");
        }
        catch(error) {
            dispatch(logout(navigate))
            console.error(error);
            toast.error("Failed to get user")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

//get enrolled courses
export async function getEnrolledCourses(token) {

    const toastId = toast.loading("Loading...");
    let result = [];
    
    try{

        const response = await apiConnector("GET" , profileEndpoints.GET_USER_ENROLLED_COURSES_API , null , {Authorization:`Bearer ${token}`});

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        
        result = response?.data?.data;
    
    }
    catch(error) {
        console.error(error);
        toast.error("Unable to get enrolled courses")
    }

    toast.dismiss(toastId);
    return result
}

//get instructor dashboard details
export async function getInstructorDetails(token) {

    const toastId = toast.loading("Loading...");
    let result = null;

    try{

        const response = await apiConnector("GET" , profileEndpoints.GET_INSTRUCTOR_DATA_API , null , {Authorization:`Bearer ${token}`});

        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }

        result = response?.data?.data;
    }
    catch(error){
        console.error(error);
        toast.dismiss(toastId);
        toast.error("Could not get instructor details");
    }

    toast.dismiss(toastId);
    return result
}