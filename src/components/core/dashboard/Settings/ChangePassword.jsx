import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import IconBtn from "../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../../services/Operations/SettingsApi";

function ChangePassword () {

    const {register , reset , handleSubmit , formState:{errors , isSubmitSuccessful}} = useForm();
    const [showPassword1 , setShowPassword1] = useState(false);
    const [showPassword2 , setShowPassword2] = useState(false);
    const [showPassword3 , setShowPassword3] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {

        if(isSubmitSuccessful) {
            reset({
                
                oldPassword:"",
                newPassword:"",
                confirmNewPassword:""
            })
        }

    } , [reset , isSubmitSuccessful])

    async function saveHandler(data) {

        try{
            dispatch(updatePassword(token , data))
        }
        catch(error) {
            console.error(error)
        }
    }

    return (

        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 mt-32">

            <h2 className="text-lg font-semibold text-richblack-5">
                Change Password
            </h2>

            <form onSubmit={handleSubmit(saveHandler)} className="relative flex flex-col gap-6">

                <div className="relative flex flex-col gap-2 w-full">
                    
                    <label htmlFor="oldPassword">
                        <p className="text-[14px] text-richblack-5">Old Password<sup className="text-pink-200">*</sup></p>
                    </label>

                    <div className="w-full relative">
                        <input className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)]" type={`${showPassword1 ? "text" : "password"}`} id="oldPassword" name="oldPassword" placeholder="Enter Password" {...register("password" , { required:true})}/>

                        <span className="absolute right-3 top-[11px] cursor-pointer" onClick={() => setShowPassword1((prev) => !prev)}>
                            {showPassword1 ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/> }
                        </span>
                    </div>
                    {
                        errors.password && (
                            <span className="-mt-1 text-[12px] text-yellow-100">please fill your password</span>
                        )
                    }
                </div>

                <div className="relative flex flex-col gap-2 w-full">
                    
                    <label htmlFor="newPassword">
                        <p className="text-[14px] text-richblack-5">New Password<sup className="text-pink-200">*</sup></p>
                    </label>

                    <div className="w-full relative">
                        <input className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)]" type={`${showPassword2 ? "text" : "password"}`} id="newPassword" name="newPassword" placeholder="Enter New Password" {...register("newPassword" , {required:true})}/>

                        <span className="absolute right-3 top-[11px] cursor-pointer" onClick={() => setShowPassword2((prev) => !prev)}>
                            {showPassword2 ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/> }
                        </span>
                    </div>
                    {
                        errors.newPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">please fill your new password</span>
                        )
                    }
                </div>

                <div className="relative flex flex-col gap-2 w-full">
                    
                    <label htmlFor="confirmNewPassword">
                        <p className="text-[14px] text-richblack-5">Confirm New Password<sup className="text-pink-200">*</sup></p>
                    </label>

                    <div className="w-full relative">
                        <input className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] inset-shadow-[0px_-1px_0px_rgba(255,255,255,0.18)]" type={`${showPassword3 ? "text" : "password"}`} id="confirmNewPassword" name="confirmNewPassword" placeholder="Confirm New Password" {...register("confirmNewPassword" , {required:true})}/>

                        <span className="absolute right-3 top-[11px] cursor-pointer" onClick={() => setShowPassword3((prev) => !prev)}>
                            {showPassword3 ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/> }
                        </span>
                    </div>
                    {
                        errors.confirmNewPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">please confirm your new password</span>
                        )
                    }
                </div>
                
                <div className="absolute -right-12 -bottom-28">
                    <IconBtn text="Save" type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword