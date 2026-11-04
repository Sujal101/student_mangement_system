const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);         // Handles login and registration
app.use('/api/students', studentRoutes);   // Handles protected student CRUD operations

// Basic Test Route
app.get('/', (req, res) => {
    res.send('Student Management System API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});