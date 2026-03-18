---
title: "Créer un tableau"
description: "Crée ton premier tableau JavaScript pour stocker plusieurs valeurs"
difficulty: beginner
module: 5
exerciseNumber: "5.1"
duration: 5
tags:
  - tableaux
  - array
  - création
concepts:
  - Notation littérale []
  - Éléments séparés par virgules
  - Types de valeurs

starterCode: |
  // Crée un tableau "fruits" contenant 4 fruits :
  // "pomme", "banane", "orange", "kiwi"

  // Affiche le tableau avec console.log()

solution:
  code: |
    // Crée un tableau "fruits"
    const fruits = ["pomme", "banane", "orange", "kiwi"]

    // Affiche le tableau
    console.log(fruits)
  explanation: "Un tableau se crée avec des crochets [] et contient des éléments séparés par des virgules."

validations:
  - description: "Créer une constante fruits"
    type: code_matches
    expected: "const\\s+fruits\\s*="
    errorMessage: "Déclare ton tableau avec : const fruits = [...]"
    successMessage: "Super ! Tu as créé ton tableau fruits"
  - description: "Utiliser les crochets []"
    type: code_matches
    expected: "\\[.*\\]"
    errorMessage: "N'oublie pas les crochets : [élément1, élément2]"
    successMessage: "Parfait, tu maîtrises la syntaxe !"
  - description: "Contient pomme"
    type: code_matches
    expected: "[\"']pomme[\"']"
    errorMessage: "Ajoute \"pomme\" dans ton tableau"
    successMessage: "Miam, une pomme !"
  - description: "Contient 4 fruits"
    type: code_matches
    expected: "[\"'].*[\"'].*,.*[\"'].*[\"'].*,.*[\"'].*[\"'].*,.*[\"'].*[\"']"
    errorMessage: "Ton tableau doit contenir 4 fruits séparés par des virgules"
    successMessage: "Top ! 4 fruits bien rangés"
  - description: "Afficher le tableau"
    type: code_matches
    expected: "console\\.log\\s*\\(\\s*fruits\\s*\\)"
    errorMessage: "Affiche ton tableau avec console.log(fruits)"
    successMessage: "Bravo ! Tu as créé et affiché ton premier tableau"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Structure d'un tableau"
    content: "Un tableau se crée avec des crochets [] et contient des éléments séparés par des virgules."
    example: "const nombres = [1, 2, 3, 4]"
  - title: "Tableau de textes"
    content: "Pour un tableau de chaînes, chaque élément doit être entre guillemets."
    example: "const couleurs = [\"rouge\", \"vert\", \"bleu\"]"
  - title: "Solution"
    content: "Voici comment créer le tableau de fruits :"
    example: "const fruits = [\"pomme\", \"banane\", \"orange\", \"kiwi\"]\nconsole.log(fruits)"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Créer un tableau

## 🎯 Objectif

Créer un **tableau JavaScript** pour stocker une liste de valeurs.

## 📖 Contexte

Un tableau (array) permet de stocker plusieurs valeurs dans une seule variable :

```javascript
const villes = ["Genève", "Lausanne", "Zürich"]
```

### Structure

- **Crochets `[]`** : délimitent le tableau
- **Éléments** : valeurs séparées par des virgules
- **Index** : chaque élément a une position (0, 1, 2...)

### Types de tableaux

```javascript
// Tableau de nombres
const notes = [5.5, 4.0, 6.0]

// Tableau de textes
const prenoms = ["Alice", "Bob", "Charlie"]

// Tableau mixte (possible mais déconseillé)
const mix = [42, "texte", true]
```

## 📝 Consigne

Crée un tableau `fruits` contenant ces 4 éléments :

| Index | Valeur |
|-------|--------|
| 0 | "pomme" |
| 1 | "banane" |
| 2 | "orange" |
| 3 | "kiwi" |

Puis affiche-le avec `console.log()`.

**Résultat attendu :**
```
["pomme", "banane", "orange", "kiwi"]
```
