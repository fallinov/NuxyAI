---
title: "Boucles for et for...of"
description: "Découvre d'autres façons de parcourir un tableau"
difficulty: beginner
module: 5
exerciseNumber: "5.8"
duration: 10
tags:
  - tableaux
  - boucle
  - for
  - for...of
  - itération
concepts:
  - Boucle for classique
  - Boucle for...of
  - Index et valeur
  - Quand utiliser quelle boucle

starterCode: |
  const fruits = ["pomme", "banane", "orange", "kiwi"]

  // 1. Parcours avec for...of (moderne et simple)
  // Affiche chaque fruit sur une ligne
  console.log("=== for...of ===")


  // 2. Parcours avec for classique (quand on a besoin de l'index)
  // Affiche "1. pomme", "2. banane", etc.
  console.log("=== for classique ===")


solution:
  code: |
    const fruits = ["pomme", "banane", "orange", "kiwi"]

    // 1. Parcours avec for...of (moderne et simple)
    // Affiche chaque fruit sur une ligne
    console.log("=== for...of ===")
    for (const fruit of fruits) {
      console.log(fruit)
    }

    // 2. Parcours avec for classique (quand on a besoin de l'index)
    // Affiche "1. pomme", "2. banane", etc.
    console.log("=== for classique ===")
    for (let i = 0; i < fruits.length; i++) {
      console.log((i + 1) + ". " + fruits[i])
    }
  explanation: "for...of est simple quand on veut juste les valeurs. La boucle for classique donne accès à l'index, utile pour numéroter ou accéder à d'autres positions."

validations:
  - description: "Utiliser for...of"
    type: code_matches
    expected: "for\\s*\\(\\s*(const|let)\\s+\\w+\\s+of\\s+fruits\\s*\\)"
    errorMessage: "Utilise for (const fruit of fruits) { ... }"
    successMessage: "Bien ! Tu utilises for...of"
  - description: "Utiliser for classique"
    type: code_matches
    expected: "for\\s*\\(\\s*let\\s+\\w+\\s*=\\s*0\\s*;.*(<|<=).*length"
    errorMessage: "Utilise for (let i = 0; i < fruits.length; i++) { ... }"
    successMessage: "Parfait ! Tu maîtrises la boucle for"
  - description: "Affiche pomme"
    type: output_contains
    expected: "pomme"
    errorMessage: "Le fruit 'pomme' doit s'afficher"
    successMessage: "Pomme affichée !"
  - description: "Affiche numérotation"
    type: output_matches
    expected: "1\\..*pomme"
    errorMessage: "Affiche '1. pomme' avec la numérotation"
    successMessage: "Numérotation correcte !"
  - description: "Affiche kiwi"
    type: output_contains
    expected: "kiwi"
    errorMessage: "Le fruit 'kiwi' doit s'afficher"
    successMessage: "Bravo ! Tu maîtrises les boucles"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Syntaxe for...of"
    content: "for...of parcourt directement les valeurs du tableau :"
    example: "for (const fruit of fruits) {\n  console.log(fruit)\n}"
  - title: "Syntaxe for classique"
    content: "La boucle for donne accès à l'index i :"
    example: "for (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i])\n}"
  - title: "Numéroter à partir de 1"
    content: "L'index commence à 0, mais on veut afficher à partir de 1 :"
    example: "console.log((i + 1) + \". \" + fruits[i])\n// i=0 → \"1. pomme\""
    learnMore: "https://devjs.ch/js/boucles.html"
---

# Boucles for et for...of

## 🎯 Objectif

Découvrir **for...of** et la **boucle for classique** pour parcourir un tableau.

## 📖 Contexte

Tu connais déjà `forEach`. Voici deux autres façons de parcourir un tableau :

### 1. for...of — Simple et moderne ✨

Parfait quand tu veux juste les **valeurs** :

```javascript
const couleurs = ["rouge", "vert", "bleu"]

for (const couleur of couleurs) {
  console.log(couleur)
}
// rouge
// vert
// bleu
```

### 2. for classique — Quand tu as besoin de l'index

Utile pour numéroter, accéder à l'élément suivant, ou modifier le tableau :

```javascript
const couleurs = ["rouge", "vert", "bleu"]

for (let i = 0; i < couleurs.length; i++) {
  console.log(i + " : " + couleurs[i])
}
// 0 : rouge
// 1 : vert
// 2 : bleu
```

### Structure de la boucle for

```javascript
for (let i = 0; i < tableau.length; i++) {
//       ↑          ↑                 ↑
//   Départ    Condition         Incrément
}
```

- `let i = 0` : on commence à l'index 0
- `i < tableau.length` : on continue tant que i est plus petit que la taille
- `i++` : on ajoute 1 à i après chaque tour

### Comparaison des méthodes

| Méthode | Accès index | Cas d'usage |
|---------|-------------|-------------|
| `forEach` | Oui (2e param) | Exécuter une action pour chaque élément |
| `for...of` | Non | Parcours simple, juste les valeurs |
| `for` | Oui | Besoin de l'index, modifier le tableau |

```javascript
// forEach avec index
fruits.forEach((fruit, index) => {
  console.log(index + ": " + fruit)
})

// for...of (pas d'index direct)
for (const fruit of fruits) {
  console.log(fruit)
}

// for classique (index i)
for (let i = 0; i < fruits.length; i++) {
  console.log(i + ": " + fruits[i])
}
```

## 📝 Consigne

1. Utilise **for...of** pour afficher chaque fruit
2. Utilise **for classique** pour afficher les fruits numérotés

**Résultat attendu :**
```
=== for...of ===
pomme
banane
orange
kiwi
=== for classique ===
1. pomme
2. banane
3. orange
4. kiwi
```
