const { Pool } = require('pg');
require('dotenv').config(); // <-- This must be at the very top!

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: String(process.env.DB_PASSWORD || '123934'), // <-- Forces it to be a strict string
    database: process.env.DB_NAME || 'student_management',
    port: process.env.DB_PORT || 5432
});

module.exports = pool;