---
title: "Afficher les produits"
description: "Récupère et affiche les produits depuis l'API DummyJSON"
difficulty: intermediate
module: 10
exerciseNumber: "10.2"
duration: 15
tags:
  - API
  - fetch
  - DOM
  - projet
concepts:
  - fetch() GET
  - async/await
  - innerHTML
  - forEach

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

    // Fonction pour charger les produits depuis l'API
    async function chargerProduits() {
      const chargement = document.querySelector("#chargement")

      try {
        // 1. Appelle fetch sur l'URL DummyJSON
        //    URL : https://dummyjson.com/products?limit=10&select=title,price,category,thumbnail
        // TODO : remplace null par l'appel fetch
        const response = null

        // 2. Convertis la réponse en JSON
        // TODO : remplace null par la conversion JSON
        const data = null

        // 3. Stocke les produits dans la variable globale
        produits = data.products

        // 4. Cache le message de chargement
        chargement.style.display = "none"

        // 5. Appelle la fonction d'affichage
        afficherProduits(produits)

      } catch (erreur) {
        chargement.textContent = "❌ Erreur de chargement"
        console.error("Erreur :", erreur.message)
      }
    }

    // Fonction pour afficher les produits dans le tableau
    function afficherProduits(listeProduits) {
      const tbody = document.querySelector("#corps-tableau")

      // 6. Génère le HTML pour chaque produit avec forEach
      //    Chaque ligne doit contenir : image (thumbnail), titre, prix, catégorie, boutons
      // TODO : complète cette fonction
      let html = ""
      listeProduits.forEach(function(p) {
        // Ajoute une ligne <tr> au html pour chaque produit
        // Colonnes : <img src="...">, titre, prix $, catégorie, boutons ✏️ 🗑️
      })

      tbody.innerHTML = html
    }

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

    // Fonction pour charger les produits depuis l'API
    async function chargerProduits() {
      const chargement = document.querySelector("#chargement")

      try {
        // 1. Appelle fetch sur l'URL DummyJSON
        const response = await fetch("https://dummyjson.com/products?limit=10&select=title,price,category,thumbnail")

        // 2. Convertis la réponse en JSON
        const data = await response.json()

        // 3. Stocke les produits dans la variable globale
        produits = data.products

        // 4. Cache le message de chargement
        chargement.style.display = "none"

        // 5. Appelle la fonction d'affichage
        afficherProduits(produits)

      } catch (erreur) {
        chargement.textContent = "❌ Erreur de chargement"
        console.error("Erreur :", erreur.message)
      }
    }

    // Fonction pour afficher les produits dans le tableau
    function afficherProduits(listeProduits) {
      const tbody = document.querySelector("#corps-tableau")

      // 6. Génère le HTML pour chaque produit
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

    // Lancer le chargement
    await chargerProduits()
  explanation: "On utilise fetch() pour récupérer les produits depuis DummyJSON. La réponse est convertie en JSON, puis chaque produit est affiché dans une ligne du tableau avec innerHTML. Le paramètre ?select= limite les champs retournés pour de meilleures performances."

validations:
  - description: "Appeler fetch avec l'URL DummyJSON"
    type: code_contains
    expected: "fetch(\"https://dummyjson.com/products"
    errorMessage: "Appelle fetch avec l'URL DummyJSON des produits"
    successMessage: "Appel API OK !"
  - description: "Convertir en JSON"
    type: code_matches
    expected: "await\\s+response\\.json\\(\\)"
    errorMessage: "Convertis la réponse avec await response.json()"
    successMessage: "Conversion JSON OK !"
  - description: "Utiliser forEach pour parcourir"
    type: code_contains
    expected: ".forEach("
    errorMessage: "Utilise forEach pour parcourir les produits"
    successMessage: "forEach utilisé !"
  - description: "Générer du HTML avec innerHTML"
    type: code_contains
    expected: "innerHTML"
    errorMessage: "Utilise innerHTML pour injecter le HTML dans le tbody"
    successMessage: "innerHTML OK !"
  - description: "Afficher le thumbnail"
    type: code_contains
    expected: "thumbnail"
    errorMessage: "N'oublie pas d'afficher l'image (thumbnail) du produit"
    successMessage: "Images affichées !"
  - description: "Tableau des produits existe"
    type: dom_contains
    selector: "#tableau-produits"
    errorMessage: "Le tableau #tableau-produits doit exister"
    successMessage: "Tableau OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Appeler fetch"
    content: "Remplace le premier null par un appel fetch avec await :"
    example: "const response = await fetch(\"https://dummyjson.com/products?limit=10&select=title,price,category,thumbnail\")"
  - title: "Convertir en JSON"
    content: "Remplace le deuxième null par la conversion :"
    example: "const data = await response.json()"
  - title: "Générer les lignes du tableau"
    content: "Dans le forEach, construis le HTML ligne par ligne :"
    example: "listeProduits.forEach(function(p) {\n  html += \"<tr>\"\n  html += \"<td><img src='\" + p.thumbnail + \"'></td>\"\n  html += \"<td>\" + p.title + \"</td>\"\n  html += \"<td>\" + p.price + \" $</td>\"\n  html += \"<td>\" + p.category + \"</td>\"\n  html += \"<td class='actions'>\"\n  html += \"<button class='btn-edit'>✏️</button>\"\n  html += \"<button class='btn-delete'>🗑️</button>\"\n  html += \"</td></tr>\"\n})"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch"
---

# Afficher les produits

## 🎯 Objectif

Récupérer les produits depuis l'API **DummyJSON** et les afficher dans le tableau.

![Maquette - Afficher les produits](/images/exercises/projet-afficher-mockup.svg)

## 📖 Contexte

Maintenant que la structure HTML est prête, on va la **remplir avec de vraies données** !

### L'API DummyJSON

DummyJSON est une API gratuite qui fournit des données de test. On va utiliser l'endpoint des produits :

```
https://dummyjson.com/products?limit=10&select=title,price,category,thumbnail
```

Cette URL retourne un objet JSON avec une propriété `products` contenant un tableau de 10 produits.

### Afficher des données dans un tableau

Pour remplir un tableau HTML dynamiquement :

```javascript
// 1. Récupérer le tbody
const tbody = document.querySelector("#mon-tbody")

// 2. Construire le HTML avec forEach
let html = ""
donnees.forEach(function(item) {
  html += "<tr>"
  html += "<td>" + item.nom + "</td>"
  html += "<td>" + item.prix + " $</td>"
  html += "</tr>"
})

// 3. Injecter dans le DOM
tbody.innerHTML = html
```

### Gestion d'erreur

Le `try/catch` est déjà en place pour gérer les erreurs réseau. Si le fetch échoue, un message d'erreur s'affiche.

## 📝 Consigne

Complète la fonction `chargerProduits()` :

1. **Remplace le premier `null`** par un appel `fetch()` avec l'URL DummyJSON
2. **Remplace le deuxième `null`** par `await response.json()`

Puis complète `afficherProduits()` :

3. Dans le `forEach`, génère une ligne `<tr>` pour chaque produit avec ses colonnes

::alert{type="info"}
**C'est une vraie API !** Les données viennent d'un serveur distant. Le chargement peut prendre 1-2 secondes.
::
