// src/TravelAdminDashboard.js
import React, { useState, useEffect } from 'react';

function TravelAdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    setRequests(storedRequests);
  }, []);

  const handleAction = (requestId, action, comment) => {
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        request.status = action;
        request.comment = comment;
      }
      return request;
    });
    setRequests(updatedRequests);
    localStorage.setItem('requests', JSON.stringify(updatedRequests));
  };

  return (
    <div>
      <h2>HR Travel Admin Dashboard</h2>
      {/* Display all requests */}
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => handleAction(request.id, 'Booked', 'Booking completed')}>Book</button>
                <button onClick={() => handleAction(request.id, 'Returned to Manager', 'Needs manager review')}>Return to Manager</button>
                <button onClick={() => handleAction(request.id, 'Returned to Employee', 'Needs more info from employee')}>Return to Employee</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TravelAdminDashboard;
