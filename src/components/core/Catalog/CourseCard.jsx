import { useEffect, useState } from "react"
import { AverageRating } from "../../../services/Operations/ratingsApi"
import { NavLink } from "react-router-dom";
import RatingStars from "../../common/RatingStars";

function CourseCard({course , Height , customClasses}) {

    const [average , setAverage] = useState();
 
    async function getAverage() {
        const result = await AverageRating(course._id);
        setAverage(result);
    }

    useEffect(() => {
        getAverage()
    },[])

    return (
        
        <div className="hover:scale-[1.03] transition-all duration-300 z-50 mb-4">

            <NavLink to={`/courses/${course._id}`}>

                <img src={course?.thumbnail} alt="course-thumbnail" className={`rounded-xl object-fit ${Height} h-[100px] ${customClasses}`}/>

                <div className="flex flex-col gap-2 px-1 py-3">

                    <p className="text-sm md:text-xl text-richblack-5">{course?.name}</p>
                    
                    <p className="text-[12px] md:text-xl text-richblack-50">{`By ${course?.instructor?.firstName} ${course?.instructor?.lastName}`}</p>

                    <div className="flex items-center gap-x-2 flex-wrap">
                        
                        <p className="text-yellow-5">{average || 0}</p>

                        <RatingStars Review_Count={{value:average}}/>

                        <span className="text-richblack-400">{`${course?.RatingandReviews.length} Reviews`}</span>

                    </div>

                    <p className="text-sm md:text-xl text-richblack-5">₹ {course?.price}</p>

                </div>
            </NavLink>

        </div>
    )
}

export default CourseCard