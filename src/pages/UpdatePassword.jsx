import { useDispatch, useSelector } from "react-redux"
import Spinner from "../components/common/Spinner";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";
import { resetPassword } from "../services/Operations/authAPI";


function UpdatePassword () {

    const {loading} = useSelector((state) => state.auth);
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);
    const [formData , setFormData] = useState({password:"" , confirmPassword:""});

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    function changeHandler(event){

        setFormData( (prev) => (
            {
                ...prev,
                [event.target.name] : event.target.value
            }
        ))
    }

    function submitHandler(event) {
        event.preventDefault();

        if(formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match")
        }

        const token = location.pathname.split("/").at(-1);  //--> at(-1) is used to get the last last element of the array
        
        dispatch(resetPassword(formData.password , formData.confirmPassword , token , navigate));
    }

    return (

        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? <Spinner/> :
                (
                    <div className="max-w-[500px] p-4 lg:p-8">

                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose new Password</h1>

                        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                            Almost done. Enter your new password and youre all set.
                        </p>

                        <form onSubmit={submitHandler}>

                            <label htmlFor="password" className="w-full">
                                <p className="text-[0.875rem] text-richblack-5 mb-1.5 leading-[1.375rem]">New Password<sup className="text-pink-200">*</sup></p>
                            </label>
                            <div className="w-full relative mb-8">
                                <input className="bg-richblack-800 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)] rounded-[0.5rem] text-richblack-5 w-full p-[12px]" type={`${showPassword ? "text" : "password"}`} required id="password" name="password" placeholder="Enter Password" value={formData.password} onChange={changeHandler}/>
                                <span className="absolute right-3 top-[11px] cursor-pointer" onClick={() => setShowPassword((prev) => (!prev))}>
                                    {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                                </span>
                            </div>

                            <label htmlFor="confirmPassword" className="w-full">
                                <p className="text-[0.875rem] text-richblack-5 mb-1.5 leading-[1.375rem]">Confirm new Password<sup className="text-pink-200">*</sup></p>
                            </label>
                            <div className="w-full relative mb-8">
                                <input className="bg-richblack-800 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)] rounded-[0.5rem] text-richblack-5 w-full p-[12px]" type={`${showConfirmPassword ? "text" : "password"}`} required id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={changeHandler}/>
                                <span className="absolute right-3 top-[11px] cursor-pointer" onClick={() => setShowConfirmPassword((prev) => (!prev))}>
                                    {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                                </span>
                            </div>

                            <button type="submit" className="w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 cursor-pointer">
                                Reset Password
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-between">
                            <NavLink to={"/login"}>
                                <p className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack/> Back to Login
                                </p>
                            </NavLink>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword