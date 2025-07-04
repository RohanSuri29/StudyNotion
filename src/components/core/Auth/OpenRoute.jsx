import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({children}) {

    const {token} = useSelector((state) => state.auth);

    if(token === null ) {
        return children
    }
    else {
        <Navigate to={"/dashboard/my-profile"}/>
    }
}

export default OpenRoute