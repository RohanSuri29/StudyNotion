import { useDispatch, useSelector } from "react-redux"
import Spinner from "../components/common/Spinner"
import OTPInput from "react-otp-input";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signIn } from "../services/Operations/authAPI";

function VerifyEmail () {

    const {loading} = useSelector((state) => state.auth);
    const [otp , setotp] = useState("");
    const {signupData} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if(!signupData) {
            navigate("/signup")
        }

    },[])
    
    const {firstName , lastName , email , password , confirmPassword , accountType} = signupData;

    function submitHandler(event) {
        event.preventDefault();
        dispatch(signIn(firstName , lastName , email , password , confirmPassword , accountType , otp , navigate))
    }

    return (

        <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
            {
                loading ? <Spinner/> : 
                (
                    <div className="max-w-[500px] p-4 lg:p-8">

                        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify email</h1>

                        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                            A verification code has been sent to you. Enter the code below
                        </p>

                        <form onSubmit={submitHandler}>

                            <OTPInput 
                                value={otp} 
                                onChange={setotp} 
                                numInputs={6} 
                                renderInput={ (props) => (<input {...props} placeholder="-" className="sm:min-w-14 min-w-12 border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-5 inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)]"/>)}
                                containerStyle={{ justifyContent:"space-between", gap:"0 6px"}}
                            />
                        
                            <button type="submit" className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">
                                Verify
                            </button>

                        </form>

                        <div className="mt-6 flex items-center justify-between">

                            <NavLink to={"/signup"}>
                                <p className="text-richblack-5 flex items-center gap-x-2">
                                    <BiArrowBack/> Back to Signup
                                </p>
                            </NavLink>

                            <button className="flex items-center text-blue-100 gap-x-2" onClick={() => dispatch(sendOtp(email , navigate))}>
                                <RxCountdownTimer/> Resend it
                            </button>
                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail