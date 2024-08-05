// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email address.';
    }
    if (!validatePassword(password)) {
      formErrors.password = 'Password must be at least 6 characters long.';
    }
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userExists = users.some((user) => user.email === email);

      if (userExists) {
        setErrors({ email: 'User already exists' });
        return;
      }

      users.push({ email, password, role });
      localStorage.setItem('users', JSON.stringify(users));
      setSuccessMessage('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  const checkEmail = (e) => {
    const lowercasedEmail = e.target.value.toLowerCase();
    setEmail(lowercasedEmail);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setRole('Employee');
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={checkEmail}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address."
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            minLength="6"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <label>Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="HR Travel Admin">HR Travel Admin</option>
          </select>
        </label>
        <button type="submit">Register</button>
        <button type="button" onClick={handleClear} className="clear-button">Clear</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
}

export default Register;
