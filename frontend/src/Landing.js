import React from 'react';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom'
import Login from './views/Login';

const Landing = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" render={props => {
                    document.title = `Mars - Login`;
                    return <Login {...props} />
                }} />
                <Redirect from="/" to="login" />
            </Switch>
        </BrowserRouter>
    )
}

export default Landing;