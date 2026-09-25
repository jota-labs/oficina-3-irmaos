/* Oficina 3 Irmãos - Unified Production JS Bundle */

/* --- assets/js/global/smooth-scroll.js --- */
// Header scroll effect & Lenis Smooth Scroll
function initSmoothScroll() {
  // Inicialização do Lenis Smooth Scroll
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Conectar com GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // Header scroll state
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}


/* --- assets/js/sections/header.js --- */
// Header Mobile Navigation Toggle & Scroll State
function initHeader() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.header-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !nav) return;

  function toggleMenu(isOpen) {
    const shouldOpen = typeof isOpen === 'boolean' ? isOpen : !nav.classList.contains('active');
    
    toggleBtn.classList.toggle('active', shouldOpen);
    nav.classList.toggle('active', shouldOpen);
    if (header) header.classList.toggle('menu-open', shouldOpen);
    toggleBtn.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    
    if (shouldOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  // Handle click on hamburger button
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close when clicking outside the nav menu
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Header scroll shadow state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  }, { passive: true });
}


/* --- assets/js/sections/hero.js --- */
// Hero Section Animations (Cinematic Entry + 3D Tilt + Scroll Scrubbing)
function initHeroAnimation() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 1. Marca d'água gigante ao fundo: revelação suave e nitidez
  tl.fromTo('.hero-watermark', 
    { opacity: 0, scale: 1.08 },
    { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
    0.1
  );

  // 2. Barra de acento laser vermelha crescendo
  tl.fromTo('.hero-accent-bar',
    { scaleY: 0 },
    { scaleY: 1, duration: 0.7, ease: 'power4.out' },
    0.3
  );

  // 3. Subtítulo em itálico
  tl.fromTo('.hero-eyebrow-text',
    { opacity: 0, x: -25 },
    { opacity: 1, x: 0, duration: 0.6 },
    0.45
  );

  // 4. Revelação Editorial das Linhas do Título (Awwwards Mask Effect)
  tl.fromTo('.hero-title-inner',
    { yPercent: 125, opacity: 0 },
    { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power4.out' },
    0.4
  );

  // 5. Botões de Ação
  tl.fromTo('.hero-actions .btn',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, stagger: 0.15, duration: 0.7 },
    0.8
  );

  // 6. Entrada da Moto com inércia esportiva
  tl.fromTo('.hero-moto-img',
    { opacity: 0, x: 80, scale: 0.96 },
    { opacity: 1, x: 0, scale: 1, duration: 1.3, ease: 'power3.out' },
    0.45
  );

  tl.fromTo('.hero-ground-shadow',
    { opacity: 0, scaleX: 0.6 },
    { opacity: 1, scaleX: 1, duration: 1.3, ease: 'power3.out' },
    0.45
  );

  // 7. Flash de Ignição no Farol de LED (Pulsos rápidos de luz ao ligar a moto)
  // Movido para a seção de ScrollTrigger abaixo para garantir que o cliente veja a animação
  // mesmo no mobile, quando a moto ficar visível na tela.

  // 8. Barra Inferior com Contatos
  tl.fromTo('.hero-footer-bar',
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.8 },
    1.0
  );

  // ============================================
  // INTERATIVIDADE: 3D Tilt Suave com o Mouse
  // ============================================
  const heroVisual = document.querySelector('.hero-visual');
  const imageWrap = document.querySelector('.hero-image-wrap');
  const groundShadow = document.querySelector('.hero-ground-shadow');

  if (heroVisual && imageWrap && window.innerWidth > 992) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(imageWrap, {
        rotationY: x * 14,
        rotationX: -y * 12,
        x: x * 20,
        y: y * 15,
        duration: 0.7,
        ease: 'power1.out'
      });

      if (groundShadow) {
        gsap.to(groundShadow, {
          x: -x * 15,
          scaleX: 1 - Math.abs(x) * 0.1,
          duration: 0.7,
          ease: 'power1.out'
        });
      }
    });

    heroVisual.addEventListener('mouseleave', () => {
      gsap.to(imageWrap, {
        rotationY: 0,
        rotationX: 0,
        x: 0,
        y: 0,
        duration: 1.1,
        ease: 'power2.out'
      });

      if (groundShadow) {
        gsap.to(groundShadow, {
          x: 0,
          scaleX: 1,
          duration: 1.1,
          ease: 'power2.out'
        });
      }
    });
  }

  // ============================================
  // SCROLLTRIGGER: Parallax Scrubbing no Scroll
  // ============================================
  if (typeof ScrollTrigger !== 'undefined') {
    
    // Animação do Farol (só dispara quando a moto entra na tela)
    const flashTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-visual',
        start: 'top 75%' // Dispara quando o topo da moto atinge 75% da altura da tela (visível no mobile)
      }
    });

    flashTl.to('.hero-headlight-flare', {
      opacity: 0.9,
      scale: 1.3,
      duration: 0.12,
      ease: 'power2.in',
      delay: 0.2
    })
    .to('.hero-headlight-flare', {
      opacity: 0.2,
      scale: 0.9,
      duration: 0.08
    })
    .to('.hero-headlight-flare', {
      opacity: 1,
      scale: 1.5,
      duration: 0.18,
      ease: 'power1.out'
    })
    .to('.hero-headlight-flare', {
      opacity: 0,
      scale: 0.8,
      duration: 0.45,
      ease: 'power2.inOut'
    });
    // Parallax da Moto
    gsap.to('.hero-moto-img', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      y: 60,
      scale: 1.04,
      ease: 'none'
    });

    // Parallax da Marca D'água
    gsap.to('.hero-watermark', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.8
      },
      y: 70,
      ease: 'none'
    });
  }
}


