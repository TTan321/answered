import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import AddTag from './AddTag';
import './AddTag.css'


function AddTagModal({ question }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i className="fas fa-edit addTagIcon" onClick={() => setShowModal(true)} />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddTag setShowModal={setShowModal} question={question} />
                </Modal>
            )}
        </>
    );
}

export default AddTagModal;
