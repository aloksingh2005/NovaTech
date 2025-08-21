/**
 * Services Page JavaScript
 * All functionality needed for the services page, including those previously in script.js
 */

// Wait for DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const preloader = document.querySelector('.services-preloader');
    const header = document.querySelector('.services-header');
    const menuToggle = document.querySelector('.services-menu-toggle');
    const mobileMenu = document.querySelector('.services-mobile-menu');
    const menuClose = document.querySelector('.services-menu-close');
    const processSteps = document.querySelectorAll('.services-process-step');
    const backToTop = document.querySelector('.services-back-to-top');
    const sliderContainer = document.querySelector('.services-slider-container');
    const prevBtn = document.querySelector('.services-prev-btn');
    const nextBtn = document.querySelector('.services-next-btn');
    const testimonialCards = document.querySelectorAll('.services-testimonial-card');
    const sliderDots = document.querySelector('.services-slider-dots');
    
    // Force left alignment for hero section on desktop
    function updateHeroAlignment() {
        const heroText = document.querySelector('.services-hero-text');
        const windowWidth = window.innerWidth;
        
        if (windowWidth > 992) {
            // Desktop view - ensure left alignment
            heroText.style.textAlign = 'left';
            document.querySelectorAll('.services-hero-text *').forEach(el => {
                if (el.classList.contains('services-hero-stats') || 
                    el.classList.contains('services-hero-buttons')) {
                    el.style.justifyContent = 'flex-start';
                }
            });
        } else {
            // Mobile view - center alignment
            heroText.style.textAlign = 'center';
            document.querySelectorAll('.services-hero-text *').forEach(el => {
                if (el.classList.contains('services-hero-stats') || 
                    el.classList.contains('services-hero-buttons')) {
                    el.style.justifyContent = 'center';
                }
            });
        }
    }
    
    // Call on load and resize
    updateHeroAlignment();
    window.addEventListener('resize', updateHeroAlignment);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
        
        // Re-check alignment after complete load
        updateHeroAlignment();
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Animate process steps on scroll
        processSteps.forEach(step => {
            const stepTop = step.getBoundingClientRect().top;
            if (stepTop < window.innerHeight - 100) {
                step.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
        });
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    }
    
    // Testimonial slider functionality
    if (sliderContainer && prevBtn && nextBtn) {
        // Create dots for the slider
        if (sliderDots && testimonialCards.length > 0) {
            testimonialCards.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('services-dot');
                if (index === 0) dot.classList.add('active');
                dot.dataset.index = index;
                sliderDots.appendChild(dot);
                
                dot.addEventListener('click', () => {
                    scrollToSlide(index);
                    updateActiveDot(index);
                });
            });
        }
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            const scrollAmount = sliderContainer.offsetWidth / 2;
            sliderContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            
            // Update active dot
            setTimeout(() => {
                const index = Math.round(sliderContainer.scrollLeft / (sliderContainer.scrollWidth / testimonialCards.length));
                updateActiveDot(Math.min(index, testimonialCards.length - 1));
            }, 500);
        });
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            const scrollAmount = sliderContainer.offsetWidth / 2;
            sliderContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            
            // Update active dot
            setTimeout(() => {
                const index = Math.round(sliderContainer.scrollLeft / (sliderContainer.scrollWidth / testimonialCards.length));
                updateActiveDot(Math.max(index, 0));
            }, 500);
        });
        
        // Scroll to a specific slide
        function scrollToSlide(index) {
            const slideWidth = sliderContainer.scrollWidth / testimonialCards.length;
            sliderContainer.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
        }
        
        // Update active dot
        function updateActiveDot(activeIndex) {
            const dots = document.querySelectorAll('.services-dot');
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Listen for scroll events on the slider
        sliderContainer.addEventListener('scroll', () => {
            clearTimeout(sliderContainer.scrollEndTimer);
            sliderContainer.scrollEndTimer = setTimeout(() => {
                const index = Math.round(sliderContainer.scrollLeft / (sliderContainer.scrollWidth / testimonialCards.length));
                updateActiveDot(index);
            }, 100);
        });
    }
    
    // Back to top button functionality
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Service card animations on scroll
    const serviceCards = document.querySelectorAll('.services-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.services-stat-number');
    let statsAnimated = false;
    
    // Function to animate counting
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 16ms is approx one frame
        
        function updateCount() {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                return;
            }
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCount);
        }
        
        updateCount();
    }
    
    // Check if stats are in view and start animation
    function checkStatsInView() {
        if (statsAnimated || !statNumbers.length) return;
        
        const statsSection = document.querySelector('.services-hero-stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            statsAnimated = true;
            
            statNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-count'));
                animateCounter(number, target, 2000); // 2 seconds duration
            });
        }
    }
    
    // Check on initial load and scroll
    checkStatsInView();
    window.addEventListener('scroll', checkStatsInView);
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.services-faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.services-faq-question');
        
        question.addEventListener('click', () => {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active before, make it active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Pricing toggle functionality
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyLabel = document.querySelector('.services-toggle-monthly');
    const yearlyLabel = document.querySelector('.services-toggle-yearly');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Yearly pricing
                document.body.classList.add('yearly-pricing');
                monthlyLabel.classList.remove('active');
                yearlyLabel.classList.add('active');
            } else {
                // Monthly pricing
                document.body.classList.remove('yearly-pricing');
                yearlyLabel.classList.remove('active');
                monthlyLabel.classList.add('active');
            }
        });
        
        // Toggle when clicking on labels
        monthlyLabel.addEventListener('click', function() {
            pricingToggle.checked = false;
            pricingToggle.dispatchEvent(new Event('change'));
        });
        
        yearlyLabel.addEventListener('click', function() {
            pricingToggle.checked = true;
            pricingToggle.dispatchEvent(new Event('change'));
        });
    }
});

