import React, { useState, useEffect, useCallback } from 'react';
import classname from 'classname';
import { useParams, Link } from 'react-router-dom';

import { incomingList, outcomingList } from './stub';
import EmailList from './EmailList';
import EmailView from './EmailView';
import NewEmail from '../../components/NewEmail';

import './index.scss';

const Inbox = (props) => {
    const [emailList, setEmailList] = useState([]);
    const [currentEmailId, setCurrentEmailId] = useState(null);
    const [isModalOpen, setIsOpen] = useState(false);

    const { folder } = useParams();

    const setEmail = useCallback(
        (id) => {
            setCurrentEmailId(id);

            const tmpEmailList = [...emailList];
            tmpEmailList.find((email) => email.id === id).unread = false;

            setEmailList(tmpEmailList);
        },
        [emailList],
    );

    const closeModal = useCallback(() => setIsOpen(false), []);
    const openModal = useCallback(() => setIsOpen(true), []);

    useEffect(() => {
        const list = folder === 'income' ? incomingList : outcomingList;

        setEmailList(
            list.map((email, index) => ({
                ...email,
                id: index,
                date: email.date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
            })),
        );
        setCurrentEmailId(null);
    }, [folder]);

    const currentEmail = emailList.find((email) => email.id === currentEmailId);
    const unreadNumber = emailList.filter((email) => email.unread === true).length;

    return (
        <>
            <NewEmail isModalOpen={isModalOpen} closeModal={closeModal} />
            <div className="wrapper">
                <div className="aside">
                    <button className="create-email" onClick={openModal}>
                        Написать
                    </button>
                    <ul className="folder-list">
                        <Link to="/inbox/income">
                            <li className={classname({ 'folder-list__folder': true, 'folder-list__folder--active': folder === 'income' })}>
                                Входящие
                                {unreadNumber > 0 && <div className="mail-indicator">{unreadNumber}</div>}
                            </li>
                        </Link>
                        <Link to="/inbox/outcome">
                            <li className={classname({ 'folder-list__folder': true, 'folder-list__folder--active': folder === 'outcome' })}>
                                Отправленные
                            </li>
                        </Link>
                        <li className="folder-list__folder">Спам</li>
                    </ul>
                </div>
                <div className="content">
                    <EmailList emailList={emailList} currentEmailId={currentEmailId} setEmail={setEmail} />
                    <EmailView currentEmail={currentEmail} />
                </div>
            </div>
        </>
    );
};

export default Inbox;