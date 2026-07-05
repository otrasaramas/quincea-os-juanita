/* ============================================================
   Quince Años · Juanita Mejía — Lógica del sitio
   ============================================================ */
(function () {
  "use strict";
  var CFG = window.CONFIG || {};

  /* ---------- 1. Nombre del invitado desde la URL ----------
     Admite:  ?nombre=Familia+Ramírez   ó   ?invitado=...        */
  function getGuestName() {
    var p = new URLSearchParams(window.location.search);
    var n = p.get("nombre") || p.get("invitado") || p.get("guest") || "";
    return n.trim();
  }
  var guestName = getGuestName();
  if (guestName) {
    var elName = document.getElementById("guestName");
    if (elName) elName.textContent = guestName;
    document.title = guestName + " · Quince Años de Juanita";
    // Precargar el nombre en el formulario
    var fNombre = document.getElementById("fNombre");
    if (fNombre) fNombre.value = guestName;
  }

  /* ---------- 2. Fecha límite para confirmar ---------- */
  var elDeadline = document.getElementById("rsvpDeadline");
  if (elDeadline && CFG.confirmarAntesDe) {
    elDeadline.textContent = "Por favor confirma antes del " + CFG.confirmarAntesDe;
  }

  /* ---------- 3. Botón de ubicación (Google Maps) ---------- */
  var mapsBtn = document.getElementById("mapsBtn");
  if (mapsBtn && CFG.ubicacion) {
    var url = CFG.ubicacion.mapsUrl;
    if (!url && CFG.ubicacion.nombre) {
      url = "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent(CFG.ubicacion.nombre);
    }
    mapsBtn.href = url || "#";
  }

  /* ---------- 4. Cuenta regresiva ---------- */
  var target = (CFG.evento && CFG.evento.fecha) ? new Date(CFG.evento.fecha).getTime() : null;
  var msgEl = document.getElementById("countdownMsg");
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function setNum(k, v) {
    var el = document.querySelector('[data-cd="' + k + '"]');
    if (el) el.textContent = v;
  }
  function tick() {
    if (!target) return;
    var diff = target - Date.now();
    if (diff <= 0) {
      setNum("dias", "00"); setNum("horas", "00");
      setNum("minutos", "00"); setNum("segundos", "00");
      if (msgEl) msgEl.textContent = "¡Hoy es el gran día! 🎉";
      clearInterval(timer);
      return;
    }
    var s = Math.floor(diff / 1000);
    setNum("dias", pad(Math.floor(s / 86400)));
    setNum("horas", pad(Math.floor((s % 86400) / 3600)));
    setNum("minutos", pad(Math.floor((s % 3600) / 60)));
    setNum("segundos", pad(s % 60));
  }
  var timer;
  if (target) { tick(); timer = setInterval(tick, 1000); }

  /* ---------- 5. Mostrar/ocultar nº de acompañantes ---------- */
  var guestsField = document.getElementById("guestsField");
  document.querySelectorAll('input[name="asistencia"]').forEach(function (r) {
    r.addEventListener("change", function () {
      var attending = document.querySelector('input[name="asistencia"]:checked');
      if (guestsField) {
        guestsField.style.display =
          (attending && attending.value.indexOf("Sí") === 0) ? "" : "none";
      }
    });
  });

  /* ---------- 6. Envío del formulario a Google Forms ---------- */
  var form = document.getElementById("rsvpForm");
  var statusEl = document.getElementById("formStatus");
  var submitBtn = document.getElementById("rsvpSubmit");

  function showStatus(msg, kind) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = "form__status" + (kind ? " " + kind : "");
  }

  function isFormConfigured() {
    var g = CFG.googleForm || {};
    return g.actionUrl && g.actionUrl.indexOf("formResponse") !== -1;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nombre = (document.getElementById("fNombre") || {}).value || "";
      var asiste = document.querySelector('input[name="asistencia"]:checked');

      if (!nombre.trim()) { showStatus("Por favor escribe tu nombre.", "err"); return; }
      if (!asiste) { showStatus("Cuéntanos si nos acompañas 💜", "err"); return; }

      var data = {
        nombre: nombre.trim(),
        asistencia: asiste.value,
        acompanantes: asiste.value.indexOf("Sí") === 0
          ? ((document.getElementById("fAcompanantes") || {}).value || "1")
          : "0",
        mensaje: (document.getElementById("fMensaje") || {}).value || ""
      };

      if (submitBtn) { submitBtn.disabled = true; }
      showStatus("Enviando...", "");

      var thanks = asiste.value.indexOf("Sí") === 0
        ? "¡Gracias, " + data.nombre.split(" ")[0] + "! Tu asistencia quedó confirmada. Nos vemos el 24 de julio 💜"
        : "Gracias por avisarnos, " + data.nombre.split(" ")[0] + ". Te vamos a extrañar 💛";

      if (!isFormConfigured()) {
        // Aún sin Google Form: mostramos gracias (no persiste todavía).
        setTimeout(function () {
          form.style.display = "none";
          showStatus(thanks, "ok");
          console.warn("[RSVP] Google Form sin configurar: la respuesta no se guardó. Ver README.md");
        }, 500);
        return;
      }

      // Construir y enviar el POST a Google Forms mediante iframe oculto.
      var g = CFG.googleForm;
      var ghost = document.createElement("form");
      ghost.action = g.actionUrl;
      ghost.method = "POST";
      ghost.target = "hidden_iframe";
      ghost.style.display = "none";

      Object.keys(g.entries).forEach(function (key) {
        if (data[key] === undefined) return;
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = g.entries[key];
        input.value = data[key];
        ghost.appendChild(input);
      });

      var iframe = document.getElementById("hidden_iframe");
      var done = false;
      function finish() {
        if (done) return; done = true;
        form.style.display = "none";
        showStatus(thanks, "ok");
      }
      if (iframe) iframe.addEventListener("load", finish, { once: true });
      // Respaldo por si el iframe no dispara "load"
      setTimeout(finish, 1500);

      document.body.appendChild(ghost);
      ghost.submit();
      setTimeout(function () { document.body.removeChild(ghost); }, 2000);
    });
  }

  /* ---------- 7. Animación de aparición al hacer scroll ---------- */
  var revealSelectors = [
    ".guest__photo", ".guest__text", ".party__photos", ".party .paper",
    ".countdown__inner", ".night__photo", ".night .paper", ".rsvp .paper", ".closing"
  ];
  var toReveal = [];
  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add("reveal"); toReveal.push(el);
    });
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    toReveal.forEach(function (el) { io.observe(el); });
  } else {
    toReveal.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
