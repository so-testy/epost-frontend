import React, { useState, useEffect, useCallback } from 'react';
import classname from 'classname';
import axios from 'axios';
import { useParams, Link, withRouter } from 'react-router-dom';

// import { incomingList, outcomingList } from './stub';
import EmailList from './EmailList';
import EmailView from './EmailView';
import NewEmail from '../../components/NewEmail';


import './index.scss';

const Inbox = (props) => {
    const [emailList, setEmailList] = useState([]);
    const [currentEmailId, setCurrentEmailId] = useState(null);
    const [isModalOpen, setIsOpen] = useState(false);

    const [incomming, setIncommig] = useState([]);
    const [outcoming, setOutcommig] = useState([]);

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
        const list = folder === 'income' ? incomming : outcoming;

        setEmailList(
            list.map((email, index) => ({
                ...email,
                id: index,
                date: (new Date(email.createdAt)).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
            })),
        );
        setCurrentEmailId(null);
    }, [incomming, outcoming, folder]);

    useEffect(() => {
        axios.get('/email/incoming', { withCredentials: true }).then(response => {
            setIncommig(response.data.mails.map((email, index) => ({
                ...email,
                id: index,
                date: (new Date(email.createdAt)).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
            })));
        });

        axios.get('/email/outcoming', { withCredentials: true }).then(response => {
            setOutcommig(response.data.mails.map((email, index) => ({
                ...email,
                id: index,
                date: (new Date(email.createdAt)).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
            })));
        });
    }, []);

    const unreadNumber = emailList.filter((email) => email.unread === true).length;
    const currentEmail = emailList.find((email) => email.id === currentEmailId);

    const logout = async () => {
        await axios.get('/auth/logout', { withCredentials: true });
        localStorage.setItem('signedIn', false);
        props.history.push('/login');
    }

    return (
        <>
            <NewEmail isModalOpen={isModalOpen} closeModal={closeModal} />
            <header>
                <div className="wrapper">
                    <div className="logo">
                        <span>Е</span>
                        <span>ПОЧТА</span>
                        <span>.РФ</span>
                    </div>
                    <div className="profile">
                        <button onClick={logout}>
                            Выйти
                        </button>
                    </div>
                </div>
            </header>
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
                        <hr />
                        <Link to="/catalog" target="__blank">
                            <li className={classname({ 'folder-list__folder': true })}>
                                Каталог адресов
                            </li>
                        </Link>
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
