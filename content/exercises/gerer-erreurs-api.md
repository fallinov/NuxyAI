---
title: "Gérer les erreurs API"
description: "Utilise try/catch pour gérer les erreurs de requêtes"
difficulty: beginner
module: 9
exerciseNumber: "9.5"
duration: 8
tags:
  - API
  - try/catch
  - erreurs
concepts:
  - try/catch
  - Gestion d'erreurs
  - response.ok
  - throw new Error()

starterCode: |
  // Fonction pour charger un produit par ID
  async function chargerProduit(id) {
    try {
      const response = await fetch("https://dummyjson.com/products/" + id + "?select=title,price")

      // Vérifie si la réponse est OK (status 200-299)
      if (!response.ok) {
        throw new Error("Erreur " + response.status)
      }

      const produit = await response.json()
      console.log("Produit :", produit.title, "-", produit.price, "$")

    } catch (error) {
      console.log("Erreur attrapée :", error.message)
    }
  }

  // Test 1 : produit qui existe (ID 1)
  console.log("--- Test ID valide ---")
  await chargerProduit(1)

  // Test 2 : produit qui n'existe pas (ID 9999)
  console.log("--- Test ID invalide ---")


solution:
  code: |
    // Fonction pour charger un produit par ID
    async function chargerProduit(id) {
      try {
        const response = await fetch("https://dummyjson.com/products/" + id + "?select=title,price")

        // Vérifie si la réponse est OK (status 200-299)
        if (!response.ok) {
          throw new Error("Erreur " + response.status)
        }

        const produit = await response.json()
        console.log("Produit :", produit.title, "-", produit.price, "$")

      } catch (error) {
        console.log("Erreur attrapée :", error.message)
      }
    }

    // Test 1 : produit qui existe (ID 1)
    console.log("--- Test ID valide ---")
    await chargerProduit(1)

    // Test 2 : produit qui n'existe pas (ID 9999)
    console.log("--- Test ID invalide ---")
    await chargerProduit(9999)
  explanation: "try/catch capture les erreurs sans planter le programme. fetch ne lance pas d'erreur pour les 404, il faut vérifier response.ok et lancer l'erreur nous-mêmes avec throw new Error()."

validations:
  - description: "Appeler avec ID 9999"
    type: code_matches
    expected: "chargerProduit\\s*\\(\\s*9999\\s*\\)"
    errorMessage: "Appelle chargerProduit(9999) pour tester l'erreur"
    successMessage: "Bien ! Tu testes avec un ID invalide"
  - description: "Utiliser await"
    type: code_matches
    expected: "await\\s+chargerProduit\\s*\\(\\s*9999"
    errorMessage: "N'oublie pas le await devant chargerProduit(9999)"
    successMessage: "Super ! Tu utilises await"
  - description: "Produit trouvé"
    type: output_contains
    expected: "Produit :"
    errorMessage: "Le produit avec ID 1 doit s'afficher"
    successMessage: "Produit trouvé !"
  - description: "Erreur gérée"
    type: output_contains
    expected: "Erreur attrapée"
    errorMessage: "L'erreur doit être attrapée par catch"
    successMessage: "Bravo ! L'erreur est bien gérée"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Que faire ?"
    content: "Le code est déjà presque complet. Il suffit d'appeler chargerProduit avec un ID qui n'existe pas pour tester le catch :"
    example: "await chargerProduit(9999)"
  - title: "Pourquoi vérifier response.ok ?"
    content: "fetch ne lance pas d'erreur pour les 404. Il faut vérifier manuellement :"
    example: "if (!response.ok) {\n  throw new Error(\"Erreur \" + response.status)\n  // → saute directement dans le catch\n}"
  - title: "try/catch résumé"
    content: "try contient le code risqué, catch récupère l'erreur :"
    example: "try {\n  // Code qui peut échouer\n  // Si erreur → saute au catch\n} catch (error) {\n  // Gestion de l'erreur\n  console.log(error.message)\n}"
    learnMore: "https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/try...catch"
---

# Gérer les erreurs API

## 🎯 Objectif

Utiliser `try/catch` pour **gérer les erreurs** quand un appel API échoue.

## 📖 Contexte

### Pourquoi gérer les erreurs ?

Les appels API peuvent échouer : serveur down, produit supprimé, réseau coupé... Sans gestion d'erreur, ton programme plante.

```javascript
// ❌ Sans try/catch → le programme plante si ça échoue
const response = await fetch("https://api.exemple.com/produit/999")
const data = await response.json()

// ✅ Avec try/catch → l'erreur est gérée proprement
try {
  const response = await fetch("https://api.exemple.com/produit/999")
  const data = await response.json()
} catch (error) {
  console.log("Oups :", error.message)
}
```

### Attention : fetch ne lance pas d'erreur pour les 404 !

C'est un piège courant. `fetch()` considère qu'un 404 est une réponse valide :

```javascript
const response = await fetch("https://dummyjson.com/products/9999")
console.log(response.ok)     // false (pas un status 200-299)
console.log(response.status) // 404
```

Il faut **vérifier `response.ok`** et lancer l'erreur nous-mêmes :

```javascript
if (!response.ok) {
  throw new Error("Erreur " + response.status)
  // → saute directement dans le catch
}
```

### Tableau des status HTTP

| Status | response.ok | Signification |
|--------|-------------|---------------|
| `200` | `true` | OK, tout va bien |
| `201` | `true` | Créé avec succès |
| `404` | `false` | Non trouvé |
| `500` | `false` | Erreur serveur |

## 📝 Consigne

Le code gère déjà le `try/catch` et la vérification de `response.ok`. Il te suffit de :

1. Appeler `chargerProduit(9999)` avec `await` pour **tester la gestion d'erreur**

**Résultat attendu :**
```
--- Test ID valide ---
Produit : Essence Mascara Lash Princess - 9.99 $
--- Test ID invalide ---
Erreur attrapée : Erreur 404
```

::alert{type="info"}
**Observe** : Le programme ne plante pas grâce au `try/catch`. L'erreur est capturée et affichée proprement.
::
