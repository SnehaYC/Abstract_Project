// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      alert('User already exists');
      return;
    }
    // Save new user
    users.push({ email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful');
    navigate('/login');
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
      </form>
    </div>
  );
}

export default Register;
