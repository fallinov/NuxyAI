---
title: "Transformer un tableau"
description: "Utilise map pour transformer chaque élément d'un tableau"
difficulty: beginner
module: 5
exerciseNumber: "5.7"
duration: 8
tags:
  - tableaux
  - map
  - transformation
  - nouveau tableau
concepts:
  - map()
  - Transformation d'éléments
  - Retour d'un nouveau tableau

starterCode: |
  const prix = [10, 25, 50, 100]

  // 1. Crée un tableau avec les prix en francs suisses (ajoute " CHF")
  // Exemple: [10, 25] → ["10 CHF", "25 CHF"]
  const prixCHF = prix.map()

  // 2. Crée un tableau avec les prix réduits de 20%
  // Exemple: 100 → 80 (100 * 0.8)
  const prixReduits = prix.map()

  console.log("Prix en CHF:", prixCHF)
  console.log("Prix réduits:", prixReduits)

solution:
  code: |
    const prix = [10, 25, 50, 100]

    // 1. Crée un tableau avec les prix en francs suisses
    const prixCHF = prix.map(p => p + " CHF")

    // 2. Crée un tableau avec les prix réduits de 20%
    const prixReduits = prix.map(p => p * 0.8)

    console.log("Prix en CHF:", prixCHF)
    console.log("Prix réduits:", prixReduits)
  explanation: "map() crée un nouveau tableau en transformant chaque élément. Contrairement à filter, map garde toujours le même nombre d'éléments."

validations:
  - description: "Utiliser map pour prixCHF"
    type: code_matches
    expected: "prixCHF\\s*=\\s*prix\\.map"
    errorMessage: "Essaie prix.map() pour créer prixCHF"
    successMessage: "Bien ! Tu utilises map()"
  - description: "Ajouter CHF"
    type: code_contains
    expected: "CHF"
    errorMessage: "N'oublie pas d'ajouter \" CHF\" à chaque prix"
    successMessage: "Parfait ! Les prix sont en francs suisses"
  - description: "Utiliser map pour prixReduits"
    type: code_matches
    expected: "prixReduits\\s*=\\s*prix\\.map"
    errorMessage: "Utilise aussi prix.map() pour les réductions"
    successMessage: "Super ! Tu transformes le tableau"
  - description: "Calculer 80%"
    type: code_matches
    expected: "\\*\\s*0\\.8|\\*\\s*80\\s*/\\s*100"
    errorMessage: "Multiplie par 0.8 pour garder 80% du prix"
    successMessage: "Le calcul est bon !"
  - description: "Affiche 10 CHF"
    type: output_contains
    expected: "10 CHF"
    errorMessage: "La sortie doit contenir \"10 CHF\""
    successMessage: "10 CHF est là !"
  - description: "Affiche 80"
    type: output_contains
    expected: "80"
    errorMessage: "La sortie doit contenir 80 (100 × 0.8)"
    successMessage: "Bravo ! Tu maîtrises map()"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Syntaxe map"
    content: "map transforme chaque élément et retourne un nouveau tableau."
    example: "const doubles = [1,2,3].map(n => n * 2)\n// [2, 4, 6]"
  - title: "Concaténation avec map"
    content: "Tu peux combiner texte et valeur dans map."
    example: "[10, 20].map(p => p + \" CHF\")\n// [\"10 CHF\", \"20 CHF\"]"
  - title: "Solution"
    content: "Voici les deux transformations :"
    example: "const prixCHF = prix.map(p => p + \" CHF\")\nconst prixReduits = prix.map(p => p * 0.8)"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Transformer un tableau

## 🎯 Objectif

Utiliser **map** pour créer un nouveau tableau en transformant chaque élément.

## 📖 Contexte

`map()` applique une transformation à chaque élément et retourne un nouveau tableau :

```javascript
const nombres = [1, 2, 3, 4]

const doubles = nombres.map(n => n * 2)
// [2, 4, 6, 8]

const carres = nombres.map(n => n * n)
// [1, 4, 9, 16]
```

### Structure

```javascript
const resultat = tableau.map(element => transformation)
```

- **transformation** : ce que tu veux faire avec chaque élément
- **resultat** : nouveau tableau avec le même nombre d'éléments

### Différence avec filter

| Méthode | Action | Nombre d'éléments |
|---------|--------|-------------------|
| `filter` | Garde certains éléments | Peut diminuer |
| `map` | Transforme chaque élément | Reste identique |

::alert{type="info"}
**Bon à savoir** : `map()` **ne modifie pas** le tableau original. Il retourne un **nouveau tableau** avec les valeurs transformées.
::

### Exemples pratiques

```javascript
const noms = ["alice", "bob"]

// Mettre en majuscules
const majuscules = noms.map(n => n.toUpperCase())
// ["ALICE", "BOB"]

// Ajouter un préfixe
const emails = noms.map(n => n + "@email.com")
// ["alice@email.com", "bob@email.com"]
```

## 📝 Consigne

À partir du tableau de prix :

1. Crée `prixCHF` : ajoute " CHF" à chaque prix → `["10 CHF", "25 CHF", "50 CHF", "100 CHF"]`
2. Crée `prixReduits` : applique une réduction de 20% → `[8, 20, 40, 80]`

**Résultat attendu :**
```
Prix en CHF: ["10 CHF", "25 CHF", "50 CHF", "100 CHF"]
Prix réduits: [8, 20, 40, 80]
```
