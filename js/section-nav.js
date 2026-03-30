(function () {
  const nav = document.getElementById("section-nav");
  const hero = document.getElementById("banner-843");
  const heroPanel = document.querySelector("#banner-843 .hero-panel");
  const learnMore = document.getElementById("hero-learn-more");

  if (learnMore && heroPanel) {
    learnMore.addEventListener("click", function () {
      heroPanel.classList.add("is-departing");
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      if (heroPanel && window.scrollY < 72) {
        heroPanel.classList.remove("is-departing");
      }
    },
    { passive: true }
  );

  if (!window.matchMedia("(min-width: 1320px)").matches) return;

  if (!nav || !hero) return;

  const links = Array.prototype.slice.call(
    nav.querySelectorAll(".section-nav-link[href^='#']")
  );
  if (!links.length) return;

  const ids = links.map(function (a) {
    return a.getAttribute("href").slice(1);
  });

  function pastHero() {
    return hero.getBoundingClientRect().bottom < 48;
  }

  function setRevealed() {
    const show = pastHero();
    nav.classList.toggle("is-revealed", show);
    nav.setAttribute("aria-hidden", show ? "false" : "true");
  }

  function setActive(id) {
    if (!pastHero()) return;
    links.forEach(function (a) {
      const active = a.getAttribute("href") === "#" + id;
      a.classList.toggle("is-active", active);
      if (active) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  }

  function updateFromScroll() {
    setRevealed();

    if (!pastHero()) {
      links.forEach(function (a) {
        a.classList.remove("is-active");
        a.removeAttribute("aria-current");
      });
      return;
    }

    const doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 72) {
      setActive(ids[ids.length - 1]);
      return;
    }

    const mark = window.innerHeight * 0.32;
    let current = ids[0];
    ids.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mark) current = id;
    });
    setActive(current);
  }

  window.addEventListener("scroll", updateFromScroll, { passive: true });
  updateFromScroll();

  links.forEach(function (a) {
    a.addEventListener("click", function () {
      window.requestAnimationFrame(updateFromScroll);
    });
  });
})();
