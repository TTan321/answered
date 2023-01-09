import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadQuestions } from "../../store/questions";
import { authenticate } from "../../store/session";
import { addComment } from "../../store/answers";

function CommentForm({ setShowModal, user, answer }) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('');
    const [chars, setChars] = useState(0)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setChars(comment.trim().length)
    }, [comment])

    // const submitQuestion = (e) => {
    //     e.preventDefault()
    //     setQuestion(e.target.value)
    //     setChars(question.trim().length)
    // }

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (comment.trim().length === 0) validateErrors.push("Cannot post empty comment.");
        if (comment.length < 30 || comment.length > 251) validateErrors.push("Comment must be between 30 and 250 characters.");
        await setErrors(validateErrors);

        const payload = {
            'answerId': answer.id,
            'userId': user.id,
            'comment': comment
        }

        if (comment.trim().length > 29 && comment.trim().length < 251) {
            await dispatch(addComment(payload))
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

export default CommentForm
