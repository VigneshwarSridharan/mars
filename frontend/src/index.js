import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/style.scss';
import * as serviceWorker from './serviceWorker';
const uuidv4 = require('uuid/v4');

window.uid = uuidv4;
const Login = lazy(() => import('./views/Login'));
const App = React.lazy(() => import('./App'))

let { token = "" } = localStorage;


ReactDOM.render(
    <Suspense fallback={<div>Loding...</div>}>
        {token ? <App /> : <Login />}
    </Suspense>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
