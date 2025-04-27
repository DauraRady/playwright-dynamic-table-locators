import { test, expect } from "@playwright/test";

test("Cancel all tomatos dynamically", async ({ page }) => {
  await page.goto("https://v0-loanding-page-v3-6lvm6ftih2p.vercel.app/");

  const rows = page.locator("tr"); // Trouve toutes les lignes du tableau
  const tomatoRows = rows.filter({ hasText: "tomato" }); // Ne garde que les lignes "tomato"
  const count = await tomatoRows.count();
  console.log(`Tomatos found: ${count}`);
  for (let i = 0; i < count; i++) {
    const cancelButton = tomatoRows
      .nth(i)
      .getByRole("button", { name: "Cancel" }); // Ne garde que les boutons "Cancel"

    await cancelButton.click();
  } // Clique sur le bouton "Cancel"
});
