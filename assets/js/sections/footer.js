/**
 * JS module for Section 5 (Gallery & Footer)
 */

export function initFooter() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Gallery reveal
  gsap.from('.gallery-item', {
    scrollTrigger: {
      trigger: '.gallery-section',
      start: 'top 85%',
    },
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out'
  });

  // Footer left (Main CTA)
  gsap.from('.footer-left > *', {
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 85%',
    },
    opacity: 0,
    x: -30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Footer Middle & Right (Links & Contact)
  gsap.from('.footer-middle > *, .footer-right > *', {
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'top 85%',
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Footer Bottom (Logo & Copyright)
  gsap.from('.footer-bottom', {
    scrollTrigger: {
      trigger: '.site-footer',
      start: 'bottom 95%',
    },
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: 'power2.out'
  });
}
