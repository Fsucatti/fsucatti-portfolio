// Regenerates a project card image from a live URL, using the installed Edge browser.
// Usage: node scripts/capture.mjs <url> <output-name> [wait-ms]
// Example: node scripts/capture.mjs https://example.com journal 2000
// The result is saved as public/projects/<output-name>.webp.
// sharp is not a project dependency: point SHARP_FROM at a package.json whose project has it installed.
import { chromium } from "@playwright/test";
import { createRequire } from "node:module";

const [url, name, wait = "2000"] = process.argv.slice(2);
if (!url || !name) {
  console.error("Usage: node scripts/capture.mjs <url> <output-name> [wait-ms]");
  process.exit(1);
}

const sharp = createRequire(process.env.SHARP_FROM || import.meta.url)("sharp");

const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(Number(wait));
const png = await page.screenshot({ type: "png" });
await browser.close();

await sharp(png).resize(800, 500).webp({ quality: 82 }).toFile(`public/projects/${name}.webp`);
console.log(`Saved public/projects/${name}.webp`);
