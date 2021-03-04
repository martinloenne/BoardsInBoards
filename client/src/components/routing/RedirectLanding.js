import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const RedirectLandingRoute = ({ HomeComponent: HomeComponent, RedirectComponent: RedirectComponent, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    < Route{...rest} render={props => !isAuthenticated ? (<HomeComponent {...props} />) : (<HomeComponent {...props} />) } />);
    //< Route{...rest} render={props => !isAuthenticated ? (<RedirectComponent {...props} />) : (<HomeComponent {...props} />) } />);
    //< Route{...rest} render={props => !isAuthenticated && !loading ? (<RedirectComponent {...props} />) : (<HomeComponent {...props} />) } />);
};

export default RedirectLandingRoute;