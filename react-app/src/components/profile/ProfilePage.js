import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import NavBar from "../navbar/NavBar";
import ProfilePageNavBar from "./ProfilePageNavBar";
import { loadQuestions, removeQuestion } from "../../store/questions";
import EditQuestionModal from "../questions/EditQuestionModal"
import EditAnswerModal from "../answers/EditAnswerModal";
import { deleteAnswer } from "../../store/answers";
import './ProfilePage.css'

function ProfilePage() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const questions = useSelector(state => state.questionsState)
    const questionsArr = Object.values(questions)

    const [showAnswers, setShowAnswers] = useState(false)
    const [showQuestions, setShowQuestions] = useState(false)

    useEffect(() => {
        dispatch(authenticate())
        dispatch(loadQuestions())
    }, [dispatch])

    const deleteQuestion = async (e, id) => {
        e.preventDefault()
        await dispatch(removeQuestion(id))
        await dispatch(authenticate())
    }

    const removeAnswer = async (e, id) => {
        e.preventDefault()
        await dispatch(deleteAnswer(id))
        await dispatch(authenticate())
    }

    return user && (
        <div id='profilePage'>
            <NavBar user={user} />
            <div id='profilePageHeaderDiv'>
                <div id='userFirstInitial'>{user.firstname.slice(0, 1).toUpperCase()}</div>
                <div id='usersProfileName'>{user.firstname} {user.lastname}</div>
            </div>
            <div>
                <ProfilePageNavBar user={user} setShowAnswers={setShowAnswers} setShowQuestions={setShowQuestions} showAnswers={showAnswers} showQuestions={showQuestions} />
            </div>
            <div>
                {showQuestions && (
                    <div>
                        {
                            user.questions.map(question => (
                                <div key={question.id} id='usersQuestionsContainer'>
                                    <p className='usersQuestions'>{question.question}</p>
                                    <div className="timeAndButtons">
                                        <p id='postedTime'>Posted: <span>{question.createdAt.slice(5, 16)}</span></p>
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
                        {
                            user.answers.reverse().map(answer => (
                                <div key={answer.id} id='usersQuestionsContainer'>
                                    <p className='usersQuestions'>{answer.answer}</p>
                                    <div className="timeAndButtons">
                                        <p id='postedTime'>Posted: <span>{answer.createdAt.slice(5, 16)}</span></p>
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
            </div>
        </div >
    )
}
export default ProfilePage
