import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './index.scss';

const Login = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const history = props.history;

    const sendLogin = useCallback(
        (e) => {
            e.preventDefault();
            axios
                .post('/auth/login', { login, password })
                .then((res) => history.push('/inbox/income'))
                .catch(console.log);
        },
        [login, password, history],
    );

    return (
        <div className="login-box">
            <h1>Вход</h1>
            <form>
                <fieldset>
                    <label>Логин</label>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                </fieldset>
                <fieldset>
                    <label>Пароль</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </fieldset>
                <button onClick={sendLogin}>Войти</button>
            </form>
        </div>
    );
};

export default withRouter(Login);
