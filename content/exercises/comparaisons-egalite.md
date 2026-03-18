---
title: "Comparaisons et égalité"
description: "Comprends la différence cruciale entre == et === avec un exemple concret"
difficulty: beginner
module: 2
exerciseNumber: "2.2"
duration: 8
tags:
  - conditions
  - comparaison
  - égalité
  - sécurité
concepts:
  - == (égalité avec conversion)
  - === (égalité stricte)
  - Types de données

starterCode: |
  // Code PIN stocké dans le système (nombre)
  let codePIN = 1234

  // Code saisi par l'utilisateur (texte du formulaire)
  let saisie = "1234"

  // Test avec == (comparaison avec conversion)
  if (codePIN == saisie) {
    console.log("Test == : Accès autorisé")
  } else {
    console.log("Test == : Accès refusé")
  }

  // Test avec === (comparaison stricte)
  // Écris la condition ici

solution:
  code: |
    // Code PIN stocké dans le système (nombre)
    let codePIN = 1234

    // Code saisi par l'utilisateur (texte du formulaire)
    let saisie = "1234"

    // Test avec == (comparaison avec conversion)
    if (codePIN == saisie) {
      console.log("Test == : Accès autorisé")
    } else {
      console.log("Test == : Accès refusé")
    }

    // Test avec === (comparaison stricte)
    if (codePIN === saisie) {
      console.log("Test === : Accès autorisé")
    } else {
      console.log("Test === : Accès refusé")
    }
  explanation: "Avec ==, '1234' est converti en nombre 1234, donc la comparaison réussit. Avec ===, les types sont comparés : number !== string, donc l'accès est refusé. C'est plus sécurisé !"

validations:
  - description: "Utiliser l'opérateur ==="
    type: code_contains
    expected: "==="
    errorMessage: "Ajoute une condition avec l'opérateur === (triple égal)"
    successMessage: "Bien ! Tu utilises ==="
  - description: "Structure if avec ==="
    type: code_matches
    expected: "if\\s*\\(.*===.*\\)"
    errorMessage: "Crée une condition if qui utilise === pour comparer codePIN et saisie"
    successMessage: "Bonne structure if !"
  - description: "Premier test affiché"
    type: output_contains
    expected: "Test == : Accès autorisé"
    errorMessage: "Le test avec == devrait afficher 'Accès autorisé' (conversion automatique)"
    successMessage: "Test == fonctionne !"
  - description: "Deuxième test affiché"
    type: output_contains
    expected: "Test === : Accès refusé"
    errorMessage: "Le test avec === devrait afficher 'Accès refusé' car les types sont différents"
    successMessage: "Bravo ! Tu comprends la différence entre == et === !"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "Pourquoi deux résultats différents ?"
    content: "L'opérateur == convertit les types avant de comparer : '1234' devient 1234, donc c'est égal. L'opérateur === compare les types ET les valeurs : number !== string."
    example: "1234 == '1234'   // true (conversion)\n1234 === '1234'  // false (types différents)"
    learnMore: "https://devjs.ch/js/operateurs.html"
  - title: "Quel opérateur utiliser ?"
    content: "Utilise TOUJOURS === ! Avec ==, un pirate pourrait exploiter la conversion de type. Avec ===, la comparaison est stricte et sécurisée."
    example: "// Dangereux :\nif (motDePasse == saisie)\n\n// Sécurisé :\nif (motDePasse === saisie)"
  - title: "La solution"
    content: "Ajoute un bloc if...else avec === après le commentaire :"
    example: "if (codePIN === saisie) {\n  console.log(\"Test === : Accès autorisé\")\n} else {\n  console.log(\"Test === : Accès refusé\")\n}"
    learnMore: "https://devjs.ch/js/operateurs.html"
---

# Comparaisons et égalité

## 🎯 Objectif

Dans cet exercice, tu vas découvrir :

- Pourquoi `==` et `===` donnent des résultats **différents**
- Le danger de `==` avec la **conversion automatique** de types
- La bonne pratique : **toujours utiliser `===`**

## 📖 Contexte

Imagine un système de vérification de code PIN. Le code est stocké comme un **nombre** dans la base de données, mais la saisie de l'utilisateur vient d'un formulaire web, donc c'est toujours une **chaîne de caractères**.

### L'opérateur `==` (double égal)

Compare les **valeurs** après conversion automatique :

```javascript
1234 == "1234"   // true ← JavaScript convertit "1234" en 1234
0 == false       // true ← false devient 0
"" == 0          // true ← "" devient 0
```

::alert{type="warning"}
**Danger** : Ces conversions peuvent créer des failles de sécurité !
::

### L'opérateur `===` (triple égal)

Compare les **valeurs ET les types** sans conversion :

```javascript
1234 === "1234"  // false ← number !== string
0 === false      // false ← number !== boolean
42 === 42        // true  ← même type, même valeur
```

## 📝 Consigne

Le code de départ simule une vérification de code PIN avec `==`.

1. **Exécute le code** et observe que l'accès est autorisé avec `==`
2. **Ajoute un test avec `===`** qui affiche :
   - `"Test === : Accès autorisé"` si les valeurs ET les types correspondent
   - `"Test === : Accès refusé"` sinon

**Résultat attendu :**

```
Test == : Accès autorisé
Test === : Accès refusé
```

::alert{type="info"}
**Question** : Pourquoi le même code PIN donne "autorisé" avec `==` mais "refusé" avec `===` ?
::
