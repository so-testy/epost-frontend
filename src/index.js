import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './components/App';

axios.defaults.baseURL = 'http://епочта.рф:3000/api/v1';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
