import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { fetchFullCourseDetails } from "../services/Operations/courseDetails";
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures } from "../slices/viewCourseSlice";
import VideoSideBar from "../components/core/ViewCourse/VideoSideBar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

function ViewCourse() {

    const [reviewModal , setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    async function fetchCourseSpecificData() {

        const result = await fetchFullCourseDetails(courseId , token);

        dispatch(setCourseSectionData(result?.courseDetails?.content));
        dispatch(setCourseEntireData(result?.courseDetails));

        let lectures = 0;
        result?.courseDetails?.content?.forEach((section) => {
            lectures += section?.subSection?.length
        })

        dispatch(setTotalNoOfLectures(lectures));
        dispatch(setCompletedLectures(result?.completedVideos))
    }

    useEffect(() => {
        fetchCourseSpecificData();
    },[])

    return (
        <>
            <div className="relative md:flex-row flex flex-col-reverse min-h-[calc(100vh-3.5rem)]">

                <VideoSideBar setReviewModal={setReviewModal}/>

                <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto mx-6">
                 
                    <Outlet/>
                
                </div>
            </div>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
        </>
    )
}

export default ViewCourse