---
title: "Accéder aux propriétés"
description: "Lis les propriétés d'un objet avec la notation point"
difficulty: beginner
module: 6
exerciseNumber: "6.2"
duration: 5
tags:
  - objets
  - propriétés
  - lecture
concepts:
  - Notation point
  - Notation crochets
  - Accès aux valeurs

starterCode: |
  const film = {
    titre: "Inception",
    realisateur: "Christopher Nolan",
    annee: 2010,
    note: 8.8
  }

  // Affiche le titre du film

  // Affiche l'année de sortie

solution:
  code: |
    const film = {
      titre: "Inception",
      realisateur: "Christopher Nolan",
      annee: 2010,
      note: 8.8
    }

    // Affiche le titre du film
    console.log(film.titre)

    // Affiche l'année de sortie
    console.log(film.annee)
  explanation: "La notation point (objet.propriété) permet d'accéder directement à la valeur d'une propriété."

validations:
  - description: "Accéder au titre"
    type: code_contains
    expected: "film.titre"
    errorMessage: "Utilise film.titre pour accéder au titre"
    successMessage: "Accès au titre OK !"
  - description: "Accéder à l'année"
    type: code_contains
    expected: "film.annee"
    errorMessage: "Utilise film.annee pour accéder à l'année"
    successMessage: "Accès à l'année OK !"
  - description: "Afficher Inception"
    type: output_contains
    expected: "Inception"
    errorMessage: "Le titre 'Inception' doit s'afficher"
    successMessage: "Titre affiché !"
  - description: "Afficher 2010"
    type: output_contains
    expected: "2010"
    errorMessage: "L'année 2010 doit s'afficher"
    successMessage: "Bravo !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Notation point"
    content: "Pour lire une propriété, utilise : objet.nomPropriete"
    example: "film.titre     // \"Inception\"\nfilm.note      // 8.8"
  - title: "Afficher une propriété"
    content: "Combine console.log() avec la notation point :"
    example: "console.log(film.titre)"
  - title: "Solution"
    content: "Affiche le titre puis l'année :"
    example: "console.log(film.titre)\nconsole.log(film.annee)"
    learnMore: "https://devjs.ch/js/objets.html"
---

# Accéder aux propriétés

## 🎯 Objectif

Lire les valeurs d'un objet avec la **notation point**.

## 📖 Contexte

Pour accéder à une propriété d'un objet :

```javascript
const voiture = {
  marque: "Tesla",
  modele: "Model 3"
}

console.log(voiture.marque)  // "Tesla"
console.log(voiture.modele)  // "Model 3"
```

### Syntaxe

```
objet.propriété
```

## 📝 Consigne

L'objet `film` contient des informations sur un film.

1. Affiche le **titre** du film
2. Affiche l'**année** de sortie

**Résultat attendu :**
```
Inception
2010
```
