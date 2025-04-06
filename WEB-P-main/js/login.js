// Login Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const spinner = document.getElementById('spinner');

    // Password visibility toggle
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Form validation
    function validateUsername() {
        const username = usernameInput.value.trim();
        
        if (username.length === 0) {
            usernameError.textContent = 'Username is required';
            usernameInput.style.borderColor = '#e63946';
            return false;
        } else if (username.length < 5) {
            usernameError.textContent = 'Username must be at least 5 characters';
            usernameInput.style.borderColor = '#e63946';
            return false;
        } else {
            usernameError.textContent = '';
            usernameInput.style.borderColor = '#2a9d8f';
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (password.length === 0) {
            passwordError.textContent = 'Password is required';
            passwordInput.style.borderColor = '#e63946';
            return false;
        }
        
        passwordError.textContent = '';
        passwordInput.style.borderColor = '#2a9d8f';
        return true;
    }

    // Enable/disable login button based on validation
    function checkFormValidity() {
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        
        if (loginBtn) {
            loginBtn.disabled = !(isUsernameValid && isPasswordValid);
        }
    }

    if (usernameInput && passwordInput) {
        usernameInput.addEventListener('input', checkFormValidity);
        passwordInput.addEventListener('input', checkFormValidity);
    }

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateUsername() || !validatePassword()) {
                return;
            }
            
            // Simulate login process
            if (loginBtn && loginText && spinner) {
                loginBtn.disabled = true;
                loginText.classList.add('hidden');
                spinner.style.display = 'block';
                
                setTimeout(() => {
                    spinner.style.display = 'none';
                    loginText.classList.remove('hidden');
                    loginBtn.disabled = false;
                    
                    // For demo purposes - replace with actual login logic
                    alert('Login successful! Redirecting to dashboard...');
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        });
    }

    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Redirecting to Google authentication...');
            // window.location.href = '/auth/google';
        });
    }
    
    if (githubBtn) {
        githubBtn.addEventListener('click', function() {
            alert('Redirecting to GitHub authentication...');
            // window.location.href = '/auth/github';
        });
    }
});