---
title: "Arrow function"
description: "Découvre la syntaxe moderne des fonctions fléchées"
difficulty: beginner
module: 4
exerciseNumber: "4.4"
duration: 7
tags:
  - fonctions
  - arrow
  - ES6
concepts:
  - Syntaxe fléchée =>
  - Forme courte
  - Return implicite

starterCode: |
  // Transforme cette fonction en arrow function
  function carre(n) {
    return n * n
  }

  // Écris la version arrow function ici
  // Exemple : const maFonction = (x) => x + 1


  // Tests
  console.log(carre(4))
  console.log(carreArrow(4))

solution:
  code: |
    // Transforme cette fonction en arrow function
    function carre(n) {
      return n * n
    }

    // Écris la version arrow function ici
    const carreArrow = (n) => n * n

    // Tests
    console.log(carre(4))
    console.log(carreArrow(4))
  explanation: "La syntaxe arrow (=>) est plus concise. Avec une seule expression, le return est implicite."

validations:
  - description: "Utiliser la syntaxe arrow"
    type: code_contains
    expected: "=>"
    errorMessage: "Utilise la syntaxe fléchée =>"
    successMessage: "Arrow function !"
  - description: "Stocker dans carreArrow"
    type: code_matches
    expected: "const\\s+carreArrow\\s*="
    errorMessage: "Assigne à la constante carreArrow"
    successMessage: "Constante OK !"
  - description: "Deux fois 16"
    type: output_matches
    expected: "16[\\s\\S]*16"
    errorMessage: "Les deux fonctions doivent afficher 16"
    successMessage: "Bravo ! Les deux syntaxes fonctionnent !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Comment écrire =>"
    content: "La flèche => s'écrit avec deux caractères collés : le signe égal (=) suivi du signe supérieur (>)"
    example: "=  puis  >  donne  =>\n\nSur ton clavier : Shift+0 puis Shift+."
  - title: "Syntaxe arrow function"
    content: "Remplace 'function' par => après les paramètres :"
    example: "// Avant\nfunction add(a, b) { return a + b }\n\n// Après\nconst add = (a, b) => a + b"
  - title: "Return implicite"
    content: "Si le corps ne contient qu'une expression, le return est automatique :"
    example: "const double = (n) => n * 2\n// équivaut à\nconst double = (n) => { return n * 2 }"
  - title: "Solution"
    content: "La version arrow function de carre :"
    example: "const carreArrow = (n) => n * n"
    learnMore: "https://devjs.ch/js-avance/fonctions-flechees.html"
---

# Arrow function

## 🎯 Objectif

Utiliser la syntaxe moderne des **fonctions fléchées** (ES6).

## 📖 Contexte

Les arrow functions offrent une syntaxe plus concise :

```javascript
// Fonction classique
function addition(a, b) {
  return a + b
}

// Arrow function
const addition = (a, b) => a + b
```

### Règles de conversion

| Classique | Arrow |
|-----------|-------|
| `function` | supprimé |
| après `()` | ajouter `=>` |
| `{ return x }` | juste `x` |

### Exemples

```javascript
// Un paramètre
const double = (n) => n * 2

// Plusieurs paramètres
const somme = (a, b) => a + b

// Corps sur plusieurs lignes
const saluer = (nom) => {
  const message = "Bonjour " + nom
  return message
}
```

### Quand utiliser quelle syntaxe ?

| Situation | Syntaxe recommandée |
|-----------|---------------------|
| Fonction courte (1 ligne) | Arrow `=>` |
| Fonction longue | `function` classique |
| Callback (forEach, map, filter) | Arrow `=>` |

::alert{type="info"}
Les deux syntaxes fonctionnent ! Choisis celle qui te semble la plus lisible.
::

## 📝 Consigne

Transforme la fonction `carre` en **arrow function** et stocke-la dans `carreArrow`.

**Résultat attendu :**
```
16
16
```

Les deux syntaxes produisent le même résultat !
