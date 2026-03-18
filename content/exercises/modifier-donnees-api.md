---
title: "Modifier des données (PUT)"
description: "Utilise fetch avec PUT pour modifier une ressource sur l'API"
difficulty: beginner
module: 9
exerciseNumber: "9.7"
duration: 8
tags:
  - API
  - fetch
  - PUT
  - CRUD
concepts:
  - Méthode PUT
  - Modification de ressources
  - Différence POST vs PUT

starterCode: |
  // Fonction pour modifier un produit
  async function modifierProduit(id, titre, prix) {
    const response = await fetch("https://dummyjson.com/products/" + id, {
      method: "?",  // Remplace "?" par la bonne méthode HTTP
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: titre, price: prix })
    })

    const resultat = await response.json()
    console.log("Produit modifié !")
    console.log("ID :", resultat.id)
    console.log("Nouveau titre :", resultat.title)
    console.log("Nouveau prix :", resultat.price, "$")
  }

  // Modifie le produit 1
  await modifierProduit(1, "Super Mascara Pro", 14.99)

solution:
  code: |
    // Fonction pour modifier un produit
    async function modifierProduit(id, titre, prix) {
      const response = await fetch("https://dummyjson.com/products/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: titre, price: prix })
      })

      const resultat = await response.json()
      console.log("Produit modifié !")
      console.log("ID :", resultat.id)
      console.log("Nouveau titre :", resultat.title)
      console.log("Nouveau prix :", resultat.price, "$")
    }

    // Modifie le produit 1
    await modifierProduit(1, "Super Mascara Pro", 14.99)
  explanation: "PUT remplace les données d'une ressource existante. On cible le produit par son ID dans l'URL (/products/1) et on envoie les nouvelles données dans le body."

validations:
  - description: "Utiliser la méthode PUT"
    type: code_matches
    expected: "method\\s*:\\s*[\"']PUT[\"']"
    errorMessage: "Remplace ___ par \"PUT\" pour modifier les données"
    successMessage: "Bien ! Tu utilises PUT"
  - description: "URL avec l'ID"
    type: code_contains
    expected: "dummyjson.com/products/"
    errorMessage: "L'URL doit cibler un produit spécifique"
    successMessage: "Super ! L'URL cible le bon produit"
  - description: "Produit modifié"
    type: output_contains
    expected: "Produit modifié"
    errorMessage: "Le message de confirmation doit s'afficher"
    successMessage: "Modification réussie !"
  - description: "Nouveau titre"
    type: output_contains
    expected: "Super Mascara Pro"
    errorMessage: "Le nouveau titre doit s'afficher"
    successMessage: "Bravo ! Le produit est mis à jour"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Quelle méthode ?"
    content: "Pour modifier une ressource existante, utilise la méthode PUT (en majuscules, entre guillemets) :"
    example: "method: \"PUT\""
  - title: "POST vs PUT"
    content: "POST crée une nouvelle ressource, PUT modifie une ressource existante :"
    example: "// POST → créer (URL sans ID)\nfetch(\"/products/add\", { method: \"POST\" })\n\n// PUT → modifier (URL avec ID)\nfetch(\"/products/1\", { method: \"PUT\" })"
  - title: "Structure complète"
    content: "PUT a la même structure que POST : method, headers et body :"
    example: "await fetch(url, {\n  method: \"PUT\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({ ... })\n})"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/HTTP/Methods/PUT"
---

# Modifier des données (PUT)

## 🎯 Objectif

Utiliser `fetch()` avec la méthode **PUT** pour **modifier une ressource existante** sur l'API.

## 📖 Contexte

### POST vs PUT

| Méthode | Action | URL | Exemple |
|---------|--------|-----|---------|
| **POST** | **Créer** | `/products/add` | Ajouter un produit |
| **PUT** | **Modifier** | `/products/1` | Changer le produit 1 |

La différence clé : **PUT cible une ressource précise** via son ID dans l'URL.

### Comment modifier avec PUT ?

```javascript
const response = await fetch("https://dummyjson.com/products/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Nouveau nom",
    price: 19.99
  })
})

const resultat = await response.json()
console.log(resultat.title) // "Nouveau nom"
```

### Récapitulatif CRUD

| Opération | Méthode HTTP | URL |
|-----------|-------------|-----|
| **C**reate (créer) | POST | `/products/add` |
| **R**ead (lire) | GET | `/products` ou `/products/1` |
| **U**pdate (modifier) | PUT | `/products/1` |
| **D**elete (supprimer) | DELETE | `/products/1` |

::alert{type="info"}
**CRUD** : Create, Read, Update, Delete. Ce sont les 4 opérations de base pour gérer des données.
::

## 📝 Consigne

Complète la requête PUT :
1. Remplace `___` par `"PUT"` pour la méthode HTTP

**Résultat attendu :**
```
Produit modifié !
ID : 1
Nouveau titre : Super Mascara Pro
Nouveau prix : 14.99 $
```
