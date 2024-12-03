const express = require('express');
const router = express.Router();
const Role = require('../models/role');

// Create a new role
router.post('/', async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const role = new Role({ name, permissions });
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a role
router.put('/:id', async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, permissions },
      { new: true }
    );
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    // Find the role by ID and delete it
    const role = await Role.findByIdAndDelete(req.params.id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json({ message: 'Role deleted successfully', role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
