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

const burgerBtn    = document.getElementById('burger-btn');
const burgerIcon   = burgerBtn.querySelector('.burger-icon');
const burgerMenu   = document.getElementById('burger-menu');
const burgerLinks  = document.querySelectorAll('.burger-link');

function openBurger() {
  burgerMenu.classList.add('open');
  burgerIcon.classList.add('is-open');
  burgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeBurger() {
  burgerMenu.classList.remove('open');
  burgerIcon.classList.remove('is-open');
  burgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function toggleBurger() {
  burgerMenu.classList.contains('open') ? closeBurger() : openBurger();
}

// Toggle au clic sur le bouton
burgerBtn.addEventListener('click', toggleBurger);

// Fermer en cliquant sur un lien
burgerLinks.forEach(link => link.addEventListener('click', closeBurger));

// Fermer en cliquant en dehors du burger-inner
burgerMenu.addEventListener('click', e => {
  if (!e.target.closest('.burger-inner')) closeBurger();
});

// Fermer avec Échap
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeBurger();
});

(() => {
  // Compteurs animés
  const statNumbers = document.querySelectorAll('.about-stat-number[data-count]');
  if (statNumbers.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const duration = 900;
          const step = duration / target;
          let current = 0;
          const timer = setInterval(() => {
            current++;
            el.textContent = current;
            if (current >= target) clearInterval(timer);
          }, step);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach((el) => countObserver.observe(el));
  }
})();

// ============================
// Carte France — D3 GeoJSON
// ============================
(() => {
  const VISITED = {
    "53": { tooltip: "Bretagne · 2e et 3e année de BUT MMI à Lannion" },
    "52": { tooltip: "Pays de la Loire · Stage Orange Business à Nantes" },
    "93": { tooltip: "Provence-Alpes-Côte d'Azur · Né à Marseille" },
    "94": { tooltip: "Corse · 1ère année de BUT MMI" },
  };

  const svgEl   = document.getElementById("franceSvg");
  const tooltip = document.getElementById("mapTooltip");
  const mapWrap = document.querySelector(".travel-france-map-container");

  if (!svgEl || !tooltip || !mapWrap) return;

  const width  = 600;
  const height = 620;

  const projection = d3.geoConicConformal()
    .center([2.454071, 46.279229])
    .scale(2800)
    .translate([width / 2, height / 2]);

  const pathGen = d3.geoPath().projection(projection);

  // GeoJSON officiel simplifié — régions métropolitaines
  const GEOJSON_URL = "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson";

  d3.json(GEOJSON_URL).then((data) => {
    const svg = d3.select("#franceSvg");

    svg.selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", pathGen)
      .attr("class", (d) => {
        const code = String(d.properties.code);
        return VISITED[code] ? "fr-region fr-visited" : "fr-region fr-other";
      })
      .on("mouseenter", function(event, d) {
        const code = String(d.properties.code);
        if (!VISITED[code]) return;
        tooltip.textContent = VISITED[code].tooltip;
        tooltip.classList.add("visible");
      })
      .on("mousemove", function(event) {
        const rect = mapWrap.getBoundingClientRect();
        tooltip.style.left = (event.clientX - rect.left + 14) + "px";
        tooltip.style.top  = (event.clientY - rect.top  - 40) + "px";
      })
      .on("mouseleave", function() {
        tooltip.classList.remove("visible");
      });

  }).catch(() => {
    console.warn("Carte France : GeoJSON non chargé.");
  });
})();

// ============================
// À propos — barres langues + compteurs
// ============================
(() => {
  // Barres langues
  const langBars = document.querySelectorAll('.about-lang-bar');
  if (langBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar   = entry.target;
          const level = bar.getAttribute('data-level') || '0';
          bar.style.setProperty('--lang-level', level + '%');
          bar.classList.add('is-animated');
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    langBars.forEach((b) => barObserver.observe(b));
  }

  // Compteurs animés
  const statNumbers = document.querySelectorAll('.about-stat-number[data-count]');
  if (statNumbers.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const step   = Math.ceil(900 / target);
          let current  = 0;
          const timer  = setInterval(() => {
            current++;
            el.textContent = current;
            if (current >= target) clearInterval(timer);
          }, step);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach((el) => countObserver.observe(el));
  }
})();

document.querySelectorAll('[data-lightbox]').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-lightbox');
    const lightbox = document.querySelector('.image-lightbox');
    const img = lightbox.querySelector('img');
    img.src = src;
    lightbox.classList.remove('d-none');
  });
});

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
    if (scrollTop > 200) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1800);
});


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
// Animations timeline expériences
// ============================
(() => {
  const items = document.querySelectorAll('.experience-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item) => observer.observe(item));
})();

// ============================
// Animations extra-experience
// ============================
(() => {
  const cards = document.querySelectorAll('.extra-exp-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
})();

// ============================
// Animations formations
// ============================
(() => {
  const cards = document.querySelectorAll('.education-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
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
