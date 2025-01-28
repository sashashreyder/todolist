import React from 'react';
import '../design/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} My Daily Planner. All Rights Reserved.</p>
        <nav className="footer-nav">
          <a href="#privacy" className="footer-link">Privacy Policy</a>
          <a href="#terms" className="footer-link">Terms of Service</a>
          <a href="#contact" className="footer-link">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
