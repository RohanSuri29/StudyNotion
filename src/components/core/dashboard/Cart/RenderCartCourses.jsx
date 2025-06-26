import { LuDot } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux"
import { removeFromCart } from "../../../../slices/cartSlice";
import { useEffect, useState } from "react";
import { AverageRating } from "../../../../services/Operations/ratingsApi";
import RatingStars from "../../../common/RatingStars";

function RenderCartCourses () {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [courseId , setCourseId] = useState(null);
    const [average , setAverage] = useState([]);
    
    async function getAverage() {

        let rating = [];

        for (const course of cart) {
            const result = await AverageRating(course._id)
            rating[course._id] = result;
        }
     
        setAverage(rating)
    }

    useEffect(() => {
        getAverage()
    },[cart])

    return (
        
        <div className="flex flex-1 flex-col mt-9 lg:mt-0">
            {
                cart?.map((course , index) => (

                    <div key={course._id} className={`flex w-full flex-wrap items-start justify-between gap-6 ${cart?.length - 1 !== index && "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"}`}>

                        <div className="flex flex-1 md:gap-4 gap-12 flex-wrap">
                            
                            <div className="flex flex-1 gap-4 flex-col md:flex-row">

                                <img src={course?.thumbnail} alt="course-thumbnail" className="h-[148px] w-[220px] rounded-lg object-fit"/>

                                <div className="flex flex-col space-y-2">

                                    <p className="text-lg font-medium text-richblack-5">{course?.name}</p>

                                    <p className="text-sm text-richblack-300">{course?.category?.name}</p>

                                    <div className="flex items-center gap-2">
                                        
                                        <span className="text-yellow-5" >{average[course._id]}</span>

                                        <RatingStars Review_Count={{value:average[course._id]}}/>
                                        
                                        <span className="text-richblack-400">
                                            {course?.RatingandReviews?.length} Ratings
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-[2px]">
                                        
                                        {
                                            course?.tags?.map((tag , index) => (
                                                <div key={index} className="flex items-center">
                                                    <p className="text-sm text-richblack-300">{tag}</p>
                                                    <LuDot className={`${course?.tags?.length - 1 === index && "hidden"} text-richblack-50`}/>
                                                </div>
                                            ))
                                        }
                                        
                                    </div>
                                    

                                </div>

                            </div>

                            <div className="flex flex-col md:items-end items-center space-y-3 md:ml-24">

                                <button className="flex cursor-pointer items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200" onClick={() => dispatch(removeFromCart(course._id))}>
                                    <RiDeleteBin5Line/>
                                    <p>Remove</p>
                                </button>
                                
                                <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {course?.price}</p>
                            </div>

                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses