// DOM Elements
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const preloader = document.querySelector('.preloader');
const typingElement = document.querySelector('.txt-rotate');
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const themeIcon = document.getElementById('theme-icon');

// =========================================
// 1. PRELOADER & SETUP
// =========================================
window.addEventListener('load', () => {
    // Simulate loading progress
    let percent = 0;
    const interval = setInterval(() => {
        percent += 5;
        document.getElementById('percent').innerText = percent + '%';
        document.querySelector('.progress').style.width = percent + '%';

        if (percent >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initTyping(); // Start typing after load
                }, 500);
            }, 500);
        }
    }, 50);
});

// =========================================
// 2. CUSTOM CURSOR
// =========================================
window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows cursor immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (animation in CSS)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Interactive hover effect for cursor
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, input, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// =========================================
// 3. TYPING EFFECT (Pure JS)
// =========================================
const TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let delta = 200 - Math.random() * 100; // Typing speed

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(() => {
        this.tick();
    }, delta);
};

function initTyping() {
    const toRotate = typingElement.getAttribute('data-rotate');
    const period = typingElement.getAttribute('data-period');
    if (toRotate) {
        new TxtRotate(typingElement, JSON.parse(toRotate), period);
    }
}

// =========================================
// 4. NAVBAR SCROLL & MOBILE MENU
// =========================================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// =========================================
// 5. 3D PROJECT TILT EFFECT
// =========================================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
    });
});

// =========================================
// 6. SCROLL ANIMATIONS (Intersection Observer)
// =========================================
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Trigger skill bars if it's the skills section
            if (entry.target.id === 'skills' || entry.target.closest('#skills')) {
                document.querySelectorAll('.progress-fill').forEach(bar => {
                    bar.style.width = bar.style.width; // Trigger CSS transition
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-left, .fade-in-right, .zoom-in, .section-title').forEach(el => {
    observer.observe(el);
});

// =========================================
// 7. THEME TOGGLE (Optional implementation)
// =========================================
let isDark = true;
themeIcon.addEventListener('click', () => {
    isDark = !isDark;
    if (!isDark) {
        document.documentElement.style.setProperty('--bg-color', '#f0f0f0');
        document.documentElement.style.setProperty('--text-color', '#333');
        document.documentElement.style.setProperty('--text-muted', '#666');
        document.documentElement.style.setProperty('--card-bg', 'rgba(0, 0, 0, 0.05)');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#050505');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--text-muted', '#aaaaaa');
        document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.03)');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

// =========================================
// 8. CONTACT FORM SUBMISSION (Django Backend)
// =========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const statusElement = document.getElementById('formStatus');
        const submitBtn = contactForm.querySelector('.submit-btn');

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';
        statusElement.style.display = 'block';
        statusElement.style.color = "#00f3ff"; // Neon Cyan color
        statusElement.innerText = "Sending message...";

        try {
            const response = await fetch('/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });
            const result = await response.json();

            if (response.ok && result.status === 'success') {
                statusElement.style.color = "#0aff0a"; // Green for success
                statusElement.innerText = "Message sent successfully!";
                contactForm.reset();
            } else {
                statusElement.style.color = "#ff3333"; // Red for error
                statusElement.innerText = result.message || "Failed to send message.";
            }
        } catch (error) {
            statusElement.style.color = "#ff3333";
            statusElement.innerText = "Something went wrong! Please try again later.";
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';

            // Hide status message after 5 seconds
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    });
}
