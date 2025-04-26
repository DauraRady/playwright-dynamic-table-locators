import { test, expect } from "@playwright/test";

test("Approve all potatoes dynamically", async ({ page }) => {
  await page.goto("https://v0-loanding-page-v3-6lvm6ftih2p.vercel.app/");

  const rows = page.locator("tr"); // Trouve toutes les lignes du tableau
  const potatoRows = rows.filter({ hasText: "potato" }); // Ne garde que les lignes "potato"

  const count = await potatoRows.count();
  console.log(`Potatoes found: ${count}`);

  for (let i = 0; i < count; i++) {
    const approveButton = potatoRows
      .nth(i)
      .locator("button", { hasText: "Approve" });
    await approveButton.click();
    await page.getByRole("button", { name: "Confirm" }).click();
  }
});
