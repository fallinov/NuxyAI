---
title: "La boucle for"
description: "Utilise for pour répéter un nombre précis de fois"
difficulty: beginner
module: 3
exerciseNumber: "3.2"
duration: 8
tags:
  - boucle
  - for
  - compteur
concepts:
  - for (init; condition; incrémentation)
  - Parcourir une séquence de nombres

starterCode: |
  // 1. Affiche les nombres de 1 à 5
  // Complète la condition et l'incrémentation :
  // for (let i = 1; ???; ???) {
  //   console.log(i)
  // }

  // 2. Affiche la table de multiplication de 7
  console.log("=== Table de 7 ===")
  for (let i = 1; i <= 10; i++) {
    console.log("7 x " + i + " = " + 0)  // Remplace 0 par le bon calcul
  }

solution:
  code: |
    // 1. Affiche les nombres de 1 à 5
    for (let i = 1; i <= 5; i++) {
      console.log(i)
    }

    // 2. Affiche la table de multiplication de 7
    console.log("=== Table de 7 ===")
    for (let i = 1; i <= 10; i++) {
      console.log("7 x " + i + " = " + 7 * i)
    }
  explanation: "for combine initialisation, condition et incrémentation en une seule ligne. C'est idéal quand on connaît le nombre de répétitions à l'avance."

validations:
  - description: "Boucle for de 1 à 5"
    type: code_matches
    expected: "for\\s*\\(\\s*let\\s+i\\s*=\\s*1\\s*;\\s*i\\s*(<=\\s*5|<\\s*6)\\s*;\\s*(i\\+\\+|\\+\\+i|i\\s*\\+=\\s*1)"
    errorMessage: "Essaie for (let i = 1; i <= 5; i++)"
    successMessage: "Bien ! Ta boucle for fonctionne"
  - description: "Calcul de la multiplication"
    type: code_matches
    expected: "7\\s*\\*\\s*i|i\\s*\\*\\s*7"
    errorMessage: "Calcule 7 * i pour chaque ligne de la table"
    successMessage: "Super ! Tu calcules 7 × i"
  - description: "Affiche les nombres"
    type: output_contains
    expected: "4"
    errorMessage: "Les nombres de 1 à 5 doivent s'afficher"
    successMessage: "Les nombres s'affichent !"
  - description: "Affiche la table de 7"
    type: output_contains
    expected: "7 x 3 = 21"
    errorMessage: "La table de 7 doit afficher '7 x 3 = 21'"
    successMessage: "Bravo ! Tu maîtrises la boucle for"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Structure de for"
    content: "for a 3 parties séparées par des points-virgules :"
    example: "for (let i = 1; i <= 5; i++) {\n  // initialisation ; condition ; incrémentation\n}"
  - title: "Les 3 parties de for"
    content: "1. let i = 1 → point de départ\n2. i <= 5 → condition (tant que true)\n3. i++ → ce qui change à chaque tour"
    example: "for (let i = 1; i <= 5; i++) {\n  console.log(i)  // 1, 2, 3, 4, 5\n}"
  - title: "Calcul dans la boucle"
    content: "Tu peux utiliser le compteur i pour faire des calculs :"
    example: "for (let i = 1; i <= 10; i++) {\n  console.log(7 * i)  // 7, 14, 21...\n}"
    learnMore: "https://devjs.ch/js/boucles.html"
---

# La boucle for

## 🎯 Objectif

Utiliser **for** pour répéter un bloc de code un nombre précis de fois.

## 📖 Contexte

### La boucle for

`for` est plus compact que `while` quand on connaît le nombre de répétitions :

```javascript
for (let i = 1; i <= 3; i++) {
  console.log("Tour " + i)
}
// Tour 1
// Tour 2
// Tour 3
```

### Les 3 parties de for

```javascript
for (initialisation; condition; incrémentation) {
  // code répété
}
```

| Partie | Rôle | Exemple |
|--------|------|---------|
| **Initialisation** | Point de départ | `let i = 1` |
| **Condition** | Continuer tant que true | `i <= 5` |
| **Incrémentation** | Changement à chaque tour | `i++` |

### Comparaison while vs for

```javascript
// Avec while (3 lignes de setup)
let i = 1
while (i <= 5) {
  console.log(i)
  i++
}

// Avec for (tout en une ligne)
for (let i = 1; i <= 5; i++) {
  console.log(i)
}
```

::alert{type="info"}
**Quand utiliser quoi ?** Utilise `for` quand tu connais le nombre de répétitions. Utilise `while` quand tu ne sais pas combien de fois ça va boucler.
::

### Utiliser le compteur pour calculer

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i + " x 2 = " + i * 2)
}
// 1 x 2 = 2
// 2 x 2 = 4
// 3 x 2 = 6
// ...
```

## 📝 Consigne

1. Complète la **première boucle** : condition `i <= 5` et incrémentation `i++`
2. Complète le **calcul** de la table de 7 : remplace `___` par `7 * i`

**Résultat attendu :**
```
1
2
3
4
5
=== Table de 7 ===
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70
```
