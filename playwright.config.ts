import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  reporter: "line",
  use: {
    baseURL: "http://localhost:4321",
    // Uses the Edge already installed on Windows, so no browser download is needed.
    channel: process.env.CI ? undefined : "msedge",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: process.env.CI ? undefined : "msedge" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: process.env.CI ? undefined : "msedge" } },
  ],
  webServer: {
    // wrangler serves dist/ exactly as Cloudflare will, including _headers. Run `npm run build` first.
    command: "npm run preview",
    url: "http://localhost:4321",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
