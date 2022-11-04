import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import EditAnswerForm from './EditAnswerForm';
import './EditAnswerForm.css'

function EditAnswerModal({ user, answer, questions }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* <div className="answerDiv" onClick={() => setShowModal(true)}>
                <i class="fas fa-pen-square"></i>
                <p className="addAnswer">Answer</p>
            </div> */}
            <button className="edit modifyButtons" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditAnswerForm setShowModal={setShowModal} user={user} answer={answer} questions={questions} />
                </Modal>
            )}
        </>
    );
}

export default EditAnswerModal;
