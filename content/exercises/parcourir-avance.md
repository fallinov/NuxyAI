---
title: "Techniques avancées de parcours"
description: "Maîtrise for...of sur les objets et Object.keys/values/entries"
difficulty: intermediate
module: 6
exerciseNumber: "6.10"
duration: 12
tags:
  - objets
  - tableaux
  - for...of
  - Object.keys
  - Object.values
  - Object.entries
concepts:
  - for...of sur tableau d'objets
  - Object.keys()
  - Object.values()
  - Object.entries()

starterCode: |
  const produit = {
    nom: "iPhone",
    prix: 999,
    stock: 42
  }

  const produits = [
    { id: 1, nom: "iPhone", prix: 999 },
    { id: 2, nom: "Samsung", prix: 899 },
    { id: 3, nom: "Pixel", prix: 799 }
  ]

  // 1. Affiche toutes les CLÉS de l'objet produit (déjà fait)
  console.log("=== Clés ===")
  const cles = Object.keys(produit)
  console.log(cles)

  // 2. Affiche toutes les VALEURS de l'objet produit
  //    Comme Object.keys(), mais pour les valeurs : Object.values()
  console.log("=== Valeurs ===")
  const valeurs = Object.values(produit)
  console.log("?")

  // 3. Parcours les paires clé/valeur avec Object.entries
  //    Object.entries() retourne un tableau de paires [clé, valeur]
  //    Affiche "nom: iPhone", "prix: 999", "stock: 42"
  console.log("=== Clé: Valeur ===")
  for (const [cle, valeur] of Object.entries("?")) {
    console.log(cle + ": " + valeur)
  }

  // 4. Parcours le tableau d'objets avec for...of
  //    Affiche "iPhone coûte 999 CHF", etc.
  console.log("=== Produits ===")
  for (const p of "?") {
    console.log(p.nom + " coûte " + p.prix + " CHF")
  }


solution:
  code: |
    const produit = {
      nom: "iPhone",
      prix: 999,
      stock: 42
    }

    const produits = [
      { id: 1, nom: "iPhone", prix: 999 },
      { id: 2, nom: "Samsung", prix: 899 },
      { id: 3, nom: "Pixel", prix: 799 }
    ]

    // 1. Affiche toutes les CLÉS de l'objet produit
    console.log("=== Clés ===")
    const cles = Object.keys(produit)
    console.log(cles)

    // 2. Affiche toutes les VALEURS de l'objet produit
    console.log("=== Valeurs ===")
    const valeurs = Object.values(produit)
    console.log(valeurs)

    // 3. Affiche chaque paire clé/valeur avec Object.entries
    console.log("=== Clé: Valeur ===")
    for (const [cle, valeur] of Object.entries(produit)) {
      console.log(cle + ": " + valeur)
    }

    // 4. Parcours le tableau d'objets avec for...of
    // Affiche "iPhone coûte 999 CHF", etc.
    console.log("=== Produits ===")
    for (const p of produits) {
      console.log(p.nom + " coûte " + p.prix + " CHF")
    }
  explanation: "Object.keys/values/entries transforment un objet en tableau. for...of peut alors les parcourir. Pour un tableau d'objets, for...of donne directement chaque objet."

