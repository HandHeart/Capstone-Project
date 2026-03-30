(function () {
  const btn = document.getElementById("scroll-top");
  if (!btn) return;

  function syncVisibility() {
    if (window.scrollY > 380) {
      btn.classList.add("is-visible");
      btn.removeAttribute("tabindex");
    } else {
      btn.classList.remove("is-visible");
      btn.setAttribute("tabindex", "-1");
    }
  }

  window.addEventListener("scroll", syncVisibility, { passive: true });
  syncVisibility();

  btn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  });
})();
