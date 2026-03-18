---
title: "Accéder aux éléments"
description: "Accède aux éléments d'un tableau grâce à leur index"
difficulty: beginner
module: 5
exerciseNumber: "5.2"
duration: 5
tags:
  - tableaux
  - index
  - accès
concepts:
  - Index (commence à 0)
  - Notation tableau[index]
  - Propriété length

starterCode: |
  const pays = ["Suisse", "France", "Allemagne", "Italie", "Autriche"]

  // 1. Affiche le premier pays (index 0)
  console.log()

  // 2. Affiche le troisième pays (index ?)
  console.log()

  // 3. Affiche le dernier pays (utilise .length)
  console.log()

  // 4. Affiche le nombre total de pays
  console.log()

solution:
  code: |
    const pays = ["Suisse", "France", "Allemagne", "Italie", "Autriche"]

    // 1. Affiche le premier pays (index 0)
    console.log(pays[0])

    // 2. Affiche le troisième pays (index 2)
    console.log(pays[2])

    // 3. Affiche le dernier pays (utilise .length)
    console.log(pays[pays.length - 1])

    // 4. Affiche le nombre total de pays
    console.log(pays.length)
  explanation: "L'index commence à 0 ! Le premier élément est à l'index 0, le dernier à length - 1."

validations:
  - description: "Accéder au premier élément"
    type: code_matches
    expected: "pays\\[0\\]"
    errorMessage: "Essaie pays[0] pour accéder au premier élément"
    successMessage: "Bien joué ! Tu sais accéder au premier élément"
  - description: "Accéder au troisième élément"
    type: code_matches
    expected: "pays\\[2\\]"
    errorMessage: "Attention, le troisième élément est à l'index 2 (pas 3 !)"
    successMessage: "Exactement ! L'index commence à 0"
  - description: "Utiliser length pour le dernier"
    type: code_matches
    expected: "pays\\[pays\\.length\\s*-\\s*1\\]"
    errorMessage: "Essaie pays[pays.length - 1] pour le dernier"
    successMessage: "Malin ! Tu utilises length pour le dernier"
  - description: "Afficher la longueur"
    type: code_matches
    expected: "pays\\.length"
    errorMessage: "Utilise pays.length pour connaître le nombre d'éléments"
    successMessage: "Parfait ! Tu connais la taille du tableau"
  - description: "Affiche Suisse"
    type: output_contains
    expected: "Suisse"
    errorMessage: "Le premier pays affiché doit être Suisse"
    successMessage: "Bravo ! Tu maîtrises les index de tableaux"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Les index commencent à 0"
    content: "Attention : le premier élément est à l'index 0, pas 1 !"
    example: "const t = [\"a\", \"b\", \"c\"]\nt[0] // \"a\"\nt[1] // \"b\"\nt[2] // \"c\""
  - title: "Accéder au dernier élément"
    content: "Pour le dernier, utilise length - 1 car l'index max est toujours inférieur à la longueur."
    example: "const t = [\"x\", \"y\", \"z\"]\nt.length      // 3\nt[t.length-1] // \"z\" (index 2)"
  - title: "Solution"
    content: "Voici comment accéder aux éléments :"
    example: "console.log(pays[0])           // Suisse\nconsole.log(pays[2])           // Allemagne\nconsole.log(pays[pays.length-1]) // Autriche\nconsole.log(pays.length)       // 5"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Accéder aux éléments d'un tableau

## 🎯 Objectif

Utiliser les **index** pour accéder aux éléments d'un tableau.

## 📖 Contexte

Chaque élément d'un tableau a un **index** (sa position). Attention : l'index commence à **0** !

```javascript
const animaux = ["chat", "chien", "oiseau"]
//     index:      0        1         2
```

### Accès par index

```javascript
animaux[0]  // "chat" (premier)
animaux[1]  // "chien" (deuxième)
animaux[2]  // "oiseau" (troisième)
```

### Propriété length

```javascript
animaux.length  // 3 (nombre d'éléments)
animaux[animaux.length - 1]  // "oiseau" (dernier)
```

## 📝 Consigne

Le tableau `pays` contient 5 pays. Complète le code pour :

1. Afficher le **premier** pays (Suisse)
2. Afficher le **troisième** pays (Allemagne)
3. Afficher le **dernier** pays avec `.length`
4. Afficher le **nombre total** de pays

**Résultat attendu :**
```
Suisse
Allemagne
Autriche
5
```
