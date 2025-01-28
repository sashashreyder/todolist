import React, { useState } from 'react';
import "../design/TodoList.css";

const TodoList = ({ setHasUnsavedChanges }) => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) {
      setError('Task cannot be empty!');
      return;
    }
    setTasks([...tasks, { text: task, completed: false }]);
    setTask('');
    setError('');
    if (setHasUnsavedChanges) setHasUnsavedChanges(true); // Mark progress as unsaved
  };

  const toggleComplete = (index) => {
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

  const clearTasks = () => {
    setTasks([]);
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
        <button type="submit">Add</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className={`task-item ${t.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleComplete(index)}>{t.text}</span>
            <button className="remove-btn" onClick={() => removeTask(index)}>
              ✖
            </button>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <button className="clear-btn" onClick={clearTasks}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default TodoList;

