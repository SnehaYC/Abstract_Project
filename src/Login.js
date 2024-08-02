// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case 'Admin':
          navigate('/dashboard/admin');
          break;
        case 'HR Travel Admin':
          navigate('/dashboard/travel-admin');
          break;
        case 'Manager':
          navigate('/dashboard/manager');
          break;
        case 'Employee':
          navigate('/dashboard/employee');
          break;
        default:
          navigate('/login');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
