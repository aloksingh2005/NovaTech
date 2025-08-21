document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const charCount = document.getElementById('charCount');
    const messageField = document.getElementById('message');
    
    // Error hint elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    const consentError = document.getElementById('consentError');
    
    // Character counter for message
    messageField.addEventListener('input', function() {
        charCount.textContent = this.value.length;
        if (this.value.length > 450) {
            charCount.classList.add('warning');
        } else {
            charCount.classList.remove('warning');
        }
    });
    
    // Form input animation for filled state
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
        
        // Check on load for pre-filled inputs (like on form resubmission)
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        }
    });
    
    // Validation functions
    function validateName(name) {
        return name.trim().length >= 2;
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validatePhone(phone) {
        if (phone.trim() === '') return true; // Phone is optional
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return re.test(String(phone).trim());
    }
    
    function validateSubject(subject) {
        return subject !== null && subject !== '';
    }
    
    function validateMessage(message) {
        return message.trim().length >= 10;
    }
    
    function validateConsent(consent) {
        return consent;
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const consent = document.getElementById('consent').checked;
        
        // Initialize validation status
        let isValid = true;
        
        // Reset all error states
        formInputs.forEach(input => input.classList.remove('error'));
        const errorHints = document.querySelectorAll('.error-hint');
        errorHints.forEach(hint => hint.classList.remove('visible'));
        
        // Validate each field
        if (!validateName(name)) {
            document.getElementById('name').classList.add('error');
            nameError.classList.add('visible');
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            document.getElementById('email').classList.add('error');
            emailError.classList.add('visible');
            isValid = false;
        }
        
        if (!validatePhone(phone)) {
            document.getElementById('phone').classList.add('error');
            phoneError.classList.add('visible');
            isValid = false;
        }
        
        if (!validateSubject(subject)) {
            document.getElementById('subject').classList.add('error');
            subjectError.classList.add('visible');
            isValid = false;
        }
        
        if (!validateMessage(message)) {
            document.getElementById('message').classList.add('error');
            messageError.classList.add('visible');
            isValid = false;
        }
        
        if (!validateConsent(consent)) {
            document.getElementById('consent').parentElement.classList.add('error');
            consentError.classList.add('visible');
            isValid = false;
        }
        
        // If validation passes, simulate form submission
        if (isValid) {
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');
            
            // Simulate API call
            setTimeout(function() {
                // Simulate successful submission (in a real app, this would be an actual API call)
                const success = Math.random() > 0.2; // 80% success rate for demo
                
                submitBtn.classList.remove('loading');
                
                if (success) {
                    // Success case
                    formMessage.textContent = 'Your message has been sent successfully! We will get back to you soon.';
                    formMessage.classList.add('success');
                    contactForm.reset();
                    formInputs.forEach(input => input.classList.remove('filled'));
                    charCount.textContent = '0';
                } else {
                    // Error case
                    formMessage.textContent = 'Something went wrong. Please try again later.';
                    formMessage.classList.add('error');
                    submitBtn.disabled = false;
                }
                
                // Scroll to the message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 2000);
        } else {
            // Scroll to the first error
            const firstError = document.querySelector('.form-control.error') || 
                              document.querySelector('.consent-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Apply shake animation to the first error field
                firstError.classList.add('shake');
                setTimeout(() => firstError.classList.remove('shake'), 500);
            }
        }
    });
}); 