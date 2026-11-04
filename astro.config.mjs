// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Public URL of the site. Set SITE_URL when deploying to enable canonical and Open Graph URLs.
  site: process.env.SITE_URL || undefined,
  output: "static",
  vite: { plugins: [tailwindcss()] },
});
