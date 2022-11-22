import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addAnswer, getAnswers } from '../../store/answers';
import { loadQuestions } from '../../store/questions';
import { authenticate } from '../../store/session';
import './AddAnswerForm.css'

function AddAnswerForm({ user, setShowModal, question }) {
    const dispatch = useDispatch()
    const [answer, setAnswer] = useState('');
    const [errors, setErrors] = useState([]);
    const [chars, setChars] = useState(0)



    useEffect(() => {
        setChars(answer.trim().length)
    }, [answer])

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (answer.trim().length === 0) validateErrors.push("Cannot post empty question.");
        if (answer.length < 30 || answer.length > 251) validateErrors.push("Question must be between 30 and 250 characters.");
        await setErrors(validateErrors);

        const payload = {
            'answer': answer,
            'user_id': user.id,
            'question_id': question.id
        }

        if (answer.trim().length > 29 && answer.trim().length < 251) {
            await dispatch(addAnswer(payload))
            await dispatch(getAnswers())
            await dispatch(loadQuestions())
            await dispatch(authenticate())
            setShowModal(false);
        }

    };

    return (
        <div id='addAnswerFormContainer'>
            <div id='addAnswerXDiv' onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
            </div>
            <div id='belowAnswerXDiv'>
                <div>
                    <p id='answerFormQuestion'>{question.question}</p>
                </div>
                <form onSubmit={onSubmit} id=''>
                    <div className=''>
                        <label htmlFor="" />
                        <textarea
                            className='answersTextarea'
                            rows="9"
                            cols="60"
                            value={answer}
                            placeholder="Write answer here"
                            onChange={(e) => setAnswer(e.target.value)}>
                        </textarea>
                        <div id='charLimitsOutDiv'>
                            <div id='charLimits'>({chars}/250)</div>
                        </div>
                        <div className='answersErrorsDiv'>
                            {errors.map((error, idx) => (
                                <p key={idx} >{error}</p>
                            ))}
                        </div>
                        <div className='postButtonDiv'>
                            <button className='postButton' type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAnswerForm
