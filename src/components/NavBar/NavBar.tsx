import React from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../model/Model';
import './NavBar.css';

interface NavBarProps {
  user: User | undefined;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  let loginLogout;
  if (user) {
    loginLogout = (
      <Link className='loginLogout' to='/logout'>
        {user.username}
      </Link>
    );
  } else {
    loginLogout = (
      <Link className='loginLogout' to='/login'>
        Login
      </Link>
    );
  }
  return (
    <div className='navbar'>
      <Link className='navbarItem' to='/'>
        Home
      </Link>
      <Link className='navbarItem' to='/profile'>
        Profile
      </Link>
      <Link className='navbarItem' to='/spaces'>
        Spaces
      </Link>
      {loginLogout}
    </div>
  );
};

export default NavBar;
