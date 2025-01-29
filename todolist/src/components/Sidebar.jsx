import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../design/Sidebar.css";

const Sidebar = ({ onShowRegister }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "✖" : "☰"}
      </button>
      <div className="sidebar-content">
        <h3>Current Time</h3>
        <p>{time}</p>

        <h3>Account</h3>
        <GoogleLogin
          onSuccess={(response) => console.log("Google Login Success:", response)}
          onError={() => console.log("Google Login Failed")}
        />

        <button className="register-btn" onClick={onShowRegister}>
          Register
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;










