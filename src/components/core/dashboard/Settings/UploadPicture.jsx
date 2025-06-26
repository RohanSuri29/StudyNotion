import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../common/IconBtn";
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from "../../../../services/Operations/SettingsApi";

function UploadPicture() {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const [loading , setLoading] = useState(false);
    const fileInput = useRef(null);

    const [imageFile , setImageFile] = useState(null);
    const [previewSource , setPreviewSource] = useState(null);
    const dispatch = useDispatch();

    function handleClick() {
        fileInput.current.click();
    }

    function fileChange(event) {

        const file = event.target.files[0]

        if(file) {
            setImageFile(file);
            previewFile(file);
        }
    }

    function previewFile(file) {

        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {setPreviewSource(reader.result)}
    }

    const fileUpload = async () => {

        setLoading(true)

        try{

            const formData = new FormData();
            formData.append("profileImage" , imageFile);
          
            dispatch(updateDisplayPicture(token , formData)).then(() => {
                setLoading(false)
            })

        }
        catch(error){
            console.error(error);
            setLoading(false)
        }

    }

    return (

        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
            
            <div className="flex items-center gap-x-4">

                <img src={previewSource || user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover" />

                <div className="space-y-2">

                    <p>Change Profile Picture</p>

                    <div className="flex flex-row gap-3">

                        <input className="hidden" type="file" ref={fileInput} accept="image/png , image/jpeg , image/jpg" onChange={fileChange}/>

                        <button disabled={loading} className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 hover:scale-95 hover:bg-richblack-50 hover:text-richblack-700 transition-all duration-200" onClick={handleClick}>
                            Select
                        </button>

                        <IconBtn text={loading ? "Uploading..." : "Upload" } onclick={fileUpload}>
                            {
                                !loading && (<FiUpload className="text-lg text-richblack-900"/>)
                            }
                        </IconBtn>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPicture