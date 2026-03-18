---
title: "Recherche de produits"
description: "Ajoute un champ de recherche pour filtrer les produits en temps réel"
difficulty: intermediate
module: 10
exerciseNumber: "10.3"
duration: 12
tags:
  - DOM
  - événements
  - filter
  - projet
concepts:
  - addEventListener (input)
  - Array.filter()
  - String.toLowerCase()
  - includes()

exerciseType: html-css-js

starterCode:
  html: |
    <div id="app">
      <header>
        <h1>🛍️ Gestion de produits</h1>
      </header>

      <div class="toolbar">
        <input type="text" id="recherche" placeholder="Rechercher un produit...">
        <select id="categorie">
          <option value="">Toutes les catégories</option>
        </select>
        <button id="btn-ajouter">➕ Ajouter un produit</button>
      </div>

      <table id="tableau-produits">
        <thead>
          <tr>
            <th>Image</th>
            <th>Titre</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="corps-tableau">
        </tbody>
      </table>

      <p id="chargement">⏳ Chargement des produits...</p>
    </div>
  css: |
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }

    #app {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    header h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .toolbar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .toolbar input[type="text"] {
      flex: 1;
      min-width: 200px;
      padding: 10px 14px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .toolbar input[type="text"]:focus {
      border-color: #60B155;
      outline: none;
    }

    .toolbar select {
      padding: 10px 14px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      background: white;
    }

    .toolbar button {
      padding: 10px 18px;
      background: #60B155;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;
    }

    .toolbar button:hover {
      background: #4D9352;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #f8f8f8;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      font-weight: 600;
      color: #555;
      font-size: 13px;
      text-transform: uppercase;
    }

    td img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 6px;
    }

    .actions button {
      padding: 6px 12px;
      margin-right: 4px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    }

    .btn-edit {
      background: #33A6A6;
      color: white;
    }

    .btn-delete {
      background: #e74c3c;
      color: white;
    }

    #chargement {
      text-align: center;
      padding: 20px;
      color: #888;
      font-style: italic;
    }

    tr:hover {
      background: #f9f9f9;
    }
  js: |
    // Variable globale pour stocker les produits
    let produits = []

    // Charger les produits depuis l'API
    async function chargerProduits() {
      const chargement = document.querySelector("#chargement")
      try {
        const response = await fetch("https://dummyjson.com/products?limit=20&select=title,price,category,thumbnail")
        const data = await response.json()
        produits = data.products
        chargement.style.display = "none"
        afficherProduits(produits)
      } catch (erreur) {
        chargement.textContent = "❌ Erreur de chargement"
      }
    }

    // Afficher les produits dans le tableau
    function afficherProduits(listeProduits) {
      const tbody = document.querySelector("#corps-tableau")
      let html = ""
      listeProduits.forEach(function(p) {
        html += "<tr>"
        html += "<td><img src='" + p.thumbnail + "'></td>"
        html += "<td>" + p.title + "</td>"
        html += "<td>" + p.price + " $</td>"
        html += "<td>" + p.category + "</td>"
        html += "<td class='actions'>"
        html += "<button class='btn-edit'>✏️</button>"
        html += "<button class='btn-delete'>🗑️</button>"
        html += "</td>"
        html += "</tr>"
      })
      tbody.innerHTML = html
    }

    // --- PARTIE À COMPLÉTER ---

    // Fonction de filtrage par recherche
    function filtrerProduits(texte) {
      // 1. Utilise .filter() sur le tableau 'produits'
      // 2. Pour chaque produit, vérifie si son titre (en minuscules)
      //    contient le texte recherché (en minuscules)
      // 3. Retourne le tableau filtré

      // TODO : remplace [] par le bon code
      const resultats = []

      return resultats
    }

    // Écouteur sur le champ de recherche
    // TODO : Ajoute un addEventListener "input" sur le champ #recherche
    // À chaque frappe :
    //   1. Récupère la valeur du champ
    //   2. Appelle filtrerProduits() avec cette valeur
    //   3. Appelle afficherProduits() avec les résultats

    // Lancer le chargement
    await chargerProduits()

