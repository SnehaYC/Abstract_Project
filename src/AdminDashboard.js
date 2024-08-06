// src/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const UserForm = ({ onSubmit, user, handleInputChange, buttonText, onClose }) => (
  <form
    className="user-form"
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <input
      type="email"
      value={user.email}
      onChange={(e) => handleInputChange(e, 'email')}
      placeholder="Email"
      required
    />
    <input
      type="text"
      value={user.firstName}
      onChange={(e) => handleInputChange(e, 'firstName')}
      placeholder="First Name"
      required
    />
    <input
      type="text"
      value={user.lastName}
      onChange={(e) => handleInputChange(e, 'lastName')}
      placeholder="Last Name"
      required
    />
    <input
      type="text"
      value={user.department}
      onChange={(e) => handleInputChange(e, 'department')}
      placeholder="Department"
    />
    <input
      type="text"
      value={user.managerName}
      onChange={(e) => handleInputChange(e, 'managerName')}
      placeholder="Manager Name"
    />
    <input
      type="text"
      value={user.role}
      onChange={(e) => handleInputChange(e, 'role')}
      placeholder="Role"
      required
    />
    <button type="submit" className="submit-button">{buttonText}</button>
    {onClose && (
      <button type="button" className="close-button" onClick={onClose}>
        &times;
      </button>
    )}
  </form>
);

const UserTable = ({ users, startEditingUser, deleteUser, assignRole, roleToAssign, setRoleToAssign, onEditClick }) => (
  <table className="user-table">
    <thead>
      <tr>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Department</th>
        <th>Manager Name</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.email}>
          <td>{user.email}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.department}</td>
          <td>{user.managerName}</td>
          <td>{user.role}</td>
          <td>
            <button className="edit-button" onClick={() => startEditingUser(user)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => deleteUser(user.email)}>
              Delete
            </button>
            <input
              type="text"
              value={roleToAssign}
              onChange={(e) => setRoleToAssign(e.target.value)}
              placeholder="New Role"
            />
            <button className="assign-role-button" onClick={() => assignRole(user.email)}>
              Assign Role
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', role: '', firstName: '', lastName: '', department: '', managerName: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [roleToAssign, setRoleToAssign] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(users);
  }, []);

  const addUser = () => {
    if (!newUser.email || !newUser.role) return;
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUser({ email: '', role: '', firstName: '', lastName: '', department: '', managerName: '' });
  };

  const deleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const startEditingUser = (user) => {
    setEditingUser(user);
    setShowEditForm(true);
  };

  const saveEdit = () => {
    const updatedUsers = users.map((user) => (user.email === editingUser.email ? editingUser : user));
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
    setShowEditForm(false);
  };

  const handleInputChange = (e, field) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [field]: e.target.value });
    } else {
      setNewUser({ ...newUser, [field]: e.target.value });
    }
  };

  const assignRole = (email) => {
    const updatedUsers = users.map((user) => (user.email === email ? { ...user, role: roleToAssign } : user));
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setRoleToAssign('');
  };

  const closeEditForm = () => {
    setEditingUser(null);
    setShowEditForm(false);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-options">
        <h3>Add User</h3>
        <UserForm onSubmit={addUser} user={newUser} handleInputChange={handleInputChange} buttonText="Add User" />
      </div>

      <div className="dashboard-options">
        <h3>User Grid</h3>
        <UserTable
          users={users}
          startEditingUser={startEditingUser}
          deleteUser={deleteUser}
          assignRole={assignRole}
          roleToAssign={roleToAssign}
          setRoleToAssign={setRoleToAssign}
        />
      </div>

      {showEditForm && (
        <div className="dashboard-options edit-form">
          <h3>Edit User</h3>
          <UserForm onSubmit={saveEdit} user={editingUser} handleInputChange={handleInputChange} buttonText="Save" onClose={closeEditForm} />
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
