// Hero Section Animations (Cinematic Entry + 3D Tilt + Scroll Scrubbing)
export function initHeroAnimation() {
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
  tl.to('.hero-headlight-flare', {
    opacity: 0.9,
    scale: 1.3,
    duration: 0.12,
    ease: 'power2.in'
  }, 1.1)
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
