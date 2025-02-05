import React, { useState } from "react";
import "./design/App.css";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [tasks, setTasks] = useState({});

  const handleRegistration = () => {
    setIsRegistered(true);
  };

  return (
    <div className="app-container">
      <Header onRegister={handleRegistration} isRegistered={isRegistered} />
      <div className="main-content">
        <TodoList
          tasks={tasks}
          setTasks={setTasks}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      </div>
    </div>
  );
}

export default App;














