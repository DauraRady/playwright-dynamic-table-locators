# 🥔 Playwright - Dynamic Item Approval Challenge

---

## 📚 Présentation du projet

Cet exercice est un projet d'entraînement à l'automatisation de tests avec Playwright.

Le but est d'apprendre à :

- Manipuler un **DOM dynamique** (les lignes changent à chaque chargement).
- Utiliser des **stratégies de localisation d'éléments** de manière **fiable** et **stable**.
- Approuver dynamiquement tous les éléments ayant pour type **"potato"**.

Le projet est conçu avec un **objectif éducatif** : comprendre les bases solides de l'automatisation Playwright.

---

## 🌐 Description du site

Le site présente un **tableau dynamique de 20 lignes** :

- Chaque ligne contient : un **ID**, un **Type** (ex: "potato" ou "tomato"), un **Statut** ("needs approval") et des **actions** ("Approve", "Cancel").
- **À chaque rechargement**, l’ordre des lignes change aléatoirement.

---

## 🎯 Objectif du test

- Trouver **toutes les lignes contenant "potato"**.
- Cliquer sur le bouton **"Approve"** de chacune.

**Contrainte importante :**  
Les positions dans le DOM **changent** à chaque rechargement.  
Les sélections doivent être **résilientes** et **dynamiques**.

---

## 🧩 Structure du DOM - Lire un tableau

Un tableau HTML typique ressemble à :

```html
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Type</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>potato</td>
      <td>needs approval</td>
      <td><button>Approve</button></td>
    </tr>
  </tbody>
</table>
```

Élément | Signification

<table> | Structure du tableau
<thead> | En-tête de colonnes
<tbody> | Corps du tableau
<tr>    | Ligne de tableau
<td>    | Cellule de tableau

🧠 Méthodologie recommandée

1. Prioriser les locators user-facing
   Les user-facing locators sont basés sur :

Le texte visible,

Les rôles accessibles (button, row, cell).

Avantages :

Plus stables.

Moins sensibles aux changements du code front.

Alignés avec les bonnes pratiques d’accessibilité web.

| Stratégie           | Usage                                                | Exemple                                       |
| ------------------- | ---------------------------------------------------- | --------------------------------------------- |
| getByRole + name    | Sélectionner un bouton ou un input par accessibilité | page.getByRole('button', { name: 'Approve' }) |
| getByText           | Sélectionner par texte visible                       | page.getByText('potato')                      |
| locator + hasText   | Sélectionner un parent contenant un texte spécifique | page.locator('tr', { hasText: 'potato' })     |
| locator().locator() | Naviguer parent → enfant pour cliquer sur un bouton  | row.locator('button', { hasText: 'Approve' }) |

3. Logique Parent / Child
   🧠 Pour fiabiliser :

Sélectionner toutes les lignes (locator('tr')).

Filtrer celles contenant "potato" (filter({ hasText: 'potato' })).

Trouver et cliquer sur le bouton "Approve" à l'intérieur.

🏗 Structure du projet
playwright-dynamic-locators-practice/
├── tests/
│ └── potatoApproval.spec.ts
├── playwright.config.ts
├── README.md
├── package.json
└── tests-examples/ (optionnel)

🛠 Outils Playwright utiles

| Outil        | Description                                   | Commande                            |
| ------------ | --------------------------------------------- | ----------------------------------- |
| Codegen      | Générer du code automatiquement en live       | npx playwright codegen <URL>        |
| UI Mode      | Lancer les tests dans une interface graphique | npx playwright test --ui            |
| Debug Mode   | Exécuter les tests pas à pas au ralenti       | npx playwright test --debug         |
| Trace Viewer | Revoir l'exécution étape par étape            | npx playwright show-trace trace.zip |

📈 Schéma visuel rapide
Table (table)
└── Ligne 1 (tr)
├── Cellule ID (td)
├── Cellule Type (td) → "potato"
├── Cellule Status (td)
└── Cellule Actions (td) → Boutons Approve/Cancel
└── Ligne 2 (tr)
└── Ligne 3 (tr)
etc.
