# Especificación de Requerimientos de Software (SRS) - AdTracker SaaS

## 1. Introducción

**Nombre del Proyecto:** AdTracker SaaS Prototipo
**Objetivo:** Ofrecer a clientes externos una forma sencilla de rastrear el ROI (Retorno de Inversión) de sus campañas de marketing (Meta Ads y Google Ads) utilizando atribución del lado del servidor e integración con Stripe.

## 2. Estado Actual del Prototipo (Mitos y Realidades)

- **Auth completa:** Registro e Login 100% funcionales y responsivos.
- **Tracking Universal:** El script `tracker.js` es capaz de seguir al usuario incluso si refresca la página gracias a la persistencia dual (Cookies + LocalStorage).
- **Atribución de Servidor:** No dependemos de que el navegador del usuario "avise" de la compra; Stripe nos avisa directamente, evadiendo bloqueos de frontend.

## 3. Requerimientos Cubiertos

### R1: Soporte Multi-tenant

- Tabla de `projects` vinculada a `users`.
- Generación de `apiKey` única por proyecto.
- Los logs de conversión filtran estrictamente por el proyecto activo del usuario.

### R2: Rastreo de Conversiones Atribuidas

- Detección de `utm_source`, `utm_medium`, `utm_campaign`.
- Detección de `fbclid` (Meta) y `gclid` (Google).
- Atribución por "Last Click" (Último clic) persistente.

### R3: Integración con Stripe

- Inyección de metadatos en `payment_intent`.
- Webhook seguro que procesa pagos exitosos.
- Sincronización automática de ingresos (`revenue`) en el dashboard.

### R4: Panel de Control (Dashboard)

- Resumen de sesiones y ventas totales.
- Tabla de logs con identificadores de transacciones reales de Stripe.
- Etiquetas de colores para identificar fuentes: **Google Ads (Verde)**, **Meta Ads (Azul)**, **Directo (Gris)**.

## 4. Próximos Pasos (Roadmap al MVP)

1.  **Gráficos de Tendencias:** Implementar gráficos de líneas para ver ventas diarias/semanales.
2.  **Gestión de Proyectos:** UI para que el usuario pueda crear y editar múltiples proyectos (actualmente limitado a uno por simplicidad).
3.  **Filtrado Avanzado:** Capacidad de filtrar el dashboard por rangos de fechas.
4.  **Integración de Gastos:** Posibilidad de subir cuánto se gastó en Meta/Google para calcular el ROAS automáticamente.

---

_Documentación de requerimientos para AdTracker v1 (Prototipo)._
