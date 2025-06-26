import { FaArrowRight } from "react-icons/fa"
import CTAbutton from "./CTAbutton"
import { TypeAnimation } from "react-type-animation"

function CodeBlocks ({position , heading , subheading , ctabtn1 , ctabtn2 , codeblocks , codecolor , backgroundGradient}) {

    return (

        <div className={`${position} flex my-20 justify-between flex-col lg:gap-10 gap-10`}>

            {/* Section-1 */}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8" >
  
                {heading}
               
                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subheading}
                </div>

                <div className="flex gap-7 mt-7">

                    <CTAbutton active={ctabtn1.active} LinkTo={ctabtn1.LinkTo}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.children}
                            <FaArrowRight/>
                        </div>
                    </CTAbutton>
                        
                    <CTAbutton active={ctabtn2.active} LinkTo={ctabtn2.active}>
                        {ctabtn2.children}
                    </CTAbutton>
                    
                </div>
            </div>

            {/* Section-2 */}
            <div className="h-fit code-border flex py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">

                {backgroundGradient}

                <div className="flex flex-col text-center w-[10%] select-none text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codecolor} pr-1`}>

                    <TypeAnimation
                    sequence={[codeblocks , 3000 , ""]}
                    cursor={true}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    style={{
                        whiteSpace:"pre-line",
                        display:"block"
                    }}
                    />

                </div>
            </div>

        </div>
    )
}

export default CodeBlocks