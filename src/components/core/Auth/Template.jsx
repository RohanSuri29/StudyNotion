import { useSelector } from "react-redux"
import Spinner from "../../common/Spinner";
import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function Template(props) {

    const {loading} = useSelector( (state) => state.auth);

    return (

        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            
            {loading ? <Spinner/> : 
            (
                <div  className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">

                    <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">

                        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{props.title}</h1>

                        <div className="mt-4 text-[1.125rem] leading-[1.625rem]">

                            <p className="text-richblack-100"> {props.desc1}</p>
                            <p className="font-edu-sa font-bold italic text-blue-100"> {props.desc2}</p>

                        </div>

                    
                        {
                            props.formtype === "signup" ? <SignUpForm/> : <LoginForm/>
                        }
                      
                    </div>

                    <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">

                        <img src={frameImg} alt="Pattern" height={504} width={558} loading="lazy"/>

                        <img src={props.image} alt="Students" height={504} width={558} loading="lazy" className="absolute -top-4 right-4 z-10" />
                    </div>

                </div>
            )}

        </div>
    )
}

export default Template