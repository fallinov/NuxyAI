---
title: "Décomposer un objet"
description: "Utilise le destructuring d'objet et le spread {...} pour extraire et copier"
difficulty: beginner
module: 5
exerciseNumber: "5.11"
duration: 8
tags:
  - objets
  - destructuring
  - spread
  - ES6+
concepts:
  - Destructuring d'objet
  - Spread d'objet {...}
  - Fusion d'objets

starterCode: |
  const personnage = {
    nom: "Link",
    jeu: "Zelda",
    pv: 100
  }

  // 1. Extrais nom et jeu en UNE ligne de destructuring
  // Exemple : const { a, b } = monObjet
  // Écris ta ligne ici :


  console.log(nom, "-", jeu)

  // 2. Crée une copie indépendante avec le spread {...}
  // (attention : = ne copie pas, ça crée une référence)
  // Écris ta ligne ici (const copie = ...) :


  copie.pv = 50
  console.log("Original:", personnage.pv)
  console.log("Copie:", copie.pv)

  // 3. Fusionne personnage avec un objet bonus
  const bonus = { arme: "Épée", bouclier: true }
  // Écris ta ligne ici (const hero = ...) :


  console.log("Hero:", hero)

solution:
  code: |
    const personnage = {
      nom: "Link",
      jeu: "Zelda",
      pv: 100
    }

    // 1. Extrais nom et jeu avec le destructuring
    const { nom, jeu } = personnage

    console.log(nom, "-", jeu)

    // 2. Crée une copie indépendante avec le spread
    const copie = { ...personnage }

    copie.pv = 50
    console.log("Original:", personnage.pv)
    console.log("Copie:", copie.pv)

    // 3. Fusionne personnage avec un objet bonus
    const bonus = { arme: "Épée", bouclier: true }
    const hero = { ...personnage, ...bonus }

    console.log("Hero:", hero)
  explanation: "Le destructuring {nom, jeu} = objet extrait les propriétés en variables du même nom. Le spread {...objet} crée une copie indépendante. Pour fusionner, {...a, ...b} combine les propriétés des deux objets."

validations:
  - description: "Destructuring d'objet"
    type: code_matches
    expected: "const\\s*\\{\\s*nom\\s*,\\s*jeu\\s*\\}\\s*=\\s*personnage"
    errorMessage: "Essaie const { nom, jeu } = personnage"
    successMessage: "Bien ! Tu sais décomposer un objet"
  - description: "Copie avec spread"
    type: code_matches
    expected: "\\{\\s*\\.\\.\\.personnage\\s*\\}"
    errorMessage: "Essaie { ...personnage } pour créer une copie"
    successMessage: "Top ! Tu sais copier un objet"
  - description: "L'original reste intact"
    type: output_contains
    expected: "Original: 100"
    errorMessage: "Le personnage original doit garder 100 pv"
    successMessage: "Parfait ! L'original n'est pas modifié"
  - description: "Fusion d'objets"
    type: code_matches
    expected: "\\{\\s*\\.\\.\\.personnage\\s*,\\s*\\.\\.\\.bonus\\s*\\}"
    errorMessage: "Essaie { ...personnage, ...bonus } pour fusionner"
    successMessage: "Bravo ! Tu maîtrises la fusion d'objets"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Destructuring d'objet"
    content: "On extrait les propriétés par leur nom :"
    example: "const { nom, age } = { nom: \"Alice\", age: 25 }\nconsole.log(nom) // \"Alice\""
  - title: "Copie avec spread {...}"
    content: "Même principe que pour les tableaux, mais avec des accolades :"
    example: "const original = { a: 1, b: 2 }\nconst copie = { ...original }\ncopie.a = 99\nconsole.log(original.a) // 1 ✅"
  - title: "Fusionner des objets"
    content: "On combine les propriétés de plusieurs objets :"
    example: "const a = { x: 1 }\nconst b = { y: 2 }\nconst c = { ...a, ...b }\n// { x: 1, y: 2 }"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
---

# Décomposer un objet

## 🎯 Objectif

Utiliser le **destructuring d'objet** pour extraire des propriétés et le **spread** `{...}` pour copier et fusionner des objets.

## 📖 Contexte

### Destructuring d'objet

Au lieu d'accéder aux propriétés une par une, on les extrait directement :

```javascript
const user = { nom: "Alice", age: 25, ville: "Genève" }

// ❌ Classique (répétitif)
const nom = user.nom
const age = user.age

// ✅ Destructuring (une seule ligne)
const { nom, age } = user
```

![Destructuring d'objet](/images/exercises/destructuring-objet-mockup.svg)

Les noms des variables **doivent correspondre** aux noms des propriétés.

### Copier un objet avec `{...}`

Même piège que les tableaux : `=` ne copie pas, il crée une **référence** :

```javascript
const original = { a: 1, b: 2 }

const ref = original       // ⚠️ Même objet !
ref.a = 99
console.log(original.a)    // 99 😱

const copie = { ...original }  // ✅ Vraie copie
copie.a = 99
console.log(original.a)        // 1 ✅
```

### Fusionner des objets

On peut combiner les propriétés de plusieurs objets :

```javascript
const base = { nom: "Link", pv: 100 }
const equip = { arme: "Épée", bouclier: true }

const hero = { ...base, ...equip }
// { nom: "Link", pv: 100, arme: "Épée", bouclier: true }
```

Si une propriété existe dans les deux, **le dernier gagne** :

```javascript
const a = { x: 1 }
const b = { x: 2 }
const c = { ...a, ...b }  // { x: 2 }
```

## 📝 Consigne

1. Extrais `nom` et `jeu` de `personnage` avec le **destructuring**
2. Crée une **copie indépendante** avec le spread `{...}` (l'original doit garder 100 pv)
3. **Fusionne** `personnage` et `bonus` dans un nouvel objet `hero`

**Résultat attendu :**
```
Link - Zelda
Original: 100
Copie: 50
Hero: { nom: Link, jeu: Zelda, ... +3 keys }
```
