import React from 'react';
import '../design/RegisterModal.css';

const RegisterModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Register to Save Your Lists</h2>
        <form>
          <input type="text" placeholder="Enter your name" required />
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Create a password" required />
          <button type="submit">Register</button>
        </form>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default RegisterModal;
