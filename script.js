const header = document.getElementById("header");
const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const backTop = document.getElementById("backTop");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("#home, #about, #skills, #projects, #education, #contact");
const revealItems = document.querySelectorAll(".reveal");

// ===== MOBILE MENU =====
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== TYPING EFFECT =====
const words = [
  "Full-Stack Developer",
  "Aspiring Data Scientist",
  "Problem Solver",
  "Web Product Builder"
];

const typedText = document.getElementById("typedText");
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typedText) return;

  const word = words[wordIndex];
  typedText.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeLoop, 70);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 1200);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 38);
  } else {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeLoop, 280);
  }
}

typeLoop();

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

// ===== SCROLL =====
function handleScroll() {
  const y = window.scrollY;

  if (header) header.classList.toggle("scrolled", y > 24);
  if (backTop) backTop.classList.toggle("show", y > 700);

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;

    const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);

    if (y >= top && y < bottom) {
      links.forEach((link) => link.classList.remove("active"));
      if (activeLink) activeLink.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// ===== BACK TO TOP =====
if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    const note = document.getElementById("formNote");
    if (note) note.textContent = "Opening your email app...";

    window.location.href =
      `mailto:sandeepmirthipati97@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
  });
}

// ===== FOOTER YEAR =====
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}