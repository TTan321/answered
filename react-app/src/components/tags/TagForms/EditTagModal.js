import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import EditTagForm from './EditTagForm';
import './CreateTagForm.css'

function EditTagModal({ tag }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id='createTagXDiv'>
                <i className="fa-solid fa-ellipsis fa-lg manageTags" onClick={() => setShowModal(true)} />
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditTagForm setShowModal={setShowModal} tag={tag} />
                </Modal>
            )}
        </>
    );
}

export default EditTagModal;
