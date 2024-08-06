// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [managerId, setManagerId] = useState('');
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

  const validateMobileNum = (mobileNum) => {
    const mobileRegex = /^[0-9]{10}$/; // Assuming a 10-digit mobile number
    return mobileRegex.test(mobileNum);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email address.';
    }
    if (!validatePassword(password)) {
      formErrors.password = 'Password must be at least 6 characters long.';
    }
    if (!validateMobileNum(mobileNum)) {
      formErrors.mobileNum = 'Please enter a valid mobile number (10 digits).';
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post('https://localhost:7041/api/User', {
          firstName,
          lastName,
          address,
          email,
          mobileNum,
          password,
          role,
          managerId,
        });

        if (response.status === 201) {
          setSuccessMessage('Registration successful!');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setErrors({ email: 'Registration failed. Please try again.' });
        }
      } catch (error) {
        console.error('There was an error!', error);
        setErrors({ email: 'Registration failed. Please try again.' });
      }
    }
  };

  const handleClear = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setAddress('');
    setMobileNum('');
    setManagerId('');
    setRole('Employee');
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address."
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>Mobile Number:
          <input
            type="text"
            value={mobileNum}
            onChange={(e) => setMobileNum(e.target.value)}
            pattern="[0-9]{10}"
            title="Please enter a valid mobile number (10 digits)."
            required
          />
          {errors.mobileNum && <span className="error">{errors.mobileNum}</span>}
        </label>
        <label>Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <label>Manager ID:
          <input
            type="text"
            value={managerId}
            onChange={(e) => setManagerId(e.target.value)}
          />
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
