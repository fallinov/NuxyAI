---
title: "Comprendre async/await"
description: "Découvre la syntaxe async/await pour le code asynchrone"
difficulty: beginner
module: 9
exerciseNumber: "9.3"
duration: 6
tags:
  - API
  - async
  - await
concepts:
  - Fonction async
  - Mot-clé await
  - Code asynchrone

starterCode: |
  // Simulation d'une fonction asynchrone (comme un appel API)
  function attendre(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms)
    })
  }

  // Fonction async qui simule le chargement de données
  async function chargerDonnees() {
    console.log("1. Début du chargement...")

    // Attend 100ms (simule un appel réseau)
    await attendre(100)

    console.log("2. Données reçues !")

    // Retourne les données
    return { nom: "Alice", age: 25 }
  }

  // Appel de la fonction async
  async function main() {
    // 1. Appelle chargerDonnees() avec await
    const utilisateur = await chargerDonnees()

    // 2. Affiche "3. Utilisateur : [nom]"
    console.log("3. Utilisateur :", utilisateur.nom)
  }

  // Exécution (await pour attendre la fin)
  await main()

solution:
  code: |
    // Simulation d'une fonction asynchrone (comme un appel API)
    function attendre(ms) {
      return new Promise(function(resolve) {
        setTimeout(resolve, ms)
      })
    }

    // Fonction async qui simule le chargement de données
    async function chargerDonnees() {
      console.log("1. Début du chargement...")

      // Attend 100ms (simule un appel réseau)
      await attendre(100)

      console.log("2. Données reçues !")

      // Retourne les données
      return { nom: "Alice", age: 25 }
    }

    // Appel de la fonction async
    async function main() {
      // 1. Appelle chargerDonnees() avec await
      const utilisateur = await chargerDonnees()

      // 2. Affiche "3. Utilisateur : [nom]"
      console.log("3. Utilisateur :", utilisateur.nom)
    }

    // Exécution (await pour attendre la fin)
    await main()
  explanation: "async déclare une fonction asynchrone. await attend qu'une opération asynchrone se termine avant de continuer. Le code reste lisible comme du code synchrone."

validations:
  - description: "Utiliser await"
    type: code_contains
    expected: "await chargerDonnees()"
    errorMessage: "Utilise await pour attendre le résultat"
    successMessage: "await OK !"
  - description: "Afficher le début"
    type: output_contains
    expected: "Début du chargement"
    errorMessage: "Le message de début doit s'afficher"
    successMessage: "Début OK !"
  - description: "Afficher données reçues"
    type: output_contains
    expected: "Données reçues"
    errorMessage: "Le message 'Données reçues' doit s'afficher"
    successMessage: "Réception OK !"
  - description: "Afficher Alice"
    type: output_contains
    expected: "Alice"
    errorMessage: "Le nom 'Alice' doit s'afficher"
    successMessage: "Bravo !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Fonction async"
    content: "Le mot-clé async permet d'utiliser await dans une fonction :"
    example: "async function maFonction() {\n  // await utilisable ici\n}"
  - title: "Mot-clé await"
    content: "await attend la fin d'une opération asynchrone :"
    example: "const resultat = await operationAsync()\n// Le code continue après la fin"
  - title: "Ordre d'exécution"
    content: "Avec await, le code s'exécute dans l'ordre :"
    example: "console.log(\"1\")\nawait attendre(100)\nconsole.log(\"2\")  // Après 100ms"
    learnMore: "https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous/Promises"
---

# Comprendre async/await

## 🎯 Objectif

Comprendre les mots-clés `async` et `await` pour le code asynchrone.

## 📖 Contexte

Les opérations réseau (API) prennent du temps. `async/await` permet d'attendre leur résultat de façon lisible :

```javascript
async function chargerUtilisateur() {
  console.log("Chargement...")

  const response = await fetch("/api/user")
  const user = await response.json()

  console.log("Terminé :", user.name)
}
```

### Les deux mots-clés

| Mot-clé | Rôle |
|---------|------|
| `async` | Déclare une fonction asynchrone |
| `await` | Attend la fin d'une opération |

### Qu'est-ce qu'une Promise ?

Une **Promise** (promesse) représente une opération qui n'est pas encore terminée mais qui le sera dans le futur.

```javascript
// Sans async/await (ancien style, plus complexe)
chargerDonnees().then(data => {
  console.log(data)
})

// Avec async/await (moderne, plus lisible)
const data = await chargerDonnees()
console.log(data)
```

::alert{type="success"}
**Bonne nouvelle** : `async/await` simplifie le chaînage de `.then()` que tu viens d'apprendre !
::

### Sans await vs Avec await

```javascript
// Sans await - résultat = Promise (pas les données)
const resultat = chargerDonnees()

// Avec await - résultat = données (ce qu'on veut)
const resultat = await chargerDonnees()
```

## 📝 Consigne

Le code est déjà complet. Observe l'ordre des messages :
1. "Début du chargement..."
2. "Données reçues !"
3. "Utilisateur : Alice"

**Résultat attendu :**
```
1. Début du chargement...
2. Données reçues !
3. Utilisateur : Alice
```
