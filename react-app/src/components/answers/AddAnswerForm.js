import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnswer, getAnswers } from '../../store/answers';
import './AddAnswerForm.css'

function AddAnswerForm({ user, setShowModal, question }) {
    const dispatch = useDispatch()
    const [answer, setAnswer] = useState('');
    const [errors, setErrors] = useState([]);

    console.log('ADD ANSWER QUESTIONS: ', question)

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (answer.length === 0) validateErrors.push("Cannot post empty answer.");
        await setErrors(validateErrors);

        const payload = {
            'answer': answer,
            'user_id': user.id,
            'question_id': question.id
        }

        if (answer.length > 0) {
            await dispatch(addAnswer(payload))
            await dispatch(getAnswers())
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
