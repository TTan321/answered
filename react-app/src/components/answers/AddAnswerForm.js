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
        <div id=''>
            <div>
                <h1 id=''>Add Answer</h1>
            </div>
            <form onSubmit={onSubmit} id='questionForm'>
                <div className=''>
                    <label htmlFor="" />
                    <textarea
                        className=''
                        rows="9"
                        cols="60"
                        value={answer}
                        placeholder="Type Question here"
                        onChange={(e) => setAnswer(e.target.value)}>
                    </textarea>
                    <div className='questionErrorsDiv'>
                        {errors.map((error, idx) => (
                            <p key={idx} >{error}</p>
                        ))}
                    </div>
                    <button className='' type="submit">Submit Answer</button>
                </div>
            </form>
        </div>
    )
}

export default AddAnswerForm
