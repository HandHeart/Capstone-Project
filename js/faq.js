(function () {
  const root = document.getElementById("faq-1193");
  if (!root) return;

  root.querySelectorAll(".faq-trigger").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("is-open");

      root.querySelectorAll(".faq-item").forEach(function (li) {
        li.classList.remove("is-open");
        li.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
})();
