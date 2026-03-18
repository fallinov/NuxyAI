---
title: "Copier et fusionner des tableaux"
description: "Utilise la décomposition [...] pour copier et combiner des tableaux"
difficulty: beginner
module: 5
exerciseNumber: "5.9"
duration: 8
tags:
  - tableaux
  - spread
  - copie
  - fusion
concepts:
  - Opérateur spread [...]
  - Copie de tableau
  - Fusion de tableaux
  - Mutation vs copie

starterCode: |
  const fruits = ["pomme", "banane", "cerise"]

  // 1. Crée une copie du tableau fruits
  const copie = fruits

  // 2. Ajoute "mangue" à la copie
  copie.push("mangue")

  // Affiche les deux tableaux
  console.log("Fruits:", fruits)
  console.log("Copie:", copie)

  // 3. Fusionne ces deux tableaux en un seul
  const legumes = ["carotte", "tomate"]
  const aliments = fruits

  console.log("Aliments:", aliments)

solution:
  code: |
    const fruits = ["pomme", "banane", "cerise"]

    // 1. Crée une copie du tableau fruits
    const copie = [...fruits]

    // 2. Ajoute "mangue" à la copie
    copie.push("mangue")

    // Affiche les deux tableaux
    console.log("Fruits:", fruits)
    console.log("Copie:", copie)

    // 3. Fusionne ces deux tableaux en un seul
    const legumes = ["carotte", "tomate"]
    const aliments = [...fruits, ...legumes]

    console.log("Aliments:", aliments)
  explanation: "L'opérateur spread [...tableau] crée une vraie copie indépendante. Sans lui, copie = fruits pointe vers le même tableau en mémoire. Pour fusionner, [...a, ...b] déverse les éléments des deux tableaux dans un nouveau."

validations:
  - description: "Copier avec le spread operator"
    type: code_matches
    expected: "\\[\\.\\.\\.fruits\\]"
    errorMessage: "Essaie [...fruits] pour créer une vraie copie"
    successMessage: "Bien ! Tu sais copier un tableau"
  - description: "L'original n'est pas modifié"
    type: output_matches
    expected: "Fruits:(?!.*mangue).*pomme.*banane.*cerise"
    errorMessage: "Le tableau fruits ne doit pas contenir mangue"
    successMessage: "Parfait ! L'original est intact"
  - description: "La copie contient mangue"
    type: output_matches
    expected: "Copie:.*mangue"
    errorMessage: "La copie doit contenir mangue"
    successMessage: "Top ! La copie est indépendante"
  - description: "Fusionner deux tableaux"
    type: code_matches
    expected: "\\[\\.\\.\\.fruits.*\\.\\.\\.legumes\\]"
    errorMessage: "Essaie [...fruits, ...legumes] pour fusionner"
    successMessage: "Bravo ! Tu maîtrises la fusion de tableaux"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Le piège de la copie"
    content: "En JavaScript, const copie = tableau ne copie PAS le tableau. Les deux variables pointent vers le même tableau en mémoire."
    example: "const a = [1, 2, 3]\nconst b = a\nb.push(4)\nconsole.log(a) // [1, 2, 3, 4] 😱"
  - title: "Copier avec [...] (spread)"
    content: "L'opérateur spread ... déverse tous les éléments dans un nouveau tableau."
    example: "const a = [1, 2, 3]\nconst b = [...a]\nb.push(4)\nconsole.log(a) // [1, 2, 3] ✅"
  - title: "Fusionner avec [...] (spread)"
    content: "On peut combiner plusieurs tableaux dans un nouveau :"
    example: "const a = [1, 2]\nconst b = [3, 4]\nconst c = [...a, ...b]\n// [1, 2, 3, 4]"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Copier et fusionner des tableaux

## 🎯 Objectif

Utiliser l'opérateur **spread** `[...]` pour copier un tableau sans modifier l'original, et pour fusionner plusieurs tableaux.

## 📖 Contexte

### Le piège : copie par référence

En JavaScript, quand tu écris `const copie = tableau`, tu ne crées **pas** une copie. Les deux variables pointent vers **le même tableau** :

```javascript
const fruits = ["pomme", "banane"]
const copie = fruits     // ⚠️ Pas une vraie copie !

copie.push("cerise")
console.log(fruits)      // ["pomme", "banane", "cerise"] 😱
```

Modifier `copie` modifie aussi `fruits` !

### La solution : l'opérateur spread `[...]`

Les trois points `...` (spread) **déversent** tous les éléments d'un tableau dans un nouveau :

```javascript
const fruits = ["pomme", "banane"]
const copie = [...fruits]  // ✅ Vraie copie !

copie.push("cerise")
console.log(fruits)        // ["pomme", "banane"] ✅ Intact !
console.log(copie)         // ["pomme", "banane", "cerise"]
```

### Fusionner des tableaux

On peut combiner plusieurs tableaux en un seul :

```javascript
const a = [1, 2, 3]
const b = [4, 5, 6]
const tout = [...a, ...b]
// [1, 2, 3, 4, 5, 6]
```

On peut même ajouter des éléments en plus :

```javascript
const tout = [...a, 99, ...b]
// [1, 2, 3, 99, 4, 5, 6]
```

## 📝 Consigne

1. Crée une **vraie copie** de `fruits` avec le spread operator
2. Vérifie que l'original n'est **pas modifié** quand tu ajoutes "mangue" à la copie
3. **Fusionne** les tableaux `fruits` et `legumes` dans un nouveau tableau `aliments`

**Résultat attendu :**
```
Fruits: ["pomme", "banane", "cerise"]
Copie: ["pomme", "banane", "cerise", "mangue"]
Aliments: ["pomme", "banane", "cerise", "carotte", "tomate"]
```
