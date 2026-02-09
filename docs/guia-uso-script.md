# Guía: Cómo usar AdTracker.js en tu sitio

Para que AdTracker pueda medir las conversiones de tus anuncios, debes integrar un pequeño script en las páginas de tu sitio web (especialmente en la landing page y en las páginas previas al checkout).

## 1. El Script de Instalación

Copia y pega el siguiente código dentro de la etiqueta `<head>` o al final del `<body>` de tu sitio web:

```html
<script
  src="http://localhost:3000/tracker.js"
  data-client-id="TU_API_KEY_AQUÍ"
  async
></script>
```

> **Nota:** En producción, reemplaza `http://localhost:3000` por la URL real de tu instancia de AdTracker.

## 2. Parámetros del Script

- **`src`**: La ubicación del archivo del tracker. Es el motor que detecta los clics.
- **`data-client-id`**: Tu Identificador de Cliente único (API Key). Puedes encontrarlo en tu **Dashboard** -> **Configuración**. Sin esto, el sistema no sabrá a qué cuenta asignar las visitas.
- **`async`**: Permite que el script se cargue sin ralentizar tu página web.

## 3. ¿Qué hace este script?

1.  **Detecta visitas:** Registra cada vez que alguien entra a tu web.
2.  **Captura anuncios:** Si el usuario viene de Facebook (`?fbclid=...`) o Google (`?gclid=...`), el script lo detecta automáticamente.
3.  **Crea la "Mochila":** Guarda estos datos en una cookie llamada `adtracker_session`.
4.  **Informa al SaaS:** Envía una señal a nuestros servidores para que puedas ver el tráfico en vivo en tu Dashboard.

## 4. Cómo verificar la instalación

1.  Entra a tu web con parámetros de prueba: `tuweb.com/?utm_source=test`.
2.  Abre la consola del navegador (`F12`).
3.  Escribe `document.cookie` y presiona Enter.
4.  Deberías ver una entrada que empieza con `adtracker_session=...`. Si la ves, ¡la instalación es correcta!

---

_AdTracker - Atribución precisa para ventas de Stripe._
