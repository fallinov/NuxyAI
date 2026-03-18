---
title: "Lire la valeur d'un champ"
description: "Récupère le texte saisi par l'utilisateur avec .value"
difficulty: beginner
module: 8
exerciseNumber: "8.5"
duration: 5
tags:
  - formulaires
  - value
  - input
concepts:
  - Propriété value
  - Champs de saisie
  - Récupération de données

exerciseType: html-css-js

starterCode:
  html: |
    <form id="profil">
      <div class="champ">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" value="Marie">
      </div>
      <div class="champ">
        <label for="email">Email :</label>
        <input type="email" id="email" value="marie@email.ch">
      </div>
      <div class="champ">
        <label for="age">Âge :</label>
        <input type="number" id="age" value="25">
      </div>
      <button type="button" id="btn-afficher">Afficher les valeurs</button>
    </form>
    <div id="resultat"></div>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #profil {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 300px;
    }

    .champ {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      font-weight: bold;
      font-size: 14px;
    }

    input {
      padding: 10px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 6px;
    }

    input:focus {
      border-color: #3b82f6;
      outline: none;
    }

    button {
      padding: 12px;
      font-size: 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #2563eb;
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
    // Sélectionne les champs
    const champNom = document.querySelector("#nom")
    const champEmail = document.querySelector("#email")
    const champAge = document.querySelector("#age")
    const bouton = document.querySelector("#btn-afficher")
    const resultat = document.querySelector("#resultat")

    bouton.addEventListener("click", function() {
      // 1. Récupère la valeur du champ nom
      const nom = champNom.value

      // 2. Récupère la valeur du champ email


      // 3. Récupère la valeur du champ age


      // Affiche les valeurs
      console.log("Nom :", nom)
      console.log("Email :", email)
      console.log("Age :", age)

      resultat.textContent = "Nom : " + nom + "\nEmail : " + email + "\nAge : " + age
    })

solution:
  html: |
    <form id="profil">
      <div class="champ">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" value="Marie">
      </div>
      <div class="champ">
        <label for="email">Email :</label>
        <input type="email" id="email" value="marie@email.ch">
      </div>
      <div class="champ">
        <label for="age">Âge :</label>
        <input type="number" id="age" value="25">
      </div>
      <button type="button" id="btn-afficher">Afficher les valeurs</button>
    </form>
    <div id="resultat"></div>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #profil {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 300px;
    }

    .champ {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      font-weight: bold;
      font-size: 14px;
    }

    input {
      padding: 10px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 6px;
    }

    input:focus {
      border-color: #3b82f6;
      outline: none;
    }

    button {
      padding: 12px;
      font-size: 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #2563eb;
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
    // Sélectionne les champs
    const champNom = document.querySelector("#nom")
    const champEmail = document.querySelector("#email")
    const champAge = document.querySelector("#age")
    const bouton = document.querySelector("#btn-afficher")
    const resultat = document.querySelector("#resultat")

    bouton.addEventListener("click", function() {
      // 1. Récupère la valeur du champ nom
      const nom = champNom.value

      // 2. Récupère la valeur du champ email
      const email = champEmail.value

      // 3. Récupère la valeur du champ age
      const age = champAge.value

      // Affiche les valeurs
      console.log("Nom :", nom)
      console.log("Email :", email)
      console.log("Age :", age)

      resultat.textContent = "Nom : " + nom + "\nEmail : " + email + "\nAge : " + age
    })
  explanation: "La propriété .value contient le texte saisi dans un champ input, textarea ou select. C'est toujours une chaîne de caractères."

validations:
  - description: "Récupérer email avec .value"
    type: code_contains
    expected: "champEmail.value"
    errorMessage: "Utilise champEmail.value pour récupérer l'email"
    successMessage: "Email récupéré !"
  - description: "Récupérer age avec .value"
    type: code_contains
    expected: "champAge.value"
    errorMessage: "Utilise champAge.value pour récupérer l'âge"
    successMessage: "Âge récupéré !"
  - description: "Stocker dans une variable"
    type: code_matches
    expected: "(const|let)\\s+(email|age)\\s*="
    errorMessage: "Stocke les valeurs dans des variables"
    successMessage: "Variables créées !"
  - description: "Champs existent"
    type: dom_contains
    selector: "#nom"
    errorMessage: "Le champ #nom doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Propriété value"
    content: "Chaque champ de formulaire a une propriété value :"
    example: "const input = document.querySelector(\"#nom\")\nconst valeur = input.value"
  - title: "Types de champs"
    content: ".value fonctionne sur tous ces éléments :"
    example: "<input type=\"text\">   → .value\n<input type=\"email\">  → .value\n<textarea>           → .value\n<select>             → .value"
  - title: "Solution"
    content: "Récupère chaque valeur dans une variable :"
    example: "const email = champEmail.value\nconst age = champAge.value"
    learnMore: "https://devjs.ch/formulaires/recuperer-valeur-champs.html"
---

# Lire la valeur d'un champ

## 🎯 Objectif

Récupérer le **texte saisi** par l'utilisateur dans un champ de formulaire.

## 📖 Contexte

La propriété `.value` contient la valeur saisie dans un champ :

```javascript
const input = document.querySelector("#prenom")
const prenom = input.value  // "Jean"

console.log("Bonjour", prenom)
```

### Champs compatibles avec .value

| Élément HTML | Exemple |
|--------------|---------|
| `<input type="text">` | Texte simple |
| `<input type="email">` | Email |
| `<input type="password">` | Mot de passe |
| `<textarea>` | Zone de texte |
| `<select>` | Menu déroulant |

### ⚠️ Toujours une chaîne de caractères

`.value` retourne **toujours du texte**, même pour un champ numérique :

```javascript
// HTML : <input type="number" id="age" value="25">
const age = document.querySelector("#age").value

console.log(age)        // "25" (texte, pas nombre !)
console.log(typeof age) // "string"

// Pour comparer avec un nombre, utilise Number()
if (Number(age) >= 18) {
  console.log("Majeur")
}
```

::alert{type="warning"}
**Piège courant** : `"25" < 18` donne `false` mais `"5" < 18` donne... `true` ! Toujours convertir avec `Number()` pour les comparaisons numériques.
::

## 📝 Consigne

Complète le code pour récupérer les valeurs des champs `email` et `age` avec `.value`.

**Résultat attendu (après clic sur "Afficher les valeurs") :**

```
Nom : Marie
Email : marie@email.ch
Age : 25
```

**Teste en cliquant sur le bouton !**

