---
title: "Ajouter un produit (POST)"
description: "Crée un formulaire pour ajouter un produit via l'API DummyJSON"
difficulty: advanced
module: 10
exerciseNumber: "10.5"
duration: 15
tags:
  - API
  - POST
  - formulaire
  - projet
concepts:
  - fetch() POST
  - JSON.stringify()
  - Headers Content-Type
  - Formulaire HTML

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

      <!-- Formulaire d'ajout (caché par défaut) -->
      <form id="form-ajout" style="display: none;">
        <h3>Nouveau produit</h3>
        <div class="form-group">
          <label for="titre">Titre</label>
          <input type="text" id="titre" placeholder="Nom du produit" required>
        </div>
        <div class="form-group">
          <label for="prix">Prix ($)</label>
          <input type="number" id="prix" placeholder="9.99" step="0.01" min="0" required>
        </div>
        <div class="form-group">
          <label for="cat-ajout">Catégorie</label>
          <input type="text" id="cat-ajout" placeholder="beauty, groceries..." required>
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn-submit">Envoyer</button>
          <button type="button" id="btn-annuler" class="btn-cancel">Annuler</button>
        </div>
      </form>

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

    #form-ajout {
      background: #f0faf0;
      border: 2px solid #60B155;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }

    #form-ajout h3 {
      margin-bottom: 16px;
      color: #333;
    }

    .form-group {
      margin-bottom: 12px;
    }

    .form-group label {
      display: block;
      margin-bottom: 4px;
      font-weight: 600;
      font-size: 13px;
      color: #555;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .form-group input:focus {
      border-color: #60B155;
      outline: none;
    }

    .form-buttons {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    .btn-submit {
      padding: 10px 24px;
      background: #60B155;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn-cancel {
      padding: 10px 24px;
      background: #999;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
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
    let produits = []

    // Charger les produits
    async function chargerProduits() {
      const chargement = document.querySelector("#chargement")
      try {
        const response = await fetch("https://dummyjson.com/products?limit=20&select=title,price,category,thumbnail")
        const data = await response.json()
        produits = data.products
        chargement.style.display = "none"
        remplirCategories()
        afficherProduits(produits)
      } catch (erreur) {
        chargement.textContent = "❌ Erreur de chargement"
      }
    }

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

    function afficherProduits(listeProduits) {
      const tbody = document.querySelector("#corps-tableau")
      let html = ""
      listeProduits.forEach(function(p) {
        html += "<tr>"
        html += "<td><img src='" + (p.thumbnail || "/images/placeholder.svg") + "'></td>"
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

    function filtrerProduits(texte) {
      return produits.filter(function(p) {
        return p.title.toLowerCase().includes(texte.toLowerCase())
      })
    }

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

    function appliquerFiltres() {
      const texte = document.querySelector("#recherche").value
      const categorie = document.querySelector("#categorie").value
      const tri = document.querySelector("#tri").value
      let resultats = filtrerProduits(texte)
      if (categorie) {
        resultats = resultats.filter(function(p) {
          return p.category === categorie
        })
      }
      if (tri) {
        resultats = trierProduits(resultats, tri)
      }
      afficherProduits(resultats)
    }

    document.querySelector("#recherche").addEventListener("input", appliquerFiltres)
    document.querySelector("#categorie").addEventListener("change", appliquerFiltres)
    document.querySelector("#tri").addEventListener("change", appliquerFiltres)

    // --- PARTIE À COMPLÉTER ---

    // Afficher/masquer le formulaire d'ajout
    document.querySelector("#btn-ajouter").addEventListener("click", function() {
      const form = document.querySelector("#form-ajout")
      form.style.display = form.style.display === "none" ? "block" : "none"
    })

    document.querySelector("#btn-annuler").addEventListener("click", function() {
      document.querySelector("#form-ajout").style.display = "none"
    })

    // Fonction pour ajouter un produit via l'API
    async function ajouterProduit(titre, prix, categorie) {
      // TODO : Envoie une requête POST à https://dummyjson.com/products/add
      // avec fetch() et les options suivantes :
      //   - method: "POST"
      //   - headers: { "Content-Type": "application/json" }
      //   - body: JSON.stringify({ title: titre, price: prix, category: categorie })
      //
      // Puis convertis la réponse en JSON et retourne-la

    }

    // Soumission du formulaire
    document.querySelector("#form-ajout").addEventListener("submit", async function(e) {
      e.preventDefault()

      const titre = document.querySelector("#titre").value
      const prix = parseFloat(document.querySelector("#prix").value)
      const categorie = document.querySelector("#cat-ajout").value

      try {
        // TODO : Appelle ajouterProduit() avec await
        // TODO : Ajoute le nouveau produit au début du tableau 'produits'
        //        avec produits.unshift(nouveauProduit)
        // TODO : Réaffiche les produits avec afficherProduits(produits)
        // TODO : Cache le formulaire
        // TODO : Affiche un message dans la console

        console.log("TODO: compléter l'ajout")

      } catch (erreur) {
        console.error("Erreur :", erreur.message)
      }
    })

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

      <!-- Formulaire d'ajout (caché par défaut) -->
      <form id="form-ajout" style="display: none;">
        <h3>Nouveau produit</h3>
        <div class="form-group">
          <label for="titre">Titre</label>
          <input type="text" id="titre" placeholder="Nom du produit" required>
        </div>
        <div class="form-group">
          <label for="prix">Prix ($)</label>
          <input type="number" id="prix" placeholder="9.99" step="0.01" min="0" required>
        </div>
        <div class="form-group">
          <label for="cat-ajout">Catégorie</label>
          <input type="text" id="cat-ajout" placeholder="beauty, groceries..." required>
        </div>
        <div class="form-buttons">
          <button type="submit" class="btn-submit">Envoyer</button>
          <button type="button" id="btn-annuler" class="btn-cancel">Annuler</button>
        </div>
      </form>

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

    #form-ajout {
      background: #f0faf0;
      border: 2px solid #60B155;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
    }

    #form-ajout h3 {
      margin-bottom: 16px;
      color: #333;
    }

    .form-group {
      margin-bottom: 12px;
    }

    .form-group label {
      display: block;
      margin-bottom: 4px;
      font-weight: 600;
      font-size: 13px;
      color: #555;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }

    .form-group input:focus {
      border-color: #60B155;
      outline: none;
    }

    .form-buttons {
      display: flex;
      gap: 10px;
      margin-top: 16px;
    }

    .btn-submit {
      padding: 10px 24px;
      background: #60B155;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      font-weight: bold;
    }

    .btn-cancel {
      padding: 10px 24px;
      background: #999;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
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
    let produits = []

    // Charger les produits
    async function chargerProduits() {
      const chargement = document.querySelector("#chargement")
      try {
        const response = await fetch("https://dummyjson.com/products?limit=20&select=title,price,category,thumbnail")
        const data = await response.json()
        produits = data.products
        chargement.style.display = "none"
        remplirCategories()
        afficherProduits(produits)
      } catch (erreur) {
        chargement.textContent = "❌ Erreur de chargement"
      }
    }

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

    function afficherProduits(listeProduits) {
      const tbody = document.querySelector("#corps-tableau")
      let html = ""
      listeProduits.forEach(function(p) {
        html += "<tr>"
        html += "<td><img src='" + (p.thumbnail || "/images/placeholder.svg") + "'></td>"
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

    function filtrerProduits(texte) {
      return produits.filter(function(p) {
        return p.title.toLowerCase().includes(texte.toLowerCase())
      })
    }

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

    function appliquerFiltres() {
      const texte = document.querySelector("#recherche").value
      const categorie = document.querySelector("#categorie").value
      const tri = document.querySelector("#tri").value
      let resultats = filtrerProduits(texte)
      if (categorie) {
        resultats = resultats.filter(function(p) {
          return p.category === categorie
        })
      }
      if (tri) {
        resultats = trierProduits(resultats, tri)
      }
      afficherProduits(resultats)
    }

    document.querySelector("#recherche").addEventListener("input", appliquerFiltres)
    document.querySelector("#categorie").addEventListener("change", appliquerFiltres)
    document.querySelector("#tri").addEventListener("change", appliquerFiltres)

    // Afficher/masquer le formulaire
    document.querySelector("#btn-ajouter").addEventListener("click", function() {
      const form = document.querySelector("#form-ajout")
      form.style.display = form.style.display === "none" ? "block" : "none"
    })

    document.querySelector("#btn-annuler").addEventListener("click", function() {
      document.querySelector("#form-ajout").style.display = "none"
    })

    // Ajouter un produit via l'API
    async function ajouterProduit(titre, prix, categorie) {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titre, price: prix, category: categorie })
      })
      const data = await response.json()
      return data
    }

    // Soumission du formulaire
    document.querySelector("#form-ajout").addEventListener("submit", async function(e) {
      e.preventDefault()

      const titre = document.querySelector("#titre").value
      const prix = parseFloat(document.querySelector("#prix").value)
      const categorie = document.querySelector("#cat-ajout").value

      try {
        const nouveauProduit = await ajouterProduit(titre, prix, categorie)
        produits.unshift(nouveauProduit)
        afficherProduits(produits)
        document.querySelector("#form-ajout").style.display = "none"
        console.log("Produit ajouté :", nouveauProduit.title)
      } catch (erreur) {
        console.error("Erreur :", erreur.message)
      }
    })

    await chargerProduits()
  explanation: "Pour envoyer des données à une API, on utilise fetch() avec method: 'POST'. Le body contient les données au format JSON (JSON.stringify). Le header Content-Type indique au serveur qu'on envoie du JSON. DummyJSON simule l'ajout et retourne le produit avec un nouvel ID."

validations:
  - description: "Utiliser method POST"
    type: code_contains
    expected: "\"POST\""
    errorMessage: "Utilise method: \"POST\" dans les options de fetch"
    successMessage: "Méthode POST OK !"
  - description: "Utiliser JSON.stringify"
    type: code_contains
    expected: "JSON.stringify"
    errorMessage: "Convertis les données en JSON avec JSON.stringify()"
    successMessage: "JSON.stringify OK !"
  - description: "Envoyer à l'URL d'ajout"
    type: code_contains
    expected: "dummyjson.com/products/add"
    errorMessage: "Envoie la requête POST à https://dummyjson.com/products/add"
    successMessage: "URL d'ajout correcte !"
  - description: "Header Content-Type"
    type: code_contains
    expected: "Content-Type"
    errorMessage: "Ajoute le header Content-Type: application/json"
    successMessage: "Header OK !"
  - description: "Formulaire existe"
    type: dom_contains
    selector: "form#form-ajout"
    errorMessage: "Le formulaire #form-ajout doit exister"
    successMessage: "Formulaire OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Structure d'un POST"
    content: "fetch() avec POST nécessite un objet d'options :"
    example: "const response = await fetch(\"https://dummyjson.com/products/add\", {\n  method: \"POST\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({\n    title: titre,\n    price: prix,\n    category: categorie\n  })\n})"
  - title: "Récupérer la réponse"
    content: "Après le fetch, convertis la réponse en JSON et retourne-la :"
    example: "const data = await response.json()\nreturn data"
  - title: "Compléter le submit"
    content: "Dans le gestionnaire submit, enchaîne les étapes :"
    example: "const nouveauProduit = await ajouterProduit(titre, prix, categorie)\nproduits.unshift(nouveauProduit)\nafficherProduits(produits)\ndocument.querySelector(\"#form-ajout\").style.display = \"none\"\nconsole.log(\"Produit ajouté :\", nouveauProduit.title)"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch"
---

# Ajouter un produit (POST)

## 🎯 Objectif

Créer un **formulaire d'ajout** et envoyer les données à l'API avec une requête **POST**.

![Maquette - Ajouter un produit](/images/exercises/projet-ajouter-mockup.svg)

## 📖 Contexte

Jusqu'ici, on a fait des requêtes **GET** (lire des données). Maintenant on va **créer** des données avec une requête **POST**.

### GET vs POST

| | GET | POST |
|---|-----|------|
| **Action** | Lire | Créer |
| **Données** | Aucune (ou dans l'URL) | Dans le body |
| **Format** | - | JSON (souvent) |

### Structure d'une requête POST

```javascript
const response = await fetch("https://api.exemple.com/produits", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Mon produit",
    price: 19.99
  })
})

const data = await response.json()
```

### Les 3 éléments clés

1. **`method: "POST"`** — Indique qu'on crée une ressource
2. **`headers`** — Précise qu'on envoie du JSON
3. **`body: JSON.stringify(...)`** — Les données converties en texte JSON

### DummyJSON et le POST

L'API DummyJSON **simule** l'ajout : elle retourne le produit avec un nouvel `id` mais ne le sauvegarde pas vraiment côté serveur. C'est parfait pour s'entraîner !

```
POST https://dummyjson.com/products/add
```

## 📝 Consigne

1. **Complète `ajouterProduit()`** : envoie une requête POST avec fetch à `https://dummyjson.com/products/add`

2. **Complète le gestionnaire submit** : appelle `ajouterProduit()`, ajoute le résultat au tableau et réaffiche

::alert{type="warning"}
**N'oublie pas** : `JSON.stringify()` convertit un objet JavaScript en texte JSON. Sans ça, le serveur ne comprend pas les données !
::
