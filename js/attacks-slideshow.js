(function () {
  const roots = document.querySelectorAll("[data-iot-slideshow]");
  if (!roots.length) return;

  Array.prototype.forEach.call(roots, function (root) {
    const viewport = root.querySelector(".attacks-slideshow-viewport");
    const slides = Array.prototype.slice.call(
      root.querySelectorAll(".attacks-slide")
    );
    const dotsWrap = root.querySelector(".attacks-slideshow-dots");
    const status = root.querySelector(".attacks-slideshow-status");
    const prevBtn = root.querySelector(".attacks-slideshow-prev");
    const nextBtn = root.querySelector(".attacks-slideshow-next");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const autoplayAttr = root.getAttribute("data-autoplay-ms");
    const autoplayMs =
      autoplayAttr === null || autoplayAttr === ""
        ? 0
        : Math.max(0, parseInt(autoplayAttr, 10) || 0);

    if (!viewport || !slides.length || !dotsWrap) return;

    let index = 0;
    let autoplayTimer = null;
    let scrollDebounce = null;
    const dots = [];

    function clampIndex(i) {
      const n = slides.length;
      return ((i % n) + n) % n;
    }

    function syncChrome() {
      const total = slides.length;
      const label = slides[index].getAttribute("data-label") || "Slide";
      if (status) {
        status.textContent =
          "Slide " + (index + 1) + " of " + total + ": " + label;
      }
      dots.forEach(function (dot, j) {
        dot.setAttribute("aria-current", j === index ? "true" : "false");
      });
      slides.forEach(function (slide, j) {
        slide.setAttribute("aria-hidden", j === index ? "false" : "true");
      });
    }

    function readIndexFromScroll() {
      const w = viewport.clientWidth;
      if (!w) return;
      index = clampIndex(Math.round(viewport.scrollLeft / w));
      syncChrome();
    }

    function scheduleReadScroll() {
      if (scrollDebounce) window.clearTimeout(scrollDebounce);
      scrollDebounce = window.setTimeout(function () {
        scrollDebounce = null;
        readIndexFromScroll();
      }, 120);
    }

    function go(delta, smooth) {
      scrollToIndex(index + delta, smooth);
    }

    function scrollToIndex(i, smooth) {
      index = clampIndex(i);
      viewport.scrollTo({
        left: viewport.clientWidth * index,
        top: 0,
        behavior: reduceMotion || !smooth ? "auto" : "smooth",
      });
      syncChrome();
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function startAutoplay() {
      stopAutoplay();
      if (reduceMotion || autoplayMs < 800 || document.hidden) return;
      autoplayTimer = window.setInterval(function () {
        go(1, true);
      }, autoplayMs);
    }

    slides.forEach(function (slide, j) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "attacks-slideshow-dot";
      dot.setAttribute(
        "aria-label",
        "Show slide " + (j + 1) + ": " + (slide.getAttribute("data-label") || "")
      );
      dot.addEventListener("click", function () {
        scrollToIndex(j, true);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        go(-1, true);
      });
    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        go(1, true);
      });

    viewport.addEventListener("scroll", scheduleReadScroll, { passive: true });

    viewport.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1, true);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1, true);
      }
    });

    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", function (e) {
      if (!root.contains(e.relatedTarget)) startAutoplay();
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });

    window.addEventListener(
      "resize",
      function () {
        viewport.scrollTo({
          left: viewport.clientWidth * index,
          top: 0,
          behavior: "auto",
        });
        syncChrome();
      },
      { passive: true }
    );

    scrollToIndex(0, false);
    startAutoplay();
  });
})();
