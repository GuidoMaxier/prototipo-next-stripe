# Arquitectura del Proyecto: SaaS de Atribución de Tráfico

Este documento resume la lógica de negocio y el flujo de datos para que los desarrolladores entiendan cómo el proyecto une las visitas con las ventas.

## 1. Modelo de Negocio (SaaS Multi-tenant)

El sistema está diseñado para que **Múltiples Clientes** (dueños de e-commerce) puedan usar nuestra plataforma. Cada cliente tiene su propia `apiKey`.

## 2. Los 3 Pilares del Rastreo

### A. El Frontend (Captura) - `public/tracker.js`

Es un script liviano que el cliente pega en su web.

- **Misión:** Detectar UTMs (`source`, `medium`, `campaign`) y Clids (`fbclid`, `gclid`).
- **Persistencia:** Guarda los datos en una **Cookie** (`adtracker_session`) y en `localStorage`. Esto es crucial para que la información no se pierda al navegar.
- **Identidad:** Usa el atributo `data-client-id` para saber a qué proyecto enviar los eventos de visualización (hits).

### B. El Checkout (Puente) - `app/api/create-checkout-session/route.ts`

Cuando el usuario decide comprar:

1.  **Lectura de Cookies:** El servidor limpia y lee la cookie `adtracker_session`.
2.  **Referencia de Proyecto:** Busca el proyecto en la base de datos usando el `apiKey` guardado en la cookie.
3.  **Inyección de Metadatos:** Inyecta los UTMs y Clids en dos lugares de Stripe:
    - `metadata`: Visible en el objeto Session.
    - `payment_intent_data.metadata`: **Vital** para que sea visible en la pestaña de "Pagos" (Payments) del Dashboard de Stripe.

### C. El Backend (Atribución) - `app/api/webhook/route.ts`

Cuando Stripe confirma el pago (`checkout.session.completed`), envía un Webhook.

- **Extracción:** El servidor extrae la Metadata completa enviada en el paso anterior.
- **Persistencia:** Guarda la orden en la tabla `orders` vinculándola al `projectId` y el `userId`.
- **Resultado:** El Dashboard se actualiza instantáneamente con la atribución correcta.

## 3. Ejemplo de flujo real

1. **Anuncio:** Un usuario hace clic en un anuncio de Instagram (`?utm_source=meta&fbclid=123`).
2. **Navegación:** `tracker.js` captura los datos y los guarda en la cookie. El usuario navega por varias páginas.
3. **Compra:** Al llegar al checkout, el servidor lee la cookie y envía el `fbclid=123` a Stripe.
4. **Cierre:** Stripe cobra y nos avisa. El Dashboard de AdTracker marca una nueva venta de **Meta Ads**.

---

_Documentación técnica para el prototipo AdTracker._
