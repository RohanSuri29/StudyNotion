import toast from "react-hot-toast";
import apiConnector from "../apiconnector";
import { studentEndpoints } from "../apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

function loadScript(src) {

    return new Promise((resolve) => {

        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse (token , courses , user , navigate , dispatch) {

    const toastId = toast.loading("Loading...");

    try{

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load");
            return
        }

        const orderResponse = await apiConnector("POST" , studentEndpoints.COURSE_PAYMENT_API , {courses} , {Authorization:`Bearer ${token}`})
        
        if(!orderResponse?.data?.success) {
            throw new Error(orderResponse?.data?.message);
        }

        const options = {
            key: "rzp_test_SifafWZZaZnsSF",
            currency: orderResponse?.data?.data?.currency,
            amount: orderResponse?.data?.data?.amount,
            order_id: orderResponse?.data?.data?.id,
            name: "StudyNotion",
            description: "Thank You for Purchasing the Course!",
            image: rzpLogo,
            prefill: {
                name: `${user?.firstName}`,
                email: `${user?.email}`
            },
            handler: function(response) {

                sendPaymentSuccessfull(response , orderResponse?.data?.data?.amount , token);

                verifyPayment({...response , courses} , token , navigate , dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed")
            console.log(response.error)
        })
    }
    catch(error) {
        console.error(error);
        toast.error("Unable to buy course")
    }

    toast.dismiss(toastId)
}

async function sendPaymentSuccessfull(response , amount , token) {

    try{

        await apiConnector("POST" , studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API , {orderId: response.razorpay_order_id , paymentId: response.razorpay_payment_id , amount} , {Authorization:`Bearer ${token}`})
    }
    catch(error){
        console.error(error);
        toast.error("Unable to send email")
    }
}

async function verifyPayment(bodyData , token , navigate , dispatch) {

    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));

    try{

        const response = await apiConnector("POST" , studentEndpoints.COURSE_VERIFY_API , bodyData , {Authorization:`Bearer ${token}`});

        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        toast.success("Your Payment is Successfull");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
        localStorage.removeItem("cart");
        localStorage.removeItem("totalItems");
        localStorage.removeItem("total")
    }
    catch(error){
        console.error(error);
        toast.error("Unable to Verify Payment")
    }

    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId)
}