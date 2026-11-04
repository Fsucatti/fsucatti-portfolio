# Portfolio de Francisco Sucatti

Sitio personal estático hecho con [Astro](https://astro.build), listo para publicarse en Cloudflare Workers. Mantiene la identidad visual del portfolio anterior (colores por página, tipografía mono, partículas, planeta 3D) con una base más rápida y fácil de modificar.

## Requisitos

- Node.js 22.23.4 o superior (`node -v` para comprobarlo).
- Microsoft Edge, solo para correr las pruebas en Windows.

## Puesta en marcha

```bash
npm install
```

```bash
cp .env.example .env
```

```bash
npm run dev
```

Abre <http://localhost:4321>. Sin las variables de EmailJS el sitio funciona igual, pero el formulario le pide al visitante que escriba por email.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run check` | Revisa los tipos de TypeScript y Astro |
| `npm run build` | Genera el sitio final en `dist/` |
| `npm run preview` | Sirve `dist/` con Wrangler, igual que Cloudflare |
| `npm test` | Pruebas de punta a punta. Corre `npm run build` antes |
| `npm run deploy` | Compila y publica en Cloudflare |

## Dónde está cada cosa

```text
src/
  data/site.ts        Nombre, email, enlaces y menú
  data/projects.ts    Lista de proyectos
  styles/global.css   Colores, fondos, botones y animaciones
  pages/              Una página por archivo; la ruta sale del nombre
  layouts/            Estructura común y etiquetas SEO
  components/         Menú lateral y tarjeta de proyecto
  scripts/            Partículas, planeta 3D y formulario
public/
  projects/           Imágenes de las tarjetas (800x500, WebP)
  _headers            Cabeceras de seguridad y caché de Cloudflare
tests/smoke.spec.ts   Pruebas de escritorio y móvil
wrangler.jsonc        Configuración de Cloudflare
```

## Más documentación

- [Cómo modificar el sitio](docs/CUSTOMIZING.md): textos, colores, proyectos y páginas.
- [Cómo publicarlo](docs/DEPLOY.md): Cloudflare, dominio y variables.
