import { initSmoothScroll } from './global/smooth-scroll.js';
import { initHeader } from './sections/header.js';
import { initHeroAnimation } from './sections/hero.js';
import { initAboutAnimation } from './sections/about.js';
import { initServices } from './sections/services.js';
import { initReviews } from './sections/reviews.js';
import { initFooter } from './sections/footer.js';

function startApp() {
  // Initialize Global Scripts
  initSmoothScroll();
  initHeader();

  // Initialize Section Scripts
  initHeroAnimation();
  initAboutAnimation();
  initServices();
  initReviews();
  initFooter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
