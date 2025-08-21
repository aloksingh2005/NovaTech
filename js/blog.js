/**
 * Blog Page JavaScript
 * Handles functionality for the blog page including category filtering,
 * search, and newsletter subscription
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initPreloader();
    initStickyHeader();
    initMobileMenu();
    initBackToTop();
    initScrollAnimation();
    initCategoryFilter();
    initSearchFilter();
    initNewsletterForm();
});

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        });
    }
}

/**
 * Initialize sticky header on scroll
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
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

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu li a');

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

/**
 * Initialize category filtering
 */
function initCategoryFilter() {
    const categoryLinks = document.querySelectorAll('.category-item');
    const articles = document.querySelectorAll('.article-card');
    
    if (categoryLinks.length) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all category links
                categoryLinks.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Show/hide articles based on category
                articles.forEach(article => {
                    if (category === 'all') {
                        article.style.display = 'block';
                        setTimeout(() => {
                            article.classList.remove('hidden');
                        }, 10);
                    } else {
                        const articleCategories = article.getAttribute('data-categories').split(',');
                        
                        if (articleCategories.includes(category)) {
                            article.style.display = 'block';
                            setTimeout(() => {
                                article.classList.remove('hidden');
                            }, 10);
                        } else {
                            article.classList.add('hidden');
                            setTimeout(() => {
                                article.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
}

/**
 * Initialize search functionality
 */
function initSearchFilter() {
    const searchInput = document.querySelector('.search-input');
    const articles = document.querySelectorAll('.article-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            articles.forEach(article => {
                const title = article.querySelector('.article-title').textContent.toLowerCase();
                const description = article.querySelector('.article-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    article.style.display = 'block';
                    setTimeout(() => {
                        article.classList.remove('hidden');
                    }, 10);
                } else {
                    article.classList.add('hidden');
                    setTimeout(() => {
                        article.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
}

/**
 * Initialize back to top button functionality
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize animation on scroll
 */
function initScrollAnimation() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (animateElements.length) {
        animateElements.forEach(element => {
            scrollObserver.observe(element);
        });
    }
}

/**
 * Initialize newsletter form
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();
            const formMessage = this.querySelector('.form-message') || document.createElement('div');
            
            formMessage.classList.add('form-message');
            
            if (!emailValue) {
                formMessage.textContent = 'Please enter your email address.';
                formMessage.className = 'form-message error';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.className = 'form-message error';
            } else {
                // Simulate successful subscription
                formMessage.textContent = 'Thank you for subscribing!';
                formMessage.className = 'form-message success';
                emailInput.value = '';
            }
            
            if (!this.querySelector('.form-message')) {
                this.appendChild(formMessage);
            }
        });
    }
}

// Add CSS for form response messages
const style = document.createElement('style');
style.textContent = `
.form-message {
    padding: 10px 15px;
    border-radius: 5px;
    margin-top: 15px;
    font-size: 14px;
}
.form-message.success {
    background-color: rgba(0, 200, 81, 0.1);
    color: #00c851;
    border: 1px solid rgba(0, 200, 81, 0.2);
}
.form-message.error {
    background-color: rgba(255, 65, 54, 0.1);
    color: #ff4136;
    border: 1px solid rgba(255, 65, 54, 0.2);
}
.form-message.warning {
    background-color: rgba(255, 193, 7, 0.1);
    color: #ffc107;
    border: 1px solid rgba(255, 193, 7, 0.2);
}
`;
document.head.appendChild(style);