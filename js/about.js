// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    initPreloader();
    
    // Initialize sticky header
    initStickyHeader();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize animated sections
    initAnimatedSections();
    
    // Initialize testimonial slider - disabled as we now use a grid
    // initTestimonialSlider();
    
    // Initialize counters
    initCounters();
    
    // Initialize back to top button
    initBackToTop();
    
    // Our Story Section Interactive Elements
    const milestones = document.querySelectorAll('.about-story-milestone');
    const progressIndicator = document.querySelector('.about-progress-indicator');
    const cards = document.querySelectorAll('.about-story-card');
    
    // Set first milestone as active
    if (milestones.length > 0) {
        milestones[0].classList.add('active');
    }
    
    // Add click event to milestones
    milestones.forEach(milestone => {
        milestone.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            const position = Array.from(milestones).indexOf(this);
            
            // Update progress bar
            if (progressIndicator) {
                progressIndicator.style.width = `${(position + 1) * 25}%`;
            }
            
            // Update active milestone
            milestones.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Highlight corresponding card
            cards.forEach(card => {
                if(card.getAttribute('data-year') === year) {
                    card.querySelector('.about-story-card-inner').style.transform = 'rotateY(180deg)';
                    setTimeout(() => {
                        card.querySelector('.about-story-card-inner').style.transform = 'rotateY(0deg)';
                    }, 2000);
                }
            });
        });
    });
    
    // Auto-rotate cards at interval if elements exist
    if (cards.length > 0 && milestones.length > 0) {
        let currentIndex = 0;
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            milestones[currentIndex].click();
        }, 5000);
    }
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.about-preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

