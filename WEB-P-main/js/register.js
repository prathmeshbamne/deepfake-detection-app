document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phone');
    const termsCheckbox = document.getElementById('terms');
    const registerBtn = document.getElementById('registerBtn');
    const togglePassword = document.getElementById('togglePassword');
    const confirmIcon = document.getElementById('confirmIcon');
    const strengthBar = document.querySelectorAll('.strength-bar .bar-segment');
    const strengthText = document.querySelector('.strength-text');
    
    // Password strength levels
    const strengthLevels = [
        { color: '#e63946', text: 'Weak' },
        { color: '#f4a261', text: 'Medium' },
        { color: '#2a9d8f', text: 'Strong' }
    ];
    
    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Also toggle confirm password visibility
    const toggleConfirmPassword = document.createElement('i');
    toggleConfirmPassword.className = 'fas fa-eye toggle-password';
    toggleConfirmPassword.style.position = 'absolute';
    toggleConfirmPassword.style.right = '15px';
    toggleConfirmPassword.style.cursor = 'pointer';
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
    confirmPasswordInput.parentNode.insertBefore(toggleConfirmPassword, confirmIcon);
    
    // Form validation functions
    function validateUsername() {
        const username = usernameInput.value.trim();
        const regex = /^[A-Za-z0-9]+$/;
        
        if (username.length === 0) {
            showError('username-error', 'Username is required');
            return false;
        } else if (username.length < 5) {
            showError('username-error', 'Username must be at least 5 characters');
            return false;
        } else if (!regex.test(username)) {
            showError('username-error', 'Only letters and numbers allowed');
            return false;
        } else {
            clearError('username-error');
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.length === 0) {
            showError('email-error', 'Email is required');
            return false;
        } else if (!regex.test(email)) {
            showError('email-error', 'Please enter a valid email');
            return false;
        } else {
            clearError('email-error');
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (password.length === 0) {
            showError('password-error', 'Password is required');
            updatePasswordStrength(0);
            return false;
        } else if (password.length < 8) {
            showError('password-error', 'Password must be at least 8 characters');
            updatePasswordStrength(0);
            return false;
        } else {
            let strength = 0;
            
            // Calculate strength (0-2)
            if (password.length >= 8) strength++;
            if ((hasUpperCase && hasNumber) || (hasUpperCase && hasSpecialChar) || (hasNumber && hasSpecialChar)) strength++;
            if (hasUpperCase && hasNumber && hasSpecialChar) strength++;
            
            updatePasswordStrength(strength);
            
            if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
                showError('password-error', 'Password must contain uppercase, number, and special character');
                return false;
            } else {
                clearError('password-error');
                return true;
            }
        }
    }
    
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword.length === 0) {
            showError('confirm-error', 'Please confirm your password');
            confirmIcon.classList.remove('valid');
            return false;
        } else if (password !== confirmPassword) {
            showError('confirm-error', 'Passwords do not match');
            confirmIcon.classList.remove('valid');
            return false;
        } else {
            clearError('confirm-error');
            confirmIcon.classList.add('valid');
            return true;
        }
    }
    
    function validatePhone() {
        const phone = phoneInput.value;
        const regex = /^\d{10}$/;
        
        if (phone.length === 0) {
            showError('phone-error', 'Phone number is required');
            return false;
        } else if (!regex.test(phone)) {
            showError('phone-error', 'Please enter a valid 10-digit phone number');
            return false;
        } else {
            clearError('phone-error');
            return true;
        }
    }
    
    function validateTerms() {
        if (!termsCheckbox.checked) {
            showError('terms-error', 'You must agree to the terms');
            return false;
        } else {
            clearError('terms-error');
            return true;
        }
    }
    
    // Update password strength indicator
    function updatePasswordStrength(strength) {
        // Ensure strength is between 0 and 2
        strength = Math.max(0, Math.min(strength, 2));
        
        strengthBar.forEach((bar, index) => {
            if (index <= strength) {
                bar.style.backgroundColor = strengthLevels[strength].color;
            } else {
                bar.style.backgroundColor = '#e0e0e0'; // Default light color
            }
        });
        
        strengthText.textContent = strengthLevels[strength].text;
        strengthText.style.color = strengthLevels[strength].color;
    }
    
    // Error handling
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function clearError(id) {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
    
    // Check form validity
    function checkFormValidity() {
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();
        const isPhoneValid = validatePhone();
        const isTermsValid = validateTerms();
        
        registerBtn.disabled = !(isUsernameValid && isEmailValid && isPasswordValid && 
                               isConfirmValid && isPhoneValid && isTermsValid);
    }
    
    // Event listeners for real-time validation
    usernameInput.addEventListener('input', function() {
        validateUsername();
        checkFormValidity();
    });
    
    emailInput.addEventListener('input', function() {
        validateEmail();
        checkFormValidity();
    });
    
    passwordInput.addEventListener('input', function() {
        validatePassword();
        validateConfirmPassword();
        checkFormValidity();
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        validateConfirmPassword();
        checkFormValidity();
    });
    
    phoneInput.addEventListener('input', function() {
        validatePhone();
        checkFormValidity();
    });
    
    termsCheckbox.addEventListener('change', function() {
        validateTerms();
        checkFormValidity();
    });
    
    // Form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateUsername() || !validateEmail() || !validatePassword() || 
                !validateConfirmPassword() || !validatePhone() || !validateTerms()) {
                return;
            }
            
            // Simulate registration process
            const registerText = document.getElementById('registerText');
            const spinner = document.getElementById('spinner');
            
            registerBtn.disabled = true;
            registerText.classList.add('hidden');
            spinner.style.display = 'block';
            
            // In a real application, this would be an AJAX call to your backend
            setTimeout(() => {
                spinner.style.display = 'none';
                registerText.classList.remove('hidden');
                registerBtn.disabled = false;
                
                // For demo purposes - replace with actual registration logic
                alert('Registration successful! Redirecting to login...');
                window.location.href = 'login.html';
            }, 1500);
        });
    }
    
    // Initialize form validation
    checkFormValidity();
});