import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnswers } from "../../store/answers";
import { loadQuestions } from "../../store/questions";
import { authenticate } from "../../store/session";
import AddAnswerModal from "../answers/AddAnswerModal";
import NavBar from "../navbar/NavBar";
import './QuestionDetailsPage.css'

function QuestionDetailsPage() {
    const dispatch = useDispatch()
    const { questionId } = useParams()
    const user = useSelector(state => state.session.user)
    const questions = useSelector(state => state.questionsState)
    const currentQuestion = Object.values(questions).find(question => question.id === +questionId)
    const answers = useSelector(state => state.answersState)
    const filteredAnswers = Object.values(answers).filter(answer => answer.questionId === +questionId)

    // console.log('ANSWERS: ', filteredAnswers)
    // console.log('CURRENT QUESTION: ', currentQuestion)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadQuestions())
        dispatch(getAnswers())
    }, [dispatch])

    return Object.values(questions).length > 0 && Object.values(answers).length > 0 && (
        <div id='questionDetailPageContainer'>
            <NavBar user={user} />
            <div id='questionDetailPage'>
                <div className="questionDiv">
                    <div className="questiontextDiv">
                        <p className="questionText">{currentQuestion.question}</p>
                    </div>
                    <div className="interactionDiv">
                        <AddAnswerModal question={currentQuestion} user={user} />
                    </div>
                </div>
                <div className="answerAmount">
                    <p>{filteredAnswers.length} Answers</p>
                </div>
                <div id='answerFeedDiv'>
                    {
                        filteredAnswers.map(answer => (
                            <div key={answer.id} className='answersContainer'>
                                <div className="answerProfileDiv">
                                    <i className="fas fa-user-circle fa-2x" />
                                    {answer.user.firstname} {answer.user.lastname}
                                </div>
                                <div className="answerTextDiv">
                                    {answer.answer}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionDetailsPage