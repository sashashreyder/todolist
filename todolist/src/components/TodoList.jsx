import React, { useState, useEffect } from "react";
import "../design/TodoList.css";

const categories = [
  { label: "Personal", emoji: "💼" },
  { label: "Work", emoji: "🚀" },
  { label: "Shopping", emoji: "🛍️" },
  { label: "Health", emoji: "🏃" }
];

const TodoList = ({ setHasUnsavedChanges }) => {
  const getStoredTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : {};
  };

  const getStoredVisibility = () => {
    const savedVisibility = localStorage.getItem("collapsedCategories");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  };

  const [tasks, setTasks] = useState(getStoredTasks);
  const [collapsed, setCollapsed] = useState(() => {
    const stored = getStoredVisibility();
    return categories.reduce((acc, cat) => {
      acc[cat.label] = stored[cat.label] ?? false;
      return acc;
    }, {});
  });

  const [task, setTask] = useState("");
  const [category, setCategory] = useState(categories[0].label);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (setHasUnsavedChanges) setHasUnsavedChanges(true);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("collapsedCategories", JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleCategory = (cat) => {
    setCollapsed((prev) => {
      const updatedState = { ...prev, [cat]: !prev[cat] };
      localStorage.setItem("collapsedCategories", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setError("Task cannot be empty!");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = {
        ...prevTasks,
        [category]: [...(prevTasks[category] || []), { text: task, completed: false }]
      };
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setTask("");
  };

  const markTaskAsDone = (cat, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = {
        ...prevTasks,
        [cat]: prevTasks[cat].map((t, i) =>
          i === index ? { ...t, completed: !t.completed } : t
        )
      };
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const removeTask = (cat, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = {
        ...prevTasks,
        [cat]: prevTasks[cat].filter((_, i) => i !== index)
      };
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  return (
    <div className="todo-container">
      <h2>MY TASKS</h2>
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="task-input"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          {categories.map((cat) => (
            <option key={cat.label} value={cat.label}>
              {cat.emoji} {cat.label}
            </option>
          ))}
        </select>
        <button type="submit" className="add-btn">➕ Add</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="task-grid">
        {categories.map((cat) => (
          <div key={cat.label} className="task-column">
            <h3 onClick={() => toggleCategory(cat.label)} className="category-title">
              {cat.emoji} {cat.label} 
              <span className="toggle-icon">
                {collapsed[cat.label] ? "➕" : "➖"}
              </span>
            </h3>
            {!collapsed[cat.label] && (
              <ul className="task-list">
                {(tasks[cat.label] || []).map((t, index) => (
                  <li key={index} className={`task-item ${t.completed ? "completed" : ""}`}>
                    <span className="task-text">{t.text}</span>
                    <div className="task-actions">
                      <button className="done-btn" onClick={() => markTaskAsDone(cat.label, index)}>
                        {t.completed ? "✔️" : "✅"}
                      </button>
                      <button className="remove-btn" onClick={() => removeTask(cat.label, index)}>
                        🗑️
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;













