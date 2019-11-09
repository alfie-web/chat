import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from './redux/store';

import App from './App';
import './styles/index.sass';
import 'emoji-mart/css/emoji-mart.css';

ReactDOM.render(
            <Router>
                        <Provider store={store}>
                                    <App />
                        </Provider>
            </Router>
, document.getElementById('root'));

