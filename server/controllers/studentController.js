const pool = require('../config/db');

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error while fetching students' });
    }
};

// Add a new student
const addStudent = async (req, res) => {
    const { name, email, course } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO students (name, email, course) VALUES ($1, $2, $3) RETURNING *',
            [name, email, course]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error while adding student' });
    }
};

// Update student
const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, course } = req.body;
    try {
        const result = await pool.query(
            'UPDATE students SET name = $1, email = $2, course = $3 WHERE id = $4 RETURNING *',
            [name, email, course, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error while updating student' });
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error while deleting student' });
    }
};

module.exports = { getAllStudents, addStudent, updateStudent, deleteStudent };