import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Inbox from '../../pages/inbox';
import Login from '../../pages/login';
import Registration from '../../pages/registration';

import './index.scss';

const App = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/inbox/:folder">
                    <Inbox />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/registration">
                    <Registration />
                </Route>
                <Route path="*">
                    <Redirect to="/inbox/income" />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
