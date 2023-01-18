import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAnswers } from "../../store/answers";
import { loadQuestions } from "../../store/questions";
import { authenticate } from "../../store/session";
import AddAnswerModal from "../answers/AddAnswerModal";
import NavBar from "../navbar/NavBar";
import AddTagModal from "./AddTagToQuestion/AddTagModal";
import CommentFormModal from "../comments/commentFormModal";
import DeleteTagModal from "./DeleteTagFromQuestion/DeleteTagModal";
import './QuestionDetailsPage.css'
import QuestionAnswers from "../answers/QuestionDetailAnswers";

function QuestionDetailsPage() {
    const dispatch = useDispatch()
    const { questionId } = useParams()
    const user = useSelector(state => state.session.user)
    const questions = useSelector(state => state.questionsState)
    const currentQuestion = Object.values(questions).find(question => question.id === +questionId)
    const answers = useSelector(state => state.answersState)
    const filteredAnswers = Object.values(answers).filter(answer => answer.questionId === +questionId)

    const [showTopics, setShowTopics] = useState(false)

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
                    {showTopics && (
                        <div className="tagDisplay">
                            {
                                currentQuestion.tags.map(tag => (
                                    <DeleteTagModal key={tag.id} tag={tag} question={currentQuestion} />
                                ))
                            }
                            <AddTagModal question={currentQuestion} />
                        </div>
                    )}
                    {
                        user.id !== currentQuestion.userId && (
                            < div className="interactionDiv">
                                <AddAnswerModal question={currentQuestion} user={user} />
                                <div className="answerDiv" onClick={() => setShowTopics(showTopics ? false : true)}>
                                    <i className="fas fa-info-circle" />
                                    <span className="addAnswer">
                                        Details
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    {
                        user.id !== currentQuestion.userId && filteredAnswers.length === 0 && (
                            < div className="noAnswersDiv">
                                <div id='answerCanYou'>
                                    <div id='navbarNoImageIcon'>
                                        {user.firstname.slice(0, 1).toUpperCase()}
                                    </div>
                                    {user.firstname}, can you answer this question?
                                    <AddAnswerModal question={currentQuestion} user={user} />
                                </div>
                                <div>
                                    No answers yet.
                                </div>
                            </div>
                        )}
                </div>
                <div className="answerAmount">
                    <p>{filteredAnswers.length} Answers</p>
                </div>
                {
                    filteredAnswers.map(answer => (
                        <QuestionAnswers key={answer.id} filteredAnswers={answer} />
                    ))
                }
                {/* <div className="answerAmount">
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
                                <div className="answerNavi">
                                    {/* <CommentFormModal user={user} answer={answer} /> */}
                {/* <i className="far fa-comment" onClick={() => setShowComments(showComments ? false : true)} />
                                </div>
                                {
                                    showComments && (
                                        answer.comments.map((comment, idx) => (
                                            <div key={idx}>
                                                {comment.comment}
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        ))
                    }
                </div> */}
            </div>
        </div >
    )
}

export default QuestionDetailsPage
