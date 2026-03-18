---
title: "Filtrer un tableau d'objets"
description: "Utilise filter pour sélectionner des objets selon une condition"
difficulty: beginner
module: 6
exerciseNumber: "6.6"
duration: 8
tags:
  - objets
  - tableaux
  - filter
  - condition
concepts:
  - filter() sur objets
  - Accès aux propriétés dans le callback
  - Condition sur une propriété

starterCode: |
  const eleves = [
    { nom: "Alice", note: 5.5 },
    { nom: "Bob", note: 3.5 },
    { nom: "Clara", note: 6.0 },
    { nom: "David", note: 4.0 },
    { nom: "Emma", note: 3.0 }
  ]

  // 1. Filtre les élèves avec une note suffisante (>= 4)
  const reussis = eleves.filter()

  // 2. Filtre les élèves avec une note insuffisante (< 4)
  const echecs = eleves.filter()

  console.log("Réussis:", reussis)
  console.log("Échecs:", echecs)

solution:
  code: |
    const eleves = [
      { nom: "Alice", note: 5.5 },
      { nom: "Bob", note: 3.5 },
      { nom: "Clara", note: 6.0 },
      { nom: "David", note: 4.0 },
      { nom: "Emma", note: 3.0 }
    ]

    // 1. Filtre les élèves avec une note suffisante (>= 4)
    const reussis = eleves.filter(eleve => eleve.note >= 4)

    // 2. Filtre les élèves avec une note insuffisante (< 4)
    const echecs = eleves.filter(eleve => eleve.note < 4)

    console.log("Réussis:", reussis)
    console.log("Échecs:", echecs)
  explanation: "filter() teste chaque objet. On accède à la propriété 'note' pour la condition. Seuls les objets qui retournent true sont gardés."

validations:
  - description: "Filtrer les notes >= 4"
    type: code_matches
    expected: "filter\\s*\\(\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>\\s*\\{?\\s*(?:return\\s+)?\\w+\\.note\\s*>=\\s*4"
    errorMessage: "Essaie filter(eleve => eleve.note >= 4)"
    successMessage: "Bien ! Tu filtres les réussites"
  - description: "Filtrer les notes < 4"
    type: code_matches
    expected: "filter\\s*\\(\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>\\s*\\{?\\s*(?:return\\s+)?\\w+\\.note\\s*<\\s*4"
    errorMessage: "Essaie filter(eleve => eleve.note < 4)"
    successMessage: "Parfait ! Tu maîtrises le filtre sur objets"
  - description: "Alice dans les réussis"
    type: output_contains
    expected: "Alice"
    errorMessage: "Alice (5.5) doit être dans les réussis"
    successMessage: "Alice est bien là !"
  - description: "Bob dans les échecs"
    type: output_contains
    expected: "Bob"
    errorMessage: "Bob (3.5) doit être dans les échecs"
    successMessage: "Bravo ! Tu sais filtrer un tableau d'objets"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Accéder à une propriété"
    content: "Dans le callback, l'objet est passé en paramètre. Accède à ses propriétés avec le point."
    example: "eleves.filter(eleve => eleve.note >= 4)"
  - title: "Comment filter fonctionne"
    content: "filter() garde l'objet si la condition retourne true."
    example: "{ nom: \"Alice\", note: 5.5 }\n5.5 >= 4 → true → Alice est gardée"
  - title: "Solution"
    content: "Voici les deux filtres :"
    example: "const reussis = eleves.filter(eleve => eleve.note >= 4)\nconst echecs = eleves.filter(eleve => eleve.note < 4)"
    learnMore: "https://devjs.ch/js/objets.html"
---

# Filtrer un tableau d'objets

## 🎯 Objectif

Utiliser **filter()** pour sélectionner des objets qui respectent une condition sur leurs propriétés.

## 📖 Contexte

On peut filtrer un tableau d'objets en testant une de leurs propriétés :

```javascript
const produits = [
  { nom: "Café", prix: 4.50 },
  { nom: "Thé", prix: 3.00 },
  { nom: "Chocolat", prix: 5.00 }
]

// Produits à moins de 4 CHF
const bonMarche = produits.filter(p => p.prix < 4)
// [{ nom: "Thé", prix: 3.00 }]

// Produits à 4 CHF ou plus
const chers = produits.filter(p => p.prix >= 4)
// [{ nom: "Café", prix: 4.50 }, { nom: "Chocolat", prix: 5.00 }]
```

### Structure

```javascript
const resultat = tableau.filter(objet => objet.propriete condition)
```

- **objet** : chaque élément du tableau (tu choisis le nom)
- **objet.propriete** : la valeur à tester
- **condition** : doit retourner `true` pour garder l'objet

::alert{type="warning"}
**Important** : `filter()` **ne modifie pas** le tableau original. Il retourne un **nouveau tableau** contenant uniquement les éléments qui passent le test. Il faut stocker le résultat dans une variable !
::

### Autres exemples

```javascript
const personnes = [
  { nom: "Alice", age: 25 },
  { nom: "Bob", age: 17 },
  { nom: "Clara", age: 32 }
]

// Personnes majeures
const majeurs = personnes.filter(p => p.age >= 18)
// [{ nom: "Alice", age: 25 }, { nom: "Clara", age: 32 }]

// Noms commençant par "A"
const avecA = personnes.filter(p => p.nom.startsWith("A"))
// [{ nom: "Alice", age: 25 }]
```

## 📝 Consigne

À partir du tableau d'élèves :

1. Crée `reussis` : élèves avec note **>= 4**
2. Crée `echecs` : élèves avec note **< 4**

**Résultat attendu :**
```
Réussis: [{ nom: "Alice", note: 5.5 }, { nom: "David", note: 4.0 }, { nom: "Clara", note: 6.0 }]
Échecs: [{ nom: "Bob", note: 3.5 }, { nom: "Emma", note: 3.0 }]
```
