import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { modifyQuestion } from '../../store/questions'
import { authenticate } from '../../store/session'
import './AddQuestionForm.css'

function EditQuestionForm({ setShowModal, question }) {
    const dispatch = useDispatch()
    const [editedQuestion, setEditedQuestion] = useState(question.question);
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (editedQuestion === 0) validateErrors.push("Question is required.");
        await setErrors(validateErrors);

        const payload = {
            'question': editedQuestion,
            'userId': question.userId,
            'questionId': question.id
        }

        await dispatch(modifyQuestion(payload))
        await dispatch(authenticate())
        setShowModal(false);

    };

    return (
        <div id='questionFormContainer'>
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
                    <div className='questionErrorsDiv'>
                        {errors.map((error, idx) => (
                            <p key={idx} >{error}</p>
                        ))}
                    </div>
                    <button className='submitQuestion' type="submit">Submit Question</button>
                </div>
            </form>
        </div>
    )
}

export default EditQuestionForm
