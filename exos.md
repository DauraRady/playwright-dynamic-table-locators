🧠 Exercices Guidés - Automation Playwright

1. 🔹 Practice ExpandTesting - Dynamic Table
   👉 Lien : https://practice.expandtesting.com/dynamic-table

Objectif :
Aller chercher la valeur du CPU du processus Chrome dans le tableau.

Vérifier que cette valeur est bien affichée dans l'étiquette jaune au-dessus.

Étapes guidées :
Aller sur la page Dynamic Table.

Sélectionner toutes les lignes du tableau : page.locator('div[role="row"]').

Filtrer la ligne contenant Chrome avec hasText: 'Chrome'.

Trouver la cellule CPU correspondante (attention : la position des colonnes change !).

Récupérer le texte (ex: "15%") de cette cellule.

Comparer cette valeur avec celle de l’étiquette jaune (qui est ailleurs dans la page).

Utiliser expect(valeurRecueillie).toBe(valeurAffichée).

2. 🔹 UI Test Automation Playground - Dynamic Table
   👉 Lien : https://www.uitestingplayground.com/dynamictable

Objectif :
Récupérer la performance (CPU) du navigateur Chrome dans un tableau qui change dynamiquement.

Vérifier que la valeur affichée correspond bien à ce qui est attendu.

Étapes guidées :
Aller sur la page Dynamic Table.

Utiliser locator('div[role="row"]') pour choper toutes les lignes.

Utiliser .filter({ hasText: 'Chrome' }) pour ne garder que Chrome.

Récupérer la cellule CPU correspondante.

Aller récupérer le texte dynamique au-dessus du tableau (dans une alerte / label).

Vérifier que les deux valeurs correspondent avec un expect.

3. 🔹 LetCode - Table
   👉 Lien : https://letcode.in/table

Objectif :
Trouver le prix d'un légume (ex : "Carrot").

Cliquer sur le bouton pour Edit cette ligne.

Étapes guidées :
Aller sur la page Table.

Utiliser locator('tr') pour trouver toutes les lignes du tableau.

Filtrer avec .filter({ hasText: 'Carrot' }).

Dans la même ligne, trouver le bouton Edit (peut être un button ou a).

Cliquer sur le bouton.

Bonus : Modifier le texte puis sauver !

4. 🔹 DemoQA - Web Tables
   👉 Lien : https://demoqa.com/webtables

Objectif :
Ajouter un nouvel employé dans le tableau.

Supprimer un employé existant.

Étapes guidées :
Cliquer sur le bouton Add pour ajouter une nouvelle entrée.

Remplir tous les champs du formulaire.

Cliquer sur Submit.

Trouver l’employé ajouté par son First Name.

Cliquer sur le bouton Delete de sa ligne.
