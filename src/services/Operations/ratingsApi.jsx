import toast from "react-hot-toast";
import apiConnector from "../apiconnector";
import { ratingsEndpoints } from "../apis";

// get average rating
export async function AverageRating(courseId) {

    let result = null;

    try{

        const response = await apiConnector("POST" , ratingsEndpoints.AVERAGE_RATING_API , {courseId});
        
        if(!response?.data?.success) {
            throw new Error(response?.data?.success)
        }
        result  = response?.data?.averageRating;
      
    }
    catch(error){
        console.error(error);
        toast.error("Unable to get average rating")
    }

    return result
}

//get all ratings
export async function allRatings() {

    let result = [];

    try{
        
        const response = await apiConnector("GET" , ratingsEndpoints.REVIEWS_DETAILS_API)
        
        if(!response?.data?.success){
            throw new Error(response?.data?.data)
        }

        result = response?.data?.data
      
    }
    catch(error){
        console.error(error)
    }

    return result
}

//create rating
export async function createRating(data , token) {

    const toastId = toast.loading("Loading...");

    try{

        const response  = await apiConnector("POST" , ratingsEndpoints.CREATE_RATING_API , data , {Authorization:`Bearer ${token}`});

        if(!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success("Review added Successfully")

    }
    catch(error){
        console.error(error);
        toast.error("Unable to add review")
    }

    toast.dismiss(toastId)
}