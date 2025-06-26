import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ChipInput({label , name , register , setValue , getValues , errors , placeholder}) {

    const [chips , setChips] = useState([]);
    const {course , editCourse} = useSelector((state) => state.course);
    const {courseId} = useParams();
    const {select} = useSelector((state) => state.auth);

    if(courseId || select){

        useEffect(() => {

            if(editCourse) {
                setChips(course?.tags)
            }
    
        },[])
    }

    useEffect(() => {

        register(name , {required: true , validate: (value) => value.length > 0})

    },[])

    useEffect(() => {
        setValue(name,chips)
    },[chips])

    function handleKeyDown(event) {

        if(event.key === 'Enter' || event.key === ',') {

            event.preventDefault();

            const chipValue = event.target.value.trim();

            if(chipValue && !chips.includes(chipValue)){
                const newChips = [...chips , chipValue];
                setChips(newChips);
                event.target.value = ""
            }
        }
    }

    function handleDeleteChip(chipIndex) {

        const newChips = chips.filter((_,index) => index !== chipIndex);
        setChips(newChips)
    }

    return (

        <div className="flex flex-col space-y-2">
            
            <label htmlFor={name}>
                <p className="text-sm text-richblack-5">{label}<sup className="text-pink-200">*</sup></p>
            </label>
            
            <div className="flex w-full flex-wrap gap-y-2">
                {
                    chips.map((chip , index) => (
                        
                        <div key={index} className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5">
                            
                            {chip}       
                            
                            <button className="ml-2 focus:outline-none" onClick={() => handleDeleteChip(index)}>
                                <MdClose/>
                            </button>
                        </div>
                    ))
                }
            </div>

            <input className="w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none" type="text" id={name} name={name} placeholder={placeholder} onKeyDown={handleKeyDown} />
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Tags are required</span>
                )
            }
        </div>
    )
}

export default ChipInput