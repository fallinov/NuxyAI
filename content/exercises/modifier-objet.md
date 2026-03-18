---
title: "Modifier un objet"
description: "Modifie et ajoute des propriétés à un objet existant"
difficulty: beginner
module: 6
exerciseNumber: "6.3"
duration: 6
tags:
  - objets
  - modification
  - ajout
concepts:
  - Modification de propriétés
  - Ajout de propriétés
  - Notation point

starterCode: |
  const produit = {
    nom: "iPhone",
    prix: 999,
    stock: 50
  }

  // 1. Modifie le prix à 899

  // 2. Ajoute une propriété "couleur" avec la valeur "Noir"

  // 3. Le nom est déjà affiché, affiche aussi la couleur
  console.log(produit.nom)

solution:
  code: |
    const produit = {
      nom: "iPhone",
      prix: 999,
      stock: 50
    }

    // 1. Modifie le prix à 899
    produit.prix = 899

    // 2. Ajoute une propriété "couleur" avec la valeur "Noir"
    produit.couleur = "Noir"

    // 3. Le nom est déjà affiché, affiche aussi la couleur
    console.log(produit.nom)
    console.log(produit.couleur)
  explanation: "On peut modifier ou ajouter des propriétés avec la notation point. Pour afficher une propriété, on utilise console.log(objet.propriete)."

validations:
  - description: "Modifier le prix"
    type: code_contains
    expected: "produit.prix = 899"
    errorMessage: "Modifie le prix avec : produit.prix = 899"
    successMessage: "Prix modifié !"
  - description: "Ajouter couleur"
    type: code_matches
    expected: "produit\\.couleur\\s*=\\s*[\"']Noir[\"']"
    errorMessage: "Ajoute : produit.couleur = \"Noir\""
    successMessage: "Couleur ajoutée !"
  - description: "Afficher la couleur"
    type: code_contains
    expected: "console.log(produit.couleur)"
    errorMessage: "Affiche la couleur avec console.log(produit.couleur)"
    successMessage: "Couleur affichée !"
  - description: "iPhone dans la sortie"
    type: output_contains
    expected: "iPhone"
    errorMessage: "Le nom 'iPhone' doit apparaître"
    successMessage: "Nom OK !"
  - description: "Noir dans la sortie"
    type: output_contains
    expected: "Noir"
    errorMessage: "La couleur 'Noir' doit apparaître"
    successMessage: "Bravo !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Modifier une propriété"
    content: "Utilise la notation point avec le signe = pour modifier :"
    example: "produit.prix = 899"
  - title: "Ajouter une propriété"
    content: "Même syntaxe pour ajouter une nouvelle propriété :"
    example: "produit.couleur = \"Noir\""
  - title: "Afficher une propriété"
    content: "Regarde l'exemple avec produit.nom et fais pareil pour la couleur :"
    example: "console.log(produit.nom)     // iPhone\nconsole.log(produit.couleur) // Noir"
  - title: "const et objets"
    content: "Avec const, on ne peut pas réassigner l'objet, mais on peut modifier ses propriétés."
    example: "const obj = {a: 1}\nobj.a = 2      // OK\nobj = {b: 2}   // ERREUR"
    learnMore: "https://devjs.ch/js/objets.html"
---

# Modifier un objet

## 🎯 Objectif

**Modifier** une propriété existante et **ajouter** une nouvelle propriété.

## 📖 Contexte

Les objets sont modifiables après leur création :

```javascript
const voiture = {
  marque: "Peugeot",
  km: 50000
}

// Modifier une propriété
voiture.km = 55000

// Ajouter une propriété
voiture.couleur = "Bleu"
```

::alert{type="info"}
**Note** : Même avec `const`, on peut modifier les propriétés d'un objet. Seule la réassignation complète (`voiture = {...}`) est interdite.
::

## 📝 Consigne

1. **Modifie** le prix du produit à `899`
2. **Ajoute** une propriété `couleur` avec la valeur `"Noir"`
3. **Affiche** la couleur (comme l'exemple avec le nom)

**Résultat attendu :**
```
iPhone
Noir
```
