# Especificación de Requerimientos de Software (SRS) - AdTracker SaaS

## 1. Introducción

**Nombre del Proyecto:** AdTracker SaaS Prototipo
**Objetivo:** Ofrecer a clientes externos una forma sencilla de rastrear el ROI (Retorno de Inversión) de sus campañas de marketing (Meta Ads y Google Ads) utilizando atribución del lado del servidor e integración con Stripe.

## 2. Arquitectura del Sistema

- **Framework:** Next.js 16 (App Router)
- **Base de Datos:** Turso (SQLite a través de Drizzle ORM)
- **Autenticación:** Auth.js (NextAuth)
- **Procesador de Pagos:** Stripe
- **Motor de Rastreo:** Script de JavaScript Universal Personalizado (tracker.js)

## 3. Requerimientos Principales

### R1: Soporte Multi-tenant (Multi-cliente)

- Cada usuario (agencia o vendedor) puede tener múltiples proyectos dentro de su cuenta.
- Cada proyecto debe tener una `apiKey` única para identificar el script en la web del cliente.
- Aislamiento de datos: los pedidos y las visitas deben estar vinculados estrictamente a un `projectId`.

### R2: Rastreo de Conversiones Atribuidas

- Captura de parámetros UTM (`utm_source`, `utm_medium`, `utm_campaign`).
- Captura de identificadores de clic de plataformas de anuncios (`fbclid` para Facebook, `gclid` para Google).
- Persistencia de datos de atribución a través de cookies del lado del servidor por 24 horas.

### R3: Integración con Stripe

- Mapéo de metadatos de rastreo a las Sesiones de Pago de Stripe (Checkout sessions).
- Escucha de Webhooks para procesar eventos de `checkout.session.completed`.
- Desglose automático de ingresos según la fuente de marketing (Meta, Google, Orgánico).

### R4: Panel de Control del Cliente (Dashboard)

- Visualización en tiempo real de:
  - Total de Visitas
  - Tasa de Conversión (%)
  - Total de Pedidos (Atribuidos por fuente)
  - Logs detallados de cada conversión

## 4. Seguridad y Cumplimiento

- CORS habilitado en la API de Rastreo para permitir la recepción de eventos desde dominios autorizados.
- Validación de API Key para cada señal de rastreo entrante.
- Verificación de firma de Webhooks para eventos de Stripe.

## 5. Hoja de Ruta Futura (Roadmap)

- Soporte para PayPal y otros procesadores usando los Métodos de Pago Automáticos de Stripe.
- Modelado de atribución multi-toque (Primer clic vs. Último clic).
- Evasión de bloqueadores de anuncios (Ad-blockers) usando proxy del lado del servidor.
- Facturación de suscripciones automatizada para los usuarios del SaaS.
