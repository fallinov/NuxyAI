---
title: "Récupérer des données"
description: "Utilise fetch pour récupérer des données d'une vraie API"
difficulty: beginner
module: 9
exerciseNumber: "9.4"
duration: 8
tags:
  - API
  - fetch
  - GET
concepts:
  - fetch()
  - Requête GET
  - response.json()
  - async/await avec fetch

starterCode: |
  // URL de l'API DummyJSON (produits)
  const url = "https://dummyjson.com/products?limit=3&select=title,price"

  // Fonction pour charger les produits
  async function chargerProduits() {
    // 1. Appelle fetch avec l'URL
    const response = await fetch(url)

    // 2. Convertis la réponse en JSON (écris le code ici)
    const data = "?"  // Remplace "?" par await response.json()

    // 3. Affiche le nombre de produits
    console.log("Produits reçus :", data.products.length)

    // 4. Affiche chaque produit avec forEach
    data.products.forEach(function(p) {
      console.log("-", p.title, ":", p.price, "$")
    })
  }

  // Exécution
  await chargerProduits()

solution:
  code: |
    // URL de l'API DummyJSON (produits)
    const url = "https://dummyjson.com/products?limit=3&select=title,price"

    // Fonction pour charger les produits
    async function chargerProduits() {
      // 1. Appelle fetch avec l'URL
      const response = await fetch(url)

      // 2. Convertis la réponse en JSON
      const data = await response.json()

      // 3. Affiche le nombre de produits
      console.log("Produits reçus :", data.products.length)

      // 4. Affiche chaque produit avec forEach
      data.products.forEach(function(p) {
        console.log("-", p.title, ":", p.price, "$")
      })
    }

    // Exécution
    await chargerProduits()
  explanation: "fetch() envoie une requête HTTP GET à l'API. On attend la réponse avec await, puis on la convertit en objet JavaScript avec response.json(). DummyJSON retourne un objet avec une propriété products qui contient le tableau."

validations:
  - description: "Convertir en JSON"
    type: code_matches
    expected: "(const|let)\\s+\\w+\\s*=\\s*await\\s+response\\.json\\(\\)"
    errorMessage: "Convertis la réponse : const data = await response.json()"
    successMessage: "Super ! Tu convertis la réponse en JSON"
  - description: "Utiliser fetch"
    type: code_contains
    expected: "await fetch("
    errorMessage: "Utilise await fetch(url) pour envoyer la requête"
    successMessage: "Bien ! Tu utilises fetch"
  - description: "Affiche le nombre de produits"
    type: output_contains
    expected: "Produits reçus : 3"
    errorMessage: "Le nombre de produits (3) doit s'afficher"
    successMessage: "3 produits reçus !"
  - description: "Affiche un produit"
    type: output_matches
    expected: "-.*:.*\\$"
    errorMessage: "Les produits doivent s'afficher avec leur prix"
    successMessage: "Bravo ! Les produits s'affichent"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Deux await"
    content: "Il y a deux étapes asynchrones. Chacune nécessite await :"
    example: "// 1. Attendre la réponse HTTP\nconst response = await fetch(url)\n\n// 2. Attendre la conversion JSON\nconst data = await response.json()"
  - title: "Pourquoi .json() ?"
    content: "La réponse HTTP est du texte brut. .json() le convertit en objet JavaScript :"
    example: "// Texte brut : '{\"products\":[...]}'\n// Après .json() : { products: [...] }"
  - title: "Solution"
    content: "Remplace ___ par :"
    example: "const data = await response.json()"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch"
---

# Récupérer des données

## 🎯 Objectif

Utiliser `fetch()` pour **récupérer des données** depuis une vraie API REST.

## 📖 Contexte

### Qu'est-ce qu'une API ?

Une **API** (Application Programming Interface) est un service web qui fournit des données au format JSON. On y accède via des URLs.

**DummyJSON** (`dummyjson.com`) est une API gratuite avec des données de test : produits, utilisateurs, etc.

### Comment utiliser fetch ?

`fetch()` envoie une requête HTTP et retourne une réponse :

```javascript
async function chargerDonnees() {
  // 1. Envoyer la requête GET
  const response = await fetch("https://dummyjson.com/products?limit=3")

  // 2. Convertir la réponse en JSON
  const data = await response.json()

  // 3. Utiliser les données
  console.log(data.products)
}
```

### Les deux étapes de fetch

| Étape | Code | Ce qu'on obtient |
|-------|------|-----------------|
| 1 | `await fetch(url)` | Un objet Response (la réponse HTTP) |
| 2 | `await response.json()` | Les données en JavaScript (objet/tableau) |

::alert{type="warning"}
**Deux `await` nécessaires !** Le premier attend que le serveur réponde. Le deuxième attend que le JSON soit lu et converti en objet JavaScript.
::

### Le paramètre `select`

DummyJSON permet de choisir les champs retournés avec `?select=` :

```javascript
// Retourne TOUS les champs (prix, description, images, etc.)
fetch("https://dummyjson.com/products/1")

// Retourne SEULEMENT title et price
fetch("https://dummyjson.com/products/1?select=title,price")
// → { id: 1, title: "Essence Mascara Lash Princess", price: 9.99 }
```

## 📝 Consigne

Complète la fonction `chargerProduits()` :
1. Convertis la réponse en JSON : `const data = await response.json()`

**Résultat attendu :**
```
Produits reçus : 3
- Essence Mascara Lash Princess : 9.99 $
- Eyeshadow Palette with Mirror : 19.99 $
- Powder Canister : 14.99 $
```

::alert{type="info"}
**C'est une vraie API !** Les données viennent du serveur DummyJSON, pas d'une simulation. Tu fais un vrai appel réseau.
::
