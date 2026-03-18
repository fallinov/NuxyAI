---
title: "Les méthodes console"
description: "Découvre console.log, warn, error et table pour déboguer"
difficulty: beginner
module: 1
exerciseNumber: "1.8"
duration: 8
tags:
  - console
  - debug
  - bases
  - objets natifs
concepts:
  - console.log()
  - console.warn()
  - console.error()
  - console.table()
  - console.clear()

starterCode: |
  const utilisateur = {
    nom: "Alice",
    age: 25,
    ville: "Genève"
  }

  const scores = [
    { nom: "Alice", points: 150 },
    { nom: "Bob", points: 120 },
    { nom: "Clara", points: 180 }
  ]

  // 1. Affiche un message normal avec console.log
  console.log("Bienvenue dans l'application !")

  // 2. Affiche un avertissement avec console.warn
  // Message : "Attention : cette fonctionnalité est en bêta"


  // 3. Affiche une erreur avec console.error
  // Message : "Erreur : connexion impossible"


  // 4. Affiche l'objet utilisateur


  // 5. Affiche le tableau scores sous forme de table
  // Utilise console.table() pour un affichage formaté


solution:
  code: |
    const utilisateur = {
      nom: "Alice",
      age: 25,
      ville: "Genève"
    }

    const scores = [
      { nom: "Alice", points: 150 },
      { nom: "Bob", points: 120 },
      { nom: "Clara", points: 180 }
    ]

    // 1. Affiche un message normal avec console.log
    console.log("Bienvenue dans l'application !")

    // 2. Affiche un avertissement avec console.warn
    console.warn("Attention : cette fonctionnalité est en bêta")

    // 3. Affiche une erreur avec console.error
    console.error("Erreur : connexion impossible")

    // 4. Affiche l'objet utilisateur
    console.log(utilisateur)

    // 5. Affiche le tableau scores sous forme de table
    console.table(scores)
  explanation: "console offre plusieurs méthodes pour afficher des informations avec différents niveaux d'importance. console.table est particulièrement utile pour visualiser des tableaux d'objets."

validations:
  - description: "Utiliser console.warn"
    type: code_contains
    expected: "console.warn"
    errorMessage: "Utilise console.warn() pour l'avertissement"
    successMessage: "Bien ! Tu affiches un warning"
  - description: "Utiliser console.error"
    type: code_contains
    expected: "console.error"
    errorMessage: "Utilise console.error() pour l'erreur"
    successMessage: "Erreur affichée !"
  - description: "Afficher l'objet utilisateur"
    type: code_matches
    expected: "console\\.log\\s*\\(\\s*utilisateur\\s*\\)"
    errorMessage: "Affiche l'objet avec console.log(utilisateur)"
    successMessage: "Objet affiché !"
  - description: "Utiliser console.table"
    type: code_contains
    expected: "console.table"
    errorMessage: "Utilise console.table(scores) pour afficher le tableau"
    successMessage: "Bravo ! Tu maîtrises les méthodes console"
  - description: "Message warn correct"
    type: output_contains
    expected: "bêta"
    errorMessage: "Le warning doit contenir 'bêta'"
    successMessage: "Message warning OK !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "console.warn"
    content: "Affiche un message d'avertissement (jaune dans la console) :"
    example: "console.warn(\"Attention : quota presque atteint\")"
  - title: "console.error"
    content: "Affiche un message d'erreur (rouge dans la console) :"
    example: "console.error(\"Erreur : fichier introuvable\")"
  - title: "console.table"
    content: "Affiche un tableau ou tableau d'objets sous forme de table :"
    example: "console.table([{a: 1}, {a: 2}])"
    learnMore: "https://devjs.ch/js/interactions-avec-lutilisateur.html"
---

# Les méthodes console

## 🎯 Objectif

Découvrir les différentes méthodes de l'objet **console** pour afficher et déboguer.

## 📖 Contexte

L'objet `console` est disponible partout en JavaScript. Il offre plusieurs méthodes pour afficher des informations :

### console.log() — Message standard

```javascript
console.log("Hello World")
console.log("Score:", 100)
console.log({ nom: "Alice", age: 25 })
```

### console.warn() — Avertissement ⚠️

Affiche un message jaune dans la console du navigateur :

```javascript
console.warn("Attention : cette API sera dépréciée")
console.warn("Quota de requêtes presque atteint")
```

### console.error() — Erreur ❌

Affiche un message rouge dans la console :

```javascript
console.error("Erreur : utilisateur non trouvé")
console.error("La connexion a échoué")
```

### console.table() — Tableau formaté 📊

Affiche un tableau ou un tableau d'objets sous forme de table lisible :

```javascript
const users = [
  { nom: "Alice", age: 25 },
  { nom: "Bob", age: 30 }
]

console.table(users)
// Affiche :
// ┌─────────┬─────────┬─────┐
// │ (index) │   nom   │ age │
// ├─────────┼─────────┼─────┤
// │    0    │ "Alice" │ 25  │
// │    1    │  "Bob"  │ 30  │
// └─────────┴─────────┴─────┘
```

### Autres méthodes utiles

| Méthode | Usage |
|---------|-------|
| `console.info()` | Information (similaire à log) |
| `console.clear()` | Efface la console |
| `console.time()` / `console.timeEnd()` | Mesurer le temps d'exécution |
| `console.group()` / `console.groupEnd()` | Grouper des messages |

### L'objet console dans le navigateur

Dans le navigateur, ouvre les **DevTools** (F12) et va dans l'onglet **Console** pour voir tous ces messages avec leurs couleurs !

## 📝 Consigne

1. Affiche un **avertissement** : `"Attention : cette fonctionnalité est en bêta"`
2. Affiche une **erreur** : `"Erreur : connexion impossible"`
3. Affiche l'**objet** `utilisateur` avec `console.log`
4. Affiche le **tableau** `scores` avec `console.table`

**Résultat attendu :**

```
Bienvenue dans l'application !
Attention : cette fonctionnalité est en bêta
Erreur : connexion impossible
{ nom: "Alice", age: 25, ville: "Genève" }
[ { nom: "Alice", points: 150 }, { nom: "Bob", points: 120 }, { nom: "Clara", points: 180 } ]
```
