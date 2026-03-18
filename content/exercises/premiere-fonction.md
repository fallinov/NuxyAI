---
title: "Première fonction"
description: "Crée et appelle ta première fonction JavaScript"
difficulty: beginner
module: 4
exerciseNumber: "4.1"
duration: 5
tags:
  - fonctions
  - déclaration
  - appel
concepts:
  - Mot-clé function
  - Déclaration de fonction
  - Appel de fonction

starterCode: |
  // Crée une fonction "direBonjour" qui affiche "Bonjour !"


  // Appelle la fonction

solution:
  code: |
    // Crée une fonction "direBonjour" qui affiche "Bonjour !"
    function direBonjour() {
      console.log("Bonjour !")
    }

    // Appelle la fonction
    direBonjour()
  explanation: "Une fonction se déclare avec le mot-clé 'function', suivi du nom, des parenthèses () et des accolades {}. On l'appelle ensuite avec son nom suivi de ()."

validations:
  - description: "Déclarer la fonction"
    type: code_matches
    expected: "function\\s+direBonjour\\s*\\(\\)"
    errorMessage: "Déclare la fonction avec : function direBonjour() { ... }"
    successMessage: "Fonction déclarée !"
  - description: "Appeler la fonction"
    type: code_matches
    expected: "direBonjour\\s*\\(\\)"
    errorMessage: "Appelle la fonction avec : direBonjour()"
    successMessage: "Fonction appelée !"
  - description: "Afficher Bonjour"
    type: output_contains
    expected: "Bonjour !"
    errorMessage: "La fonction doit afficher 'Bonjour !'"
    successMessage: "Bravo !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Déclarer une fonction"
    content: "Utilise le mot-clé function, un nom, des parenthèses et des accolades :"
    example: "function maFonction() {\n  // code ici\n}"
  - title: "Appeler une fonction"
    content: "Écris le nom de la fonction suivi de parenthèses :"
    example: "maFonction()"
  - title: "Solution"
    content: "Déclare puis appelle la fonction :"
    example: "function direBonjour() {\n  console.log(\"Bonjour !\")\n}\n\ndireBonjour()"
    learnMore: "https://devjs.ch/js/fonctions.html"
---

# Première fonction

## 🎯 Objectif

Créer et appeler une **fonction simple** en JavaScript.

## 📖 Contexte

### Pourquoi les fonctions ?

Les fonctions permettent de :
- **Réutiliser** du code sans le copier-coller
- **Organiser** ton programme en blocs logiques
- **Nommer** des actions (plus lisible)

```javascript
// Sans fonction : code répété 3 fois 😩
console.log("Bienvenue !")
console.log("Bienvenue !")
console.log("Bienvenue !")

// Avec fonction : écrit une fois, utilisé partout 😎
function bienvenue() {
  console.log("Bienvenue !")
}
bienvenue()
bienvenue()
bienvenue()
```

### Comment créer une fonction

```javascript
// 1. Déclarer la fonction
function saluer() {
  console.log("Salut !")
}

// 2. Appeler la fonction
saluer()  // Affiche : "Salut !"
saluer()  // On peut l'appeler plusieurs fois !
```

### Structure

```javascript
function nomDeLaFonction() {
  // Code à exécuter
}
```

- **function** : mot-clé obligatoire
- **nom** : en camelCase (ex: `direBonjour`)
- **()** : parenthèses (pour les paramètres)
- **{}** : accolades (contiennent le code)

## 📝 Consigne

1. **Crée** une fonction `direBonjour` qui affiche `"Bonjour !"`
2. **Appelle** cette fonction

**Résultat attendu :**
```
Bonjour !
```
