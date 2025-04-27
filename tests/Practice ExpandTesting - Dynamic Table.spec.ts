import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dynamic-table");
});

test("CPU Chromium value", async ({ page }) => {
  const rows = page.locator("tr"); // Trouve toutes les lignes du tableau
  //const chromeValue = rows.getByRole("cell", { name: "Chrome" });
  //const cpuValue = rows.getByRole("cell", { name: "CPU" });
  //const cpuValueText = await cpuValue.innerText(); // Récupère la valeur de la cellule CPU
  //const chromeValueText = await chromeValue.innerText(); // Récupère la valeur de la cellule Chrome
  //console.log(`CPU value: ${cpuValueText}`); // Affiche la valeur de la cellule CPU
  //console.log(`Chrome value: ${chromeValueText}`); // Affiche la valeur de la cellule Chrome
  // Locator sur tous les <th> de l’en-tête
  const headers = page.locator("thead tr th");
  // Tableau JS de leurs textes, ex. ['Name','Memory','CPU','Network']
  const texts = await headers.allInnerTexts();
  // Trouver où est “CPU” → index 2 (0-based)
  const cpuIndex = texts.findIndex((t) => t.trim() === "CPU");
  // Filtrer les <tr> du <tbody> qui contiennent “Chrome”
  const chromeRow = page.locator("tbody tr", { hasText: "Chrome" }).first();
  // Dans chromeRow : toutes les <td>, puis la Nᵉ cellule (cpuIndex)
  const cpuCell = chromeRow.locator("td").nth(cpuIndex);
  // Lire son texte et nettoyer les espaces
  const cpuValue = (await cpuCell.innerText()).trim();
  // Récupérer le label “Chrome CPU: xx%”
  const label = await page.locator(".bg-warning").innerText();
  // Extraire juste “xx%” via RegExp
  const [, labelValue] = label.match(/Chrome CPU:\s+([0-9.]+%)/) ?? [];
  // Assertion finale
  expect(cpuValue).toBe(labelValue);
  console.log(`CPU Value: ${cpuValue}`); // Affiche la valeur de la cellule CPU
  console.log(`Label Value: ${labelValue}`); // Affiche la valeur du label

  //const extractedCellValue = await extractedCell.innerText(); // Récupère le texte de la cellule
  //console.log(`Extracted Cell Value: ${extractedCellValue}`); // Affiche la valeur de la cellule extraite
  //const expectedcell = page.locator("#chrome-cpu");
  //const expCellValue = await expectedcell.innerText();
  //console.log(`Chrome CPU Value: ${expCellValue}`);
  //expect(extractedCellValue).toBe(expCellValue); // Vérifie que la valeur extraite est égale à la valeur attendue
});
