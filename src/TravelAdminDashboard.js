// src/TravelAdminDashboard.js
import React, { useState, useEffect } from 'react';
import './TravelAdminDashboard.css';

function TravelAdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('travelRequests')) || [];
    setRequests(storedRequests);
  }, []);

  const handleAction = (requestId, action) => {
    if (!comment) {
      alert('Comments cannot be left blank.');
      return;
    }

    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        request.status = action;
        request.comment = comment;
        if (uploadFile) {
          request.documents = uploadFile;
        }
      }
      return request;
    });
    setRequests(updatedRequests);
    localStorage.setItem('travelRequests', JSON.stringify(updatedRequests));
    sendNotification(requestId, action);

    // Reset comment, selected request, and uploaded file
    setSelectedRequest(null);
    setComment('');
    setUploadFile(null);
  };

  const sendNotification = (id, action) => {
    console.log(`Notification: Request ID ${id} has been ${action}.`);
    // Integrate your notification logic here
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  return (
    <div className="travel-admin-dashboard">
      <h2>HR Travel Admin Dashboard</h2>
      <h3>All Travel Requests</h3>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Employee Name</th>
            <th>Project</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.employeeName}</td>
              <td>{request.projectName}</td>
              <td>{request.status}</td>
              <td>
                <button onClick={() => setSelectedRequest(request.id)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRequest && (
        <div className="action-section">
          <h3>Perform Action</h3>
          <textarea
            placeholder="Enter comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div>
            <label>
              Upload Documents:
              <input type="file" onChange={handleFileChange} />
            </label>
          </div>
          <button onClick={() => handleAction(selectedRequest, 'Booked')}>Book</button>
          <button onClick={() => handleAction(selectedRequest, 'Returned to Manager')}>Return to Manager</button>
          <button onClick={() => handleAction(selectedRequest, 'Returned to Employee')}>Return to Employee</button>
          <button onClick={() => handleAction(selectedRequest, 'Completed')}>Complete</button>
        </div>
      )}
    </div>
  );
}

export default TravelAdminDashboard;
