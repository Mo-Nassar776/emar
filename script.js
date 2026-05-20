document.documentElement.classList.add("motion-ready");

const header = document.querySelector(".site-header");
const contactForm = document.querySelector(".contact-form");
const revealTargets = [
  ...document.querySelectorAll(
    ".section-heading, .project-item, .steps article, .studio-copy, .stat-row div, details, .contact > div, .contact-form",
  ),
];

revealTargets.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--delay", `${Math.min(index % 3, 2) * 120}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
);

revealTargets.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll(".stat-row strong, .hero-panel span");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const rawValue = element.textContent.trim();
      const target = Number.parseInt(rawValue, 10);
      const suffix = rawValue.replace(String(target), "");
      const duration = 1300;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(target * eased)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(element);
    });
  },
  { threshold: 0.6 },
);

counters.forEach((element) => counterObserver.observe(element));

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const button = contactForm.querySelector("button");
  button.textContent = "تم استلام الطلب";
  button.disabled = true;
});
