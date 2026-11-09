/**
 * Projects shown on /projects, in display order.
 * To add one: put a 16:10 image in public/projects/ and add an entry here.
 * See docs/CUSTOMIZING.md.
 */
export interface Project {
  title: string;
  /** Address of its case study: /projects/<slug>. Needs an entry in case-studies.ts. */
  slug: string;
  description: string;
  /** File name inside public/projects/. */
  image: string;
  stack: string[];
  /** Live demo URL. Omit it if there is no demo. */
  demo?: string;
  /** Source code URL. */
  code: string;
}

export const projects: Project[] = [
  {
    title: "Refugio",
    slug: "refugio",
    description:
      "A logic puzzle game about rescuing cats: boards you can always solve without guessing, cats with powers, a shelter to restore, a shareable daily challenge and sound made entirely in code.",
    image: "refugio.webp",
    stack: ["React", "TypeScript", "Web Audio", "Playwright", "Cloudflare"],
    demo: "https://refugio.fsucatti-portfolio.workers.dev",
    code: "https://github.com/Fsucatti/refugio",
  },
  {
    title: "Nimbo",
    slug: "nimbo",
    description:
      "A detailed weather app for any place: a sky drawn from live data, an hour-by-hour meteogram, air quality, sun and moon, climate normals, nine models compared and rain radar.",
    image: "nimbo.webp",
    stack: ["React", "TypeScript", "D3", "MapLibre", "Cloudflare"],
    demo: "https://nimbo.fsucatti-portfolio.workers.dev",
    code: "https://github.com/Fsucatti/nimbo",
  },
  {
    title: "Telar",
    slug: "telar",
    description:
      "A visual AI agent builder: connect models, documents and tools on a canvas, then run them with real AI. Design by Julian Sucatti.",
    image: "telar.webp",
    stack: ["React", "TypeScript", "React Flow", "Workers AI", "Cloudflare"],
    demo: "https://telar.fsucatti-portfolio.workers.dev",
    code: "https://github.com/Fsucatti/telar",
  },
  {
    title: "Cantera",
    slug: "cantera",
    description:
      "An esports talent platform: browse job listings, apply, follow teams and message AI-played recruiters. Design by Julian Sucatti.",
    image: "cantera.webp",
    stack: ["React", "TypeScript", "Hono", "Cloudflare D1", "Workers AI"],
    demo: "https://cantera.fsucatti-portfolio.workers.dev",
    code: "https://github.com/Fsucatti/cantera",
  },
  {
    title: "Collab Notes",
    slug: "collab-notes",
    description:
      "Real-time collaborative docs with live presence, anchored comments, revision history, and public sharing.",
    image: "collaboration.webp",
    stack: ["Next.js", "TipTap", "PostgreSQL", "Prisma", "Durable Objects"],
    // The public guide opens without signing in; /docs asks for GitHub first.
    demo: "https://collab-app-fsucatti.vercel.app/p/guide",
    code: "https://github.com/Fsucatti/collab-app",
  },
  {
    title: "Journal App",
    slug: "journal-app",
    description:
      "A personal journal with user accounts, authentication, and full create, read, update, and delete for entries.",
    image: "journal.webp",
    stack: ["Next.js", "NextAuth", "Prisma", "MongoDB"],
    demo: "https://journal-app-francisco-sucatti.vercel.app/",
    code: "https://github.com/Fsucatti/journal-app",
  },
  {
    title: "Interactive Dashboard",
    slug: "interactive-dashboard",
    description:
      "A data visualization dashboard with analytics, reports, and settings sections.",
    image: "dashboard.webp",
    stack: ["Next.js", "Recharts", "Tailwind CSS"],
    demo: "https://dashboard-fsucatti.fsucatti-portfolio.workers.dev/",
    code: "https://github.com/Fsucatti/interactive-dashboard",
  },
  {
    title: "Calculator App",
    slug: "calculator-app",
    description: "A simple yet stylish calculator with smooth animations.",
    image: "calculator.webp",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    demo: "https://calculator-fsucatti.fsucatti-portfolio.workers.dev/",
    code: "https://github.com/Fsucatti/Calculator",
  },
  {
    title: "This Portfolio",
    slug: "portfolio",
    description:
      "The site you are on: a fast static build with a 3D globe, served from Cloudflare's network.",
    image: "portfolio.webp",
    stack: ["Astro", "TypeScript", "Three.js", "Cloudflare"],
    code: "https://github.com/Fsucatti/fsucatti-portfolio",
  },
];
