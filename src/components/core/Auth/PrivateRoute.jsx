import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({children}) {

    const {token} = useSelector( (state) => state.auth);
    
    if(token !== null) {
        return children
    }
    else {
        <Navigate to={"/login"}/>
    }
}

export default PrivateRoute