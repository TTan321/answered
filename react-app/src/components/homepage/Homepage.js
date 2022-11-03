
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadQuestions } from "../../store/questions";
import { authenticate } from "../../store/session";
import NavBar from "../navbar/NavBar";
import './Homepage.css'


function Homepage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const questions = useSelector(state => state.questionsState)
    const questionsArr = Object.values(questions)

    console.log('QUESTIONS: ', questions)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadQuestions())
    }, [dispatch])

    return Object.values(user).length > 0 && questionsArr.length > 0 && (
        <div id='homepage'>
            <NavBar user={user} />
            <div id='questionsFeed'>
                {
                    questionsArr.map(question => (
                        <div key={question.id} className='questionsContainer'>
                            <div className="questionUser">
                                {question.user.firstname} {question.user.lastname}
                            </div>
                            <div className="question">
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
