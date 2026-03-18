---
title: "Opérateurs logiques"
description: "Combine plusieurs conditions avec && (ET), || (OU) et ! (NON)"
difficulty: beginner
module: 2
exerciseNumber: "2.3"
duration: 10
tags:
  - conditions
  - logique
  - opérateurs
  - booléens
concepts:
  - Opérateur && (ET)
  - Opérateur || (OU)
  - Opérateur ! (NON)
  - Combinaison de conditions

starterCode: |
  // Informations utilisateur
  let age = 25
  let estMembre = true
  let aReduction = false

  // Vérifier si l'utilisateur peut accéder au contenu premium
  // Condition : avoir 18 ans ou plus ET être membre


  // Vérifier si l'utilisateur a un avantage
  // Condition : être membre OU avoir une réduction

solution:
  code: |
    // Informations utilisateur
    let age = 25
    let estMembre = true
    let aReduction = false

    // Vérifier si l'utilisateur peut accéder au contenu premium
    // Condition : avoir 18 ans ou plus ET être membre
    if (age >= 18 && estMembre) {
      console.log("Accès premium autorisé")
    } else {
      console.log("Accès premium refusé")
    }

    // Vérifier si l'utilisateur a un avantage
    // Condition : être membre OU avoir une réduction
    if (estMembre || aReduction) {
      console.log("Tu as un avantage")
    } else {
      console.log("Aucun avantage")
    }
  explanation: "L'opérateur && retourne true si les DEUX conditions sont vraies. L'opérateur || retourne true si AU MOINS UNE condition est vraie."

validations:
  - description: "Utiliser l'opérateur && (ET)"
    type: code_contains
    expected: "&&"
    errorMessage: "Utilise l'opérateur && pour combiner les conditions d'âge ET de membre"
    successMessage: "Bien ! Tu utilises l'opérateur ET"
  - description: "Utiliser l'opérateur || (OU)"
    type: code_contains
    expected: "||"
    errorMessage: "Utilise l'opérateur || pour vérifier membre OU réduction"
    successMessage: "Parfait ! Tu utilises l'opérateur OU"
  - description: "Afficher 'Accès premium autorisé'"
    type: output_contains
    expected: "Accès premium autorisé"
    errorMessage: "Avec age=25 et estMembre=true, l'accès premium devrait être autorisé"
    successMessage: "L'accès premium fonctionne !"
  - description: "Afficher 'Tu as un avantage'"
    type: output_contains
    expected: "Tu as un avantage"
    errorMessage: "Comme estMembre=true, l'utilisateur devrait avoir un avantage (même si aReduction=false)"
    successMessage: "Bravo ! Tu maîtrises les opérateurs logiques !"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "L'opérateur && (ET logique)"
    content: "L'opérateur && retourne true uniquement si TOUTES les conditions sont vraies. Si une seule est fausse, le résultat est faux."
    example: "true && true   // true\ntrue && false  // false\nfalse && true  // false"
    learnMore: "https://devjs.ch/js/conditions.html"
  - title: "L'opérateur || (OU logique)"
    content: "L'opérateur || retourne true si AU MOINS UNE des conditions est vraie. Il retourne faux uniquement si toutes sont fausses."
    example: "true || false  // true\nfalse || true  // true\nfalse || false // false"
  - title: "Syntaxe de combinaison"
    content: "Tu peux combiner plusieurs conditions dans un seul if :"
    example: "if (age >= 18 && estMembre) {\n  console.log(\"Accès premium autorisé\")\n} else {\n  console.log(\"Accès premium refusé\")\n}"
    learnMore: "https://devjs.ch/js/conditions.html"
---

# Opérateurs logiques

## 🎯 Objectif

Dans cet exercice, tu vas apprendre à :

- **Combiner plusieurs conditions** avec les opérateurs logiques
- Utiliser `&&` (ET) pour exiger que toutes les conditions soient vraies
- Utiliser `||` (OU) pour accepter qu'une seule condition soit vraie
- Comprendre la logique booléenne

## 📖 Contexte

Souvent, une seule condition ne suffit pas. Tu dois vérifier plusieurs critères en même temps. JavaScript propose trois opérateurs logiques :

### L'opérateur `&&` (ET logique)

Retourne `true` si **toutes** les conditions sont vraies :

```javascript
let age = 25
let permis = true

if (age >= 18 && permis) {
  console.log("Tu peux conduire")
}
// Les DEUX conditions doivent être vraies
```

| Condition 1 | Condition 2 | Résultat |
|-------------|-------------|----------|
| `true` | `true` | `true` |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

### L'opérateur `||` (OU logique)

Retourne `true` si **au moins une** condition est vraie :

```javascript
let weekend = true
let vacances = false

if (weekend || vacances) {
  console.log("Pas de travail aujourd'hui !")
}
// UNE SEULE condition suffit
```

| Condition 1 | Condition 2 | Résultat |
|-------------|-------------|----------|
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

### L'opérateur `!` (NON logique)

Inverse une valeur booléenne :

```javascript
let connecte = false

if (!connecte) {
  console.log("Connecte-toi d'abord")
}
// !false devient true
```

## 📝 Consigne

Tu gères l'accès à une plateforme avec différents niveaux d'avantages.

**Condition 1 - Accès premium :**
- L'utilisateur doit avoir **18 ans ou plus** ET **être membre**
- Si oui, affiche `"Accès premium autorisé"`
- Sinon, affiche `"Accès premium refusé"`

**Condition 2 - Avantages :**
- L'utilisateur a un avantage s'il est **membre** OU s'il a une **réduction**
- Si oui, affiche `"Tu as un avantage"`
- Sinon, affiche `"Aucun avantage"`

**Résultat attendu :**

```
Accès premium autorisé
Tu as un avantage
```

::alert{type="info"}
**Astuce** : Avec les valeurs actuelles (age=25, estMembre=true, aReduction=false), les deux messages positifs devraient s'afficher !
::
