// --- Dark Mode Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const iconSpan = themeToggleBtn.querySelector('.icon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        body.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    iconSpan.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// --- Mobile Menu Toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- Custom Cursor Follower ---
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});
document.addEventListener('mousedown', () => {
    cursorGlow.style.width = '200px'; cursorGlow.style.height = '200px';
});
document.addEventListener('mouseup', () => {
    cursorGlow.style.width = '300px'; cursorGlow.style.height = '300px';
});

// --- Scroll Progress Bar ---
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// --- Scroll to Top Button ---
const scrollTopBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Scroll Reveal Animation ---
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);
reveal(); // Trigger on load

// --- Impact Stats Counter Animation ---
const counters = document.querySelectorAll('.counter');
let hasAnimated = false;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
}

const impactSection = document.getElementById('impact');
if (impactSection) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCounters();
        }
    }, { threshold: 0.5 });
    observer.observe(impactSection);
}

// --- FAQ Accordion ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(otherItem => {
            if (otherItem !== item) otherItem.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active');
    });
});

// --- Donation Modal ---
const donateBtn = document.getElementById('donate-btn');
const donationModal = document.getElementById('donation-modal');
const closeBtn = document.querySelector('.close-btn');
const submitDonation = document.getElementById('submit-donation');

if (donateBtn) {
    donateBtn.addEventListener('click', () => {
        donationModal.classList.add('show');
    });
}
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        donationModal.classList.remove('show');
    });
}
// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === donationModal) {
        donationModal.classList.remove('show');
    }
});
if (submitDonation) {
    submitDonation.addEventListener('click', () => {
        submitDonation.textContent = 'Thank You! ❤️';
        setTimeout(() => {
            donationModal.classList.remove('show');
            submitDonation.textContent = 'Donate Now';
        }, 2000);
    });
}

// --- Forms Submission ---
function handleFormSubmit(formId, successId) {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            successMsg.classList.remove('hidden');
            form.reset();
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        });
    }
}

handleFormSubmit('contact-form', 'form-success');
handleFormSubmit('newsletter-form', 'newsletter-success');
