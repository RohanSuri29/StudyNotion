import { useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../services/Operations/authAPI";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useOnClickOutside } from "../../../hook/UseOnClickOutside";

function ProfileDropdown() {

    const {user} = useSelector((state) => state.profile);
    const [isOpen , setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropDownRef = useRef(null);

    if(!user){
        return null
    }

    useOnClickOutside(dropDownRef , () => setIsOpen(false));

    return (

        <button className="relative" onClick={() => setIsOpen(true)}>

            <div className="flex items-center gap-x-1">

                <img src={user?.image} className="aspect-square w-[2.25rem] rounded-full object-fit"/>

                <AiFillCaretDown className="text-[16px] text-richblack-100" />
            </div>

            {
                isOpen && (

                    <div ref={dropDownRef} onClick={(event) => event.stopPropagation()}  
                    className="absolute top-[118%] right-0 z-[1000] flex flex-col divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800">

                        <NavLink to="/dashboard/my-profile" onClick={() => setIsOpen(false)}>

                            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                                <VscDashboard className="text-lg"/>
                                Dashboard
                            </div>
                        </NavLink>

                        <div onClick={() => {dispatch(logout(navigate));setIsOpen(false)}}  className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">

                            <VscSignOut className="text-lg"/>
                            Logout                        
                        </div>
                    </div>
                )
            }
        </button>
    )
}

export default ProfileDropdown