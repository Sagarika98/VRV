const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: { type: [String], required: true }, // e.g., ['read', 'write', 'delete']
});

module.exports = mongoose.model('Role', RoleSchema);
