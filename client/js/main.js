
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {

        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {

    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }


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

const mobileToggle = document.getElementById('mobileToggle');
const navLinksContainer = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const isOpen = navLinksContainer.classList.contains('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
});


navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
    });
});


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


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


const themeToggle = document.getElementById('themeToggle');
const rootElement = document.documentElement;


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


document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.body.style.setProperty('--mouse-x', `${x * 100}%`);
    document.body.style.setProperty('--mouse-y', `${y * 100}%`);
});

// Custom Cursor Initialization
const cursor = document.getElementById('customCursor');
const cursorFollower = document.getElementById('customCursorFollower');

if (window.matchMedia('(pointer: fine)').matches && cursor && cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Move inner cursor instantly
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Smooth follow for outer ring
    const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Hover effects on links and buttons
    const hoverables = document.querySelectorAll('a, button, .nav-logo, input, textarea');
    hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
            el.style.transform = '';
        });
    });

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move the button slightly towards cursor
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });
}
