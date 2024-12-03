const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
  const { fullName, email, location, role, status } = req.body;
  try {
    const user = new User({ fullName, email, location, role, status });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('role');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a user
router.put('/:id', async (req, res) => {
  const { fullName, email, location, role, status } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, location, role, status },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    // Find the user by ID and delete it
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
