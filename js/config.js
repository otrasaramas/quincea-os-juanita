/* ============================================================
   CONFIGURACIÓN — Edita SOLO este archivo para personalizar.
   ============================================================ */

window.CONFIG = {

  /* --- Fecha y hora del evento (para la cuenta regresiva) ---
     Formato: año, mes (1-12), día, hora (0-23), minuto            */
  evento: {
    fecha: new Date(2026, 6, 24, 19, 30, 0), // 24 de julio de 2026, 7:30 pm
  },

  /* --- Fecha límite para confirmar (texto libre) --- */
  confirmarAntesDe: "12 de julio de 2026",

  /* --- Ubicación (botón "Ver en el mapa") ---
     Pega aquí el enlace de Google Maps del lugar. Si lo dejas
     vacío, se buscará el nombre del lugar automáticamente.        */
  ubicacion: {
    nombre: "Centro de Eventos y Espectáculos Villa Teo",
    mapsUrl: "" // ej: "https://maps.app.goo.gl/xxxxxxxx"
  },

  /* ============================================================
     GOOGLE FORM (confirmaciones que llegan a tu hoja de cálculo)
     Sigue los pasos de README.md para obtener estos valores.
     Mientras esté SIN configurar, el formulario mostrará el
     mensaje de gracias pero NO guardará datos.
     ============================================================ */
  googleForm: {
    // 1) Pega la URL "formResponse" de tu formulario:
    //    https://docs.google.com/forms/d/e/FORM_ID/formResponse
    actionUrl: "",

    // 2) Empareja cada campo con su "entry.XXXXXXXXX" del formulario:
    entries: {
      nombre:       "entry.0000000001",
      asistencia:   "entry.0000000002",
      acompanantes: "entry.0000000003",
      mensaje:      "entry.0000000004"
    }
  }
};
