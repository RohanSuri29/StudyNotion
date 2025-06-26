import { useEffect , useState } from "react"
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import IconBtn from "../../common/IconBtn";
import { AiOutlineDown } from "react-icons/ai";

function VideoSideBar({setReviewModal}) {

    const [sectionActive , setSectionActive] = useState("");
    const [subsectionActive , setSubsectionActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId , subSectionId} = useParams();
    const {courseSectionData , courseEntireData , completedLectures , totalNoOfLectures} = useSelector((state) => state.viewCourse)

    function setActiveFlags() {

        if(!courseSectionData?.length) {
            return 
        }

        const currentSectionIndex = courseSectionData?.findIndex((element) => element._id === sectionId);

        const currentSubsectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex((element) => element._id === subSectionId);

        setSectionActive(courseSectionData[currentSectionIndex]?._id);

        setSubsectionActive(courseSectionData[currentSectionIndex]?.subSection?.[currentSubsectionIndex]?._id);
    
    }

    useEffect(() => {        
        setActiveFlags();
    },[courseEntireData , courseSectionData , location.pathname])

    return (

        <div className="flex h-[calc(100vh-3.5rem)] w-full md:w-[320px] md:max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">

            <div className="mx-5 flex flex-col items-start gap-y-4 border-b border-richblack-600 py-6 text-lg font-bold text-richblack-25">            

                <div className="flex w-full items-center justify-between ">

                    <div className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90" onClick={() => navigate("/dashboard/enrolled-courses")}>
                        <IoIosArrowBack size={30}/>           
                    </div>

                    <IconBtn text="Add Review" customClasses="justify-center" onclick={() => setReviewModal(true)}/>

                </div>

                <p>{courseEntireData?.name}</p>

                <p className="text-sm font-semibold text-richblack-500">{`${completedLectures?.length}/${totalNoOfLectures}`}</p>

            </div>

            <div className="w-full flex flex-col gap-2 pt-4">
                {
                    courseSectionData?.map((section , index) => (

                        <div key={index} className="border border-solid border-richblack-600">

                            <div className="bg-richblack-700 text-richblack-5 flex cursor-pointer justify-between bg-opacity-20 px-3 py-4" onClick={() => setSectionActive(section?._id)}>

                                <p>{section?.sectionName}</p>

                                <div className={`${sectionActive === section?._id ? "rotate-180" : "rotate-0"} transition-all duration-300 pt-1`}>
                                    <AiOutlineDown/>
                                </div>
                            </div>

                            {
                                sectionActive === section?._id && (

                                    <div className="overflow-hidden transition-[height] duration-300 ease-in-out">
                                        {
                                            section?.subSection?.map((subsection) => (

                                                <div key={subsection?._id} className={`flex items-center gap-2 border-b border-richblack-500 px-5 py-3 text-richblack-100 ${subsectionActive === subsection?._id ? "bg-yellow-200 font-semibold text-richblack-800" : "hover:bg-richblack-900"}`}
                                                    onClick={() => {navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subsection?._id}`) ; setSubsectionActive(subsection?._id)}}
                                                >
                                                    
                                                    <input type="checkbox" checked={completedLectures.includes(subsection._id)} onChange={()=> {}}/>

                                                    <p>{subsection?.title}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoSideBar