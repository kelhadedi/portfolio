// ============================
// AOS - animations au scroll
// ============================
AOS.init({
  duration: 400,
  offset: 120,
  once: false,   // les animations se rejouent si on revient dans la section
  mirror: false  // pas d'anim "en sortie" en remontant
});
const contactToggle = document.getElementById('contactToggle');
const contactPanel  = document.getElementById('contactPanel');

contactToggle.addEventListener('click', () => {
  const isOpen = contactPanel.classList.toggle('open');
  contactToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
const contactToggle = document.getElementById('contactToggle');
const contactPanel  = document.getElementById('contactPanel');

contactToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // empêche le clic de remonter au document
  const isOpen = contactPanel.classList.toggle('open');
  contactToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

contactPanel.addEventListener('click', (e) => {
  e.stopPropagation(); // pour pouvoir cliquer dans le panneau sans le fermer
});

document.addEventListener('click', () => {
  if (contactPanel.classList.contains('open')) {
    contactPanel.classList.remove('open');
    contactToggle.setAttribute('aria-expanded', 'false');
  }
});


// ============================
// Bouton "retour haut"
// ============================
const backToTopBtn = document.getElementById("btn-back-to-top");

window.addEventListener("scroll", () => {
  const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

  if (scrollTop > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================
// Lightbox image projets
// ============================
const zoomImages = document.querySelectorAll(".project-zoom-img");
const lightbox = document.getElementById("image-lightbox");
const lightboxImg = document.getElementById("image-lightbox-img");
const lightboxContent = document.querySelector(".image-lightbox-content");

if (zoomImages.length && lightbox && lightboxImg && lightboxContent) {
  zoomImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      // Réinitialise la taille
      lightboxContent.classList.remove("image-lightbox-content--small");

      // Si l'image appartient à LocFit / KeySwitch / Roche-Jagu, on met la variante small
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

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140; // marge pour la navbar
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

// ============================
// Parallax léger sur la section home
// ============================
const homeSection = document.querySelector(".home");

window.addEventListener("scroll", () => {
  const offset = window.pageYOffset;
  // Parallax très subtil pour rester sobre
  homeSection.style.backgroundPositionY = offset * 0.2 + "px";
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards  = document.querySelectorAll('.project-cv-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // active state
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cats = card.dataset.category.split(' ');

      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});
