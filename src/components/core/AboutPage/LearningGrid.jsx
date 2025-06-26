import { LearningGridArray } from "../../../data/GridData"
import HighlightText from "../HomePage/HighlightText"
import CTAbutton from "../HomePage/CTAbutton"

function LearningGrid() {

    return (

        <div className="bg-richblack-900 w-full">
            
            <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent text-white mx-auto">

                <div className="grid mt-20 w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
                    {
                        LearningGridArray.map( (box , index) => (
                            <div key={index} className={`${index === 0 && "xl:col-span-2 xl:h-[294px]"} 
                                ${box.order % 2 === 1 ? ("bg-richblack-700 h-[294px]") : (box.order % 2 === 0 ?"bg-richblack-800 h-[294px]" : "bg-transparent")} 
                                ${box.order === 3 && "xl:col-start-2"}`}>
                                {
                                    box.order < 0 ? 
                                    (
                                        <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                                            <div className="text-4xl font-semibold">
                                                {box.heading}
                                                <HighlightText text={box.highlightText} />
                                            </div>
                                        
                                            <p className="text-richblack-300 font-medium">
                                                {box.description}
                                            </p>

                                            <div className="w-fit mt-2">
                                                <CTAbutton active={true} LinkTo={box.BtnLink}>
                                                    {box.BtnText}
                                                </CTAbutton>
                                            </div>
                                            
                                        </div>
                                    ) : 
                                    (
                                        <div className="p-8 flex flex-col gap-8">
                                            <h2 className="text-richblack-5 text-lg">
                                                {box.heading}
                                            </h2>

                                            <p className="text-richblack-300 font-medium">
                                                {box.description}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>

            </div>

        </div>

    )
}

export default LearningGrid