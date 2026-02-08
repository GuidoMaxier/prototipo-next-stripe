---
name: daisy-ui
description: Guía de mejores prácticas para DaisyUI (v5). Enfocado en el uso de componentes de utilidad, temas, y layouts de dashboard.
---

# DaisyUI Best Practices (v5)

DaisyUI es una librería de componentes de utilidad construida sobre Tailwind CSS. Permite crear interfaces consistentes y rápidas usando clases semánticas.

## Principios de Diseño

1. **Clases Semánticas**: Usa clases como `btn`, `card`, `modal` en lugar de construir componentes complejos desde cero con Tailwind puro.
2. **Temas**: Aprovecha el sistema de temas (data-theme) para manejar modos light/dark y paletas personalizadas.
3. **Dashboards**: Para dashboards, usa combinaciones de `drawer`, `sidebar` y `navbar` para una experiencia premium.

## Componentes Clave para Dashboards

- **Drawer**: Esencial para layouts con sidebar móvil/escritorio.
- **Stats**: Para mostrar indicadores clave de rendimiento (KPIs).
- **Cards**: Para agrupar contenido relacionado con bordes sutiles y sombras.
- **Steps**: Para indicar progreso en procesos (como la incorporación de la empresa).

## Ejemplo de Layout Premium

```tsx
<div className="drawer lg:drawer-open">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label
      htmlFor="my-drawer"
      className="btn btn-primary drawer-button lg:hidden"
    >
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label
      htmlFor="my-drawer"
      aria-label="close sidebar"
      className="drawer-overlay"
    ></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li>
        <a>Sidebar Item 1</a>
      </li>
      <li>
        <a>Sidebar Item 2</a>
      </li>
    </ul>
  </div>
</div>
```

## Tips Pro

- Usa `mask` para formas personalizadas en avatares e imágenes.
- Combina `backdrop-blur` con fondos semi-transparentes para efectos "glassmorphism".
- Siempre define el `data-theme` en el `html` para evitar parpadeos de color.
