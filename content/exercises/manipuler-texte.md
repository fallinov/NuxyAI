---
title: "Manipuler du Texte"
description: "Découvre les méthodes pour manipuler les chaînes de caractères en JavaScript"
difficulty: beginner
module: 1
exerciseNumber: "1.7"
duration: 12
tags:
  - string
  - méthodes
  - texte
  - débutant
concepts:
  - .length
  - .toUpperCase()
  - .toLowerCase()
  - .trim()
  - .includes()
  - Concaténation

starterCode: |
  // Variable avec des espaces au début et à la fin
  let prenom = "  Alice  "

  // Nettoie le prénom ici


  // Affiche les résultats

solution:
  code: |
    let prenom = "  Alice  "

    // Nettoyer les espaces
    let prenomNettoye = prenom.trim()

    // Afficher les résultats
    console.log(prenomNettoye.length)
    console.log(prenomNettoye.toUpperCase())
    console.log(prenomNettoye.toLowerCase())
  explanation: "On nettoie le prénom avec trim(), puis on utilise length, toUpperCase() et toLowerCase() pour le manipuler."

validations:
  - description: "Déclarer prenomNettoye avec trim()"
    type: code_matches
    expected: "(?:let|const)\\s+prenomNettoye\\s*=.*\\.trim\\(\\)"
    errorMessage: "Crée prenomNettoye en utilisant prenom.trim()"
    successMessage: "Variable prenomNettoye créée avec trim()"
  - description: "Utiliser .length"
    type: code_contains
    expected: ".length"
    errorMessage: "Utilise .length pour afficher le nombre de caractères"
    successMessage: "Propriété .length utilisée"
  - description: "Utiliser .toUpperCase()"
    type: code_contains
    expected: ".toUpperCase()"
    errorMessage: "Utilise .toUpperCase() pour afficher en majuscules"
    successMessage: "Méthode .toUpperCase() utilisée"
  - description: "Utiliser .toLowerCase()"
    type: code_contains
    expected: ".toLowerCase()"
    errorMessage: "Utilise .toLowerCase() pour afficher en minuscules"
    successMessage: "Méthode .toLowerCase() utilisée"
  - description: "Afficher la longueur (5)"
    type: output_contains
    expected: "5"
    errorMessage: "La longueur du prénom nettoyé doit être 5"
    successMessage: "Longueur correcte affichée"
  - description: "Afficher en majuscules (ALICE)"
    type: output_contains
    expected: "ALICE"
    errorMessage: "Le prénom en majuscules doit apparaître"
    successMessage: "Majuscules affichées"
  - description: "Afficher en minuscules (alice)"
    type: output_contains
    expected: "alice"
    errorMessage: "Le prénom en minuscules doit apparaître"
    successMessage: "Minuscules affichées"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "Propriété .length"
    content: "La propriété .length donne le nombre de caractères d'une chaîne. C'est une propriété, donc pas de parenthèses !"
    example: "const prenom = \"Alice\"\nconsole.log(prenom.length)  // Affiche: 5"
  - title: "Méthodes toUpperCase() et toLowerCase()"
    content: "Ces méthodes transforment le texte. toUpperCase() met en MAJUSCULES, toLowerCase() met en minuscules. Ce sont des méthodes, donc avec parenthèses !"
    example: "const prenom = \"Alice\"\nconsole.log(prenom.toUpperCase())  // ALICE\nconsole.log(prenom.toLowerCase())  // alice"
  - title: "Solution complète"
    content: "Combinez toutes les méthodes pour créer le message final qui affiche le prénom en majuscules et son nombre de caractères."
    example: "const prenom = \"Alice\"\nconsole.log(prenom.length)           // 5\nconsole.log(prenom.toUpperCase())     // ALICE\nconsole.log(prenom.toLowerCase())     // alice\nconsole.log(\"Mon prénom \" + prenom.toUpperCase() + \" contient \" + prenom.length + \" caractères\")"
    learnMore: "https://devjs.ch/js/string.html"
---

# Manipuler du Texte

## 🎯 Objectif

Apprendre à manipuler les chaînes de caractères (strings) en JavaScript. Tu vas découvrir des **propriétés** et **méthodes** très utiles pour transformer du texte.

## 📖 Contexte

En JavaScript, chaque chaîne de caractères possède des **propriétés** et des **méthodes** intégrées. Ce sont des outils prêts à l'emploi pour manipuler du texte.

### Propriété vs Méthode

| Type | Syntaxe | Exemple |
|------|---------|---------|
| **Propriété** | Sans parenthèses | `texte.length` |
| **Méthode** | Avec parenthèses | `texte.toUpperCase()` |

### Les méthodes essentielles

| Méthode/Propriété | Description | Exemple |
|-------------------|-------------|---------|
| `.length` | Nombre de caractères | `"Bonjour".length` → `7` |
| `.toUpperCase()` | Convertit en MAJUSCULES | `"hello".toUpperCase()` → `"HELLO"` |
| `.toLowerCase()` | Convertit en minuscules | `"HELLO".toLowerCase()` → `"hello"` |
| `.trim()` | Supprime les espaces au début et à la fin | `"  hi  ".trim()` → `"hi"` |
| `.includes(x)` | Vérifie si le texte contient `x` | `"Bonjour".includes("jour")` → `true` |

### Exemples détaillés

```javascript
let message = "  Bonjour le monde  "

// Propriété length
console.log(message.length)           // 20 (espaces inclus)

// Méthode trim() - Supprimer les espaces
let messageNettoye = message.trim()
console.log(messageNettoye)           // "Bonjour le monde"
console.log(messageNettoye.length)    // 16

// Méthodes de casse
console.log(messageNettoye.toUpperCase())  // "BONJOUR LE MONDE"
console.log(messageNettoye.toLowerCase())  // "bonjour le monde"

// Méthode includes() - Rechercher dans le texte
console.log(messageNettoye.includes("jour"))   // true
console.log(messageNettoye.includes("soir"))   // false
```

::alert{type="info"}
**Rappel** : Une **propriété** s'utilise sans parenthèses (`texte.length`), une **méthode** s'utilise avec parenthèses (`texte.toUpperCase()`).
::

::alert{type="warning"}
**Important** : Les méthodes `.toUpperCase()`, `.toLowerCase()` et `.trim()` ne modifient **pas** la chaîne originale. Elles **retournent une nouvelle chaîne**.
::

### Utilité de `trim()` et `includes()`

Ces méthodes sont très utilisées dans les formulaires :

```javascript
// trim() : nettoyer les saisies utilisateur
let email = "  alice@exemple.com  "
let emailNettoye = email.trim()  // "alice@exemple.com"

// includes() : valider le format
if (emailNettoye.includes("@")) {
    console.log("Email valide !")
}
```

## 📝 Consigne

La variable `prenom` est déjà créée avec des espaces au début et à la fin. Tu dois :

1. Créer une variable `prenomNettoye` en utilisant `.trim()` sur `prenom`
2. Afficher la longueur avec `.length`
3. Afficher en majuscules avec `.toUpperCase()`
4. Afficher en minuscules avec `.toLowerCase()`

**Résultat attendu :**

```
5
ALICE
alice
```

::alert{type="info"}
**Rappel** : La méthode `.trim()` supprime les espaces au début et à la fin d'une chaîne. Elle ne modifie pas la chaîne originale, elle en retourne une nouvelle !
::
