import { RiEditBoxLine } from "react-icons/ri"
import IconBtn from "./IconBtn"

function ConfirmationModal ({modalData}) {

    return (

        <div className="fixed inset-0 z-[1000] h-full !mt-0 grid place-items-center overflow-auto bg-white/5 backdrop-blur-sm">
            
            <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">

                <p className="text-2xl font-semibold text-richblack-5">
                    {modalData?.text1}
                </p>

                <p className="mt-3 mb-5 leading-6 text-richblack-200">
                    {modalData?.text2}
                </p>

                <div className="flex items-center gap-x-4">

                    <IconBtn text={modalData?.btn1Text} onclick={modalData?.btn1Handler}>
                        <RiEditBoxLine/>
                    </IconBtn>

                    <button className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900 hover:bg-richblack-700 hover:text-richblack-50 transition-all duration-200" onClick={modalData.btn2Handler}>
                        {modalData.btn2Text}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ConfirmationModal