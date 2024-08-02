// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import EmployeeDashboard from './EmployeeDashboard';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import TravelAdminDashboard from './TravelAdminDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/manager" element={<ManagerDashboard />} />
          <Route path="/dashboard/travel-admin" element={<TravelAdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
