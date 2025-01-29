import React, { useState } from 'react';
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

  return (
    <div className="app-container">
      <Header onShowRegister={handleShowRegisterModal} />
      <div className="main-content">
        <Sidebar onShowRegister={handleShowRegisterModal} />
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











