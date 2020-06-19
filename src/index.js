import React from 'react';
import ReactDOM from 'react-dom';
import Inbox from './pages/inbox';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import './index.scss';

axios.defaults.baseURL = 'http://епочта.рф:3000/api/v1';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route exact path="/inbox/:folder">
                    <Inbox />
                </Route>
                <Route path="*">
                    <Redirect to="/inbox/income" />
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root'),
);
