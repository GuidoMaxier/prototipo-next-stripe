# Arquitectura del Proyecto: SaaS de Atribución de Tráfico

Este documento resume la lógica de negocio y el flujo de datos para que los desarrolladores entiendan cómo el proyecto une las visitas con las ventas.

## 1. Modelo de Negocio (SaaS Multi-tenant)

El sistema está diseñado para que **Múltiples Clientes** (dueños de e-commerce) puedan usar nuestra plataforma. Cada cliente tiene su propia `apiKey`.

## 2. Los 3 Pilares del Rastreo

### A. El Frontend (Captura) - `public/tracker.js`

Es un script liviano que el cliente pega en su web.

- **Misión:** Detectar UTMs (`source`, `medium`, `campaign`) y Clids (`fbclid`, `gclid`).
- **Persistencia:** Guarda los datos en una **Cookie** (`adtracker_session`) y en `localStorage`. Esto es crucial para que la información no se pierda al navegar.

### B. El Checkout (Puente) - `app/api/create-checkout-session/route.ts`

Cuando el usuario decide comprar:

1.  El servidor lee la **Cookie** de rastreo.
2.  Extrae los UTMs y el `apiKey` del cliente.
3.  Inyecta estos datos como **Metadata** dentro de la sesión de Stripe.
    _Gracias a esto, la información de marketing viaja "dentro" del dinero._

### C. El Backend (Atribución) - `app/api/webhook/route.ts`

Cuando Stripe confirma el pago, envía un Webhook a nuestro servidor.

- El servidor extrae la Metadata de Stripe.
- Guarda la orden en la base de datos vinculándola al `projectId` correcto.
- **Resultado:** El Dashboard se actualiza en tiempo real mostrando si la venta vino de Google o Meta.

## 3. Guía de Flujo para el Desarrollador

1.  **Visita:** El usuario entra con `?utm_source=meta`. `tracker.js` guarda la cookie.
2.  **Conversión:** El usuario paga. Los UTMs se envían a Stripe.
3.  **Registro:** El Webhook guarda la venta con el campo `utmSource = 'meta'`.
4.  **Visualización:** El Dashboard filtra por `projectId` y muestra los contadores de Meta vs Google.
