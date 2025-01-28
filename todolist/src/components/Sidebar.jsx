import React, { useState } from "react";
import "../design/Sidebar.css";

const Sidebar = ({ tasks, onMarkAllDone, onClearAll, onShowRegister }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "✖" : "☰"}
      </button>
      <div className="sidebar-content">
        <h3>Task Overview</h3>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks}</p>
        <p>Pending: {pendingTasks}</p>

        <h3>Quick Actions</h3>
        <button className="quick-action-btn" onClick={onMarkAllDone}>
          Mark All as Done
        </button>
        <button className="quick-action-btn" onClick={onClearAll}>
          Clear All Tasks
        </button>

        <h3>Account</h3>
        <button className="register-btn" onClick={onShowRegister}>
          <i className="fas fa-user-plus"></i> Register Now
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

