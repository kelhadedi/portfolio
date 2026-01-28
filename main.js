// ============================
// AOS - animations au scroll
// ============================
if (window.AOS) {
  AOS.init({
    duration: 400,
    offset: 120,
    once: true,
    mirror: false
  });
}

// ============================
// Bulle contact ( ? en bas )
// ============================
(() => {
  const contactToggle = document.getElementById('contactToggle');
  const contactPanel  = document.getElementById('contactPanel');

  if (!contactToggle || !contactPanel) return;

  contactToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = contactPanel.classList.toggle('open');
    contactToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  contactPanel.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', () => {
    if (contactPanel.classList.contains('open')) {
      contactPanel.classList.remove('open');
      contactToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ============================
// Bouton "retour haut"
// ============================
(() => {
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (!backToTopBtn) return;

  const toggleBackToTop = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    backToTopBtn.style.display = scrollTop > 200 ? 'block' : 'none';
  };

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================
// Navbar mobile & fermeture
// ============================
(() => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarNav');
  const body = document.body;

  if (!navbarToggler || !navbarCollapse) return;

  // fermer si clic en dehors de la navbar
  document.addEventListener('click', (event) => {
    const isClickInsideNav = event.target.closest('#navbar-top');
    if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  });

  // fermeture sur clic lien
  document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#navbarNav .nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbarCollapse.classList.remove('show');
        body.classList.remove('nav-open');
      });
    });
  });
})();

// ============================
// Lightbox image projets
// ============================
(() => {
  const zoomImages      = document.querySelectorAll('.project-zoom-img');
  const lightbox        = document.getElementById('image-lightbox');
  const lightboxImg     = document.getElementById('image-lightbox-img');
  const lightboxContent = document.querySelector('.image-lightbox-content');

  if (!zoomImages.length || !lightbox || !lightboxImg || !lightboxContent) return;

  const openLightbox = (img) => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    lightboxContent.classList.remove('image-lightbox-content--small');
    if (
      img.alt.includes('LocFit') ||
      img.alt.includes('KeySwitch') ||
      img.alt.includes('La Roche-Jagu')
    ) {
      lightboxContent.classList.add('image-lightbox-content--small');
    }

    lightbox.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.add('d-none');
    lightboxImg.src = '';
    lightboxContent.classList.remove('image-lightbox-content--small');
    document.body.style.overflow = '';
  };

  zoomImages.forEach((img) => {
    img.addEventListener('click', () => openLightbox(img));
  });

  lightbox.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('image-lightbox-backdrop') ||
      e.target.classList.contains('image-lightbox-close')
    ) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('d-none')) {
      closeLightbox();
    }
  });
})();

// ============================
// Scroll spy - lien de nav actif
// ============================
(() => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const setActiveLink = () => {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 160;
      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active-section');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-section');
      }
    });
  };

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
})();

// ============================
// Parallax léger sur la section home
// ============================
(() => {
  const homeSection = document.querySelector('.home');
  if (!homeSection) return;

  const updateBackground = () => {
    const offset = window.pageYOffset;
    homeSection.style.backgroundPositionY = offset * 0.2 + 'px';
  };

  window.addEventListener('scroll', updateBackground);
  updateBackground();
})();

// ============================
// Filtres projets par domaine
// ============================
(() => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-cv-card');
  const emptyMsg      = document.getElementById('portfolio-empty-msg');

  if (!filterButtons.length || !projectCards.length) return;

  const applyFilter = (filter) => {
    let visibleCount = 0;

    projectCards.forEach((card) => {
      const cats = (card.dataset.category || '')
        .split(' ')
        .filter(Boolean);

      const match = filter === 'all' || cats.includes(filter);

      card.classList.toggle('is-hidden', !match);
      if (match) visibleCount++;
    });

    if (emptyMsg) {
      if (visibleCount === 0 && filter !== 'all') {
        emptyMsg.style.display = 'block';
      } else {
        emptyMsg.style.display = 'none';
      }
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // filtre initial
  applyFilter('all');
})();
