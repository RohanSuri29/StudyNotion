import Logo1 from "../../../assets/TimelineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimelineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimelineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimelineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"

const TimeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
      },
      {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
      },
      {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
      },
      {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
      },
]

function TimeLineSection () {

    return (

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between mt-9 gap-8">
            
            <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">

                {/* Section-1 */}
                <div className="flex flex-col lg:w-[45%] gap-14 lg:gap-3">

                    {
                        TimeLine.map( (element , index) => (
                            
                            <div className="flex flex-col lg:gap-3" key={index}>
                                
                                <div className="flex gap-6" key={index}>
                                    <div className="w-[52px] h-[52px] rounded-full bg-white flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                        <img src={element.Logo} />
                                    </div>

                                    <div className="flex flex-col">
                                        <h3 className="font-semibold text-[18px]">{element.Heading}</h3> 
                                        <p className="text-base">{element.Description}</p>
                                    </div>
                                </div>

                                <div className={`hidden ${TimeLine.length-1 === index ? "hidden" : "lg:block"} h-14 border-dotted border-r border-richblack-100 w-[26px] bg-richblack-400/0`}></div>

                            </div>
                        ))
                    }

                </div>

                {/* Image section */}
                <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">

                    <img src={TimeLineImage} alt="TimeLineImage" className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"/>

                    <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:py-10 lg:gap-0">

                        {/* Left side */}
                        <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                            <p className="text-3xl font-bold w-[75px]">10</p>
                            <p className="text-caribbeangreen-300 text-sm w-[75px]"> Years Experience</p>
                        </div>

                        {/* right side */}
                        <div className="flex gap-5 items-center lg:px-14 px-7">
                            <p className="text-3xl font-bold w-[75px]">250</p>
                            <p className="text-caribbeangreen-300 text-sm w-[75px]">Types of Courses</p>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default TimeLineSection