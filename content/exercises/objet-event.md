---
title: "L'objet event"
description: "Accède aux informations de l'événement via l'objet event"
difficulty: beginner
module: 8
exerciseNumber: "8.2"
duration: 6
tags:
  - événements
  - event
  - target
concepts:
  - Objet event
  - event.type
  - event.target

exerciseType: html-css-js

starterCode:
  html: |
    <div class="boutons">
      <button id="btn-achat" class="btn">Acheter</button>
      <button id="btn-panier" class="btn">Ajouter au panier</button>
      <button id="btn-favoris" class="btn">Favoris</button>
    </div>
    <p id="info"></p>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .boutons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      font-size: 14px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn:hover {
      background: #059669;
    }

    #info {
      margin-top: 20px;
      padding: 15px;
      background: #f3f4f6;
      border-radius: 4px;
      font-family: monospace;
    }
  js: |
    // Sélectionne tous les boutons
    const boutons = document.querySelectorAll(".btn")
    const info = document.querySelector("#info")

    // Ajoute un événement click à chaque bouton
    boutons.forEach(bouton => {
      bouton.addEventListener("click", event => {
        // 1. Affiche le type d'événement
        console.log("Type :", event.type)

        // 2. Affiche le texte du bouton cliqué (event.target.textContent)


        // 3. Affiche l'id du bouton cliqué (event.target.id)


        // Bonus : affiche les infos dans #info
      })
    })

solution:
  html: |
    <div class="boutons">
      <button id="btn-achat" class="btn">Acheter</button>
      <button id="btn-panier" class="btn">Ajouter au panier</button>
      <button id="btn-favoris" class="btn">Favoris</button>
    </div>
    <p id="info"></p>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .boutons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      font-size: 14px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn:hover {
      background: #059669;
    }

    #info {
      margin-top: 20px;
      padding: 15px;
      background: #f3f4f6;
      border-radius: 4px;
      font-family: monospace;
    }
  js: |
    // Sélectionne tous les boutons
    const boutons = document.querySelectorAll(".btn")
    const info = document.querySelector("#info")

    // Ajoute un événement click à chaque bouton
    boutons.forEach(bouton => {
      bouton.addEventListener("click", event => {
        // 1. Affiche le type d'événement
        console.log("Type :", event.type)

        // 2. Affiche le texte du bouton cliqué (event.target.textContent)
        console.log("Texte :", event.target.textContent)

        // 3. Affiche l'id du bouton cliqué (event.target.id)
        console.log("ID :", event.target.id)

        // Bonus : affiche les infos dans #info
        info.textContent = "Cliqué : " + event.target.textContent + " (id: " + event.target.id + ")"
      })
    })
  explanation: "L'objet event contient toutes les informations sur l'événement. event.target référence l'élément qui a déclenché l'événement."

validations:
  - description: "Utiliser event.target.textContent"
    type: code_contains
    expected: "event.target.textContent"
    errorMessage: "Utilise event.target.textContent pour le texte"
    successMessage: "Bien ! Tu récupères le texte du bouton"
  - description: "Utiliser event.target.id"
    type: code_contains
    expected: "event.target.id"
    errorMessage: "Utilise event.target.id pour l'identifiant"
    successMessage: "Super ! Tu accèdes à l'ID"
  - description: "Afficher dans la console"
    type: code_matches
    expected: "console\\.log.*event\\.target"
    errorMessage: "Affiche les informations avec console.log"
    successMessage: "Bravo ! Tout s'affiche dans la console"
  - description: "Boutons existent"
    type: dom_contains
    selector: ".btn"
    errorMessage: "Les boutons .btn doivent exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "L'objet event"
    content: "Quand un événement se produit, JavaScript crée un objet avec des infos :"
    example: "event.type   // \"click\", \"keydown\", etc.\nevent.target // L'élément cliqué"
  - title: "Accéder à target"
    content: "event.target est l'élément HTML qui a déclenché l'événement :"
    example: "event.target.textContent // Texte de l'élément\nevent.target.id          // ID de l'élément\nevent.target.className   // Classes CSS"
  - title: "Solution"
    content: "Utilise console.log avec event.target :"
    example: "console.log(\"Texte :\", event.target.textContent)\nconsole.log(\"ID :\", event.target.id)"
    learnMore: "https://devjs.ch/dom/evenements.html"
---

# L'objet event

## 🎯 Objectif

Accéder aux **informations d'un événement** via l'objet `event`.

## 📖 Contexte

Quand un événement se produit, JavaScript passe automatiquement un objet `event` à la fonction callback :

```javascript
bouton.addEventListener("click", event => {
  console.log(event.type)    // "click"
  console.log(event.target)  // L'élément cliqué
})
```

### Propriétés utiles de event

| Propriété | Description |
|-----------|-------------|
| `event.type` | Type d'événement ("click", "keydown"...) |
| `event.target` | Élément qui a déclenché l'événement |
| `event.target.textContent` | Texte de l'élément |
| `event.target.id` | ID de l'élément |

## 📝 Consigne

Complète le code pour afficher dans la console :
1. Le texte du bouton cliqué → `event.target.textContent`
2. L'id du bouton cliqué → `event.target.id`

**Résultat attendu (après clic sur "Acheter") :**
```
Type : click
Texte : Acheter
ID : btn-achat
```

**Teste en cliquant sur les différents boutons !**

