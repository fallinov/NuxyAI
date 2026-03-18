---
title: "Créer un objet"
description: "Crée ton premier objet JavaScript avec des propriétés"
difficulty: beginner
module: 6
exerciseNumber: "6.1"
duration: 6
tags:
  - objets
  - propriétés
  - création
concepts:
  - Notation littérale {}
  - Propriétés clé-valeur
  - Types de valeurs

starterCode: |
  // Crée un objet "livre" avec les propriétés suivantes :
  // - titre : "Le Petit Prince"
  // - auteur : "Antoine de Saint-Exupéry"
  // - annee : 1943
  // - disponible : true


  // Affiche l'objet complet
  // console.log(livre)

solution:
  code: |
    // Crée un objet "livre"
    const livre = {
      titre: "Le Petit Prince",
      auteur: "Antoine de Saint-Exupéry",
      annee: 1943,
      disponible: true
    }

    console.log(livre)
  explanation: "Un objet regroupe des données liées sous forme de paires clé: valeur, séparées par des virgules, le tout entre accolades {}."

validations:
  - description: "Créer une constante livre"
    type: code_matches
    expected: "const\\s+livre\\s*="
    errorMessage: "Déclare l'objet avec : const livre = { ... }"
    successMessage: "Bien ! L'objet livre est créé"
  - description: "Propriété titre"
    type: code_matches
    expected: "titre\\s*:\\s*[\"']Le Petit Prince[\"']"
    errorMessage: "Ajoute la propriété titre: \"Le Petit Prince\""
    successMessage: "Titre ajouté !"
  - description: "Propriété auteur"
    type: code_matches
    expected: "auteur\\s*:"
    errorMessage: "Ajoute la propriété auteur"
    successMessage: "Auteur ajouté !"
  - description: "Propriété annee (nombre)"
    type: code_matches
    expected: "annee\\s*:\\s*1943"
    errorMessage: "Ajoute la propriété annee: 1943 (sans guillemets)"
    successMessage: "Bravo ! Tu sais créer un objet"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Structure d'un objet"
    content: "Un objet se crée avec des accolades {} et contient des paires clé: valeur séparées par des virgules."
    example: "const personne = {\n  nom: \"Alice\",\n  age: 25\n}"
  - title: "Types de valeurs"
    content: "Les valeurs peuvent être des chaînes (guillemets), des nombres (sans guillemets), des booléens (true/false)."
    example: "{\n  texte: \"hello\",\n  nombre: 42,\n  actif: true\n}"
  - title: "Solution"
    content: "Crée l'objet avec les 4 propriétés demandées :"
    example: "const livre = {\n  titre: \"Le Petit Prince\",\n  auteur: \"Antoine de Saint-Exupéry\",\n  annee: 1943,\n  disponible: true\n}"
    learnMore: "https://devjs.ch/js/objets.html"
---

# Créer un objet

## 🎯 Objectif

Créer un **objet JavaScript** pour regrouper des informations liées.

## 📖 Contexte

Un objet permet de stocker plusieurs informations dans une seule variable :

```javascript
const utilisateur = {
  nom: "Marie",
  age: 28,
  ville: "Genève"
}
```

### Structure

- **Accolades `{}`** : délimitent l'objet
- **Propriétés** : paires `clé: valeur`
- **Virgules** : séparent les propriétés

## 📝 Consigne

Crée un objet `livre` avec ces propriétés :

| Propriété | Valeur | Type |
|-----------|--------|------|
| titre | "Le Petit Prince" | texte |
| auteur | "Antoine de Saint-Exupéry" | texte |
| annee | 1943 | nombre |
| disponible | true | booléen |

Puis affiche l'objet avec `console.log(livre)`.
