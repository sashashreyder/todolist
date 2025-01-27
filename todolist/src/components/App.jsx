import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import RegistrationForm from './components/RegistrationForm';
import TodoList from './components/TodoList';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = () => {
    setIsRegistered(true);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <Sidebar />
        {!isRegistered ? (
          <RegistrationForm onRegister={handleRegistration} />
        ) : (
          <TodoList />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;

