import { useState } from "react"
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

function ExploreMore () {

    const [tab , setTab] = useState(tabName[0]);
    const[courses , setCourses] = useState(HomePageExplore[0].courses);
    const [selectedCourse , setSelectedCourse] = useState(HomePageExplore[0].courses[0].heading);

    function setValue(value) {
        
        setTab(value);
        const result = HomePageExplore.filter( (element) => ( element.tag === value));
        setCourses(result[0].courses);
        setSelectedCourse(result[0].courses[0].heading);

    }

    return (
        
        <div className=" flex flex-col mt-10">

            <div className="text-4xl font-semibold text-center">
                Unlock the
                <HighlightText text={" Power of Code"}/>
            </div>

            <div className="text-center text-richblack-300 text-lg font-semibold mb-5 mt-1">
                Learn to Build Anything You Can Imagine
            </div>

            <div className="hidden lg:flex gap-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
     
                {
                    tabName.map( (name , index) => (
                        <div key={index} 
                        onClick={() => setValue(name)}
                        className={`text-[16px] items-center ${tab === name ? "bg-richblack-900 text-richblack-5 font-medium" : " text-richblack-200"} 
                        px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 `}
                        >
                            {name}
                        </div>
                    ))
                }     

            </div>

            <div className="hidden lg:block lg:h-[200px]"></div>

            <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">

                {
                    courses.map( (course , index) => (
                        <CourseCard course={course} setSelectedCourse={setSelectedCourse} selectedCourse={selectedCourse} key={index}/>
                    ))
                }

            </div>
        </div>
    )
}

export default ExploreMore