import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import apiConnector from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import CountryCode from "../../data/countrycode.json";

function ContactUsform() {

    const [loading , setLoading] = useState(false);

    const {register , reset , handleSubmit , formState:{errors , isSubmitSuccessful}} = useForm();

    useEffect( () => {

        if(isSubmitSuccessful) {
            reset({
                firstName:"",
                lastName:"",
                email:"",
                phoneNo:"",
                message:""
            })
        }

    },[reset , isSubmitSuccessful]) // --> whenever there is a change in form structure there will be a change in reset function implementation as the code is not written by us but is managed by the hook

    const submitContactForm = async(data) => {

        const toastId = toast.loading("Submitting your form...");
        setLoading(true);

        try{

            const response = await apiConnector("POST" , contactusEndpoint.CONTACT_US_API , data);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Submitted Successfully")
        }
        catch(error){
            console.error(error);
            toast.error("Failed to submit")
        }

        toast.dismiss(toastId);
        setLoading(false);
    }

    return (

        <div className="mt-2 mb-20 mx-auto">
            
            <form className="flex flex-col gap-7" onSubmit={handleSubmit(submitContactForm)}>

                <div className="flex flex-col gap-5 lg:flex-row">

                    {/* First Name */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">

                        <label htmlFor="firstName">
                            <p className="text-[14px] text-richblack-5">First Name</p>
                        </label>
                        <input className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" id="firstName" name="firstName" placeholder="Enter first name" {...register("firstName" , {required:true})}/>
                        {
                            errors.firstName && (<span className="-mt-1 text-[12px] text-yellow-100">Please enter your first name</span>)
                        }
                    </div>
                    
                    {/* Last Name */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">

                        <label htmlFor="lastName">
                            <p className="text-[14px] text-richblack-5">Last Name</p>
                        </label>
                        <input className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" id="lastName" name="lastName" placeholder="Enter last name" {...register("lastName" , {required:true})}/>
                        {
                            errors.lastName && (<span className="-mt-1 text-[12px] text-yellow-100">Please enter your last name</span>)
                        }
                    </div>

                </div>
                
                {/* Email Address */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">
                        <p className="text-[14px] text-richblack-5">Email Address</p>
                    </label>
                    <input className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="email" id="email" name="email" placeholder="Enter email address" {...register("email" , {required:true})}/>
                    {
                        errors.email && (<span className="-mt-1 text-[12px] text-yellow-100">Please enter your email address</span>)
                    }
                </div>

                {/* Phone number */}
                <div className="flex flex-col gap-2">

                    <label htmlFor="phoneNo">
                        <p className="text-[14px] text-richblack-5">Phone Number</p>
                    </label>

                    <div className="flex gap-5">

                        {/* dropdown */}
                        <div className="flex w-[81px] flex-col gap-2">

                            <select className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" name="dropdown" id="dropdown" {...register("countryCode" , {required:true})}>
                                {
                                   CountryCode.map( (element , index) => (
                                        <option key={index} value={element.code}>
                                            {element.code}-{element.country}
                                        </option>
                                   )) 
                                }
                            </select>

                        </div>
                        
                        {/* input field */}
                        <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                            <input className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 
                                placeholder:text-richblack-400 focus:outline-none" type="number" id="phoneNo" name="phoneNo" placeholder="12345 67890" {...register("phoneNo" , 
                                {required:{value:true , message:"Please enter your phone number"} , maxLength: {value:12 , message:"Phone number is invalid"} , minLength:{value:10 , message: "Phone number is invalid"}})} 
                            />
                        </div>
                    </div>
                    {
                        errors.phoneNo && (<span className="-mt-1 text-[12px] text-yellow-100">{errors.phoneNo.message}</span>)
                    }
                </div>
                
                {/* Message */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="message">
                        <p className="text-[14px] text-richblack-5">Message</p>
                    </label>
                    <textarea className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" id="message" name="message" cols="30" rows="7" placeholder="Enter your message here" {...register("message" , {required:true})}/>
                    {
                        errors.message && (<span className="-mt-1 text-[12px] text-yellow-100">Please write down the message</span>)
                    }
                </div>
                
                {/* Button */}
                <button type="submit" disabled={loading} className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${!loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"} disabled:cursor-not-allowed disabled:bg-richblack-500 sm:text-[16px]`}>
                    Send Message
                </button>

            </form>
        </div>
    )
}

export default ContactUsform