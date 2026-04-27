(function () {
  /* ---- Project data ---- */
  const entries = document.querySelectorAll(".project-section[data-entry]");

  function getProjectData(index) {
    const entry = entries[index];
    if (!entry) return null;
    return {
      number: entry.querySelector(".project-number")?.textContent?.trim() || "",
      title: entry.querySelector(".project-title")?.textContent?.trim() || "",
      period: entry.querySelector(".project-period")?.textContent?.trim() || "",
      desc: entry.querySelector(".project-desc")?.textContent?.trim() || "",
      tags: [...entry.querySelectorAll(".tag")].map((t) =>
        t.textContent.trim(),
      ),
    };
  }

  /* ---- App screen ---- */
  const appScreen = document.getElementById("iosAppScreen");
  const appHero = document.getElementById("iosAppHero");
  const appHeroContent = document.getElementById("iosAppHeroContent");
  const appBody = document.getElementById("iosAppBody");
  const appBack = document.getElementById("iosAppBack");
  const deviceScreen = document.querySelector(".device-screen");

  function openApp(iconEl, projectIndex) {
    const data = getProjectData(projectIndex);
    if (!data) return;

    const gradient =
      iconEl.closest("[data-gradient]")?.dataset.gradient ||
      "linear-gradient(145deg,#3b82f6,#1d4ed8)";

    /* transform-origin from icon center */
    const iconRect = iconEl.getBoundingClientRect();
    const screenRect = deviceScreen.getBoundingClientRect();
    const ox =
      (
        ((iconRect.left + iconRect.width / 2 - screenRect.left) /
          screenRect.width) *
        100
      ).toFixed(1) + "%";
    const oy =
      (
        ((iconRect.top + iconRect.height / 2 - screenRect.top) /
          screenRect.height) *
        100
      ).toFixed(1) + "%";
    appScreen.style.transformOrigin = `${ox} ${oy}`;

    const truncatedDesc =
      data.desc.length > 120 ? data.desc.slice(0, 120) + "…" : data.desc;

    requestAnimationFrame(() => appScreen.classList.add("open"));
  }

  function closeApp() {
    appScreen.classList.remove("open");
  }

  function escHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---- App icon tap ---- */
  document.querySelectorAll(".ios-app[data-project]").forEach((app) => {
    app.addEventListener("click", function () {
      const idx = parseInt(this.dataset.project, 10);
      const icon = this.querySelector(".ios-app-icon");
      this.classList.add("tapped");
      setTimeout(() => this.classList.remove("tapped"), 200);
      setTimeout(() => openApp(icon, idx), 160);
    });
  });

  // appBack.addEventListener("click", closeApp);

  /* ---- Anchor links (window scroll) ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
})();
