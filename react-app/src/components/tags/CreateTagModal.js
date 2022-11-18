import React, { useState } from 'react';
import { Modal } from '../../context/Modal'
import CreateTagForm from './CreateTagForm';


function CreateTagModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="" onClick={() => setShowModal(true)}>
                <p className="">+ Create Space</p>
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
