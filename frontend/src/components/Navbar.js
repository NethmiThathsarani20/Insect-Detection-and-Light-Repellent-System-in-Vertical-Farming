import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';

const Navbar = ({ systemStatus }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaShieldAlt className="navbar-icon" />
        Smart Pest Management System
      </div>
      <div className="status-badge">
        <div className={`status-indicator ${systemStatus ? 'online' : 'offline'}`}></div>
        Status: <span>{systemStatus ? 'System Online' : 'System Offline'}</span>
      </div>
    </nav>
  );
};

export default Navbar;
