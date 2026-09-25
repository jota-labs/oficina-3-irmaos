// Header Mobile Navigation Toggle & Scroll State
export function initHeader() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !nav) return;

  function toggleMenu(isOpen) {
    const shouldOpen = typeof isOpen === 'boolean' ? isOpen : !nav.classList.contains('active');
    
    toggleBtn.classList.toggle('active', shouldOpen);
    nav.classList.toggle('active', shouldOpen);
    header.classList.toggle('menu-open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking outside or clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !header.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Header scroll shadow state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}
