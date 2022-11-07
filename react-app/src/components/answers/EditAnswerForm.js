import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editAnswer, getAnswers } from '../../store/answers'
import { loadQuestions } from '../../store/questions'
import { authenticate } from '../../store/session'
import './EditAnswerForm.css'

function EditAnswerForm({ user, setShowModal, answer, questions }) {
    const dispatch = useDispatch()
    const question = questions.find(question => question.id === answer.questionId)

    const [editedAnswer, setEditedAnswer] = useState(answer.answer);
    const [errors, setErrors] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = [];
        if (editedAnswer.length === 0) validateErrors.push("Cannot post empty answer.");
        await setErrors(validateErrors);

        const payload = {
            'answer': editedAnswer,
            'user_id': user.id,
            'answer_id': answer.id,
            'questionId': question.id
        }

        if (editedAnswer.length > 0) {
            await dispatch(editAnswer(payload))
            await dispatch(getAnswers())
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
                <form onSubmit={(e) => onSubmit(e)} id=''>
                    <div className=''>
                        <label htmlFor="" />
                        <textarea
                            className='answeresTextarea'
                            rows="9"
                            cols="60"
                            value={editedAnswer}
                            placeholder="Write answer here"
                            onChange={(e) => setEditedAnswer(e.target.value)}>
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

export default EditAnswerForm
