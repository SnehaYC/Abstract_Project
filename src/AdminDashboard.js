import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', role: '', firstName: '', lastName: '', department: '', managerName: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [roleToAssign, setRoleToAssign] = useState('');

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
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const startEditingUser = (user) => {
    setEditingUser(user);
  };

  const saveEdit = () => {
    const updatedUsers = users.map(user =>
      user.email === editingUser.email ? editingUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUser(null);
  };

  const handleInputChange = (e, field) => {
    if (editingUser) {
      setEditingUser({ ...editingUser, [field]: e.target.value });
    } else {
      setNewUser({ ...newUser, [field]: e.target.value });
    }
  };

  const assignRole = (email) => {
    const updatedUsers = users.map(user =>
      user.email === email ? { ...user, role: roleToAssign } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setRoleToAssign('');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <div className="dashboard-options">
        <h3>Add User</h3>
        <form className="user-form" onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => handleInputChange(e, 'email')}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={newUser.firstName}
            onChange={(e) => handleInputChange(e, 'firstName')}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={newUser.lastName}
            onChange={(e) => handleInputChange(e, 'lastName')}
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            value={newUser.department}
            onChange={(e) => handleInputChange(e, 'department')}
            placeholder="Department"
          />
          <input
            type="text"
            value={newUser.managerName}
            onChange={(e) => handleInputChange(e, 'managerName')}
            placeholder="Manager Name"
          />
          <input
            type="text"
            value={newUser.role}
            onChange={(e) => handleInputChange(e, 'role')}
            placeholder="Role"
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>

      <div className="dashboard-options">
        <h3>User Grid</h3>
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
            {users.map(user => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.department}</td>
                <td>{user.managerName}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit-button" onClick={() => startEditingUser(user)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteUser(user.email)}>Delete</button>
                  <button className="assign-role-button" onClick={() => assignRole(user.email)}>Assign Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Form */}
      {editingUser && (
        <div className="dashboard-options">
          <form className="edit-form" onSubmit={(e) => {
            e.preventDefault();
            saveEdit();
          }}>
            <h3>Edit User</h3>
            <input
              type="text"
              value={editingUser.firstName}
              onChange={(e) => handleInputChange(e, 'firstName')}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              value={editingUser.lastName}
              onChange={(e) => handleInputChange(e, 'lastName')}
              placeholder="Last Name"
              required
            />
            <input
              type="text"
              value={editingUser.department}
              onChange={(e) => handleInputChange(e, 'department')}
              placeholder="Department"
            />
            <input
              type="text"
              value={editingUser.managerName}
              onChange={(e) => handleInputChange(e, 'managerName')}
              placeholder="Manager Name"
            />
            <input
              type="text"
              value={editingUser.role}
              onChange={(e) => handleInputChange(e, 'role')}
              placeholder="Role"
              required
            />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
