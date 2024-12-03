import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchUsers = () => API.get('/users');
export const createUser = (data) => API.post('/users', data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`)

export const fetchRoles = () => API.get('/roles');
export const createRole = (data) => API.post('/roles', data);
export const updateRole = (id, data) => API.put(`/roles/${id}`, data);
export const deleteRole = (id) => API.delete(`/roles/${id}`)
