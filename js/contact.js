/**
 * Contact Page JavaScript
 * Handles form validation, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    initPreloader();
    
    // Sticky Header
    initStickyHeader();
    
    // Mobile Menu
    initMobileMenu();
    
    // Form Validation
    initFormValidation();
    
    // Back to Top Button
    initBackToTop();
    
    // Smooth Scrolling
    initSmoothScroll();
    
    // Animation on scroll
    initScrollAnimation();
});

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    });
}

/**
 * Initialize sticky header on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (!menuToggle || !navbarMenu) return;
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navbarMenu.contains(e.target) && navbarMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navbarMenu.classList.remove('active');
        }
    });
}

/**
 * Initialize form validation 
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error messages
        removeAllErrors();
        
        // Get form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const privacyCheckbox = document.getElementById('privacy');
        
        // Validate form
        let isValid = true;
        
        // Name validation
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your full name');
            isValid = false;
        }
        
        // Email validation
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (optional)
        if (phoneInput.value.trim() && !isValidPhone(phoneInput.value.trim())) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Subject validation
        if (!subjectInput.value.trim()) {
            showError(subjectInput, 'Please enter a subject');
            isValid = false;
        }
        
        // Message validation
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Your message should be at least 10 characters');
            isValid = false;
        }
        
        // Privacy policy validation
        if (!privacyCheckbox.checked) {
            showError(privacyCheckbox, 'Please agree to the Privacy Policy and Terms of Service');
            isValid = false;
        }
        
        // If form is valid, submit it
        if (isValid) {
            // Disable submit button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual AJAX call in production)
            setTimeout(function() {
                // Show success message
                if (formResponse) {
                    formResponse.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                    formResponse.className = 'form-response success';
                    formResponse.style.display = 'block';
                }
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    if (formResponse) {
                        formResponse.style.display = 'none';
                    }
                }, 5000);
                
                // In a real application, you would send the data to your server:
                /*
                fetch('your-server-endpoint', {
                    method: 'POST',
                    body: new FormData(contactForm)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show success message and reset form
                    } else {
                        // Show error message
                    }
                })
                .catch(error => {
                    // Handle error
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                });
                */
            }, 1500);
        }
    });
}

/**
 * Show error message for a form field
 */
function showError(inputElement, message) {
    // Find the form group container
    const formGroup = inputElement.closest('.form-group');
    if (!formGroup) return;
    
    // Create error message element if it doesn't exist
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    // Add error styles and message
    if (inputElement.type === 'checkbox') {
        inputElement.parentElement.classList.add('has-error');
    } else {
        inputElement.parentElement.classList.add('has-error');
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '14px';
    errorElement.style.marginTop = '5px';
}

/**
 * Remove all error messages
 */
function removeAllErrors() {
    // Remove all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(el => {
        if (el) el.style.display = 'none';
    });
    
    // Remove error styles
    const errorInputs = document.querySelectorAll('.has-error');
    errorInputs.forEach(el => {
        if (el) el.classList.remove('has-error');
    });
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validate phone number format
 */
function isValidPhone(phone) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}

/**
 * Initialize back to top button functionality
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height to offset scroll position
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize animation on scroll
 */
function initScrollAnimation() {
    // Add reveal class to elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll('.hero-content, .hero-card, .section-header, .contact-form, .contact-info-card, .cta-box');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Initial check for elements in viewport
    checkReveal();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkReveal);
}

/**
 * Check and reveal elements when they enter the viewport
 */
function checkReveal() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('reveal-active');
        }
    });
}

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal-active {
    opacity: 1;
    transform: translateY(0);
}
.has-error input, .has-error textarea {
    border-color: #dc3545;
}
</style>
`);
