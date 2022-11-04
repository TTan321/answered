import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
    // const currentQuestion = user.questions.find(question => question.id === +questionId)

    console.log('CURRENT QUESTION: ', currentQuestion)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadQuestions())
    }, [dispatch])

    return (
        <div id='questionDetailPageContainer'>
            <NavBar user={user} />
            <div id='questionDetailPage'>
                <div className="questionDiv">
                    <div className="questiontextDiv">
                        <p className="questionText">{currentQuestion.question}</p>
                    </div>
                    <div className="interactionDiv">
                        <AddAnswerModal question={currentQuestion} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionDetailsPage
