import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";

const pages = [
  { path: "/", heading: "Francisco Sucatti" },
  { path: "/about", heading: "About Me" },
  { path: "/projects", heading: "PROJECTS" },
  { path: "/contact", heading: "Contact Me" },
];

for (const { path, heading } of pages) {
  test(`${path} renders without errors or sideways scroll`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      // Third-party map content and WebGL availability are outside this site's control.
      if (message.type() === "error" && !/google|gstatic|WebGL/i.test(message.text())) errors.push(message.text());
    });

    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await page.waitForTimeout(800);

    expect(errors).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("navigation works from every link", async ({ page }) => {
  await page.goto("/");
  for (const { path, heading } of pages.slice(1)) {
    await page.locator(`header a[href="${path}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }
});

test("about text keeps its spaces", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("main")).toContainText("I'm a full-stack developer");
  await expect(page.locator("main")).toContainText("find me going on bike rides");
});

test("desktop rail labels stay hidden until hover", async ({ page, isMobile }) => {
  test.skip(isMobile, "Mobile always shows its labels");
  await page.goto("/projects");
  const link = page.locator('header a[href="/about"]');
  const label = link.locator("span");
  await page.mouse.move(800, 400);
  await expect(label).toHaveCSS("opacity", "0");
  await link.hover();
  await expect(label).toHaveCSS("opacity", "1");
});

test("every project has a working case study", async ({ page }) => {
  for (const project of projects) {
    await page.goto(`/projects/${project.slug}`);
    await expect(page.getByRole("heading", { level: 1, name: project.title })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Key decisions" })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  }
  await page.goto("/projects");
  await page.getByRole("link", { name: `Case study of ${projects[0].title}` }).click();
  await expect(page).toHaveURL(new RegExp(`/projects/${projects[0].slug}$`));
});

test("sitemap lists every page and robots points to it", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const project of projects) expect(sitemap).toContain(`/projects/${project.slug}</loc>`);
  expect(await (await request.get("/robots.txt")).text()).toContain("sitemap.xml");
});

test("both CVs are served as PDF files", async ({ request }) => {
  for (const path of ["/cv/Francisco_Sucatti_CV_EN.pdf", "/cv/Francisco_Sucatti_CV_ES.pdf"]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("pdf");
  }
});

test("every project shows its links and a loaded image without hovering", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator("article")).toHaveCount(projects.length);

  for (const project of projects) {
    const card = page.locator("article", { hasText: project.title });
    await expect(card.locator(`a[href="${project.code}"]`)).toBeVisible();
    if (project.demo) await expect(card.locator(`a[href="${project.demo}"]`)).toBeVisible();

    const image = card.locator("img");
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
});

test("contact form requires its fields and sends to EmailJS", async ({ page }) => {
  // The request is intercepted, so no real email is ever sent.
  let sent = false;
  await page.route("https://api.emailjs.com/**", (route) => {
    sent = true;
    return route.fulfill({ status: 200, body: "OK" });
  });

  await page.goto("/contact");
  await page.getByRole("button", { name: "Send Message" }).click();
  expect(sent).toBe(false);

  await page.getByPlaceholder("Name").fill("Test");
  await page.getByPlaceholder("Email").fill("test@example.com");
  await page.getByPlaceholder("Subject").fill("Hello");
  await page.getByPlaceholder("Message").fill("Testing the form");
  await page.getByRole("button", { name: "Send Message" }).click();

  await expect(page.getByRole("status")).toContainText("Message sent");
  expect(sent).toBe(true);
  await expect(page.getByPlaceholder("Name")).toHaveValue("");
});

test("unknown pages return a real 404", async ({ page }) => {
  const response = await page.goto("/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});
