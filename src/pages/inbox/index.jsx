import React, { useState, useEffect, useCallback } from 'react';
import classname from 'classname';
import { useParams, Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import { incomingList, outcomingList } from './stub';
import EmailList from './EmailList';
import EmailView from './EmailView';
import NewEmail from '../../components/NewEmail';

import './index.scss';

const folders = {
    income: '',
    outcome: outcomingList,
};

const Inbox = (props) => {
    const [emailList, setEmailList] = useState([]);
    const [currentEmailId, setCurrentEmailId] = useState(null);
    const [isModalOpen, setIsOpen] = useState(false);

    const history = props.history;

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
        if (localStorage.getItem('signedIn') !== 'true') {
            history.push('/login');
        }

        setCurrentEmailId(null);

        axios.get('/email/incoming', { withCredentials: true }).then(({ mails }) => {
            setEmailList(
                mails.map((email, index) => ({
                    ...email,
                    id: index,
                    date: email.date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
                })),
            );
        }).catch(console.log)

    }, [folder, history]);

    const unreadNumber = emailList.filter((email) => email.unread === true).length;
    const currentEmail = emailList.find((email) => email.id === currentEmailId);

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

export default withRouter(Inbox);
