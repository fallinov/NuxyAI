---
title: "Événements sur plusieurs éléments"
description: "Ajoute des événements à une liste d'éléments avec forEach"
difficulty: beginner
module: 8
exerciseNumber: "8.3"
duration: 7
tags:
  - événements
  - forEach
  - querySelectorAll
concepts:
  - querySelectorAll
  - forEach avec événements
  - Écouteurs multiples

exerciseType: html-css-js

starterCode:
  html: |
    <div class="palette">
      <button class="btn-color" data-color="red">Rouge</button>
      <button class="btn-color" data-color="green">Vert</button>
      <button class="btn-color" data-color="blue">Bleu</button>
    </div>
    <div id="apercu">
      Clique sur une couleur
    </div>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .palette {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .btn-color {
      padding: 10px 20px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-color[data-color="red"] {
      background: #fee2e2;
      color: #dc2626;
    }

    .btn-color[data-color="green"] {
      background: #dcfce7;
      color: #16a34a;
    }

    .btn-color[data-color="blue"] {
      background: #dbeafe;
      color: #2563eb;
    }

    .btn-color:hover {
      transform: scale(1.05);
    }

    #apercu {
      padding: 40px;
      text-align: center;
      border-radius: 8px;
      font-size: 18px;
      background: #f3f4f6;
      transition: all 0.3s;
    }
  js: |
    // Sélectionne tous les boutons de couleur
    const boutons = document.querySelectorAll(".btn-color")
    const apercu = document.querySelector("#apercu")

    // Ajoute un événement click à CHAQUE bouton
    // qui affiche sa couleur dans la console
    // et change le fond de #apercu
    boutons.forEach(btn => {
      // Récupère la couleur depuis data-color
      const couleur = btn.dataset.color

      // Ajoute l'événement click


    })

solution:
  html: |
    <div class="palette">
      <button class="btn-color" data-color="red">Rouge</button>
      <button class="btn-color" data-color="green">Vert</button>
      <button class="btn-color" data-color="blue">Bleu</button>
    </div>
    <div id="apercu">
      Clique sur une couleur
    </div>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .palette {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .btn-color {
      padding: 10px 20px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-color[data-color="red"] {
      background: #fee2e2;
      color: #dc2626;
    }

    .btn-color[data-color="green"] {
      background: #dcfce7;
      color: #16a34a;
    }

    .btn-color[data-color="blue"] {
      background: #dbeafe;
      color: #2563eb;
    }

    .btn-color:hover {
      transform: scale(1.05);
    }

    #apercu {
      padding: 40px;
      text-align: center;
      border-radius: 8px;
      font-size: 18px;
      background: #f3f4f6;
      transition: all 0.3s;
    }
  js: |
    // Sélectionne tous les boutons de couleur
    const boutons = document.querySelectorAll(".btn-color")
    const apercu = document.querySelector("#apercu")

    // Ajoute un événement click à CHAQUE bouton
    // qui affiche sa couleur dans la console
    // et change le fond de #apercu
    boutons.forEach(btn => {
      // Récupère la couleur depuis data-color
      const couleur = btn.dataset.color

      // Ajoute l'événement click
      btn.addEventListener("click", () => {
        console.log(couleur)
        apercu.style.backgroundColor = couleur
        apercu.textContent = "Couleur : " + couleur
      })
    })
  explanation: "Pour ajouter un événement à plusieurs éléments, on utilise forEach pour parcourir la liste et addEventListener sur chaque élément."

validations:
  - description: "Utiliser addEventListener dans forEach"
    type: code_contains
    expected: "addEventListener"
    errorMessage: "Utilise addEventListener dans la boucle forEach"
    successMessage: "Bien ! Chaque bouton écoute"
  - description: "Événement click"
    type: code_contains
    expected: '"click"'
    errorMessage: "L'événement doit être 'click'"
    successMessage: "Super ! Le clic est en place"
  - description: "Utiliser la variable couleur"
    type: code_contains
    expected: "couleur"
    errorMessage: "Utilise la variable couleur dans le callback"
    successMessage: "Top ! Tu utilises la bonne variable"
  - description: "Changer le fond de l'aperçu"
    type: code_contains
    expected: "backgroundColor"
    errorMessage: "Change la couleur de fond de l'aperçu avec backgroundColor"
    successMessage: "Bravo ! Les couleurs changent"
  - description: "Boutons de couleur existent"
    type: dom_contains
    selector: ".btn-color"
    errorMessage: "Les boutons .btn-color doivent exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Aperçu existe"
    type: dom_contains
    selector: "#apercu"
    errorMessage: "L'élément #apercu doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Parcourir et ajouter"
    content: "Utilise forEach pour parcourir et addEventListener pour chaque élément :"
    example: "boutons.forEach(btn => {\n  btn.addEventListener(\"click\", ...)\n})"
  - title: "Accéder à la couleur"
    content: "La couleur est déjà récupérée dans la variable couleur :"
    example: "btn.addEventListener(\"click\", () => {\n  console.log(couleur)\n})"
  - title: "Solution complète"
    content: "Combine forEach, addEventListener et console.log :"
    example: "btn.addEventListener(\"click\", () => {\n  console.log(couleur)\n  apercu.style.backgroundColor = couleur\n})"
    learnMore: "https://devjs.ch/dom/evenements.html"
---

# Événements sur plusieurs éléments

## 🎯 Objectif

Ajouter un **événement à plusieurs éléments** avec `forEach`.

## 📖 Contexte

Pour ajouter un événement à plusieurs éléments, on combine `querySelectorAll` et `forEach` :

```javascript
const boutons = document.querySelectorAll(".btn")

boutons.forEach(bouton => {
  bouton.addEventListener("click", () => {
    console.log("Bouton cliqué :", bouton.textContent)
  })
})
```

### Pourquoi forEach ?

`querySelectorAll` retourne une **liste** d'éléments. On ne peut pas faire `liste.addEventListener()` directement. Il faut parcourir chaque élément.

### Attributs data-* et dataset

Les attributs HTML `data-*` sont accessibles en JavaScript via la propriété `dataset` :

```javascript
// HTML : <button data-color="red">Rouge</button>
const btn = document.querySelector("button")
console.log(btn.dataset.color)  // "red"
```

| HTML | JavaScript |
|------|------------|
| `data-color="red"` | `element.dataset.color` |
| `data-user-id="42"` | `element.dataset.userId` |

::alert{type="info"}
**Note** : Les tirets (`data-user-id`) deviennent camelCase en JavaScript (`dataset.userId`)
::

## 📝 Consigne

Ajoute un événement `"click"` à **chaque bouton** qui :
1. Affiche la couleur dans la console
2. Change la couleur de fond de `#apercu`

**Résultat attendu (après clic sur "Rouge") :**
- Console : `red`
- L'apercu devient rouge

**Teste en cliquant sur les boutons de couleur !**

