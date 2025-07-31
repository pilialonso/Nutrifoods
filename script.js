// =============================================
// NUTRIFOODS - CORPORATE JAVASCRIPT (FIXED)
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // NAVBAR SCROLL EFFECT
    // =============================================
    const navbar = document.querySelector('.navbar-corporate');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }
    
    // =============================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // =============================================
    const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // CONTACT FORM HANDLING
    // =============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const telefono = formData.get('telefono');
            const asunto = formData.get('asunto');
            const mensaje = formData.get('mensaje');
            
            // Validation
            let errors = [];
            
            if (!nombre || nombre.trim().length < 2) {
                errors.push('El nombre debe tener al menos 2 caracteres');
            }
            
            if (!email || !isValidEmail(email)) {
                errors.push('Por favor ingresa un email válido');
            }
            
            if (!asunto) {
                errors.push('Por favor selecciona un tema');
            }
            
            if (!mensaje || mensaje.trim().length < 10) {
                errors.push('El mensaje debe tener al menos 10 caracteres');
            }
            
            if (errors.length > 0) {
                showErrorMessage(errors.join('\n'));
                return;
            }
            
            // Submit form
            const submitButton = this.querySelector('.btn-submit');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showSuccessMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
                    this.reset();
                } else {
                    throw new Error('Error en el servidor');
                }
            })
            .catch(error => {
                showErrorMessage('Error al enviar el mensaje. Por favor intenta nuevamente.');
            })
            .finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    }
    
    // =============================================
    // EMAIL VALIDATION
    // =============================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // =============================================
    // SUCCESS MESSAGE
    // =============================================
    function showSuccessMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success';
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.5s ease;
        `;
        alertDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                if (document.body.contains(alertDiv)) {
                    document.body.removeChild(alertDiv);
                }
            }, 500);
        }, 4000);
    }
    
    // =============================================
    // ERROR MESSAGE
    // =============================================
    function showErrorMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-error';
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #f44336;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
            z-index: 10000;
            max-width: 400px;
            white-space: pre-line;
            animation: slideInRight 0.5s ease;
        `;
        alertDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                if (document.body.contains(alertDiv)) {
                    document.body.removeChild(alertDiv);
                }
            }, 500);
        }, 5000);
    }
    
    // =============================================
    // SCROLL ANIMATIONS (if AOS is not loaded)
    // =============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        if (animatedElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // =============================================
    // MOBILE NAVIGATION TOGGLE
    // =============================================
    const mobileToggle = document.querySelector('.navbar-toggle');
    const navLinksElement = document.querySelector('.navbar-links');
    
    if (mobileToggle && navLinksElement) {
        mobileToggle.addEventListener('click', function() {
            navLinksElement.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        navLinksElement.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                this.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // =============================================
    // HERO VIDEO BACKGROUND OPTIMIZATION
    // =============================================
    const heroVideo = document.querySelector('.hero-video');
    
    if (heroVideo) {
        // Pause video when not visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play();
                } else {
                    heroVideo.pause();
                }
            });
        });
        
        videoObserver.observe(heroVideo);
        
        // Handle mobile devices - reduce video quality or show poster
        if (window.innerWidth < 768) {
            heroVideo.style.display = 'none';
        }
    }
    
    // =============================================
    // PERFORMANCE OPTIMIZATION
    // =============================================
    let ticking = false;
    
    function updateOnScroll() {
        // Add any scroll-dependent updates here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    // =============================================
    // REAL-TIME FORM VALIDATION
    // =============================================
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous validation classes
        field.classList.remove('valid', 'invalid');
        
        switch(fieldName) {
            case 'nombre':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Mínimo 2 caracteres';
                }
                break;
            case 'email':
                if (!isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Email inválido';
                }
                break;
            case 'telefono':
                // Optional field, but if filled should be valid
                if (value && value.length < 8) {
                    isValid = false;
                    errorMessage = 'Teléfono inválido';
                }
                break;
            case 'asunto':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Selecciona un tema';
                }
                break;
            case 'mensaje':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Mínimo 10 caracteres';
                }
                break;
        }
        
        if (isValid) {
            field.classList.add('valid');
        } else {
            field.classList.add('invalid');
            field.setAttribute('data-error', errorMessage);
        }
        
        return isValid;
    }
    
    // =============================================
    // ADD DYNAMIC STYLES
    // =============================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .navbar-links.active {
            display: flex !important;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .navbar-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .navbar-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .form-group input.valid,
        .form-group textarea.valid,
        .form-group select.valid {
            border-color: #4CAF50;
        }
        
        .form-group input.invalid,
        .form-group textarea.invalid,
        .form-group select.invalid {
            border-color: #f44336;
        }
        
        .form-group input.invalid::after,
        .form-group textarea.invalid::after,
        .form-group select.invalid::after {
            content: attr(data-error);
            color: #f44336;
            font-size: 12px;
            position: absolute;
            bottom: -20px;
            left: 0;
        }
    `;
    document.head.appendChild(style);
});
