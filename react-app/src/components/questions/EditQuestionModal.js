import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import EditQuestionForm from './EditQuestionForm';

function EditQuestionModal({ question }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="edit modifyButtons" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditQuestionForm setShowModal={setShowModal} question={question} />
                </Modal>
            )}
        </>
    );
}

export default EditQuestionModal;
