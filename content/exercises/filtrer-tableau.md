---
title: "Filtrer un tableau"
description: "Utilise filter pour garder uniquement les éléments qui respectent une condition"
difficulty: beginner
module: 5
exerciseNumber: "5.6"
duration: 8
tags:
  - tableaux
  - filter
  - condition
  - nouveau tableau
concepts:
  - filter()
  - Condition de filtre
  - Retour d'un nouveau tableau

starterCode: |
  const notes = [4.5, 3.0, 5.5, 2.5, 6.0, 4.0, 5.0]

  // 1. Filtre les notes suffisantes (>= 4)
  const suffisantes = notes.filter()

  // 2. Filtre les notes insuffisantes (< 4)
  const insuffisantes = notes.filter()

  console.log("Notes suffisantes:", suffisantes)
  console.log("Notes insuffisantes:", insuffisantes)

solution:
  code: |
    const notes = [4.5, 3.0, 5.5, 2.5, 6.0, 4.0, 5.0]

    // 1. Filtre les notes suffisantes (>= 4)
    const suffisantes = notes.filter(note => note >= 4)

    // 2. Filtre les notes insuffisantes (< 4)
    const insuffisantes = notes.filter(note => note < 4)

    console.log("Notes suffisantes:", suffisantes)
    console.log("Notes insuffisantes:", insuffisantes)
  explanation: "filter() crée un nouveau tableau avec les éléments qui passent le test. Le tableau original n'est pas modifié."

validations:
  - description: "Filtrer notes >= 4"
    type: code_matches
    expected: "filter\\s*\\(\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>\\s*\\{?\\s*(?:return\\s+)?\\w+\\s*>=\\s*4"
    errorMessage: "Essaie filter(note => note >= 4) pour les suffisantes"
    successMessage: "Bien ! Tu filtres les bonnes notes"
  - description: "Filtrer notes < 4"
    type: code_matches
    expected: "filter\\s*\\(\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>\\s*\\{?\\s*(?:return\\s+)?\\w+\\s*<\\s*4"
    errorMessage: "Essaie filter(note => note < 4) pour les insuffisantes"
    successMessage: "Parfait ! Tu maîtrises filter()"
  - description: "Affiche 4.5"
    type: output_contains
    expected: "4.5"
    errorMessage: "Les notes suffisantes doivent contenir 4.5"
    successMessage: "4.5 est bien là !"
  - description: "Affiche 2.5"
    type: output_contains
    expected: "2.5"
    errorMessage: "Les notes insuffisantes doivent contenir 2.5"
    successMessage: "Bravo ! Tu sais filtrer un tableau"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Syntaxe filter"
    content: "filter prend une fonction qui retourne true ou false pour chaque élément."
    example: "const pairs = [1,2,3,4].filter(n => n % 2 === 0)\n// [2, 4]"
  - title: "Condition simple"
    content: "La fonction doit retourner true pour garder l'élément."
    example: "notes.filter(note => note >= 4)"
  - title: "Solution"
    content: "Voici les deux filtres :"
    example: "const suffisantes = notes.filter(note => note >= 4)\nconst insuffisantes = notes.filter(note => note < 4)"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Filtrer un tableau

## 🎯 Objectif

Utiliser **filter** pour créer un nouveau tableau avec uniquement les éléments souhaités.

## 📖 Contexte

`filter()` parcourt le tableau et garde uniquement les éléments qui respectent une condition :

```javascript
const nombres = [1, 2, 3, 4, 5, 6]

const pairs = nombres.filter(n => n % 2 === 0)
// [2, 4, 6]

const grands = nombres.filter(n => n > 3)
// [4, 5, 6]
```

### Structure

```javascript
const resultat = tableau.filter(element => condition)
```

- **condition** : doit retourner `true` pour garder l'élément
- **resultat** : nouveau tableau (l'original n'est pas modifié)

### Exemples

```javascript
const mots = ["chat", "chien", "oiseau", "rat"]

// Mots de plus de 4 lettres
const longs = mots.filter(mot => mot.length > 4)
// ["chien", "oiseau"]

// Mots commençant par "ch"
const ch = mots.filter(mot => mot.startsWith("ch"))
// ["chat", "chien"]
```

## 📝 Consigne

À partir du tableau de notes :

1. Crée `suffisantes` : notes **>= 4**
2. Crée `insuffisantes` : notes **< 4**

**Résultat attendu :**
```
Notes suffisantes: [4.5, 5.5, 6, 4, 5]
Notes insuffisantes: [3, 2.5]
```
