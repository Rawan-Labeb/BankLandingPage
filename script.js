document.addEventListener('DOMContentLoaded', function() {
    // Create alert container
    const alertContainer = document.createElement('div');
    alertContainer.id = 'alert-container';
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '20px';
    alertContainer.style.right = '20px';
    alertContainer.style.zIndex = '9999';
    alertContainer.style.width = '350px';
    document.body.appendChild(alertContainer);

    // Function to show Bootstrap alert
    function showAlert(message, type = 'success') {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show`;
        alert.role = 'alert';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertContainer.appendChild(alert);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
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
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Modal handling
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    
    document.getElementById('loginBtn').addEventListener('click', function() {
        loginModal.show();
    });
    
    document.getElementById('registerBtn').addEventListener('click', function() {
        registerModal.show();
    });
    
    document.getElementById('showRegisterFromLogin').addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.hide();
        registerModal.show();
    });
    
    document.getElementById('showLoginFromRegister').addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.hide();
        loginModal.show();
    });

    // Form submissions with Bootstrap alerts
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        showAlert('Login successful! Redirecting to your account...', 'success');
        setTimeout(() => {
            loginModal.hide();
        }, 1500);
    });
    
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your registration logic here
        showAlert('Registration successful! Welcome to our bank.', 'success');
        setTimeout(() => {
            registerModal.hide();
        }, 1500);
    });
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your contact form logic here
        showAlert('Thank you for your message! We will get back to you soon.', 'info');
        this.reset();
    });

    // Account card hover effect
    const accountCards = document.querySelectorAll('.account-card');
    accountCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-icon, .card, .stats h2');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Add event listener for any dynamically added close buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-close')) {
            const alert = e.target.closest('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }
    });
});