solution:
  html: |
    <div id="app">
      <header>
        <h1>🛍️ Gestion de produits</h1>
      </header>

      <div class="toolbar">
        <input type="text" id="recherche" placeholder="Rechercher un produit...">
        <select id="categorie">
          <option value="">Toutes les catégories</option>
        </select>
        <button id="btn-ajouter">➕ Ajouter un produit</button>
      </div>

      <table id="tableau-produits">
        <thead>
          <tr>
            <th>Image</th>
            <th>Titre</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="corps-tableau">
        </tbody>
      </table>

      <p id="chargement">⏳ Chargement des produits...</p>
    </div>
  css: |
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }

    #app {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    header h1 {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .toolbar {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .toolbar input[type="text"] {
      flex: 1;
      min-width: 200px;
      padding: 10px 14px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .toolbar input[type="text"]:focus {
      border-color: #60B155;
      outline: none;
    }

    .toolbar select {
      padding: 10px 14px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      background: white;
    }

    .toolbar button {
      padding: 10px 18px;
      background: #60B155;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;
    }

    .toolbar button:hover {
      background: #4D9352;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #f8f8f8;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      font-weight: 600;
      color: #555;
      font-size: 13px;
      text-transform: uppercase;
    }

    td img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 6px;
    }

    .actions button {
      padding: 6px 12px;
      margin-right: 4px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
    }

    .btn-edit {
      background: #33A6A6;
      color: white;
    }

    .btn-delete {
      background: #e74c3c;
      color: white;
    }

    #chargement {
      text-align: center;
      padding: 20px;
      color: #888;
      font-style: italic;
    }

    tr:hover {
      background: #f9f9f9;
    }
  js: |
    // Variable globale pour stocker les produits
    let produits = []

    // Charger les produits depuis l'API
    async function chargerProduits() {
      const chargement = document.querySelector("#chargement")
      try {
        const response = await fetch("https://dummyjson.com/products?limit=20&select=title,price,category,thumbnail")
        const data = await response.json()
        produits = data.products
        chargement.style.display = "none"
        afficherProduits(produits)
      } catch (erreur) {
        chargement.textContent = "❌ Erreur de chargement"
      }
    }

    // Afficher les produits dans le tableau
    function afficherProduits(listeProduits) {
      const tbody = document.querySelector("#corps-tableau")
      let html = ""
      listeProduits.forEach(function(p) {
        html += "<tr>"
        html += "<td><img src='" + p.thumbnail + "'></td>"
        html += "<td>" + p.title + "</td>"
        html += "<td>" + p.price + " $</td>"
        html += "<td>" + p.category + "</td>"
        html += "<td class='actions'>"
        html += "<button class='btn-edit'>✏️</button>"
        html += "<button class='btn-delete'>🗑️</button>"
        html += "</td>"
        html += "</tr>"
      })
      tbody.innerHTML = html
    }

    // Fonction de filtrage par recherche
    function filtrerProduits(texte) {
      const resultats = produits.filter(function(p) {
        return p.title.toLowerCase().includes(texte.toLowerCase())
      })
      return resultats
    }

    // Écouteur sur le champ de recherche
    const champRecherche = document.querySelector("#recherche")
    champRecherche.addEventListener("input", function() {
      const texte = champRecherche.value
      const resultats = filtrerProduits(texte)
      afficherProduits(resultats)
    })

    // Lancer le chargement
    await chargerProduits()
  explanation: "La recherche fonctionne côté client : on filtre le tableau 'produits' déjà chargé en mémoire. filter() crée un nouveau tableau avec seulement les produits dont le titre contient le texte recherché. toLowerCase() rend la recherche insensible à la casse. L'événement 'input' se déclenche à chaque frappe."

