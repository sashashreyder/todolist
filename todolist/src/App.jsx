import React, { useState } from 'react';
import "./design/App.css";
import Header from './components/Header';
import TodoList from './components/TodoList';
import RegisterModal from './components/RegisterModal';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleRegistration = () => {
    setIsRegistered(true);
    setShowRegisterModal(false);
  };

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <div className="app-container">
      <Header onShowRegister={handleShowRegisterModal} isRegistered={isRegistered} />
      <div className="main-content">
        {!isRegistered ? (
          <div>
            <TodoList
              tasks={tasks}
              setTasks={setTasks}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          </div>
        ) : (
          <TodoList
            tasks={tasks}
            setTasks={setTasks}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
        )}
      </div>
      {showRegisterModal && (
        <RegisterModal
          onClose={handleCloseRegisterModal}
          onRegister={handleRegistration}
        />
      )}
    </div>
  );
}

export default App;











