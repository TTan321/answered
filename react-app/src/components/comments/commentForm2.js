import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadQuestions } from "../../store/questions"
import { authenticate } from "../../store/session"
import { addComment } from "../../store/answers"
import './commentForm2.css'


function CommentBubble({ answer }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.commentsState)

    const [char, setChar] = useState(0)
    const [comment, setComment] = useState('')
    // const [errors, setErrors] = useState([]);

    useEffect(() => {
        setChar(comment.length)
    }, [comment])

    const rows = chars => {
        if (chars === 0) {
            return 1
        }
        else {
            return Math.ceil(chars / 57)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        // const validateErrors = [];
        // if (comment.trim().length === 0) validateErrors.push("Cannot post empty comment.");
        // if (comment.length < 30 || comment.length > 251) validateErrors.push("Comment must be between 30 and 250 characters.");
        // await setErrors(validateErrors);

        const payload = {
            'answerId': answer.id,
            'userId': user.id,
            'comment': comment
        }

        // if (comment.trim().length > 29 && comment.trim().length < 251) {
        await dispatch(addComment(payload))
        await dispatch(loadQuestions())
        await dispatch(authenticate())
        setComment('')
        // }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="commentBubble">
                <div id="commentUserIcon">{user.firstname.slice(0, 1)}</div>
                <textarea
                    id="commentBubble"
                    placeholder="Add a comment"
                    rows={rows(char)}
                    cols="55"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
                <button type="submit" className="submitComment">Add a comment</button>
            </div>
        </form>
    )
}

export default CommentBubble
