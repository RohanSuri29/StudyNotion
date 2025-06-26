import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";


function CourseCard (props) {

    const course = props.course;
    const selectedCourse = props.selectedCourse;
    const setSelectedCourse = props.setSelectedCourse;

    function select() {
        setSelectedCourse(course.heading)
    }

    return (

        <div className={`w-[360px] lg:w-[30%] ${selectedCourse === course.heading 
        ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800"} 
        text-richblack-25 h-[300px] box-border cursor-pointer`} onClick={select}>
            
            <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] px-6 flex flex-col gap-6">

                <div className={`${selectedCourse === course.heading && "text-richblack-800"} font-semibold text-[20px] mt-6`}>
                    {course.heading}
                </div>

                <div className="text-richblack-400 -mt-3">{course.description}</div>
            </div>

            <div className={`flex justify-between ${selectedCourse === course.heading ? "text-blue-300" : "text-richblack-300"} px-6 py-3 font-medium`}>

                <div className="flex items-center gap-2 text-[16px]">
                    <HiUsers/>
                    <p>{course.level}</p>
                </div>

                <div className="flex items-center gap-2 text-[16px]">
                    <ImTree/>
                    <p>{course.lessionNumber} Lession</p>
                </div>
            </div>
     
        </div>
    )
}

export default CourseCard