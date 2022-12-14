
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import logo from './logo/answered-logo.png'
import './NavBar.css'

const NavBar = ({ user }) => {
  return (
    <nav id='navBar'>
      <NavLink to='/' exact={true} activeClassName='active'>
        <img className='logo' src={logo} alt='answered-logo' />
      </NavLink>
      <ProfileButton user={user} />
    </nav>
  );
}

export default NavBar;
