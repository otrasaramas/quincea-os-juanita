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

  /* --- Música de fondo ---
     Sube tu canción a la carpeta "musica/" y pon aquí el nombre.
     Suena cuando el invitado toca el botón (o al primer toque en la
     pantalla). Si el archivo no existe, el botón se oculta solo.       */
  musica: {
    enabled: true,          // el botón aparece solo cuando exista musica/cancion.mp3
    archivo: "musica/cancion.mp3",
    volumen: 0.6            // de 0 (silencio) a 1 (máximo)
  },

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
    // URL "formResponse" del formulario de Juanita:
    actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdOXGAfw7RsCrPxdUYSJF5LqW0Np7ZavAcFhUJIo35-f67p2Q/formResponse",

    // Cada campo emparejado con su "entry.XXXXXXXXX":
    entries: {
      nombre:     "entry.678883266",
      asistencia: "entry.1746048726",
      mensaje:    "entry.311310354"
    }
  }
};
