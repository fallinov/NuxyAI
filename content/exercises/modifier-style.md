---
title: "Modifier le style"
description: "Change l'apparence d'un élément avec la propriété style"
difficulty: beginner
module: 7
exerciseNumber: "7.3"
duration: 6
tags:
  - DOM
  - style
  - CSS
concepts:
  - Propriété style
  - Propriétés CSS en JS
  - camelCase

exerciseType: html-css-js

starterCode:
  html: |
    <div id="boite">
      Modifie mon style !
    </div>
  css: |
    #boite {
      padding: 20px;
      border: 2px solid #ccc;
      text-align: center;
    }
  js: |
    // Sélectionne la boîte
    const boite = document.querySelector("#boite")

    // 1. Change la couleur de fond en "blue"


    // 2. Change la couleur du texte en "white"


    // 3. Change la taille de police en "20px"


    // Affiche les styles
    console.log("Fond :", boite.style.backgroundColor)
    console.log("Texte :", boite.style.color)
    console.log("Taille :", boite.style.fontSize)

solution:
  html: |
    <div id="boite">
      Modifie mon style !
    </div>
  css: |
    #boite {
      padding: 20px;
      border: 2px solid #ccc;
      text-align: center;
    }
  js: |
    // Sélectionne la boîte
    const boite = document.querySelector("#boite")

    // 1. Change la couleur de fond en "blue"
    boite.style.backgroundColor = "blue"

    // 2. Change la couleur du texte en "white"
    boite.style.color = "white"

    // 3. Change la taille de police en "20px"
    boite.style.fontSize = "20px"

    // Affiche les styles
    console.log("Fond :", boite.style.backgroundColor)
    console.log("Texte :", boite.style.color)
    console.log("Taille :", boite.style.fontSize)
  explanation: "Les propriétés CSS s'écrivent en camelCase en JavaScript : background-color devient backgroundColor."

validations:
  - description: "Modifier backgroundColor en blue"
    type: code_matches
    expected: "backgroundColor\\s*=\\s*['\"]blue['\"]"
    errorMessage: "Change la couleur de fond en blue"
    successMessage: "Super ! Le fond est bleu"
  - description: "Modifier color en white"
    type: code_matches
    expected: "\\.color\\s*=\\s*['\"]white['\"]"
    errorMessage: "Change la couleur du texte en white"
    successMessage: "Bien ! Texte en blanc"
  - description: "Modifier fontSize en 20px"
    type: code_matches
    expected: "fontSize\\s*=\\s*['\"]20px['\"]"
    errorMessage: "Change la taille en 20px"
    successMessage: "Parfait ! Taille ajustée"
  - description: "Élément #boite existe"
    type: dom_contains
    selector: "#boite"
    errorMessage: "L'élément #boite doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Syntaxe element.style"
    content: "Accède aux styles via la propriété style :"
    example: "element.style.color = \"red\"\nelement.style.fontSize = \"16px\""
  - title: "CSS → camelCase"
    content: "En JS, les tirets deviennent des majuscules :"
    example: "background-color → backgroundColor\nfont-size → fontSize"
  - title: "Solution"
    content: "Modifie chaque propriété de style :"
    example: "boite.style.backgroundColor = \"blue\"\nboite.style.color = \"white\"\nboite.style.fontSize = \"20px\""
    learnMore: "https://devjs.ch/dom/modifier-styles.html"
---

# Modifier le style

## 🎯 Objectif

Modifier l'**apparence** d'un élément avec la propriété `style`.

## 📖 Contexte

Chaque élément a une propriété `style` pour modifier son CSS :

```javascript
const titre = document.querySelector("h1")

titre.style.color = "red"
titre.style.fontSize = "32px"
titre.style.backgroundColor = "yellow"
```

### CSS → JavaScript (camelCase)

| CSS | JavaScript |
|-----|------------|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |

## 📝 Consigne

Modifie les styles de la boîte :

1. Couleur de fond → `"blue"`
2. Couleur du texte → `"white"`
3. Taille de police → `"20px"`

**Résultat attendu :**
- La boîte devient bleue avec du texte blanc plus grand
