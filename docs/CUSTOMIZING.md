# Cómo modificar el sitio

## Cambiar tus datos

Edita `src/data/site.ts`: nombre, rol, email, ubicación, GitHub, LinkedIn y mapa. Todas las páginas leen de ahí.

## Agregar o cambiar un proyecto

1. Guarda una imagen de 800x500 en `public/projects/`, preferentemente WebP.
2. Agrega una entrada en `src/data/projects.ts`:

```ts
{
  title: "Mi proyecto",
  description: "Qué hace, en una o dos frases.",
  image: "mi-proyecto.webp",
  stack: ["Astro", "TypeScript"],
  demo: "https://mi-proyecto.example.com", // opcional
  code: "https://github.com/Fsucatti/mi-proyecto",
},
```

El orden del archivo es el orden en pantalla. Si no hay `demo`, el botón no aparece.

### Sacar una captura de un proyecto online

`scripts/capture.mjs` abre la URL en Edge y guarda la imagen ya recortada. Necesita `sharp`, que no es dependencia de este proyecto, así que indica un `package.json` de un proyecto que lo tenga con `SHARP_FROM`:

```bash
SHARP_FROM=/ruta/a/otro-proyecto/package.json node scripts/capture.mjs https://mi-proyecto.example.com mi-proyecto 3000
```

## Cambiar colores

Todo está en `src/styles/global.css`:

- **Colores generales:** el bloque `@theme`. `--color-accent` es el amarillo del menú y los títulos.
- **Fondo de cada página:** los bloques `body[data-aura="..."]`. `--aura` es el degradado y `--aura-glow` el resplandor.
- **Degradados de títulos:** `.gradient-name` en el inicio y `.gradient-title` en proyectos y contacto.
- **Partículas:** la constante `COLORS` de `src/scripts/particles.ts`.

## Cambiar textos

| Texto | Archivo |
|---|---|
| Inicio | `src/pages/index.astro` y `role` en `site.ts` |
| Sobre mí y herramientas | `src/pages/about.astro` |
| Contacto | `src/pages/contact.astro` |
| Título y descripción para buscadores | Props `title` y `description` de `BaseLayout` en cada página |

Si una línea termina en texto y la siguiente empieza con una etiqueta, agrega `{" "}` para conservar el espacio. Astro lo elimina al compilar, y la prueba `about text keeps its spaces` cubre ese caso en la página Sobre mí.

## Agregar una página

1. Crea `src/pages/blog.astro`. La ruta será `/blog`.
2. Envuelve el contenido en `BaseLayout`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Blog" aura="projects">
  <h1>Blog</h1>
</BaseLayout>
```

3. Agrégala a `navigation` en `src/data/site.ts`.
4. El ícono se elige con `icon`. Para sumar uno nuevo, agrega su trazado SVG a `icons` en `src/components/Sidebar.astro`.

## Planeta 3D

Está en `src/scripts/earth.ts` y solo se descarga en `/about`. La textura es `public/planet.jpg`. Ahí se ajustan la velocidad de rotación y la cantidad de estrellas.

## Antes de publicar

```bash
npm run check
```

```bash
npm run build
```

```bash
npm test
```

Las pruebas no envían emails reales: interceptan la llamada a EmailJS.
