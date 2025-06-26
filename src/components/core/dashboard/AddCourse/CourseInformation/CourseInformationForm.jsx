import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { addCourseDetails, editCourseDetails, getCourseCategories } from "../../../../../services/Operations/courseDetails";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { MdNavigateNext } from "react-icons/md";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../util/constants";
import Uploader from "./Uploader";
import { useLocation, useParams } from "react-router-dom";

function CourseInformationForm() {

    const {register , setValue , getValues , formState:{errors} , handleSubmit} = useForm();

    const [loading , setLoading] = useState(false);
    const dispatch = useDispatch();
    const [courseCategories , setCategories] = useState([]);
    const {course , editCourse} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const {courseId} = useParams();
    const {select} = useSelector((state) => state.auth);

    async function getCategories() {

        setLoading(true)

        try{ 
            const categories = await getCourseCategories();
            
            if(categories.length > 0) {
                setCategories(categories);
            }
        }
        catch(error){
            console.erro(error)
        }

        setLoading(false)
    }

    if(courseId || select){
        useEffect(() => {
    
            if(editCourse) {
                setValue("courseTitle" , course.name)
                setValue("courseDesc" , course.description)
                setValue("coursePrice" , course.price)
                setValue("courseTags" , course.tags)
                setValue("courseBenefits" , course.whatYouWillLearn)
                setValue("courseCategory" , course.category)
                setValue("courseRequirements" , course.instructions)
                setValue("courseImage" , course.thumbnail)
            }

        },[editCourse])
    }

    useEffect(() => {
        getCategories()
    },[])

    function isFormUpdated() {

        const currentValue = getValues();
    
        if(currentValue.courseTitle !== course.name ||
            currentValue.courseDesc !== course.description ||
            currentValue.coursePrice !== course.price ||
            currentValue.courseTags.toString() !== course.tags.toString() ||
            currentValue.courseBenefits !== course.whatYouWillLearn ||
            currentValue.courseCategory._id !== course.category._id ||
            currentValue.courseRequirements.toString() !== course.instructions.toString()||
            currentValue.courseImage !== course.thumbnail
        ) 
            {
                return true
        }
        else{
            return false
        }
    }

    async function submitHandler(data) {

        if(editCourse) {

            if(isFormUpdated()){

                const currentValue = getValues();
                const formData = new FormData();

                formData.append("courseId" , course._id);

                if(currentValue.courseTitle !== course.name){
                    formData.append("name" , data.courseTitle)
                }
                if(currentValue.courseDesc !== course.description){
                    formData.append("description" , data.courseDesc)
                }
                if(currentValue.coursePrice !== course.price){
                    formData.append("price" , data.coursePrice)
                }
                if(currentValue.courseTags.toString() !== course.tags.toString()){
                    formData.append("tags" , JSON.stringify(data.courseTags))
                }
                if(currentValue.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn" , data.courseBenefits)
                }
                if(currentValue.courseCategory._id !== course.category._id){
                    formData.append("category" , data.courseCategory)
                }
                if(currentValue.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions" , JSON.stringify(data.courseRequirements))
                }
                if(currentValue.courseImage !== course.thumbnail){
                    formData.append("thumbnailFile" , data.courseImage)
                }

                setLoading(true);
                const result = await editCourseDetails(formData , token)
                setLoading(false);

                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result))
                }

            }
            else{
                toast.error("No changes made")
            }
            return;
        }
        else{

            const formData = new FormData();

            formData.append("name" , data.courseTitle);
            formData.append("description" , data.courseDesc);
            formData.append("price" , data.coursePrice);
            formData.append("tags" ,JSON.stringify( data.courseTags))
            formData.append("whatYouWillLearn" , data.courseBenefits);
            formData.append("category" , data.courseCategory);
            formData.append("instructions" , JSON.stringify(data.courseRequirements));
            formData.append("thumbnailFile" , data.courseImage);
            formData.append("status" , COURSE_STATUS.DRAFT);
            
            setLoading(true);
            const result = await addCourseDetails(formData , token)
            setLoading(false);

            if(result){
                dispatch(setStep(2));
                dispatch(setCourse(result))
            }

        }
    }

    return (

        <div className="space-y-8 rounded-md mt-16 border-[1px] border-richblack-700 bg-richblack-800 p-6">
            
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-8">

                {/* Course Title */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="courseTitle">
                        <p className="text-sm text-richblack-5" htmlFor="courseTitle">Course Title<sup className="text-pink-200">*</sup></p>
                    </label>
                    <input className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" id="courseTitle" name="courseTitle" placeholder="Enter Course Title" {...register("courseTitle" , {required:true})}/>
                    {
                        errors.courseTitle && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please write the title of the course</span>
                        )
                    }
                </div>
                
                {/* Course description */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="courseDesc">
                        <p className="text-sm text-richblack-5">Course Short Description<sup className="text-pink-200">*</sup></p>
                    </label>
                    <textarea className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none resize-x-none min-h-[130px] w-full" name="courseDesc" id="courseDesc" placeholder="Enter Description" {...register("courseDesc" , {required:true})}/>
                    {
                        errors.courseDesc && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please write short description of your course</span>
                        )
                    }
                </div>
                
                {/* Course Price */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="coursePrice">
                        <p className="text-sm text-richblack-5" htmlFor="coursePrice">Course Price<sup className="text-pink-200">*</sup></p>
                    </label>
                    <div className="relative">
                        <input className=" w-full !pl-12 rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" id="coursePrice" name="coursePrice" placeholder="Enter Course Price" {...register("coursePrice" , {required:true , valueAsNumber:true})} />
                        <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
                    </div>
                    {
                        errors.coursePrice && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please write the price of course</span>
                        )
                    }
                </div>
                
                {/* Categories */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="courseCategory">
                        <p className="text-sm text-richblack-5">Course Category<sup className="text-pink-200">*</sup></p>
                    </label>
                    <select className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" name="courseCategory" id="courseCategory" defaultValue="" {...register("courseCategory" , {required:true})}>
                        <option value="" disabled>
                            Choose a Category
                        </option>
                        {
                            !loading && (
                                courseCategories?.map((category , index) => (
                                    <option value={category?._id} key={index}>
                                        {category?.name}
                                    </option>
                                ))
                            )
                        }
                    </select>
                    {
                        errors.courseCtegory && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please choose a category</span>
                        )
                    }
                </div>
                
                {/* Course Tags */}
                <ChipInput label="Tags" name="courseTags" placeholder="Enter tags and press enter" register={register} getValues={getValues} setValue={setValue} errors={errors}/>
                
                {/* Course thumbnail */}
                <Uploader name="courseImage" label="Course Thumbnail" register={register} setValue={setValue} errors={errors} editData={courseId || select ? course?.thumbnail : null}/>
                
                {/* Benefits of the course */}
                <div className="flex flex-col space-y-2">
                    <label htmlFor="courseBenefits">
                        <p className="text-sm text-richblack-5">Benefits of the course<sup className="text-pink-200">*</sup></p>
                    </label>
                    <textarea className="resize-x-none min-h-[130px] w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" name="courseBenefits" id="courseBenefits" placeholder="Enter Benefits of the course" {...register("courseBenefits" , {required:true})}/>
                    {
                        errors.courseBenefits && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please wrire benefits if the course</span>
                        )
                    }
                </div>

                {/* Requirement Field */}
                <RequirementField name="courseRequirements" label="Requirements/Instructions" register={register} errors={errors} setValue={setValue} getValues={getValues}/>
                
                {/* Buttons */}
                <div className="flex justify-end gap-x-2">
                    {
                        courseId || select ? (
                            <button disabled={loading} onClick={() => dispatch(setStep(2))} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900 hover:scale-75`}>
                                Continue without saving
                            </button>
                        ) : (<></>)
                    }
                    <IconBtn text={courseId || select ? ("Save changes") : ("Next")} type="submit">
                        <MdNavigateNext/>
                    </IconBtn>
                </div>
            </form>

        </div>
    )
}

export default CourseInformationForm