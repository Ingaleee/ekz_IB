const { chromium } = require("playwright");

const target = "http://89.169.160.128:8080";
const token =
  "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxIiwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiJJVE1PIEFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzgxOTc5NzcwfQ.";

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  await context.addCookies([
    {
      name: "auth",
      value: token,
      domain: "89.169.160.128",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);

  const page = await context.newPage();
  await page.goto(`${target}/admin`, { waitUntil: "networkidle" });
  await page.screenshot({ path: "screenshots/admin.png", fullPage: true });
  await browser.close();
})();
