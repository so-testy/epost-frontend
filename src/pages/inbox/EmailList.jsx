import React from 'react';
import classname from 'classname';

const EmailList = ({ emailList, currentEmailId, setEmail }) => {
    return (
        <ul className="email-list">
            {emailList.map(({ id, from, date, subject, unread }) => {
                return (
                    <li
                        className={classname({
                            'email-list__email': true,
                            'email-list__email--unread': unread,
                            'email-list__email--active': currentEmailId === id,
                        })}
                        key={id}
                        onClick={(e) => setEmail(id)}
                    >
                        <div className="email__title">
                            <span>
                                {from}
                                {unread && <div className="email__unread-mark"></div>}
                            </span>
                            <div className="email__date">{date}</div>
                        </div>
                        <div className="email__description">{subject}</div>
                    </li>
                );
            })}
        </ul>
    );
};

export default EmailList;
