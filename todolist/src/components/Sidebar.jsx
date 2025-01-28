import React, { useState } from 'react';
import '../design/Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </button>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="#dashboard">Dashboard</a>
          </li>
          <li>
            <a href="#tasks">My Tasks</a>
          </li>
          <li>
            <a href="#calendar">Calendar</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
          <li>
            <a href="#logout">Logout</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
