import React, { useEffect, useState } from 'react';
import { fetchRoles, createRole, updateRole, deleteRole } from '../services/api';
import './RoleManagement.css';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: '' });
  const [editMode, setEditMode] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false); // Form visibility state

  // Fetch roles on component mount
  useEffect(() => {
    const getData = async () => {
      const { data } = await fetchRoles();
      setRoles(data);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setNewRole({ ...newRole, [e.target.name]: e.target.value });
  };
  
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateRole(editingRoleId, { ...newRole, permissions: newRole.permissions.split(',') });
    } else {
      await createRole({ ...newRole, permissions: newRole.permissions.split(',') });
    }
    const { data } = await fetchRoles();
    setRoles(data);
    setEditMode(false);
    setEditingRoleId(null);
    setShowForm(false);
    setNewRole({ name: '', permissions: '' });
  };

  const handleEdit = (role) => {
    setEditMode(true);
    setEditingRoleId(role._id);
    setNewRole({ name: role.name, permissions: role.permissions.join(',') });
    setShowForm(true); // Show the form when editing
  };

  const handleAddNewRole = () => {
    setEditMode(false);
    setEditingRoleId(null);
    setNewRole({ name: '', permissions: '' });
    setShowForm(true); // Show the form when adding a new role
  };

  const handleDelete = async (roleId) => {
    await deleteRole(roleId);
    const { data } = await fetchRoles();
    setRoles(data);
  };

  const resetForm = () => {
    setEditMode(false);
    setEditingRoleId(null);

    setShowForm(false); // Close the form
  };


  const filteredUsers = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="role-management">
      <h1>Role Management</h1>

      <div className="table-container">
        <div className="table-header">
          <input
            type="text"
            placeholder="Search Roles"
            className="search-bar"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn add-role-btn" onClick={handleAddNewRole}>
            + New Role
          </button>
        </div>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((role) => (
              <tr key={role._id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(', ')}</td>
                <td>
                  <button className="btn edit-btn" onClick={() => handleEdit(role)}>
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(role._id)}
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
        <form className="role-form" onSubmit={handleSubmit}>
          <h2>{editMode ? 'Edit Role' : 'Add New Role'}</h2>
          <input
            type="text"
            name="name"
            placeholder="Role Name"
            value={newRole.name}
            onChange={handleChange}
            required
          />
          
          <input
            type="text"
            name="permissions"
            placeholder="Permissions (comma-separated)"
            value={newRole.permissions}
            onChange={handleChange}
          />
          <button type="submit" className="btn submit-btn">
            {editMode ? 'Update' : 'Add'} Role
          </button>
          <button type="button" className="btn cancel-btn" onClick={resetForm}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default RoleManagement;
