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
        if (question.length === 0) validateErrors.push("Cannot post empty question.");
        await setErrors(validateErrors);

        const payload = {
            'question': question,
            'userId': user.id
        }

        if (question.length > 0) {
            const data = await dispatch(postQuestion(payload))
            if (data) {
                await setErrors(data)
            }
        }

        if (errors.length === 0) {
            await dispatch(loadQuestions())
            // setShowModal(false);
        }


    };

    return (
        <div id='questionFormContainer'>
            <div id='add-question-cancel-div' onClick={() => setShowModal(false)}>
                <i className="fas fa-times add-question-cancel"></i>
            </div>
            <div>
                <h1 id='questionFormTitle'>Add Question</h1>
            </div>
            <form onSubmit={onSubmit} id='questionForm'>
                <div className='addQuestionDiv'>
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
                    <div className='postButtonDiv'>
                        <button className='submitQuestion' type="submit">Submit Question</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddQuestionForm
