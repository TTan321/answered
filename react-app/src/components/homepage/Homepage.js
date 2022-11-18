
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadQuestions } from "../../store/questions";
import { authenticate } from "../../store/session";
import About from "../about/About";
import Tags from "../tags/Tags";
import NavBar from "../navbar/NavBar";
import './Homepage.css'
import AddQuestionModal from "../questions/AddQuestionModal";
import HomepageQuestionModal from "../questions/HomePageQuestionModal";
import HomepageQModalTwo from "../questions/HomepageQModalTwo";


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
            <div id='homepageBelowNav'>
                <Tags />
                <div id='questionsFeed'>
                    <div id='homepageAddQuestionDiv'>
                        <div id='questionDivUpper'>
                            <div id='questionUserIcon'>{user.firstname.slice(0, 1).toUpperCase()}</div>
                            {/* <div id='questionBubble'><span id='questionBubbleText'>What do you want to ask?</span></div> */}
                            <HomepageQuestionModal user={user} />
                        </div>
                        <div id='questionDivLower'>
                            {/* <div className="questionAsk">
                                <span style={{ color: 'gray' }}>Ask</span>
                            </div> | */}
                            <HomepageQModalTwo user={user} />
                            |
                            <div className="questionAnswer" onClick={() => history.push('/answer')}>
                                <span style={{ color: 'gray' }}>Answer</span>
                            </div>
                        </div>
                    </div>
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
                                <div id='homepageQuestionAnswersDiv'>
                                    {question.answers.length ? question.answers[0].answer : 'No answers yet'}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <About />
            </div>
        </div >
    )
}

export default Homepage
