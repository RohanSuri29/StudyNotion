import * as Icons from "react-icons/vsc"
import { matchPath, NavLink, useLocation } from "react-router-dom";

function SidebarLink({link , iconName}) {

    let Icon = Icons[iconName];
    const location = useLocation();

    function matchRoute(route) {
        return matchPath({path:route} , location.pathname);
    }

    return (

        <NavLink to={link.path}>

            <div className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-5" : "bg-transparent text-richblack-300"} transition-all duration-200`}>

                <span className={`absolute left-0 bottom-0 md:top-0 h-[0.2rem] md:h-full md:w-[0.2rem] w-full bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

                <div className="flex items-center gap-x-2">
                    <Icon className="md:text-lg text-3xl"/>
                    <span className="hidden md:block">{link.name}</span>
                </div>
            </div>

        </NavLink>
    )
}

export default SidebarLink