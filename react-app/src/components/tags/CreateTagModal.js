import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import CreateTagForm from './CreateTagForm';
import './CreateTagForm.css'

function CreateTagModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="createTagDiv" onClick={() => setShowModal(true)}>
                <p className="createTagText">+ Create Space</p>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateTagForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateTagModal;
