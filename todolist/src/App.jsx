import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import RegistrationForm from './components/RegistrationForm';
import TodoList from './components/TodoList';
import RegisterModal from './components/RegisterModal';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

  useEffect(() => {
    if (hasUnsavedChanges) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Do you really want to leave?';
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [hasUnsavedChanges]);

  return (
    <div className="app-container">
      <Header onShowRegister={handleShowRegisterModal} />
      <div className="main-content">
        <Sidebar />
        {!isRegistered ? (
          <div>
            <p className="try-notice">
              You're trying the app as a guest. Register to save your lists!
            </p>
            <TodoList setHasUnsavedChanges={setHasUnsavedChanges} />
          </div>
        ) : (
          <TodoList setHasUnsavedChanges={setHasUnsavedChanges} />
        )}
      </div>
      {showRegisterModal && (
        <RegisterModal onClose={handleCloseRegisterModal} onRegister={handleRegistration} />
      )}
      <Footer />
    </div>
  );
}

export default App;

