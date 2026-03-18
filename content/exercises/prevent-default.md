---
title: "Empêcher le comportement par défaut"
description: "Utilise preventDefault pour contrôler les actions du navigateur"
difficulty: beginner
module: 8
exerciseNumber: "8.4"
duration: 6
tags:
  - événements
  - preventDefault
  - formulaire
concepts:
  - event.preventDefault
  - Comportement par défaut
  - Contrôle des événements

exerciseType: html-css-js

starterCode:
  html: |
    <form id="formulaire">
      <label for="email">Email :</label>
      <input type="email" id="email" placeholder="votre@email.com" required>
      <button type="submit">Envoyer</button>
    </form>
    <p id="message"></p>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #formulaire {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 300px;
    }

    label {
      font-weight: bold;
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
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #2563eb;
    }

    #message {
      margin-top: 20px;
      padding: 15px;
      background: #dcfce7;
      color: #166534;
      border-radius: 6px;
      display: none;
    }

    #message.visible {
      display: block;
    }
  js: |
    const formulaire = document.querySelector("#formulaire")
    const emailInput = document.querySelector("#email")
    const message = document.querySelector("#message")

    formulaire.addEventListener("submit", event => {
      // 1. Empêche le comportement par défaut (rechargement de page)


      // 2. Récupère la valeur de l'email
      const email = emailInput.value
      console.log("Email soumis :", email)

      // 3. Affiche le message de confirmation
      message.textContent = "Email envoyé : " + email
      message.classList.add("visible")
    })

solution:
  html: |
    <form id="formulaire">
      <label for="email">Email :</label>
      <input type="email" id="email" placeholder="votre@email.com" required>
      <button type="submit">Envoyer</button>
    </form>
    <p id="message"></p>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #formulaire {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 300px;
    }

    label {
      font-weight: bold;
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
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #2563eb;
    }

    #message {
      margin-top: 20px;
      padding: 15px;
      background: #dcfce7;
      color: #166534;
      border-radius: 6px;
      display: none;
    }

    #message.visible {
      display: block;
    }
  js: |
    const formulaire = document.querySelector("#formulaire")
    const emailInput = document.querySelector("#email")
    const message = document.querySelector("#message")

    formulaire.addEventListener("submit", event => {
      // 1. Empêche le comportement par défaut (rechargement de page)
      event.preventDefault()

      // 2. Récupère la valeur de l'email
      const email = emailInput.value
      console.log("Email soumis :", email)

      // 3. Affiche le message de confirmation
      message.textContent = "Email envoyé : " + email
      message.classList.add("visible")
    })
  explanation: "preventDefault() empêche l'action par défaut du navigateur. Pour un formulaire, cela empêche le rechargement de la page et permet de traiter les données en JavaScript."

validations:
  - description: "Utiliser preventDefault"
    type: code_contains
    expected: "preventDefault()"
    errorMessage: "Appelle event.preventDefault() pour empêcher le rechargement"
    successMessage: "Super ! La page ne se recharge plus"
  - description: "Appeler sur event"
    type: code_contains
    expected: "event.preventDefault"
    errorMessage: "Appelle preventDefault sur l'objet event"
    successMessage: "Bien ! Tu maitrises preventDefault"
  - description: "Formulaire existe"
    type: dom_contains
    selector: "#formulaire"
    errorMessage: "Le formulaire #formulaire doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Input email existe"
    type: dom_contains
    selector: "#email"
    errorMessage: "L'input #email doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Comportements par défaut"
    content: "Chaque événement a une action par défaut du navigateur :"
    example: "submit  → Recharge la page\nclick sur lien → Navigue vers l'URL\nkeydown → Écrit le caractère"
  - title: "Syntaxe preventDefault"
    content: "Appelle la méthode sur l'objet event :"
    example: "formulaire.addEventListener(\"submit\", event => {\n  event.preventDefault()\n  // Ton code...\n})"
  - title: "Utilisation courante"
    content: "Très utilisé pour les formulaires AJAX :"
    example: "form.addEventListener(\"submit\", e => {\n  e.preventDefault()\n  // Envoyer avec fetch() au lieu de recharger\n})"
    learnMore: "https://devjs.ch/dom/evenements.html"
---

# Empêcher le comportement par défaut

## 🎯 Objectif

Utiliser `preventDefault()` pour **contrôler** le comportement du navigateur.

## 📖 Contexte

Chaque événement a un comportement par défaut. Par exemple, soumettre un formulaire recharge la page. `preventDefault()` permet de l'empêcher :

```javascript
form.addEventListener("submit", event => {
  event.preventDefault()  // Empêche le rechargement

  // Traiter le formulaire en JavaScript
  console.log("Envoi avec fetch...")
})
```

### Comportements par défaut courants

| Événement | Action par défaut |
|-----------|-------------------|
| `submit` | Recharge la page |
| `click` (lien) | Navigue vers l'URL |
| `keydown` | Écrit le caractère |

## 📝 Consigne

1. Ajoute `event.preventDefault()` au début du callback
2. Le formulaire doit afficher l'email sans recharger la page

**Résultat attendu (après soumission avec "test@email.com") :**
- La page **ne se recharge pas**
- Console : `Email soumis : test@email.com`
- Un message vert apparait : `Email envoyé : test@email.com`

**Teste en soumettant le formulaire !**

