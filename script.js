// MacBook Ankauf Website JavaScript

// Price estimation data based on model, storage, condition
const priceMatrix = {
    'MacBook Air M2 (2022)': {
        '256GB': { 'Wie neu': [1200, 1350], 'Sehr gut': [1000, 1150], 'Gut': [800, 950], 'Akzeptabel': [600, 750] },
        '512GB': { 'Wie neu': [1400, 1550], 'Sehr gut': [1200, 1350], 'Gut': [1000, 1150], 'Akzeptabel': [800, 950] },
        '1TB': { 'Wie neu': [1600, 1750], 'Sehr gut': [1400, 1550], 'Gut': [1200, 1350], 'Akzeptabel': [1000, 1150] },
        '2TB': { 'Wie neu': [1800, 1950], 'Sehr gut': [1600, 1750], 'Gut': [1400, 1550], 'Akzeptabel': [1200, 1350] }
    },
    'MacBook Air M1 (2020)': {
        '256GB': { 'Wie neu': [900, 1050], 'Sehr gut': [750, 900], 'Gut': [600, 750], 'Akzeptabel': [450, 600] },
        '512GB': { 'Wie neu': [1100, 1250], 'Sehr gut': [950, 1100], 'Gut': [800, 950], 'Akzeptabel': [650, 800] },
        '1TB': { 'Wie neu': [1300, 1450], 'Sehr gut': [1150, 1300], 'Gut': [1000, 1150], 'Akzeptabel': [850, 1000] },
        '2TB': { 'Wie neu': [1500, 1650], 'Sehr gut': [1350, 1500], 'Gut': [1200, 1350], 'Akzeptabel': [1050, 1200] }
    },
    'MacBook Pro M2 14 (2023)': {
        '512GB': { 'Wie neu': [1800, 2000], 'Sehr gut': [1600, 1800], 'Gut': [1400, 1600], 'Akzeptabel': [1200, 1400] },
        '1TB': { 'Wie neu': [2100, 2300], 'Sehr gut': [1900, 2100], 'Gut': [1700, 1900], 'Akzeptabel': [1500, 1700] },
        '2TB': { 'Wie neu': [2400, 2600], 'Sehr gut': [2200, 2400], 'Gut': [2000, 2200], 'Akzeptabel': [1800, 2000] }
    },
    'MacBook Pro M2 16 (2023)': {
        '512GB': { 'Wie neu': [2200, 2400], 'Sehr gut': [2000, 2200], 'Gut': [1800, 2000], 'Akzeptabel': [1600, 1800] },
        '1TB': { 'Wie neu': [2500, 2700], 'Sehr gut': [2300, 2500], 'Gut': [2100, 2300], 'Akzeptabel': [1900, 2100] },
        '2TB': { 'Wie neu': [2800, 3000], 'Sehr gut': [2600, 2800], 'Gut': [2400, 2600], 'Akzeptabel': [2200, 2400] }
    },
    'MacBook Pro M1 13 (2020)': {
        '256GB': { 'Wie neu': [1000, 1150], 'Sehr gut': [850, 1000], 'Gut': [700, 850], 'Akzeptabel': [550, 700] },
        '512GB': { 'Wie neu': [1200, 1350], 'Sehr gut': [1050, 1200], 'Gut': [900, 1050], 'Akzeptabel': [750, 900] },
        '1TB': { 'Wie neu': [1400, 1550], 'Sehr gut': [1250, 1400], 'Gut': [1100, 1250], 'Akzeptabel': [950, 1100] },
        '2TB': { 'Wie neu': [1600, 1750], 'Sehr gut': [1450, 1600], 'Gut': [1300, 1450], 'Akzeptabel': [1150, 1300] }
    }
};

// Default fallback prices for models not in the matrix
const defaultPrices = {
    'Wie neu': [800, 1000],
    'Sehr gut': [650, 850],
    'Gut': [500, 700],
    'Akzeptabel': [350, 550]
};

// DOM Elements
const form = document.getElementById('deviceForm');
const deviceTypeRadios = document.querySelectorAll('input[name="device_type"]');
const macbookSection = document.getElementById('macbookSection');
const iphoneSection = document.getElementById('iphoneSection');
const macbookSpecs = document.getElementById('macbookSpecs');
const conditionRadios = document.querySelectorAll('input[name="condition"]');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializeScrollAnimations();
    setupFormValidation();
});

// Event Listeners
function initializeEventListeners() {
    // Device type selection
    deviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', handleDeviceTypeChange);
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmission);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Photo preview functionality
    const photoInput = document.getElementById('photos');
    photoInput.addEventListener('change', handlePhotoPreview);
}

