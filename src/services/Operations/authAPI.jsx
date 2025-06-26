import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice"
import apiConnector from "../apiconnector";
import { authEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

//sendOtp
export function sendOtp (email , navigate) {
    
    return async(dispatch) => {

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("POST" , authEndpoints.SENDOTP_API , {email});
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Otp sent successfully");
            navigate("/verify-email")

        }
        catch(error){
            console.error(error);
            toast.error("Unable to send otp")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

//sign in
export function signIn(firstName , lastName , email , password , confirmPassword , accountType , otp , navigate) {

    return async(dispatch) => {

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("POST" , authEndpoints.SIGNUP_API , {firstName , lastName , email , password , confirmPassword , accountType , otp});

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("SignUp Successful");
            navigate('/login')
        }
        catch(error) {
            console.error(error);
            toast.error("Signup Failed");
            navigate('/signup')
        }

        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

//login
export function login(email , password , navigate) {

    return async(dispatch) => {

        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("POST" , authEndpoints.LOGIN_API , {email , password});

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login successfully");
          
            dispatch(setToken(response?.data?.token));
          
            const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({...response?.data?.user , image: userImage}))

            localStorage.setItem("token" , JSON.stringify(response?.data?.token))
            localStorage.setItem("user", JSON.stringify(response?.data?.user))
            navigate("/dashboard/my-profile")

        }
        catch(error){
            console.error(error);
            toast.error("Login Failed");
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

// get resetPassword token
export function getPasswordToken (email , setEmailSent) {

    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try{

            const response = await apiConnector("PUT" , authEndpoints.RESETPASSWORDTOKEN_API , {email});
     
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Email sent successfully")
            setEmailSent(true)
        }
        catch(error){
            console.log(error);
            toast.error("Unable to send email")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

//reset Password
export function resetPassword(password , confirmPassword , token , navigate) {

    return async(dispatch) => {

        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try {

            const response = await apiConnector("PUT" , authEndpoints.RESETPASSWORD_API , {password , confirmPassword , token});

            if(!response.data.success){
                throw new Error (response.data.message)
            }

            toast.success("Password change successfully");
            navigate('/login');

        }
        catch(error) {
            console.error(error);
            toast.error("Failed to reset Password")
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

//logOut
export function logout(navigate) {
    return async(dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged Out");
        navigate('/')
    }
}
