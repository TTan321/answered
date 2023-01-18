import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getComments } from "../../store/comments"
import { authenticate } from "../../store/session"
import CommentBubble from "../comments/commentForm2"


function QuestionAnswers({ filteredAnswers }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showComments, setShowComments] = useState(false)
    const comments = useSelector(state => state.commentsState)
    const commentsArr = Object.values(comments)
    console.log("filteredNAswers: ", filteredAnswers)
    console.log("comments: ", comments)

    useEffect(() => {
        dispatch(getComments())
        dispatch(authenticate())
    }, [dispatch])

    return (
        <div id='answerFeedDiv'>
            <div className='answersContainer'>
                <div className="answerProfileDiv">
                    <i className="fas fa-user-circle fa-2x" />
                    {filteredAnswers.user.firstname} {filteredAnswers.user.lastname}
                </div>
                <div className="answerTextDiv">
                    {filteredAnswers.answer}
                </div>
                <div className="answerNavi">
                    {/* <CommentFormModal user={user} answer={answer} /> */}
                    <i className="far fa-comment" onClick={() => setShowComments(showComments ? false : true)} />
                    <span style={{ fontSize: "14px", fontWeight: "bold" }}>{filteredAnswers.comments.length} {filteredAnswers.comments.length === 1 ? "Comment" : "Comments"}
                    </span>
                </div>
            </div>
            {
                showComments && (
                    <div>
                        <CommentBubble answer={filteredAnswers} />
                        {
                            filteredAnswers.comments.map((comment, idx) => (
                                <div key={idx} className='answersContainer'>
                                    <div className="answerProfileDiv">
                                        <i className="fas fa-user-circle fa-2x" />
                                        {filteredAnswers.user.firstname} {filteredAnswers.user.lastname}
                                    </div>
                                    <div className="commentsTextDiv">
                                        {comment.comment}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div >
    )
}

export default QuestionAnswers
