import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadQuestions, postQuestion } from '../../store/questions'
import './AddQuestionForm.css'

function AddQuestionForm({ setShowModal, user }) {
    const dispatch = useDispatch()
    const [question, setQuestion] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (question === 0) validateErrors.push("Question is required.");
        await setErrors(validateErrors);

        const payload = {
            'question': question,
            'userId': user.id
        }

        await dispatch(postQuestion(payload))
        await dispatch(loadQuestions())
        setShowModal(false);

    };

    return (
        <div id='questionFormContainer'>
            <div>
                <h1 id='questionFormTitle'>Add Question</h1>
            </div>
            <form onSubmit={onSubmit} id='questionForm'>
                <div className='questionDiv'>
                    <label htmlFor="question" />
                    <textarea
                        className='questionTextbox'
                        rows="9"
                        cols="60"
                        value={question}
                        placeholder="Type Question here"
                        onChange={(e) => setQuestion(e.target.value)}>
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

export default AddQuestionForm
