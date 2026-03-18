---
title: "Soumettre un formulaire"
description: "Gère la soumission d'un formulaire avec l'événement submit"
difficulty: beginner
module: 8
exerciseNumber: "8.8"
duration: 7
tags:
  - formulaires
  - submit
  - événements
concepts:
  - Événement submit
  - preventDefault
  - Traitement de formulaire

exerciseType: html-css-js

starterCode:
  html: |
    <form id="inscription">
      <h3>Inscription</h3>

      <div class="champ">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" placeholder="Votre nom" required>
      </div>

      <div class="champ">
        <label for="email">Email :</label>
        <input type="email" id="email" placeholder="votre@email.com" required>
      </div>

      <button type="submit">S'inscrire</button>
    </form>
    <div id="resultat"></div>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #inscription {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 300px;
    }

    h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .champ {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      font-weight: bold;
      font-size: 14px;
    }

    input {
      padding: 10px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 6px;
    }

    input:focus {
      border-color: #3b82f6;
      outline: none;
    }

    button {
      padding: 12px;
      font-size: 16px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #059669;
    }

    #resultat {
      margin-top: 20px;
      padding: 15px;
      background: #dcfce7;
      color: #166534;
      border-radius: 6px;
      display: none;
    }

    #resultat.visible {
      display: block;
    }
  js: |
    const form = document.querySelector("#inscription")
    const champNom = document.querySelector("#nom")
    const champEmail = document.querySelector("#email")
    const resultat = document.querySelector("#resultat")

    // Ajoute un écouteur sur l'événement "submit"
    form.addEventListener("submit", event => {
      // 1. Empêche le rechargement de la page
      event.preventDefault()

      // 2. Récupère les valeurs des champs


      // 3. Affiche "Inscription de [nom] avec [email]" dans la console
      // et dans #resultat

    })

solution:
  html: |
    <form id="inscription">
      <h3>Inscription</h3>

      <div class="champ">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" placeholder="Votre nom" required>
      </div>

      <div class="champ">
        <label for="email">Email :</label>
        <input type="email" id="email" placeholder="votre@email.com" required>
      </div>

      <button type="submit">S'inscrire</button>
    </form>
    <div id="resultat"></div>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #inscription {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-width: 300px;
    }

    h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .champ {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      font-weight: bold;
      font-size: 14px;
    }

    input {
      padding: 10px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 6px;
    }

    input:focus {
      border-color: #3b82f6;
      outline: none;
    }

    button {
      padding: 12px;
      font-size: 16px;
      background: #10b981;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #059669;
    }

    #resultat {
      margin-top: 20px;
      padding: 15px;
      background: #dcfce7;
      color: #166534;
      border-radius: 6px;
      display: none;
    }

    #resultat.visible {
      display: block;
    }
  js: |
    const form = document.querySelector("#inscription")
    const champNom = document.querySelector("#nom")
    const champEmail = document.querySelector("#email")
    const resultat = document.querySelector("#resultat")

    // Ajoute un écouteur sur l'événement "submit"
    form.addEventListener("submit", event => {
      // 1. Empêche le rechargement de la page
      event.preventDefault()

      // 2. Récupère les valeurs des champs
      const nom = champNom.value
      const email = champEmail.value

      // 3. Affiche "Inscription de [nom] avec [email]" dans la console
      // et dans #resultat
      console.log("Inscription de " + nom + " avec " + email)
      resultat.textContent = "✅ Inscription de " + nom + " avec " + email
      resultat.classList.add("visible")
    })
  explanation: "L'événement 'submit' se déclenche quand un formulaire est soumis. On utilise preventDefault() pour empêcher le rechargement et traiter les données en JavaScript."

validations:
  - description: "Récupérer le nom avec .value"
    type: code_contains
    expected: "champNom.value"
    errorMessage: "Récupère le nom avec champNom.value"
    successMessage: "Nom récupéré !"
  - description: "Récupérer l'email avec .value"
    type: code_contains
    expected: "champEmail.value"
    errorMessage: "Récupère l'email avec champEmail.value"
    successMessage: "Email récupéré !"
  - description: "Afficher le message"
    type: code_contains
    expected: "Inscription de"
    errorMessage: "Affiche un message contenant 'Inscription de'"
    successMessage: "Message affiché !"
  - description: "Utiliser console.log"
    type: code_contains
    expected: "console.log"
    errorMessage: "Affiche le message avec console.log"
    successMessage: "console.log OK !"
  - description: "Formulaire existe"
    type: dom_contains
    selector: "#inscription"
    errorMessage: "Le formulaire #inscription doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Événement submit"
    content: "L'événement 'submit' se déclenche à la soumission :"
    example: "form.addEventListener(\"submit\", e => {\n  e.preventDefault()\n  // Traiter le formulaire\n})"
  - title: "Récupérer les valeurs"
    content: "Accède aux champs avec .value :"
    example: "const nom = champNom.value\nconst email = champEmail.value"
  - title: "Solution"
    content: "Affiche le message avec concaténation :"
    example: "console.log(\"Inscription de \" + nom + \" avec \" + email)\nresultat.textContent = \"Inscription de \" + nom"
    learnMore: "https://devjs.ch/formulaires/envoyer-formulaires.html"
---

# Soumettre un formulaire

## 🎯 Objectif

Gérer la **soumission d'un formulaire** avec JavaScript.

## 📖 Contexte

L'événement `submit` se déclenche quand un formulaire est soumis. On empêche le comportement par défaut pour traiter les données en JavaScript :

```javascript
const form = document.querySelector("form")

form.addEventListener("submit", event => {
  event.preventDefault()  // Pas de rechargement

  // Récupérer les données
  const nom = document.querySelector("#nom").value
  const email = document.querySelector("#email").value

  // Traiter (validation, envoi avec fetch, etc.)
  console.log("Envoi de", nom, email)
})
```

### Flux typique

1. L'utilisateur clique sur "Envoyer"
2. L'événement `submit` est déclenché
3. `preventDefault()` empêche le rechargement
4. On récupère les valeurs avec `.value`
5. On traite les données (validation, API, etc.)

## 📝 Consigne

Dans le gestionnaire d'événement :

1. Récupère les valeurs `nom` et `email` avec `.value`
2. Affiche `"Inscription de [nom] avec [email]"`

**Résultat attendu (avec nom = "Jean" et email = "jean@email.ch") :**

```
Inscription de Jean avec jean@email.ch
```

**Remplis le formulaire et clique sur S'inscrire !**

