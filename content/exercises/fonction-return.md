---
title: "Fonction avec return"
description: "Crée une fonction qui retourne une valeur"
difficulty: beginner
module: 4
exerciseNumber: "4.3"
duration: 7
tags:
  - fonctions
  - return
  - valeur
concepts:
  - Mot-clé return
  - Valeur de retour
  - Utilisation du résultat

starterCode: |
  // Crée une fonction "doubler" qui retourne le double d'un nombre


  // Teste la fonction
  let resultat = doubler(5)
  console.log(resultat)

  console.log(doubler(12))

solution:
  code: |
    // Crée une fonction "doubler" qui retourne le double d'un nombre
    function doubler(nombre) {
      return nombre * 2
    }

    // Teste la fonction
    let resultat = doubler(5)
    console.log(resultat)

    console.log(doubler(12))
  explanation: "Le mot-clé 'return' renvoie une valeur. Cette valeur peut être stockée dans une variable ou utilisée directement."

validations:
  - description: "Utiliser return"
    type: code_contains
    expected: "return"
    errorMessage: "Utilise 'return' pour renvoyer le résultat"
    successMessage: "return utilisé !"
  - description: "Afficher 10"
    type: output_contains
    expected: "10"
    errorMessage: "doubler(5) doit retourner 10"
    successMessage: "5 x 2 = 10 !"
  - description: "Afficher 24"
    type: output_contains
    expected: "24"
    errorMessage: "doubler(12) doit retourner 24"
    successMessage: "Bravo !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Syntaxe return"
    content: "return renvoie une valeur et termine la fonction :"
    example: "function carre(n) {\n  return n * n\n}"
  - title: "Calculer le double"
    content: "Le double d'un nombre = nombre × 2"
    example: "return nombre * 2"
  - title: "Utiliser le retour"
    content: "La valeur retournée peut être stockée ou affichée :"
    example: "let x = doubler(5)  // x = 10\nconsole.log(doubler(3))  // 6"
    learnMore: "https://devjs.ch/js/fonctions.html"
---

# Fonction avec return

## 🎯 Objectif

Créer une fonction qui **retourne** une valeur utilisable.

## 📖 Contexte

Le mot-clé `return` permet de renvoyer un résultat :

```javascript
function additionner(a, b) {
  return a + b
}

let somme = additionner(3, 7)
console.log(somme)  // 10
```

### Différence console.log vs return

| `console.log()` | `return` |
|-----------------|----------|
| Affiche dans la console | Renvoie une valeur |
| Ne peut pas être réutilisé | Peut être stocké/utilisé |

```javascript
// Avec console.log (pas réutilisable)
function afficheDouble(n) {
  console.log(n * 2)
}
let x = afficheDouble(5)  // x = undefined

// Avec return (réutilisable)
function double(n) {
  return n * 2
}
let y = double(5)  // y = 10
```

### ⚠️ return stoppe la fonction

Tout ce qui est après `return` ne s'exécute pas :

```javascript
function test() {
  return "fini"
  console.log("Jamais affiché !")  // ❌ Code mort
}
```

## 📝 Consigne

Crée une fonction `doubler` qui :
- Prend un paramètre `nombre`
- **Retourne** le double de ce nombre

**Résultat attendu :**
```
10
24
```
