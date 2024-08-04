// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import TravelAdminDashboard from './TravelAdminDashboard';
import './App.css';

function Navbar() {
  const location = useLocation();
  const isBackButtonVisible = location.pathname !== '/';

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {isBackButtonVisible && (
          <button className="back-button" onClick={() => window.history.back()}>
            Back
          </button>
        )}
      </div>
      <div className="navbar-center">
        <span className="navbar-title">TRAVELDESK</span>
      </div>
      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About Us</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="center-container">
      <Link to="/login" className="login-register-link">
        Login
      </Link>
      <Link to="/register" className="login-register-link">
        Register
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/manager" element={<ManagerDashboard />} />
          <Route path="/dashboard/travel-admin" element={<TravelAdminDashboard />} />
          {/* Add placeholder routes for Contact and About Us */}
          <Route path="/contact" element={<div className="dashboard">Contact Page</div>} />
          <Route path="/about" element={<div className="dashboard">About Us Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
