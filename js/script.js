/* ==========================================
   CSE-AIML Team Portfolio - Vanilla JavaScript
   Handles theme toggle, mobile navigation,
   project filtering, and form validation.
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initActiveNavLink();
  initProjectFilters();
  initContactForm();
});

/* ------------------------------------------
   1. Theme Toggle (Light / Dark)
   ------------------------------------------ */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('cse-portfolio-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cse-portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  if (theme === 'dark') {
    // Sun icon for switching back to light mode
    themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    themeToggleBtn.setAttribute('title', 'Switch to Light Theme');
  } else {
    // Moon icon for switching to dark mode
    themeToggleBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
  }
}

/* ------------------------------------------
   2. Mobile Navigation Hamburger Menu
   ------------------------------------------ */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close nav on clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
    }
  });
}

/* ------------------------------------------
   3. Highlight Active Navigation Link
   ------------------------------------------ */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ------------------------------------------
   4. Projects Page Filtering
   ------------------------------------------ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ------------------------------------------
   5. Contact Form Validation & Success Toast
   ------------------------------------------ */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  if (!contactForm || !formAlert) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      showFormAlert('Please complete all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Success response
    showFormAlert(`Thank you, ${name}! Your message has been sent successfully. We will get back to you shortly.`, 'success');
    contactForm.reset();
  });
}

function showFormAlert(message, type) {
  const formAlert = document.getElementById('form-alert');
  if (!formAlert) return;

  formAlert.textContent = message;
  formAlert.className = `form-alert ${type}`;
  formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
