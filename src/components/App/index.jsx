import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Inbox from '../../pages/inbox';
import Login from '../../pages/login';
import Catalog from '../../pages/catalog';
import Registration from '../../pages/registration';

import './index.scss';

const App = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios
            .get('/auth/profile', { withCredentials: true })
            .then(({ data }) => setUser(data))
            .catch(() => {
                localStorage.setItem('signedIn', false);
                if (!localStorage.getItem('signedIn')) {
                    window.location.replace('/вход');
                }
            });
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/почта/:folder">
                    <Inbox user={user} />
                </Route>
                <Route exact path="/вход">
                    <Login />
                </Route>
                <Route exact path="/регистрация">
                    <Registration />
                </Route>
                <Route exact path="/каталог">
                    <Catalog />
                </Route>
                <Route path="*">
                    <Redirect to="/почта/входящие" />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
