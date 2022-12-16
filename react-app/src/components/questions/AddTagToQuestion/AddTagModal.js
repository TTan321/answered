import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import AddTag from './AddTag';

function AddTagModal({ question }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i class="fas fa-edit" onClick={() => setShowModal(true)} />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddTag setShowModal={setShowModal} question={question} />
                </Modal>
            )}
        </>
    );
}

export default AddTagModal;
