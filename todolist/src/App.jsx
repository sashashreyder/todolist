import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
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

  const handleMarkAllDone = () => {
    setTasks(tasks.map((task) => ({ ...task, completed: true })));
  };

  const handleClearAll = () => {
    setTasks([]);
  };

  useEffect(() => {
    if (hasUnsavedChanges && !showRegisterModal) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Do you really want to leave?';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [hasUnsavedChanges, showRegisterModal]);

  return (
    <div className="app-container">
      <Header onShowRegister={handleShowRegisterModal} />
      <div className="main-content">
        <Sidebar 
          tasks={tasks} 
          onMarkAllDone={handleMarkAllDone} 
          onClearAll={handleClearAll} 
          onShowRegister={handleShowRegisterModal} 
        />
        {!isRegistered ? (
          <div>
            <p className="try-notice">
              You're trying the app as a guest. Register to save your lists!
            </p>
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
      <Footer />
    </div>
  );
}

export default App;




