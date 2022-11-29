import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import DeleteTag from './DeleteTag';

function DeleteTagModal({ tag }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id='createTagXDiv' onClick={() => setShowModal(true)}>
                <i className="fas fa-times"></i>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteTag setShowModal={setShowModal} tag={tag} />
                </Modal>
            )}
        </>
    );
}

export default DeleteTagModal;
