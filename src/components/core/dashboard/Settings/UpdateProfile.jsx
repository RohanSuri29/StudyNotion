import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { updateProfile } from "../../../../services/Operations/SettingsApi";

const UpdateProfile = () => {

    const {register , handleSubmit , reset , formState:{errors , isSubmitSuccessful}} = useForm();
    const {user} = useSelector((state) => state.profile);
    const genders = ["Prefer not to say" , "Male" , "Female" , "Non-binary" , "Other"]
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect( () => {

        if(isSubmitSuccessful) {

            reset({
                firstName:"",
                lastName:"",
                gender:"",
                dateOfBirth:"",
                contact:"",
                about:""
            })
        }

    } , [reset , isSubmitSuccessful])

    async function saveHandler(data) {

        try{
            
            dispatch(updateProfile(token,data))
        }
        catch(error) {
            console.error(error.message)
        }
    }

    return (

        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            
            <h2 className="text-lg font-semibold text-richblack-5">
                Profile Information
            </h2>

            <form onSubmit={handleSubmit(saveHandler)} className="flex flex-col gap-6 relative">

                <div className="flex flex-col gap-5 lg:flex-row">

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        
                        <label htmlFor="firstName">
                            <p className="text-[14px] text-richblack-5">First Name</p>
                        </label>

                        <input className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" id="firstName" name="firstName" placeholder="Enter first name" defaultValue={user?.firstName} {...register("firstName" , {required:true})}/>
                        {
                            errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">please fill the first name</span>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-2 lg:w-[48%]">

                        <label htmlFor="lastName">
                            <p className="text-[14px] text-richblack-5">Last Name</p>
                        </label>

                        <input className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" id="lastName" name="lastName" placeholder="Enter last name" defaultValue={user?.lastName} {...register("lastName" , {required:true})} />
                        {
                            errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">please fill the last name</span>
                            )
                        }
                    </div>

                </div>

                <div className="flex flex-col gap-5 lg:flex-row">

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        
                        <label htmlFor="dateOfBirth">
                            <p className="text-[14px] text-richblack-5">Date Of Birth</p>
                        </label>

                        <input className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="date" id="dateOfBirth" name="dateOfBirth" defaultValue={user?.additionalDetails?.dateOfBirth} {...register("dateOfBirth" , {required:{value:true , message:"please fill your date of birth"} , max:{value: new Date().toISOString().split("T")[0], message:"date of birth cannot be in future"}})}/>
                        {
                            errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">{errors.dateOfBirth.message}</span>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        
                        <label htmlFor="dropdown">
                            <p className="text-[14px] text-richblack-5">Gender</p>
                        </label>

                        <select name="dropdown" id="dropdown" className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" {...register("gender" , {required:true})} defaultValue={user?.additionalDetails?.gender}>
                            {
                                genders.map((element , index) => (
                                    <option key={index} value={element}>
                                        {element}
                                    </option>
                                ))
                            }
                        </select>
                        {
                            errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">Please provide with your gender</span>
                            )
                        }
                    </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row">

                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        
                        <label htmlFor="contact">
                            <p className="text-[14px] text-richblack-5">Contact Number</p>
                        </label>

                        <input className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="number" id="contact" name="contact" placeholder="Enter contact number" defaultValue={user?.additionalDetails?.contact} {...register("contact" , {required:{value:true , message:"please fill your contsct number"} , maxLength:{value:12 , message:"Invalid contact number"} , minLength:{value:10 , message:"Invalid contact number"}})}/>
                        {
                            errors.contact && (
                                <span className="-mt-1 text-[12px] text-yellow-100">please fill your contact number</span>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-2 lg:w-[48%]">

                        <label htmlFor="about">
                            <p className="text-[14px] text-richblack-5">About</p>
                        </label>

                        <input className=" rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" id="about" name="about" placeholder="Enter Bio Details" defaultValue={user?.additionalDetails?.about} {...register("about" , {required:true})} />
                        {
                            errors.about && (
                                <span className="-mt-1 text-[12px] text-yellow-100">please fill your bio details</span>
                            )
                        }
                    </div>

                </div>
                
                <div className="absolute -right-12 -bottom-28">
                    <IconBtn text="Save" type="submit"/>
                </div>
                
            </form>
        </div>
    )
}

export default UpdateProfile