/**
 * Process Steps Animation on Scroll
 * Animates each process step when it comes into view
 */
function initProcessAnimation() {
    const processSteps = document.querySelectorAll('.process-step');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    processObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.2,
            rootMargin: '0px'
        });
        
        processSteps.forEach(step => {
            processObserver.observe(step);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        processSteps.forEach(step => {
            step.style.opacity = '1';
        });
    }
}

/**
 * Enhanced Premium Service Block Effects
 * Adds subtle hover and animation effects to premium service blocks
 */
function initPremiumServiceBlocks() {
    const serviceBlocks = document.querySelectorAll('.premium-service-block');
    
    // Apply staggered entrance animation on load
    serviceBlocks.forEach((block, index) => {
        block.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add enhanced hover effects
    serviceBlocks.forEach(block => {
        // Subtle cursor-following effect
        block.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            // Create subtle shadow effect
            const shadowIntensity = 20;
            const shadowX = (x - 0.5) * shadowIntensity;
            const shadowY = (y - 0.5) * shadowIntensity;
            
            this.style.boxShadow = `
                0 15px 35px rgba(0, 0, 0, 0.05),
                ${shadowX}px ${shadowY}px 30px rgba(77, 97, 252, 0.07)
            `;
            
            // Add subtle icon movement
            const icon = this.querySelector('.service-icon');
            if (icon) {
                const iconMoveIntensity = 4;
                const iconX = (x - 0.5) * iconMoveIntensity;
                const iconY = (y - 0.5) * iconMoveIntensity;
                
                icon.style.transform = `translate(${iconX}px, ${iconY}px)`;
            }
        });
        
        // Reset effects on mouse leave
        block.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

/**
 * Scroll Events
 * Handles various scroll-based animations and effects
 */
function setupScrollEvents() {
    // Animate hero section elements on page load
    const heroSection = document.querySelector('.services-hero-content');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroSection.style.transition = 'all 0.8s ease-out';
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add animation for section headers
    const sectionHeaders = document.querySelectorAll('.section-header-alt');
    if (sectionHeaders.length && 'IntersectionObserver' in window) {
        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const header = entry.target;
                    const badge = header.querySelector('.section-badge');
                    const title = header.querySelector('h2');
                    const text = header.querySelector('p');
                    
                    if (badge) {
                        badge.style.animation = 'fadeInUp 0.6s ease-out forwards';
                        badge.style.opacity = '0';
                        badge.style.transform = 'translateY(20px)';
                    }
                    
                    if (title) {
                        title.style.animation = 'fadeInUp 0.6s ease-out 0.2s forwards';
                        title.style.opacity = '0';
                        title.style.transform = 'translateY(20px)';
                    }
                    
                    if (text) {
                        text.style.animation = 'fadeInUp 0.6s ease-out 0.4s forwards';
                        text.style.opacity = '0';
                        text.style.transform = 'translateY(20px)';
                    }
                    
                    headerObserver.unobserve(header);
                }
            });
        }, {
            root: null,
            threshold: 0.2,
            rootMargin: '0px'
        });
        
        sectionHeaders.forEach(header => {
            headerObserver.observe(header);
        });
    }
    
    // Add intersection observer for premium service blocks
    const premiumBlocks = document.querySelectorAll('.premium-service-block');
    
    if (premiumBlocks.length && 'IntersectionObserver' in window) {
        const blockObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    blockObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        premiumBlocks.forEach(block => {
            blockObserver.observe(block);
        });
    }
    
    // Animate CTA section when scrolled into view
    const ctaSection = document.querySelector('.cta-content');
    if (ctaSection && 'IntersectionObserver' in window) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Restart animation
                    ctaSection.style.animation = 'none';
                    ctaSection.offsetHeight; // Trigger reflow
                    ctaSection.style.animation = 'ctaFadeIn 0.8s ease-out forwards';
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.3,
            rootMargin: '0px'
        });
        
        ctaObserver.observe(ctaSection);
    }
}

