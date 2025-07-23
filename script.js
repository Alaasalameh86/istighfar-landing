// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Loading animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.benefit-card, .feature-item, .guarantee-card, .detail-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Book cover hover effect
const bookCover = document.querySelector('.book-cover');
if (bookCover) {
    bookCover.addEventListener('mouseenter', () => {
        bookCover.style.transform = 'scale(1.05) rotateY(5deg)';
    });
    
    bookCover.addEventListener('mouseleave', () => {
        bookCover.style.transform = 'scale(1) rotateY(0deg)';
    });
}

// CTA button click tracking
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Track click (you can integrate with analytics here)
        console.log('CTA button clicked:', button.href);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const header = document.querySelector('.header');
    const nav = document.createElement('nav');
    nav.className = 'mobile-nav';
    
    // Add navigation items if needed
    const navItems = [
        { text: 'الرئيسية', href: '#hero' },
        { text: 'الفوائد', href: '#benefits' },
        { text: 'تفاصيل الكتاب', href: '#book-details' },
        { text: 'تواصل معنا', href: '#contact' }
    ];
    
    navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        link.className = 'nav-link';
        nav.appendChild(link);
    });
    
    if (window.innerWidth <= 768) {
        header.appendChild(nav);
    }
};

// Form validation (if contact form is added)
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Countdown timer (if needed for limited offer)
const createCountdown = (endDate) => {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${days}د ${hours}س ${minutes}د ${seconds}ث`;
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "انتهى العرض";
        }
    }, 1000);
};

// Price animation
const animatePrice = () => {
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach(price => {
        const finalPrice = parseInt(price.textContent);
        let currentPrice = 0;
        const increment = finalPrice / 50;
        
        const priceTimer = setInterval(() => {
            currentPrice += increment;
            if (currentPrice >= finalPrice) {
                currentPrice = finalPrice;
                clearInterval(priceTimer);
            }
            price.textContent = Math.floor(currentPrice);
        }, 20);
    });
};

// Social sharing functions
const shareOnFacebook = (url, title) => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
};

const shareOnTwitter = (url, title) => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
};

const shareOnWhatsApp = (url, title) => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
    window.open(shareUrl, '_blank');
};

// Copy to clipboard function
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        // Show success message
        const message = document.createElement('div');
        message.textContent = 'تم نسخ الرابط!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: fadeInUp 0.3s ease;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Landing page loaded successfully');
    
    // Add loading class to body to trigger animations
    document.body.classList.add('loaded');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '🔥 عرض محدود - قوة الاستغفار';
    } else {
        document.title = 'قوة الاستغفار - كتاب يغير حياتك ويبني مسجداً باسمك';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('btn-primary')) {
        e.target.click();
    }
});

// Performance optimization: Lazy load images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Call lazy loading if needed
// lazyLoadImages();

