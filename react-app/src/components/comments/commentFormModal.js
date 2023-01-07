import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import CommentForm from './commentForm';

function CommentFormModal({ answer, user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id='questionBubble' onClick={() => setShowModal(true)}><span id='questionBubbleText'>Add a comment</span></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CommentForm setShowModal={setShowModal} user={user} answer={answer} />
                </Modal>
            )}
        </>
    );
}

export default CommentFormModal;
