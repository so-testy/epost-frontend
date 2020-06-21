import React, { useState } from 'react';
import Modal from 'react-modal';

import './index.scss';

Modal.setAppElement('#root');

const NewEmail = ({ closeModal, isModalOpen, sendEmail, toAddress }) => {
    const [to, setTo] = useState(toAddress || '');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

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
                    <textarea onChange={e => setText(e.target.value)} value={text} placeholder="Введите текст письма" />
                    <button onClick={(e) => {
                        e.preventDefault();
                        sendEmail({ to, subject, text })
                    }}>Отправить</button>
                </form>
            </div>
        </Modal>
    );
};

export default NewEmail;
