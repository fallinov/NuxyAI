---
title: "Sélectionner plusieurs éléments"
description: "Utilise querySelectorAll pour cibler tous les éléments correspondants"
difficulty: beginner
module: 7
exerciseNumber: "7.5"
duration: 7
tags:
  - DOM
  - querySelectorAll
  - forEach
concepts:
  - querySelectorAll
  - NodeList
  - Parcours avec forEach

exerciseType: html-css-js

starterCode:
  html: |
    <ul id="liste">
      <li class="produit">Café - 4.50 CHF</li>
      <li class="produit">Thé - 3.00 CHF</li>
      <li class="produit">Jus - 5.00 CHF</li>
    </ul>
    <p id="compteur"></p>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #liste {
      list-style: none;
      padding: 0;
    }

    .produit {
      padding: 10px;
      margin: 5px 0;
      background: #f3f4f6;
      border-radius: 4px;
    }

    .produit.surbrillance {
      background: #fef08a;
      font-weight: bold;
    }

    #compteur {
      color: #666;
      font-style: italic;
    }
  js: |
    // 1. Sélectionne tous les éléments avec la classe "produit"
    const produits =

    // 2. Affiche le nombre de produits
    console.log("Nombre de produits :", produits.length)

    // 3. Parcours avec forEach : affiche chaque produit
    // et ajoute la classe "surbrillance"


solution:
  html: |
    <ul id="liste">
      <li class="produit">Café - 4.50 CHF</li>
      <li class="produit">Thé - 3.00 CHF</li>
      <li class="produit">Jus - 5.00 CHF</li>
    </ul>
    <p id="compteur"></p>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #liste {
      list-style: none;
      padding: 0;
    }

    .produit {
      padding: 10px;
      margin: 5px 0;
      background: #f3f4f6;
      border-radius: 4px;
    }

    .produit.surbrillance {
      background: #fef08a;
      font-weight: bold;
    }

    #compteur {
      color: #666;
      font-style: italic;
    }
  js: |
    // 1. Sélectionne tous les éléments avec la classe "produit"
    const produits = document.querySelectorAll(".produit")

    // 2. Affiche le nombre de produits
    console.log("Nombre de produits :", produits.length)

    // 3. Parcours avec forEach : affiche chaque produit
    // et ajoute la classe "surbrillance"
    produits.forEach(produit => {
      console.log(produit.textContent)
      produit.classList.add("surbrillance")
    })
  explanation: "querySelectorAll retourne une NodeList qu'on peut parcourir avec forEach, contrairement à querySelector qui ne retourne qu'un seul élément."

validations:
  - description: "Utiliser querySelectorAll"
    type: code_contains
    expected: "querySelectorAll"
    errorMessage: "Utilise querySelectorAll pour sélectionner plusieurs éléments"
    successMessage: "Top ! Tu sélectionnes tous les éléments"
  - description: "Sélecteur .produit"
    type: code_contains
    expected: '".produit"'
    errorMessage: "Utilise le sélecteur \".produit\""
    successMessage: "Bien ! Le sélecteur est correct"
  - description: "Utiliser forEach"
    type: code_contains
    expected: "forEach"
    errorMessage: "Utilise forEach pour parcourir les produits"
    successMessage: "Super ! Tu parcours la liste"
  - description: "Afficher le nombre 3"
    type: output_contains
    expected: "3"
    errorMessage: "Le nombre de produits (3) doit s'afficher"
    successMessage: "Parfait ! 3 produits trouvés"
  - description: "Les produits existent"
    type: dom_contains
    selector: ".produit"
    errorMessage: "Les éléments .produit doivent exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "querySelector vs querySelectorAll"
    content: "querySelector = 1 élément, querySelectorAll = tous les éléments"
    example: "querySelector(\".item\")    // Premier .item\nquerySelectorAll(\".item\") // Tous les .item"
  - title: "Parcourir avec forEach"
    content: "Le résultat de querySelectorAll peut être parcouru :"
    example: "produits.forEach(p => {\n  console.log(p.textContent)\n})"
  - title: "Propriété length"
    content: "Utilise .length pour connaître le nombre d'éléments :"
    example: "produits.length  // 3"
    learnMore: "https://devjs.ch/dom/access-elements.html"
---

# Sélectionner plusieurs éléments

## 🎯 Objectif

Sélectionner **tous les éléments** correspondant à un sélecteur avec `querySelectorAll`.

## 📖 Contexte

`querySelectorAll` retourne une liste de tous les éléments correspondants :

```javascript
// Sélectionne TOUS les paragraphes
const paragraphes = document.querySelectorAll("p")

console.log(paragraphes.length)  // Nombre d'éléments

// Parcourir avec forEach
paragraphes.forEach(p => {
  console.log(p.textContent)
})
```

### querySelector vs querySelectorAll

| Méthode | Retourne |
|---------|----------|
| `querySelector` | **1** élément (le premier) |
| `querySelectorAll` | **Tous** les éléments |

## 📝 Consigne

1. **Sélectionne** tous les éléments avec la classe `"produit"`
2. **Affiche** le nombre de produits avec `console.log`
3. **Parcours** la liste avec `forEach` et affiche chaque produit

**Résultat attendu :**
- La console affiche "Nombre de produits : 3"
- Puis chaque produit est affiché
- Les produits deviennent jaunes (surbrillance)

