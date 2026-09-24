/**
 * JS module for Section 4 (Reviews & Before/After)
 */

export function initReviews() {
  const sliderInput = document.querySelector('.compare-input');
  const beforeImage = document.querySelector('.compare-before');
  const sliderHandle = document.querySelector('.compare-handle');

  if (sliderInput && beforeImage && sliderHandle) {
    // Update the clip-path and handle position based on input range value
    sliderInput.addEventListener('input', (e) => {
      const sliderVal = e.target.value;
      
      // Update clip-path for the before image
      beforeImage.style.clipPath = `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)`;
      
      // Move the handle
      sliderHandle.style.left = `${sliderVal}%`;
    });
  }

  // GSAP Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    
    // Header reveal
    gsap.from('.ba-header > *', {
      scrollTrigger: {
        trigger: '.ba-header',
        start: 'top 85%',
      },
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Slider reveal
    gsap.from('.compare-slider', {
      scrollTrigger: {
        trigger: '.compare-slider',
        start: 'top 80%',
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    });

    // Reviews text reveal
    gsap.from('.reviews-left', {
      scrollTrigger: {
        trigger: '.reviews-grid-area',
        start: 'top 80%',
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Review cards stagger
    gsap.from('.review-card', {
      scrollTrigger: {
        trigger: '.reviews-grid-area',
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out'
    });
  }
}
