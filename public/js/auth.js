document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://student-management-system-q148.onrender.com';

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // LOGIN
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (errorMessage) errorMessage.textContent = '';

            try {
                const response = await fetch(`${API_URL}/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || data.message || 'Login failed');
                }

                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';

            } catch (err) {
                if (errorMessage) {
                    errorMessage.textContent = err.message;
                }
            }
        });
    }

    // REGISTER
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (errorMessage) errorMessage.textContent = '';
            if (successMessage) successMessage.textContent = '';

            try {
                const response = await fetch(`${API_URL}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || data.message || 'Registration failed');
                }

                if (successMessage) {
                    successMessage.textContent =
                        'Registration successful! Redirecting to login...';
                }

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (err) {
                if (errorMessage) {
                    errorMessage.textContent = err.message;
                }
            }
        });
    }
});
