(() => {
  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("mainNav");
  const toggle = document.getElementById("navToggle");
  const toTop = document.getElementById("toTop");
  const year = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  if (year) year.textContent = String(new Date().getFullYear());

  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 24);
    toTop?.classList.toggle("is-visible", y > 480);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener("click", () => {
    const open = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      toggle?.setAttribute("aria-label", "Open menu");
    });
  });

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formNote) {
      formNote.textContent = "Message noted — we will follow up soon.";
    }
    form.reset();
  });
})();
