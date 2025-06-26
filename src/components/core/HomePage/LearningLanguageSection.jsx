import HighlightText from "./HighlightText"
import Know_Your_Progress from "../../../assets/Images/Know_your_progress.png"
import Compare_with_Others from "../../../assets/Images/Compare_with_others.svg"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg"
import CTAbutton from "./CTAbutton"

function LearningLanguageSection () {

    return (

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-8">
            
            <div className="text-4xl text-richblack-700 font-semibold text-center mt-[70px]">
                Your swiss knife for 
                <HighlightText text={" learning any language"}/>
            </div>

            <div className="text-base text-center text-richblack-700 font-medium lg:w-[70%] leading-6 mx-auto -mt-5">
                Using spin making learning multiple languages easy. with 20+ languages
                realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center mt-8 lg:-mt-7 overflow-hidden">

                <img src={Know_Your_Progress} alt="Know_Your_Progress" className="object-contain lg:-mr-32"/>

                <img src={Compare_with_Others} alt="Compare_with_others" className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"/>

                <img src={Plan_your_lessons} alt="Plan_your_lessons" className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16" />
            </div>

            <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-3">
                <CTAbutton active={true} LinkTo={"/signup"}>Learn More</CTAbutton>
            </div>

        </div>
    )
}

export default LearningLanguageSection