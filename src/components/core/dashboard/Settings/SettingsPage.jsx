import ChangePassword from "./changePassword"
import DeleteAccount from "./deleteAccount"
import UpdateProfile from "./UpdateProfile"
import UploadPicture from "./UploadPicture"

function SettingsPage () {

    return (

        <div className="mx-auto w-11/12 max-w-[1000px] py-10 m-12">

            <h2 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Profile
            </h2>
            
            <UploadPicture/>

            <UpdateProfile/>

            <ChangePassword/>

            <DeleteAccount/>                      
        </div>
    )
}

export default SettingsPage