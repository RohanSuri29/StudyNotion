import { useEffect, useState } from "react"
import Spinner from "../../../common/Spinner";
import { useDispatch, useSelector } from "react-redux";
import RenderSteps from "../AddCourse/RenderSteps";
import { fetchFullCourseDetails } from "../../../../services/Operations/courseDetails";
import { useLocation, useParams } from "react-router-dom";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { setLocation } from "../../../../slices/authSlice";

function EditCoursePage() {

    const [loading , setLoading] = useState(false);
    const {course} = useSelector((state) => state.course);
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    async function getEditCourse() {

        setLoading(true);
       
        const result = await fetchFullCourseDetails(courseId , token)

        if(result?.courseDetails) {
            dispatch(setCourse(result?.courseDetails))
            dispatch(setEditCourse(true));
        }
        setLoading(false)
    }

    useEffect(() => {
        getEditCourse();
        dispatch(setLocation(location.pathname))
    },[])

    return (

        <div className="mx-auto w-11/12 max-w-[1000px] py-10 m-20 overflow-x-hidden">
            {
                loading ? (<div className="grid flex-1 place-items-center"><Spinner/></div>) : (
                    <>

                        <h2 className="mb-14 text-3xl font-medium text-richblack-5">
                            Edit Course
                        </h2>

                        <div className="mx-auto max-w-[600px]">
                            {
                                course ? (<RenderSteps/>) : (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course not found</p>)
                            }
                        </div>
                    </>
                )
            }
            
        </div>
    )
}

export default EditCoursePage