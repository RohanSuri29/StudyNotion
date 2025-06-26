import { FaArrowRight } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import HighlightText from "../components/core/HomePage/HighlightText"
import CTAbutton from "../components/core/HomePage/CTAbutton"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import TimeLineSection from "../components/core/HomePage/TimeLineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import Footer from "../components/common/Footer"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import ReviewSlider from "../components/common/ReviewSlider"

function HomePage () {

    return (

        <div>

            {/* Section-1 */}
            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent gap-8">

                {/* Become an instructor button */}
                <NavLink to={'/signup'} className="mt-16">

                    <div className="group mx-auto w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_2px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">

                        <div className="flex items-center rounded-full gap-3 px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight></FaArrowRight>
                        </div>

                    </div>
                    
                </NavLink>

                {/* Heading */}
                <div className="text-center font-semibold text-4xl">
                    Empower Your Future with 
                    <HighlightText text={" Coding Skills"}/> 
                </div>

                {/* Sub-Heading */}
                <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300 ">
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                {/* CTA buttons */}
                <div className="flex gap-7 mt-8">

                    <CTAbutton active={true} LinkTo={"/signup"}>
                        Learn More
                    </CTAbutton>

                    <CTAbutton active={false} LinkTo={"/login"}>
                        Book a Demo
                    </CTAbutton>
                </div>
                
                {/* video */}
                <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">

                    <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
                        <source src={Banner} type="video/mp4"/>    
                    </video>
                </div>

                {/* Code Section-1 */}
                <CodeBlocks 
                position={"lg:flex-row"} 
                heading={
                    <div className="text-4xl font-semibold">
                        Unlock your {" "}
                        <HighlightText text={"coding potential"}/>
                        {" "}with our online courses
                    </div>
                }
                subheading={

                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1 = {{
                    active:true,
                    LinkTo:"/signup",
                    children:"Try it Yourself"
                }}
                ctabtn2 = {{
                    active:false,
                    LinkTo:"/login",
                    children:"Learn More"
                }}
                codeblocks = {`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                codecolor={"text-yellow-25"}
                backgroundGradient={<div className="codeblock1 absolute"></div>}
                />

                {/* Code Section-2 */}
                <CodeBlocks 
                position={"lg:flex-row-reverse"} 
                heading={
                    <div className="text-4xl font-semibold w-[45%]">
                        Start {" "}
                        <HighlightText text={"coding in seconds"}/>
                    </div>
                }
                subheading={

                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1 = {{
                    active:true,
                    LinkTo:"/signup",
                    children:"Continue Lesson"
                }}
                ctabtn2 = {{
                    active:false,
                    LinkTo:"/login",
                    children:"Learn More"
                }}
                codeblocks = {`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                codecolor={"text-white"}
                backgroundGradient={<div className="codeblock2 absolute"></div>}
                />

                {/* Explore more */}
                <ExploreMore/>

            </div>

            {/* Section-2 */}
            <div className="bg-pure-greys-5">
                
                {/* Explore full catalog section */}
                <div className="homepage_bg h-[320px]">

                    <div className="mx-auto flex w-11/12 max-w-maxContent items-center flex-col gap-8">
                        <div className="lg:h-[150px]"></div>
                        <div className="flex gap-7 lg:mt-8">

                            <CTAbutton active={true} LinkTo={'/signup'}>
                                <div className="flex items-center gap-2">
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAbutton>

                            <CTAbutton active={false} LinkTo={'/login'}>
                                Learn More
                            </CTAbutton>

                        </div>
                    </div>

                </div>

                {/* job that is in demand section */}
                <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-8">

                    <div className="mb-10 mt-[-100px] flex flex-col gap-7 lg:mt-20 lg:flex-row justify-between lg:gap-0">

                        <div className="text-4xl font-semibold lg:w-[45%]">
                            Get the skills you need for a
                            <HighlightText text={"job that is in demand"}/>
                        </div>

                        <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                            <p className="text-[16px]">The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CTAbutton active={true} LinkTo={"/signup"}>Learn More</CTAbutton>
                        </div>
                    </div>
                </div>

                {/* TimeLine section */}
                <TimeLineSection/>

                {/* Learning Language section */}
                <LearningLanguageSection/>

            </div>

            {/* Section-3 */}
            <div className="relative mx-auto my-20 w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-8 bg-richblack-900 text-white">

                <InstructorSection/>

                <h1 className="text-center text-4xl font-semibold mt-2">
                    Reviews from other learners
                </h1>
            </div>
            
            <ReviewSlider/>

            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default HomePage