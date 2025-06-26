import { useSelector } from "react-redux"
import { getEnrolledCourses } from "../../../services/Operations/profileApi";
import { useEffect, useState } from "react";
import Spinner from "../../common/Spinner";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

function EnrolledCourses() {

    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses , setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    async function EnrolledCourses () {

        try{
            const result = await getEnrolledCourses(token);
            setEnrolledCourses(result);
        }
        catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        EnrolledCourses()
    },[])

    return (

        <div className="mx-auto w-11/12 max-w-[1000px] py-10 m-20">
            
            <h2 className="text-3xl text-richblack-50">Enrolled Courses</h2>
   
            {
                !enrolledCourses ? <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center"><Spinner/></div> : (

                    !enrolledCourses.length ? (<p className="grid h-[10vh] w-full place-content-center text-richblack-5">You have not enrolled in any courses yet!</p>) : (
                        
                        <div className="my-8 text-richblack-5">

                            <div className="flex rounded-t-lg bg-richblack-500">
                                <p className="w-[40%] px-5 py-3">Course Name</p>
                                <p className="w-[50%] px-5 py-3 text-center">Duration</p>
                                <p className="w-[48%] px-5 py-3 text-center">Progress</p>
                            </div>
                            {
                                enrolledCourses.map((course , index) => (
                                    
                                    <div key={index} className={`flex items-center border border-richblack-700 ${enrolledCourses.length - 1 === index ? "rounded-b-lg" : "rounded-none"}`}
                                        onClick={() => navigate(`/view-course/${course?._id}/section/${course?.content[0]?._id}/sub-section/${course?.content[0]?.subSection[0]?._id}`)}
                                    >
                                        
                                        <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3">
                                            
                                            <img src={course?.thumbnail} alt={`${course?.name}-thumbnail`} className="h-14 w-14 rounded-lg object-fit" />

                                            <div className="flex max-w-xs flex-col gap-2">
                                                <p className="font-semibold">{course?.name}</p>
                                                <p className="text-xs text-richblack-300">
                                                    {
                                                        course.description.length > 30 ? `${course.description.slice(0,30)}...` : course.description 
                                                    }
                                                </p>
                                            </div> 
                                        </div>

                                        <p className="w-1/4 px-2 py-3">{course?.totalTime}</p>

                                        <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                            <p>Progress: {course?.progressPercentage || 0}%</p>
                                            <ProgressBar completed={course?.progressPercentage || 0} height="8px" isLabelVisible={false}/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                )
            }
       
        </div>
    )
}

export default EnrolledCourses