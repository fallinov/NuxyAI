---
title: "Opérations Mathématiques"
description: "Maîtrise les opérations de base : addition, soustraction, multiplication, division et modulo"
difficulty: beginner
module: 1
exerciseNumber: "1.5"
duration: 10
tags:
  - mathématiques
  - opérateurs
  - calculs
  - modulo
  - débutant
concepts:
  - Addition (+)
  - Soustraction (-)
  - Multiplication (*)
  - Division (/)
  - Modulo (%)
  - Ordre des opérations

starterCode: |
  // Variables du panier
  let prixUnitaire = 15.50
  let quantite = 3
  let reduction = 5

  // Calcule le total ici


  // Affiche le résultat

solution:
  code: |
    let prixUnitaire = 15.50
    let quantite = 3
    let reduction = 5

    let total = (prixUnitaire * quantite) - reduction

    console.log(total)
  explanation: "On calcule le prix total d'un panier : (prix × quantité) - réduction. Le résultat est 41.5 CHF."

validations:
  - description: "Déclarer une variable total"
    type: code_matches
    expected: "let\\s+total\\s*="
    errorMessage: "Déclare une variable total pour stocker le résultat"
    successMessage: "Variable total déclarée !"
  - description: "Utiliser la multiplication"
    type: code_contains
    expected: "*"
    errorMessage: "Utilise la multiplication (*) pour calculer le sous-total"
    successMessage: "Multiplication utilisée !"
  - description: "Utiliser la soustraction"
    type: code_contains
    expected: "-"
    errorMessage: "Utilise la soustraction (-) pour appliquer la réduction"
    successMessage: "Soustraction utilisée !"
  - description: "Afficher total avec console.log()"
    type: code_matches
    expected: "console\\.log\\s*\\(\\s*total\\s*\\)"
    errorMessage: "Utilise console.log(total) pour afficher le résultat"
    successMessage: "Tu affiches bien le total !"
  - description: "Afficher 41.5 dans la console"
    type: output_contains
    expected: "41.5"
    errorMessage: "Le résultat doit être 41.5"
    successMessage: "Parfait ! Le calcul est correct : 41.5"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "Les opérateurs mathématiques"
    content: "JavaScript peut faire des calculs : + (addition), - (soustraction), * (multiplication), / (division). Attention à l'ordre des opérations !"
    example: "const resultat = 10 + 5    // Addition: 15\nconst produit = 4 * 3     // Multiplication: 12\nconst difference = 20 - 8  // Soustraction: 12"
    learnMore: "https://devjs.ch/js/operateurs.html"
  - title: "L'ordre des opérations compte"
    content: "Comme en mathématiques, la multiplication et la division sont calculées avant l'addition et la soustraction. Utilise des parenthèses pour forcer un ordre."
    example: "5 + 3 * 2      // = 11 (multiplication d'abord)\n(5 + 3) * 2    // = 16 (parenthèses d'abord)"
  - title: "Solution du panier"
    content: "Pour calculer le total du panier : multiplie d'abord le prix par la quantité (avec des parenthèses), puis soustrais la réduction."
    example: "const prixUnitaire = 15.5\nconst quantite = 3\nconst reduction = 5\n\nconst total = (prixUnitaire * quantite) - reduction\nconsole.log(\"Total:\", total) // 41.5"
    learnMore: "https://devjs.ch/js/operateurs.html"
---

# Opérations Mathématiques

## 🎯 Objectif

Apprends à effectuer des calculs en JavaScript avec les **cinq opérateurs mathématiques** de base : addition, soustraction, multiplication, division et **modulo**.

## 📖 Contexte

JavaScript peut faire des calculs comme une calculatrice. Tu peux utiliser les opérateurs mathématiques sur des nombres ou des variables contenant des nombres.

### Les opérateurs mathématiques

| Opérateur | Opération | Exemple | Résultat |
|-----------|-----------|---------|----------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Soustraction | `10 - 4` | `6` |
| `*` | Multiplication | `6 * 7` | `42` |
| `/` | Division | `20 / 4` | `5` |
| `%` | **Modulo** (reste) | `17 % 5` | `2` |

### Le modulo `%` : le reste de la division

L'opérateur **modulo** (`%`) retourne le **reste** de la division entière :

```javascript
console.log(17 % 5)   // 2 (car 17 = 5×3 + 2)
console.log(10 % 2)   // 0 (car 10 = 2×5 + 0) → nombre pair !
console.log(10 % 3)   // 1 (car 10 = 3×3 + 1)
```

::alert{type="info"}
**Astuce** : Le modulo est très utile pour :
- Vérifier si un nombre est **pair** : `nombre % 2 === 0`
- Vérifier si un nombre est **impair** : `nombre % 2 === 1`
- Créer des cycles (ex: alterner des couleurs)
::

### Ordre des opérations

Comme en mathématiques, la multiplication et la division sont effectuées **avant** l'addition et la soustraction :

```javascript
let resultat = 2 + 3 * 4  // Résultat: 14 (et non 20)
```

Utilise des **parenthèses** pour forcer un ordre :

```javascript
let resultat = (2 + 3) * 4  // Résultat: 20
```

### Opérateurs d'affectation combinés

Pour modifier une variable, tu peux utiliser des raccourcis. **Attention** : chaque opération modifie la valeur précédente de la variable :

```javascript
let x = 10
x += 5   // x = 10 + 5 → x vaut maintenant 15
x -= 3   // x = 15 - 3 → x vaut maintenant 12
x *= 2   // x = 12 * 2 → x vaut maintenant 24
x /= 4   // x = 24 / 4 → x vaut maintenant 6
```

## 📝 Consigne

Les variables du panier sont déjà créées. Tu dois calculer le prix total :

1. Crée une variable `total` qui calcule : `(prixUnitaire * quantite) - reduction`
2. Affiche le résultat avec `console.log(total)`

**Résultat attendu :**

```
41.5
```

::alert{type="info"}
**Rappel** : L'ordre des opérations compte ! Les parenthèses permettent de forcer le calcul de la multiplication avant la soustraction.
::
