import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GetUserLogin } from '../services';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => GetUserLogin.isAuthenticate() ? (
        <Component {...props} />
    ) : (
            <Redirect to={{
                pathname: '/auth/login',
                state: { from: props.location }
            }}
            />
        )} />
)

export default PrivateRoute;