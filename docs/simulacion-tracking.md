# 🎓 Guía para Trainees: Simulación de Tracking (Pixels y Analytics)

Este documento es una guía paso a paso para que entiendas qué son los "Pixels" y cómo hemos programado la simulación en este proyecto.

---

## 1. ¿Qué es un "Pixel"? (Historia rápida)

Aunque hoy en día son scripts complejos de JavaScript, se les llama **"Pixel"** por una razón histórica:
Antiguamente, para saber si alguien abría un correo o visitaba una web, se insertaba una **imagen invisible de 1x1 píxel**. Cuando el navegador intentaba descargar esa minúscula imagen del servidor de Facebook o Google, el servidor registraba: _"¡Ajá! El usuario con esta IP acaba de cargar la imagen, por lo tanto, está viendo la página"_.

Hoy en día, el "Pixel" es el código que conecta tu sitio web con las plataformas de anuncios (Meta, Google, TikTok).

---

## 2. Las Variables de Entorno (`.env.local`)

Para que Meta o Google acepten nuestros datos, necesitan un **ID de Cuenta**.

- En un proyecto real, usarías el ID de un cliente.
- En este **prototipo**, usamos IDs "de mentira" (ficticios) para que los scripts se activen sin gastar dinero.

```bash
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_GA_ID=G-TEST123456
```

Si dejas estas variables vacías, los componentes no renderizarán nada y el rastreo estará "apagado".

---

## 3. Explicación de los Archivos

### 🔵 MetaPixel.tsx (`components/tracking/MetaPixel.tsx`)

Este archivo hace tres cosas importantes:

1.  **Carga el Script:** Descarga la librería oficial de Facebook (`fbevents.js`).
2.  **Inicializa:** Le dice a Facebook: _"Prepárate, vamos a trackear para la cuenta X"_.
3.  **Rastrea la Navegación (useEffect):**
    - En aplicaciones normales (HTML viejo), el Pixel se dispara cada vez que la página carga.
    - En **Next.js**, la página no se recarga completamente cuando navegas. Por eso usamos un `useEffect` que escucha cuando cambias de URL y le avisa manualmente a Facebook: `fbq('track', 'PageView')`.

### 🟢 GoogleAnalytics.tsx (`components/tracking/GoogleAnalytics.tsx`)

Funciona muy parecido al de Meta, pero con un detalle técnico vital:

- **`send_page_view: false`**: Por defecto, Google Analytics intenta contar una visita apenas carga el script. Hemos desactivado esto.
- **¿Por qué?** Para evitar el **"Double Counting"**. Si Google cuenta una visita al cargar, y luego nuestro código de React cuenta otra al detectar la ruta, veríamos 2 visitas cuando el usuario solo hizo 1.

---

## 4. El Problema del "Doble Conteo" (Muy Importante)

Como desarrollador Junior/Trainee, debes cuidar mucho la **precisión de los datos**.
Si el cliente ve que tiene 1000 visitas en su web pero solo 10 ventas, pensará que su web es mala. Pero si en realidad tuvo 500 visitas (y las otras 500 fueron errores de doble conteo del programador), su tasa de éxito es mucho mejor.

**Cómo lo solucionamos aquí:**

1.  Evitamos que los scripts se disparen solos.
2.  Solo disparamos el evento cuando la página de Next.js está lista y el usuario realmente está viendo el contenido nuevo.

---

## 5. Cómo verificarlo (La prueba del desarrollador)

Instala la extensión **TagHound** o **Meta Pixel Helper**.

1. Abre la consola del navegador (F12).
2. Ve a la pestaña de la extensión.
3. Entra a `/demo?utm_source=meta`.
4. Verás que la extensión dice: _"Detected: PageView"_.
   Esto significa que tu simulación funciona y los scripts están "vivos".

---

**Resumen para el equipo:**
Estos archivos no son para medir tráfico real del sitio, sino para que nuestro **SaaS** pueda demostrarle a un cliente futuro: _"Mira, así es como capturamos tus anuncios de Meta y los mostramos en tu Dashboard"_.
