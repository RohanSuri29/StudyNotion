import { useDispatch, useSelector } from "react-redux"
import { sidebarLinks } from "../../../data/Dashboard-Link"
import SidebarLink from  "../Dashboard/SidebarLink"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/Operations/authAPI";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";


function Sidebar () {

    const {user} = useSelector((state) => state.profile);
    const [confirmationModal , setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <div className="lg:flex hidden min-h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
                
                <div className="flex flex-col">
                    {
                        sidebarLinks.map( (link) => {

                            if(link.type && link.type !== user?.accountType){
                                return null
                            }
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                            )
                        })
                    }
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

                <div className="flex flex-col">

                    <SidebarLink link={{name:"Settings" , path:"/dashboard/settings"}} iconName={"VscSettingsGear"}/>

                    <button onClick={() => setConfirmationModal({
                        text1: "Are You Sure ?", 
                        text2: "You will be logged out of your Account",
                        btn1Text: "Logout",
                        btn2Text: "Cancel", 
                        btn1Handler: () => dispatch(logout(navigate)), 
                        btn2Handler: () => setConfirmationModal(null)})} className="px-8 py-2 text-sm font-medium text-richblack-300">

                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg"/>
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            
            <div className="flex lg:hidden fixed bottom-0 bg-richblack-900 justify-between items-center sm:px-2 py-1 z-50 w-full">

                <div className="flex justify-between -space-x-5  mx-auto w-full">
                    {
                        sidebarLinks.map( (sidebarlink) => {

                            if(sidebarlink.type && sidebarlink.type !== user?.accountType) {
                                return null
                            }
                            return(
                                <SidebarLink key={sidebarlink.id} link={sidebarlink} iconName={sidebarlink.icon} />
                            )
                        })
                    }
                    
                    <SidebarLink link={{name:"Settings" , path:"/dashboard/settings"}} iconName={"VscSettingsGear"}/>
                    
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
    )
}

export default Sidebar