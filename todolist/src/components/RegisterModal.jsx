import React from "react";
import "../design/RegisterModal.css";

const RegisterModal = ({ onClose, onRegister }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose(); 
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <button className="close-btn" onClick={onClose}>❌</button>
        <h2>Register to Save Your Lists</h2>
        <form className="registration-form" onSubmit={onRegister} onClick={(e) => e.stopPropagation()}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <input type="password" name="password" placeholder="Create a password" required />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;







