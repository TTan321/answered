import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { modifyQuestion } from '../../store/questions'
import { authenticate } from '../../store/session'
import './AddQuestionForm.css'

function EditQuestionForm({ setShowModal, question }) {
    const dispatch = useDispatch()
    const [editedQuestion, setEditedQuestion] = useState(question.question);
    const [errors, setErrors] = useState([]);
    const [chars, setChars] = useState(question.question.length)

    useEffect(() => {
        setChars(editedQuestion.trim().length)
    }, [editedQuestion])

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (editedQuestion.trim().length === 0) validateErrors.push("Cannot post empty question.");
        if (editedQuestion.length < 30 || editedQuestion.length > 251) validateErrors.push("Question must be between 30 and 250 characters.");
        await setErrors(validateErrors);

        const payload = {
            'question': editedQuestion,
            'userId': question.userId,
            'questionId': question.id
        }

        if (editedQuestion.trim().length > 29 && editedQuestion.trim().length < 251) {
            await dispatch(modifyQuestion(payload))
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
                <h1 id='questionFormTitle'>Edit Question</h1>
            </div>
            <form onSubmit={onSubmit} id='questionForm'>
                <div className='addQuestionDiv'>
                    <label htmlFor="question" />
                    <textarea
                        className='questionTextbox'
                        rows="9"
                        cols="60"
                        value={editedQuestion}
                        placeholder="Type Question here"
                        onChange={(e) => setEditedQuestion(e.target.value)}>
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
                        <button className='submitQuestion' type="submit">Submit Question</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditQuestionForm
