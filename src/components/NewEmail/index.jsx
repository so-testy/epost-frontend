import React, { useState, useCallback } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import './index.scss';

Modal.setAppElement('#root');

const NewEmail = ({ closeModal, isModalOpen }) => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const sendMail = useCallback((e) => {
        e.preventDefault();
        axios.post('/email/send', { to, subject, text }).then(console.log);
    }, [to, subject, text]);

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="overlay"
        >
            <h1 className="modal__title">Новое письмо</h1>
            <div className="modal__body">
                <form>
                    <input type="text" placeholder="Кому" onChange={e => setTo(e.target.value)} value={to} />
                    <input type="text" placeholder="Тема" onChange={e => setSubject(e.target.value)} value={subject} />
                    <textarea onChange={e => setText(e.target.value)} value={text} />
                    <button onClick={sendMail}>Отправить</button>
                </form>
            </div>
        </Modal>
    );
};

export default NewEmail;
