---
title: "Comprendre les Promises"
description: "Découvre les Promises, la base du code asynchrone en JavaScript"
difficulty: beginner
module: 9
exerciseNumber: "9.1"
duration: 8
tags:
  - Promises
  - asynchrone
  - then
  - catch
concepts:
  - new Promise()
  - resolve / reject
  - .then() / .catch()
  - Les 3 états d'une Promise

starterCode: |
  // ☕ Analogie : commander un café
  // Une Promise est comme passer une commande :
  // - Pending : en préparation...
  // - Fulfilled : "Voici ton café !" (resolve)
  // - Rejected : "Plus de café..." (reject)

  // 1. Cette Promise RÉUSSIT (resolve)
  const cafeOK = new Promise(function(resolve, reject) {
    resolve("Voici ton café !")
  })

  cafeOK.then(function(message) {
    console.log("Succès:", message)
  })

  // 2. Complète cette Promise qui ÉCHOUE (reject)
  const cafeKO = new Promise(function(resolve, reject) {
    // Appelle reject avec new Error("Plus de café...")

  })

  // 3. Ajoute .catch() pour capturer l'erreur
  cafeKO

  // 4. Crée ta propre Promise qui résout après un délai
  function attendre(ms) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve("Prêt après " + ms + "ms !")
      }, ms)
    })
  }

  // await attend que la Promise soit résolue
  await attendre(100).then(function(msg) {
    console.log(msg)
  })

solution:
  code: |
    // ☕ Analogie : commander un café
    const cafeOK = new Promise(function(resolve, reject) {
      resolve("Voici ton café !")
    })

    cafeOK.then(function(message) {
      console.log("Succès:", message)
    })

    // 2. Promise qui ÉCHOUE
    const cafeKO = new Promise(function(resolve, reject) {
      reject(new Error("Plus de café..."))
    })

    // 3. .catch() pour capturer l'erreur
    cafeKO.catch(function(erreur) {
      console.log("Erreur:", erreur.message)
    })

    // 4. Promise avec délai
    function attendre(ms) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve("Prêt après " + ms + "ms !")
        }, ms)
      })
    }

    // await attend que la Promise soit résolue
    await attendre(100).then(function(msg) {
      console.log(msg)
    })
  explanation: "Une Promise prend une fonction avec resolve (succès) et reject (échec). .then() récupère la valeur en cas de succès, .catch() gère l'erreur. C'est la base de tout le code asynchrone en JavaScript."

validations:
  - description: "Appeler reject avec une erreur"
    type: code_matches
    expected: "reject\\s*\\(\\s*new\\s+Error\\s*\\("
    errorMessage: "Appelle reject(new Error(\"Plus de café...\")) dans la Promise cafeKO"
    successMessage: "Bien ! Tu sais rejeter une Promise"
  - description: "Utiliser .catch()"
    type: code_contains
    expected: ".catch("
    errorMessage: "Ajoute .catch() sur cafeKO pour capturer l'erreur"
    successMessage: "Top ! Tu gères les erreurs avec .catch()"
  - description: "Afficher le message de succès"
    type: output_contains
    expected: "Voici ton café"
    errorMessage: "Le message de succès doit s'afficher"
    successMessage: "Café servi !"
  - description: "Afficher l'erreur"
    type: output_contains
    expected: "Plus de café"
    errorMessage: "Le message d'erreur doit s'afficher via .catch()"
    successMessage: "Parfait ! Tu gères succès ET erreurs"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Rejeter une Promise"
    content: "Pour signaler un échec, on appelle reject() :"
    example: "const p = new Promise(function(resolve, reject) {\n  reject(new Error(\"Oups !\"))\n})"
  - title: "Capturer avec .catch()"
    content: ".catch() est appelé quand la Promise échoue :"
    example: "maPromesse.catch(function(erreur) {\n  console.log(erreur.message)\n})"
  - title: "Les 3 états"
    content: "Pending (en cours) → Fulfilled (réussie, via resolve) ou Rejected (échouée, via reject). Une fois résolue, la Promise ne change plus."
    learnMore: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise"
---

# Comprendre les Promises

## 🎯 Objectif

Comprendre les **Promises** (promesses), la base du code asynchrone en JavaScript.

## 📖 Contexte

### C'est quoi une Promise ?

Une **Promise** est un objet qui représente le résultat d'une opération **qui n'est pas encore terminée**.

Imagine que tu commandes un café :
- **Pending** (en attente) : le barista prépare ton café
- **Fulfilled** (tenue) : "Voici ton café !" → succès
- **Rejected** (rompue) : "Plus de café..." → échec

![Cycle de vie d'une Promise](/images/exercises/promesse-lifecycle-mockup.svg)

### Créer une Promise

```javascript
const maPromesse = new Promise(function(resolve, reject) {
  // resolve = succès, reject = échec
  resolve("Tout s'est bien passé !")
})
```

### Récupérer le résultat

```javascript
// En cas de succès → .then()
maPromesse.then(function(valeur) {
  console.log(valeur)  // "Tout s'est bien passé !"
})

// En cas d'échec → .catch()
maPromesse.catch(function(erreur) {
  console.log(erreur.message)
})
```

### Les 3 états d'une Promise

| État | Signification | Méthode |
|------|---------------|---------|
| **Pending** | En cours... | *(aucune)* |
| **Fulfilled** | Succès ✅ | `.then()` |
| **Rejected** | Échec ❌ | `.catch()` |

::alert{type="info"}
Une Promise ne peut changer d'état **qu'une seule fois** : de pending vers fulfilled OU rejected. Jamais les deux.
::

## 📝 Consigne

1. Observe la Promise `cafeOK` qui réussit avec `resolve`
2. Complète la Promise `cafeKO` en appelant `reject(new Error("Plus de café..."))`
3. Ajoute `.catch()` sur `cafeKO` pour afficher le message d'erreur
4. Observe la fonction `attendre()` qui crée une Promise avec un délai

**Résultat attendu :**
```
Succès: Voici ton café !
Erreur: Plus de café...
Prêt après 100ms !
```
