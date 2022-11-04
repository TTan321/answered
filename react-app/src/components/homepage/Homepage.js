
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadQuestions } from "../../store/questions";
import { authenticate } from "../../store/session";
import NavBar from "../navbar/NavBar";
import './Homepage.css'


function Homepage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const questions = useSelector(state => state.questionsState)
    const questionsArr = Object.values(questions)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadQuestions())
    }, [dispatch])

    return Object.values(user).length > 0 && questionsArr.length > 0 && (
        <div id='homepage'>
            <NavBar user={user} />
            <div id='questionsFeed'>
                {
                    questionsArr.reverse().map(question => (
                        <div key={question.id} className='questionsContainer'>
                            <div className="questionUser">
                                <i className="fas fa-user-circle fa-2x" />
                                <div className="questionUserInfo">
                                    <span className="name">{question.user.firstname} {question.user.lastname}</span><br />
                                    <span className="date">{question.createdAt.slice(5, 16)}</span><br />
                                </div>
                            </div>
                            <div className="question" onClick={() => history.push(`/question/${question.id}`)}>
                                {question.question}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Homepage
