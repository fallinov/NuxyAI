---
title: "Concaténation de Texte"
description: "Apprends à assembler des chaînes de caractères avec l'opérateur +"
difficulty: beginner
module: 1
exerciseNumber: "1.6"
duration: 8
tags:
  - string
  - concaténation
  - texte
  - débutant
concepts:
  - Concaténation avec +
  - Assembler texte et variables
  - Espaces dans les chaînes

starterCode: |
  // Variables
  let prenom = "Alice"
  let ville = "Genève"

  // Crée ta phrase ici


  // Affiche le résultat

solution:
  code: |
    let prenom = "Alice"
    let ville = "Genève"

    let phrase = prenom + " habite à " + ville

    console.log(phrase)
  explanation: "On utilise l'opérateur + pour assembler les chaînes de caractères. N'oublie pas les espaces dans les parties de texte fixes !"

validations:
  - description: "Déclarer une variable phrase"
    type: code_matches
    expected: "let\\s+phrase\\s*="
    errorMessage: "Déclare une variable phrase pour stocker le résultat"
    successMessage: "Variable phrase déclarée !"
  - description: "Utiliser l'opérateur + pour concaténer"
    type: code_contains
    expected: "+"
    errorMessage: "Utilise l'opérateur + pour assembler les chaînes"
    successMessage: "Opérateur + utilisé !"
  - description: "Utiliser la variable prenom"
    type: code_matches
    expected: "phrase\\s*=.*prenom"
    errorMessage: "Utilise la variable prenom dans ta phrase"
    successMessage: "Variable prenom utilisée !"
  - description: "Utiliser la variable ville"
    type: code_matches
    expected: "phrase\\s*=.*ville"
    errorMessage: "Utilise la variable ville dans ta phrase"
    successMessage: "Variable ville utilisée !"
  - description: "Afficher phrase avec console.log()"
    type: code_matches
    expected: "console\\.log\\s*\\(\\s*phrase\\s*\\)"
    errorMessage: "Utilise console.log(phrase) pour afficher le résultat"
    successMessage: "Tu affiches bien la phrase !"
  - description: "Afficher 'Alice habite à Genève'"
    type: output_contains
    expected: "Alice habite à Genève"
    errorMessage: "La phrase doit être exactement 'Alice habite à Genève'"
    successMessage: "Parfait ! La phrase est correcte"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "L'opérateur + avec du texte"
    content: "En JavaScript, l'opérateur + peut assembler (concaténer) des chaînes de caractères. C'est comme coller des morceaux de texte ensemble."
    example: "let mot1 = \"Bon\"\nlet mot2 = \"jour\"\nlet resultat = mot1 + mot2\nconsole.log(resultat)  // Bonjour"
  - title: "N'oublie pas les espaces !"
    content: "Quand tu assembles du texte, JavaScript ne rajoute pas d'espaces automatiquement. Tu dois les inclure dans tes chaînes."
    example: "let nom = \"Alice\"\nlet phrase = nom + \"aime coder\"    // AliceAIME coder (pas d'espace !)\nlet phrase2 = nom + \" aime coder\"  // Alice aime coder (avec espace)"
  - title: "Assembler texte et variables"
    content: "Tu peux mélanger du texte fixe (entre guillemets) et des variables dans une même expression."
    example: "let prenom = \"Alice\"\nlet age = 25\nlet phrase = prenom + \" a \" + age + \" ans\"\nconsole.log(phrase)  // Alice a 25 ans"
    learnMore: "https://devjs.ch/js/string.html"
---

# Concaténation de Texte

## Objectif

Apprendre à **assembler des chaînes de caractères** (texte) en JavaScript avec l'opérateur `+`. Cette technique s'appelle la **concaténation**.

## Contexte

En JavaScript, l'opérateur `+` a deux usages :
- Avec des **nombres** : il fait une addition (`5 + 3` = `8`)
- Avec du **texte** : il assemble les chaînes (`"Bon" + "jour"` = `"Bonjour"`)

### Concaténer du texte

```javascript
let mot1 = "Bon"
let mot2 = "jour"
let salutation = mot1 + mot2

console.log(salutation)  // Bonjour
```

### Attention aux espaces !

JavaScript ne rajoute **pas d'espaces automatiquement** entre les morceaux de texte. Tu dois les inclure toi-même :

```javascript
let prenom = "Alice"
let phrase1 = prenom + "aime JavaScript"    // AliceaimeJavaScript
let phrase2 = prenom + " aime JavaScript"   // Alice aime JavaScript
```

::alert{type="warning"}
**Piège courant** : Oublie les espaces et ton texte sera collé !
::

### Mélanger texte et variables

Tu peux combiner du texte fixe (entre guillemets) avec des variables :

```javascript
let prenom = "Alice"
let age = 25

let presentation = prenom + " a " + age + " ans"
console.log(presentation)  // Alice a 25 ans
```

::alert{type="info"}
**Remarque** : Le nombre `age` est automatiquement converti en texte lors de la concaténation.
::

### Alternative moderne : les template literals

Avec les backticks `` ` `` (accent grave), tu peux insérer des variables directement dans le texte :

```javascript
let prenom = "Alice"
let age = 25

// Avec concaténation (classique)
let phrase1 = prenom + " a " + age + " ans"

// Avec template literal (moderne) ✨
let phrase2 = `${prenom} a ${age} ans`

// Les deux donnent : "Alice a 25 ans"
```

::alert{type="success"}
**Avantage** : Plus lisible, surtout pour les longues phrases !
::

## Consigne

Les variables `prenom` et `ville` sont déjà créées. Tu dois :

1. Créer une variable `phrase` qui assemble : `prenom + " habite à " + ville`
2. Affiche le résultat avec `console.log(phrase)`

**Résultat attendu :**

```
Alice habite à Genève
```

::alert{type="info"}
**Conseil** : Fais attention aux espaces dans `" habite à "` pour que la phrase soit bien formée !
::
