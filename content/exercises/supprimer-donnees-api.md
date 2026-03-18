---
title: "Supprimer des données (DELETE)"
description: "Utilise fetch avec DELETE pour supprimer une ressource de l'API"
difficulty: beginner
module: 9
exerciseNumber: "9.8"
duration: 7
tags:
  - API
  - fetch
  - DELETE
  - CRUD
concepts:
  - Méthode DELETE
  - Suppression de ressources
  - CRUD complet

starterCode: |
  // Fonction pour supprimer un produit
  async function supprimerProduit(id) {
    const response = await fetch("https://dummyjson.com/products/" + id, {
      method: "?"  // Remplace "?" par la bonne méthode HTTP
    })

    if ("?") {  // Remplace "?" par la vérification du succès
      const resultat = await response.json()
      console.log("Produit supprimé :", resultat.title)
      console.log("Supprimé le :", resultat.deletedOn)
    } else {
      console.log("Erreur lors de la suppression")
    }
  }

  // Supprime le produit 5
  await supprimerProduit(5)

solution:
  code: |
    // Fonction pour supprimer un produit
    async function supprimerProduit(id) {
      const response = await fetch("https://dummyjson.com/products/" + id, {
        method: "DELETE"
      })

      if (response.ok) {
        const resultat = await response.json()
        console.log("Produit supprimé :", resultat.title)
        console.log("Supprimé le :", resultat.deletedOn)
      } else {
        console.log("Erreur lors de la suppression")
      }
    }

    // Supprime le produit 5
    await supprimerProduit(5)
  explanation: "DELETE est la méthode la plus simple : pas de body ni de headers Content-Type. On cible la ressource par son ID dans l'URL et on vérifie response.ok pour confirmer la suppression."

validations:
  - description: "Utiliser la méthode DELETE"
    type: code_matches
    expected: "method\\s*:\\s*[\"']DELETE[\"']"
    errorMessage: "Remplace le premier ___ par \"DELETE\""
    successMessage: "Bien ! Tu utilises DELETE"
  - description: "Vérifier response.ok"
    type: code_contains
    expected: "response.ok"
    errorMessage: "Remplace le deuxième ___ par response.ok pour vérifier le succès"
    successMessage: "Super ! Tu vérifies la réponse"
  - description: "Produit supprimé"
    type: output_contains
    expected: "Produit supprimé"
    errorMessage: "Le message de suppression doit s'afficher"
    successMessage: "Suppression réussie !"
  - description: "Date de suppression"
    type: output_contains
    expected: "Supprimé le"
    errorMessage: "La date de suppression doit s'afficher"
    successMessage: "Bravo ! Tu maîtrises le CRUD complet"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Méthode DELETE"
    content: "DELETE ne nécessite pas de body (pas de données à envoyer) :"
    example: "await fetch(url, {\n  method: \"DELETE\"\n})"
  - title: "Vérifier le succès"
    content: "response.ok est true si le status est 200-299 :"
    example: "if (response.ok) {\n  console.log(\"Supprimé !\")\n} else {\n  console.log(\"Erreur\")\n}"
  - title: "Solution complète"
    content: "Remplace les deux ___ :"
    example: "method: \"DELETE\"\n// et\nif (response.ok) {"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/HTTP/Methods/DELETE"
---

# Supprimer des données (DELETE)

## 🎯 Objectif

Utiliser `fetch()` avec la méthode **DELETE** pour **supprimer une ressource** de l'API.

## 📖 Contexte

### DELETE : la méthode la plus simple

DELETE ne nécessite **ni headers, ni body**. Juste la méthode et l'URL :

```javascript
const response = await fetch("https://dummyjson.com/products/1", {
  method: "DELETE"
})

const resultat = await response.json()
console.log(resultat)
// → { ...données du produit, isDeleted: true, deletedOn: "2026-..." }
```

### Récapitulatif CRUD complet

| Opération | Méthode | Body ? | Exemple d'URL |
|-----------|---------|--------|---------------|
| **C**reate | POST | Oui | `/products/add` |
| **R**ead | GET | Non | `/products` ou `/products/1` |
| **U**pdate | PUT | Oui | `/products/1` |
| **D**elete | DELETE | Non | `/products/1` |

::alert{type="info"}
**Félicitations !** Avec cet exercice, tu maîtrises les 4 opérations CRUD. C'est la base de toute application web qui gère des données.
::

### Bonne pratique : toujours vérifier

```javascript
if (response.ok) {
  // ✅ Suppression réussie
  console.log("Supprimé !")
} else {
  // ❌ Erreur (produit inexistant, droits insuffisants...)
  console.log("Erreur :", response.status)
}
```

## 📝 Consigne

Complète la requête DELETE :
1. Remplace le premier `___` par `"DELETE"` (la méthode HTTP)
2. Remplace le deuxième `___` par `response.ok` (vérification du succès)

**Résultat attendu :**
```
Produit supprimé : Cat Food
Supprimé le : 2026-...
```

::alert{type="info"}
**DummyJSON simule la suppression** : l'API retourne `isDeleted: true` avec la date, mais le produit n'est pas réellement supprimé.
::
