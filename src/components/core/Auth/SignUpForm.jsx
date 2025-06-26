import { useState } from "react";
import { ACCOUNT_TYPE } from "../../../util/constants"
import Tab from "../../common/Tab";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice" 
import { sendOtp } from "../../../services/Operations/authAPI";
import { useNavigate } from "react-router-dom";

function SignUpForm() {

    const [accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [formData , setFormData] = useState({firstName: "" , lastName: "" , email : "" , password:"" , confirmPassword:""});
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tabData = [
        {
            id:1,
            tabName:"Student",
            type:ACCOUNT_TYPE.STUDENT
        },
        {
            id:2,
            tabName: "Instructor",
            type:ACCOUNT_TYPE.INSTRUCTOR
        }
    ]

    function changeHandler(event) {
        setFormData( (prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value
            }
        ))
    }

    const {firstName , lastName , email , password , confirmPassword} = formData;

    function submitHandler (event) {

        event.preventDefault();

        if(password !== confirmPassword) {
            toast.error("Passwords do not match")
            return 
        }

        const signupData = {
            ...formData,
            accountType
        }

        dispatch(setSignupData(signupData));

        dispatch(sendOtp(email , navigate));

        // Reset
        setFormData({
            firstName:"",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    return (

        <div>
            
            <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType}/>

            <form onSubmit={submitHandler} className="flex w-full flex-col gap-y-4">

                {/* FirstName and LastName */}
                <div className="flex gap-x-4">

                    <div className="w-full">
                        <label htmlFor="firstName" className="w-full mt-1">
                            <p  className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">First Name<sup className="text-pink-200">*</sup></p>
                        </label>
                        <input className="bg-richblack-800 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)] rounded-[0.5rem] text-richblack-5 w-full p-[12px]" type="text" required placeholder="Enter First Name" id="firstName" name="firstName" value={firstName} onChange={changeHandler}/>
                    </div>

                    <div className="w-full">
                        <label htmlFor="lastName" className="w-full mt-1">
                        <p  className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Last Name<sup className="text-pink-200">*</sup></p>
                        </label>
                        <input className="bg-richblack-800 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)] rounded-[0.5rem] text-richblack-5 w-full p-[12px]" type="text" required id="lastName" name="lastName" placeholder="Enter Last Name" value={lastName} onChange={changeHandler} />
                    </div>

                </div>
                
                {/* email */}
                <div className="w-full">
                    <label htmlFor="email" className="w-full mt-1">
                    <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Email Address<sup className="text-pink-200">*</sup></p>
                    </label>
                    <input className="bg-richblack-800 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)] rounded-[0.5rem] text-richblack-5 w-full p-[12px]" required type="email" id="email" name="email" placeholder="Enter email address" value={email} onChange={changeHandler} />
                </div>

                <div className="flex gap-x-4">

                    {/* Password */}
                    <div className="w-full">
                        <label htmlFor="password" className="w-full mt-1">
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"> Create Password<sup className="text-pink-200">*</sup></p>
                        </label>

                        <div className="w-full relative">
                            <input className="bg-richblack-800 placeholder:text-sm lg:placeholder:text-[16px] inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)] rounded-[0.5rem] text-richblack-5 w-full p-[12px]" type={`${showPassword ? "text" : "password"}`} required id="password" name="password" placeholder="Enter Password" value={password} onChange={changeHandler}/>
                            <span className="absolute right-3 top-[11px] cursor-pointer" onClick={() => setShowPassword((prev) => (!prev))}>
                                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
                            </span>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="w-full">
                        <label htmlFor="confirmPassword" className="w-full mt-1">
                            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"> Confirm Password<sup className="text-pink-200">*</sup></p>
                        </label>

                        <div className="w-full relative">
                            <input className="bg-richblack-800 placeholder:text-sm lg:placeholder:text-[16px] rounded-[0.5rem] inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)] text-richblack-5 w-full p-[12px]" type={`${showConfirmPassword ? "text" : "password"}`} required id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={changeHandler}/>
                            <span className="absolute right-3 top-[11px] cursor-pointer" onClick={() => setShowConfirmPassword((prev) => (!prev))}>
                                {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
                            </span>
                        </div>
                    </div>

                </div>

                <button className="w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6 cursor-pointer">Create Account</button>
            </form>
        </div>
    )
}

export default SignUpForm