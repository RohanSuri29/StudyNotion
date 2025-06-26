import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { COURSE_STATUS } from "../../../../util/constants"
import { HiClock } from "react-icons/hi"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { deleteCourse, fetchInstructorCourses } from "../../../../services/Operations/courseDetails"
import { useSelector } from "react-redux"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { formattingDate } from "../../../../services/formatDate"

function CourseTable({courses , setCourses}) {

    const [confirmationModal , setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    async function handleDelete(courseId) {

        setLoading(true);
        await deleteCourse({courseId: courseId} , token)

        const result = await fetchInstructorCourses(token);

        if(result) {
            setCourses(result)
        }
        setConfirmationModal(null);
        setLoading(false)

    }

    return (

        <>    
            <Table className="rounded-xl border border-richblack-800">

                <Thead>
                    <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">

                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Courses
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Duration
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                <Tbody>
                    {
                        courses?.length === 0 ? (

                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                    No Courses Found
                                </Td>
                            </Tr>
                        ) : (

                            courses?.map((course) => (

                                <Tr key={course._id} className="flex gap-x-10 border-b border-richblack-800 px-6 py-8">

                                    <Td colSpan={1} className="flex flex-1 gap-x-4 p-4">

                                        <img src={course?.thumbnail} alt="thumbnail" className="sm:h-[168px] sm:w-[220px] rounded-lg object-fill"/>

                                        <div className="flex flex-col justify-between gap-1">
                                            
                                            <h2 className="text-lg font-semibold text-richblack-5 mt-3">{course?.name}</h2>
                                            
                                            <p className="text-xs text-richblack-300">
                                                {
                                                    course?.description.split(" ").length > 30 ? (

                                                        course?.description.split(" ").slice(0,30).join(" ") + "..."
                                                    ) : (course?.description)
                                                }
                                            </p>

                                            <p className="text-[12px] text-white">
                                                Created: {formattingDate(course.createdAt)}
                                            </p>

                                            {
                                                course.status === COURSE_STATUS.DRAFT ? (
                                                    
                                                    <p className="flex w-fit items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                        <HiClock size={14}/>
                                                        Drafted
                                                    </p>
                                                ): (
                                                    <div className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                            <FaCheck size={8}/>
                                                        </div>
                                                        Published
                                                    </div>
                                                )
                                            }
                                        </div>
                                   
                                    </Td>

                                    <Td className="text-sm font-medium text-richblack-100 mb-5">
                                        {course.totalTime}
                                    </Td>
                                    <Td className="text-sm font-medium text-richblack-100 mb-5">
                                        ₹{course.price}
                                    </Td>
                                    <Td className="text-sm font-medium text-richblack-100 mb-5">
                                                
                                        <button disabled={loading} title="Edit" onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}  className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300">
                                            <FiEdit2 size={20}/>
                                        </button>

                                        <button disabled={loading} title="Delete" onClick={() => setConfirmationModal({
                                            text1: "Do you want to delete this course?",
                                            text2: "All the data related to this course will be deleted",
                                            btn1Text: !loading ? "Delete" : "Loading...",
                                            btn2Text: "Cancel",
                                            btn1Handler: () => handleDelete(course._id),
                                            btn2Handler: () => setConfirmationModal(null)
                                        })} className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">
                                            <RiDeleteBin6Line size={20}/>
                                        </button>
                                     
                                    </Td>
                                </Tr>
                            ))

                        )
                    }
                </Tbody>

            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default CourseTable