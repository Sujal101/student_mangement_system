const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration — use the exact origin shown in your browser console
const corsOptions = {
    origin: [
        'https://sujal101.github.io',
        'http://localhost:5500'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// IMPORTANT: CORS must run before your API routes
app.use(cors(corsOptions));

app.use(express.json());

// Test route
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
