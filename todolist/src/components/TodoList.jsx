import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; 
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import "../design/TodoList.css";

const categories = [
  { label: "Personal", emoji: "💼" },
  { label: "Work", emoji: "🚀" },
  { label: "Shopping", emoji: "🛍️" },
  { label: "Health", emoji: "🏃" }
];

const TodoList = ({ setHasUnsavedChanges }) => {
  const getStoredVisibility = () => {
    const savedVisibility = localStorage.getItem("collapsedCategories");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  };

  const [tasks, setTasks] = useState({});
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

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const taskList = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!taskList[data.category]) {
          taskList[data.category] = [];
        }
        taskList[data.category].push({ id: doc.id, text: data.text, completed: data.completed });
      });
      setTasks(taskList);
    };

    fetchTasks();
  }, []);

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

  const addTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setError("Task cannot be empty!");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const newTask = { text: task, completed: false, category };
    const docRef = await addDoc(collection(db, "tasks"), newTask);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [...(prevTasks[category] || []), { id: docRef.id, ...newTask }]
    }));

    setTask("");
  };

  const markTaskAsDone = async (cat, index) => {
    const taskToUpdate = tasks[cat][index];
    await updateDoc(doc(db, "tasks", taskToUpdate.id), { completed: !taskToUpdate.completed });

    setTasks((prevTasks) => ({
      ...prevTasks,
      [cat]: prevTasks[cat].map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  const removeTask = async (cat, index) => {
    const taskToDelete = tasks[cat][index];
    await deleteDoc(doc(db, "tasks", taskToDelete.id));

    setTasks((prevTasks) => ({
      ...prevTasks,
      [cat]: prevTasks[cat].filter((_, i) => i !== index)
    }));
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
                  <li key={t.id} className={`task-item ${t.completed ? "completed" : ""}`}>
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














