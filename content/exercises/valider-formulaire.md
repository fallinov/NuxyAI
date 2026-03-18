---
title: "Valider un formulaire"
description: "Crée une fonction de validation simple pour un formulaire"
difficulty: beginner
module: 8
exerciseNumber: "8.7"
duration: 8
tags:
  - formulaires
  - validation
  - erreurs
concepts:
  - Validation de données
  - Tableau d'erreurs
  - Conditions de validation

exerciseType: html-css-js

starterCode:
  html: |
    <form id="inscription">
      <h3>Inscription</h3>

      <div class="champ">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" value="Marie">
      </div>

      <div class="champ">
        <label for="email">Email :</label>
        <input type="email" id="email" value="">
      </div>

      <div class="champ">
        <label for="age">Âge :</label>
        <input type="number" id="age" value="17">
      </div>

      <button type="button" id="btn-valider">Valider</button>
    </form>
    <div id="erreurs"></div>
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
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #2563eb;
    }

    #erreurs {
      margin-top: 20px;
      padding: 15px;
      border-radius: 6px;
      white-space: pre-line;
    }

    #erreurs.succes {
      background: #dcfce7;
      color: #166534;
    }

    #erreurs.erreur {
      background: #fee2e2;
      color: #dc2626;
    }
  js: |
    const champNom = document.querySelector("#nom")
    const champEmail = document.querySelector("#email")
    const champAge = document.querySelector("#age")
    const bouton = document.querySelector("#btn-valider")
    const erreurDiv = document.querySelector("#erreurs")

    // Fonction de validation
    function valider(nom, email, age) {
      const erreurs = []

      // 1. Si le nom est vide, ajouter "Le nom est requis"
      if (nom === "") {
        erreurs.push("Le nom est requis")
      }

      // 2. Si l'email est vide, ajouter "L'email est requis"


      // 3. Si l'âge est inférieur à 18, ajouter "Tu dois avoir 18 ans"


      return erreurs
    }

    bouton.addEventListener("click", function() {
      const nom = champNom.value
      const email = champEmail.value
      const age = champAge.value

      const resultat = valider(nom, email, age)

      if (resultat.length === 0) {
        console.log("Formulaire valide !")
        erreurDiv.className = "succes"
        erreurDiv.textContent = "Formulaire valide !"
      } else {
        console.log("Erreurs :")
        let texte = "Erreurs :\n"
        resultat.forEach(function(err) {
          console.log("-", err)
          texte += "- " + err + "\n"
        })
        erreurDiv.className = "erreur"
        erreurDiv.textContent = texte
      }
    })

solution:
  html: |
    <form id="inscription">
      <h3>Inscription</h3>

      <div class="champ">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" value="Marie">
      </div>

      <div class="champ">
        <label for="email">Email :</label>
        <input type="email" id="email" value="">
      </div>

      <div class="champ">
        <label for="age">Âge :</label>
        <input type="number" id="age" value="17">
      </div>

      <button type="button" id="btn-valider">Valider</button>
    </form>
    <div id="erreurs"></div>
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
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }

    button:hover {
      background: #2563eb;
    }

    #erreurs {
      margin-top: 20px;
      padding: 15px;
      border-radius: 6px;
      white-space: pre-line;
    }

    #erreurs.succes {
      background: #dcfce7;
      color: #166534;
    }

    #erreurs.erreur {
      background: #fee2e2;
      color: #dc2626;
    }
  js: |
    const champNom = document.querySelector("#nom")
    const champEmail = document.querySelector("#email")
    const champAge = document.querySelector("#age")
    const bouton = document.querySelector("#btn-valider")
    const erreurDiv = document.querySelector("#erreurs")

    // Fonction de validation
    function valider(nom, email, age) {
      const erreurs = []

      // 1. Si le nom est vide, ajouter "Le nom est requis"
      if (nom === "") {
        erreurs.push("Le nom est requis")
      }

      // 2. Si l'email est vide, ajouter "L'email est requis"
      if (email === "") {
        erreurs.push("L'email est requis")
      }

      // 3. Si l'âge est inférieur à 18, ajouter "Tu dois avoir 18 ans"
      if (Number(age) < 18) {
        erreurs.push("Tu dois avoir 18 ans")
      }

      return erreurs
    }

    bouton.addEventListener("click", function() {
      const nom = champNom.value
      const email = champEmail.value
      const age = champAge.value

      const resultat = valider(nom, email, age)

      if (resultat.length === 0) {
        console.log("Formulaire valide !")
        erreurDiv.className = "succes"
        erreurDiv.textContent = "Formulaire valide !"
      } else {
        console.log("Erreurs :")
        let texte = "Erreurs :\n"
        resultat.forEach(function(err) {
          console.log("-", err)
          texte += "- " + err + "\n"
        })
        erreurDiv.className = "erreur"
        erreurDiv.textContent = texte
      }
    })
  explanation: "La validation consiste à vérifier chaque champ et collecter les erreurs dans un tableau. Si le tableau est vide, le formulaire est valide."

