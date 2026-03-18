---
title: "Parcourir un tableau"
description: "Utilise forEach pour exécuter une action sur chaque élément"
difficulty: beginner
module: 5
exerciseNumber: "5.4"
duration: 7
tags:
  - tableaux
  - forEach
  - boucle
  - itération
concepts:
  - forEach()
  - Fonction callback
  - Paramètre élément

starterCode: |
  const prenoms = ["Alice", "Bob", "Charlie", "Diana"]

  // Affiche chaque prénom avec "Bonjour" devant
  // Exemple de sortie attendue :
  // Bonjour Alice
  // Bonjour Bob
  // Bonjour Charlie
  // Bonjour Diana

solution:
  code: |
    const prenoms = ["Alice", "Bob", "Charlie", "Diana"]

    // Affiche chaque prénom avec "Bonjour" devant
    prenoms.forEach(prenom => {
      console.log("Bonjour " + prenom)
    })
  explanation: "forEach() exécute une fonction pour chaque élément. Le paramètre (ici 'prenom') représente l'élément courant."

validations:
  - description: "Utiliser forEach"
    type: code_matches
    expected: "prenoms\\.forEach\\s*\\("
    errorMessage: "Essaie prenoms.forEach() pour parcourir le tableau"
    successMessage: "Bien ! Tu utilises forEach"
  - description: "Fonction avec paramètre"
    type: code_matches
    expected: "forEach\\s*\\(\\s*\\(?\\s*\\w+\\s*\\)?\\s*=>|forEach\\s*\\(\\s*function\\s*\\("
    errorMessage: "N'oublie pas la fonction fléchée : forEach(element => { ... })"
    successMessage: "Super ! Tu maîtrises les fonctions fléchées"
  - description: "Afficher Bonjour"
    type: code_matches
    expected: "console\\.log\\s*\\([\"']Bonjour"
    errorMessage: "Affiche \"Bonjour \" suivi du prénom"
    successMessage: "Le message est parfait !"
  - description: "Affiche Bonjour Alice"
    type: output_contains
    expected: "Bonjour Alice"
    errorMessage: "La sortie doit contenir \"Bonjour Alice\""
    successMessage: "Alice est saluée !"
  - description: "Affiche Bonjour Diana"
    type: output_contains
    expected: "Bonjour Diana"
    errorMessage: "La sortie doit contenir \"Bonjour Diana\""
    successMessage: "Bravo ! Tout le monde est salué"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Comment écrire =>"
    content: "La flèche => s'écrit avec deux caractères collés : le signe égal (=) suivi du signe supérieur (>)"
    example: "=  puis  >  donne  =>\n\nC'est la syntaxe des fonctions fléchées (arrow functions)"
  - title: "Syntaxe forEach"
    content: "forEach prend une fonction qui sera exécutée pour chaque élément."
    example: "tableau.forEach(element => {\n  // code exécuté pour chaque element\n})"
  - title: "Concaténation"
    content: "Utilise + pour combiner des chaînes de caractères."
    example: "console.log(\"Bonjour \" + prenom)"
  - title: "Solution"
    content: "Voici comment parcourir et saluer :"
    example: "prenoms.forEach(prenom => {\n  console.log(\"Bonjour \" + prenom)\n})"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Parcourir un tableau

## 🎯 Objectif

Utiliser **forEach** pour exécuter une action sur chaque élément d'un tableau.

## 📖 Contexte

`forEach()` est la méthode la plus simple pour parcourir un tableau :

```javascript
const nombres = [1, 2, 3]

nombres.forEach(n => {
  console.log(n * 2)
})
// Affiche : 2, 4, 6
```

### Structure

```javascript
tableau.forEach(element => {
  // Code exécuté pour chaque element
})
```

- **element** : représente l'élément courant (tu choisis le nom)
- Le code entre `{ }` est exécuté autant de fois qu'il y a d'éléments

### Exemple concret

```javascript
const fruits = ["pomme", "banane", "kiwi"]

fruits.forEach(fruit => {
  console.log("J'aime les " + fruit + "s")
})
// J'aime les pommes
// J'aime les bananes
// J'aime les kiwis
```

### Bonus : accéder à l'index

Tu peux ajouter un 2e paramètre pour obtenir la position :

```javascript
const noms = ["Alice", "Bob", "Clara"]

noms.forEach((nom, index) => {
  console.log(index + ". " + nom)
})
// 0. Alice
// 1. Bob
// 2. Clara
```

::alert{type="info"}
**Bon à savoir** : `forEach` ne modifie pas le tableau et ne retourne rien (`undefined`). Elle sert uniquement à exécuter une action pour chaque élément.
::

## 📝 Consigne

Utilise `forEach` pour afficher un message de bienvenue pour chaque prénom :

```
Bonjour Alice
Bonjour Bob
Bonjour Charlie
Bonjour Diana
```
