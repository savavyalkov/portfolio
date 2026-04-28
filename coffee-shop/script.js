// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.menu');

mobileToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Menu Category Switching
const categoryButtons = document.querySelectorAll('.cat-btn');
const categoryContents = document.querySelectorAll('.category-content');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Remove active class from all buttons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all category contents
        categoryContents.forEach(content => content.classList.remove('active'));
        
        // Show selected category content
        const targetContent = document.querySelector(`.category-content[data-category="${category}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Add to Cart Animation
const addButtons = document.querySelectorAll('.add-btn');

addButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Visual feedback
        this.style.transform = 'rotate(360deg) scale(1.2)';
        this.textContent = '✓';
        
        setTimeout(() => {
            this.style.transform = '';
            this.textContent = '+';
        }, 1000);
        
        // Show notification
        showNotification('Добавлено в корзину!');
    });
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #FF6F00;
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form Submission
const bookingForm = document.getElementById('bookForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = bookingForm.querySelector('input[type="text"]').value;
    const phone = bookingForm.querySelector('input[type="tel"]').value;
    const date = bookingForm.querySelector('input[type="date"]').value;
    const time = bookingForm.querySelector('input[type="time"]').value;
    const guests = bookingForm.querySelector('select').value;
    
    // Show success message
    alert(`Спасибо, ${name}! Ваш столик забронирован на ${date} в ${time} для ${guests} гостей. Мы свяжемся с вами по номеру ${phone}.`);
    
    // Reset form
    bookingForm.reset();
});

// Scroll Animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('.benefits, .coffee-section, .story-section, .reservation-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Animate stats on scroll
const statBoxes = document.querySelectorAll('.stat-box strong');

const animateStats = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const hasPlus = text.includes('+');
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number.toLocaleString() + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current).toLocaleString() + (hasPlus ? '+' : '');
                    }
                }, 30);
            }
            observer.unobserve(target);
        }
    });
};

const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
});

statBoxes.forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect for hero
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    
    if (heroText && scrollY < window.innerHeight) {
        heroText.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroText.style.opacity = 1 - (scrollY / 600);
    }
    
    lastScrollY = scrollY;
});

// Menu card hover effects
const menuCards = document.querySelectorAll('.menu-card');

menuCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(1deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Benefit boxes staggered animation
const benefitBoxes = document.querySelectorAll('.benefit-box');

benefitBoxes.forEach((box, index) => {
    box.style.animationDelay = `${index * 0.1}s`;
});

console.log('Кофейня "Аромат" успешно загружена! ☕');
