(function () {
  const dialog = document.getElementById("contact-modal");
  const openBtn = document.getElementById("contact-modal-open");
  const form = document.getElementById("contact-form");
  const success = document.getElementById("contact-form-success");
  if (!dialog || !openBtn || !form || !success || typeof dialog.showModal !== "function") {
    return;
  }

  const closeBtn = dialog.querySelector(".contact-modal-close");
  const successClose = success.querySelector(".contact-success-close");

  function openModal() {
    form.hidden = false;
    success.hidden = true;
    form.reset();
    dialog.showModal();
  }

  function closeModal() {
    if (!dialog.open) return;
    dialog.close();
    openBtn.focus();
  }

  openBtn.addEventListener("click", openModal);

  if (closeBtn) {
    closeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  if (successClose) {
    successClose.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) closeModal();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.hidden = true;
    success.hidden = false;
  });
})();
