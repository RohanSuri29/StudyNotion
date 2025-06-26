import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { updateProgress } from "../../../services/Operations/courseDetails";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import ReactPlayer from "react-player";
import IconBtn from "../../common/IconBtn";

function VideoDetails() {

  const {courseId , sectionId , subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {courseSectionData , courseEntireData , completedLectures} = useSelector((state) => state.viewCourse)
  const {token} = useSelector((state) => state.auth);
  const playerRef = useRef(null);

  const [videoData , setVideoData] = useState([]);
  const [videoEnded , setVideoEnded] = useState(false);
  const [loading , setLoading] = useState(false);
  const [previewSource , setPreviewSource] = useState("");

  useEffect(() => {

    if(!courseSectionData.length) {
      return
    }
  
    if(!courseId && !subSectionId && !sectionId){
      navigate("/dashboard/enrolled-courses")
    }
    else{

      const filteredData = courseSectionData.filter((section) => section._id === sectionId);
      const filteredSubsection = filteredData?.[0]?.subSection.filter((subsection) => subsection._id === subSectionId);
      
      setVideoData(filteredSubsection?.[0]);
      setPreviewSource(courseEntireData?.thumbnail);
      setVideoEnded(false);
    }

  },[courseEntireData , courseSectionData , location.pathname]) 


  function isFirstVideo() {

    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);

    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);

    if(currentSectionIndex === 0 && currentSubsectionIndex === 0) {
      return true
    }
    else{
      return false
    }
  }

  function IsLastVideo() {

    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    
    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);

    if(currentSectionIndex === courseSectionData?.length-1 && currentSubsectionIndex === courseSectionData[currentSectionIndex]?.subSection?.length-1) {
      return true
    }
    else{
      return false;
    }
  }

  function goToNextVideo() {

    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);

    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);

    const totalLectures = courseSectionData[currentSectionIndex]?.subSection?.length;

    if(currentSubsectionIndex !== totalLectures-1) {

      const nextVideo = courseSectionData[currentSectionIndex]?.subSection[currentSubsectionIndex + 1]?._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextVideo}`)
    }
    else{

      const nextSection = courseSectionData[currentSectionIndex + 1]?._id;

      const nextVideo = courseSectionData[currentSectionIndex + 1]?.subSection[0]?._id

      navigate(`/view-course/${courseId}/section/${nextSection}/sub-section/${nextVideo}`)
    }
  }

  function goToPreviousVideo() { 

    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);

    const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subsection) => subsection._id === subSectionId);

    if(currentSubsectionIndex !== 0) {

      const prevVideo = courseSectionData[currentSectionIndex]?.subSection[currentSubsectionIndex - 1]?._id;

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevVideo}`)
    }
    else{

      const prevSection = courseSectionData[currentSectionIndex - 1]?._id;

      const totalLectures = courseSectionData[currentSectionIndex - 1]?.subSection?.length;

      const prevVideo = courseSectionData[currentSectionIndex - 1]?.subSection[totalLectures - 1]?._id;

      navigate(`/view-course/${courseId}/section/${prevSection}/sub-section/${prevVideo}`)
    }
  }

  async function handleLectureCompletion () {

    setLoading(true);

    await updateProgress({courseId:courseId , subsectionId:subSectionId} , token);

    dispatch(updateCompletedLectures(subSectionId));

    setLoading(false)
  }

  return (

    <div className="flex flex-col gap-5 text-richblack-5">

      {
        !videoData ? (<img src={previewSource} alt="thumbnail" className="h-full w-full rounded-md object-cover"/>) : (
          
          <div className="relative w-full">

            <div>
              <ReactPlayer ref={playerRef} height="100%" width="100%" controls url={videoData?.videoUrl} onEnded={() => setVideoEnded(true)} /> 
            </div>

            <div>
              {
                videoEnded && (

                  <div style={{backgroundImage:"linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",}} className="full absolute bottom-0 z-50 grid h-full w-full place-content-center font-inter">
                    {  
                      !completedLectures.includes(subSectionId) && (
                        <IconBtn disabled={loading} text={!loading ? "Mark as Completed" : "Loading..."} onclick={handleLectureCompletion} customClasses="md:text-xl md:max-w-max md:px-4 mx-auto"/>
                      )
                    }

                    <IconBtn disabled={loading} text="Rewatch" customClasses="md:text-xl md:max-w-max md:px-4 mx-auto mt-2" onclick={() => {playerRef?.current?.seekTo(0);setVideoEnded(false)}} />                
                    
                    <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">

                      {
                        !isFirstVideo() && (
                          <button disabled={loading} onClick={goToPreviousVideo} className="cursor-pointer rounded-md bg-richblack-800 md:px-[20px] text-lg md:text-xl md:py-[8px] px-4 py-1.5 font-normal md:font-semibold text-richblack-5">
                            Prev
                          </button>
                        )
                      }
                      {
                        !IsLastVideo() && (
                          <button disabled={loading} onClick={goToNextVideo} className="cursor-pointer rounded-md bg-richblack-800 md:px-[20px] text-lg md:text-xl md:py-[8px] px-4 py-1.5 font-normal md:font-semibold text-richblack-5">
                            Next
                          </button>
                        )
                      }
                    </div>
                  
                  </div>
                )
              }
            </div>
              
          </div>
        )
      }

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>

    </div>
  )
}

export default VideoDetails