import React, { useState } from "react";
import "../design/Header.css";
import RegisterModal from "./RegisterModal";

const Header = ({ onRegister, isRegistered }) => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className="header">
      <div className="header-bg">
        <h1 className="logo">
          <span className="top-text">easy to use</span>
          <span className="main-text">TO-DO LIST</span>
        </h1>
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











