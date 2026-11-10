const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        'https://sujal101.github.io',
        'http://localhost:5500'
    ]
}));

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Student Management System API is running...');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
