import React, { useEffect, useState }  from 'react';
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
        axios.get('/auth/profile', { withCredentials: true }).then(data => {
            setUser(data);
        })
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/inbox/:folder">
                    <Inbox user={user} />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/registration">
                    <Registration />
                </Route>
                <Route exact path="/catalog">
                    <Catalog />
                </Route>
                <Route path="*">
                    <Redirect to="/inbox/income" />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
