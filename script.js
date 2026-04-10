// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  nav.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
nav.querySelectorAll('.header__link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    nav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.hero__stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
    update();
  });
}

// Start counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) heroObserver.observe(heroStats);

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('active'));

    // Open clicked if it wasn't active
    if (!isActive) item.classList.add('active');
  });
});

// ===== PORTFOLIO FILTER =====
document.querySelectorAll('.portfolio__filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.portfolio__filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.portfolio__item').forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = '';
        item.style.animation = 'fadeInUp 0.5s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.service-card, .portfolio__item, .differential-card, .testimonial-card, .process__step, .faq__item, .about__content, .about__image-wrapper, .contact__info, .contact__form-wrapper'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== SMOOTH SCROLL FOR CTA BUTTONS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== FORM SUBMISSION (Formspree) =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        btn.innerHTML = '<i class="fas fa-check"></i> Enviado com sucesso!';
        btn.style.background = '#10B981';
        btn.style.borderColor = '#10B981';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Erro no envio');
      }
    } catch {
      btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erro ao enviar. Tente novamente.';
      btn.style.background = '#EF4444';
      btn.style.borderColor = '#EF4444';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    }
  });
}

// ===== PHONE MASK =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 6) {
      value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0,2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    e.target.value = value;
  });
}
