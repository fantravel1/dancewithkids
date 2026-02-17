/* ============================================================
   DanceWithKids.com — Main JavaScript
   Vanilla JS | No Dependencies | ES6+
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ---------- Utility Functions ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const debounce = (fn, ms = 100) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
  const formatNumber = (n) => n.toLocaleString('en-US');

  /* ============================================================
     DANCE ROUTINE DATA
     ============================================================ */
  const danceRoutines = [
    { id: 1, title: "Sunny Bounce", titleEs: "Rebote Soleado", titleFr: "Rebond Ensoleillé", style: "pop", difficulty: "easy", duration: "2 min", ageRange: "3-6", description: "A cheerful bouncing routine with claps and simple side steps. Perfect for first-time dancers!", descriptionEs: "Una rutina alegre de rebotes con palmas y pasos laterales simples. ¡Perfecta para bailarines primerizos!", descriptionFr: "Une routine joyeuse de rebonds avec des claps et des pas latéraux simples. Parfait pour les débutants !", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop", featured: true },
    { id: 2, title: "Rhythm Wave", titleEs: "Ola Rítmica", titleFr: "Vague Rythmique", style: "pop", difficulty: "moderate", duration: "4 min", ageRange: "6-10", description: "Ride the wave with flowing arm movements, direction changes, and fun syncopated steps.", descriptionEs: "Surfea la ola con movimientos fluidos de brazos, cambios de dirección y pasos sincopados.", descriptionFr: "Surfez sur la vague avec des mouvements fluides des bras et des pas syncopés amusants.", image: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&h=400&fit=crop", featured: true },
    { id: 3, title: "Street Flow", titleEs: "Flujo Callejero", titleFr: "Flow Urbain", style: "hiphop", difficulty: "hard", duration: "5 min", ageRange: "9+", description: "Show your skills with combo stacking, tempo variations, and freestyle sections.", descriptionEs: "Muestra tus habilidades con combinaciones, variaciones de tempo y secciones de estilo libre.", descriptionFr: "Montrez vos talents avec des enchaînements, variations de tempo et sections freestyle.", image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=600&h=400&fit=crop", featured: true },
    { id: 4, title: "Tiny Toes Tap", titleEs: "Toque de Piececitos", titleFr: "Petits Pieds Tapeurs", style: "pop", difficulty: "easy", duration: "1.5 min", ageRange: "3-5", description: "Gentle toe-tapping and hand-waving for the littlest dancers.", descriptionEs: "Golpecitos suaves con los pies y movimientos de manos para los más pequeños.", descriptionFr: "Tapotements doux des pieds et mouvements de mains pour les tout-petits.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d7cf0?w=600&h=400&fit=crop", featured: false },
    { id: 5, title: "Afro Joy", titleEs: "Alegría Africana", titleFr: "Joie Afro", style: "afrobeat", difficulty: "moderate", duration: "3.5 min", ageRange: "6-10", description: "Feel the rhythm of Afrobeat with grounded footwork and joyful shoulder shimmies.", descriptionEs: "Siente el ritmo del Afrobeat con pasos firmes y movimientos alegres de hombros.", descriptionFr: "Ressentez le rythme de l'Afrobeat avec des pas ancrés et des mouvements joyeux des épaules.", image: "https://images.unsplash.com/photo-1590377547993-49e9e5f21aef?w=600&h=400&fit=crop", featured: false },
    { id: 6, title: "Salsa Kids", titleEs: "Salsa para Niños", titleFr: "Salsa Enfants", style: "latin", difficulty: "moderate", duration: "4 min", ageRange: "7-11", description: "Basic salsa steps, partner turns, and Latin hip movements made kid-friendly.", descriptionEs: "Pasos básicos de salsa, giros en pareja y movimientos latinos adaptados para niños.", descriptionFr: "Pas de salsa de base, tours en couple et mouvements latins adaptés aux enfants.", image: "https://images.unsplash.com/photo-1545959570-a94084071b5e?w=600&h=400&fit=crop", featured: false },
    { id: 7, title: "K-Pop Stars", titleEs: "Estrellas K-Pop", titleFr: "Stars K-Pop", style: "kpop", difficulty: "hard", duration: "5 min", ageRange: "9+", description: "Learn formation dance, synchronized moves, and iconic K-Pop point choreography.", descriptionEs: "Aprende baile de formación, movimientos sincronizados y coreografía icónica de K-Pop.", descriptionFr: "Apprenez la danse en formation, mouvements synchronisés et chorégraphie K-Pop iconique.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", featured: false },
    { id: 8, title: "Freeze Dance Party", titleEs: "Fiesta de Baile Congelado", titleFr: "Fête Danse Figée", style: "freestyle", difficulty: "easy", duration: "2 min", ageRange: "3-7", description: "Dance freely, then FREEZE when the music stops! A classic game turned dance lesson.", descriptionEs: "¡Baila libremente y CONGÉLATE cuando pare la música! Un juego clásico convertido en lección.", descriptionFr: "Dansez librement, puis FIGEZ-VOUS quand la musique s'arrête ! Un classique revisité.", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&h=400&fit=crop", featured: false },
    { id: 9, title: "Hip Hop Basics", titleEs: "Básicos de Hip Hop", titleFr: "Bases du Hip Hop", style: "hiphop", difficulty: "easy", duration: "2 min", ageRange: "5-8", description: "Learn the bounce, the rock, and basic grooves that form the foundation of hip hop.", descriptionEs: "Aprende el rebote, el balanceo y los grooves básicos que forman la base del hip hop.", descriptionFr: "Apprenez le bounce, le rock et les grooves de base du hip hop.", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&h=400&fit=crop", featured: false },
    { id: 10, title: "Family Circle Dance", titleEs: "Baile en Círculo Familiar", titleFr: "Danse en Cercle Familiale", style: "freestyle", difficulty: "easy", duration: "3 min", ageRange: "All ages", description: "Hold hands, dance in a circle, and take turns showing your best move!", descriptionEs: "¡Tómense de las manos, bailen en círculo y túrnense para mostrar su mejor movimiento!", descriptionFr: "Tenez-vous les mains, dansez en cercle et montrez votre meilleur mouvement à tour de rôle !", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop", featured: false },
    { id: 11, title: "Beat Box Moves", titleEs: "Movimientos Beatbox", titleFr: "Mouvements Beatbox", style: "instrumental", difficulty: "moderate", duration: "3.5 min", ageRange: "7-11", description: "Dance to beatbox rhythms with body percussion, stomps, and snaps.", descriptionEs: "Baila al ritmo del beatbox con percusión corporal, pisotones y chasquidos.", descriptionFr: "Dansez sur des rythmes beatbox avec percussions corporelles et claquements.", image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop", featured: false },
    { id: 12, title: "Ballet Basics", titleEs: "Básicos de Ballet", titleFr: "Bases du Ballet", style: "freestyle", difficulty: "moderate", duration: "4 min", ageRange: "5-10", description: "Graceful pliés, relevés, and arabesques made accessible for young dancers.", descriptionEs: "Pliés, relevés y arabesques elegantes hechos accesibles para jóvenes bailarines.", descriptionFr: "Pliés, relevés et arabesques élégants rendus accessibles aux jeunes danseurs.", image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&h=400&fit=crop", featured: false },
    { id: 13, title: "Carnival Vibes", titleEs: "Vibras de Carnaval", titleFr: "Ambiance Carnaval", style: "latin", difficulty: "hard", duration: "5.5 min", ageRange: "9+", description: "High-energy samba-inspired routine with quick footwork and expressive arms.", descriptionEs: "Rutina de alta energía inspirada en samba con pasos rápidos y brazos expresivos.", descriptionFr: "Routine haute énergie inspirée de la samba avec jeux de pieds rapides et bras expressifs.", image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop", featured: false },
    { id: 14, title: "Chill Groove", titleEs: "Groove Tranquilo", titleFr: "Groove Détendu", style: "instrumental", difficulty: "easy", duration: "2 min", ageRange: "4-8", description: "Slow, relaxed movements perfect for winding down or warming up gently.", descriptionEs: "Movimientos lentos y relajados perfectos para relajarse o calentar suavemente.", descriptionFr: "Mouvements lents et relaxants parfaits pour se détendre ou s'échauffer en douceur.", image: "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=600&h=400&fit=crop", featured: false },
    { id: 15, title: "Pop Star Choreo", titleEs: "Coreo de Estrella Pop", titleFr: "Choré de Star Pop", style: "pop", difficulty: "hard", duration: "5 min", ageRange: "9+", description: "Performance-ready pop choreography with sharp hits, waves, and formations.", descriptionEs: "Coreografía pop lista para actuar con golpes precisos, ondas y formaciones.", descriptionFr: "Chorégraphie pop prête pour la scène avec frappes précises, vagues et formations.", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&h=400&fit=crop", featured: false },
    { id: 16, title: "Afro Fusion Fire", titleEs: "Fuego Afro Fusión", titleFr: "Feu Afro Fusion", style: "afrobeat", difficulty: "hard", duration: "5 min", ageRange: "10+", description: "Advanced Afrobeat with complex polyrhythmic footwork and dynamic isolations.", descriptionEs: "Afrobeat avanzado con pasos polirrítmicos complejos y aislamientos dinámicos.", descriptionFr: "Afrobeat avancé avec jeux de pieds polyrythmiques complexes et isolations dynamiques.", image: "https://images.unsplash.com/photo-1596464716127-f2a6d550afd2?w=600&h=400&fit=crop", featured: false },
    { id: 17, title: "Silly Wiggles", titleEs: "Meneos Divertidos", titleFr: "Tortillements Rigolos", style: "freestyle", difficulty: "easy", duration: "1.5 min", ageRange: "2-5", description: "Wiggle, shake, and giggle! Pure silliness that gets toddlers moving.", descriptionEs: "¡Menéate, sacúdete y ríete! Pura diversión para que los pequeños se muevan.", descriptionFr: "Tortillez-vous, secouez-vous et rigolez ! De la pure folie pour faire bouger les tout-petits.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", featured: false },
    { id: 18, title: "Robot Dance", titleEs: "Baile Robot", titleFr: "Danse Robot", style: "pop", difficulty: "moderate", duration: "3 min", ageRange: "6-10", description: "Learn popping, locking, and mechanical movements in this fun robot-themed routine.", descriptionEs: "Aprende popping, locking y movimientos mecánicos en esta divertida rutina temática de robot.", descriptionFr: "Apprenez le popping, le locking et des mouvements mécaniques dans cette routine thème robot.", image: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop", featured: false },
    { id: 19, title: "World Rhythms", titleEs: "Ritmos del Mundo", titleFr: "Rythmes du Monde", style: "afrobeat", difficulty: "easy", duration: "2.5 min", ageRange: "4-8", description: "Travel the world through dance with simple moves from 5 different cultures.", descriptionEs: "Viaja por el mundo a través del baile con movimientos simples de 5 culturas diferentes.", descriptionFr: "Voyagez autour du monde par la danse avec des mouvements simples de 5 cultures différentes.", image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&h=400&fit=crop", featured: false },
    { id: 20, title: "K-Pop Intro", titleEs: "Intro K-Pop", titleFr: "Intro K-Pop", style: "kpop", difficulty: "moderate", duration: "3.5 min", ageRange: "7-11", description: "Get started with K-Pop basics: point choreography, group formations, and clean transitions.", descriptionEs: "Comienza con lo básico del K-Pop: coreografía de puntos, formaciones grupales y transiciones limpias.", descriptionFr: "Débutez avec les bases du K-Pop : chorégraphie de points, formations de groupe et transitions nettes.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", featured: false }
  ];

  /* ============================================================
     COOKIE BANNER
     ============================================================ */
  const cookieBanner = $('.cookie-banner');
  if (cookieBanner && !localStorage.getItem('dwk-cookies')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 1500);
    const accept = $('.btn-accept', cookieBanner);
    const decline = $('.btn-decline', cookieBanner);
    if (accept) accept.addEventListener('click', () => { localStorage.setItem('dwk-cookies', 'accepted'); cookieBanner.classList.remove('visible'); });
    if (decline) decline.addEventListener('click', () => { localStorage.setItem('dwk-cookies', 'declined'); cookieBanner.classList.remove('visible'); });
  }

  /* ============================================================
     HEADER / SMART STICKY NAV
     ============================================================ */
  const header = $('.header');
  let lastScroll = 0;
  const handleScroll = debounce(() => {
    const y = window.scrollY;
    if (!header) return;
    // Transparent vs solid
    if (y > 80) {
      header.classList.remove('transparent');
      header.classList.add('solid');
    } else {
      header.classList.add('transparent');
      header.classList.remove('solid');
    }
    // Hide on scroll down, show on scroll up
    if (y > 400) {
      header.classList.toggle('hidden', y > lastScroll);
    } else {
      header.classList.remove('hidden');
    }
    lastScroll = y;
    // Back to top button
    const btt = $('.back-to-top');
    if (btt) btt.classList.toggle('visible', y > 600);
  }, 10);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  const hamburger = $('.hamburger');
  const mobileMenu = $('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
    $$('a', mobileMenu).forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  /* ============================================================
     LANGUAGE SWITCHER
     ============================================================ */
  const langBtn = $('.lang-btn');
  const langDropdown = $('.lang-dropdown');
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    });
    document.addEventListener('click', () => langDropdown.classList.remove('open'));
  }

  /* ============================================================
     SMOOTH SCROLLING
     ============================================================ */
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = $(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 10 : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        history.replaceState(null, '', anchor.getAttribute('href'));
      }
    });
  });

  /* ============================================================
     SCROLL ANIMATIONS (Intersection Observer)
     ============================================================ */
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  $$('.animate-on-scroll, .stagger-item').forEach(el => animateObserver.observe(el));

  /* ============================================================
     ANIMATED COUNTERS
     ============================================================ */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        const animate = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(easeOut(progress) * target);
          el.textContent = formatNumber(value) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  $$('[data-target]').forEach(el => counterObserver.observe(el));

  /* ============================================================
     DIFFICULTY TOGGLE (Today's Challenge)
     ============================================================ */
  const difficultyTabs = $$('.difficulty-tab');
  const challengePanels = $$('.challenge-panel');
  difficultyTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const diff = tab.dataset.difficulty;
      difficultyTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      challengePanels.forEach(p => {
        p.classList.remove('active');
        if (p.dataset.difficulty === diff) p.classList.add('active');
      });
      localStorage.setItem('dwk-difficulty', diff);
    });
  });
  // Restore preference
  const savedDiff = localStorage.getItem('dwk-difficulty');
  if (savedDiff) {
    const tab = $(`.difficulty-tab[data-difficulty="${savedDiff}"]`);
    if (tab) tab.click();
  }

  /* ============================================================
     DANCE STYLE FILTER
     ============================================================ */
  const styleFilters = $$('.style-filter-btn');
  const styleCards = $$('[data-style]');
  styleFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      const style = btn.dataset.filter;
      styleFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      styleCards.forEach(card => {
        if (style === 'all' || card.dataset.style === style) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ============================================================
     TESTIMONIAL CAROUSEL
     ============================================================ */
  const carousel = $('.testimonial-carousel');
  if (carousel) {
    const track = $('.testimonial-track', carousel);
    const slides = $$('.testimonial-slide', carousel);
    const dots = $$('.carousel-dot', carousel);
    const prevBtn = $('.carousel-prev', carousel);
    const nextBtn = $('.carousel-next', carousel);
    let current = 0;
    let autoPlay;

    const goTo = (index) => {
      current = ((index % slides.length) + slides.length) % slides.length;
      if (track) track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    };

    const startAutoPlay = () => { autoPlay = setInterval(() => goTo(current + 1), 5000); };
    const stopAutoPlay = () => clearInterval(autoPlay);

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); stopAutoPlay(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); stopAutoPlay(); startAutoPlay(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); stopAutoPlay(); startAutoPlay(); }));

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; stopAutoPlay(); }, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
      isDragging = false;
      startAutoPlay();
    }, { passive: true });

    startAutoPlay();
  }

  /* ============================================================
     FAQ ACCORDION
     ============================================================ */
  $$('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      $$('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ============================================================
     NEWSLETTER FORM
     ============================================================ */
  const nlForm = $('.newsletter-form');
  if (nlForm) {
    let submitted = false;
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitted) return;
      const email = $('input[type="email"]', nlForm);
      if (!email || !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        email.style.borderColor = 'var(--accent3)';
        email.focus();
        return;
      }
      submitted = true;
      const btn = $('button', nlForm);
      if (btn) { btn.textContent = '✓'; btn.style.background = 'var(--accent2)'; btn.style.color = '#fff'; }
      const success = $('.newsletter-success');
      if (success) success.classList.add('visible');
      nlForm.style.opacity = '0.6';
      nlForm.style.pointerEvents = 'none';
    });
  }

  /* ============================================================
     DANCE CHALLENGE DAILY ROTATION
     ============================================================ */
  const challengeSection = $('#challenge');
  if (challengeSection) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const easyRoutines = danceRoutines.filter(r => r.difficulty === 'easy');
    const modRoutines = danceRoutines.filter(r => r.difficulty === 'moderate');
    const hardRoutines = danceRoutines.filter(r => r.difficulty === 'hard');
    const todayEasy = easyRoutines[dayOfYear % easyRoutines.length];
    const todayMod = modRoutines[dayOfYear % modRoutines.length];
    const todayHard = hardRoutines[dayOfYear % hardRoutines.length];

    // Update challenge panels with daily data
    const lang = document.documentElement.lang || 'en';
    const getTitle = (r) => lang === 'es' ? r.titleEs : lang === 'fr' ? r.titleFr : r.title;
    const getDesc = (r) => lang === 'es' ? r.descriptionEs : lang === 'fr' ? r.descriptionFr : r.description;

    const panels = { easy: todayEasy, moderate: todayMod, hard: todayHard };
    Object.entries(panels).forEach(([diff, routine]) => {
      if (!routine) return;
      const panel = $(`.challenge-panel[data-difficulty="${diff}"]`);
      if (!panel) return;
      const h3 = $('h3', panel);
      if (h3) h3.textContent = getTitle(routine);
      const desc = $('.challenge-desc', panel);
      if (desc) desc.textContent = getDesc(routine);
    });

    // Update challenge image
    const challengeImg = $('.challenge-image img', challengeSection);
    if (challengeImg && todayEasy) challengeImg.src = todayEasy.image;
  }

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  const backToTop = $('.back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     LAZY LOADING IMAGES
     ============================================================ */
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    $$('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  /* ============================================================
     PARALLAX HERO (subtle)
     ============================================================ */
  const heroBg = $('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        requestAnimationFrame(() => {
          heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
        });
      }
    }, { passive: true });
  }

  /* ============================================================
     ACTIVE NAV LINK HIGHLIGHTING
     ============================================================ */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a');
  const highlightNav = debounce(() => {
    const y = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (y >= top && y < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
        });
      }
    });
  }, 50);
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ============================================================
     REDUCED MOTION DETECTION
     ============================================================ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    $$('.animate-on-scroll, .stagger-item').forEach(el => {
      el.classList.add('visible');
      el.style.transition = 'none';
    });
  }

  /* ============================================================
     GLOBAL STATS DATA
     ============================================================ */
  window.DWK = {
    stats: {
      totalRoutines: 500,
      happyFamilies: 50000,
      countries: 30,
      safetyRating: 100,
      easyRoutines: 250,
      moderateRoutines: 150,
      hardRoutines: 100,
      microLessons: 75,
      danceStyles: 7,
      avgSessionMinutes: 18,
      familyModeRoutines: 60,
      skillBadges: 24
    },
    routines: danceRoutines
  };

  console.log('DanceWithKids.com loaded successfully!');
});
