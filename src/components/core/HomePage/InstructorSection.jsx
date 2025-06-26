import { FaArrowRight } from "react-icons/fa"
import Instructor from "../../../assets/Images/Instructor.png"
import CTAbutton from "./CTAbutton"
import HighlightText from "./HighlightText"

function InstructorSection () {

    return (

        <div>
            
            <div className="flex flex-col lg:flex-row gap-20 items-center">

                {/* Image section */}
                <div className="lg:w-[50%]">
                    <img src={Instructor} alt="InstructorImage" className="shadow-white shadow-[-20px_-20px_0_0]"/>
                </div>

                {/* Right Section */}
                <div className="lg:w-[50%] flex flex-col gap-10">

                    <div className="lg:w-[50%] text-4xl font-semibold">
                        Become an
                        <HighlightText text={" Instructor"}/>
                    </div>

                    <div className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
                        Instructors from around the world teach millions of students on
                        StudyNotion. We provide the tools and skills to teach what you
                        love.
                    </div>

                    <div className="w-fit">
                        <CTAbutton active={true} LinkTo={"/signup"}>
                            <div className="flex items-center gap-3">
                                Start Teaching Today
                                <FaArrowRight/>
                            </div>
                        </CTAbutton>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InstructorSection