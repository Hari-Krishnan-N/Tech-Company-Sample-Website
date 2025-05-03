
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const emailInput = document.getElementById('emailInput');
            const passwordInput = document.getElementById('passwordInput');
            
            let isValid = true;
            
            // Email validation
            if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError(emailInput);
            }
            
            // Password validation
            if (!passwordInput.value.trim() || passwordInput.value.length < 6) {
                showError(passwordInput, 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError(passwordInput);
            }
            
            // If form is valid, simulate login (in a real app, would send to server)
            if (isValid) {
                // Add loading state to button
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Signing In...';
                submitBtn.disabled = true;
                
                // Simulate server request
                setTimeout(() => {
                    // In a real application, this would be replaced with actual authentication logic
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
        
        // Password Toggle Functionality
        const passwordToggle = document.querySelector('.password-toggle');
        if (passwordToggle) {
            passwordToggle.addEventListener('click', function() {
                const passwordInput = document.getElementById('passwordInput');
                const icon = this.querySelector('i');
                
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    passwordInput.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            });
        }
        
        // Input animations on focus
        const formInputs = loginForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Remove focus effect
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
    
    // Helper Functions
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showError(input, message) {
        const formFloating = input.closest('.form-floating');
        
        // Create error message element if it doesn't exist
        let errorElement = formFloating.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-danger mt-1 small';
            formFloating.appendChild(errorElement);
        }
        
        // Set error message and add error class
        errorElement.textContent = message;
        input.classList.add('is-invalid');
        
        // Add shake animation
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }
    
    function clearError(input) {
        const formFloating = input.closest('.form-floating');
        const errorElement = formFloating.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        input.classList.remove('is-invalid');
    }
    
    // Background animation effect
    const loginBgElement = document.querySelector('.login-bg-element');
    if (loginBgElement) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            const xOffset = (x - 0.5) * 20;
            const yOffset = (y - 0.5) * 20;
            
            loginBgElement.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    }
});