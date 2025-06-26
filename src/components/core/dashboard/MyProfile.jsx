import { useNavigate } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import dateFormatter from "../../../util/dateFormatter";

function MyProfile() {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();

    return (

        <div className="mx-auto w-11/12 max-w-[1000px] py-10 m-20">
            
            <h2 className="mb-14 text-3xl font-medium text-richblack-5">
                My Profile
            </h2>

            {/* Section-1 */}
            <div className="flex items-center gap-4 sm:gap-0 flex-wrap sm:justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-4 px-5 sm:p-8 sm:px-12">

                <div className="flex items-center gap-4">

                    <img src={user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover"/>
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-richblack-5">{`${user?.firstName} ${user?.lastName}`}</p>
                        <p  className="text-sm text-richblack-300">{user?.email}</p>
                    </div>

                </div>
                
                <div className="ml-auto">
                    <IconBtn text={"Edit"} onclick={() => navigate('/dashboard/settings')}>
                        <RiEditBoxLine/>
                    </IconBtn>
                </div>
            </div>

            {/* Section-2 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-6 px-5 sm:p-8 sm:px-12">

                <div className="flex w-full items-center justify-between">
                    
                    <p className="text-lg font-semibold text-richblack-5">About</p>

                    <IconBtn text={"Edit"} onclick={()=> navigate('/dashboard/settings')} >
                        <RiEditBoxLine/>
                    </IconBtn>

                </div>

                <div className={`${user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}>
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                </div>
            </div>

            {/* Section-3 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-6 px-5 sm:p-8 sm:px-12">

                <div  className="flex w-full items-center justify-between">

                    <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
            
                    <IconBtn text={"Edit"} onclick={() => navigate('/dashboard/settings')}>
                        <RiEditBoxLine/>
                    </IconBtn>

                </div>

                <div className="flex max-w-[500px] flex-wrap gap-5 sm:gap-0 justify-between">

                    <div className="flex flex-col gap-y-5">

                        <div>
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                        </div>

                    </div>

                    <div className="flex flex-col gap-y-5">

                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.contact ?? "Add Contact Number"}</p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">{dateFormatter(user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth")}</p>
                        </div>

                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default MyProfile