import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import NavBar from "../navbar/NavBar";
import ProfilePageNavBar from "./ProfilePageNavBar";
import './ProfilePage.css'

function ProfilePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [showAnswers, setShowAnswers] = useState(false)
    const [showQuestions, setShowQuestions] = useState(false)

    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])

    return user && (
        <div id='profilePage'>
            <NavBar user={user} />
            <div id='profilePageHeaderDiv'>
                <div id='userFirstInitial'>{user.firstname.slice(0, 1).toUpperCase()}</div>
                <div id='usersProfileName'>{user.firstname} {user.lastname}</div>
            </div>
            <div>
                <ProfilePageNavBar setShowAnswers={setShowAnswers} setShowQuestions={setShowQuestions} />
            </div>
        </div>
    )
}
export default ProfilePage
