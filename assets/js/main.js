import { initSmoothScroll } from './global/smooth-scroll.js';
import { initHeroAnimation } from './sections/hero.js';
import { initAboutAnimation } from './sections/about.js';
import { initServices } from './sections/services.js';
import { initReviews } from './sections/reviews.js';
import { initFooter } from './sections/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global Scripts
  initSmoothScroll();

  // Initialize Section Scripts
  initHeroAnimation();
  initAboutAnimation();
  initServices();
  initReviews();
  initFooter();
});
