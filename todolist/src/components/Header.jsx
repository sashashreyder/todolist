import React from 'react';
import '../design/Header.css';

const Header = ({ onShowRegister, isRegistered }) => {
  return (
    <header className="header">
      <div className="header-bg">
        <img src="https://i.postimg.cc/FH4v5W8R/headerpicture.png" alt="To-Do List Header" className="header-pic" />
      </div>

      <div className="register-container">
        <button className="register-btn" onClick={onShowRegister}>
          {isRegistered ? "Profile" : "Register"}
        </button>
      </div>
    </header>
  );
};

export default Header;







