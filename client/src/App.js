import React, { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import LandingPage from './components/pages/LandingPage';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import RedirectLanding from './components/routing/RedirectLanding';

import ItemState from './context/item/ItemState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import './App.css';


const App = () => {
  return (
    <AuthState>
      <ItemState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <RedirectLanding exact path='/' HomeComponent={Home} RedirectComponent={LandingPage}/>
                  <PrivateRoute exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ItemState>
    </AuthState>
  );
};

export default App;
