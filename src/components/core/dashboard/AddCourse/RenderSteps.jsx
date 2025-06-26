import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux"
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import Publish from "./PublishCourse/Publish";

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);

    const steps =[
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Building"
        },
        {
            id: 3,
            title: "Publishing Course"
        }
    ]

    return (
        <>
            <div className="w-full flex flex-col gap-2 xl:mx-0 sm:ml-20">

                <div className="w-[95%] flex justify-center relative left-14">
                    {
                        steps.map((item) => (
                                    
                            <div className="flex w-full" key={item.id}>

                                <div className={`grid aspect-square cursor-default w-[42px] place-items-center rounded-full border-[1px] ${step === item.id ? "border-yellow-50 bg-yellow-900 text-yellow-50" : "border-richblack-700 bg-richblack-800 text-richblack-300"} ${step > item.id && "bg-yellow-50 text-yellow-50"}`}>

                                    {
                                        step > item.id ? (<FaCheck className="font-bold text-richblack-900"/>) : (item.id)
                                    }
                                </div>
                            
                                <div className="w-full">
                                {
                                    steps.length !== item.id && (
                                        <div  className={`relative h-[calc(34px/2)] w-full border-dashed border-b-2 ${
                                            step > item.id  ? "border-yellow-50" : "border-richblack-400"
                                        } `}/>
                                    )
                                }
                                </div>
                            </div>
                        
                        ))
                    }
                </div>

                <div className="w-full flex gap-2 text-center justify-between">
                    {
                        steps.map((item) => (
                            
                            <span  key={item.id} className={`text-sm w-[40%] sm:w-[100%] relative left-1 ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>
                                {item.title}
                            </span>
                        ))
                    }
                </div>

            </div> 
           
            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>} 
            {step === 3 && <Publish/>}
       
        </>
    )
}

export default RenderSteps