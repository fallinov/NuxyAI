---
title: "Modifier et supprimer (PUT/DELETE)"
description: "Ajoute les boutons modifier et supprimer sur chaque produit"
difficulty: advanced
module: 10
exerciseNumber: "10.6"
duration: 15
tags:
  - API
  - PUT
  - DELETE
  - CRUD
  - projet
concepts:
  - fetch() PUT
  - fetch() DELETE
  - CRUD complet
  - Événements délégués

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

    .btn-edit:hover {
      background: #246B6B;
    }

    .btn-delete {
      background: #e74c3c;
      color: white;
    }

    .btn-delete:hover {
      background: #c0392b;
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

    tr.editing {
      background: #fffde7;
    }
  js: |
    let produits = []

    // Charger les produits
    async function chargerProduits() {
      const chargement = document.querySelector("#chargement")
      try {
        const response = await fetch("https://dummyjson.com/products?limit=10&select=title,price,category,thumbnail")
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
        html += "<tr data-id='" + p.id + "'>"
        html += "<td><img src='" + (p.thumbnail || "/images/placeholder.svg") + "'></td>"
        html += "<td>" + p.title + "</td>"
        html += "<td>" + p.price + " $</td>"
        html += "<td>" + p.category + "</td>"
        html += "<td class='actions'>"
        html += "<button class='btn-edit' data-id='" + p.id + "'>✏️</button>"
        html += "<button class='btn-delete' data-id='" + p.id + "'>🗑️</button>"
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

    // Formulaire d'ajout
    document.querySelector("#btn-ajouter").addEventListener("click", function() {
      const form = document.querySelector("#form-ajout")
      form.style.display = form.style.display === "none" ? "block" : "none"
    })
    document.querySelector("#btn-annuler").addEventListener("click", function() {
      document.querySelector("#form-ajout").style.display = "none"
    })

    async function ajouterProduit(titre, prix, categorie) {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titre, price: prix, category: categorie })
      })
      return await response.json()
    }

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

    // --- PARTIE À COMPLÉTER ---

    // Fonction pour modifier un produit (PUT)
    async function modifierProduit(id, nouveauTitre) {
      // TODO : Envoie une requête PUT à https://dummyjson.com/products/{id}
      // Options :
      //   - method: "PUT"
      //   - headers: { "Content-Type": "application/json" }
      //   - body: JSON.stringify({ title: nouveauTitre })
      // Retourne la réponse convertie en JSON

    }

    // Fonction pour supprimer un produit (DELETE)
    async function supprimerProduit(id) {
      // TODO : Envoie une requête DELETE à https://dummyjson.com/products/{id}
      // Options :
      //   - method: "DELETE"
      // Retourne la réponse convertie en JSON

    }

    // Écouteur délégué sur le tbody pour les boutons ✏️ et 🗑️
    document.querySelector("#corps-tableau").addEventListener("click", async function(e) {
      const bouton = e.target

      // Clic sur le bouton modifier ✏️
      if (bouton.classList.contains("btn-edit")) {
        const id = Number(bouton.dataset.id)
        const nouveauTitre = prompt("Nouveau titre :")

        if (nouveauTitre) {
          try {
            // TODO : Appelle modifierProduit() avec await
            // TODO : Met à jour le titre dans le tableau 'produits' local
            //        (trouve le produit par son id et change son title)
            // TODO : Réaffiche les produits

            console.log("TODO: compléter la modification")

          } catch (erreur) {
            console.error("Erreur :", erreur.message)
          }
        }
      }

      // Clic sur le bouton supprimer 🗑️
      if (bouton.classList.contains("btn-delete")) {
        const id = Number(bouton.dataset.id)

        if (confirm("Supprimer ce produit ?")) {
          try {
            // TODO : Appelle supprimerProduit() avec await
            // TODO : Retire le produit du tableau local
            //        avec produits = produits.filter(p => p.id !== id)
            // TODO : Réaffiche les produits

            console.log("TODO: compléter la suppression")

          } catch (erreur) {
            console.error("Erreur :", erreur.message)
          }
        }
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

    .btn-edit:hover {
      background: #246B6B;
    }

    .btn-delete {
      background: #e74c3c;
      color: white;
    }

    .btn-delete:hover {
      background: #c0392b;
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

    tr.editing {
      background: #fffde7;
    }
  js: |
    let produits = []

    // Charger les produits
    async function chargerProduits() {
      const chargement = document.querySelector("#chargement")
      try {
        const response = await fetch("https://dummyjson.com/products?limit=10&select=title,price,category,thumbnail")
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
        html += "<tr data-id='" + p.id + "'>"
        html += "<td><img src='" + (p.thumbnail || "/images/placeholder.svg") + "'></td>"
        html += "<td>" + p.title + "</td>"
        html += "<td>" + p.price + " $</td>"
        html += "<td>" + p.category + "</td>"
        html += "<td class='actions'>"
        html += "<button class='btn-edit' data-id='" + p.id + "'>✏️</button>"
        html += "<button class='btn-delete' data-id='" + p.id + "'>🗑️</button>"
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

    // Formulaire d'ajout
    document.querySelector("#btn-ajouter").addEventListener("click", function() {
      const form = document.querySelector("#form-ajout")
      form.style.display = form.style.display === "none" ? "block" : "none"
    })
    document.querySelector("#btn-annuler").addEventListener("click", function() {
      document.querySelector("#form-ajout").style.display = "none"
    })

    async function ajouterProduit(titre, prix, categorie) {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: titre, price: prix, category: categorie })
      })
      return await response.json()
    }

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

    // Modifier un produit (PUT)
    async function modifierProduit(id, nouveauTitre) {
      const response = await fetch("https://dummyjson.com/products/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: nouveauTitre })
      })
      return await response.json()
    }

    // Supprimer un produit (DELETE)
    async function supprimerProduit(id) {
      const response = await fetch("https://dummyjson.com/products/" + id, {
        method: "DELETE"
      })
      return await response.json()
    }

    // Écouteur délégué sur le tbody
    document.querySelector("#corps-tableau").addEventListener("click", async function(e) {
      const bouton = e.target

      if (bouton.classList.contains("btn-edit")) {
        const id = Number(bouton.dataset.id)
        const nouveauTitre = prompt("Nouveau titre :")

        if (nouveauTitre) {
          try {
            await modifierProduit(id, nouveauTitre)
            const produit = produits.find(function(p) { return p.id === id })
            if (produit) {
              produit.title = nouveauTitre
            }
            afficherProduits(produits)
            console.log("Produit modifié :", nouveauTitre)
          } catch (erreur) {
            console.error("Erreur :", erreur.message)
          }
        }
      }

      if (bouton.classList.contains("btn-delete")) {
        const id = Number(bouton.dataset.id)

        if (confirm("Supprimer ce produit ?")) {
          try {
            await supprimerProduit(id)
            produits = produits.filter(function(p) { return p.id !== id })
            afficherProduits(produits)
            console.log("Produit supprimé")
          } catch (erreur) {
            console.error("Erreur :", erreur.message)
          }
        }
      }
    })

    await chargerProduits()
  explanation: "PUT modifie une ressource existante (on envoie les nouvelles données dans le body). DELETE supprime une ressource (pas de body nécessaire). Les boutons utilisent data-id pour stocker l'ID du produit. L'écouteur délégué sur le tbody capture les clics sur tous les boutons, même ceux ajoutés dynamiquement."

validations:
  - description: "Utiliser method PUT"
    type: code_contains
    expected: "\"PUT\""
    errorMessage: "Utilise method: \"PUT\" pour la modification"
    successMessage: "Méthode PUT OK !"
  - description: "Utiliser method DELETE"
    type: code_contains
    expected: "\"DELETE\""
    errorMessage: "Utilise method: \"DELETE\" pour la suppression"
    successMessage: "Méthode DELETE OK !"
  - description: "Fonction modifierProduit"
    type: code_matches
    expected: "async\\s+function\\s+modifierProduit"
    errorMessage: "Crée la fonction async modifierProduit()"
    successMessage: "Fonction modifierProduit OK !"
  - description: "Fonction supprimerProduit"
    type: code_matches
    expected: "async\\s+function\\s+supprimerProduit"
    errorMessage: "Crée la fonction async supprimerProduit()"
    successMessage: "Fonction supprimerProduit OK !"
  - description: "URL dynamique avec l'ID"
    type: code_matches
    expected: "dummyjson\\.com/products/.*id"
    errorMessage: "Utilise l'ID dans l'URL : dummyjson.com/products/ + id"
    successMessage: "URL dynamique OK !"
  - description: "Retirer le produit du tableau"
    type: code_matches
    expected: "produits\\s*=\\s*produits\\.filter"
    errorMessage: "Retire le produit supprimé du tableau local avec filter()"
    successMessage: "Produit retiré du tableau !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Requête PUT"
    content: "PUT est comme POST mais pour modifier une ressource existante :"
    example: "const response = await fetch(\"https://dummyjson.com/products/\" + id, {\n  method: \"PUT\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ title: nouveauTitre })\n})\nreturn await response.json()"
  - title: "Requête DELETE"
    content: "DELETE est la méthode la plus simple : pas de body, juste l'URL :"
    example: "const response = await fetch(\"https://dummyjson.com/products/\" + id, {\n  method: \"DELETE\"\n})\nreturn await response.json()"
  - title: "Mettre à jour le tableau local"
    content: "Après la réponse API, mets à jour le tableau local :"
    example: "// Modification : trouve et modifie\nconst produit = produits.find(function(p) { return p.id === id })\nif (produit) produit.title = nouveauTitre\n\n// Suppression : filtre\nproduits = produits.filter(function(p) { return p.id !== id })\n\n// Dans les deux cas, réafficher\nafficherProduits(produits)"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch"
---

# Modifier et supprimer (PUT/DELETE)

## 🎯 Objectif

Ajouter les fonctionnalités **modifier** (PUT) et **supprimer** (DELETE) pour compléter le CRUD.

![Maquette - Modifier et supprimer](/images/exercises/projet-modifier-supprimer-mockup.svg)

## 📖 Contexte

L'application gère déjà la **lecture** (GET) et la **création** (POST). Il reste les deux dernières opérations du CRUD : **modifier** et **supprimer**.

### Les 4 opérations CRUD

| Opération | Méthode HTTP | URL | Body |
|-----------|-------------|-----|------|
| **C**reate | POST | `/products/add` | Données JSON |
| **R**ead | GET | `/products` | Aucun |
| **U**pdate | PUT | `/products/{id}` | Nouvelles données JSON |
| **D**elete | DELETE | `/products/{id}` | Aucun |

### Requête PUT (modifier)

```javascript
const response = await fetch("https://dummyjson.com/products/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Nouveau titre" })
})
```

### Requête DELETE (supprimer)

```javascript
const response = await fetch("https://dummyjson.com/products/1", {
  method: "DELETE"
})
```

DELETE est la méthode la plus simple : **pas de body**, juste la méthode et l'URL.

### data-id : stocker l'ID dans le HTML

Chaque bouton porte un attribut `data-id` qui contient l'ID du produit :

```html
<button class="btn-edit" data-id="5">✏️</button>
```

En JavaScript, on le récupère avec `bouton.dataset.id`.

### Événements délégués

Au lieu d'ajouter un écouteur sur chaque bouton, on écoute les clics sur le **tbody** (le parent). Quand un bouton est cliqué, l'événement "remonte" jusqu'au tbody :

```javascript
tbody.addEventListener("click", function(e) {
  if (e.target.classList.contains("btn-delete")) {
    // Le bouton supprimer a été cliqué
  }
})
```

## 📝 Consigne

1. **Complète `modifierProduit(id, nouveauTitre)`** : envoie une requête PUT

2. **Complète `supprimerProduit(id)`** : envoie une requête DELETE

3. **Complète le gestionnaire de clic** : appelle les fonctions et mets à jour le tableau local

::alert{type="success"}
**Bravo !** En terminant cet exercice, tu auras construit une application CRUD complète. C'est exactement le type de projet que tu vas réaliser en autonomie dans WebStorm.
::
