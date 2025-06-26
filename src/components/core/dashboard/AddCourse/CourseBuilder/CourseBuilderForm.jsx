import { useForm } from "react-hook-form"
import IconBtn from "../../../../common/IconBtn"
import { useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { addSection, updateSection } from "../../../../../services/Operations/courseDetails";
import NestedView from "./NestedView";
import { setSelect } from "../../../../../slices/authSlice";

function CourseBuilderForm() {

    const {register , setValue , formState:{errors} , reset , handleSubmit} = useForm()

    const [loading , setLoading] = useState(false);
    const [editSectionName , setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    function cancelEdit() {
        setEditSectionName(false);
        setValue("courseSection" , "")
    }

    function handleChange(sectionId , sectionName) {

        if(editSectionName === sectionId) {
            cancelEdit();
            return
        }

        setEditSectionName(sectionId);
        setValue("courseSection" , sectionName)
    }

    function goBack() {

        dispatch(setStep(1));
        dispatch(setEditCourse(true));
        dispatch(setSelect(true))
    }

    function goToNext() {

        if(course.content.length === 0) {
            toast.error("Please create atlease one section")
            return
        }
        if(course?.content?.subSection?.length === 0) {
            toast.error("Please add atleast one lecture in each section")
            return
        }
        dispatch(setStep(3))
    }

    async function submitHandler(data) {

        setLoading(true);
        let result;

        if(editSectionName){

            result = await updateSection({sectionName:data.courseSection , sectionId:editSectionName , courseId:course._id} , token)
        }
        else{

            result = await addSection({sectionName:data.courseSection , courseId:course._id} , token)
        }
        if(result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("courseSection" , "")
        }
        setLoading(false)
    }

    return (

        <div className="space-y-8 mt-16 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

            <h2 className="text-2xl font-semibold text-richblack-5">
                Course  Builder
            </h2>

            <form className="flex flex-col gap-3 space-y-2" onSubmit={handleSubmit(submitHandler)}>

                <label htmlFor="courseSection">
                    <p className="text-sm text-richblack-5">Section Name<sup className="text-pink-200">*</sup></p>
                </label>

                <input className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" disabled={loading} id="courseSection" name="courseSection" placeholder="Add a section to build your course" {...register("courseSection" , {required: true})}/>
                {
                    errors.courseSection && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Please write section name</span>
                    )
                }

                <div className="flex items-end gap-x-4">

                    <IconBtn type="submit" outline={true} disabled={loading} text={editSectionName ? "Edit Section Name" : "Create Section"}>
                        <IoAddCircleOutline size={20} className="text-yellow-50"/>
                    </IconBtn>
                    {
                        editSectionName && (
                            <button className="text-sm text-richblack-300 underline" onClick={cancelEdit}>
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
    
            </form>

            {course.content.length > 0 && (
                <NestedView handleChange={handleChange}/>
            )}

            <div className="flex justify-end gap-x-3">

                <button onClick={goBack} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                    Back
                </button>

                <IconBtn text="Next" disabled={loading} onclick={goToNext}>
                    <MdNavigateNext/>
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm