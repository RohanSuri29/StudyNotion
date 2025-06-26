import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import IconBtn from "../../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { resetCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../util/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/Operations/courseDetails";

function Publish() {

    const {register , setValue , getValues , handleSubmit} = useForm();
    const [loading , setLoading] = useState(false);
    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public" , true)
        }
    },[])

    function goBack() {
        dispatch(setStep(2));
    }

    function goToCourses() {
        dispatch(resetCourse());
        navigate('/dashboard/my-courses')
    }

    async function submitHandler() {

        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){

            goToCourses();
            return  
        }
        
        const formData = new FormData();
        formData.append("courseId" , course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status" , courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData , token);

        if(result) {
            goToCourses();
        }
        setLoading(false);
    }
    
    return (

        <div className="rounded-md border-[1px] mt-16 border-richblack-700 bg-richblack-800 p-6">

            <p className="text-2xl font-semibold text-richblack-5">
                Publish Settings
            </p>

            <form onSubmit={handleSubmit(submitHandler)}>
        
                <div className="my-6 mb-8 flex text-lg items-center">
                    
                    <input className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5" type="checkbox" name="public" id="public" {...register("public")}/>
                    <label htmlFor='public'>
                        <p className="ml-2 text-richblack-400">Make this course as public</p>
                    </label>                
                </div>

                <div className="ml-auto flex max-w-max items-center gap-x-4">

                    <button className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900" disabled={loading} onClick={goBack}>
                        Black
                    </button>

                    <IconBtn text="Save changes" disabled={loading}/>
                </div>

            </form>

        </div>
    )
}

export default Publish