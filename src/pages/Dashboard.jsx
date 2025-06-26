import { useSelector } from "react-redux"
import Spinner from "../components/common/Spinner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/dashboard/Sidebar";
import Footer from "../components/common/Footer";

function Dashboard() {

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading) {
        return (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center"><Spinner/></div>)
    }

    return (

        <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
            <div className="relative flex min-h-[calc(100vh-3.5rem)] w-full">
                
                <Sidebar/>
                <div className="min-h-[calc(100vh-3.5rem)] flex-1 overflow-auto bg-richblack-900">
                    <Outlet/>
                </div>

            </div>

            <Footer/>
        </div>
    )
}

export default Dashboard