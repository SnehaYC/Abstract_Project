// src/ManagerDashboard.js
import React, { useState } from 'react';
import './ManagerDashboard.css';

function ManagerDashboard() {
  const [requests, setRequests] = useState([
    // Example data; replace with actual data fetch logic
    { id: 1, employeeName: 'John Doe', projectName: 'Project X', status: 'Pending' },
    { id: 2, employeeName: 'Jane Smith', projectName: 'Project Y', status: 'Pending' },
  ]);

  const handleRequestAction = (id, action, comment) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: action, comment } : req
    ));
    // Add logic to send status update to the backend
  };

  return (
    <div className="manager-dashboard">
      <h2>Manager Dashboard</h2>
      <h3>Pending Requests</h3>
      <ul>
        {requests.map(request => (
          <li key={request.id}>
            {request.employeeName} - {request.projectName} - {request.status}
            <div>
              <button onClick={() => handleRequestAction(request.id, 'Approved', 'Looks good!')}>Approve</button>
              <button onClick={() => handleRequestAction(request.id, 'Disapproved', 'Need more info')}>Disapprove</button>
              <button onClick={() => handleRequestAction(request.id, 'Returned', 'Please update the details')}>Return</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerDashboard;
