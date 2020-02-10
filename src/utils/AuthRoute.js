import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
);

AuthRoute.propTypes = {
  user: PropTypes.object
};
export default AuthRoute;