/* --- assets/js/sections/about.js --- */
// About Section Animations (ScrollTrigger Reveal + Image Parallax)
function initAboutAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const aboutSection = document.querySelector('.about-section');
  if (!aboutSection) return;

  // 1. Revelação dos Elementos de Texto ao rolar até a seção
  const textElements = document.querySelectorAll('.about-content > *');
  gsap.fromTo(textElements,
    { opacity: 0, y: 35 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );

  // 2. Revelação e Parallax das Fotos Escalonadas
  const imgTop = document.querySelector('.about-img-top');
  const imgBottom = document.querySelector('.about-img-bottom');
  const expBadge = document.querySelector('.about-experience-badge');

  if (imgTop && imgBottom) {
    // Entrada inicial das fotos
    gsap.fromTo([imgTop, imgBottom],
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-images-wrap',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      }
    );

    if (expBadge) {
      gsap.fromTo(expBadge,
        { opacity: 0, scale: 0.8, x: -20 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          delay: 0.4,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.about-images-wrap',
            start: 'top 78%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Parallax de profundidade no Scroll (foto de cima e de baixo em velocidades distintas)
    gsap.to(imgTop, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    gsap.to(imgBottom, {
      y: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  // 3. Checklist Items entrada sequencial com check pop
  const checkItems = document.querySelectorAll('.about-check-item');
  if (checkItems.length > 0) {
    gsap.fromTo(checkItems,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.09,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-checklist',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
}


/* --- assets/js/sections/services.js --- */
/**
 * JS module for Section 3 (Services)
 * Implements a horizontal scroll effect for the service cards
 */

function initServices() {
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


/* --- assets/js/sections/reviews.js --- */
/**
 * JS module for Section 4 (Reviews & Before/After)
 */

function initReviews() {
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


/* --- assets/js/sections/faq.js --- */
// FAQ Accordion Interaction
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default for great UX
  const firstItem = faqItems[0];
  if (firstItem) {
    firstItem.classList.add('active');
    const firstAnswer = firstItem.querySelector('.faq-answer');
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }
}


/* --- assets/js/sections/footer.js --- */
/**
 * JS module for Section 5 (Gallery & Footer)
 */

function initFooter() {
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


// Auto-initialize when DOM is ready
function startApp() {
  if (typeof initSmoothScroll === 'function') initSmoothScroll();
  if (typeof initHeader === 'function') initHeader();
  if (typeof initHeroAnimation === 'function') initHeroAnimation();
  if (typeof initAboutAnimation === 'function') initAboutAnimation();
  if (typeof initServices === 'function') initServices();
  if (typeof initReviews === 'function') initReviews();
  if (typeof initFaq === 'function') initFaq();
  if (typeof initFooter === 'function') initFooter();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}
