import React, { useState } from 'react';
import Modal from 'react-modal';

import './../css/ConfirmationModal.css';

Modal.setAppElement('#root');

const ConfirmationModal = ({ id, confirmModal, auxIdModal }) => {

    console.log('modal id:',id);

    const [state, setState] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const customStyles = {
        content: {
            backgroundColor: '#000',
            padding: '20px',
            border: 'none',
            width: '30%',
            height: '35%',
            borderRadius: '10px',
            border: '2px solid rgb(100, 0, 0)',
            inset: '35%',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        console.log('handelConfirm-ID',id);
        auxIdModal(id);
        confirmModal(state);
        setState(true);
        closeModal();
    };

    const handleCancel = () => {
        closeModal();
    };

    return (
        <div>
            <button className='btn-edit' onClick={openModal}>Eliminar</button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
                <h2 className='title'>Confirmación</h2>
                <p className='text-quest'>¿Estás seguro de que deseas eliminar este PWD?</p>
                <div className='content-btn'>
                <button className='confirm' onClick={handleConfirm}>Confirmar</button>
                <button className='cancel' onClick={handleCancel}>Cancelar</button>
                </div>
            </Modal>
        </div>
    );
};

export default ConfirmationModal;