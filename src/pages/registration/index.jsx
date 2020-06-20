import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './index.scss';

const Registration = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [additionalAddress, setAdditionalAddress] = useState('');

    const history = props.history;
    console.log(process.env.SERVER_HOST)
    const sendRegister = useCallback(
        (e) => {
            e.preventDefault();
            axios.post('/auth/register', { login, password, additionalAddress }, { withCredentials: true }).then((res) => {
                history.push('/login');
            });
        },
        [login, password, additionalAddress, history],
    );

    useEffect(() => {
        if (localStorage.getItem('signedIn') === 'true') {
            history.push('/inbox/income');
        }
    }, [history]);

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
