/**
 * Projects shown on /projects, in display order.
 * To add one: put a 16:10 image in public/projects/ and add an entry here.
 * See docs/CUSTOMIZING.md.
 */
export interface Project {
  title: string;
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
    title: "Collab Notes",
    description:
      "Real-time collaborative docs with live presence, anchored comments, revision history, and public sharing.",
    image: "collaboration.webp",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Socket.IO", "TipTap"],
    demo: "https://collab-app-fsucatti.vercel.app/docs",
    code: "https://github.com/Fsucatti/collab-app",
  },
  {
    title: "Journal App",
    description:
      "A personal journal with user accounts, authentication, and full create, read, update, and delete for entries.",
    image: "journal.webp",
    stack: ["Next.js", "NextAuth", "Prisma", "MongoDB"],
    demo: "https://journal-app-francisco-sucatti.vercel.app/",
    code: "https://github.com/Fsucatti/journal-app",
  },
  {
    title: "Interactive Dashboard",
    description:
      "A data visualization dashboard with analytics, reports, and settings sections.",
    image: "dashboard.webp",
    stack: ["Next.js", "Recharts", "Tailwind CSS"],
    demo: "https://dashboard-fsucatti.fsucatti-portfolio.workers.dev/",
    code: "https://github.com/Fsucatti/interactive-dashboard",
  },
  {
    title: "Calculator App",
    description: "A simple yet stylish calculator with smooth animations.",
    image: "calculator.webp",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    demo: "https://calculator-fsucatti.fsucatti-portfolio.workers.dev/",
    code: "https://github.com/Fsucatti/Calculator",
  },
  {
    title: "This Portfolio",
    description:
      "The site you are on: a fast static build with a 3D globe, served from Cloudflare's network.",
    image: "portfolio.webp",
    stack: ["Astro", "TypeScript", "Three.js", "Cloudflare"],
    code: "https://github.com/Fsucatti/fsucatti-portfolio",
  },
];
