---
title: "Cases à cocher"
description: "Vérifie si une checkbox est cochée avec .checked"
difficulty: beginner
module: 8
exerciseNumber: "8.6"
duration: 5
tags:
  - formulaires
  - checkbox
  - checked
concepts:
  - Propriété checked
  - Valeur booléenne
  - Cases à cocher

exerciseType: html-css-js

starterCode:
  html: |
    <form id="preferences">
      <h3>Préférences</h3>

      <label class="option">
        <input type="checkbox" id="conditions" checked>
        J'accepte les conditions
      </label>

      <label class="option">
        <input type="checkbox" id="newsletter">
        S'inscrire à la newsletter
      </label>

      <label class="option">
        <input type="checkbox" id="sauvegarder" checked>
        Sauvegarder mes préférences
      </label>

      <button type="button" id="btn-verifier">Vérifier</button>
    </form>
    <div id="resultat"></div>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #preferences {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 300px;
    }

    h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 10px;
      background: #f3f4f6;
      border-radius: 6px;
    }

    .option:hover {
      background: #e5e7eb;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    button {
      padding: 12px;
      font-size: 16px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #059669;
    }

    #resultat {
      margin-top: 20px;
      padding: 15px;
      background: #f3f4f6;
      border-radius: 6px;
      font-family: monospace;
      white-space: pre-line;
    }
  js: |
    // Sélectionne les checkboxes
    const conditions = document.querySelector("#conditions")
    const newsletter = document.querySelector("#newsletter")
    const sauvegarder = document.querySelector("#sauvegarder")
    const bouton = document.querySelector("#btn-verifier")
    const resultat = document.querySelector("#resultat")

    bouton.addEventListener("click", () => {
      let texte = ""

      // 1. Vérifie si les conditions sont acceptées
      if (conditions.checked) {
        console.log("Conditions acceptées")
        texte += "✅ Conditions acceptées\n"
      } else {
        console.log("Conditions non acceptées")
        texte += "❌ Conditions non acceptées\n"
      }

      // 2. Vérifie si l'utilisateur veut la newsletter
      // Si oui : "Newsletter : oui", sinon : "Newsletter : non"


      // 3. Affiche l'état de sauvegarde (true ou false)
      console.log("Sauvegarder :", sauvegarder.checked)
      texte += "Sauvegarder : " + sauvegarder.checked

      resultat.textContent = texte
    })

solution:
  html: |
    <form id="preferences">
      <h3>Préférences</h3>

      <label class="option">
        <input type="checkbox" id="conditions" checked>
        J'accepte les conditions
      </label>

      <label class="option">
        <input type="checkbox" id="newsletter">
        S'inscrire à la newsletter
      </label>

      <label class="option">
        <input type="checkbox" id="sauvegarder" checked>
        Sauvegarder mes préférences
      </label>

      <button type="button" id="btn-verifier">Vérifier</button>
    </form>
    <div id="resultat"></div>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #preferences {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 300px;
    }

    h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 10px;
      background: #f3f4f6;
      border-radius: 6px;
    }

    .option:hover {
      background: #e5e7eb;
    }

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    button {
      padding: 12px;
      font-size: 16px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #059669;
    }

    #resultat {
      margin-top: 20px;
      padding: 15px;
      background: #f3f4f6;
      border-radius: 6px;
      font-family: monospace;
      white-space: pre-line;
    }
  js: |
    // Sélectionne les checkboxes
    const conditions = document.querySelector("#conditions")
    const newsletter = document.querySelector("#newsletter")
    const sauvegarder = document.querySelector("#sauvegarder")
    const bouton = document.querySelector("#btn-verifier")
    const resultat = document.querySelector("#resultat")

    bouton.addEventListener("click", () => {
      let texte = ""

      // 1. Vérifie si les conditions sont acceptées
      if (conditions.checked) {
        console.log("Conditions acceptées")
        texte += "✅ Conditions acceptées\n"
      } else {
        console.log("Conditions non acceptées")
        texte += "❌ Conditions non acceptées\n"
      }

      // 2. Vérifie si l'utilisateur veut la newsletter
      // Si oui : "Newsletter : oui", sinon : "Newsletter : non"
      if (newsletter.checked) {
        console.log("Newsletter : oui")
        texte += "📧 Newsletter : oui\n"
      } else {
        console.log("Newsletter : non")
        texte += "📧 Newsletter : non\n"
      }

      // 3. Affiche l'état de sauvegarde (true ou false)
      console.log("Sauvegarder :", sauvegarder.checked)
      texte += "💾 Sauvegarder : " + sauvegarder.checked

      resultat.textContent = texte
    })
  explanation: "La propriété .checked retourne true si la case est cochée, false sinon. Contrairement à .value qui retourne du texte."

validations:
  - description: "Vérifier newsletter.checked"
    type: code_contains
    expected: "newsletter.checked"
    errorMessage: "Vérifie newsletter.checked dans un if"
    successMessage: "Vérification checked OK !"
  - description: "Afficher Newsletter oui"
    type: code_contains
    expected: "Newsletter : oui"
    errorMessage: "Affiche 'Newsletter : oui' quand cochée"
    successMessage: "Message 'oui' OK !"
  - description: "Afficher Newsletter non"
    type: code_contains
    expected: "Newsletter : non"
    errorMessage: "Affiche 'Newsletter : non' quand non cochée"
    successMessage: "Message 'non' OK !"
  - description: "Checkbox existe"
    type: dom_contains
    selector: "#newsletter"
    errorMessage: "La checkbox #newsletter doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Propriété checked"
    content: ".checked retourne un booléen (true/false) :"
    example: "const checkbox = document.querySelector(\"#accord\")\n\nif (checkbox.checked) {\n  console.log(\"Coché !\")\n}"
  - title: "Différence avec value"
    content: "Ne confonds pas .value et .checked :"
    example: ".value   → Texte du champ\n.checked → Booléen (cochée ou non)"
  - title: "Solution"
    content: "Utilise if/else pour traiter les deux cas :"
    example: "if (newsletter.checked) {\n  console.log(\"Newsletter : oui\")\n} else {\n  console.log(\"Newsletter : non\")\n}"
    learnMore: "https://devjs.ch/formulaires/recuperer-valeur-champs.html"
---

# Cases à cocher

## 🎯 Objectif

Vérifier si une **case à cocher** est cochée avec `.checked`.

## 📖 Contexte

Les checkboxes utilisent `.checked` (pas `.value`) pour savoir si elles sont cochées :

```javascript
const checkbox = document.querySelector("#newsletter")

if (checkbox.checked) {
  console.log("Inscrit à la newsletter")
} else {
  console.log("Pas inscrit")
}
```

### .value vs .checked

| Propriété | Type | Utilisation |
|-----------|------|-------------|
| `.value` | String | Texte du champ |
| `.checked` | Boolean | Case cochée ? |

```javascript
// Pour un input text
input.value     // "Jean"

// Pour une checkbox
checkbox.checked  // true ou false
```

## 📝 Consigne

1. Vérifie si `newsletter.checked` est vrai
2. Si oui, affiche `"Newsletter : oui"`, sinon `"Newsletter : non"`

**Résultat attendu (avec les valeurs par défaut, newsletter non cochée) :**

```
Conditions acceptées
Newsletter : non
Sauvegarder : true
```

**Résultat attendu (si newsletter cochée) :**

```
Conditions acceptées
Newsletter : oui
Sauvegarder : true
```

**Teste en cochant/décochant puis en cliquant sur Vérifier !**