/**
 * Initialize Floating Social Icons
 * Animates the social icons to fade in sequentially
 */
function initSocialIcons() {
    const socialIcons = document.querySelectorAll('.floating-social .social-icon');
    
    if (socialIcons.length > 0) {
        socialIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.1 + 0.5}s`;
        });
    }
}

/**
 * Testimonial Slider Functionality
 * Handles the testimonial slider navigation and interactions
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider || cards.length === 0) return;
    
    let currentIndex = 0;
    const cardCount = cards.length;
    
    // Set up autoplay
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 seconds
    
    // Function to go to a specific slide
    function goToSlide(index) {
        // Make sure index is within bounds
        if (index < 0) index = 0;
        if (index >= cardCount) index = cardCount - 1;
        
        currentIndex = index;
        
        const card = cards[index];
        
        // Scroll to the card with smooth behavior
        card.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Next slide function
    function nextSlide() {
        goToSlide((currentIndex + 1) % cardCount);
    }
    
    // Previous slide function
    function prevSlide() {
        goToSlide((currentIndex - 1 + cardCount) % cardCount);
    }
    
    // Start autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    
    // Stop autoplay
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    // Add event listeners
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });
    
    // Add event listeners to slider
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    
    // Touch events for swipe on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left, go to next slide
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right, go to previous slide
            prevSlide();
        }
    }
    
    // Initialize slider and start autoplay
    goToSlide(0);
    startAutoplay();
    
    // Setup IntersectionObserver to animate cards when they come into view
    if ('IntersectionObserver' in window) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.2,
            rootMargin: '0px'
        });
        
        cards.forEach(card => {
            cardObserver.observe(card);
        });
    }
}

/**
 * Function to set up smooth scrolling
 * Enables smooth scrolling to anchor links
 */
function setupSmoothScroll() {
    const ctaButton = document.querySelector('.cta-button');
    
    // Set up smooth scrolling for all navbar links
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

/**
 * Set up Back to Top button functionality
 */
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

/**
 * Update copyright year automatically
 */
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
} 