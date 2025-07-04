import { NavLink } from "react-router-dom"


function CTAbutton ({children , LinkTo , active}) {

    return (

        <div>
            
            <NavLink to={LinkTo}>

                <div className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                hover:shadow-none hover:scale-95 transition-all duration-200 ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"}`}>
                    {children}
                </div>

            </NavLink>

        </div>
    )
}

export default CTAbutton