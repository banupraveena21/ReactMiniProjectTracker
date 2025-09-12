// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <div>
        <Link to="/dashboard" className="mr-4 font-bold">Mini‑Project Tracker</Link>
        {user && user.role === 'trainer' && (
          <Link to="/dashboard/trainer" className="mr-4">Trainer View</Link>
        )}
        {user && user.role === 'trainee' && (
          <Link to="/dashboard/trainee" className="mr-4">Trainee View</Link>
        )}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.username}</span>
            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-2 py-1 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
