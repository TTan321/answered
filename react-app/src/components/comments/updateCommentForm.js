import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadQuestions } from "../../store/questions";
import { authenticate } from "../../store/session";
import { updateComment } from "../../store/answers";

function UpdateCommentForm({ setShowModal, user, currComment }) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState(currComment.comment);
    const [chars, setChars] = useState(currComment.comment.length)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setChars(comment.trim().length)
    }, [comment])


    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (comment.trim().length === 0) validateErrors.push("Cannot post empty comment.");
        if (comment.length < 30 || comment.length > 251) validateErrors.push("Comment must be between 30 and 250 characters.");
        await setErrors(validateErrors);

        const payload = {
            'commentId': currComment.id,
            'comment': comment
        }

        if (comment.trim().length > 29 && comment.trim().length < 251) {
            await dispatch(updateComment(payload))
            await dispatch(loadQuestions())
            await dispatch(authenticate())
            setShowModal(false);
        }
    };

    return (
        <div id='questionFormContainer'>
            <div id='add-question-cancel-div' onClick={() => setShowModal(false)}>
                <i className="fas fa-times add-question-cancel"></i>
            </div>
            <div>
                <h1 id='questionFormTitle'>Add Comment</h1>
            </div>
            <form onSubmit={onSubmit} id='questionForm'>
                <div className='addQuestionDiv'>
                    <label htmlFor="comment" />
                    <textarea
                        className='questionTextbox'
                        rows="9"
                        cols="60"
                        value={comment}
                        placeholder="Type here"
                        onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                    <div id='charLimitsOutDiv'>
                        <div id='charLimits'>({chars}/250)</div>
                    </div>
                    <div className='questionErrorsDiv'>
                        {errors.map((error, idx) => (
                            <p key={idx} >{error}</p>
                        ))}
                    </div>
                    <div className='postButtonDiv'>
                        <button className='submitQuestion' type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateCommentForm
