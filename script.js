function toggleDarkMode() {
  document.body.classList.toggle("dark");
  try {
    localStorage.setItem(
      "centralops-theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  } catch (_) {
    /* ignore */
  }
}

function applyStoredTheme() {
  try {
    const stored = localStorage.getItem("centralops-theme");
    if (stored === "dark") document.body.classList.add("dark");
    if (stored === "light") document.body.classList.remove("dark");
  } catch (_) {
    /* ignore */
  }
}

function setDropdownPanelOpen(panel, open) {
  panel.classList.toggle("show", open);
  panel.setAttribute("aria-hidden", open ? "false" : "true");
  const wrap = panel.closest(".dropdown");
  if (wrap) {
    wrap.classList.toggle("dropdown--open", open);
  }
  panel.querySelectorAll("a").forEach((a) => {
    a.tabIndex = open ? 0 : -1;
  });
}

function closeAllDropdowns() {
  document.querySelectorAll(".dropdown-content").forEach((menu) => {
    setDropdownPanelOpen(menu, false);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  applyStoredTheme();

  document.querySelectorAll(".button-container").forEach((container) => {
    container.querySelectorAll(":scope > *").forEach((el, i) => {
      el.style.setProperty("--stagger", String(i));
    });
  });

  document.querySelectorAll(".dropdown-content").forEach((panel) => {
    panel.setAttribute("role", "menu");
    panel.setAttribute("aria-hidden", "true");
    panel.querySelectorAll("a").forEach((a) => {
      a.tabIndex = -1;
      a.setAttribute("role", "menuitem");
    });
    panel.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });

  document.querySelectorAll(".dropdown > .btn").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-haspopup", "true");

    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const menu = this.nextElementSibling;
      if (!menu || !menu.classList.contains("dropdown-content")) return;

      const willOpen = !menu.classList.contains("show");

      document.querySelectorAll(".dropdown-content").forEach((m) => {
        if (m !== menu) setDropdownPanelOpen(m, false);
      });
      document.querySelectorAll(".dropdown > .btn").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
      });

      setDropdownPanelOpen(menu, willOpen);
      this.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  document.addEventListener("click", function () {
    closeAllDropdowns();
    document.querySelectorAll(".dropdown > .btn").forEach((b) => {
      b.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllDropdowns();
      document.querySelectorAll(".dropdown > .btn").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
      });
    }
  });

  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
});
