---
title: "Structure HTML de l'app"
description: "Crée le layout de base de l'application de gestion de produits"
difficulty: beginner
module: 10
exerciseNumber: "10.1"
duration: 10
tags:
  - HTML
  - structure
  - projet
concepts:
  - Structure sémantique HTML
  - Tableaux HTML (table, thead, tbody)
  - Formulaires (input, select, button)

exerciseType: html-css-js

starterCode:
  html: |
    <div id="app">
      <header>
        <h1>🛍️ Gestion de produits</h1>
      </header>

      <!-- TODO : Barre de recherche et filtres -->
      <div class="toolbar">
        <!-- 1. Ajoute un input de type "text" avec id="recherche"
                et placeholder="Rechercher un produit..." -->

        <!-- 2. Ajoute un <select> avec id="categorie"
                avec une option par défaut "Toutes les catégories" -->

        <!-- 3. Ajoute un bouton "➕ Ajouter un produit" avec id="btn-ajouter" -->
      </div>

      <!-- TODO : Tableau des produits -->
      <!-- 4. Crée un <table> avec id="tableau-produits" -->
      <!--    - thead avec une ligne contenant : Image, Titre, Prix, Catégorie, Actions -->
      <!--    - tbody vide (sera rempli par JavaScript plus tard) -->
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
  js: |
    // Pas de JavaScript pour cet exercice.
    // Tu vas d'abord construire la structure HTML !
    console.log("Structure HTML prête !")

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
        <tbody>
        </tbody>
      </table>
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
  js: |
    // Pas de JavaScript pour cet exercice.
    // Tu vas d'abord construire la structure HTML !
    console.log("Structure HTML prête !")
  explanation: "L'application commence par une structure HTML solide : un champ de recherche, un select pour filtrer par catégorie, un bouton d'ajout et un tableau avec les bonnes colonnes. Le tbody est vide car il sera rempli dynamiquement par JavaScript dans l'exercice suivant."

validations:
  - description: "Champ de recherche"
    type: dom_contains
    selector: "input[type='text']#recherche"
    errorMessage: "Ajoute un input type='text' avec id='recherche'"
    successMessage: "Champ de recherche OK !"
  - description: "Select des catégories"
    type: dom_contains
    selector: "select#categorie"
    errorMessage: "Ajoute un `<select>` avec id='categorie'"
    successMessage: "Filtre catégorie OK !"
  - description: "Bouton ajouter"
    type: dom_contains
    selector: "button#btn-ajouter"
    errorMessage: "Ajoute un bouton avec id='btn-ajouter'"
    successMessage: "Bouton d'ajout OK !"
  - description: "Tableau des produits"
    type: dom_contains
    selector: "table#tableau-produits"
    errorMessage: "Crée un `<table>` avec id='tableau-produits'"
    successMessage: "Tableau créé !"
  - description: "En-têtes du tableau"
    type: dom_contains
    selector: "thead th"
    errorMessage: "Ajoute un `<thead>` avec des colonnes (th)"
    successMessage: "En-têtes du tableau OK !"
  - description: "Colonne Titre"
    type: dom_text_contains
    selector: "thead"
    expected: "Titre"
    errorMessage: "Ajoute une colonne 'Titre' dans le thead"
    successMessage: "Colonne Titre OK !"
  - description: "Colonne Prix"
    type: dom_text_contains
    selector: "thead"
    expected: "Prix"
    errorMessage: "Ajoute une colonne 'Prix' dans le thead"
    successMessage: "Colonne Prix OK !"
  - description: "Corps du tableau"
    type: dom_contains
    selector: "tbody"
    errorMessage: "Ajoute un `<tbody>` dans le tableau"
    successMessage: "Tbody prêt pour les données !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Input de recherche"
    content: "Un champ texte avec un id et un placeholder :"
    example: "<input type=\"text\" id=\"recherche\" placeholder=\"Rechercher...\">"
  - title: "Select avec option par défaut"
    content: "Un menu déroulant avec une première option 'neutre' :"
    example: "<select id=\"categorie\">\n  <option value=\"\">Toutes les catégories</option>\n</select>"
  - title: "Structure d'un tableau"
    content: "Un tableau HTML avec en-têtes et corps :"
    example: "<table id=\"tableau-produits\">\n  <thead>\n    <tr>\n      <th>Image</th>\n      <th>Titre</th>\n    </tr>\n  </thead>\n  <tbody></tbody>\n</table>"
---

# Structure HTML de l'app

## 🎯 Objectif

Créer la **structure HTML** de l'application de gestion de produits.

## 📖 Contexte

Tu vas construire une **application complète** étape par étape ! C'est un mini-projet qui combine tout ce que tu as appris : HTML, CSS, JavaScript et les appels API.

Dans cet exercice, tu poses les **fondations** : la structure HTML. Pas encore de JavaScript, on s'occupe d'abord du squelette de la page.

### L'application finale

L'app permettra de :
- **Afficher** une liste de produits depuis une API
- **Rechercher** des produits par nom
- **Filtrer** par catégorie
- **Ajouter**, **modifier** et **supprimer** des produits

### Structure attendue

![Maquette de l'application](/images/exercises/projet-produits-mockup.svg)

## 📝 Consigne

Complète le HTML pour créer :

1. Un **champ de recherche** (`input` type text) avec `id="recherche"`
2. Un **menu déroulant** (`select`) avec `id="categorie"` et une option par défaut
3. Un **bouton d'ajout** avec `id="btn-ajouter"`
4. Un **tableau** (`table`) avec `id="tableau-produits"`, un `thead` avec les colonnes (Image, Titre, Prix, Catégorie, Actions) et un `tbody` vide

::alert{type="info"}
**Pas de JavaScript ici !** On construit d'abord le HTML. Le JS viendra dans l'exercice suivant.
::
