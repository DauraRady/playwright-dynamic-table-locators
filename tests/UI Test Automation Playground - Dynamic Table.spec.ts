import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/dynamictable");
  //await page.locator("#details-button").click(); // Click on the "Details" button to show the table
  //await page.locator("#proceed-link").click(); // Click on the "Proceed" link to continue to the table
});

test("CPU Chromium value", async ({ page }) => {
  const headers = page.locator(
    '[role="rowgroup"] [role="row"] [role="columnheader"]'
  );
  const texts = await headers.allInnerTexts();
  const cpuIndex = texts.findIndex((t) => t.trim() === "CPU");
  const chromeRow = page
    .locator('div[role="row"]', { hasText: "Chrome" })
    .first();
  const cpuCell = chromeRow.locator("span").nth(cpuIndex);
  const cpuValue = (await cpuCell.innerText()).replace(/\\u00a0/g, " ").trim();
  const label = await page.locator(".bg-warning").innerText();
  const [, labelValue] = label.match(/Chrome CPU:\s+([0-9.]+%)/) ?? [];
  expect(cpuValue).toBe(labelValue);
  console.log(`CPU Value: ${cpuValue}`); // Affiche la valeur de la cellule CPU
  console.log(`Label Value: ${labelValue}`); // Affiche la valeur du label
});
