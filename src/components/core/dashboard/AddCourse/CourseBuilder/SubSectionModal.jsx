import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { addSubSection, updateSubSection } from "../../../../../services/Operations/courseDetails";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../../../../slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Uploader from "../CourseInformation/Uploader";
import IconBtn from "../../../../common/IconBtn";

function SubSectionModal({modalData , setModalData , add=false , edit=false , view=false}) {

    const {register , setValue , getValues , formState:{errors} , handleSubmit} = useForm();

    const [loading , setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {

        if(view || edit) {
            setValue("lectureTitle" , modalData.title);
            setValue("lectureDesc" , modalData.description);
            setValue("lectureVideo" , modalData.videoUrl);
        }
    },[])

    function isFormUpdated() {

        const currentValue = getValues();

        if(currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !== modalData.description||
            currentValue.lectureVideo !== modalData.videoUrl
        ) {
            return true
        }
        else{
            return false
        }
    }

    async function handleEdit() {

        const currentValue = getValues();
        const formData = new FormData();

        formData.append("subsectionId" , modalData._id);
        formData.append("courseId" , modalData.courseId);
        
        if(currentValue.lectureTitle !== modalData.title){
            formData.append("title" , currentValue.lectureTitle)
        }
        if(currentValue.lectureDesc !== modalData.description){
            formData.append("description" , currentValue.lectureDesc)
        }
        if(currentValue.lectureVideo !== modalData.videoUrl){
            formData.append("videoFile" , currentValue.lectureVideo)
        }

        setLoading(true);
        const result = await updateSubSection(formData , token);

        if(result){
            dispatch(setCourse(result))
        }
        setModalData(null);
        setLoading(false)
    }

    async function submitHandler(data) {

        if(view){
            return view
        }
        if(edit) {

            if(!isFormUpdated()) {
                toast.error("No changes made to the form")
            }
            else{
                handleEdit()
            }
            return
        }

        const formData = new FormData();

        formData.append("sectionId" , modalData.sectionId);
        formData.append("courseId" , modalData.courseId);
        formData.append("title" , data.lectureTitle);
        formData.append("description" , data.lectureDesc);
        formData.append("videoFile" , data.lectureVideo);

        setLoading(true);
        const result = await addSubSection(formData , token)
        
        if(result) {
            dispatch(setCourse(result))
        }
        setModalData(null);
        setLoading(false);
    }

    return (

        <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-full place-items-center overflow-auto bg-white/10 backdrop-blur-sm">
            
            <div className="my-2 w-11/12 max-w-[700px] h-fit rounded-lg border border-richblack-400 bg-richblack-800">

                <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-4">
                    <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lectures</p>
                    <button onClick={() => (!loading && setModalData(null))}>
                        <RxCross1 className="text-2xl text-richblack-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-5 px-8 py-4">

                   
                    <Uploader name="lectureVideo" label="Lecture Video" register={register} setValue={setValue} errors={errors} viewData={view ? modalData.videoUrl : null} editData={edit ? modalData.videoUrl : null} video={true} />
                
                    <div className="flex flex-col space-y-2">

                        <label htmlFor="lectureTitle">
                            <p className="text-sm text-richblack-5">Lecture Title<sup className="text-pink-200">*</sup></p>
                        </label>
                        <input className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" disabled={view||loading} type="text" id="lectureTitle" name="lectureTitle" placeholder="Enter Lecture Title" {...register("lectureTitle" , {required:true})}/>
                        {
                            errors.lectureTitle && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">Please enter the title</span>
                            )
                        }
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="lectureDesc">
                            <p className="text-sm text-richblack-5">Lecture Description{!view && <sup className="text-pink-200">*</sup>}</p>
                        </label>
                        <textarea className="resize-x-none min-h-[100px] w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" name="lectureDesc" id="lectureDesc" placeholder="Enter Lecture Description" {...register("lectureDesc" , {required:true})}/>
                        {
                            errors.lectureDesc && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">Please write description</span>
                            )
                        }
                    </div>
                    
                    <div className="flex justify-end">
                        {!view && <IconBtn disabled={loading} text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}/>}
                    </div>
                </form>

            </div>

        </div>
    )
}

export default SubSectionModal