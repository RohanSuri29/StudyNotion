import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";
import apiConnector from "../apiconnector";

//update display picture
export function updateDisplayPicture(token , formData) {

    return async(dispatch) => {

        const toastId = toast.loading("Loading...");

        try {

            const response = await apiConnector("PUT" , settingsEndpoints.UPDATE_DISPLAY_PICTURE_API , formData , {Authorization:`Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error(response.data.message);
            }

            toast.dismiss(toastId);
            toast.success("Updated Successfully");

            dispatch(setUser(response?.data?.data));
            localStorage.setItem("user" , JSON.stringify(response.data.data))

        }
        catch(error) {
            console.error(error);
            toast.dismiss(toastId);
            toast.error("Failed to Update")
        }
    }
}

//update profile
export function updateProfile(token , formData) {

    return async(dispatch) => {

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("PUT" , settingsEndpoints.UPDATE_PROFILE_API , formData , {Authorization:`Bearer ${token}`});

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            
            const userImage = response?.data?.profile?.image ? response?.data?.profile?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.profile.firstName} ${response.data.profile.lastName}` 
            dispatch(setUser({...response.data.profile , image:userImage}))

            toast.success("Updated Successfully")

            localStorage.setItem('user' , JSON.stringify(response.data.profile));
        }
        catch(error){
            console.error(error);
            toast.error("Failed to Update")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false))
        
    }
}

//change password
export function updatePassword(token , formData) {

    return async(dispatch) => {

        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("PUT" , settingsEndpoints.CHANGE_PASSWORD_API , formData , {Authorization:`Bearer ${token}`});

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password changed Successfully");

        }
        catch(error) {
            console.error(error);
            toast.error("Failed to change password")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

//delete Profile
export function deleteUser(token , navigate) {

    return async(dispatch) => {

        const toastId = toast.loading("Deleting...");
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("DELETE" , settingsEndpoints.DELETE_PROFILE_API , null , {Authorization:`Bearer ${token}`});

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Account deleted");
            dispatch(logout(navigate));
        }
        catch(error) {
            console.error(error);
            toast.error("Failed to delete account")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}