import React, { useState, useEffect, useCallback } from 'react';
import classname from 'classname';
import axios from 'axios';
import { useParams, Link, withRouter, useLocation } from 'react-router-dom';

import EmailList from './EmailList';
import EmailView from './EmailView';
import NewEmail from '../../components/NewEmail';

import logo from '../../assets/logo.svg';
import external from '../../assets/external-link-symbol.svg';

import './index.scss';

const INCOMING = 'входящие';
const OUTCOMING = 'исходящие';
const ADDRESS = 'адрес';

const Inbox = (props) => {
    const query = new URLSearchParams(useLocation().search);

    const [emailList, setEmailList] = useState([]);
    const [currentEmailId, setCurrentEmailId] = useState(null);
    const [isModalOpen, setIsOpen] = useState(query.get(ADDRESS) != null);

    const [incoming, setIncoming] = useState([]);
    const [outcoming, setOutcoming] = useState([]);

    const { folder } = useParams();

    const setEmail = useCallback(
        (id) => {
            setCurrentEmailId(id);

            const tmpEmailList = [...emailList];
            tmpEmailList.find((email) => email._id === id).unread = false;

            setEmailList(tmpEmailList);
        },
        [emailList],
    );

    const closeModal = useCallback(() => setIsOpen(false), []);
    const openModal = useCallback(() => setIsOpen(true), []);

    const folderTypes = {
        [INCOMING]: incoming,
        [OUTCOMING]: outcoming,
    };

    const currentFolder = folderTypes[folder];

    const history = props.history;

    useEffect(() => {
        if (localStorage.getItem('signedIn') === 'false') history.push('/вход');

        setEmailList(
            currentFolder.map((email, index) => ({
                ...email,
                shortFrom: email.from.split(/<.+?@.+>$/i)[0],
                shortTo: email.to.split(/<.+?@.+>$/i)[0],
                date: email.date.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' }),
            })),
        );
        setCurrentEmailId(null);
    }, [currentFolder, history]);

    useEffect(() => {
        axios
            .get('/email/incoming', { withCredentials: true })
            .then((response) =>
                setIncoming(
                    response.data.mails
                        .map((mail) => ({ ...mail, type: 'incoming', date: new Date(mail.createdAt) }))
                        .sort((a, b) => b.date - a.date),
                ),
            );
        axios
            .get('/email/outcoming', { withCredentials: true })
            .then((response) =>
                setOutcoming(
                    response.data.mails
                        .map((mail) => ({ ...mail, type: 'outcoming', date: new Date(mail.createdAt) }))
                        .sort((a, b) => b.date - a.date),
                ),
            );
    }, []);

    const unreadNumber = incoming.filter((email) => email.unread === true).length;
    const currentEmail = emailList.find((email) => email._id === currentEmailId);

    const logout = async () => {
        await axios.get('/auth/logout', { withCredentials: true });
        localStorage.setItem('signedIn', false);
        props.history.push('/вход');
    };

    const sendMail = ({ to, subject, text }) => {
        axios.post('/email/send', { to, subject, text }, { withCredentials: true }).then((email) => {
            axios
                .get('/email/outcoming', { withCredentials: true })
                .then((response) =>
                    setOutcoming(
                        response.data.mails
                            .map((mail) => ({ ...mail, type: 'outcoming', date: new Date(mail.createdAt) }))
                            .sort((a, b) => b.date - a.date),
                    ),
                );
            closeModal();
        });
    };

    return (
        <>
            <NewEmail isModalOpen={isModalOpen} sendEmail={sendMail} closeModal={closeModal} toAddress={query.get(ADDRESS)}/>
            <header>
                <div className="wrapper">
                    <div className="logo">
                        <img src={logo} alt="" className="logo" />
                    </div>
                    {props.user && (
                        <div className="profile">
                            <span className="user-email">{props.user.login}@епочта.рф</span>
                            <button onClick={logout}>Выйти</button>
                        </div>
                    )}
                </div>
            </header>
            <div className="wrapper">
                <div className="aside">
                    <button className="create-email" onClick={openModal}>
                        Написать
                    </button>
                    <ul className="folder-list">
                        <Link to="/почта/входящие">
                            <li className={classname({ 'folder-list__folder': true, 'folder-list__folder--active': folder === INCOMING })}>
                                Входящие
                                {unreadNumber > 0 && <div className="mail-indicator">{unreadNumber}</div>}
                            </li>
                        </Link>
                        <Link to="/почта/исходящие">
                            <li className={classname({ 'folder-list__folder': true, 'folder-list__folder--active': folder === OUTCOMING })}>
                                Отправленные
                            </li>
                        </Link>
                        <hr />
                        <Link to="/каталог" target="__blank">
                            <li className="folder-list__folder catalog-link">
                                Каталог адресов
                                <img src={external} alt="" className="external-link-icon" />
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
