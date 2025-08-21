// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader handling
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Add Portfolio Header and Footer functionality
    initPortfolioHeader();
    initPortfolioFooter();
    
    // Original portfolio.js functionality continues below
    // Header Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Manually toggle the checkbox since we're handling the click on the label
            if (menuToggle) {
                menuToggle.checked = !menuToggle.checked;
            }
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links li a').forEach(item => {
        item.addEventListener('click', function() {
            if (menuToggle) {
                menuToggle.checked = false;
            }
        });
    });

    // Typing Animation
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const words = ['Web Developer', 'UI/UX Designer', 'Freelancer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    // Skills Animation
    const progressBars = document.querySelectorAll('.progress');
    
    function animateSkills() {
        progressBars.forEach(progress => {
            const width = progress.dataset.width;
            progress.style.width = '0';
            
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
        });
    }

    // Trigger skills animation when scrolling to the skills section
    const skillsSection = document.querySelector('#skills');
    
    function checkSkillsVisibility() {
        if (skillsSection) {
            const sectionPosition = skillsSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                animateSkills();
                window.removeEventListener('scroll', checkSkillsVisibility);
            }
        }
    }

    window.addEventListener('scroll', checkSkillsVisibility);
    checkSkillsVisibility(); // Check on page load

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.portfolio-filter li');
    const portfolioItems = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => {
                btn.classList.remove('filter-active');
            });
            
            // Add active class to current button
            this.classList.add('filter-active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio Modal
    const modalLinks = document.querySelectorAll('.view-project');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // Open modal
    modalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal
    modalCloses.forEach(close => {
        close.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Enable scrolling
            }
        });
    });

    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.testimonial-nav .prev');
    const nextButton = document.querySelector('.testimonial-nav .next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialItems.forEach((item, i) => {
            item.style.display = 'none';
        });
        
        testimonialItems[index].style.display = 'block';
    }
    
    if (testimonialItems.length > 0) {
        showSlide(currentSlide);
        
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
                showSlide(currentSlide);
            });
            
            nextButton.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % testimonialItems.length;
                showSlide(currentSlide);
            });
        }
        
        // Auto slide
        let slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonialItems.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Pause auto slide when hovering
        document.querySelector('.testimonials-slider').addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        document.querySelector('.testimonials-slider').addEventListener('mouseleave', function() {
            slideInterval = setInterval(function() {
                currentSlide = (currentSlide + 1) % testimonialItems.length;
                showSlide(currentSlide);
            }, 5000);
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Name validation
            const name = document.getElementById('name');
            const nameError = name.nextElementSibling;
            
            if (name.value.trim() === '') {
                nameError.textContent = 'Please enter your name';
                isValid = false;
            } else {
                nameError.textContent = '';
            }
            
            // Email validation
            const email = document.getElementById('email');
            const emailError = email.nextElementSibling;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email.value.trim() === '') {
                emailError.textContent = 'Please enter your email';
                isValid = false;
            } else if (!emailPattern.test(email.value)) {
                emailError.textContent = 'Please enter a valid email';
                isValid = false;
            } else {
                emailError.textContent = '';
            }
            
            // Subject validation
            const subject = document.getElementById('subject');
            const subjectError = subject.nextElementSibling;
            
            if (subject.value.trim() === '') {
                subjectError.textContent = 'Please enter a subject';
                isValid = false;
            } else {
                subjectError.textContent = '';
            }
            
            // Message validation
            const message = document.getElementById('message');
            const messageError = message.nextElementSibling;
            
            if (message.value.trim() === '') {
                messageError.textContent = 'Please enter your message';
                isValid = false;
            } else {
                messageError.textContent = '';
            }
            
            // Form submission
            if (isValid) {
                const formMessage = document.querySelector('.form-message');
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                
                // Reset form after successful submission
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
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

    // Animate Process Steps on Scroll
    const processSteps = document.querySelectorAll('.process-step');
    
    function animateProcessSteps() {
        processSteps.forEach((step, index) => {
            const stepPosition = step.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (stepPosition < screenPosition) {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }
    
    // Initial CSS for process steps
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateProcessSteps);
    animateProcessSteps(); // Check on page load

    // Hero Section Animation
    const heroShapes = document.querySelectorAll('.hero-shapes .shape');
    
    heroShapes.forEach(shape => {
        const randomX = Math.random() * 30 - 15;
        const randomY = Math.random() * 30 - 15;
        
        shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    // Smooth Scroll to Sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
});

/**
 * Initialize Portfolio Header functionality
 */
function initPortfolioHeader() {
    // Portfolio Header Scroll Effect
    const portfolioHeader = document.querySelector('.portfolio-header');
    if (portfolioHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                portfolioHeader.classList.add('scrolled');
            } else {
                portfolioHeader.classList.remove('scrolled');
            }
        });
    }

    // Portfolio Mobile Menu Toggle
    const portfolioMenuToggle = document.querySelector('.portfolio-menu-toggle');
    const portfolioNavMenu = document.querySelector('.portfolio-nav-menu');
    
    if (portfolioMenuToggle && portfolioNavMenu) {
        portfolioMenuToggle.addEventListener('click', function() {
            portfolioNavMenu.classList.toggle('active');
            portfolioMenuToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const portfolioNavLinks = document.querySelectorAll('.portfolio-nav-list li a');
        portfolioNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                portfolioNavMenu.classList.remove('active');
                portfolioMenuToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!portfolioMenuToggle.contains(e.target) && 
                !portfolioNavMenu.contains(e.target) && 
                portfolioNavMenu.classList.contains('active')) {
                portfolioNavMenu.classList.remove('active');
                portfolioMenuToggle.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize Portfolio Footer functionality
 */
function initPortfolioFooter() {
    // Back to Top Button
    const portfolioBackToTop = document.querySelector('.portfolio-back-to-top');
    
    if (portfolioBackToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                portfolioBackToTop.classList.add('active');
            } else {
                portfolioBackToTop.classList.remove('active');
            }
        });
        
        portfolioBackToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Auto Update Copyright Year
    const portfolioCopyrightYear = document.querySelector('.portfolio-copyright-year');
    if (portfolioCopyrightYear) {
        portfolioCopyrightYear.textContent = new Date().getFullYear();
    }
} 