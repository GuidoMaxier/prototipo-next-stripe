# 🎯 AdTracker SaaS - Prototipo de Atribución Científica

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-SDK-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.x-5AD3D6?style=for-the-badge&logo=daisyui&logoColor=white)

> [!IMPORTANT]
> **ESTO ES UN PROTOTIPO TÉCNICO.**
> Validamos el flujo completo de atribución: desde que un usuario hace clic en un anuncio hasta que el dinero llega a tu cuenta de Stripe, asegurando que el dato de marketing nunca se pierda.

---

## 🚀 Logros del Prototipo (Hasta Hoy)

- **Atribución Blindada:** Los datos de marketing (`UTMs`, `fbclid`, `gclid`) viajan dentro de los metadatos de Stripe.
- **Multi-Tenant:** Sistema de cuentas con Google Auth donde cada usuario tiene su propia `apiKey` y Dashboard privado.
- **Dashboard en Tiempo Real:** Visualización de ventas, ingresos y logs de conversión filtrados por fuente (Meta vs Google).
- **Diseño Premium:** Interfaz oscura, minimalista y **100% responsiva** (Mobile-First) usando DaisyUI y Tailwind.
- **Integración Nativa:** Webhooks de Stripe procesan las ventas y las vinculan automáticamente al usuario correcto.

## 🛠️ Cómo funciona el Tracking

Para usar AdTracker en cualquier sitio web, solo se necesita insertar este script:

```html
<script
  src="http://localhost:3000/tracker.js"
  data-client-id="TU_API_KEY_AQUÍ"
  async
></script>
```

### El Ciclo de Vida del Dato:

1. **Captura:** El script detecta los parámetros en la URL y los guarda en una **Cookie segura** y **LocalStorage**.
2. **Puente:** Al crear el pago en Stripe, el servidor lee esa cookie e inyecta los datos en el `payment_intent` de Stripe.
3. **Cierre:** Stripe confirma el pago -> El Webhook recibe los datos -> El Dashboard muestra la venta atribuida.

---

## 📦 Documentación Técnica

- [🏗️ Arquitectura del Proyecto](./docs/arquitectura-proyecto.md) - El flujo de datos detallado.
- [🎓 Simulación de Tracking](./docs/simulacion-tracking.md) - Cómo funcionan los Pixels y eventos de conversión.
- [📝 Requerimientos (SRS)](./docs/srs-adtracker.md) - Visión técnica y Roadmap.

---

## ⚙️ Configuración para Desarrolladores

### 1. Variables de Entorno (`.env.local`)

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PRICE_INCORPORATION=price_...

# Database (Turso/SQLite)
DATABASE_URL=file:local.db # O URL de Turso

# Auth (Auth.js v5)
AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
```

### 2. Comandos Vitales

```bash
npm install        # Instalar dependencias
npm run dev        # Iniciar servidor de desarrollo
npx drizzle-kit push # Sincronizar base de datos
```

### 3. Stripe CLI (Requerido para Webhooks)

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

---

_Desarrollado con enfoque en precisión de datos y diseño premium._
