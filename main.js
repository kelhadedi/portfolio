// ============================
// AOS - animations au scroll
// ============================
AOS.init({
  duration: 400,
  offset: 120,
  once: false,   // les animations se rejouent si on revient dans la section
  mirror: false  // pas d'anim "en sortie" en remontant
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
