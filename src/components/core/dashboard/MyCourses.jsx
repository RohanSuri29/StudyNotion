import { useEffect, useState } from "react"
import { fetchInstructorCourses } from "../../../services/Operations/courseDetails";
import {useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { VscAdd } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

import CourseTable from "./InstructorCourses/CourseTable";

function MyCourses() {

    const [courses , setCourses] = useState([]);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    async function getCourses() {
   
        const result = await fetchInstructorCourses(token);
        
        if(result){
            setCourses(result);
        }
    }

    useEffect(() => {
        getCourses()
    },[])

    return (

        <div className="mx-auto w-11/12 max-w-[1000px] py-10 m-20"> 

            <div className="mb-14 flex items-center justify-between">
                                
                <h2 className="text-3xl font-medium text-richblack-5">My Courses</h2>
                <IconBtn text="Add Course" onclick={() => navigate('/dashboard/add-course')}>
                    <VscAdd/>
                </IconBtn>

            </div>
            {courses && <CourseTable courses ={courses} setCourses={setCourses}/>}
                                
        </div>
    )
}

export default MyCourses