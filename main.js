// ============================
// AOS - animations au scroll
// ============================
if (window.AOS) {
  AOS.init({
    duration: 400,
    offset: 120,
    once: false,
    mirror: false
  });
}

// ============================
// Bulle contact ( ? en bas )
// ============================
const contactToggle = document.getElementById('contactToggle');
const contactPanel  = document.getElementById('contactPanel');

if (contactToggle && contactPanel) {
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
}

// ============================
// Bouton "retour haut"
// ============================
const backToTopBtn = document.getElementById("btn-back-to-top");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    backToTopBtn.style.display = scrollTop > 200 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarNav');

if (navbarToggler && navbarCollapse) {
  document.addEventListener('click', (event) => {
    const isClickInsideNav = event.target.closest('#navbar-top');

    // si clic en dehors de la navbar et menu ouvert
    if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  });
}

// ============================
// Lightbox image projets
// ============================
const zoomImages     = document.querySelectorAll(".project-zoom-img");
const lightbox       = document.getElementById("image-lightbox");
const lightboxImg    = document.getElementById("image-lightbox-img");
const lightboxContent= document.querySelector(".image-lightbox-content");

if (zoomImages.length && lightbox && lightboxImg && lightboxContent) {
  zoomImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      lightboxContent.classList.remove("image-lightbox-content--small");

      if (
        img.alt.includes("LocFit") ||
        img.alt.includes("KeySwitch") ||
        img.alt.includes("La Roche-Jagu")
      ) {
        lightboxContent.classList.add("image-lightbox-content--small");
      }

      lightbox.classList.remove("d-none");
      document.body.style.overflow = "hidden";
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("image-lightbox-backdrop") ||
      e.target.classList.contains("image-lightbox-close")
    ) {
      lightbox.classList.add("d-none");
      lightboxImg.src = "";
      lightboxContent.classList.remove("image-lightbox-content--small");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("d-none")) {
      lightbox.classList.add("d-none");
      lightboxImg.src = "";
      lightboxContent.classList.remove("image-lightbox-content--small");
      document.body.style.overflow = "";
    }
  });
}

// ============================
// Scroll spy - lien de nav actif
// ============================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

if (sections.length && navLinks.length) {
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active-section");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active-section");
      }
    });
  });
}

// ============================
// Parallax léger sur la section home
// ============================
const homeSection = document.querySelector(".home");

if (homeSection) {
  window.addEventListener("scroll", () => {
    const offset = window.pageYOffset;
    homeSection.style.backgroundPositionY = offset * 0.2 + "px";
  });
}

// ============================
// Filtres projets par domaine
// ============================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.project-cv-card');
const emptyMsg      = document.getElementById('portfolio-empty-msg');

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      projectCards.forEach(card => {
        const cats = (card.dataset.category || '')
          .split(' ')
          .filter(Boolean);

        if (filter === 'all' || cats.includes(filter)) {
          card.classList.remove('is-hidden');
          visibleCount++;
        } else {
          card.classList.add('is-hidden');
        }
      });

      if (emptyMsg) {
        if (visibleCount === 0 && filter !== 'all') {
          emptyMsg.style.display = 'block';
        } else {
          emptyMsg.style.display = 'none';
        }
      }
    });
  });
}
