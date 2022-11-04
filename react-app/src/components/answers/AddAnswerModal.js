import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import AddAnswerForm from './AddAnswerForm';
import './AddAnswerForm.css'

function AddAnswerModal({ user, question }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="answerDiv" onClick={() => setShowModal(true)}>
                <i class="fas fa-pen-square"></i>
                <p className="addAnswer">Answer</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddAnswerForm setShowModal={setShowModal} user={user} question={question} />
                </Modal>
            )}
        </>
    );
}

export default AddAnswerModal;
