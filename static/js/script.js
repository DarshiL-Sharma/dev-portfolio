// =============================================
// NAVBAR — scroll effect + mobile toggle
// =============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(l => l.style.color = '');
        link.style.color = 'var(--accent1)';
      }
    }
  });
});

// =============================================
// SCROLL REVEAL — skill cards
// =============================================
const skillCards = document.querySelectorAll('.skill-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.dataset.delay || 0) * 100;
      setTimeout(() => {
        card.classList.add('visible');
      }, delay);
      revealObserver.unobserve(card);
    }
  });
}, { threshold: 0.15 });

skillCards.forEach(card => revealObserver.observe(card));

// =============================================
// GENERIC FADE-UP on scroll
// =============================================
const fadeTargets = document.querySelectorAll('.project-card, .about-img-wrap, .about-right, .contact-wrap');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

// =============================================
// CONTACT FORM
// =============================================
const form = document.getElementById('contactForm');

// Create toast element
const toast = document.createElement('div');
toast.classList.add('toast');
toast.textContent = '✅ Message sent! I\'ll get back to you soon.';
document.body.appendChild(toast);

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Simulate send delay
    setTimeout(() => {
      btn.textContent = 'Send Message 🚀';
      btn.disabled = false;
      form.reset();

      // Show toast
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }, 1400);
  });
}

// =============================================
// SMOOTH CURSOR GLOW (desktop only)
// =============================================
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.06), transparent 70%);
    pointer-events: none; z-index: 0;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// =============================================
// TYPING EFFECT in hero subtitle (optional)
// =============================================
const roles = [
  'Python Developer',
  'Web Developer',
  'C Programmer',
  'Problem Solver'
];
const heroSub = document.querySelector('.hero-sub');
if (heroSub) {
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const baseText = 'crafting scalable and stunning Projects that users love.';
  const prefix = ' ';

  // We'll animate a small "role" span inside the sub
  const roleSpan = document.createElement('span');
  roleSpan.style.cssText = `
    color: var(--accent4);
    border-right: 2px solid var(--accent4);
    padding-right: 2px;
    animation: blinkCaret 0.8s step-end infinite;
  `;
  const style = document.createElement('style');
  style.textContent = `@keyframes blinkCaret { 0%,100%{border-color:var(--accent4)} 50%{border-color:transparent} }`;
  document.head.appendChild(style);

  heroSub.innerHTML = '';
  heroSub.appendChild(document.createTextNode('Full-Stack '));
  heroSub.appendChild(roleSpan);
  heroSub.appendChild(document.createTextNode(' developer — ' + baseText));

  function typeRole() {
    const current = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }
    roleSpan.textContent = current.substring(0, charIndex);

    let speed = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }
    setTimeout(typeRole, speed);
  }
  setTimeout(typeRole, 1000);
}

// =============================================
// CODE WINDOW — animated number line
// =============================================
const codeLines = document.querySelectorAll('.code-body code');
if (codeLines.length) {
  codeLines.forEach(code => {
    code.style.opacity = '0';
    setTimeout(() => {
      code.style.transition = 'opacity 0.6s ease';
      code.style.opacity = '1';
    }, 600);
  });
}

console.log('%c👋 Hey there, fellow dev! Built with ❤️', 'color: #7c3aed; font-size: 14px; font-weight: bold;');