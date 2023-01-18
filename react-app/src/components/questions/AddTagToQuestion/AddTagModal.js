import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import AddTag from './AddTag';
import './AddTag.css'


function AddTagModal({ question }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='addTagButton' onClick={() => setShowModal(true)} >
                <i className="fas fa-edit" />
                <span className="addAnswer">
                    Add Tag
                </span>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddTag setShowModal={setShowModal} question={question} />
                </Modal>
            )}
        </>
    );
}

export default AddTagModal;
