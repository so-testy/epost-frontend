import React from 'react';
import classname from 'classname';

const EmailList = ({ emailList, currentEmailId, setEmail }) => {
    return (
        <ul className="email-list">
            {emailList.map(({ _id, shortFrom, shortTo, date, subject, unread, type }) => {
                return (
                    <li
                        className={classname({
                            'email-list__email': true,
                            'email-list__email--unread': unread,
                            'email-list__email--active': currentEmailId === _id,
                        })}
                        key={_id}
                        onClick={(e) => setEmail(_id)}
                    >
                        <div className="email__title">
                            <span>
                                {type === 'incoming' ? shortFrom : shortTo}
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
