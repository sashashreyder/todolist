import React from 'react';
import '../design/Header.css';

const Header = ({ onShowRegister, isRegistered }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <i className="fas fa-calendar-alt logo-icon" aria-hidden="true"></i>
        <h1 className="header-title">My Daily Planner</h1>
      </div>

      <div className="profile-container">
        <button className="register-btn" onClick={onShowRegister}>
          {isRegistered ? "Profile" : "Register"}
        </button>
      </div>
    </header>
  );
};

export default Header;






