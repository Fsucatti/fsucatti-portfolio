import type { APIRoute } from "astro";
import { projects } from "../data/projects";

/** Every public page. New projects appear here on their own. */
export const GET: APIRoute = ({ site }) => {
  const paths = ["/", "/about", "/projects", "/contact", ...projects.map((project) => `/projects/${project.slug}`)];
  const base = site ?? "http://localhost:4321";
  const urls = paths.map((path) => `  <url><loc>${new URL(path, base).href}</loc></url>`).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
