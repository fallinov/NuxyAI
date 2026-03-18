---
title: "Parcourir avec for...of"
description: "Utilise for...of pour parcourir les caractères d'un texte"
difficulty: beginner
module: 3
exerciseNumber: "3.3"
duration: 8
tags:
  - boucle
  - for...of
  - string
concepts:
  - for...of
  - Parcourir un texte caractère par caractère
  - Compteur avec condition

starterCode: |
  const mot = "JavaScript"

  // 1. Affiche chaque lettre du mot
  // Remplace "?" par la variable à parcourir
  for (const lettre of "?") {
    console.log(lettre)
  }

  // 2. Compte les voyelles dans le mot
  const voyelles = "aeiouyAEIOUY"
  let compteur = 0

  for (const lettre of mot) {
    // Remplace "?" par la variable à tester
    if (voyelles.includes("?")) {
      compteur++
    }
  }

  console.log("Voyelles dans " + mot + " :", compteur)

solution:
  code: |
    const mot = "JavaScript"

    // 1. Affiche chaque lettre du mot
    for (const lettre of mot) {
      console.log(lettre)
    }

    // 2. Compte les voyelles dans le mot
    const voyelles = "aeiouyAEIOUY"
    let compteur = 0

    for (const lettre of mot) {
      if (voyelles.includes(lettre)) {
        compteur++
      }
    }

    console.log("Voyelles dans " + mot + " :", compteur)
  explanation: "for...of parcourt chaque caractère d'un texte un par un. Combiné avec includes(), on peut compter des caractères spécifiques comme les voyelles."

validations:
  - description: "for...of sur mot"
    type: code_matches
    expected: "for\\s*\\(\\s*(const|let)\\s+\\w+\\s+of\\s+mot\\s*\\)"
    errorMessage: "Essaie for (const lettre of mot)"
    successMessage: "Bien ! Tu parcours le texte"
  - description: "Utiliser includes"
    type: code_matches
    expected: "voyelles\\.includes\\s*\\(\\s*\\w+\\s*\\)"
    errorMessage: "Essaie voyelles.includes(lettre) pour vérifier si c'est une voyelle"
    successMessage: "Super ! Tu vérifies les voyelles"
  - description: "Affiche les lettres"
    type: output_contains
    expected: "J"
    errorMessage: "Les lettres du mot doivent s'afficher une par une"
    successMessage: "Les lettres s'affichent !"
  - description: "Compte les voyelles"
    type: output_contains
    expected: "Voyelles dans JavaScript : 3"
    errorMessage: "JavaScript contient 3 voyelles (a, a, i)"
    successMessage: "Bravo ! Tu sais parcourir un texte"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "for...of sur un texte"
    content: "for...of donne chaque caractère un par un :"
    example: "const nom = \"Alice\"\nfor (const c of nom) {\n  console.log(c)\n}\n// A\n// l\n// i\n// c\n// e"
  - title: "Vérifier si un caractère est dans un texte"
    content: "La méthode includes() vérifie si un texte contient un caractère :"
    example: "const voyelles = \"aeiouy\"\nvoyelles.includes(\"a\")  // true\nvoyelles.includes(\"b\")  // false"
  - title: "Compter avec un compteur"
    content: "Combine for...of et if pour compter des éléments spécifiques :"
    example: "let compteur = 0\nfor (const c of \"Hello\") {\n  if (c === \"l\") {\n    compteur++\n  }\n}\nconsole.log(compteur)  // 2"
    learnMore: "https://devjs.ch/js/boucles.html"
---

# Parcourir avec for...of

## 🎯 Objectif

Utiliser **for...of** pour parcourir les caractères d'un texte un par un.

## 📖 Contexte

### La boucle for...of

`for...of` parcourt chaque **caractère** d'un texte :

```javascript
const prenom = "Alice"

for (const lettre of prenom) {
  console.log(lettre)
}
// A
// l
// i
// c
// e
```

### Comparaison : for classique vs for...of

```javascript
const mot = "Salut"

// for classique (avec index i)
for (let i = 0; i < mot.length; i++) {
  console.log(mot[i])
}

// for...of (plus simple, sans index)
for (const c of mot) {
  console.log(c)
}
```

::alert{type="info"}
**Quand utiliser for...of ?** Quand tu veux parcourir un texte (ou plus tard un tableau) et que tu n'as **pas besoin de l'index**. C'est plus lisible et moins sujet aux erreurs.
::

### Compter des caractères

On peut combiner for...of avec une condition pour compter :

```javascript
const phrase = "Bonjour le monde"
let espaces = 0

for (const c of phrase) {
  if (c === " ") {
    espaces++
  }
}

console.log("Espaces:", espaces)  // Espaces: 2
```

### Récapitulatif

| Boucle | Quand l'utiliser |
|--------|-----------------|
| `while` | Nombre de tours inconnu |
| `for` | Nombre de tours connu, besoin de l'index |
| `for...of` | Parcourir un texte (ou tableau) sans index |

## 📝 Consigne

1. Complète le `for...of` pour parcourir les lettres de `mot` : remplace `___` par `mot`
2. Compte les voyelles : remplace `___` par `lettre` dans `voyelles.includes(___)`

**Résultat attendu :**
```
J
a
v
a
S
c
r
i
p
t
Voyelles dans JavaScript : 3
```
