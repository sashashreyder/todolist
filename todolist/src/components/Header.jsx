import React from 'react';
import '../design/Header.css';

const Header = ({ onShowRegister }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <i className="fas fa-calendar-alt logo-icon" aria-hidden="true"></i>
        <h1 className="header-title">My Daily Planner</h1>
      </div>
        <button className="register-btn2" onClick={onShowRegister} aria-label="Register">
          <i className="fas fa-user-plus"></i>
        </button>
    </header>
  );
};

export default Header;



