import React from 'react';
import '../design/Header.css';

const Header = ({ onShowRegister }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <i className="fas fa-calendar-alt logo-icon" aria-hidden="true"></i>
        <h1 className="header-title">My Daily Planner</h1>
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="register-btn" onClick={onShowRegister} aria-label="Register">
          <i className="fas fa-user-plus"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;


