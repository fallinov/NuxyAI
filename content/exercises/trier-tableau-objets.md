---
title: "Trier un tableau d'objets"
description: "Utilise sort pour ordonner des objets selon une propriété"
difficulty: beginner
module: 6
exerciseNumber: "6.7"
duration: 8
tags:
  - objets
  - tableaux
  - sort
  - tri
concepts:
  - sort() sur objets
  - Fonction de comparaison
  - Tri par propriété numérique
  - Tri par propriété texte

starterCode: |
  const eleves = [
    { nom: "Clara", note: 6.0 },
    { nom: "Alice", note: 5.5 },
    { nom: "Emma", note: 3.0 },
    { nom: "Bob", note: 4.0 },
    { nom: "David", note: 5.0 }
  ]

  // 1. Trie par note croissante (plus basse → plus haute)
  const parNote = [...eleves].sort()

  // 2. Trie par nom alphabétique
  const parNom = [...eleves].sort()

  console.log("Par note:", parNote.map(e => e.nom + ":" + e.note))
  console.log("Par nom:", parNom.map(e => e.nom))

solution:
  code: |
    const eleves = [
      { nom: "Clara", note: 6.0 },
      { nom: "Alice", note: 5.5 },
      { nom: "Emma", note: 3.0 },
      { nom: "Bob", note: 4.0 },
      { nom: "David", note: 5.0 }
    ]

    // 1. Trie par note croissante (plus basse → plus haute)
    const parNote = [...eleves].sort((a, b) => a.note - b.note)

    // 2. Trie par nom alphabétique
    const parNom = [...eleves].sort((a, b) => a.nom.localeCompare(b.nom))

    console.log("Par note:", parNote.map(e => e.nom + ":" + e.note))
    console.log("Par nom:", parNom.map(e => e.nom))
  explanation: "Pour trier des objets, on compare leurs propriétés. Pour les nombres : a.note - b.note. Pour les textes : a.nom.localeCompare(b.nom) gère les accents."

validations:
  - description: "Tri par note avec comparaison"
    type: code_matches
    expected: "sort\\s*\\(\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)\\s*=>\\s*\\{?\\s*(?:return\\s+)?\\w+\\.note\\s*-\\s*\\w+\\.note"
    errorMessage: "Essaie sort((a, b) => a.note - b.note) pour trier par note"
    successMessage: "Bien ! Le tri par note fonctionne"
  - description: "Tri par nom avec localeCompare"
    type: code_matches
    expected: "sort\\s*\\(\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*\\)\\s*=>\\s*\\{?\\s*(?:return\\s+)?\\w+\\.nom\\.localeCompare"
    errorMessage: "Essaie sort((a, b) => a.nom.localeCompare(b.nom)) pour trier par nom"
    successMessage: "Parfait ! Tu maîtrises localeCompare"
  - description: "Emma en premier par note"
    type: output_matches
    expected: "Par note:.*Emma:3"
    errorMessage: "Emma (3.0) doit être en premier dans le tri par note"
    successMessage: "Emma est bien en tête !"
  - description: "Alice en premier par nom"
    type: output_matches
    expected: "Par nom:.*Alice"
    errorMessage: "Alice doit être en premier dans le tri alphabétique"
    successMessage: "Bravo ! Tu sais trier un tableau d'objets"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Tri numérique sur propriété"
    content: "Compare les propriétés numériques avec la soustraction :"
    example: "eleves.sort((a, b) => a.note - b.note)  // Croissant\neleves.sort((a, b) => b.note - a.note)  // Décroissant"
  - title: "Tri alphabétique sur propriété"
    content: "Utilise localeCompare pour comparer des textes (gère les accents) :"
    example: "eleves.sort((a, b) => a.nom.localeCompare(b.nom))"
  - title: "Pourquoi [...eleves] ?"
    content: "sort() modifie le tableau original. On crée une copie avec [...] pour garder l'original intact."
    example: "const copie = [...original]\ncopie.sort(...)  // L'original n'est pas touché"
    learnMore: "https://devjs.ch/js/objets.html"
---

# Trier un tableau d'objets

## 🎯 Objectif

Utiliser **sort()** pour ordonner des objets selon une de leurs propriétés (nombre ou texte).

## 📖 Contexte

Pour trier des objets, on utilise une fonction de comparaison qui accède aux propriétés :

### Tri par propriété numérique

```javascript
const produits = [
  { nom: "Café", prix: 4.50 },
  { nom: "Thé", prix: 3.00 },
  { nom: "Jus", prix: 5.00 }
]

// Du moins cher au plus cher
produits.sort((a, b) => a.prix - b.prix)
// Thé (3.00), Café (4.50), Jus (5.00)

// Du plus cher au moins cher
produits.sort((a, b) => b.prix - a.prix)
// Jus (5.00), Café (4.50), Thé (3.00)
```

### Tri par propriété texte

Pour les chaînes de caractères, utilise `localeCompare()` :

```javascript
const personnes = [
  { nom: "Zoé" },
  { nom: "Alice" },
  { nom: "Éric" }  // Accent !
]

// Ordre alphabétique
personnes.sort((a, b) => a.nom.localeCompare(b.nom))
// Alice, Éric, Zoé (les accents sont bien gérés)
```

### Attention : sort() modifie le tableau !

```javascript
const original = [{ nom: "B" }, { nom: "A" }]

// ❌ L'original est modifié
original.sort((a, b) => a.nom.localeCompare(b.nom))

// ✅ Créer une copie d'abord
const copie = [...original]
copie.sort((a, b) => a.nom.localeCompare(b.nom))
```

| Méthode | Modifie l'original ? | Retourne quoi ? |
|---------|---------------------|-----------------|
| `sort()` | **Oui** | Le tableau trié (le même objet) |
| `filter()` | **Non** | Un **nouveau** tableau |

::alert{type="warning"}
**Important** : `sort()` **modifie directement** le tableau original. Pour garder l'original intact, crée une copie avec `[...tableau]` avant de trier.
::

## 📝 Consigne

À partir du tableau d'élèves :

1. Crée `parNote` : trié par **note croissante** (3.0 → 6.0)
2. Crée `parNom` : trié par **nom alphabétique** (Alice → Emma)

::alert{type="info"}
**Astuce** : `[...eleves]` crée une copie du tableau pour ne pas modifier l'original.
::

**Résultat attendu :**
```
Par note: ["Emma:3", "Bob:4", "David:5", "Alice:5.5", "Clara:6"]
Par nom: ["Alice", "Bob", "Clara", "David", "Emma"]
```
