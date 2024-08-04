// src/ManagerDashboard.js

import React, { useState, useEffect } from 'react';
import './ManagerDashboard.css';

function ManagerDashboard() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    setRequests(storedRequests);
  }, []);

  const handleRequestAction = (id, action) => {
    if (!comment) {
      alert('Comments cannot be left blank.');
      return;
    }

    const updatedRequests = requests.map(req => 
      req.id === id ? { ...req, status: action, comments: comment } : req
    );
    
    setRequests(updatedRequests);
    localStorage.setItem('travelRequests', JSON.stringify(updatedRequests));
    sendNotification(id, action);

    // Reset comment and selected request
    setSelectedRequest(null);
    setComment('');
  };

  const sendNotification = (id, action) => {
    console.log(`Notification: Request ID ${id} has been ${action}.`);
    // Integrate your notification logic here
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
              <button onClick={() => setSelectedRequest(request.id)}>Select</button>
            </div>
            {selectedRequest === request.id && (
              <div className="action-section">
                <textarea 
                  placeholder="Enter comments"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={() => handleRequestAction(request.id, 'Approved')}>Approve</button>
                <button onClick={() => handleRequestAction(request.id, 'Disapproved')}>Disapprove</button>
                <button onClick={() => handleRequestAction(request.id, 'Returned')}>Return</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManagerDashboard;
