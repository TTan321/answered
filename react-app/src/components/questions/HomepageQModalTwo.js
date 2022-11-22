import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import AddQuestionForm from './AddQuestionForm';

function HomepageQModalTwo({ user }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* <button className="addQuestion" onClick={() => setShowModal(true)}>Add Question</button> */}
            <div className="questionAsk" onClick={() => setShowModal(true)}>
                <span style={{ color: 'gray' }}>Ask</span>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddQuestionForm setShowModal={setShowModal} user={user} />
                </Modal>
            )}
        </>
    );
}

export default HomepageQModalTwo;
