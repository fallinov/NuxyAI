---
title: "Types de Données"
description: "Découvre les types de base en JavaScript : string, number, boolean, null et undefined"
difficulty: beginner
module: 1
exerciseNumber: "1.4"
duration: 10
tags:
  - types
  - string
  - number
  - boolean
  - typeof
  - null
  - undefined
concepts:
  - Types primitifs
  - String (chaîne de caractères)
  - Number (nombre)
  - Boolean (booléen)
  - null et undefined
  - Opérateur typeof

starterCode: |
  // 1. Déclare une variable prenom (texte)

  // 2. Déclare une variable age (nombre)

  // 3. Déclare une variable estEtudiant (true ou false)

  // 4. Affiche le type de chaque variable avec typeof
  // Exemple : console.log(typeof prenom)

solution:
  code: |
    let prenom = "Alice"
    let age = 25
    let estEtudiant = true

    console.log(typeof prenom)
    console.log(typeof age)
    console.log(typeof estEtudiant)
  explanation: "On déclare trois variables de types différents (string, number, boolean), puis on affiche leur type avec typeof."

validations:
  - description: "Déclarer une variable prenom (string)"
    type: code_matches
    expected: "let\\s+prenom\\s*="
    errorMessage: "Déclare une variable prenom avec let"
    successMessage: "Variable prenom déclarée !"
  - description: "Déclarer une variable age (number)"
    type: code_matches
    expected: "let\\s+age\\s*="
    errorMessage: "Déclare une variable age avec let"
    successMessage: "Variable age déclarée !"
  - description: "Déclarer une variable estEtudiant (boolean)"
    type: code_matches
    expected: "let\\s+estEtudiant\\s*="
    errorMessage: "Déclare une variable estEtudiant avec let"
    successMessage: "Variable estEtudiant déclarée !"
  - description: "Utiliser typeof"
    type: code_contains
    expected: "typeof"
    errorMessage: "Utilise l'opérateur typeof pour afficher le type des variables"
    successMessage: "Opérateur typeof utilisé !"
  - description: "Afficher le type string"
    type: output_contains
    expected: "string"
    errorMessage: "Le type string doit apparaître dans la console"
    successMessage: "Type string affiché"
  - description: "Afficher le type number"
    type: output_contains
    expected: "number"
    errorMessage: "Le type number doit apparaître dans la console"
    successMessage: "Type number affiché"
  - description: "Afficher le type boolean"
    type: output_contains
    expected: "boolean"
    errorMessage: "Le type boolean doit apparaître dans la console"
    successMessage: "Type boolean affiché"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "L'opérateur typeof"
    content: "L'opérateur typeof te dit de quel type est une valeur : \"string\" pour du texte, \"number\" pour un nombre, \"boolean\" pour vrai/faux."
    example: "console.log(typeof \"Bonjour\")  // Affiche: string\nconsole.log(typeof 42)         // Affiche: number\nconsole.log(typeof true)       // Affiche: boolean"
    learnMore: "https://devjs.ch/js/types.html"
  - title: "Les trois types principaux"
    content: "Tu dois créer une variable de chaque type : une chaîne de caractères (texte entre guillemets), un nombre (sans guillemets), et un booléen (true ou false)."
    example: "const texte = \"Bonjour\"  // string\nconst age = 25           // number\nconst estVrai = true     // boolean"
  - title: "Afficher le type"
    content: "Combine console.log et typeof pour afficher le type :"
    example: "console.log(typeof prenom)  // string\nconsole.log(typeof age)      // number"
    learnMore: "https://devjs.ch/js/types.html"
---

# Types de Données

## 🎯 Objectif

Découvre les types de données fondamentaux en JavaScript : **string** (texte), **number** (nombre) et **boolean** (vrai/faux). Tu vas aussi apprendre ce que sont `null` et `undefined`.

## 📖 Contexte

JavaScript manipule différents types de données. Chaque valeur a un **type** qui détermine ce qu'on peut faire avec elle.

### Les 3 types de base

| Type | Description | Exemples |
|------|-------------|----------|
| **String** | Texte entre guillemets | `"Bonjour"`, `'Alice'` |
| **Number** | Nombre (entier ou décimal) | `42`, `3.14`, `-7` |
| **Boolean** | Vrai ou faux | `true`, `false` |

### Valeurs spéciales : `null` et `undefined`

JavaScript possède deux valeurs spéciales pour représenter "l'absence de valeur" :

| Valeur | Signification | Exemple |
|--------|---------------|---------|
| `undefined` | Variable déclarée mais **pas encore initialisée** | `let x;` → x vaut `undefined` |
| `null` | Absence de valeur **intentionnelle** | `let x = null;` → "je sais qu'il n'y a rien" |

```javascript
let nonInitialise       // undefined (automatique)
let vide = null         // null (intentionnel)

console.log(nonInitialise)  // undefined
console.log(vide)           // null
```

::alert{type="info"}
**À retenir** : `undefined` = "pas encore de valeur", `null` = "volontairement vide"
::

### L'opérateur `typeof`

Pour connaître le type d'une valeur, utilise `typeof` :

```javascript
console.log(typeof "Bonjour")  // "string"
console.log(typeof 42)         // "number"
console.log(typeof true)       // "boolean"
console.log(typeof undefined)  // "undefined"
console.log(typeof null)       // "object" ⚠️ (bug historique de JS)
```

::alert{type="warning"}
**Attention** : `typeof null` retourne `"object"` et non `"null"`. C'est un bug historique de JavaScript qui n'a jamais été corrigé pour ne pas casser les anciens sites.
::

## 📝 Consigne

Crée trois variables avec `let` et affiche leur type avec `typeof` :

1. `prenom` contenant ton prénom (string)
2. `age` contenant un nombre (number)
3. `estEtudiant` contenant `true` ou `false` (boolean)

Utilise `console.log(typeof variable)` pour afficher le type de chaque variable.

**Exemple de résultat attendu :**

```
string
number
boolean
```
