# 🎯 AdTracker SaaS - Prototipo de Atribución

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Turso](https://img.shields.io/badge/Turso-000000?style=for-the-badge&logo=turso&logoColor=blue)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

> [!IMPORTANT]
> **ESTO ES UN PROTOTIPO.** No es un Producto Mínimo Viable (MVP) ni una aplicación final. Es una prueba de concepto técnica para validar el flujo de atribución de campañas (Meta/Google Ads) integrando señales del frontend con pagos en el servidor.

---

## 🚀 Propósito del Proyecto

Este prototipo permite entender cómo conectar una visita con parámetros de marketing (`UTMs`, `fbclid`, `gclid`) a una venta real procesada en **Stripe**. Está diseñado para demostrar la viabilidad de un SaaS de analítica propia.

## 🛠️ Tecnologías Principales

- **Next.js 16 (App Router):** Motor principal de la aplicación.
- **Drizzle ORM + Turso:** Gestión de base de datos SQL para multi-tenancy.
- **Stripe SDK:** Manejo de sesiones de pago y webhooks.
- **AdTracker.js (Custom):** Script universal para captura de señales de tráfico.

## 📦 Documentación Detallada (Recomendada)

Para entender cómo funciona el prototipo, revisa la carpeta `docs/`:

- [📘 Simulación de Tracking](./docs/simulacion-tracking.md) - Cómo probamos campañas sin gastar en anuncios.
- [🏗️ Arquitectura del Proyecto](./docs/arquitectura-proyecto.md) - El flujo de datos de la visita a la venta.
- [📝 Requerimientos del Software (SRS)](./docs/srs-adtracker.md) - Visión técnica y Roadmap hacia un MVP.

---

## ⚙️ Configuración Rápida

### 1. Variables de Entorno

Crea un archivo `.env.local` con:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PRICE_INCORPORATION=price_...

# Database (Turso)
TURSO_CONNECTION_URL=...
TURSO_AUTH_TOKEN=...

# Auth (NextAuth)
AUTH_SECRET=...

# Simulación (Opcional para ver Pixels)
NEXT_PUBLIC_META_PIXEL_ID=1234567890
NEXT_PUBLIC_GA_ID=G-XXXXXX
```

### 2. Instalación

```bash
npm install
npm run dev
```

### 3. Stripe CLI (Vital para Webhooks)

Para que el Dashboard detecte las ventas en local, debes "tunelizar" los webhooks:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

---

## 🚥 Cómo usar la Demo (Flujo de Atribución)

1. **Inicia Sesión:** Logueate con Google para que el sistema cree tu `apiKey` única.
2. **Visita la Demo:** Ve a `/demo`.
3. **Simula Clics:** Usa los botones de **Campaign Simulator** (Meta/Google).
4. **Compra:** Realiza una compra de prueba en el checkout de Stripe.
5. **Dashboard:** Refresca tu `/dashboard` y verás la orden atribuida a la fuente correcta.

## 📈 Camino hacia el MVP

1. Implementar gestión real de múltiples proyectos/sitios.
2. Añadir proxies para evadir bloqueadores de anuncios.
3. Integrar Stripe Billing para suscripciones SaaS.
4. Desarrollar gráficos de rendimiento temporal (gráficas de línea).

---

_Desarrollado como prototipo técnico para validación de flujo de atribución._
