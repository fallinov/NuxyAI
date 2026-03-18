---
title: "Gérer les classes"
description: "Ajoute et retire des classes CSS avec classList"
difficulty: beginner
module: 7
exerciseNumber: "7.4"
duration: 6
tags:
  - DOM
  - classList
  - classes
concepts:
  - classList.add
  - classList.remove
  - classList.toggle

exerciseType: html-css-js

starterCode:
  html: |
    <div id="carte" class="carte visible">
      Modifie mes classes !
    </div>
  css: |
    .carte {
      padding: 20px;
      border: 2px solid #ccc;
      text-align: center;
      transition: all 0.3s;
    }

    .visible {
      opacity: 1;
    }

    .highlight {
      background-color: #fef08a;
      border-color: #eab308;
    }

    .active {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  js: |
    // Sélectionne la carte
    const carte = document.querySelector("#carte")

    // Classes actuelles : "carte visible"
    console.log("Avant :", carte.className)

    // 1. Ajoute la classe "highlight"


    // 2. Ajoute la classe "active"


    // 3. Retire la classe "visible"


    // Affiche les classes finales
    console.log("Après :", carte.className)

solution:
  html: |
    <div id="carte" class="carte visible">
      Modifie mes classes !
    </div>
  css: |
    .carte {
      padding: 20px;
      border: 2px solid #ccc;
      text-align: center;
      transition: all 0.3s;
    }

    .visible {
      opacity: 1;
    }

    .highlight {
      background-color: #fef08a;
      border-color: #eab308;
    }

    .active {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
  js: |
    // Sélectionne la carte
    const carte = document.querySelector("#carte")

    // Classes actuelles : "carte visible"
    console.log("Avant :", carte.className)

    // 1. Ajoute la classe "highlight"
    carte.classList.add("highlight")

    // 2. Ajoute la classe "active"
    carte.classList.add("active")

    // 3. Retire la classe "visible"
    carte.classList.remove("visible")

    // Affiche les classes finales
    console.log("Après :", carte.className)
  explanation: "classList.add() ajoute une classe, classList.remove() la retire. C'est plus propre que de manipuler className ou style directement."

validations:
  - description: "Ajouter highlight"
    type: code_contains
    expected: 'classList.add("highlight")'
    errorMessage: "Ajoute la classe highlight avec classList.add()"
    successMessage: "Classe highlight ajoutée !"
  - description: "Ajouter active"
    type: code_contains
    expected: 'classList.add("active")'
    errorMessage: "Ajoute la classe active avec classList.add()"
    successMessage: "Classe active ajoutée !"
  - description: "Retirer visible"
    type: code_contains
    expected: 'classList.remove("visible")'
    errorMessage: "Retire la classe visible avec classList.remove()"
    successMessage: "Classe visible retirée !"
  - description: "La carte a la classe highlight"
    type: dom_contains
    selector: "#carte.highlight"
    errorMessage: "La carte doit avoir la classe highlight"
    successMessage: "Structure OK !"
    hidden: true
  - description: "La carte a la classe active"
    type: dom_contains
    selector: "#carte.active"
    errorMessage: "La carte doit avoir la classe active"
    successMessage: "Structure OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Ajouter une classe"
    content: "Utilise classList.add() avec le nom de la classe :"
    example: "element.classList.add(\"maClasse\")"
  - title: "Retirer une classe"
    content: "Utilise classList.remove() :"
    example: "element.classList.remove(\"maClasse\")"
  - title: "Méthodes classList"
    content: "Les principales méthodes :"
    example: "add(\"classe\")      // Ajoute\nremove(\"classe\")   // Retire\ntoggle(\"classe\")   // Bascule\ncontains(\"classe\") // Vérifie"
    learnMore: "https://devjs.ch/dom/modifier-attributs.html"
---

# Gérer les classes

## 🎯 Objectif

Ajouter et retirer des **classes CSS** avec `classList`.

## 📖 Contexte

`classList` permet de gérer les classes d'un élément :

```javascript
const bouton = document.querySelector("button")

// Ajouter une classe
bouton.classList.add("actif")

// Retirer une classe
bouton.classList.remove("desactive")

// Basculer (ajoute si absente, retire si présente)
bouton.classList.toggle("visible")

// Vérifier si une classe existe
bouton.classList.contains("actif")  // true
```

### Pourquoi classList ?

| `style` | `classList` |
|---------|-------------|
| Modifie le CSS inline | Utilise des classes CSS |
| Un seul style à la fois | Plusieurs styles groupés |
| Difficile à maintenir | Réutilisable, maintenable |

## 📝 Consigne

1. **Ajoute** la classe `"highlight"` à la carte
2. **Ajoute** la classe `"active"` à la carte
3. **Retire** la classe `"visible"`

**Résultat attendu :**
- La carte devient jaune (highlight) et légèrement agrandie (active)
- La console affiche les classes avant et après modification

