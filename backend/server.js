const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get("/", ( req, res) => {
  res.json("Hello");
});
// Routes
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
