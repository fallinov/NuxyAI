---
title: "Ajouter un événement"
description: "Utilise addEventListener pour réagir aux actions utilisateur"
difficulty: beginner
module: 8
exerciseNumber: "8.1"
duration: 6
tags:
  - événements
  - addEventListener
  - click
concepts:
  - addEventListener
  - Fonction callback
  - Événement click

exerciseType: html-css-js

starterCode:
  html: |
    <button id="btn">Clique-moi</button>
    <p id="resultat"></p>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #btn {
      padding: 12px 24px;
      font-size: 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    #btn:hover {
      background: #2563eb;
    }

    #resultat {
      margin-top: 20px;
      padding: 10px;
      background: #f3f4f6;
      border-radius: 4px;
      min-height: 20px;
    }
  js: |
    // Sélectionne le bouton
    const bouton = document.querySelector("#btn")
    const resultat = document.querySelector("#resultat")

    // Ajoute un écouteur d'événement "click" au bouton
    // Quand on clique, affiche "Bouton cliqué !" dans la console
    // et change le texte de #resultat


solution:
  html: |
    <button id="btn">Clique-moi</button>
    <p id="resultat"></p>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #btn {
      padding: 12px 24px;
      font-size: 16px;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
    }

    #btn:hover {
      background: #2563eb;
    }

    #resultat {
      margin-top: 20px;
      padding: 10px;
      background: #f3f4f6;
      border-radius: 4px;
      min-height: 20px;
    }
  js: |
    // Sélectionne le bouton
    const bouton = document.querySelector("#btn")
    const resultat = document.querySelector("#resultat")

    // Ajoute un écouteur d'événement "click" au bouton
    // Quand on clique, affiche "Bouton cliqué !" dans la console
    // et change le texte de #resultat
    bouton.addEventListener("click", () => {
      console.log("Bouton cliqué !")
      resultat.textContent = "Tu as cliqué sur le bouton !"
    })
  explanation: "addEventListener prend deux arguments : le type d'événement ('click') et une fonction callback qui s'exécute quand l'événement se produit."

validations:
  - description: "Utiliser addEventListener"
    type: code_contains
    expected: "addEventListener"
    errorMessage: "Utilise addEventListener pour ajouter l'événement"
    successMessage: "Super ! L'écouteur est en place"
  - description: "Événement click"
    type: code_contains
    expected: '"click"'
    errorMessage: "L'événement doit être 'click'"
    successMessage: "Bien ! Tu écoutes le clic"
  - description: "Utiliser une fonction callback"
    type: code_matches
    expected: "(function|=>)"
    errorMessage: "Passe une fonction comme deuxième argument"
    successMessage: "Top ! La fonction callback est prête"
  - description: "Afficher un message"
    type: code_contains
    expected: "console.log"
    errorMessage: "Utilise console.log pour afficher un message"
    successMessage: "Parfait ! Le message s'affiche"
  - description: "Bouton existe"
    type: dom_contains
    selector: "#btn"
    errorMessage: "Le bouton #btn doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Comment écrire =>"
    content: "La flèche => s'écrit avec deux caractères collés : le signe égal (=) suivi du signe supérieur (>)"
    example: "=  puis  >  donne  =>\n\nC'est la syntaxe des fonctions fléchées"
  - title: "Syntaxe addEventListener"
    content: "La méthode prend un type d'événement et une fonction :"
    example: "element.addEventListener(\"click\", () => {\n  // code exécuté au clic\n})"
  - title: "Types d'événements courants"
    content: "Les événements les plus utilisés :"
    example: "\"click\"     // Clic souris\n\"mouseover\" // Survol\n\"keydown\"   // Touche appuyée\n\"submit\"    // Envoi formulaire"
  - title: "Solution"
    content: "Ajoute un écouteur click avec un console.log :"
    example: "bouton.addEventListener(\"click\", () => {\n  console.log(\"Bouton cliqué !\")\n})"
    learnMore: "https://devjs.ch/dom/evenements.html"
---

# Ajouter un événement

## 🎯 Objectif

Utiliser `addEventListener` pour **réagir aux actions** de l'utilisateur.

## 📖 Contexte

Les événements permettent de rendre une page interactive. `addEventListener` associe une action (comme un clic) à une fonction :

```javascript
const bouton = document.querySelector("button")

bouton.addEventListener("click", () => {
  console.log("Tu as cliqué !")
})
```

### Structure d'addEventListener

```javascript
element.addEventListener(type, callback)
```

| Paramètre | Description |
|-----------|-------------|
| `type` | Le type d'événement : `"click"`, `"mouseover"`, etc. |
| `callback` | La fonction exécutée quand l'événement se produit |

## 📝 Consigne

Ajoute un écouteur d'événement `"click"` au bouton qui :
1. Affiche `"Bouton cliqué !"` dans la console
2. Change le texte de `#resultat` en `"Tu as cliqué sur le bouton !"`

**Résultat attendu (après clic sur le bouton) :**
- Console : `Bouton cliqué !`
- Le paragraphe affiche : `Tu as cliqué sur le bouton !`

**Teste en cliquant sur le bouton dans l'aperçu !**

