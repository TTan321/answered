
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './NavBar.css'

const NavBar = ({ user }) => {
  return (
    <nav id='navBar'>
      <NavLink to='/' exact={true} activeClassName='active'>
        Home
      </NavLink>
      <ProfileButton user={user} />
    </nav>
  );
}

export default NavBar;
