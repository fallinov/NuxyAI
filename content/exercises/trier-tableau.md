---
title: "Trier un tableau"
description: "Utilise sort pour ordonner les éléments d'un tableau"
difficulty: intermediate
module: 5
exerciseNumber: "5.5"
duration: 8
tags:
  - tableaux
  - sort
  - tri
  - comparaison
concepts:
  - sort()
  - Fonction de comparaison
  - Tri alphabétique
  - Tri numérique

starterCode: |
  // Tableau de prénoms
  const prenoms = ["Diana", "Alice", "Charlie", "Bob"]

  // 1. Trie les prénoms par ordre alphabétique
  prenoms.sort()
  console.log("Prénoms triés:", prenoms)

  // Tableau de scores
  const scores = [100, 25, 8, 42, 3]

  // 2. Trie les scores du plus petit au plus grand
  // ⚠️ sort() seul ne fonctionne pas pour les nombres !
  // Utilise une fonction de comparaison : sort((a, b) => a - b)
  scores.sort()
  console.log("Scores triés:", scores)

solution:
  code: |
    // Tableau de prénoms
    const prenoms = ["Diana", "Alice", "Charlie", "Bob"]

    // 1. Trie les prénoms par ordre alphabétique
    prenoms.sort()
    console.log("Prénoms triés:", prenoms)

    // Tableau de scores
    const scores = [100, 25, 8, 42, 3]

    // 2. Trie les scores du plus petit au plus grand
    scores.sort((a, b) => a - b)
    console.log("Scores triés:", scores)
  explanation: "sort() trie par défaut comme du texte (alphabétique). Pour les nombres, il faut une fonction de comparaison : (a, b) => a - b pour croissant, (a, b) => b - a pour décroissant."

validations:
  - description: "Trier les prénoms"
    type: code_contains
    expected: "prenoms.sort()"
    errorMessage: "Utilise prenoms.sort() pour trier alphabétiquement"
    successMessage: "Bien ! Les prénoms sont triés"
  - description: "Fonction de comparaison pour les nombres"
    type: code_matches
    expected: "scores\\.sort\\s*\\(.*\\w+\\s*-\\s*\\w+"
    errorMessage: "Essaie scores.sort((a, b) => a - b) pour trier les nombres"
    successMessage: "Parfait ! Tu maîtrises le tri numérique"
  - description: "Prénoms bien ordonnés"
    type: output_matches
    expected: "Alice.*Bob.*Charlie.*Diana"
    errorMessage: "Les prénoms doivent être dans l'ordre : Alice, Bob, Charlie, Diana"
    successMessage: "L'ordre alphabétique est correct !"
  - description: "Scores bien ordonnés"
    type: output_matches
    expected: "3.*8.*25.*42.*100"
    errorMessage: "Les scores doivent être dans l'ordre : 3, 8, 25, 42, 100"
    successMessage: "Bravo ! Tu sais trier un tableau"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Tri alphabétique"
    content: "Pour les chaînes de caractères, sort() fonctionne directement."
    example: "[\"banane\", \"ananas\", \"cerise\"].sort()\n// [\"ananas\", \"banane\", \"cerise\"]"
  - title: "Problème avec les nombres"
    content: "sort() convertit les nombres en texte ! \"25\" vient avant \"3\" alphabétiquement."
    example: "[3, 25, 8].sort()\n// [25, 3, 8] ❌ Pas bon !"
  - title: "Solution pour les nombres"
    content: "Utilise une fonction de comparaison qui retourne un nombre négatif, zéro ou positif."
    example: "scores.sort((a, b) => a - b)  // Croissant\nscores.sort((a, b) => b - a)  // Décroissant"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Trier un tableau

## 🎯 Objectif

Utiliser **sort()** pour trier un tableau par ordre alphabétique ou numérique.

## 📖 Contexte

La méthode `sort()` permet de trier les éléments d'un tableau :

```javascript
const fruits = ["banane", "ananas", "cerise"]
fruits.sort()
// ["ananas", "banane", "cerise"]
```

### ⚠️ Attention : sort() modifie le tableau original !

```javascript
const nombres = [3, 1, 2]
nombres.sort()
console.log(nombres)  // [1, 2, 3] - Le tableau est modifié !
```

### Le piège avec les nombres

Par défaut, `sort()` trie comme du **texte**. Ça pose problème avec les nombres :

```javascript
const scores = [3, 25, 8, 100]
scores.sort()
// ["100", "25", "3", "8"] ❌ Trié comme du texte !
```

### La solution : fonction de comparaison

Pour trier des nombres correctement, on utilise une fonction de comparaison :

```javascript
const scores = [3, 25, 8, 100]

// Tri croissant (petit → grand)
scores.sort((a, b) => a - b)
// [3, 8, 25, 100] ✅

// Tri décroissant (grand → petit)
scores.sort((a, b) => b - a)
// [100, 25, 8, 3] ✅
```

### Comment ça marche ?

La fonction `(a, b) => a - b` compare deux éléments :
- Si le résultat est **négatif** : `a` vient avant `b`
- Si le résultat est **positif** : `b` vient avant `a`
- Si le résultat est **zéro** : l'ordre ne change pas

## 📝 Consigne

1. Trie le tableau `prenoms` par ordre alphabétique
2. Trie le tableau `scores` du plus petit au plus grand (utilise la fonction de comparaison !)

**Résultat attendu :**
```
Prénoms triés: ["Alice", "Bob", "Charlie", "Diana"]
Scores triés: [3, 8, 25, 42, 100]
```
