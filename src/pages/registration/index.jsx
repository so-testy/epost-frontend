import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './index.scss';

const Registration = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [additionalAddress, setAdditionalAddress] = useState('');

    const history = props.history;

    const sendRegister = useCallback(
        (e) => {
            e.preventDefault();
            axios
                .post('/auth/register', { login, password, additionalAddress })
                .then((res) => history.push('/inbox/income'))
                .catch(console.log);
        },
        [login, password, additionalAddress, history],
    );

    return (
        <div className="login-box">
            <h1>Регистрация</h1>
            <form>
                <fieldset>
                    <label>Логин</label>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                </fieldset>
                <fieldset>
                    <label>Пароль</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </fieldset>
                <fieldset>
                    <label>Запасной адрес</label>
                    <input type="email" value={additionalAddress} onChange={(e) => setAdditionalAddress(e.target.value)} />
                </fieldset>
                <button onClick={sendRegister}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default withRouter(Registration);
