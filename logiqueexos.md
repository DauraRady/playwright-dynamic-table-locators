🧠 La VRAIE logique pour lire un tableau dynamiquement

1. Pourquoi on fait tout ça ?
   Un tableau à l'écran, c'est une grille :

des colonnes (CPU, Memory, Name…)

des lignes (Chrome, Edge, Safari…)

des cellules (le croisement d'une ligne et d'une colonne)

En Playwright, on veut lire la bonne cellule.
Exemple :
🔵 Donne-moi la valeur "CPU" pour le navigateur "Chrome".

2. Comment on réfléchit toujours ?
   Toujours la même méthode, peu importe les balises :

| Étape | Ce qu'on cherche                                        | Comment                                                          |
| ----- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| 1️⃣    | Trouver la position de la colonne qu'on veut            | Chercher le nom de la colonne dans les en-têtes (avec findIndex) |
| 2️⃣    | Trouver la bonne ligne qui correspond à notre critère   | Chercher une ligne qui contient "Chrome", par exemple            |
| 3️⃣    | À partir de la ligne, récupérer la cellule au bon index | nth(index) pour attraper la bonne colonne dans la ligne          |

🔥 Le modèle universel :

// 1. Récupérer tous les headers
const headers = page.locator('[role=\"rowgroup\"] [role=\"row\"] [role=\"columnheader\"]');
const headerTexts = await headers.allInnerTexts();

// 2. Trouver l'index de la colonne \"CPU\"
const cpuIndex = headerTexts.findIndex((text) => text.trim() === \"CPU\");

// 3. Récupérer toutes les lignes du tableau
const rows = page.locator('[role=\"rowgroup\"]').nth(1).locator('[role=\"row\"]');

// 4. Trouver la ligne qui contient \"Chrome\"
const chromeRow = rows.filter({ hasText: \"Chrome\" }).first();

// 5. Dans cette ligne, récupérer toutes les cellules
const cells = chromeRow.locator('[role=\"cell\"]');

// 6. Récupérer la cellule correspondant à l'index CPU
const cpuCell = cells.nth(cpuIndex);
const cpuValue = (await cpuCell.innerText()).trim();

🛠 Pourquoi chaque étape est obligatoire ?

| Étape                             | Pourquoi ?                                                     |
| --------------------------------- | -------------------------------------------------------------- |
| 1. allInnerTexts()                | Tu veux avoir la liste de TOUS les titres.                     |
| 2. findIndex()                    | Tu veux savoir où est la colonne "CPU".                        |
| 3. .locator('[role=\"row\"]')     | Tu veux scanner toutes les lignes du tableau.                  |
| 4. .filter({ hasText: 'Chrome' }) | Tu veux isoler la ligne spécifique.                            |
| 5. .locator('[role=\"cell\"]')    | Tu veux voir toutes les cellules de cette ligne.               |
| 6. .nth(index)                    | Tu veux la cellule EXACTEMENT à la position de la colonne CPU. |

💥 Ce que tu dois retenir à vie :
✅ Le tableau = des lignes et des colonnes.
✅ Le texte du header te donne l’index de la colonne.
✅ La ligne "Chrome" te donne l’endroit où chercher.
✅ Tu prends la cellule à l'index trouvé.
✅ La balise HTML (table, div, span) on s’en fiche, seule la structure logique compte.

📣 Petite phrase pour graver ça dans ta tête :
"Je trouve la colonne, je trouve la ligne, j'attrape la cellule au croisement."

🚀 BONUS : le template que tu pourras copier-coller partout

async function getCellValue(page, searchRowText, searchColumnText) {
const headers = page.locator('[role=\"rowgroup\"] [role=\"row\"] [role=\"columnheader\"]');
const headerTexts = await headers.allInnerTexts();
const colIndex = headerTexts.findIndex((t) => t.trim() === searchColumnText);

const rows = page.locator('[role=\"rowgroup\"]').nth(1).locator('[role=\"row\"]');
const targetRow = rows.filter({ hasText: searchRowText }).first();

const cellValue = (await targetRow.locator('[role=\"cell\"]').nth(colIndex).innerText()).trim();
return cellValue;
}

// Utilisation
const cpu = await getCellValue(page, 'Chrome', 'CPU');
console.log(cpu);
