// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    // Elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll('.about-text, .about-image, .highlight-point, .service-card, .service-card-dark');
    
    elementsToAnimate.forEach(element => {
        if (isInViewport(element)) {
            if (!element.classList.contains('animated')) {
                element.classList.add('animated');
                
                // Restart the animation
                element.style.animation = 'none';
                element.offsetHeight; // Trigger reflow
                element.style.animation = null;
            }
        }
    });
}

// Create floating particles for services-dark section background
function createParticles() {
    const particlesContainer = document.querySelector('.services-dark-bg');
    if (!particlesContainer) return;
    
    // Clear any existing particles
    const existingParticles = document.querySelectorAll('.particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create new particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positions
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Set styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite alternate;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize on page load
function init() {
    handleScrollAnimations();
    createParticles();
}

// Add event listeners
window.addEventListener('load', init);
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('resize', () => {
    handleScrollAnimations();
    createParticles();
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing components
    setupFloatingLabels();
    setupFormValidation();
    setupSmoothScroll();
    setupTestimonialsSlider();
    setupBackToTop();
    updateCopyrightYear();
    
    // Initialize new components
    // Testimonial slider has been replaced with a grid, so we don't need this anymore
    // initIndexTestimonialSlider();
});

// Function to set up floating labels
function setupFloatingLabels() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add placeholder to make :not(:placeholder-shown) selector work
        input.setAttribute('placeholder', ' ');
        
        // Check if there's value on load
        if (input.value !== '') {
            input.classList.add('has-value');
        }
        
        // Check on input change
        input.addEventListener('input', function() {
            if (this.value !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

// Function to set up form validation
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Reset error states
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('error'));
        
        // Validate fields
        let isValid = true;
        
        // Name validation
        if (fullName.value.trim() === '') {
            showError(fullName, 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        if (email.value.trim() === '') {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }
        
        // Subject validation
        if (subject.value.trim() === '') {
            showError(subject, 'Please enter a subject');
            isValid = false;
        }
        
        // Message validation
        if (message.value.trim() === '') {
            showError(message, 'Please enter your message');
            isValid = false;
        }
        
        // If valid, simulate form submission
        if (isValid) {
            // Show success message (you could modify this to submit the form via AJAX)
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate sending - replace with actual form submission logic
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitButton.classList.add('success');
                
                // Reset form after submission
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('success');
                }, 3000);
            }, 1500);
        }
    });
}

// Helper function to show error message
function showError(field, message) {
    const formGroup = field.parentElement;
    formGroup.classList.add('error');
    
    // Create error message element if it doesn't exist
    let errorMsg = formGroup.querySelector('.error-message');
    if (!errorMsg) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        formGroup.appendChild(errorMsg);
    }
    
    errorMsg.textContent = message;
}

// Helper function to validate email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to set up smooth scrolling
function setupSmoothScroll() {
    const ctaButton = document.querySelector('.cta-button');
    const contactSection = document.getElementById('contact');
    
    if (ctaButton && contactSection) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            contactSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Also set up smooth scrolling for all navbar links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Testimonials Slider Functionality
function setupTestimonialsSlider() {
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    if (!testimonialsTrack || testimonialCards.length === 0) return;
    
    let currentIndex = 0;
    let slideWidth = 0;
    let autoSlideInterval;
    const cardCount = testimonialCards.length;
    
    // Calculate how many cards to show based on viewport width
    function calculateSlidesPerView() {
        if (window.innerWidth >= 1024) {
            return 3; // Show 3 cards on desktop
        } else if (window.innerWidth >= 768) {
            return 2; // Show 2 cards on tablet
        } else {
            return 1; // Show 1 card on mobile
        }
    }
    
    // Initialize slider dimensions
    function initSlider() {
        const slidesPerView = calculateSlidesPerView();
        const containerWidth = testimonialsTrack.parentElement.clientWidth;
        slideWidth = containerWidth / slidesPerView;
        
        // Set width for each card
        testimonialCards.forEach(card => {
            card.style.minWidth = `${slideWidth - 32}px`; // Accounting for margins
        });
        
        // Position track to current slide
        goToSlide(currentIndex);
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) {
            index = 0;
        } else if (index > cardCount - calculateSlidesPerView()) {
            index = cardCount - calculateSlidesPerView();
        }
        
        currentIndex = index;
        testimonialsTrack.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Next slide function
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Previous slide function
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Start auto-sliding
    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        autoSlideInterval = setInterval(() => {
            if (currentIndex < cardCount - calculateSlidesPerView()) {
                nextSlide();
            } else {
                goToSlide(0); // Loop back to first slide
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    // Stop auto-sliding
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Initialize slider
    initSlider();
    startAutoSlide();
    
    // Event Listeners
    window.addEventListener('resize', () => {
        initSlider();
    });
    
    // Navigation arrows
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Reset timer after manual navigation
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Reset timer after manual navigation
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Reset timer after manual navigation
        });
    });
    
    // Pause on hover
    testimonialsTrack.addEventListener('mouseenter', stopAutoSlide);
    testimonialsTrack.addEventListener('mouseleave', startAutoSlide);
}

// Set up Back to Top button functionality
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update copyright year automatically
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
} 