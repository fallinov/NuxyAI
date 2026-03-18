---
title: "Modifier le contenu"
description: "Change le texte d'un élément HTML avec textContent"
difficulty: beginner
module: 7
exerciseNumber: "7.2"
duration: 5
tags:
  - DOM
  - textContent
  - modification
concepts:
  - Propriété textContent
  - Modification du DOM
  - Lecture et écriture

exerciseType: html-css-js

starterCode:
  html: |
    <h1 id="titre">Texte original</h1>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #titre {
      color: #2563eb;
    }
  js: |
    // 1. Sélectionne l'élément h1
    const titre = document.querySelector("#titre")

    // Affiche le contenu original
    console.log("Avant :", titre.textContent)

    // 2. Modifie le contenu avec "Nouveau contenu"


    // Affiche le nouveau contenu
    console.log("Après :", titre.textContent)

solution:
  html: |
    <h1 id="titre">Texte original</h1>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #titre {
      color: #2563eb;
    }
  js: |
    // 1. Sélectionne l'élément h1
    const titre = document.querySelector("#titre")

    // Affiche le contenu original
    console.log("Avant :", titre.textContent)

    // 2. Modifie le contenu avec "Nouveau contenu"
    titre.textContent = "Nouveau contenu"

    // Affiche le nouveau contenu
    console.log("Après :", titre.textContent)
  explanation: "textContent permet de lire ET modifier le texte d'un élément. C'est une propriété, pas une méthode."

validations:
  - description: "Modifier textContent"
    type: code_contains
    expected: "textContent"
    errorMessage: "Utilise la propriété textContent"
    successMessage: "Bien ! Tu utilises textContent"
  - description: "Assigner 'Nouveau contenu'"
    type: code_matches
    expected: "textContent\\s*=\\s*['\"]Nouveau contenu['\"]"
    errorMessage: "Assigne \"Nouveau contenu\" à textContent"
    successMessage: "Super ! Le contenu a changé"
  - description: "Élément #titre existe"
    type: dom_contains
    selector: "#titre"
    errorMessage: "L'élément #titre doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Lire vs Écrire"
    content: "textContent sert à lire ET à écrire :"
    example: "// Lire\nlet texte = element.textContent\n\n// Écrire\nelement.textContent = \"Nouveau\""
  - title: "C'est une propriété"
    content: "Pas de parenthèses ! C'est une propriété, pas une méthode :"
    example: "element.textContent = \"Texte\"  // OK\nelement.textContent(\"Texte\") // ERREUR"
  - title: "Solution"
    content: "Assigne la nouvelle valeur à textContent :"
    example: "titre.textContent = \"Nouveau contenu\""
    learnMore: "https://devjs.ch/dom/modifier-contenu.html"
---

# Modifier le contenu

## 🎯 Objectif

Modifier le **texte** d'un élément HTML avec `textContent`.

## 📖 Contexte

La propriété `textContent` permet de lire et modifier le texte :

```javascript
const titre = document.querySelector("h1")

// Lire le contenu
console.log(titre.textContent)  // "Ancien titre"

// Modifier le contenu
titre.textContent = "Nouveau titre"
```

### Lecture vs Écriture

```javascript
// Lecture (récupérer la valeur)
let valeur = element.textContent

// Écriture (modifier la valeur)
element.textContent = "Nouvelle valeur"
```

### textContent vs innerText

| Propriété | Comportement |
|-----------|--------------|
| `textContent` | Récupère tout le texte (même caché) |
| `innerText` | Récupère le texte visible uniquement |

::alert{type="success"}
**Conseil** : `textContent` est plus rapide et plus fiable. Utilise-le par défaut !
::

## 📝 Consigne

Modifie le `textContent` du titre avec la valeur `"Nouveau contenu"`.

**Résultat attendu :**
- Le titre change de "Texte original" à "Nouveau contenu"
- La console affiche "Avant : Texte original" puis "Après : Nouveau contenu"
