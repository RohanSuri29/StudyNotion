import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../services/Operations/studentFeaturesApi";

function RenderTotalAmount() {

    const {total , cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSave = () => {
        const courses = cart.map(((course) => course._id));
        buyCourse(token , courses , user , navigate , dispatch);
    }

    return (
     
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">

            <div className="flex flex-col gap-2">
                
                <p className="text-sm font-medium text-richblack-300">Total:</p>
                <p className="text-3xl font-medium text-yellow-100">₹ {`${total - (total*10)/100}`}</p>
        
                <del className="text-[16px] font-medium text-richblack-300">{total}</del>
        
                <IconBtn text="Buy Now" onclick={handleSave} customClasses="w-full justify-center"/>
            </div>

        </div>
       
    )
}

export default RenderTotalAmount