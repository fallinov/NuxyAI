---
title: "Bouton interactif"
description: "Crée un bouton qui change de couleur au clic"
difficulty: beginner
module: 7
exerciseNumber: "7.6"
duration: 10
tags:
  - DOM
  - événements
  - style
concepts:
  - addEventListener
  - style.backgroundColor
  - querySelector

exerciseType: html-css-js

starterCode:
  html: |
    <button id="btn">Clique-moi !</button>
    <p id="message">Le bouton est bleu</p>
  css: |
    #btn {
      padding: 15px 30px;
      font-size: 18px;
      background-color: blue;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    #message {
      margin-top: 20px;
      font-size: 16px;
    }
  js: |
    // 1. Sélectionne le bouton avec querySelector
    const bouton = document.querySelector("#btn")

    // 2. Ajoute un écouteur d'événement 'click'

    // 3. Dans le gestionnaire, change la couleur en vert
    //    et mets à jour le message

solution:
  html: |
    <button id="btn">Clique-moi !</button>
    <p id="message">Le bouton est bleu</p>
  css: |
    #btn {
      padding: 15px 30px;
      font-size: 18px;
      background-color: blue;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    #message {
      margin-top: 20px;
      font-size: 16px;
    }
  js: |
    // 1. Sélectionne le bouton avec querySelector
    const bouton = document.querySelector("#btn")

    // 2. Ajoute un écouteur d'événement 'click'
    bouton.addEventListener("click", () => {
      // 3. Change la couleur en vert
      bouton.style.backgroundColor = "green"

      // 4. Mets à jour le message
      const message = document.querySelector("#message")
      message.textContent = "Le bouton est vert !"
    })
  explanation: "On utilise addEventListener pour écouter le clic, puis style.backgroundColor pour changer la couleur et textContent pour modifier le texte."

validations:
  - description: "Utiliser addEventListener"
    type: code_contains
    expected: "addEventListener"
    errorMessage: "Ajoute un écouteur avec addEventListener"
    successMessage: "Écouteur ajouté !"
  - description: "Changer la couleur en vert"
    type: code_matches
    expected: "backgroundColor\\s*=\\s*['\"]green['\"]"
    errorMessage: "Change la couleur du bouton en vert"
    successMessage: "Couleur changée en vert !"
  - description: "Afficher 'Le bouton est vert'"
    type: code_matches
    expected: "(textContent|innerText).*vert"
    errorMessage: "Mets à jour le message pour indiquer que le bouton est vert"
    successMessage: "Message mis à jour !"
  - description: "Bouton existe"
    type: dom_contains
    selector: "#btn"
    errorMessage: "Le bouton #btn doit exister"
    successMessage: "Bouton trouvé !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "addEventListener"
    content: "Pour écouter un événement sur un élément :"
    example: "element.addEventListener('click', () => {\n  // Code à exécuter au clic\n})"
  - title: "Changer la couleur"
    content: "Pour modifier le style d'un élément :"
    example: "element.style.backgroundColor = 'green'"
  - title: "Modifier le texte"
    content: "Pour changer le contenu texte :"
    example: "element.textContent = 'Nouveau texte'"
    learnMore: "https://devjs.ch/dom/evenements.html"
---

# Bouton interactif

## 🎯 Objectif

Créer un bouton qui **change de couleur** quand on clique dessus.

## 📖 Contexte

En JavaScript, on peut réagir aux actions de l'utilisateur grâce aux **événements**. L'événement `click` se déclenche quand l'utilisateur clique sur un élément.

```javascript
// Structure générale
element.addEventListener('click', () => {
  // Code exécuté au clic
})
```

### Modifier le style en JavaScript

```javascript
// Changer la couleur de fond
element.style.backgroundColor = 'red'

// Changer la couleur du texte
element.style.color = 'white'
```

## 📝 Consigne

1. Sélectionne le bouton avec `querySelector`
2. Ajoute un écouteur d'événement `click`
3. Au clic, change la couleur du bouton en **vert**
4. Mets à jour le message pour afficher "Le bouton est vert !"

**Résultat attendu :**
- Au départ : bouton bleu avec le message "Le bouton est bleu"
- Après clic : bouton vert avec le message "Le bouton est vert !"
