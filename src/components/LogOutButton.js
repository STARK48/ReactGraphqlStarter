import React, { useContext } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export function LogOutButton() {
    const {logout} =useContext(AuthContext);
  return (
    <Link to='/' >
      <button onClick={logout}  className='btnLogin'>Log Out</button>
    </Link>
  );
}
