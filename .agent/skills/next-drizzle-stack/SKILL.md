---
name: next-drizzle-stack
description: Mejores prácticas para el desarrollo con Next.js 16 (React 19), Drizzle ORM, Turso, Auth0 y DaisyUI. Úsalo para asegurar consistencia en la arquitectura y diseño de la aplicación.
---

# Next.js 16 & Drizzle Stack Skill

Este skill guía al agente para seguir los estándares más modernos de Next.js 16 y el ecosistema de Drizzle/Turso.

## Principios de Arquitectura

1. **Server Elements by Default**: Priorizar Server Components. Solo usar `"use client"` cuando sea estrictamente necesario (interactividad, hooks del cliente).
2. **Data Fetching**: Usar Server Actions o llamadas directas a la base de datos dentro de Server Components. Evitar la creación de rutas API internas intermedias si no son necesarias.
3. **Drizzle Performance**:
   - Usar `db.query` para lecturas complejas con relaciones.
   - Usar `db.insert(...).values(...)` para persistencia.
   - Definir siempre esquemas estrictos con tipos inferidos.

## Seguridad y Auth

1. **Middleware Protection**: Usar el middleware de Auth0 para proteger rutas enteras (`/profile`, `/dashboard`).
2. **Database Sync**: Al loguearse un usuario, verificar siempre su existencia en la tabla `usersTable` y sincronizar el `auth0Id` con el ID interno numeroc.
3. **Sensitive Info**: Nunca exponer `TURSO_AUTH_TOKEN` ni `AUTH0_SECRET` al lado del cliente.

## Estándares de Código

- Utilizar **TypeScript** estricto.
- Implementar **Loading UI** (`loading.tsx`) y **Error Boundaries** (`error.tsx`) en cada ruta principal.
- Seguir el patrón de diseño premium del Home utilizando Vanilla CSS o Tailwind CSS (según preferencia del usuario).

## Cuándo usar esta Skill

- Al crear nuevas tablas en el esquema.
- Al implementar nuevas rutas o componentes.
- Al configurar la lógica de autenticación o pagos.
