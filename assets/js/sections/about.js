// About Section Animations (ScrollTrigger Reveal + Image Parallax)
export function initAboutAnimation() {
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
