import React, { Fragment, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ItemContext from '../../context/item/itemContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const itemContext = useContext(ItemContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  //const { clearContacts } = itemContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    //clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'BIB',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
