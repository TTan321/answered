import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import NavBar from "../navbar/NavBar"
import AddAnswerModal from "../answers/AddAnswerModal"
import './AnswerFeed.css'
import { useEffect } from "react"
import { authenticate } from "../../store/session"
import { loadQuestions } from "../../store/questions"
import { getAnswers } from "../../store/answers"

function AnswerFeed() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const questions = useSelector(state => state.questionsState)
    const questionsArr = Object.values(questions).filter(question => question.userId !== user.id)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadQuestions())
        dispatch(getAnswers())
    }, [dispatch])

    return questionsArr.length > 0 && (
        <div>
            <NavBar user={user} />
            <div id='answerFeed'>
                {questionsArr.reverse().map(question => (
                    <div key={question.id} className='questionDiv'>
                        <div className="questiontextDiv">
                            <p className="writeAnswers" onClick={() => history.push(`/question/${question.id}`)}>
                                {question.question}
                            </p>
                        </div>
                        <div id='answerFeedAnswerAmount' onClick={() => history.push(`/question/${question.id}`)}>
                            {question.answers.length ? `${question.answers.length} answers` : 'No answers yet'}
                        </div>
                        < div className="AddAnswerFeedDiv">
                            <AddAnswerModal question={question} user={user} />
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default AnswerFeed
