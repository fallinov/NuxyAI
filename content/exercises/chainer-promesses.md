---
title: "Chaîner les Promises"
description: "Apprends à enchaîner des opérations asynchrones avec .then()"
difficulty: beginner
module: 9
exerciseNumber: "9.2"
duration: 8
tags:
  - Promises
  - asynchrone
  - then
  - chainage
concepts:
  - Chaînage de .then()
  - Propagation des valeurs
  - .catch() global

starterCode: |
  // 🍳 Analogie : préparer un repas en 3 étapes
  // Chaque étape prend du temps (asynchrone)

  function acheterIngredients(plat) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        console.log("1. Ingrédients achetés pour :", plat)
        resolve(plat + " (ingrédients prêts)")
      }, 100)
    })
  }

  function cuisiner(ingredients) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        console.log("2. Plat cuisiné :", ingredients)
        resolve("Plat terminé !")
      }, 100)
    })
  }

  function servir(plat) {
    return new Promise(function(resolve) {
      setTimeout(function() {
        console.log("3. Servi :", plat)
        resolve("Bon appétit !")
      }, 100)
    })
  }

  // Chaîne les 3 étapes avec .then()
  // await attend que toute la chaîne soit terminée
  // La première étape est faite, complète la suite
  await acheterIngredients("Pasta")
    .then(function(ingredients) {
      return cuisiner(ingredients)
    })
    // Ajoute .then() pour appeler servir()

    // Ajoute .then() pour afficher le message final

    // Ajoute .catch() pour gérer les erreurs

solution:
  code: |
    function acheterIngredients(plat) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          console.log("1. Ingrédients achetés pour :", plat)
          resolve(plat + " (ingrédients prêts)")
        }, 100)
      })
    }

    function cuisiner(ingredients) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          console.log("2. Plat cuisiné :", ingredients)
          resolve("Plat terminé !")
        }, 100)
      })
    }

    function servir(plat) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          console.log("3. Servi :", plat)
          resolve("Bon appétit !")
        }, 100)
      })
    }

    await acheterIngredients("Pasta")
      .then(function(ingredients) {
        return cuisiner(ingredients)
      })
      .then(function(plat) {
        return servir(plat)
      })
      .then(function(message) {
        console.log(message)
      })
      .catch(function(erreur) {
        console.log("Erreur:", erreur.message)
      })
  explanation: "Chaque .then() reçoit la valeur retournée par le précédent. Il faut retourner (return) la Promise pour que la chaîne continue. Un seul .catch() à la fin suffit pour capturer toutes les erreurs."

validations:
  - description: "Appeler servir dans un .then()"
    type: code_matches
    expected: "\\.then\\s*\\(\\s*function\\s*\\([^)]*\\)\\s*\\{[^}]*return\\s+servir\\s*\\("
    errorMessage: "Ajoute .then(function(plat) { return servir(plat) })"
    successMessage: "Bien ! Le plat est servi"
  - description: "Afficher le message final avec .then()"
    type: code_matches
    expected: "\\.then\\s*\\(\\s*function\\s*\\([^)]*\\)\\s*\\{[^}]*console\\.log"
    errorMessage: "Ajoute un dernier .then() pour afficher le message avec console.log"
    successMessage: "Top ! Tu affiches le résultat"
  - description: "Les 3 étapes s'affichent dans l'ordre"
    type: output_contains
    expected: "Ingrédients achetés"
    errorMessage: "L'étape 1 doit s'afficher"
    successMessage: "Étape 1 OK !"
  - description: "Le message final s'affiche"
    type: output_contains
    expected: "Bon appétit"
    errorMessage: "Le message 'Bon appétit !' doit s'afficher"
    successMessage: "Bravo ! Tu maîtrises le chaînage"
  - description: "Gestion d'erreur avec .catch()"
    type: code_contains
    expected: ".catch("
    errorMessage: "N'oublie pas .catch() à la fin de la chaîne"
    successMessage: "Parfait ! Erreurs gérées"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Chaîner les .then()"
    content: "Chaque .then() reçoit la valeur du précédent :"
    example: "promesse\n  .then(function(a) { return traiter(a) })\n  .then(function(b) { return finaliser(b) })"
  - title: "Retourner la Promise"
    content: "Le return est essentiel pour que la chaîne continue :"
    example: "// ✅ Avec return\n.then(function(x) { return servir(x) })\n\n// ❌ Sans return\n.then(function(x) { servir(x) })"
  - title: "Un seul .catch()"
    content: "Un .catch() à la fin attrape les erreurs de toute la chaîne :"
    example: "acheter()\n  .then(cuisiner)\n  .then(servir)\n  .catch(function(err) {\n    console.log(\"Erreur !\", err)\n  })"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/then"
---

# Chaîner les Promises

## 🎯 Objectif

Apprends à **enchaîner** plusieurs opérations asynchrones avec `.then()`.

## 📖 Contexte

### Pourquoi chaîner ?

Souvent, les opérations asynchrones se font **en séquence** : la suivante dépend du résultat de la précédente.

Par exemple, pour charger et afficher un profil utilisateur :
1. **Récupérer** les données (requête réseau)
2. **Transformer** les données (formatage)
3. **Afficher** le résultat

![Chaînage de Promises](/images/exercises/promesse-chaine-mockup.svg)

### Comment ça marche ?

Chaque `.then()` retourne une **nouvelle Promise**, ce qui permet de les enchaîner :

```javascript
etape1()
  .then(function(resultat1) {
    return etape2(resultat1)
  })
  .then(function(resultat2) {
    return etape3(resultat2)
  })
  .then(function(resultat3) {
    console.log("Fini :", resultat3)
  })
```

### La règle d'or : toujours `return`

Si tu oublies le `return`, la chaîne se casse :

```javascript
// ❌ Sans return : le .then() suivant reçoit undefined
.then(function(x) {
  etape2(x)  // Oubli du return !
})

// ✅ Avec return : la valeur est transmise
.then(function(x) {
  return etape2(x)
})
```

### Un seul `.catch()` suffit

Le `.catch()` à la fin de la chaîne attrape **toutes** les erreurs, peu importe l'étape :

```javascript
etape1()
  .then(etape2)
  .then(etape3)
  .catch(function(erreur) {
    // Attrape les erreurs de n'importe quelle étape
    console.log("Oups:", erreur.message)
  })
```

## 📝 Consigne

Les 3 fonctions (`acheterIngredients`, `cuisiner`, `servir`) sont déjà prêtes. Le premier `.then()` est fait.

1. Ajoute un `.then()` qui appelle `servir()` avec le résultat
2. Ajoute un `.then()` qui affiche le message final avec `console.log`
3. Ajoute `.catch()` à la fin pour gérer les erreurs

**Résultat attendu :**
```
1. Ingrédients achetés pour : Pasta
2. Plat cuisiné : Pasta (ingrédients prêts)
3. Servi : Plat terminé !
Bon appétit !
```
