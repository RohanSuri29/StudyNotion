import { FaFacebook, FaGoogle, FaHeart, FaTwitter, FaYoutube } from "react-icons/fa"
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavLink } from "react-router-dom"
import { FooterLink2 } from "../../data/Footer-Link"

const BottomFooter = [
    "Privacy Policy",
    "Cookie Policy",
    "Terms"
]

const Company = [
    "About",
    "Careers",
    "Affiliates"
]

const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces"
]

const Plans = [
    "Paid memberships",
    "For students",
    "Business solutions"
]

const Community = [
    "Forums",
    "Chapters",
    "Events"
]

function Footer () {

    return (

        <div className="bg-richblack-800">
            
            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 relative text-richblack-400 leading-6 py-14">
                
                {/* Upper Part */}
                <div className="flex flex-col lg:flex-row pb-5 w-[100%] border-b border-richblack-700">
                    
                    {/* Section-1 */}
                    <div className="lg:w-[50%] flex flex-wrap justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 pb-7 gap-3">

                        {/* Column-1 */}
                        <div className="w-[30%] flex flex-col gap-3 mb-7 lg:pl-0">

                            <img src={Logo} alt="StudyNotion Logo" className="object-contain"/>

                            <h2 className="text-richblack-50 font-semibold text-[16px]">
                                Company
                            </h2>

                            <div className="flex flex-col gap-2">
                                {
                                    Company.map( (element , index) => (
                                        <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                           <NavLink to={element.toLowerCase()}> {element} </NavLink>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="flex gap-3 text-lg">
                                <FaFacebook/>
                                <FaGoogle/>
                                <FaTwitter/>
                                <FaYoutube/>
                            </div>

                        </div>
                        
                        {/* Column-2 */}
                        <div className="flex flex-col gap-7 w-[48%] lg:w-[30%] lg:pl-0">

                            <div className="flex flex-col">
                                
                                <h2 className="text-richblack-50 font-semibold text-[16px]">
                                    Resources
                                </h2>

                                <div className="flex flex-col gap-2 mt-2">
                                    {
                                        Resources.map( (element , index) => (

                                            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" key={index}>
                                                <NavLink to={element.split("").join("_").toLowerCase()}>
                                                   {element} 
                                                </NavLink>  
                                            </div>
                                                     
                                        ))
                                    }
                                </div>

                            </div>

                            <div className="flex flex-col">
                                <h2 className="text-richblack-50 font-semibold text-[16px] ">Support</h2>
                                <NavLink to={"/help-center"}>
                                <p className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                                    Hep Center
                                </p>
                                </NavLink>
                            </div>

                        </div>

                        {/* Column-3 */}
                        <div className="flex flex-col gap-7 w-[48%] lg:w-[30%] lg:pl-0">

                            <div className="flex flex-col">

                                <h2 className="text-richblack-50 font-semibold text-[16px]">
                                    Plans
                                </h2>

                                <div className="flex flex-col gap-2 mt-2">
                                    {
                                        Plans.map( (element , index) => (
                                            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" key={index}>
                                                <NavLink to={element.split(" ").join("_").toLocaleLowerCase()}>
                                                    {element}
                                                </NavLink> 
                                            </div>
                                                         
                                        ))
                                    }
                                </div>

                            </div>

                            <div className="flex flex-col">

                                <h2 className="text-richblack-50 font-semibold text-[16px]>">
                                    Community
                                </h2>

                                <div className="flex flex-col gap-2 mt-2">

                                    {
                                        Community.map( (element , index) => (
                                            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" key={index}>
                                                <NavLink to={element.split(" ").join("_").toLocaleLowerCase()}>
                                                    {element}
                                                </NavLink>  
                                            </div>
                                                        
                                        ))
                                    }
                          
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Section-2 */}
                    <div className="lg:w-[50%] flex flex-wrap justify-between pl-3 lg:pl-5 pb-7 gap-3">

                        {/* Column-1 */}
                        <div className="flex flex-col w-[48%] lg:w-[30%] lg:pl-0">

                            <h2 className="text-richblack-50 font-semibold text-[16px]">
                                {FooterLink2[0].title}
                            </h2>

                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    FooterLink2[0].links.map( (element , index) => (

                                        <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" key={index}>
                                            <NavLink to={element.link}>
                                                {element.title}
                                            </NavLink>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                        {/* Column-2 */}
                        <div className="flex flex-col w-[48%] lg:w-[30%] lg:pl-0">

                            <h2 className="text-richblack-50 font-semibold text-[16px]">
                                {FooterLink2[1].title}
                            </h2>

                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    FooterLink2[1].links.map( (element , index) => (

                                        <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" key={index}>
                                            <NavLink to={element.link}>
                                                {element.title}
                                            </NavLink>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                        {/* Column-3 */}
                        <div className="flex flex-col w-[48%] lg:w-[30%] lg:pl-0">

                            <h2 className="text-richblack-50 font-semibold text-[16px]">
                                {FooterLink2[2].title}
                            </h2>

                            <div className="flex flex-col gap-2 mt-2">
                                {
                                    FooterLink2[2].links.map( (element , index) => (

                                        <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200" key={index}>
                                            <NavLink to={element.link}>
                                                {element.title}
                                            </NavLink>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                    </div>

                </div>

                {/* Lower Part */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-start items-center gap-3 w-full pt-6 text-sm">
                    
                    <div className="flex flex-row">
                        {
                            BottomFooter.map( (element , index) => (
                                <div key={index} className={`${BottomFooter.length-1 === index ? "" : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"} px-3`}> 
                                    <NavLink to={element.split("").join("_").toLocaleLowerCase()}>
                                        {element}
                                    </NavLink>
                                </div>
                            ))
                        }
                    </div>

                    <span className="text-center">
                        Made by Rohan Suri © 2025 StudyNotion
                    </span>
                </div>

            </div>

        </div>
    )
}

export default Footer