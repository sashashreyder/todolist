import React, { useState } from "react";
import "../design/TodoList.css";

const categories = [
  { label: "Study", emoji: "🎓" },
  { label: "Fitness", emoji: "🏋️‍♂️" },
  { label: "Shopping", emoji: "🛒" },
  { label: "Work", emoji: "📅" },
  { label: "Personal", emoji: "🌟" },
];

const TodoList = ({ setHasUnsavedChanges }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState(categories[0].label);
  const [error, setError] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setError("Task cannot be empty!");
      setTimeout(() => setError(""), 2000);
      return;
    }
    setTasks([...tasks, { text: task, category, completed: false }]);
    setTask("");
    if (setHasUnsavedChanges) setHasUnsavedChanges(true);
  };

  const markTaskAsDone = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    if (setHasUnsavedChanges) setHasUnsavedChanges(true);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    if (setHasUnsavedChanges) setHasUnsavedChanges(true);
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
          {categories.map((cat, index) => (
            <option key={index} value={cat.label}>
              {cat.emoji} {cat.label}
            </option>
          ))}
        </select>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className={`task-item ${t.completed ? "completed" : ""}`}>
            <span className="task-emoji">
              {categories.find((cat) => cat.label === t.category)?.emoji}
            </span>
            <span className="task-text">{t.text}</span>
            <div className="task-actions">
              <button className="done-btn" onClick={() => markTaskAsDone(index)}>
                {t.completed ? "✅" : "✔"}
              </button>
              <button className="remove-btn" onClick={() => removeTask(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;






