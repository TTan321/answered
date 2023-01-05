import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import NavBar from "../navbar/NavBar";
import ProfilePageNavBar from "./ProfilePageNavBar";
import { loadQuestions, removeQuestion } from "../../store/questions";
import EditQuestionModal from "../questions/EditQuestionModal"
import EditAnswerModal from "../answers/EditAnswerModal";
import { deleteAnswer, getAnswers, removeComment } from "../../store/answers";
import './ProfilePage.css'
import UpdateCommentModal from "../comments/updateCommentModal";

function ProfilePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const questions = useSelector(state => state.questionsState)
    const questionsArr = Object.values(questions)
    const answers = useSelector(state => state.answersState)
    const answersArr = Object.values(answers)

    const [showAnswers, setShowAnswers] = useState(false)
    const [showQuestions, setShowQuestions] = useState(false)
    const [showComments, setShowComments] = useState(false)

    console.log("answersArr: ", answersArr)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadQuestions())
        dispatch(getAnswers())
    }, [dispatch])

    const deleteQuestion = async (e, id) => {
        e.preventDefault()
        await dispatch(removeQuestion(id))
        await dispatch(loadQuestions())
        await dispatch(authenticate())
    }

    const removeAnswer = async (e, id) => {
        e.preventDefault()
        await dispatch(deleteAnswer(id))
        await dispatch(loadQuestions())
        await dispatch(authenticate())
    }

    const deleteComment = async (e, id) => {
        e.preventDefault()
        await dispatch(removeComment(id))
        await dispatch(loadQuestions())
        await dispatch(authenticate())
    }

    const getQuestionForAnswers = (questionId) => {
        const question = questionsArr.find(question => question.id === questionId)
        return question.question
    }

    const getAnswerForComments = (answerId) => {
        const answer = answersArr.find(answer => answer.id === answerId)
        console.log("answer: ", answer)
        return answer.answer
    }

    return Object.values(user).length > 0 && (
        <div id='profilePage'>
            <NavBar user={user} />
            <div id='profilePageHeaderDiv'>
                <div id='userFirstInitial'>{user.firstname.slice(0, 1).toUpperCase()}</div>
                <div id='usersProfileName'>{user.firstname} {user.lastname}</div>
            </div>
            <div>
                <ProfilePageNavBar user={user} setShowAnswers={setShowAnswers} setShowQuestions={setShowQuestions} setShowComments={setShowComments} showComments={showComments} showAnswers={showAnswers} showQuestions={showQuestions} />
            </div>
            <div>
                {showQuestions && (
                    <div>
                        <div className="filterCountDiv">
                            {user.questions.length} Questions
                        </div>
                        {
                            user.questions.map(question => (
                                <div key={question.id} id='usersQuestionsContainer'>
                                    <p className='usersQuestions'>{question.question}</p>
                                    <div className="timeAndButtons">
                                        <p id='postedTime'><span id='posted'>Posted: </span><span id='date'>{question.createdAt.slice(5, 16)}</span></p>
                                        <div>
                                            <EditQuestionModal question={question} />
                                            <button className="delete modifyButtons" onClick={(e) => deleteQuestion(e, question.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div >
                )}
                {showAnswers && (
                    <div>
                        <div className="filterCountDiv">
                            {user.answers.length} Answers
                        </div>
                        {
                            user.answers.reverse().map(answer => (
                                <div key={answer.id} id='usersQuestionsContainer'>
                                    <div id='questionForAnswersDiv'>
                                        {getQuestionForAnswers(answer.questionId)}
                                    </div>
                                    <p className='usersAnswers'>{answer.answer}</p>
                                    <div className="timeAndButtons">
                                        <p id='postedTime'><span id='posted'>Posted: </span><span id='date'>{answer.createdAt.slice(5, 16)}</span></p>
                                        <div>
                                            <EditAnswerModal user={user} answer={answer} questions={questionsArr} />
                                            <button className="delete modifyButtons" onClick={(e) => removeAnswer(e, answer.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
                {
                    showComments && (
                        <div>
                            <div className="filterCountDiv">
                                {user.comments.length} Comments
                            </div>
                            {
                                user.comments.map((comment, idx) => (
                                    <div key={idx} id='usersQuestionsContainer'>
                                        <div id='questionForAnswersDiv'>
                                            {getAnswerForComments(comment.answer_id)}
                                        </div>
                                        <div className='usersAnswers'>
                                            {comment.comment}
                                        </div>
                                        <div className="timeAndButtons">
                                            {/* <p id='postedTime'><span id='posted'>Posted: </span><span id='date'>{answer.createdAt.slice(5, 16)}</span></p> */}
                                            <div>
                                                <UpdateCommentModal user={user} comment={comment} questions={questionsArr} />
                                                <button className="delete modifyButtons" onClick={(e) => deleteComment(e, comment.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div >
    )
}
export default ProfilePage
