import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import UpdateCommentForm from './updateCommentForm';

function UpdateCommentModal({ comment, user, answer }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="edit modifyButtons" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UpdateCommentForm setShowModal={setShowModal} user={user} currComment={comment} />
                </Modal>
            )}
        </>
    );
}

export default UpdateCommentModal;
