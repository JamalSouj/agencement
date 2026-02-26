// ============================================
// Main JS — Navigation, Scroll Animations, Counter
// ============================================

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Enforce a minimum display time to show the animation (1.5s)
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});

// Navbar scroll behavior
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Navbar bg on scroll
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link based on scroll position
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const isOpen = navLinksContainer.classList.contains('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
    });
});

// ============================================
// Intersection Observer — Reveal on scroll
// ============================================

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
    }
);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom').forEach((el) => {
    revealObserver.observe(el);
});

// ============================================
// Number Counter Animation
// ============================================

function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach((counter) => {
        const target = parseInt(counter.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased).toLocaleString('fr-FR');

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

// Observe hero stats for counter animation
const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        },
        { threshold: 0.5 }
    );
    statsObserver.observe(statsSection);
}

// ============================================
// Smooth scroll for anchor links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// Theme Toggle Logic
// ============================================

const themeToggle = document.getElementById('themeToggle');
const rootElement = document.documentElement;

// Check local storage or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    rootElement.setAttribute('data-theme', 'light');
} else {
    rootElement.setAttribute('data-theme', 'dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        rootElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ============================================
// Interactive Ambient Background 
// ============================================
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Update global CSS variables for the mouse position 
    // This allows CSS radial gradients to track the cursor
    document.body.style.setProperty('--mouse-x', `${x * 100}%`);
    document.body.style.setProperty('--mouse-y', `${y * 100}%`);
});