validations:
  - description: "Utiliser filter()"
    type: code_contains
    expected: ".filter("
    errorMessage: "Utilise .filter() pour filtrer les produits"
    successMessage: "filter() utilisé !"
  - description: "Convertir en minuscules"
    type: code_contains
    expected: ".toLowerCase()"
    errorMessage: "Utilise .toLowerCase() pour ignorer la casse"
    successMessage: "Recherche insensible à la casse !"
  - description: "Écouter l'événement input"
    type: code_contains
    expected: "addEventListener"
    errorMessage: "Ajoute un addEventListener sur le champ de recherche"
    successMessage: "Écouteur ajouté !"
  - description: "Écouter l'événement 'input'"
    type: code_matches
    expected: "addEventListener\\(['\"]input['\"]"
    errorMessage: "Écoute l'événement 'input' (pas 'click' ou 'change')"
    successMessage: "Événement 'input' OK !"
  - description: "Utiliser includes()"
    type: code_contains
    expected: ".includes("
    errorMessage: "Utilise .includes() pour vérifier si le titre contient le texte"
    successMessage: "includes() OK !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "filter() + toLowerCase()"
    content: "filter() garde les éléments qui passent le test. toLowerCase() met en minuscules :"
    example: "const resultats = produits.filter(function(p) {\n  return p.title.toLowerCase().includes(texte.toLowerCase())\n})"
  - title: "Événement 'input'"
    content: "L'événement 'input' se déclenche à chaque frappe, contrairement à 'change' qui attend la perte de focus :"
    example: "const champ = document.querySelector(\"#recherche\")\nchamp.addEventListener(\"input\", function() {\n  const texte = champ.value\n  // ...\n})"
  - title: "Solution complète"
    content: "Combine filter + addEventListener :"
    example: "function filtrerProduits(texte) {\n  return produits.filter(function(p) {\n    return p.title.toLowerCase().includes(texte.toLowerCase())\n  })\n}\n\nconst champ = document.querySelector(\"#recherche\")\nchamp.addEventListener(\"input\", function() {\n  const resultats = filtrerProduits(champ.value)\n  afficherProduits(resultats)\n})"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"
---

# Recherche de produits

## 🎯 Objectif

Ajouter une **recherche en temps réel** qui filtre les produits par leur titre.

![Maquette - Recherche de produits](/images/exercises/projet-recherche-mockup.svg)

## 📖 Contexte

Les produits sont déjà chargés depuis l'API et stockés dans la variable `produits`. On va maintenant les **filtrer côté client** à chaque frappe dans le champ de recherche.

### filter() : garder ce qui nous intéresse

`filter()` crée un **nouveau tableau** en ne gardant que les éléments qui passent un test :

```javascript
const nombres = [1, 2, 3, 4, 5]
const pairs = nombres.filter(function(n) {
  return n % 2 === 0  // Garde si pair
})
// pairs → [2, 4]
```

### Recherche insensible à la casse

Pour que "mascara" trouve aussi "Mascara", on met tout en minuscules :

```javascript
const titre = "Essence Mascara"
titre.toLowerCase()  // → "essence mascara"
titre.toLowerCase().includes("mascara")  // → true
```

### L'événement "input"

L'événement `input` se déclenche **à chaque frappe** dans un champ texte. C'est parfait pour une recherche en temps réel :

```javascript
champ.addEventListener("input", function() {
  console.log(champ.value)  // Affiche le texte à chaque frappe
})
```

## 📝 Consigne

1. **Complète `filtrerProduits(texte)`** : utilise `.filter()` pour garder les produits dont le titre contient le texte recherché (en minuscules)

2. **Ajoute un `addEventListener("input")`** sur le champ `#recherche` : à chaque frappe, filtre les produits et réaffiche le tableau

::alert{type="tip"}
**Astuce** : Le filtrage se fait sur les données en mémoire (le tableau `produits`), pas via un nouvel appel API. C'est instantané !
::
