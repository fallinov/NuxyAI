---
title: "Variables avec let"
description: "Apprends à créer des variables avec let et à respecter les conventions de nommage"
difficulty: beginner
module: 1
exerciseNumber: "1.2"
duration: 6
tags:
  - variables
  - let
  - camelCase
  - débutant
concepts:
  - Déclaration de variables avec let
  - Conventions de nommage (camelCase)
  - Affichage d'une variable avec console.log()

starterCode: |
  // 1. Déclare une variable prenom avec let (valeur : ton prénom)

  // 2. Déclare une variable age avec let (valeur : ton âge)

  // 3. Affiche prenom avec console.log()

  // 4. Affiche age avec console.log()

solution:
  code: |
    let prenom = "Alice"
    let age = 25

    console.log(prenom)
    console.log(age)
  explanation: "On déclare deux variables avec let (prenom et age), puis on affiche chaque variable avec console.log()."

validations:
  - description: "Déclarer une variable prenom avec let"
    type: code_matches
    expected: "let\\s+prenom\\s*="
    errorMessage: "Utilise let pour déclarer ta variable prenom"
    successMessage: "Tu utilises bien let pour prenom"
  - description: "Déclarer une variable age avec let"
    type: code_matches
    expected: "let\\s+age\\s*="
    errorMessage: "Utilise let pour déclarer ta variable age"
    successMessage: "Tu utilises bien let pour age"
  - description: "Afficher prenom avec console.log(prenom)"
    type: code_matches
    expected: "console\\.log\\s*\\(\\s*prenom\\s*\\)"
    errorMessage: "Utilise console.log(prenom) pour afficher le prénom"
    successMessage: "Tu affiches bien le prénom"
  - description: "Afficher age avec console.log(age)"
    type: code_matches
    expected: "console\\.log\\s*\\(\\s*age\\s*\\)"
    errorMessage: "Utilise console.log(age) pour afficher l'âge"
    successMessage: "Tu affiches bien l'âge"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "Déclarer une variable avec let"
    content: "Le mot-clé \"let\" permet de créer une variable. Une variable est comme une boîte étiquetée où tu stockes une valeur."
    example: "let prenom = \"Alice\"\nlet age = 25"
    learnMore: "https://devjs.ch/js/variables-et-constantes.html"
  - title: "Convention camelCase"
    content: "En JavaScript, on nomme les variables en camelCase : première lettre en minuscule, puis chaque nouveau mot commence par une majuscule."
    example: "let prenom = \"Alice\"      // Correct\nlet nomDeFamille = \"Dupont\" // Correct\nlet NomDeFamille = \"Dupont\" // À éviter"
  - title: "Afficher une variable avec console.log()"
    content: "Pour afficher le contenu d'une variable, utilise console.log() avec le nom de la variable (sans guillemets)."
    example: "let prenom = \"Alice\"\nlet age = 25\n\nconsole.log(prenom)  // Affiche: Alice\nconsole.log(age)     // Affiche: 25"
    learnMore: "https://devjs.ch/js/variables-et-constantes.html"
---

# Variables avec let

## 🎯 Objectif

Apprendre à créer des **variables** en JavaScript avec le mot-clé `let` et découvrir les **conventions de nommage**.

## 📖 Contexte

Une variable est comme une boîte étiquetée où l'on stocke une valeur pour la réutiliser plus tard.

### Créer une variable avec `let`

```javascript
let prenom = "Alice"
let age = 25
```

- `let` : mot-clé pour déclarer une variable
- `prenom` : nom de la variable (l'étiquette)
- `=` : opérateur d'affectation
- `"Alice"` : valeur stockée

### Convention de nommage : camelCase

En JavaScript, on nomme les variables en **camelCase** :
- Première lettre en **minuscule**
- Chaque nouveau mot commence par une **majuscule**

```javascript
// ✅ Correct : camelCase
let nomDeFamille = "Dupont"
let dateDeNaissance = "01/01/2000"

// ❌ À éviter
let nom_de_famille = "Dupont"   // snake_case (Python)
let NomDeFamille = "Dupont"     // PascalCase (classes)
```

::alert{type="info"}
**Règle** : Choisis des noms **représentatifs**. Préfère `age` à `a` ou `x`.
::

## 📝 Consigne

1. Crée une variable `prenom` contenant ton prénom
2. Crée une variable `age` contenant ton âge
3. Affiche le prénom avec `console.log(prenom)`
4. Affiche l'âge avec `console.log(age)`

**Résultat attendu :**

```
Alice
25
```
