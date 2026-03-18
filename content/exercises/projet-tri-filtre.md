---
title: "Tri et filtre par catégorie"
description: "Ajoute le tri par prix et le filtre par catégorie"
difficulty: intermediate
module: 10
exerciseNumber: "10.4"
duration: 15
tags:
  - DOM
  - sort
  - filter
  - projet
concepts:
  - Array.sort()
  - Fonction de comparaison
  - addEventListener (change)
  - Combinaison de filtres

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

        <select id="tri">
          <option value="">Trier par...</option>
          <option value="prix-asc">Prix ↑ croissant</option>
          <option value="prix-desc">Prix ↓ décroissant</option>
          <option value="nom-asc">Nom A→Z</option>
          <option value="nom-desc">Nom Z→A</option>
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

        // Remplir le select des catégories dynamiquement
        remplirCategories()

        afficherProduits(produits)
      } catch (erreur) {
        chargement.textContent = "❌ Erreur de chargement"
      }
    }

    // Remplir le select des catégories à partir des produits
    function remplirCategories() {
      const select = document.querySelector("#categorie")
      const categories = []
      produits.forEach(function(p) {
        if (!categories.includes(p.category)) {
          categories.push(p.category)
        }
      })
      categories.forEach(function(cat) {
        select.innerHTML += "<option value='" + cat + "'>" + cat + "</option>"
      })
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

    // Recherche par titre
    function filtrerProduits(texte) {
      return produits.filter(function(p) {
        return p.title.toLowerCase().includes(texte.toLowerCase())
      })
    }

    // --- PARTIE À COMPLÉTER ---

    // Fonction de tri
    function trierProduits(liste, critere) {
      // Crée une copie du tableau pour ne pas modifier l'original
      const copie = liste.slice()

      // TODO : Utilise .sort() sur 'copie' selon le critère
      // Critères possibles : "prix-asc", "prix-desc", "nom-asc", "nom-desc"
      // Pour "prix-asc" : trie par prix croissant (a.price - b.price)
      // Pour "prix-desc" : trie par prix décroissant (b.price - a.price)
      // Pour "nom-asc" : trie par titre A→Z (a.title.localeCompare(b.title))
      // Pour "nom-desc" : trie par titre Z→A (b.title.localeCompare(a.title))

      return copie
    }

    // Fonction qui applique tous les filtres et le tri
    function appliquerFiltres() {
      const texte = document.querySelector("#recherche").value
      const categorie = document.querySelector("#categorie").value
      const tri = document.querySelector("#tri").value

      // 1. Filtrer par recherche
      let resultats = filtrerProduits(texte)

      // 2. Filtrer par catégorie (si une catégorie est sélectionnée)
      // TODO : Si 'categorie' n'est pas vide, filtre 'resultats'
      //        pour ne garder que les produits de cette catégorie

      // 3. Trier (si un tri est sélectionné)
      if (tri) {
        resultats = trierProduits(resultats, tri)
      }

      afficherProduits(resultats)
    }

    // Écouteurs d'événements
    document.querySelector("#recherche").addEventListener("input", appliquerFiltres)

    // TODO : Ajoute un addEventListener "change" sur #categorie → appliquerFiltres
    // TODO : Ajoute un addEventListener "change" sur #tri → appliquerFiltres

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

        <select id="tri">
          <option value="">Trier par...</option>
          <option value="prix-asc">Prix ↑ croissant</option>
          <option value="prix-desc">Prix ↓ décroissant</option>
          <option value="nom-asc">Nom A→Z</option>
          <option value="nom-desc">Nom Z→A</option>
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

        // Remplir le select des catégories dynamiquement
        remplirCategories()

        afficherProduits(produits)
      } catch (erreur) {
        chargement.textContent = "❌ Erreur de chargement"
      }
    }

    // Remplir le select des catégories à partir des produits
    function remplirCategories() {
      const select = document.querySelector("#categorie")
      const categories = []
      produits.forEach(function(p) {
        if (!categories.includes(p.category)) {
          categories.push(p.category)
        }
      })
      categories.forEach(function(cat) {
        select.innerHTML += "<option value='" + cat + "'>" + cat + "</option>"
      })
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

    // Recherche par titre
    function filtrerProduits(texte) {
      return produits.filter(function(p) {
        return p.title.toLowerCase().includes(texte.toLowerCase())
      })
    }

    // Fonction de tri
    function trierProduits(liste, critere) {
      const copie = liste.slice()

      if (critere === "prix-asc") {
        copie.sort(function(a, b) { return a.price - b.price })
      } else if (critere === "prix-desc") {
        copie.sort(function(a, b) { return b.price - a.price })
      } else if (critere === "nom-asc") {
        copie.sort(function(a, b) { return a.title.localeCompare(b.title) })
      } else if (critere === "nom-desc") {
        copie.sort(function(a, b) { return b.title.localeCompare(a.title) })
      }

      return copie
    }

    // Fonction qui applique tous les filtres et le tri
    function appliquerFiltres() {
      const texte = document.querySelector("#recherche").value
      const categorie = document.querySelector("#categorie").value
      const tri = document.querySelector("#tri").value

      // 1. Filtrer par recherche
      let resultats = filtrerProduits(texte)

      // 2. Filtrer par catégorie
      if (categorie) {
        resultats = resultats.filter(function(p) {
          return p.category === categorie
        })
      }

      // 3. Trier
      if (tri) {
        resultats = trierProduits(resultats, tri)
      }

      afficherProduits(resultats)
    }

    // Écouteurs d'événements
    document.querySelector("#recherche").addEventListener("input", appliquerFiltres)
    document.querySelector("#categorie").addEventListener("change", appliquerFiltres)
    document.querySelector("#tri").addEventListener("change", appliquerFiltres)

    // Lancer le chargement
    await chargerProduits()
  explanation: "On combine recherche, filtre par catégorie et tri dans une seule fonction appliquerFiltres(). sort() avec une fonction de comparaison permet de trier par prix (soustraction) ou par nom (localeCompare). L'astuce du .slice() crée une copie pour ne pas modifier le tableau original."

validations:
  - description: "Utiliser sort()"
    type: code_contains
    expected: ".sort("
    errorMessage: "Utilise .sort() pour trier les produits"
    successMessage: "sort() utilisé !"
  - description: "Select des catégories existe"
    type: dom_contains
    selector: "select#categorie"
    errorMessage: "Le select #categorie doit exister"
    successMessage: "Select catégorie OK !"
  - description: "Select du tri existe"
    type: dom_contains
    selector: "select#tri"
    errorMessage: "Le select #tri doit exister"
    successMessage: "Select tri OK !"
  - description: "Écouter le changement de catégorie"
    type: code_matches
    expected: "#categorie.*addEventListener|addEventListener.*#categorie"
    errorMessage: "Ajoute un addEventListener sur le select #categorie"
    successMessage: "Écouteur catégorie OK !"
  - description: "Écouter le changement de tri"
    type: code_matches
    expected: "#tri.*addEventListener|addEventListener.*#tri"
    errorMessage: "Ajoute un addEventListener sur le select #tri"
    successMessage: "Écouteur tri OK !"
  - description: "Filtrer par catégorie"
    type: code_matches
    expected: "\\.category\\s*===\\s*categorie|categorie.*\\.category"
    errorMessage: "Filtre les produits par leur catégorie"
    successMessage: "Filtre catégorie OK !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "sort() avec comparaison"
    content: "sort() prend une fonction qui compare deux éléments. Si elle retourne un nombre négatif, a vient avant b :"
    example: "// Tri par prix croissant\ncopie.sort(function(a, b) {\n  return a.price - b.price\n})\n\n// Tri par nom A→Z\ncopie.sort(function(a, b) {\n  return a.title.localeCompare(b.title)\n})"
  - title: "Filtrer par catégorie"
    content: "Si une catégorie est sélectionnée, filtre les résultats :"
    example: "if (categorie) {\n  resultats = resultats.filter(function(p) {\n    return p.category === categorie\n  })\n}"
  - title: "addEventListener 'change'"
    content: "L'événement 'change' se déclenche quand l'utilisateur sélectionne une option dans un select :"
    example: "document.querySelector(\"#categorie\").addEventListener(\"change\", appliquerFiltres)\ndocument.querySelector(\"#tri\").addEventListener(\"change\", appliquerFiltres)"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/sort"
---

# Tri et filtre par catégorie

## 🎯 Objectif

Ajouter le **tri par prix/nom** et le **filtre par catégorie** aux produits.

![Maquette - Tri et filtre](/images/exercises/projet-tri-filtre-mockup.svg)

## 📖 Contexte

L'app a déjà la recherche par titre. On va ajouter deux fonctionnalités supplémentaires : trier les résultats et filtrer par catégorie. Les trois filtres se combinent !

### sort() : trier un tableau

`sort()` modifie le tableau original. Pour éviter ça, on travaille sur une **copie** :

```javascript
const copie = tableau.slice()  // Copie du tableau

// Tri numérique (par prix)
copie.sort(function(a, b) {
  return a.price - b.price  // Croissant
})

// Tri alphabétique (par nom)
copie.sort(function(a, b) {
  return a.title.localeCompare(b.title)  // A → Z
})
```

### La fonction de comparaison

`sort()` attend une fonction qui compare deux éléments :
- **Retourne négatif** → `a` vient avant `b`
- **Retourne positif** → `b` vient avant `a`
- **Retourne 0** → même position

| Tri | Code |
|-----|------|
| Prix ↑ | `a.price - b.price` |
| Prix ↓ | `b.price - a.price` |
| Nom A→Z | `a.title.localeCompare(b.title)` |
| Nom Z→A | `b.title.localeCompare(a.title)` |

### Combiner les filtres

L'idée est d'avoir une **seule fonction** `appliquerFiltres()` qui applique tout dans l'ordre :
1. Recherche par texte
2. Filtre par catégorie
3. Tri

## 📝 Consigne

1. **Complète `trierProduits(liste, critere)`** : utilise `.sort()` pour trier selon le critère choisi

2. **Complète le filtre par catégorie** dans `appliquerFiltres()` : si une catégorie est sélectionnée, ne garde que les produits de cette catégorie

3. **Ajoute les addEventListener** sur `#categorie` et `#tri` (événement `"change"`)

::alert{type="tip"}
**Astuce** : `localeCompare()` compare deux textes en respectant l'ordre alphabétique de la langue (accents, etc.).
::
