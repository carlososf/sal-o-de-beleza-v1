import './style.css'

// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.fade-up-element');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Number Counter Animation
const statNumber = document.querySelector('.stat-number');
let counted = false;

const counterCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      animateValue(statNumber, 0, 5000, 2000, '+', 'k');
    }
  });
};

const counterObserver = new IntersectionObserver(counterCallback, { threshold: 0.5 });
if (statNumber) {
  counterObserver.observe(statNumber.parentElement);
}

function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    let currentVal = Math.floor(easeOutQuart * (end - start) + start);

    if (progress === 1) {
      obj.innerHTML = `${prefix}${end >= 5000 ? '5' : end}${end >= 5000 ? suffix : ''}`;
    } else {
      obj.innerHTML = `${prefix}${currentVal.toLocaleString('pt-BR')}`;
    }

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Smooth scrolling (Fallback para hash links extras)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const dest = this.getAttribute('href');
    if (dest !== '#' && dest !== '#agendar' && dest !== '#contato') {
      e.preventDefault();
      const target = document.querySelector(dest);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});
