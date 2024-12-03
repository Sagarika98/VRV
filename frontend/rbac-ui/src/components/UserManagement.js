import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchRoles, createUser, updateUser, deleteUser } from '../services/api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    location: '',
    role: '',
    status: 'Active',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [showForm, setShowForm] = useState(false); // Form visibility state

  useEffect(() => {
    const getData = async () => {
      const { data: usersData } = await fetchUsers();
      const { data: rolesData } = await fetchRoles();
      setUsers(usersData);
      setRoles(rolesData);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateUser(editingUserId, newUser);
    } else {
      await createUser(newUser);
    }
    const { data: usersData } = await fetchUsers();
    setUsers(usersData);
    resetForm();
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditingUserId(user._id);
    setNewUser({
      fullName: user.fullName,
      email: user.email,
      location: user.location,
      role: user.role?._id || '',
      status: user.status,
    });
    setShowForm(true); // Open the form
  };

  const handleAddNewUser = () => {
    resetForm();
    setShowForm(true); // Open the form
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    const { data: usersData } = await fetchUsers();
    setUsers(usersData);
  };

  const resetForm = () => {
    setEditMode(false);
    setEditingUserId(null);
    setNewUser({ fullName: '', email: '', location: '', role: '', status: 'Active' });
    setShowForm(false); // Close the form
  };


  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="user-management">
      <h1>User Management</h1>

      <div className="table-container">
        <div className="table-header">
          <input
            type="text"
            placeholder="Search Users By Name"
            className="search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn add-user-btn" onClick={handleAddNewUser}>
            + New User
          </button>
        </div>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.location}</td>
                <td>
                  <span className={`badge badge-${user.role?.name.toLowerCase()}`}>
                    {user.role?.name}
                  </span>
                </td>
                <td>{new Date(user.joined).toLocaleDateString()}</td>
                <td>{user.status}</td>
                <td>
                  <button className="btn edit-btn" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <form className="user-form" onSubmit={handleSubmit}>
          <h2>{editMode ? 'Edit User' : 'Add New User'}</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={newUser.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newUser.location}
            onChange={handleChange}
          />
          <div className="form-group">
            
            <select name="role" value={newUser.role} onChange={handleChange} required className="styled-select">
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            
            <select name="status" value={newUser.status} onChange={handleChange} className="styled-select">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn submit-btn">
              {editMode ? 'Update' : 'Add'} User
            </button>
          
            <button type="button" className="btn cancel-btn" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserManagement;
