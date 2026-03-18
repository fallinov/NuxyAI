---
title: "Envoyer des données (POST)"
description: "Utilise fetch avec POST pour créer une ressource sur l'API"
difficulty: beginner
module: 9
exerciseNumber: "9.6"
duration: 8
tags:
  - API
  - fetch
  - POST
  - CRUD
concepts:
  - Méthode POST
  - JSON.stringify()
  - Headers Content-Type
  - Création de ressources (CRUD)

starterCode: |
  // Fonction pour ajouter un produit
  async function ajouterProduit(titre, prix) {
    const response = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: "?"  // Remplace "?" par JSON.stringify({...})
    })

    const resultat = await response.json()
    console.log("Produit créé ! ID :", resultat.id)
    console.log("Titre :", resultat.title)
    console.log("Prix :", resultat.price, "$")
  }

  // Crée un nouveau produit
  await ajouterProduit("Clavier mécanique", 89)

solution:
  code: |
    // Fonction pour ajouter un produit
    async function ajouterProduit(titre, prix) {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: titre, price: prix })
      })

      const resultat = await response.json()
      console.log("Produit créé ! ID :", resultat.id)
      console.log("Titre :", resultat.title)
      console.log("Prix :", resultat.price, "$")
    }

    // Crée un nouveau produit
    await ajouterProduit("Clavier mécanique", 89)
  explanation: "POST envoie des données au serveur pour créer une ressource. Le body contient les données en JSON (converties avec JSON.stringify). Le header Content-Type indique au serveur le format des données."

validations:
  - description: "Utiliser JSON.stringify"
    type: code_contains
    expected: "JSON.stringify"
    errorMessage: "Convertis les données en JSON avec JSON.stringify({...})"
    successMessage: "Bien ! Tu convertis en JSON"
  - description: "Envoyer title et price"
    type: code_matches
    expected: "JSON\\.stringify\\s*\\(\\s*\\{[^}]*title"
    errorMessage: "Envoie un objet avec title et price : JSON.stringify({ title: titre, price: prix })"
    successMessage: "Super ! Les données sont envoyées"
  - description: "Produit créé"
    type: output_contains
    expected: "Produit créé"
    errorMessage: "Le message 'Produit créé' doit s'afficher"
    successMessage: "Produit créé !"
  - description: "Titre affiché"
    type: output_contains
    expected: "Clavier"
    errorMessage: "Le titre du produit doit s'afficher"
    successMessage: "Bravo ! Le produit est envoyé à l'API"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Qu'est-ce que body ?"
    content: "Le body contient les données à envoyer au serveur. Il faut les convertir en texte JSON :"
    example: "body: JSON.stringify({ title: \"Mon produit\", price: 42 })"
  - title: "Pourquoi JSON.stringify ?"
    content: "Le réseau transporte du texte, pas des objets JavaScript. JSON.stringify convertit un objet en texte JSON :"
    example: "// Objet JS → texte JSON\nJSON.stringify({ title: \"Clavier\", price: 89 })\n// → '{\"title\":\"Clavier\",\"price\":89}'"
  - title: "Solution"
    content: "Remplace ___ par :"
    example: "JSON.stringify({ title: titre, price: prix })"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch"
---

# Envoyer des données (POST)

## 🎯 Objectif

Utiliser `fetch()` avec la méthode **POST** pour **créer une nouvelle ressource** sur l'API.

## 📖 Contexte

### GET vs POST

| Méthode | Action | Body ? |
|---------|--------|--------|
| **GET** | Lire des données | Non |
| **POST** | Créer une ressource | **Oui** (les données à créer) |

### Comment envoyer un POST ?

```javascript
const response = await fetch("https://dummyjson.com/products/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "Mon produit",
    price: 42
  })
})

const resultat = await response.json()
console.log(resultat)
// → { id: 195, title: "Mon produit", price: 42 }
```

### Les 3 parties d'un POST

| Partie | Rôle | Valeur |
|--------|------|--------|
| `method` | Type de requête | `"POST"` |
| `headers` | Format des données | `"Content-Type": "application/json"` |
| `body` | Données à envoyer | `JSON.stringify({...})` |

::alert{type="warning"}
**JSON.stringify** est obligatoire ! Le réseau transporte du texte, pas des objets JavaScript. `JSON.stringify()` convertit un objet en texte JSON.
::

::alert{type="info"}
**DummyJSON simule la création** : l'API retourne un ID mais ne sauvegarde pas réellement le produit. C'est parfait pour s'entraîner sans risque.
::

## 📝 Consigne

Complète le `body` de la requête POST :
1. Remplace `___` par `JSON.stringify({ title: titre, price: prix })`

**Résultat attendu :**
```
Produit créé ! ID : 195
Titre : Clavier mécanique
Prix : 89 $
```
