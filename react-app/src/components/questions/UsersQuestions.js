import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authenticate } from "../../store/session"
import NavBar from "../navbar/NavBar"
import './UsersQuestions.css'

function UsersQuestions() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])

    return user && (
        <div id='userQuestionsPage'>
            <NavBar user={user} />
            <div id='userQuestionsHeaderDiv'>
                <h1>
                    User's Questions
                </h1>
            </div>
            <div>
                {
                    user.questions.map(question => (
                        <div key={question.id}>
                            {question.question}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UsersQuestions
