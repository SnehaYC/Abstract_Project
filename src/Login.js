// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      formErrors.password = 'Password cannot be empty.';
    }
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
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
          setErrors({ general: 'Please enter the correct Email & Password' });
        }
        setLoading(false);
      }, 1000);
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

  return (
    <div className="form-container">
      <h1>Login</h1>
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
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {errors.general && <div className="error-message">{errors.general}</div>}
      </form>
    </div>
  );
}

export default Login;
