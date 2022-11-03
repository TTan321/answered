
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import NavBar from "../navbar/NavBar";


function Homepage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])

    return Object.values(user).length > 0 && (
        <div>
            <NavBar user={user} />
            <h1>My Home Page</h1>
        </div>
    )
}

export default Homepage
