import React, { useState } from "react";
import "../design/Header.css";
import RegisterModal from "./RegisterModal";

const Header = ({ onRegister, isRegistered }) => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className="header">
      <div className="header-bg">
        <img
          src="https://i.postimg.cc/FH4v5W8R/headerpicture.png"
          alt="To-Do List Header"
          className="header-pic"
        />
      </div>
      <div className="register-container">
        {!isRegistered && (
          <button className="register-btn" onClick={() => setShowRegister(true)}>
            Register
          </button>
        )}
      </div>
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onRegister={onRegister}
        />
      )}
    </header>
  );
};

export default Header;










