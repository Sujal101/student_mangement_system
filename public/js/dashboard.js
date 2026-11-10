document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'https://student-management-system-q148.onrender.com';

    const token = localStorage.getItem('token');

    // Check login
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');
    const logoutBtn = document.getElementById('logoutBtn');

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });
    }

    // Fetch students
    const fetchStudents = async () => {
        try {
            const response = await fetch(`${API_URL}/api/students`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                window.location.href = 'index.html';
                return;
            }

            if (!response.ok) {
                throw new Error('Unable to load students');
            }

            const students = await response.json();

            studentTableBody.innerHTML = '';

            if (students.length === 0) {
                studentTableBody.innerHTML =
                    '<tr><td colspan="5">No students found.</td></tr>';
                return;
            }

            students.forEach(student => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.course}</td>
                    <td>
                        <button class="btn-delete"
                        onclick="deleteStudent(${student.id})">
                        Delete
                        </button>
                    </td>
                `;

                studentTableBody.appendChild(tr);
            });

        } catch (err) {
            console.error('Error fetching students:', err);
            alert(err.message);
        }
    };

    // Add student
    if (studentForm) {
        studentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const course = document.getElementById('course').value.trim();

            try {
                const response = await fetch(`${API_URL}/api/students`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ name, email, course })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                        errorData.error || errorData.message ||
                        'Failed to add student'
                    );
                }

                studentForm.reset();
                await fetchStudents();

            } catch (err) {
                alert(err.message);
            }
        });
    }

    // Delete student
    window.deleteStudent = async (id) => {

        if (!confirm('Are you sure you want to delete this student?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/students/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete student');
            }

            await fetchStudents();

        } catch (err) {
            alert(err.message);
        }
    };

    // Initial load
    fetchStudents();

});
