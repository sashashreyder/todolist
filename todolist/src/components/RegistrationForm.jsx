import React, { useState } from "react";
import "../design/RegistrationForm.css";

const RegistrationForm = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onRegister();
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Register to Save Your Lists</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
        />
      </div>

      <button type="submit" className="submit-btn">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;



