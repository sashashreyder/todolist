import React from 'react';
import '../design/Header.css';

const Header = ({ onShowRegister, isRegistered }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <i className="fas fa-calendar-alt logo-icon" aria-hidden="true"></i>
        <h1 className="header-title">My Daily Planner</h1>
      </div>
      
      {/* Profile / Register Button */}
      <div className="profile-container">
        <button className="profile-btn" onClick={onShowRegister} aria-label="Profile">
          <i className={`fas ${isRegistered ? "fa-user" : "fa-user-plus"}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;




