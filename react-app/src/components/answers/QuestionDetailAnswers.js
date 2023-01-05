import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getComments } from "../../store/comments"


function QuestionAnswers({ filteredAnswers }) {
    const dispatch = useDispatch()
    const [showComments, setShowComments] = useState(false)
    const comments = useSelector(state => state.commentsState)
    const commentsArr = Object.values(comments)
    console.log("filteredNAswers: ", filteredAnswers)
    console.log("comments: ", comments)

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch])



    const getCommentUser = commentId => {
        console.log("HI")
        const user = commentsArr.find(comment => comment.id === commentId)
        console.log("USER: ", user)
        return `${user.user.firstname} ${user.user.lastname}`
    }

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
                </div>
            </div>
            {
                showComments && (
                    (<div>
                    </div>
                    )
                    &&
                    filteredAnswers.comments.map((comment, idx) => (
                        <div key={idx} className='answersContainer'>
                            <div className="answerProfileDiv">
                                {getCommentUser(comment.id)}
                            </div>
                            <div className="answerTextDiv">
                                {comment.comment}
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default QuestionAnswers
