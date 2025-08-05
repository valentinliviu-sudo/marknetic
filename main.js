/**
 * Main JavaScript file for Copywriting & Content Writing Website
 * Author: Manus
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navList && navList.classList.contains('active') && !event.target.closest('.nav') && !event.target.closest('.hamburger')) {
            navList.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navList && navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        const headerHeight = header.offsetHeight;
        const heroHeight = heroSection.offsetHeight;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > heroHeight - headerHeight) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });
    }
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate Name
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Numele este obligatoriu');
                isValid = false;
            }
            
            // Validate Email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email-ul este obligatoriu');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Te rugăm să introduci un email valid');
                isValid = false;
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Mesajul este obligatoriu');
                isValid = false;
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, we'll just show a success message
                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mulțumim pentru mesaj! Te vom contacta în curând.';
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                formContainer.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    // Helper function to show error messages
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        formGroup.appendChild(errorMessage);
        input.classList.add('is-invalid');
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Testimonial Carousel (if exists)
    const testimonialContainer = document.querySelector('.testimonial-carousel');
    
    if (testimonialContainer) {
        const testimonials = testimonialContainer.querySelectorAll('.testimonial');
        let currentIndex = 0;
        
        // Show only the first testimonial initially
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (index === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
            
            dotsContainer.appendChild(dot);
        });
        
        testimonialContainer.appendChild(dotsContainer);
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
            
            // Update active dot
            document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            currentIndex = index;
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }
        
        // Add animation class when element is in viewport
        function checkAnimations() {
            animatedElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Check animations on scroll
        window.addEventListener('scroll', checkAnimations);
        
        // Check animations on page load
        checkAnimations();
    }
});

