import { useEffect, useState } from "react"
import { getInstructorDetails } from "../../../services/Operations/profileApi";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/Operations/courseDetails";
import Spinner from "../../common/Spinner";
import { NavLink } from "react-router-dom";
import InstructorChart from "./InstructorChart";

function InstructorDashboard () {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile)
    const [loading , setLoading] = useState(false);
    const [instructorData , setInstructorData] = useState("");
    const [courseData , setCourseData] = useState([]);

    async function getDashboardData() {

        setLoading(true);

        const dashboardData = await getInstructorDetails(token);

        const result = await fetchInstructorCourses(token);
        
        setCourseData(result);
        setInstructorData(dashboardData);
        setLoading(false);
    }

    useEffect(() => {
        getDashboardData();
    },[])

    return (

        <div className="mx-auto w-11/12 max-w-[1000px] py-10">

            <div className="space-y-2">
                <h3 className="text-2xl font-bold text-richblack-5">Hi {user?.firstName} 👋</h3>
                <p  className="font-medium text-richblack-200">Let's start with something new</p>
            </div>

            {
                loading ? (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center"><Spinner/></div>) : courseData.length > 0 ? (

                    <div className="flex flex-col gap-4">

                        <div  className="my-4 flex flex-col-reverse gap-3 md:flex-row md:flex md:h-[30rem] md:space-x-4">

                            {
                                instructorData?.totalIncome > 0 || instructorData?.totalStudentsEnrolled > 0 ? (
                                    <InstructorChart courses={courseData}/>
                                ) : (
                                    <div className="flex-1 rounded-md bg-richblack-800 p-6">
                                        <p className="text-lg font-bold text-richblack-5">Visualize</p>
                                        <p className="mt-4 text-xl font-medium text-richblack-50">
                                            Not Enough Data To Visualize
                                        </p>
                                    </div>
                                )
                            }

                            <div className="flex min-w-[250px] flex-col space-y-4 rounded-md bg-richblack-800 p-6">

                                <h2 className="text-lg font-bold text-richblack-5">Statistics</h2>

                                <div className="flex flex-col">
                                    <p className="text-lg text-richblack-200">Total Courses</p>
                                    <p  className="text-3xl font-semibold text-richblack-50">{instructorData?.totalCourses}</p>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-lg text-richblack-200">Total Students</p>
                                    <p className="text-3xl font-semibold text-richblack-50">{instructorData?.totalStudentsEnrolled}</p>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-lg text-richblack-200">Total Income</p>
                                    <p className="text-3xl font-semibold text-richblack-50">₹ {instructorData?.totalIncome}</p>
                                </div>
                            </div>

                        </div>

                        <div className="rounded-md bg-richblack-800 p-6">

                            <div className="flex items-center justify-between">

                                <p  className="text-lg font-bold text-richblack-5">Your Courses</p>
                                <NavLink to="/dashboard/my-courses">
                                    <button className="text-xs font-semibold text-yellow-50 cursor-pointer">View All</button>
                                </NavLink>

                            </div>

                            <div className="my-4 md:flex-row md:flex flex flex-col gap-4 md:gap-0 md:space-x-6">
                                {
                                    courseData?.slice(0,3)?.map((course) => (

                                        <div key={course?._id} className="md:w-1/3 my-4 md:my-0 w-full hover:scale-105 transition-all duration-300">

                                            <img src={course?.thumbnail} className="md:h-[201px] h-[250px] mx-auto w-[70%] md:w-full rounded-md object-cover"/>

                                            <div className="mt-3 w-full md:text-left text-center">

                                                <p className="md:text-sm text-xl font-medium text-richblack-50">{course?.name}</p>
                                                
                                                <div className="mt-1 flex items-center justify-center md:justify-start space-x-2">
                                                    <p className="md:text-xs text-lg font-medium text-richblack-300">{`${course?.studentsEnrolled?.length} student(s) |`}</p>
                                                    <p className="md:text-xs text-lg font-medium text-richblack-300">₹{course?.price}</p>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                ) : (
                
                <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">

                    <p className="text-center text-2xl font-bold text-richblack-5">
                        You have not created any courses yet
                    </p>
                    <NavLink to="/dashboard/add-course">
                        <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                            Create Course
                        </p>
                    </NavLink>

                </div>)
            }
        </div>
    )
}

export default InstructorDashboard