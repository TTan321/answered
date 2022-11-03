import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p id='signUpModalText'><span>Need an account? </span><span onClick={() => setShowModal(true)} style={{ textDecoration: 'underline', cursor: 'pointer' }} >Sign up here</span></p>
            {
                showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <SignUpForm />
                    </Modal>
                )
            }
        </>
    );
}

export default SignUpFormModal;
