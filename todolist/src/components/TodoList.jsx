import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Confetti from "react-confetti";
import "../design/TodoList.css";

const categories = [
  { label: "Personal", emoji: "💼", color: "#ff914d" },
  { label: "Work", emoji: "🚀", color: "#1f3b73" },
  { label: "Shopping", emoji: "🛍️", color: "#ffcc00" },
  { label: "Health", emoji: "🏃", color: "#16a085" },
  { label: "Hobbies", emoji: "🎨", color: "#9b59b6" },
  { label: "Finance", emoji: "💰", color: "#f39c12" },
  { label: "Family", emoji: "👨‍👩‍👧‍👦", color: "#e67e22" }
];

const priorities = [
  { label: "Low", color: "#27ae60" },
  { label: "Medium", color: "#f1c40f" },
  { label: "High", color: "#e74c3c" }
];

const TodoList = ({ setHasUnsavedChanges }) => {
  const getStoredVisibility = () => {
    const savedVisibility = localStorage.getItem("collapsedCategories");
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  };

  const [tasks, setTasks] = useState({});
  const [collapsed, setCollapsed] = useState(() => {
    const stored = getStoredVisibility();
    return categories.reduce((acc, category) => {
      acc[category.label] = stored[category.label] ?? false;
      return acc;
    }, {});
  });

  const [taskText, setTaskText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0].label);
  const [selectedPriority, setSelectedPriority] = useState(priorities[0].label);
  const [error, setError] = useState("");
  const [confettiActive, setConfettiActive] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const loadedTasks = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!loadedTasks[data.category]) {
          loadedTasks[data.category] = [];
        }
        loadedTasks[data.category].push({
          id: doc.id,
          text: data.text,
          completed: data.completed,
          priority: data.priority
        });
      });
      setTasks(loadedTasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("collapsedCategories", JSON.stringify(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (category) => {
    setCollapsed((prev) => {
      const updatedState = { ...prev, [category]: !prev[category] };
      localStorage.setItem("collapsedCategories", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) {
      setError("Task cannot be empty!");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const newTask = {
      text: taskText,
      completed: false,
      category: selectedCategory,
      priority: selectedPriority
    };

    const docRef = await addDoc(collection(db, "tasks"), newTask);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [selectedCategory]: [...(prevTasks[selectedCategory] || []), { id: docRef.id, ...newTask }]
    }));

    setTaskText("");
  };

  const toggleTaskCompletion = async (category, index) => {
    const taskToUpdate = tasks[category][index];
    await updateDoc(doc(db, "tasks", taskToUpdate.id), { completed: !taskToUpdate.completed });

    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    }));

    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 5000);
  };

  const deleteTask = async (category, index) => {
    const taskToDelete = tasks[category][index];
    await deleteDoc(doc(db, "tasks", taskToDelete.id));

    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: prevTasks[category].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="todo-container">
      {confettiActive && <Confetti width={windowSize.width} height={windowSize.height} />}

      <form className="task-form" onSubmit={addTask}>
        <input type="text" placeholder="Add a new task..." value={taskText} onChange={(e) => setTaskText(e.target.value)} className="task-input" />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="category-select">
          {categories.map((category) => (
            <option key={category.label} value={category.label}>
              {category.emoji} {category.label}
            </option>
          ))}
        </select>
        <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} className="priority-select">
          {priorities.map((priority) => (
            <option key={priority.label} value={priority.label}>
              {priority.label}
            </option>
          ))}
        </select>
        <button type="submit" className="add-btn">➕ Add</button>
      </form>

      <div className="task-grid">
        {Object.entries(tasks)
          .filter(([_, taskList]) => taskList.length > 0)
          .map(([category, taskList]) => (
            <div key={category} className="task-column" data-category={category}>
              <h3 onClick={() => toggleCategory(category)} className="category-title">
                {categories.find((c) => c.label === category)?.emoji} {category}
                <span className="toggle-icon">{collapsed[category] ? "➕" : "➖"}</span>
              </h3>
              {!collapsed[category] && (
                <ul className="task-list">
                  {taskList.map((task, index) => (
                    <li key={task.id} className={`task-item ${task.completed ? "completed" : ""}`} data-priority={task.priority}>
                      <span className="task-text">{task.text}</span>
                      <div className="task-actions">
                        <button className="done-btn" onClick={() => toggleTaskCompletion(category, index)}>
                          {task.completed ? "✔️" : "✅"}
                        </button>
                        <button className="remove-btn" onClick={() => deleteTask(category, index)}>
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

















