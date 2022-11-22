import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import AddQuestionForm from './AddQuestionForm';

function HomepageQuestionModal({ user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* <button className="addQuestion" onClick={() => setShowModal(true)}>Add Question</button> */}
            <div id='questionBubble' onClick={() => setShowModal(true)}><span id='questionBubbleText'>What do you want to ask?</span></div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddQuestionForm setShowModal={setShowModal} user={user} />
                </Modal>
            )}
        </>
    );
}

export default HomepageQuestionModal;
