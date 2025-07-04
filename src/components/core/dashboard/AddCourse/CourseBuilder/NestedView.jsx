import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux"
import { deleteSection, deleteSubsection } from "../../../../../services/Operations/courseDetails";
import { setCourse } from "../../../../../slices/courseSlice";
import { FaPlus } from "react-icons/fa";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

function NestedView({handleChange}) {

    const {course} = useSelector((state) => state.course);
    const [confirmationModal , setConfirmationModal] = useState(null);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [viewData , setViewData] = useState(null);
    const [editSubSection , setEditSubSection] = useState(null);
    const [addSubSection , setAddSubSection] = useState(null);

    async function handleDelete(sectionId) {
     
        const result = await deleteSection({sectionId , courseId:course._id} , token)

        if(result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null);
    }

    async function handleDeleteSub(subsectionId , sectionId) {

        const result = await deleteSubsection({subsectionId , sectionId , courseId:course._id} , token);

        if(result) {
            dispatch(setCourse(result))
        }
        setConfirmationModal(null);
        
    }

    return (

        <>
            <div className="rounded-lg bg-richblack-700 p-6 px-8">
                {
                    course?.content?.map((section) => (

                        <details key={section._id} open>

                            <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">

                                <div className="flex items-center gap-x-3">

                                    <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                    <p className="font-semibold text-richblack-50">{section.sectionName}</p>

                                </div>

                                <div className="flex items-center gap-x-3">

                                    <button onClick={() => handleChange(section._id , section.sectionName)}>
                                        <MdEdit className="text-xl text-richblack-300 cursor-pointer"/>
                                    </button>

                                    <button onClick={() => setConfirmationModal({
                                        text1: "Delete this Section?",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDelete(section._id, section.sectionName),
                                        btn2Handler: () => setConfirmationModal(null)
                                    })}>
                                        <RiDeleteBin6Line className="text-xl text-richblack-300 cursor-pointer"/>
                                    </button>

                                    <span className="font-medium text-richblack-300">|</span>

                                    <AiFillCaretDown className={`text-xl text-richblack-300`}/>
                                </div>

                            </summary>
                            
                            <div className="px-6 pb-4">
                                {
                                    section?.subSection?.map((data) => (

                                        <div key={data._id} onClick={() => setViewData(data)} className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2">

                                            <div className="flex items-center gap-x-3 py-2 ">
                                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                                <p className="font-semibold text-richblack-50">{data.title}</p>
                                            </div>

                                            <div className="flex items-center gap-x-3" onClick={(event) => event.stopPropagation()}>

                                                <button onClick={() => setEditSubSection({...data , sectionId:section._id , courseId:course._id})}>
                                                    <MdEdit className="text-xl text-richblack-300"/>
                                                </button>

                                                <button onClick={() => setConfirmationModal({
                                                    text1: "Delete this subsection?",
                                                    text2: "This lecture will be permanently deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSub(data._id , section._id),
                                                    btn2Handler: () => setConfirmationModal(null)
                                                })}>
                                                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <button className="mt-3 flex items-center gap-x-1 text-yellow-50" onClick={() => setAddSubSection({sectionId:section._id , courseId:course._id})}>
                                    <FaPlus className="text-lg"/>
                                    <p>Add Lecture</p>
                                </button>
                            </div>

                        </details>
                    ))
                }
            </div>
            {
                addSubSection ? 

                (<SubSectionModal modalData={addSubSection} setModalData = {setAddSubSection} add={true} />) :

                viewData ? (<SubSectionModal modalData={viewData} setModalData={setViewData} view={true}/>) :

                editSubSection ? (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>) : (<></>)
            }
            {
                confirmationModal ? (<ConfirmationModal modalData={confirmationModal}/>) : (<></>)
            }
        </>
    )
}

export default NestedView