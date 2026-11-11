const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: 'https://sujal101.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.send('Student Management System API is running...');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
