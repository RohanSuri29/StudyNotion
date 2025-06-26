import { useDispatch, useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import IconBtn from "../../../common/IconBtn";
import { resetCart } from "../../../../slices/cartSlice";
import Spinner from "../../../common/Spinner";

function CartPage() {

    const {total , totalItems , cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const {paymentloading} = useSelector((state) => state.course);

    if(paymentloading) {
        return <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <Spinner/>
        </div>
    }

    return (

        <div className="mx-auto w-11/12 max-w-[1000px] py-10 m-20">
            
            <div className="flex items-center justify-between">

                <h2 className="mb-14 text-3xl font-medium text-richblack-5">My Wishlist</h2>
                
                <IconBtn text="Empty Cart" customClasses={`${cart?.length ? "block" : "hidden"} justify-center`} onclick={() => {dispatch(resetCart());localStorage.removeItem("cart");localStorage.removeItem("total");localStorage.removeItem("totalItems")}}/>
            </div>

            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Course(s) in Cart</p>

            {
                total > 0 ? (

                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>

                ) : (
                    <p className="mt-14 text-center text-3xl text-richblack-100">
                        Your Cart is empty!
                    </p>
                )
            }
        </div>
    )
}

export default CartPage