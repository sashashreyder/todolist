import React, { useState, useEffect } from "react";
import "../design/TodoList.css";

const categories = [
  { label: "Personal", emoji: "☺️" },
  { label: "Work", emoji: "🖥️" },
  { label: "Shopping", emoji: "🛒" },
  { label: "Other", emoji: "🌍" }
];

const TodoList = ({ tasks, setTasks, setHasUnsavedChanges }) => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState(categories[0].label);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    setTasks(savedTasks);
  }, [setTasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if (setHasUnsavedChanges) setHasUnsavedChanges(true);
  }, [tasks, setHasUnsavedChanges]);

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setError("Task cannot be empty!");
      setTimeout(() => setError(""), 2000);
      return;
    }
    const newTasks = {
      ...tasks,
      [category]: [...(tasks[category] || []), { text: task, completed: false }]
    };
    setTasks(newTasks);
    setTask("");
  };

  const markTaskAsDone = (cat, index) => {
    const updatedTasks = tasks[cat].map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks({ ...tasks, [cat]: updatedTasks });
  };

  const removeTask = (cat, index) => {
    const filteredTasks = tasks[cat].filter((_, i) => i !== index);
    setTasks({ ...tasks, [cat]: filteredTasks });
  };

  return (
    <div className="todo-container">
      <h2>My Tasks</h2>
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
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
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="task-grid">
        {categories.map((cat) => (
          <div key={cat.label} className="task-column">
            <h3>
              {cat.emoji} {cat.label}
            </h3>
            <ul className="task-list">
              {(tasks[cat.label] || []).map((t, index) => (
                <li
                  key={index}
                  className={`task-item ${t.completed ? "completed" : ""}`}
                >
                  <span className="task-text">{t.text}</span>
                  <div className="task-actions">
                    <button
                      className="done-btn"
                      onClick={() => markTaskAsDone(cat.label, index)}
                    >
                      {t.completed ? "✔" : "✅"}
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeTask(cat.label, index)}
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;



