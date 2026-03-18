---
title: "Tableau d'objets"
description: "Manipule un tableau contenant plusieurs objets"
difficulty: beginner
module: 6
exerciseNumber: "6.4"
duration: 8
tags:
  - objets
  - tableaux
  - données
concepts:
  - Tableau d'objets
  - Accès par index
  - Notation combinée

starterCode: |
  const eleves = [
    { nom: "Alice", note: 5.5 },
    { nom: "Bob", note: 4.0 },
    { nom: "Clara", note: 6.0 }
  ]

  // 1. Affiche le nom du premier élève

  // 2. Affiche la note de Clara (3ème élève)

  // 3. Affiche le nombre total d'élèves

solution:
  code: |
    const eleves = [
      { nom: "Alice", note: 5.5 },
      { nom: "Bob", note: 4.0 },
      { nom: "Clara", note: 6.0 }
    ]

    // 1. Affiche le nom du premier élève
    console.log(eleves[0].nom)

    // 2. Affiche la note de Clara (3ème élève)
    console.log(eleves[2].note)

    // 3. Affiche le nombre total d'élèves
    console.log(eleves.length)
  explanation: "On accède d'abord à l'élément du tableau par son index [0], puis à sa propriété avec .nom"

validations:
  - description: "Accéder au premier élève"
    type: code_contains
    expected: "eleves[0]"
    errorMessage: "Utilise eleves[0] pour le premier élève (les index commencent à 0)"
    successMessage: "Bien ! Tu accèdes au premier élément"
  - description: "Afficher Alice"
    type: output_contains
    expected: "Alice"
    errorMessage: "Le nom 'Alice' doit s'afficher"
    successMessage: "Alice est là !"
  - description: "Afficher 6"
    type: output_contains
    expected: "6"
    errorMessage: "La note de Clara (6) doit s'afficher"
    successMessage: "Note de Clara affichée !"
  - description: "Afficher 3"
    type: output_contains
    expected: "3"
    errorMessage: "Le nombre d'élèves (3) doit s'afficher avec eleves.length"
    successMessage: "Bravo ! Tu maîtrises les tableaux d'objets"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Accéder à un objet du tableau"
    content: "D'abord l'index du tableau, puis la propriété de l'objet :"
    example: "eleves[0]       // Premier objet\neleves[0].nom   // \"Alice\""
  - title: "Les index commencent à 0"
    content: "Premier = [0], Deuxième = [1], Troisième = [2]"
    example: "eleves[0] // Alice\neleves[1] // Bob\neleves[2] // Clara"
  - title: "Nombre d'éléments"
    content: "Utilise .length pour connaître la taille du tableau :"
    example: "eleves.length  // 3"
    learnMore: "https://devjs.ch/js/objets.html"
---

# Tableau d'objets

## 🎯 Objectif

Accéder aux données d'un **tableau contenant des objets**.

## 📖 Contexte

Un tableau peut contenir des objets :

```javascript
const produits = [
  { nom: "Café", prix: 4.50 },
  { nom: "Thé", prix: 3.00 }
]
```

### Accéder aux données

```javascript
produits[0]        // Premier objet : { nom: "Café", prix: 4.50 }
produits[0].nom    // "Café"
produits[1].prix   // 3.00
produits.length    // 2 (nombre de produits)
```

::alert{type="warning"}
**Rappel** : Les index commencent à **0** !
::

## 📝 Consigne

1. Affiche le **nom du premier élève** (Alice)
2. Affiche la **note de Clara** (3ème élève)
3. Affiche le **nombre total d'élèves**

**Résultat attendu :**
```
Alice
6
3
```
