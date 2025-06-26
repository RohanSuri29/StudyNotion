import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi";
import gsap from "gsap"

function CourseSectionBar({section , handleActive , isActive}) {
    
    const subRef = useRef(null);
    const [active , setActive] = useState(false);

    useEffect(() => {
        setActive(isActive?.includes(section._id))
    },[isActive])

    useGSAP(() => {

        if(active){
            gsap.to(subRef.current , {
                height: "100%",
                transition: "all",
                transitionDuration: "300ms",
                ease: "power1.inOut"
            })
        }
        else{
            gsap.to(subRef.current , {
                height: 0,
                transition: "all",
                transitionDuration: "300ms",
                ease: "power1.inOut"
                
            })
        }
        
    },[active])

    return (

        <div className="border border-solid border-richblack-600" >

            <div className="bg-richblack-700 text-richblack-5 flex cursor-pointer justify-between bg-opacity-20 px-7 py-6" onClick={() => handleActive(section._id)}>

                <div className="flex items-center gap-2">
                    
                    <div className={`${isActive?.includes(section._id) ? "rotate-180" : "rotate-0"} transition-all duration-300`}>
                        <AiOutlineDown/>
                    </div>

                    <p>{section?.sectionName}</p>
                </div>

                <p className="text-yellow-25 space-x-4">
                    {`${section?.subSection.length} Lecture(s)`}
                </p>

            </div>

            <div ref={subRef} className="bg-richblack-900 h-0 overflow-hidden">
                {
                    section?.subSection?.map((subsection) => (

                        <div key={subsection?._id} className="flex items-center gap-2 border-b border-richblack-500 px-7 py-6">

                            <HiOutlineVideoCamera/>
                            <p>{subsection?.title}</p>
                        </div>
                    ))
                }
            </div>

        </div>        
        
    )
}

export default CourseSectionBar