// Device Type Change Handler
function handleDeviceTypeChange() {
    const selectedDeviceType = document.querySelector('input[name="device_type"]:checked')?.value;
    
    if (selectedDeviceType === 'MacBook') {
        macbookSection.classList.remove('d-none');
        iphoneSection.classList.add('d-none');
        macbookSpecs.classList.remove('d-none');
        
        // Make MacBook fields required
        document.getElementById('macbookModel').required = true;
        document.getElementById('storageSize').required = true;
        
        // Make iPhone fields optional
        document.getElementById('iphoneModel').required = false;
        document.getElementById('iphoneStorage').required = false;
        
    } else if (selectedDeviceType === 'iPhone') {
        macbookSection.classList.add('d-none');
        iphoneSection.classList.remove('d-none');
        macbookSpecs.classList.add('d-none');
        
        // Make iPhone fields required
        document.getElementById('iphoneModel').required = true;
        document.getElementById('iphoneStorage').required = true;
        
        // Make MacBook fields optional
        document.getElementById('macbookModel').required = false;
        document.getElementById('storageSize').required = false;
    }
    
    // Reset form validation
    form.classList.remove('was-validated');
}

// Form Submission Handler
function handleFormSubmission(event) {
    event.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Anfrage wird gesendet...';
    
    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Show validation error message
        showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
        return;
    }

    // Add device type to form data
    const selectedDeviceType = document.querySelector('input[name="device_type"]:checked')?.value;
    const deviceTypeInput = document.createElement('input');
    deviceTypeInput.type = 'hidden';
    deviceTypeInput.name = 'selected_device_type';
    deviceTypeInput.value = selectedDeviceType || 'Nicht ausgewählt';
    form.appendChild(deviceTypeInput);

    // Add timestamp
    const timestampInput = document.createElement('input');
    timestampInput.type = 'hidden';
    timestampInput.name = 'submission_time';
    timestampInput.value = new Date().toLocaleString('de-DE');
    form.appendChild(timestampInput);

    // Add website source
    const sourceInput = document.createElement('input');
    sourceInput.type = 'hidden';
    sourceInput.name = 'website_source';
    sourceInput.value = 'wirkaufendeindrecksmacbook.de';
    form.appendChild(sourceInput);

    // Show success message before redirect
    showNotification('Ihre Anfrage wird gesendet...', 'success');
    
    // Submit the form
    setTimeout(() => {
        form.submit();
    }, 1500);
}

// Photo Preview Handler
function handlePhotoPreview(event) {
    const files = event.target.files;
    const maxFiles = 5;
    
    if (files.length > maxFiles) {
        alert(`Sie können maximal ${maxFiles} Fotos hochladen.`);
        event.target.value = '';
        return;
    }

    // Validate file sizes
    const maxSize = 5 * 1024 * 1024; // 5MB
    for (let file of files) {
        if (file.size > maxSize) {
            alert(`Die Datei "${file.name}" ist zu groß. Maximale Dateigröße: 5MB`);
            event.target.value = '';
            return;
        }
    }

    // Show preview message
    const fileText = event.target.parentElement.querySelector('.form-text');
    if (files.length > 0) {
        fileText.textContent = `${files.length} Foto(s) ausgewählt`;
        fileText.style.color = '#28a745';
    } else {
        fileText.textContent = 'Sie können mehrere Fotos hochladen (optional, aber empfohlen für eine genauere Bewertung)';
        fileText.style.color = '';
    }
}

// Form Validation Setup
function setupFormValidation() {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.checkValidity()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.process-step, .contact-info, .card').forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    }).format(amount);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Error Handling
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    // Optionally show user-friendly error message
});

// Contact form enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Auto-format phone number
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.startsWith('49')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+49' + value.substring(1);
            }
            this.value = value;
        });
    }

    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.setCustomValidity('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

// Mobile-specific enhancements
if (window.innerWidth <= 768) {
    // Adjust form layout for mobile
    document.addEventListener('DOMContentLoaded', function() {
        const conditionOptions = document.querySelectorAll('.condition-option');
        conditionOptions.forEach(option => {
            option.classList.add('mb-3');
        });
    });
}

// Analytics and tracking (placeholder for future implementation)
function trackFormStart() {
    // Implement analytics tracking here
    console.log('Form interaction started');
}

function trackPriceCalculation(model, storage, condition, price) {
    // Implement analytics tracking here
    console.log('Price calculated:', { model, storage, condition, price });
}

function trackFormSubmission() {
    // Implement analytics tracking here
    console.log('Form submitted');
}

// Initialize tracking
document.addEventListener('DOMContentLoaded', function() {
    const macbookModelSelect = document.getElementById('macbookModel');
    if (macbookModelSelect) {
        macbookModelSelect.addEventListener('change', trackFormStart);
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}
