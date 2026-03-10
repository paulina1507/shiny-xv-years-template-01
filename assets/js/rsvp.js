(function () {
  let initialized = false;

  function initRSVP() {
    if (initialized) return;
    initialized = true;

    const formBox = document.getElementById("rsvp-form");
    const finalBox = document.getElementById("rsvp-final");
    const section = document.getElementById("rsvp");

    if (!formBox || !finalBox || !section) return;

    const btnYes = formBox.querySelector(".rsvp-btn.yes");
    const btnNo = formBox.querySelector(".rsvp-btn.no");

    const titleEl = document.getElementById("rsvp-final-title");
    const textEl = document.getElementById("rsvp-final-text");
    const namesEl = document.getElementById("rsvp-names");

    const data = window.__EVENT_DATA__;
    if (!data?.rsvp?.final) return;

    function showFinal() {
      formBox.classList.add("hidden");
      section.classList.add("completed");

      const invitado = window.__INVITADO__;
      const data = window.__EVENT_DATA__;

      const passLabel = document.getElementById("rsvpPassLabel");
      const passValue = document.getElementById("rsvpPassValue");
      const tableLabel = document.getElementById("rsvpTableLabel");
      const tableValue = document.getElementById("rsvpTableValue");

      // 🔹 PASES
      if (data?.rsvp?.pase?.enabled && invitado?.pases) {
        passLabel.textContent = data.rsvp.pase.label || "Pase para";
        passValue.textContent = `${invitado.pases} personas`;
      } else {
        passLabel?.closest(".rsvp-pass-item")?.remove();
      }

      // 🔹 MESA
      if (data?.rsvp?.mesa?.enabled && invitado?.mesa) {
        tableLabel.textContent = data.rsvp.mesa.label || "Mesa asignada";
        tableValue.textContent = `Mesa ${invitado.mesa}`;
      } else {
        tableLabel?.closest(".rsvp-pass-item")?.remove();
      }

      titleEl.textContent = data.rsvp.final.titulo || "";
      textEl.innerHTML = data.rsvp.final.texto || "";
      namesEl.textContent = data.rsvp.final.firma || "";

      finalBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    btnYes?.addEventListener("click", showFinal);
    btnNo?.addEventListener("click", showFinal);
  }

  // 1️⃣ Escuchar el evento normal
  document.addEventListener("event:data:ready", initRSVP);

  // 2️⃣ Fallback: si el evento ya ocurrió
  if (window.__EVENT_DATA__) {
    initRSVP();
  }
})();
