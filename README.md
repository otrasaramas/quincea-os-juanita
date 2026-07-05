# 💜 Quince Años · Juanita Mejía

Sitio web de invitación para los quince años de **Juanita Mejía** — 24 de julio de 2026.
Paleta lavanda + verde sage. Cada invitado recibe un enlace con su nombre y puede
confirmar su asistencia desde el mismo sitio.

---

## 📁 Estructura

```
index.html            → la invitación
css/styles.css        → estilos (paleta lavanda + sage)
js/config.js          → ⚙️ AQUÍ se configura todo (datos, mapa, Google Form)
js/main.js            → lógica (nombre, cuenta regresiva, RSVP)
imagenes/             → fotos de Juanita
```

---

## ✨ Enlaces personalizados por invitado

Agrega el nombre al final del enlace con `?nombre=`:

```
https://TU-SITIO/?nombre=Familia+Ramírez
https://TU-SITIO/?nombre=Tía+Marta
```

- Los espacios se escriben como `+` o `%20`.
- El nombre aparece en el saludo y queda precargado en la confirmación.
- Si el enlace no lleva nombre, el invitado simplemente lo escribe.

---

## ✅ Conectar las confirmaciones a Google Sheets (RSVP)

Las respuestas se guardan solas en una hoja de cálculo mediante un Google Form.
**Mientras no configures esto, el formulario muestra el mensaje de gracias pero
NO guarda los datos.**

### Paso 1 — Crear el formulario
1. Entra a [forms.google.com](https://forms.google.com) y crea un formulario nuevo.
2. Agrega **4 preguntas** (de tipo *respuesta corta* o *párrafo*), en este orden:
   1. `Nombre`
   2. `Asistencia`
   3. `Acompañantes`
   4. `Mensaje`
3. En la pestaña **Respuestas**, pulsa el ícono de Sheets para **vincular una hoja
   de cálculo** (ahí llegarán las confirmaciones).

### Paso 2 — Obtener la URL de envío
1. Pulsa **Vista previa** (el ojo 👁️).
2. Clic derecho sobre la página → **Inspeccionar** (o abre las herramientas de
   desarrollo). En la consola pega:
   ```js
   document.querySelector('form').action
   ```
   Copia la URL que termina en **`/formResponse`** y pégala en `actionUrl`
   dentro de `js/config.js`.

### Paso 3 — Obtener los `entry.XXXX` de cada pregunta
En esa misma vista previa, en la consola:
```js
[...document.querySelectorAll('[name^="entry."]')].map(e => e.name)
```
Te dará una lista como `["entry.1111", "entry.2222", ...]` en el mismo orden de
tus preguntas. Cópialos a `js/config.js`:

```js
googleForm: {
  actionUrl: "https://docs.google.com/forms/d/e/XXXX/formResponse",
  entries: {
    nombre:       "entry.1111",
    asistencia:   "entry.2222",
    acompanantes: "entry.3333",
    mensaje:      "entry.4444"
  }
}
```

¡Listo! Cada confirmación caerá en tu hoja de Google Sheets. 🎉

> 💡 ¿Prefieres no complicarte? También puedes reemplazar el botón por un enlace
> directo a un Google Form embebido. Avísame y lo cambio.

---

## 📍 Otros ajustes en `js/config.js`
- **Ubicación / mapa:** pega el enlace de Google Maps en `ubicacion.mapsUrl`.
- **Fecha límite para confirmar:** cámbiala en `confirmarAntesDe`.
- **Cuenta regresiva:** la fecha del evento está en `evento.fecha`.

---

## 🚀 Cómo publicarlo (para compartir el enlace)

Es un sitio estático (solo HTML/CSS/JS), así que se publica fácil y gratis:

**Opción A — GitHub Pages**
1. En GitHub: *Settings → Pages*.
2. *Source*: la rama de este proyecto, carpeta `/root`.
3. En 1–2 min tendrás un enlace `https://usuario.github.io/quincea-os-juanita/`.

**Opción B — Netlify / Vercel**
- Arrastra la carpeta a [app.netlify.com/drop](https://app.netlify.com/drop) y
  obtienes un enlace al instante.

Luego solo comparte el enlace (con `?nombre=` para cada invitado) por WhatsApp. 💌
