import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadQuestions, postQuestion } from '../../../store/questions'
import { authenticate } from '../../../store/session'
import './AddQuestionForm.css'

function AddQuestionForm({ setShowModal, user }) {
    const dispatch = useDispatch()
    const [question, setQuestion] = useState('');
    const [chars, setChars] = useState(0)
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setChars(question.trim().length)
    }, [question])

    // const submitQuestion = (e) => {
    //     e.preventDefault()
    //     setQuestion(e.target.value)
    //     setChars(question.trim().length)
    // }

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (question.trim().length === 0) validateErrors.push("Cannot post empty question.");
        if (question.length < 30 || question.length > 251) validateErrors.push("Question must be between 30 and 250 characters.");
        await setErrors(validateErrors);

        const payload = {
            'question': question,
            'userId': user.id
        }

        if (question.trim().length > 29 && question.trim().length < 251) {
            await dispatch(postQuestion(payload))
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

export default AddQuestionForm
