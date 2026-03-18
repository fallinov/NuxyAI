---
title: "Constantes avec const"
description: "Apprends à créer des constantes avec const et la convention MAJUSCULES"
difficulty: beginner
module: 1
exerciseNumber: "1.3"
duration: 6
tags:
  - constantes
  - const
  - MAJUSCULES
  - débutant
concepts:
  - Déclaration de constantes avec const
  - Convention MAJUSCULES pour les constantes
  - Affichage d'une constante avec console.log()

starterCode: |
  // 1. Déclare une constante TVA avec const (valeur : 7.7)

  // 2. Déclare une constante PAYS avec const (valeur : "Suisse")

  // 3. Affiche TVA avec console.log()

  // 4. Affiche PAYS avec console.log()

solution:
  code: |
    const TVA = 7.7
    const PAYS = "Suisse"

    console.log(TVA)
    console.log(PAYS)
  explanation: "On déclare deux constantes avec const en MAJUSCULES (TVA et PAYS), puis on affiche chaque constante avec console.log()."

validations:
  - description: "Déclarer une constante TVA avec const"
    type: code_matches
    expected: "const\\s+TVA\\s*=\\s*7\\.7"
    errorMessage: "Déclare TVA avec const et la valeur 7.7"
    successMessage: "Tu déclares bien TVA avec const !"
  - description: "Déclarer une constante PAYS avec const"
    type: code_matches
    expected: "const\\s+PAYS\\s*=\\s*[\"']Suisse[\"']"
    errorMessage: "Déclare PAYS avec const et la valeur \"Suisse\""
    successMessage: "Tu déclares bien PAYS avec const !"
  - description: "Afficher TVA avec console.log(TVA)"
    type: code_matches
    expected: "console\\.log\\s*\\(\\s*TVA\\s*\\)"
    errorMessage: "Utilise console.log(TVA) pour afficher la TVA"
    successMessage: "Tu affiches bien la TVA !"
  - description: "Afficher PAYS avec console.log(PAYS)"
    type: code_matches
    expected: "console\\.log\\s*\\(\\s*PAYS\\s*\\)"
    errorMessage: "Utilise console.log(PAYS) pour afficher le pays"
    successMessage: "Tu affiches bien le pays !"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "Déclarer une constante avec const"
    content: "Le mot-clé \"const\" permet de créer une constante. Contrairement à une variable (let), une constante ne peut pas être modifiée après sa création."
    example: "const TVA = 7.7\nconst PAYS = \"Suisse\""
    learnMore: "https://devjs.ch/js/variables-et-constantes.html"
  - title: "Convention MAJUSCULES"
    content: "Pour les constantes contenant des valeurs fixes (nombres, textes de configuration), on utilise les MAJUSCULES avec des underscores."
    example: "const TVA = 7.7\nconst AGE_MAX = 65\nconst URL_API = \"https://api.exemple.com\""
  - title: "Afficher une constante avec console.log()"
    content: "Pour afficher le contenu d'une constante, utilise console.log() avec le nom de la constante (sans guillemets)."
    example: "const TVA = 7.7\nconst PAYS = \"Suisse\"\n\nconsole.log(TVA)   // Affiche: 7.7\nconsole.log(PAYS)  // Affiche: Suisse"
    learnMore: "https://devjs.ch/js/variables-et-constantes.html"
---

# Constantes avec const

## 🎯 Objectif

Apprendre à créer des **constantes** en JavaScript avec le mot-clé `const` et découvrir la convention **MAJUSCULES**.

## 📖 Contexte

Une constante est une variable dont la valeur **ne peut pas être modifiée** après sa création.

### Créer une constante avec `const`

```javascript
const TVA = 7.7
const PAYS = "Suisse"
```

### `let` vs `const`

| Mot-clé | Usage | Modifiable ? |
|---------|-------|--------------|
| `let` | Valeur qui peut changer | ✅ Oui |
| `const` | Valeur fixe | ❌ Non |

```javascript
let temperature = 20
temperature = 25       // ✅ OK

const TVA = 7.7
TVA = 8.0              // ❌ ERREUR !
```

### Convention : MAJUSCULES

Pour les constantes contenant des **valeurs fixes**, on utilise les **MAJUSCULES** avec des underscores :

```javascript
// ✅ Constantes de configuration (MAJUSCULES)
const TVA = 7.7
const AGE_MAX = 65
const URL_API = "https://api.exemple.com"

// ✅ Constantes de référence (minuscules)
const utilisateur = { nom: "Alice" }
const couleurs = ["rouge", "vert", "bleu"]
```

::alert{type="info"}
**Règle** : MAJUSCULES pour les **valeurs simples** qui ne changent jamais (nombres, textes de config). Minuscules pour les **objets et tableaux**.
::

## 📝 Consigne

1. Crée une constante `TVA` avec la valeur `7.7`
2. Crée une constante `PAYS` avec la valeur `"Suisse"`
3. Affiche la TVA avec `console.log(TVA)`
4. Affiche le pays avec `console.log(PAYS)`

**Résultat attendu :**

```
7.7
Suisse
```

::alert{type="warning"}
**Rappel** : Les noms des constantes doivent être en MAJUSCULES !
::
