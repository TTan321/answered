import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import AddQuestionForm from './AddQuestionForm';

function AddQuestionModal({ user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="addQuestion" onClick={() => setShowModal(true)}>Add Question</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddQuestionForm setShowModal={setShowModal} user={user} />
                </Modal>
            )}
        </>
    );
}

export default AddQuestionModal;
