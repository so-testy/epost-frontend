import React from 'react';

const EmailList = ({ currentEmail }) => {
    return (
        <div className="email-content">
            {currentEmail ? (
                <>
                    <h1 className="email-content__title">{currentEmail.subject}</h1>
                    <div className="email-content__meta">
                        <div className="meta__from">
                            <span>От</span>{currentEmail.from}
                        </div>
                        <div className="meta__to">
                            <span>Кому</span>{currentEmail.to}
                        </div>
                    </div>
                    <div className="email-content__body">{currentEmail.html ? currentEmail.html: currentEmail.text}</div>
                </>
            ) : (
                <div className="choose-email">Выберите письмо для просмотра</div>
            )}
        </div>
    );
};

export default EmailList;
