// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');
const navLinks = document.querySelectorAll('.nav-link');
const menuLinks = document.querySelectorAll('.menu-link');

// Theme Toggle Functionality
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const themeIcon = themeToggle.querySelector('i');
    
    if (isDark) {
        html.removeAttribute('data-theme');
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        localStorage.setItem('theme', 'dark');
    }
}

// Mobile Menu Functionality
function toggleMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenuHandler() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Navigation Active State
function setActiveLink(links, clickedLink) {
    links.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

// Scroll Animation
function addScrollAnimation() {
    const navbar = document.querySelector('.navbar-custom');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
            return;
        }

        if (currentScroll > lastScroll && !mobileMenu.classList.contains('active')) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Initialize Theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeIcon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', closeMenuHandler);

navLinks.forEach(link => {
    link.addEventListener('click', () => setActiveLink(navLinks, link));
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        setActiveLink(menuLinks, link);
        closeMenuHandler();
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        closeMenuHandler();
    }
});

// Add smooth scroll for anchor links
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

// Initialize
initTheme();
addScrollAnimation();

// Add intersection observer for scroll spy
const sections = document.querySelectorAll('section');
if (sections.length > 0) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                setActiveLink(navLinks, document.querySelector(`a[href="#${id}"]`));
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
}

// Add resize listener for mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        closeMenuHandler();
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenuHandler();
    }
});

// Add touch swipe to close mobile menu
let touchStartX = 0;
let touchEndX = 0;

mobileMenu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

mobileMenu.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX > touchStartX + 50) { // Swipe right
        closeMenuHandler();
    }
});

// Add navbar shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-custom');
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}); 