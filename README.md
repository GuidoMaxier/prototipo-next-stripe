# US Incorporation - All-in-one Solution Prototype

Este es un prototipo profesional de e-commerce para servicios de incorporación y finanzas en EE. UU., integrado con **Stripe** para pagos y preparado para el seguimiento de conversiones con **Meta Pixel** y **Google Ads**.

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js instalado.
- [Stripe CLI](https://github.com/stripe/stripe-cli/releases) (necesario para probar webhooks en local).

### Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tu archivo `.env.local` basado en `.env.local.example`.

### Ejecución Local

1. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:4242](http://localhost:4242).

2. Inicia el oyente de webhooks de Stripe (en una terminal separada):
   ```bash
   ./stripe.exe listen --forward-to localhost:4242/api/webhook
   ```

---

## 💳 Cómo Probar el Flujo de Pago

Este proyecto utiliza el modo de prueba de Stripe. Sigue estos pasos para realizar una compra simulada:

1. Ve a la página principal y haz clic en **"Empezar Ahora"**.
2. Serás redirigido a la pasarela segura de Stripe.
3. Utiliza los siguientes datos de tarjeta de prueba:
   - **Número de tarjeta**: `4242 4242 4242 4242`
   - **Fecha de expiración**: Cualquier fecha futura (ej. `12/30`)
   - **CVC**: `123`
   - **Nombre**: Juan Pérez
   - **Código Postal (US)**: `90210`
4. Al completar el pago, serás redirigido de vuelta a la página de **Éxito**.

---

## 📊 Seguimiento de Conversiones (Pixel)

El prototipo incluye una integración base para:

- **Meta Pixel**: Registra el evento `PageView` y el evento `Purchase` con el valor real de la transacción.
- **Google Analytics**: Registra visitas y conversiones de compra.

Para habilitarlos en producción, solo añade los IDs correspondientes en tus variables de entorno en Vercel.

---

## 🛠️ Tecnologías Usadas

- **Framework**: Next.js 16 (App Router)
- **Pagos**: Stripe Checkout
- **Tracking**: React Hooks para Google/Meta
- **Estilos**: Tailwind CSS 4.0



https://next-stripe-pixel.vercel.app/success?session_id=cs_test_SIMULACION