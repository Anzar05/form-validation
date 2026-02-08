// Form Validation Script
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('jobApplicationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const contactLink = document.getElementById('contactLink');
    
    // Validation patterns
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^\d{10}$/
    };
    
    // Helper functions to show error/success states
    function showError(inputElement, errorElement, validationIcon, message) {
        inputElement.classList.remove('success');
        inputElement.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        validationIcon.className = 'validation-icon error-icon fas fa-times-circle';
    }
    
    function showSuccess(inputElement, validationIcon) {
        inputElement.classList.remove('error');
        inputElement.classList.add('success');
        validationIcon.className = 'validation-icon success-icon fas fa-check-circle';
    }
    
    function resetField(inputElement) {
        const errorElement = inputElement.parentNode.parentNode.querySelector('.error-message');
        const validationIcon = inputElement.parentNode.querySelector('.validation-icon');
        
        inputElement.classList.remove('success', 'error');
        errorElement.style.display = 'none';
        validationIcon.className = 'validation-icon';
    }
    
    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        const nameError = document.getElementById('nameError');
        const validationIcon = nameInput.parentNode.querySelector('.validation-icon');
        
        if (nameValue.length < 2) {
            showError(nameInput, nameError, validationIcon, "Please enter your full name (minimum 2 characters)");
            return false;
        } else {
            showSuccess(nameInput, validationIcon);
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailError = document.getElementById('emailError');
        const validationIcon = emailInput.parentNode.querySelector('.validation-icon');
        
        if (!patterns.email.test(emailValue)) {
            showError(emailInput, emailError, validationIcon, "Please enter a valid email address");
            return false;
        } else {
            showSuccess(emailInput, validationIcon);
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        const phoneError = document.getElementById('phoneError');
        const validationIcon = phoneInput.parentNode.querySelector('.validation-icon');
        
        // Remove any non-digit characters for validation
        const digitsOnly = phoneValue.replace(/\D/g, '');
        
        if (!patterns.phone.test(digitsOnly)) {
            showError(phoneInput, phoneError, validationIcon, "Please enter a valid 10-digit phone number");
            return false;
        } else {
            showSuccess(phoneInput, validationIcon);
            phoneError.style.display = 'none';
            return true;
        }
    }
    
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        const messageError = document.getElementById('messageError');
        const validationIcon = messageInput.parentNode.querySelector('.validation-icon');
        
        if (messageValue.length < 20) {
            showError(messageInput, messageError, validationIcon, "Please enter a message (minimum 20 characters)");
            return false;
        } else {
            showSuccess(messageInput, validationIcon);
            messageError.style.display = 'none';
            return true;
        }
    }
    
    // Real-time validation on input
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    messageInput.addEventListener('input', validateMessage);
    
    // Format phone number as user types
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as (XXX) XXX-XXXX
        if (value.length > 0) {
            value = '(' + value;
        }
        if (value.length > 4) {
            value = value.substring(0, 4) + ') ' + value.substring(4);
        }
        if (value.length > 9) {
            value = value.substring(0, 9) + '-' + value.substring(9);
        }
        if (value.length > 14) {
            value = value.substring(0, 14);
        }
        
        e.target.value = value;
    });
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();
        
        // If all validations pass
        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            // Show loading state on button
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Submitting...';
            
            // Simulate API call with setTimeout (in real app, this would be a fetch/AJAX call)
            setTimeout(function() {
                // Show success message
                successMessage.style.display = 'block';
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
                
                // In a real application, you would send the form data to a server here
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    message: messageInput.value.trim(),
                    timestamp: new Date().toISOString()
                };
                
                console.log('Form submitted successfully!');
                console.log('Form Data:', formData);
                
                // Reset form after 3 seconds
                setTimeout(function() {
                    form.reset();
                    successMessage.style.display = 'none';
                    
                    // Remove all validation styles
                    const inputs = form.querySelectorAll('input, textarea');
                    inputs.forEach(input => {
                        resetField(input);
                    });
                }, 3000);
            }, 1500);
        } else {
            // If validation fails, scroll to first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    // Contact link handler
    contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('In a real application, this would link to a contact page or open a contact modal.');
    });
    
    // Clear validation on form reset
    form.addEventListener('reset', function() {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            resetField(input);
        });
        successMessage.style.display = 'none';
    });
    
    // Add a reset button dynamically for demo purposes
    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.id = 'resetBtn';
    resetButton.className = 'reset-btn';
    resetButton.innerHTML = '<i class="fas fa-redo"></i> Reset Form';
    resetButton.style.cssText = `
        display: block;
        width: 100%;
        padding: 12px;
        background: #95a5a6;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 10px;
    `;
    
    resetButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#7f8c8d';
        this.style.transform = 'translateY(-1px)';
    });
    
    resetButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#95a5a6';
        this.style.transform = 'translateY(0)';
    });
    
    resetButton.addEventListener('click', function() {
        form.reset();
    });
    
    submitBtn.parentNode.insertBefore(resetButton, submitBtn.nextSibling);
});