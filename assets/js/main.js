// Theme toggle
const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Active nav link update on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const bars = entry.target.querySelectorAll(".progress-bar");
        bars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          if (width) bar.style.width = width + "%";
        });
      }
    });
  },
  { threshold: 0.15 },
);
fadeEls.forEach((el) => observer.observe(el));

// Animate skill bars on scroll
const skillCategories = document.querySelectorAll(".card-custom .progress-bar");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute("data-width");
        if (width) bar.style.width = width + "%";
      }
    });
  },
  { threshold: 0.3 },
);
skillCategories.forEach((bar) => skillObserver.observe(bar));

// Contact form
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (name && email && message) {
    form.style.display = "none";
    successMsg.classList.remove("d-none");
    console.log("Message received:", { name, email, message });
    setTimeout(() => {
      form.style.display = "block";
      successMsg.classList.add("d-none");
      form.reset();
    }, 4000);
  }
});
