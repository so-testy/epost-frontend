import React, { useState, useCallback, useEffect } from 'react';
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
                .post('/auth/login', { login, password }, { withCredentials: true })
                .then((res) => {
                    localStorage.setItem('signedIn', true);
                    history.push('/inbox/income');
                })
        },
        [login, password, history],
    );

    useEffect(() => {
        if (localStorage.getItem('signedIn') === 'true') {
            history.push('/inbox/income');
        }
    }, [history]);

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
