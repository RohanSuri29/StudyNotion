import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../../services/Operations/SettingsApi";
import { useState } from "react";
import ConfirmationModal from "../../../common/ConfirmationModal";

function DeleteAccount() {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal , setConfirmationModal] = useState(null);

    return (

        <>
            <div className="my-10 mt-32 flex gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">

                <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">       
                    <FiTrash2 className="text-3xl text-pink-200"/>
                </div>

                <div className="flex flex-col space-y-2">

                    <h2 className="text-lg font-semibold text-richblack-5">
                        Delete Account
                    </h2>

                    <div className="w-4/5 hidden sm:block text-pink-25">
                        <p>Would you like to delete account?</p>
                        <p>
                            This account may contain Paid Courses. Deleting your account is 
                            permanent and will remove all the contain associated with it.
                        </p>
                    </div>

                    <button onClick={() => setConfirmationModal({
                        text1: "Are You Sure?",
                        text2: "Your account will be permanently deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(deleteUser(token,navigate)),
                        btn2Handler: () => setConfirmationModal(null) 
                    })} className="w-fit cursor-pointer italic text-pink-300" >

                        I want to delete my account.
                    </button>
                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
    )
}

export default DeleteAccount
