const express = require('express');
const router = express.Router();
const { getAllStudents, addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const verifyToken = require('../middleware/authMiddleware');

// Protect all student routes with verifyToken middleware
router.get('/', verifyToken, getAllStudents);
router.post('/', verifyToken, addStudent);
router.put('/:id', verifyToken, updateStudent);
router.delete('/:id', verifyToken, deleteStudent);

module.exports = router;