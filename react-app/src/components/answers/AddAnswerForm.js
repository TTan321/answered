import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnswer } from '../../store/answers';
import { loadQuestions, postQuestion } from '../../store/questions'
import './AddAnswerForm.css'

function AddAnswerForm({ user, setShowModal, question }) {
    const dispatch = useDispatch()
    const [answer, setAnswer] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (answer === 0) validateErrors.push("Answer is required.");
        await setErrors(validateErrors);

        const payload = {
            'answer': answer,
            'userId': user.id,
            'questionId': question.id
        }

        await dispatch(addAnswer(payload))
        setShowModal(false);

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
                            className=''
                            rows="9"
                            cols="60"
                            value={answer}
                            placeholder="Write answer here"
                            onChange={(e) => setAnswer(e.target.value)}>
                        </textarea>
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