validations:
  - description: "Utiliser Object.values"
    type: code_contains
    expected: "Object.values"
    errorMessage: "Utilise Object.values(produit) pour obtenir les valeurs"
    successMessage: "Bien ! Tu récupères les valeurs"
  - description: "Utiliser Object.entries"
    type: code_contains
    expected: "Object.entries"
    errorMessage: "Utilise Object.entries(produit) pour les paires clé/valeur"
    successMessage: "Object.entries maîtrisé !"
  - description: "Parcourir Object.entries avec for...of"
    type: code_matches
    expected: "for\\s*\\(.*Object\\.entries"
    errorMessage: "Utilise for (const [cle, valeur] of Object.entries(produit)) pour parcourir"
    successMessage: "Super ! Déstructuration maîtrisée"
  - description: "Parcourir le tableau d'objets"
    type: code_matches
    expected: "for\\s*\\(\\s*(const|let)\\s+\\w+\\s+of\\s+produits\\s*\\)"
    errorMessage: "Utilise for (const p of produits) pour parcourir le tableau"
    successMessage: "Top ! Tu maîtrises for...of"
  - description: "Affiche les valeurs"
    type: output_contains
    expected: "999"
    errorMessage: "Les valeurs (999) doivent s'afficher"
    successMessage: "Valeurs affichées !"
  - description: "Affiche clé: valeur"
    type: output_matches
    expected: "nom:\\s*iPhone"
    errorMessage: "Affiche 'nom: iPhone' avec Object.entries"
    successMessage: "Paires clé/valeur OK !"
  - description: "Affiche les produits"
    type: output_contains
    expected: "Samsung coûte 899 CHF"
    errorMessage: "Affiche 'Samsung coûte 899 CHF'"
    successMessage: "Bravo ! Tu maîtrises les techniques avancées"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Object.values"
    content: "Retourne un tableau avec toutes les valeurs de l'objet :"
    example: "Object.values({ a: 1, b: 2 })\n// [1, 2]"
  - title: "Object.entries avec déstructuration"
    content: "entries retourne des paires [clé, valeur]. On peut déstructurer :"
    example: "for (const [cle, valeur] of Object.entries(obj)) {\n  console.log(cle + \": \" + valeur)\n}"
  - title: "for...of sur tableau d'objets"
    content: "Chaque tour de boucle donne un objet complet :"
    example: "for (const produit of produits) {\n  console.log(produit.nom)\n}"
    learnMore: "https://devjs.ch/js/boucles.html"
---

# Techniques avancées de parcours

## 🎯 Objectif

Maîtriser **Object.keys()**, **Object.values()**, **Object.entries()** et **for...of** sur des tableaux d'objets.

## 📖 Contexte

### Les méthodes Object.*

Ces méthodes **retournent un nouveau tableau** à partir d'un objet, ce qui permet de le parcourir. Elles **ne modifient pas** l'objet original :

```javascript
const voiture = {
  marque: "Tesla",
  modele: "Model 3",
  annee: 2023
}
```

#### Object.keys() — Les clés (noms des propriétés)

```javascript
Object.keys(voiture)
// ["marque", "modele", "annee"]
```

#### Object.values() — Les valeurs

```javascript
Object.values(voiture)
// ["Tesla", "Model 3", 2023]
```

#### Object.entries() — Paires [clé, valeur]

```javascript
Object.entries(voiture)
// [["marque", "Tesla"], ["modele", "Model 3"], ["annee", 2023]]
```

### Parcourir avec for...of et déstructuration

```javascript
for (const [cle, valeur] of Object.entries(voiture)) {
  console.log(cle + " = " + valeur)
}
// marque = Tesla
// modele = Model 3
// annee = 2023
```

::alert{type="info"}
**Déstructuration** : `const [cle, valeur]` extrait les deux éléments du tableau `["marque", "Tesla"]`
::

### for...of sur un tableau d'objets

```javascript
const users = [
  { nom: "Alice", age: 25 },
  { nom: "Bob", age: 30 }
]

for (const user of users) {
  console.log(user.nom + " a " + user.age + " ans")
}
// Alice a 25 ans
// Bob a 30 ans
```

### Récapitulatif

| Méthode | Retourne | Exemple |
|---------|----------|---------|
| `Object.keys(obj)` | `["clé1", "clé2"]` | Noms des propriétés |
| `Object.values(obj)` | `[val1, val2]` | Valeurs uniquement |
| `Object.entries(obj)` | `[["clé", val], ...]` | Paires clé/valeur |

## 📝 Consigne

1. Affiche les **valeurs** de `produit` avec `Object.values()`
2. Parcours `produit` avec `Object.entries()` et affiche `"clé: valeur"`
3. Parcours `produits` avec `for...of` et affiche `"Nom coûte Prix CHF"`

**Résultat attendu :**
```
=== Clés ===
["nom", "prix", "stock"]
=== Valeurs ===
["iPhone", 999, 42]
=== Clé: Valeur ===
nom: iPhone
prix: 999
stock: 42
=== Produits ===
iPhone coûte 999 CHF
Samsung coûte 899 CHF
Pixel coûte 799 CHF
```
