import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {login} from "../../../services/Operations/authAPI";

function LoginForm() {

    const [formData , setFormData] = useState({email:"" , password:""});
    const [showPassword , setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormData( (prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    const {email , password} = formData;

    function submitHandler(event) {

        event.preventDefault();
        dispatch(login(email , password , navigate))
    }

    return (

        <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
               
            <label htmlFor="email" className="w-full mt-1">
                <p className="text-[0.875rem] text-richblack-5 -mb-2 leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
            </label>
            <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)]" type="email" required id="email" name="email" placeholder="Enter Email Address" value={email} onChange={changeHandler}/>
            
            <label htmlFor="password" className="w-full mt-1">
                <p className="text-[0.875rem] text-richblack-5 -mb-2 leading-[1.375rem]">Password<sup className="text-pink-200">*</sup></p>
            </label>
            <div className="w-full relative">
                <input className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)]" type={`${showPassword ? "text" : "password"}`} required id="password" name="password" placeholder="Enter Password" value={password} onChange={changeHandler}/>
                <span className="absolute right-3 top-[11px] cursor-pointer" onClick={() => setShowPassword((prev) => (!prev))}>
                    {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
                </span>
            </div>

            <NavLink to="/forgot-password"><p className="text-xs -mt-3 text-blue-100 text-right">Forgot Password</p></NavLink>

            <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 cursor-pointer">Sign In</button>
        
        </form>

    )
}

export default LoginForm