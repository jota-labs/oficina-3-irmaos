/**
 * JS module for Section 3 (Services)
 * Implements a horizontal scroll effect for the service cards
 */

export function initServices() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn("GSAP ou ScrollTrigger não carregados.");
    return;
  }

  const track = document.querySelector('.services-track');
  const cards = gsap.utils.toArray('.service-card');
  const section = document.querySelector('.services-section');

  if (!track || cards.length === 0 || !section) return;

  // Header animations
  gsap.from('.services-accent-bar', {
    scrollTrigger: {
      trigger: '.services-header',
      start: 'top 80%',
    },
    scaleY: 0,
    transformOrigin: 'top',
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.services-eyebrow-text', {
    scrollTrigger: {
      trigger: '.services-header',
      start: 'top 80%',
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.services-description, .services-area', {
    scrollTrigger: {
      trigger: '.services-header',
      start: 'top 80%',
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.4,
    ease: 'power3.out'
  });

  // Calculate the total width to scroll horizontally
  function getScrollAmount() {
    let trackWidth = track.scrollWidth;
    let windowWidth = window.innerWidth;
    return -(trackWidth - windowWidth);
  }

  // Use GSAP matchMedia to only apply the pinning horizontal scroll on Desktop
  let mm = gsap.matchMedia();

  mm.add("(min-width: 769px)", () => {
    // Desktop: Pinning and Horizontal Scroll
    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: ".services-slider-wrap",
      start: "top 20%",
      end: () => `+=${getScrollAmount() * -1}`, 
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true 
    });

    cards.forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          containerAnimation: tween,
        },
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });

  mm.add("(max-width: 768px)", () => {
    // Mobile: simple vertical fade in (cards will use native CSS horizontal scroll)
    gsap.from(cards, {
      scrollTrigger: {
        trigger: ".services-slider-wrap",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
}
