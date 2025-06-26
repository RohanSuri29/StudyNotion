import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function RequirementField({name , label , register , errors , setValue , getValues}) {

    const [requirement , setRequirement] = useState("");
    const [requirementList , setRequirementList] = useState([]);
    const {editCourse , course} = useSelector((state) => state.course);
    const {courseId} = useParams();
    const {select} = useSelector((state) => state.auth);

    if(courseId || select){

        useEffect(() => {

            if(editCourse) {
                setRequirementList(course?.instructions)
            }
    
        },[])
    }

    useEffect(() => {

        register(name , {required:true , validate: (value) => value.length > 0})

    },[])

    useEffect(() => {
        setValue(name,requirementList)
    },[requirementList])

    function addHandler() {
        
        if(requirement) {

            const newList = [...requirementList , requirement];
            setRequirementList(newList)
            setRequirement("")
        }
    }

    function removeHandler(requirementIndex) {

        const newList = requirementList.filter((_,index) => index !== requirementIndex);
        setRequirementList(newList)
    }

    return (

        <div className="flex flex-col space-y-2">

            <label htmlFor={name}>
                <p className="text-sm text-richblack-5">{label}<sup className="text-pink-200">*</sup></p>
            </label>

            <input className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 focus:outline-none" type="text" name={name} id={name} value={requirement} onChange={(event) => setRequirement(event.target.value)}/>

            <button type="button" className="font-semibold text-yellow-50 text-left" onClick={addHandler}>
                Add
            </button>

            <div className="flex flex-col space-y-2">
                {  requirementList.length > 0 && (

                    requirementList.map((requirement , index) => (

                        <div key={index} className="flex text-richblack-5">
                            {requirement} <button type="button" className="ml-2 text-xs text-pure-greys-300 " onClick={() => removeHandler(index)}> clear</button>
                        </div>
                    )))
                }
                
            </div>
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Please fill the requirements</span>
                )
            }
            
        </div>
    )
}

export default RequirementField