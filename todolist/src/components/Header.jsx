import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <i className="fas fa-calendar-alt logo-icon"></i>
        <h1 className="header-title">My Daily Planner</h1>
      </div>
      <nav className="header-nav">
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
