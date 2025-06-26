import { matchPath, NavLink , useLocation, useNavigate } from "react-router-dom"
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from "../../data/Navbar-Link";
import { useSelector } from "react-redux";
import {ACCOUNT_TYPE} from "../../util/constants";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import apiConnector from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { BsChevronDown } from "react-icons/bs";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import IconBtn from "./IconBtn";
import { useGSAP } from '@gsap/react';
import gsap from "gsap"
import { useOnClickOutside } from "../../hook/UseOnClickOutside";

function Navbar () {

    const location = useLocation();
    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const [isOpen , setIsOpen] = useState(false);
    const navigate = useNavigate();

    const [subLinks , setSubLinks] = useState([]);
    const[loading , setLoading] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    async function fetchSubLinks () {

        setLoading(true);
        
        try{
            const result = await apiConnector("GET" , categories.CATEGORIES_API);
            setSubLinks(result?.data?.data)
        }
        catch(error){
            console.error("Unable to fetch the sublinks");
        }
       
        setLoading(false);
    }

    useEffect( () => {
      fetchSubLinks()
    } , [])

    function matchRoute (route) {
        return matchPath({path:route} , location.pathname)
    }

    useGSAP(() => {

        if(isOpen){
            gsap.to(menuRef.current , {
                translateX: -13,
                transition: 'all',
                transitionDuration: '600ms',
                ease: 'power2.out'
            })

            gsap.to(hamburgerRef.current , {
                opacity: 0
            })
        }
        else{
            
            gsap.to(menuRef.current , {
                translateX: '150%',
                transition: 'all',
                transitionDuration: '600ms',
                ease: 'power2.in'
            })

            gsap.to(hamburgerRef.current , {
                opacity:1
            })
        }

    },[isOpen])

    useOnClickOutside(menuRef , () => setIsOpen(false));

    return (

        <div className={`h-14 flex justify-center items-center border-b-[1px] border-b-richblack-700 ${location.pathname !== '/' ? "bg-richblack-800" : ""} transition-all duration-200`}>
            
            <div className="flex w-11/12 max-w-maxContent justify-between items-center">

                {/* Logo */}
                <NavLink to={"/"}>
                    <img src={Logo} alt="StudyNotion Logo" loading="lazy" width={160} height={32}/>
                </NavLink>

                {/* NavLinks */}
                <nav className="hidden md:block">

                    <ul className="flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map( (link , index) => (

                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? 
                                        (
                                            <div className={`group relative flex items-center cursor-pointer gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                                            
                                               <p className="tracking-wider"> {link.title}</p>
                                               <BsChevronDown/>
                                               
                                               <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">

                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                
                                                {   
                                                    loading ? (<p className="text-center">Loading...</p>) : subLinks.length ? (        
                                                        
                                                        subLinks?.filter((subLink) => subLink?.Courses?.length > 0)?.map( (subLink , index) => (
                                                            <div key={index} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                                                <NavLink to={`/catalog/${subLink.name.split(' ').join("-").toLowerCase()} `}>
                                                                {subLink.name}
                                                                </NavLink>
                                                            </div>
                                                        ))    
                                                       
                                                    ) : (<p className="text-center">No Courses found</p>)
                                                }
                                               </div>
                                            </div>
                                        ) : 
                                        (
                                            <NavLink to={link.path}>
                                                <p className={`flex cursor-pointer items-center gap-1 ${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </NavLink>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>

                </nav>
                
                {/* Buttons */}
                <div className="hidden items-center gap-x-4 md:flex">

                    {
                        user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <NavLink to={'/dashboard/cart'} className="relative">
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-xs text-yellow-100 text-center font-bold">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </NavLink>
                        )
                    }

                    {
                        token === null && (
                            <NavLink to={'/login'}>
                                <button className="rounded-[8px] border border-richblack-700  bg-richblack-800 px-[12px] py-[8px] text-richblack-100 cursor-pointer">
                                    Log In
                                </button>
                            </NavLink>
                        )
                    }

                    {
                        token ===  null && (
                            <NavLink to={'/signup'}>
                                <button className="rounded-[8px] border border-richblack-700  bg-richblack-800 px-[12px] py-[8px] text-richblack-100 cursor-pointer">
                                    Sign Up
                                </button>
                            </NavLink>
                        )
                    }

                    {
                        token !== null && <ProfileDropdown/>
                    }
                </div>
                
                {/* Hamburger menu */}
                <div className="md:hidden relative">

                    <button className="mr-4 cursor-pointer" onClick={() => setIsOpen(true)} ref={hamburgerRef}>
                        <AiOutlineMenu fontSize={24} fill="#AFB2BF"/>
                    </button>
                    
                    <nav ref={menuRef} className="flex flex-col z-1000 items-center w-[200px] py-5 absolute right-0 -top-3  bg-[rgba(13,18,30,0.75)] border-[1px] rounded-[16px] border-[rgba(13,18,30,0.3)] backdrop-blur-[7.3px]">

                        <div className="mt-4">
                            {
                                token === null ? (
                                    <div className="flex flex-col gap-4">
                                        <IconBtn text="Login" customClasses="justify-center" onclick={() => {navigate('/login');setIsOpen(false)}}/>
                                        <IconBtn text="SignUp" onclick={() => {navigate('/signup');setIsOpen(false)}}/>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2 items-center">
                                        <p className="text-richblack-50 text-center">Account</p>
                                        <ProfileDropdown/>
                                    </div>                                        
                                )
                            }
                        </div>

                        <div className="bg-richblack-25 mt-5 mb-5 w-full h-[2px]"></div>

                        <div className="flex flex-col gap-4">

                            <p className="text-xl text-yellow-50 font-semibold text-center">Courses</p>
                            {
                                subLinks?.filter((subLink) => subLink?.Courses?.length > 0).map((subLink , index) => (
                                    <div key={index} className="text-richblack-50 text-center" onClick={() => setIsOpen(false)}>
                                        <NavLink to={`/catalog/${subLink.name.split(' ').join('-').toLowerCase()}`}>
                                            {subLink.name}
                                        </NavLink>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="bg-richblack-25 mt-6 mb-6 w-full h-[2px]"></div>

                        <ul className="flex flex-col py-2 mb-1">

                            {
                                NavbarLinks.map((link,index) => (

                                    <li key={index}>
                                        {
                                            link.title !== 'Catalog' && (

                                                <div className="text-richblack-50 mb-4 text-center" onClick={() => setIsOpen(false)}>
                                                    <NavLink to={link.path}>
                                                        {link.title}
                                                    </NavLink>
                                                </div>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                            
                </div>
            </div> 

        </div>
    )
}

export default Navbar