// Sticky Header
function initStickyHeader() {
    const header = document.querySelector('.about-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.about-menu-toggle');
    const mobileMenu = document.querySelector('.about-mobile-menu');
    const menuClose = document.querySelector('.about-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.about-mobile-menu li a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }
}

// Animated Sections
function initAnimatedSections() {
    // Hero section animation
    const heroSection = document.querySelector('.about-hero-section');
    const heroText = document.querySelector('.about-hero-text');
    const heroImage = document.querySelector('.about-hero-image');
    
    if (heroSection && heroText && heroImage) {
        // Set initial states
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(30px)';
        heroText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'translateY(30px)';
        heroImage.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        
        // Animate after a short delay
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Mission section animation
    const missionSection = document.querySelector('.about-mission-section');
    const missionHeading = document.querySelector('.about-mission-heading');
    const missionContent = document.querySelector('.about-mission-content');
    const abstractGraphic = document.querySelector('.about-abstract-graphic');
    
    if (missionSection && missionHeading) {
        // Create observer for the mission section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate mission content
                    if (missionContent) {
                        missionContent.style.opacity = '1';
                        missionContent.style.transform = 'translateY(0)';
                    }
                    
                    // Animate heading highlight
                    const highlight = missionHeading.querySelector('.about-highlight');
                    if (highlight) {
                        highlight.style.backgroundSize = '200% auto';
                        highlight.style.animation = 'gradientShift 3s ease infinite';
                    }
                    
                    // Animate circles in the abstract graphic
                    if (abstractGraphic) {
                        const circles = abstractGraphic.querySelectorAll('.about-circle');
                        circles.forEach(circle => {
                            circle.style.opacity = '0.3';
                            circle.style.animation = 'float 10s ease-in-out infinite';
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Set initial states
        if (missionContent) {
            missionContent.style.opacity = '0';
            missionContent.style.transform = 'translateY(30px)';
            missionContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        // Start observing
        observer.observe(missionSection);
    }
    
    // Story timeline animation
    const storySection = document.querySelector('.about-story-section');
    const timelineItems = document.querySelectorAll('.about-timeline-item');
    
    if (storySection && timelineItems.length > 0) {
        // Create observer for the story section
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 300 * index);
                });
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 });
        
        // Set initial states
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Start observing
        observer.observe(storySection);
    }
    
    // Team cards animation
    const teamSection = document.querySelector('.about-team-section');
    const teamCards = document.querySelectorAll('.about-team-card');
    
    if (teamSection && teamCards.length > 0) {
        // Create observer for the team section
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                teamCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 200 * index);
                });
                observer.unobserve(entries[0].target);
            }
    }, { threshold: 0.1 });

        // Set initial states
        teamCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Start observing
        observer.observe(teamSection);
    }
    
    // Features animation
    const featureSection = document.querySelector('.about-why-choose-section');
    const featureCards = document.querySelectorAll('.about-feature-card');
    
    if (featureSection && featureCards.length > 0) {
        // Create observer for the feature section
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                featureCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 150 * index);
                });
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.1 });
        
        // Set initial states
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Start observing
        observer.observe(featureSection);
    }
    
    // Process cards animation
    const processSection = document.querySelector('.about-process-section');
    const processCards = document.querySelectorAll('.about-process-card');
    
    if (processSection && processCards.length > 0) {
        // Create observer for the process section
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                processCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 200 * index);
                });
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.1 });
        
        // Set initial states
        processCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        });
        
        // Start observing
        observer.observe(processSection);
    }
    
    // Add keyframes for additional animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.about-testimonial-slider');
    if (!slider) return;
    
    const container = slider.querySelector('.about-slider-container');
    const cards = slider.querySelectorAll('.about-testimonial-card');
    const dotsContainer = slider.querySelector('.about-slider-dots');
    const prevBtn = slider.querySelector('.about-prev-btn');
    const nextBtn = slider.querySelector('.about-next-btn');
    
    if (!container || cards.length === 0) return;
    
    let currentIndex = 0;
    let slideWidth = 0;
    
    // Function to calculate slide width
    function calculateSlideWidth() {
        if (cards.length === 0) return;
        
        const card = cards[0];
        const cardStyle = getComputedStyle(card);
        const width = card.offsetWidth;
        const marginRight = parseInt(cardStyle.marginRight) || 0;
        
        slideWidth = width + marginRight;
    }
    
    // Function to update slider position
    function updateSlider() {
        if (!container) return;
        container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update dots if they exist
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.about-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('about-active');
                } else {
                    dot.classList.remove('about-active');
                }
            });
        }
    }
    
    // Function to go to previous slide
    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    // Function to go to next slide
    function goToNext() {
        if (currentIndex < cards.length - getVisibleSlides()) {
            currentIndex++;
            updateSlider();
        }
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
        if (index >= 0 && index < cards.length) {
            currentIndex = index;
            updateSlider();
        }
    }
    
    // Function to calculate visible slides based on viewport
    function getVisibleSlides() {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth < 768) {
            return 1;
        } else if (viewportWidth < 992) {
            return 2;
        } else {
            return 3;
        }
    }
    
    // Create dots if dots container exists
    if (dotsContainer) {
        cards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('about-dot');
            if (index === 0) {
                dot.classList.add('about-active');
            }
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Add event listeners to buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', goToPrev);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', goToNext);
    }
    
    // Initialize slider
    calculateSlideWidth();
    updateSlider();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        calculateSlideWidth();
        updateSlider();
    });
    
    // Add CSS for slider transition
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .about-slider-container {
            transition: transform 0.4s ease;
        }
    `;
    document.head.appendChild(styleElement);
}

// Counters
function initCounters() {
    const featureCards = document.querySelectorAll('.about-feature-card[data-count]');
    
    if (featureCards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const target = parseInt(card.getAttribute('data-count'));
                if (isNaN(target)) return;
                
                const counterElement = card.querySelector('.about-counter');
                if (!counterElement) return;
                
                animateCounter(counterElement, target);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.5 });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Counter animation function
function animateCounter(element, target) {
    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Use easeOutExpo for smooth counting at the end
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(easeProgress * target);
        
        element.textContent = currentCount;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target; // Ensure we end exactly at the target
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.about-back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