validations:
  - description: "Vérifier email vide"
    type: code_contains
    expected: 'email === ""'
    errorMessage: "Vérifie si email est vide : if (email === \"\")"
    successMessage: "Vérification email OK !"
  - description: "Ajouter erreur email"
    type: code_contains
    expected: "L'email est requis"
    errorMessage: "Ajoute le message 'L'email est requis'"
    successMessage: "Message email OK !"
  - description: "Vérifier âge < 18"
    type: code_contains
    expected: "< 18"
    errorMessage: "Vérifie si l'âge est inférieur à 18"
    successMessage: "Vérification âge OK !"
  - description: "Ajouter erreur âge"
    type: code_contains
    expected: "Tu dois avoir 18 ans"
    errorMessage: "Ajoute le message 'Tu dois avoir 18 ans'"
    successMessage: "Message âge OK !"
  - description: "Formulaire existe"
    type: dom_contains
    selector: "#inscription"
    errorMessage: "Le formulaire #inscription doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Pattern de validation"
    content: "Crée un tableau, ajoute les erreurs, retourne le tableau :"
    example: "const erreurs = []\n\nif (condition) {\n  erreurs.push(\"Message d'erreur\")\n}\n\nreturn erreurs"
  - title: "Vérifier un champ vide"
    content: "Compare avec une chaîne vide :"
    example: "if (email === \"\") {\n  erreurs.push(\"L'email est requis\")\n}"
  - title: "Solution pour l'âge"
    content: "Convertis avec Number() pour comparer :"
    example: "if (Number(age) < 18) {\n  erreurs.push(\"Tu dois avoir 18 ans\")\n}"
    learnMore: "https://devjs.ch/formulaires/valider-les-saisies-utilisateurs.html"
---

# Valider un formulaire

## 🎯 Objectif

Créer une **fonction de validation** qui vérifie les données d'un formulaire.

## 📖 Contexte

La validation côté client améliore l'expérience utilisateur. On collecte les erreurs dans un tableau :

```javascript
function valider(email, password) {
  const erreurs = []

  if (email === "") {
    erreurs.push("L'email est requis")
  }

  if (password.length < 8) {
    erreurs.push("Le mot de passe doit faire 8 caractères")
  }

  return erreurs
}
```

### Afficher les erreurs

```javascript
const erreurs = valider(email, password)

if (erreurs.length === 0) {
  // Envoyer le formulaire
} else {
  // Afficher les erreurs
  erreurs.forEach(function(err) {
    console.log(err)
  })
}
```

### ⚠️ Comparer des nombres

Rappel : `.value` retourne toujours du **texte**. Pour comparer avec un nombre, utilise `Number()` :

```javascript
const age = champAge.value  // "17" (texte)

// ❌ Risqué : comparaison de texte
if (age < 18) { }

// ✅ Correct : conversion en nombre
if (Number(age) < 18) {
  erreurs.push("Tu dois avoir 18 ans")
}
```

## 📝 Consigne

Complète la fonction `valider()` :

1. Si `email` est vide → ajoute `"L'email est requis"`
2. Si `age` < 18 → ajoute `"Tu dois avoir 18 ans"`

**Résultat attendu (avec les valeurs par défaut : email vide et age = 17) :**

```
Erreurs :
- L'email est requis
- Tu dois avoir 18 ans
```

**Teste en cliquant sur Valider !**

