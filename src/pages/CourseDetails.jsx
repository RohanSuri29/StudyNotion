import { useEffect, useState } from "react"
import { fetchCourseDetails } from "../services/Operations/courseDetails"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { AverageRating } from "../services/Operations/ratingsApi"
import { setCourseEntireData, setTotalNoOfLectures } from "../slices/viewCourseSlice"
import Spinner from "../components/common/Spinner"
import ConfirmationModal from "../components/common/ConfirmationModal"
import { formattingDate } from "../services/formatDate"
import IconBtn from "../components/common/IconBtn"
import { addToCart } from "../slices/cartSlice"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ACCOUNT_TYPE } from "../util/constants"
import toast from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import copy from "copy-to-clipboard"
import CourseSectionBar from "../components/core/course/CourseSectionBar"
import { buyCourse } from "../services/Operations/studentFeaturesApi"

function CourseDetails() {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {courseId} = useParams();
    const {courseEntireData} = useSelector((state) => state.viewCourse);
    const [average , setAverage] = useState(null);
    const {totalNoOfLectures} = useSelector((state) => state.viewCourse);
    const {paymentloading} = useSelector((state) => state.course);
    const [confirmationModal , setConfirmationModal] = useState(null);
    const [isActive , setIsActive] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    //fetching courseData
    async function getCourseData() {
        
        try{
            const result = await fetchCourseDetails(courseId);
            dispatch(setCourseEntireData(result?.courseDetails));
        }
        catch(error){
            console.error(error)
        }
    }

    //get Average Rating
    async function averageRating() {
        
        try{

            const result = await AverageRating(courseId);
            setAverage(result);
        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCourseData()
    },[courseId])

    useEffect(() => {
        averageRating()
    },[courseEntireData])

    //set TotalnoOfLectures
    useEffect(() => {

        let total = 0;

        courseEntireData?.content?.forEach((section) => {
            const count = section?.subSection?.length || 0;
            total += count;
        })

        dispatch(setTotalNoOfLectures(total));

    },[courseEntireData])

    if(!courseEntireData) {

        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <Spinner/>
        </div> 
        )
    
    }

    function handleBuyCourse() {

        if(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && user) {
            toast.error("Instructor cannot buy course")
            return
        }

        if(token) {
           buyCourse(token , [courseId] , user , navigate , dispatch);
           return
        }

        setConfirmationModal({
            text1: "You are not Logged in!",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate('/login'),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    function addCart() {

        if(user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && user) {
            toast.error("Instructor cannot buy course")
            return
        }
      
        dispatch(addToCart(courseEntireData))
        return
    }

    function handleShare() {
        copy(window.location.href);
        toast.success("Link copied to clickboard")
    }

    function handleActive(id) {

        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((element) => element !== id)
        )
    }

    if(paymentloading) {
        
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <Spinner/>
            </div>
        )
    }

    return (
        <>
            <div className="w-full bg-richblack-800">

                {/* Hero section */}
                <div className="mx-auto box-content px-4 lg:w-[1260px] lg:relative">
                    
                    {/* Course details part */}
                    <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

                        <div className="relative block max-h-[30rem] lg:hidden">
                            
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[inset_0px_-64px_36px_-28px_#161d29] inset-0"></div>
                            <img src={courseEntireData?.thumbnail} alt="course-thumbnail"  className="aspect-auto w-full"/>
                        
                        </div>

                        <div className="z-30 my-5 flex flex-col justify-center gap-7 text-lg text-richblack-5">

                            <p className="text-4xl font-bold text-richblack-5 sm:text-[42px] mt-16 lg:mt-30">{courseEntireData?.name}</p>

                            <p className="text-richblack-200">{courseEntireData?.description}</p>

                            <div className="text-md flex flex-wrap items-center gap-2">
                                
                                <p className="text-yellow-25">{average || 0} </p>

                                <RatingStars Review_Count={average} Star_Size={24} />

                                <p className="text-richblack-5">{`(${courseEntireData?.RatingandReviews?.length} reviews)`}</p>

                                <p className="text-richblack-200">{`${courseEntireData?.studentsEnrolled?.length} students enrolled`}</p>

                            </div>

                            <p className="text-richblack-5">{`Created By ${courseEntireData?.instructor?.firstName} ${courseEntireData?.instructor?.lastName}`} </p>

                            <div className="flex flex-wrap gap-5 text-lg">
                                
                                <div className="flex items-center gap-2 text-richblack-5">
                                    <BiInfoCircle/>
                                    <p>Created at {formattingDate(courseEntireData?.createdAt)}</p>
                                </div>

                                <div className="flex items-center gap-2 text-richblack-5">
                                    <HiOutlineGlobeAlt/>
                                    <p>English</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                        
                            <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">₹{courseEntireData?.price}</p>

                            <IconBtn customClasses={'justify-center'} text={user && courseEntireData?.studentsEnrolled.includes(user._id) ? "Go to Course" : "Buy Now"} onclick={user && courseEntireData?.studentsEnrolled.includes(user._id) ? () => navigate('/dashboard/my-profile') : handleBuyCourse}/>

                            <button className="cursor-pointer rounded-md bg-richblack-400 hover:bg-richblack-700 hover:scale-95 transition-all duration-200 px-[20px] py-[8px] font-semibold text-richblack-5" onClick={addCart}>Add to Cart</button>
                        
                        </div>       

                    </div>
                    
                    {/* Course Card */}
                    <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">

                        <div  className= "flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5">

                            <img src={courseEntireData?.thumbnail} alt="course-thumbnail" loading="lazy"  className="max-h-[220px] w-[400px] overflow-hidden rounded-2xl object-fit max-w-full" />

                            <div className="w-[340px] mx-auto max-w-[360px] flex flex-col gap-4">

                                <p className="pb-4 lg:pb-2 text-3xl font-semibold ">₹{courseEntireData?.price}</p>

                                <IconBtn customClasses={"justify-center"} text={user && courseEntireData?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"} onclick={user && courseEntireData?.studentsEnrolled.includes(user._id) ? () => navigate('/dashboard/enrolled-courses') : handleBuyCourse}/>

                                {
                                    !courseEntireData?.studentsEnrolled.includes(user?._id) && (
                                        <button className="cursor-pointer rounded-md bg-richblack-800 hover:bg-richblack-400 hover:scale-95 transition-all duration-200 px-[20px] py-[8px] font-semibold text-richblack-5" onClick={addCart}>Add to Cart</button>
                                    )
                                }

                                <p className="pb-3 pt-3 text-center text-sm text-richblack-25">30-Day Money-Back Guarantee</p>

                                <div className="flex flex-col text-xl font-semibold gap-y-4">

                                    <p>This Course includes:</p>

                                    <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                                        {
                                            courseEntireData?.instructions?.length && (

                                                courseEntireData?.instructions.map((instruction , index) => (
                                                    
                                                    <div key={index} className="flex gap-2">
                                                        <BsFillCaretRightFill/>
                                                        {instruction}
                                                    </div>
                                                ))
                                            )                                    
                                        }
                                    </div>
                                </div>

                                <button className="mx-auto flex lg:mt-4 items-center gap-2 mb-3 text-yellow-100 cursor-pointer" onClick={handleShare}>
                                    <FaShareSquare size={15}/> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-richblack-900 mt-16 lg:mt-30">

                    <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">

                        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
                            
                            <div className="w-full h-10 bg-richblack-900"/>

                            {/* What you will learn */}
                            <div className="my-8 border border-richblack-600 p-8">
                                
                                <p className="text-3xl font-semibold">What you'll learn</p>

                                <p className="mt-5">{courseEntireData?.whatYouWillLearn}</p>
                            </div>
                            
                            {/* Course Content */}
                            <div className="flex flex-col gap-3 mt-20">

                                <p className="text-[28px] font-semibold">Course Content</p>

                                <div className="flex flex-wrap justify-between gap-2">

                                    <div className="flex gap-2 text-richblack-5">
                                        <p>{`${courseEntireData?.content?.length} Section(s)`}</p>
                                        <p>{`${totalNoOfLectures} Lecture(s)`}</p>
                                        <p>{`${courseEntireData?.totalTime} Duration`}</p>
                                    </div>

                                    <button className="text-yellow-25 cursor-pointer" onClick={() => setIsActive([])}>Collapse all sections</button>
                                </div>

                                <div className="py-7">
                                    {
                                        courseEntireData?.content?.length && (

                                            courseEntireData?.content?.map((section , index) => (
                                                <CourseSectionBar section={section} key={index} handleActive={handleActive} isActive={isActive}/>
                                            ))
                                        )
                                    }
                                </div>

                            </div>

                            {/* Author */}
                            <div className="flex flex-col gap-y-2">

                                <p className="text-[28px] font-semibold mt-12">Author</p>

                                <div className="flex items-center gap-4 py-4">
                                   
                                    <img src={courseEntireData?.instructor?.image ? courseEntireData?.instructor?.image : 
                                    `https://api.dicebear.com/5.x/initials/svg?seed=${courseEntireData?.instructor?.firstName} ${courseEntireData?.instructor?.lastName}`} loading="lazy" className="h-14 w-14 rounded-full object-fit"/>
                                    
                                    <p className="text-lg">{`${courseEntireData?.instructor?.firstName} ${courseEntireData?.instructor?.lastName}`}</p>
                                
                                </div>
                            </div>
                        </div>

                        {/* Review */}
                        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[990px]">

                            <div className="my-8 border border-richblack-600 p-3 md:p-8">

                                <p className="text-3xl font-semibold">Reviews</p>

                                <div className="mt-5 flex items-center gap-2">
                                    <span className="text-4xl font-semibold">
                                    {average} 
                                    </span>
                                    <span className="text-2xl">/5</span>
                                    <span className="text-richblack-50">{`(${courseEntireData?.RatingandReviews?.length}) Reviews `}</span>
                                    <span className="text-richblack-50">{`| ${courseEntireData?.studentsEnrolled?.length} students`}</span>
                                </div>

                                {
                                    courseEntireData?.RatingandReviews?.length && (

                                        courseEntireData?.RatingandReviews.map((rating , index) => (
                                            
                                            <div key={index} className="flex flex-col md:items-baseline gap-3 my-4 mt-12">

                                                <div className="flex items-center gap-2">

                                                    <img className="w-[30px] h-[30px] rounded-full object-fit" src={rating?.user?.image ? rating?.user?.image : 
                                                    `https://api.dicebear.com/5.x/initials/svg?seed=${rating?.user?.firstName} ${rating?.user?.lastName}`} loading="lazy" />
                                                    <p className="md:text-xl min-w-max font-semibold">{`${rating?.user?.firstName} ${rating?.user?.lastName}`}</p>

                                                </div>

                                                <RatingStars Review_Count={average} Star_Size={24}/>

                                                <p className="text-richblack-50 text-[12px] md:text-sm max-w-4xl">{rating?.review}</p>
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>

                    </div>
                    
                    <div className="w-full bg-richblack-900 h-10" />
                </div>
                
            </div>
            
            <Footer/>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
        
    )
}

export default CourseDetails