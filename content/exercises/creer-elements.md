---
title: "Créer des éléments"
description: "Crée de nouveaux éléments HTML et ajoute-les à la page"
difficulty: beginner
module: 7
exerciseNumber: "7.7"
duration: 10
tags:
  - DOM
  - createElement
  - appendChild
  - textContent
concepts:
  - document.createElement()
  - appendChild()
  - textContent

exerciseType: html-css-js

starterCode:
  html: |
    <h2>Ma liste de courses</h2>
    <ul id="liste">
      <li>Lait</li>
      <li>Pain</li>
    </ul>
    <button id="ajouter">Ajouter un fruit</button>
  css: |
    body {
      font-family: sans-serif;
      padding: 20px;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      padding: 8px 12px;
      margin: 4px 0;
      background-color: #f0f0f0;
      border-radius: 6px;
    }

    #ajouter {
      margin-top: 12px;
      padding: 10px 20px;
      background-color: #60B155;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
  js: |
    // 1. Crée un nouvel élément <li>
    const nouveauLi = document.createElement("li")

    // 2. Donne-lui le texte "Pomme"


    // 3. Ajoute-le à la liste <ul id="liste">
    const liste = document.querySelector("#liste")


    // 4. Au clic sur le bouton, ajoute un autre élément "Banane"
    const bouton = document.querySelector("#ajouter")

    bouton.addEventListener("click", () => {
      // Crée un <li> avec le texte "Banane"


      // Ajoute-le à la liste


    })

solution:
  html: |
    <h2>Ma liste de courses</h2>
    <ul id="liste">
      <li>Lait</li>
      <li>Pain</li>
    </ul>
    <button id="ajouter">Ajouter un fruit</button>
  css: |
    body {
      font-family: sans-serif;
      padding: 20px;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      padding: 8px 12px;
      margin: 4px 0;
      background-color: #f0f0f0;
      border-radius: 6px;
    }

    #ajouter {
      margin-top: 12px;
      padding: 10px 20px;
      background-color: #60B155;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
    }
  js: |
    // 1. Crée un nouvel élément <li>
    const nouveauLi = document.createElement("li")

    // 2. Donne-lui le texte "Pomme"
    nouveauLi.textContent = "Pomme"

    // 3. Ajoute-le à la liste <ul id="liste">
    const liste = document.querySelector("#liste")
    liste.appendChild(nouveauLi)

    // 4. Au clic sur le bouton, ajoute un autre élément "Banane"
    const bouton = document.querySelector("#ajouter")

    bouton.addEventListener("click", () => {
      // Crée un <li> avec le texte "Banane"
      const bananeLi = document.createElement("li")
      bananeLi.textContent = "Banane"

      // Ajoute-le à la liste
      liste.appendChild(bananeLi)
    })
  explanation: "On utilise createElement() pour créer un élément en mémoire, textContent pour lui donner du texte, puis appendChild() pour l'ajouter dans la page. Ce pattern en 3 étapes fonctionne aussi dans les gestionnaires d'événements."

validations:
  - description: "Utiliser createElement"
    type: code_contains
    expected: "createElement"
    errorMessage: "N'oublie pas createElement() pour créer un nouvel élément"
    successMessage: "Top ! Tu sais créer un élément"
  - description: "Utiliser appendChild"
    type: code_contains
    expected: "appendChild"
    errorMessage: "Utilise appendChild() pour ajouter ton élément à la page"
    successMessage: "Bien joué ! L'élément est ajouté"
  - description: "Utiliser textContent"
    type: code_contains
    expected: "textContent"
    errorMessage: "Donne du texte à ton élément avec textContent"
    successMessage: "Parfait ! Le texte est en place"
  - description: "Un élément li existe"
    type: dom_contains
    selector: "li"
    errorMessage: "Il doit y avoir au moins un élément `<li>` dans la page"
    successMessage: "Structure OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Créer un élément"
    content: "createElement() crée un élément en mémoire, mais il n'est pas encore sur la page :"
    example: "const monElement = document.createElement(\"li\")\n// L'élément existe, mais il est invisible !"
  - title: "Ajouter à la page"
    content: "appendChild() ajoute un élément à l'intérieur d'un parent :"
    example: "const liste = document.querySelector(\"#liste\")\nliste.appendChild(monElement)\n// Maintenant il est visible !"
  - title: "Créer dans un événement"
    content: "Tu peux créer des éléments dynamiquement dans un gestionnaire d'événement :"
    example: "bouton.addEventListener(\"click\", () => {\n  const li = document.createElement(\"li\")\n  li.textContent = \"Nouveau\"\n  liste.appendChild(li)\n})"
    learnMore: "https://devjs.ch/dom/ajouter-elements.html"
---

# Créer des éléments

## 🎯 Objectif

Créer de **nouveaux éléments HTML** avec JavaScript et les ajouter à la page.

## 📖 Contexte

Jusqu'ici, tu as modifié des éléments qui existaient déjà dans le HTML. Mais JavaScript permet aussi d'en **créer de nouveaux** et de les insérer dans la page.

C'est le pattern en **3 étapes** :

```javascript
// 1. Créer l'élément (en mémoire)
const paragraphe = document.createElement("p")

// 2. Le configurer (texte, classes, style...)
paragraphe.textContent = "Salut le monde !"

// 3. L'ajouter dans la page
document.body.appendChild(paragraphe)
```

### Créer, configurer, ajouter

| Étape | Méthode | Rôle |
|-------|---------|------|
| 1. Créer | `document.createElement("tag")` | Crée un élément en mémoire |
| 2. Configurer | `element.textContent = "..."` | Donne du contenu à l'élément |
| 3. Ajouter | `parent.appendChild(element)` | Place l'élément dans la page |

### Pourquoi createElement ?

| Approche | Avantage | Inconvénient |
|----------|----------|--------------|
| `createElement` + `textContent` | Sûr, précis, performant | Plus de code |
| `innerHTML` | Plus court à écrire | Risque de sécurité (XSS) |

::alert{type="warning"}
**createElement est plus sûr.** Avec `textContent`, le texte est toujours traité comme du texte brut. Avec `innerHTML`, du code malveillant pourrait s'exécuter si le texte vient d'un utilisateur. Prends l'habitude d'utiliser `createElement` + `textContent` !
::

## 📝 Consigne

1. Donne le texte `"Pomme"` au `<li>` déjà créé avec `textContent`
2. Ajoute-le à la liste `#liste` avec `appendChild()`
3. Dans le gestionnaire de clic du bouton, crée un nouveau `<li>` avec le texte `"Banane"` et ajoute-le à la liste

**Comportement attendu :**
- Au chargement : la liste affiche Lait, Pain, **Pomme**
- Au clic sur le bouton : **Banane** s'ajoute en bas de la liste
