import React, { useState } from 'react';
import { Modal } from '../../../context/Modal'
import DeleteTag from './DeleteTag';

function DeleteTagModal({ tag, question }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* <i class="fas fa-edit" onClick={() => setShowModal(true)} /> */}
            <div className="questionsTags" onClick={() => setShowModal(true)}>
                {tag.name}
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteTag setShowModal={setShowModal} tag={tag} question={question} />
                </Modal>
            )}
        </>
    );
}

export default DeleteTagModal;
