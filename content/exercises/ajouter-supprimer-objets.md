---
title: "Ajouter et supprimer des objets"
description: "Utilise push et filter pour gérer une liste d'objets"
difficulty: beginner
module: 6
exerciseNumber: "6.8"
duration: 10
tags:
  - objets
  - tableaux
  - push
  - filter
  - CRUD
concepts:
  - push() pour ajouter
  - filter() pour supprimer
  - Gestion de liste

starterCode: |
  const taches = [
    { id: 1, texte: "Faire les courses", fait: false },
    { id: 2, texte: "Appeler mamie", fait: true },
    { id: 3, texte: "Réviser JavaScript", fait: false }
  ]

  // 1. Ajoute une nouvelle tâche (id: 4, texte: "Faire du sport", fait: false)


  // 2. Crée un nouveau tableau SANS la tâche id = 2 (Appeler mamie)
  //    filter() retourne un NOUVEAU tableau, stocke-le dans une variable
  //    Astuce : garde toutes les tâches SAUF celle avec id 2


  // 3. Affiche le nouveau tableau (celui retourné par filter)
  // console.log("Tâches:", ___)

solution:
  code: |
    const taches = [
      { id: 1, texte: "Faire les courses", fait: false },
      { id: 2, texte: "Appeler mamie", fait: true },
      { id: 3, texte: "Réviser JavaScript", fait: false }
    ]

    // 1. Ajoute une nouvelle tâche (id: 4, texte: "Faire du sport", fait: false)
    taches.push({ id: 4, texte: "Faire du sport", fait: false })

    // 2. Supprime la tâche avec id = 2 (Appeler mamie)
    const tachesFiltrees = taches.filter(t => t.id !== 2)

    // 3. Affiche les tâches restantes
    console.log("Tâches:", tachesFiltrees)
  explanation: "push() ajoute un objet à la fin du tableau. filter() crée un nouveau tableau sans l'élément à supprimer (on garde ceux où la condition est vraie)."

validations:
  - description: "Utiliser push pour ajouter"
    type: code_matches
    expected: "taches\\.push\\s*\\("
    errorMessage: "Utilise taches.push({ ... }) pour ajouter la tâche"
    successMessage: "Bien ! Tu sais ajouter un objet"
  - description: "Ajouter l'objet avec id 4"
    type: code_contains
    expected: "id: 4"
    errorMessage: "N'oublie pas id: 4 dans le nouvel objet"
    successMessage: "ID correct !"
  - description: "Utiliser filter pour exclure la tâche"
    type: code_contains
    expected: "filter"
    errorMessage: "Utilise filter(t => t.id !== 2) pour garder toutes les tâches sauf celle avec id 2"
    successMessage: "Parfait ! Tu utilises filter"
  - description: "Faire du sport présent"
    type: output_contains
    expected: "Faire du sport"
    errorMessage: "La tâche 'Faire du sport' doit apparaître"
    successMessage: "Nouvelle tâche ajoutée !"
  - description: "Appeler mamie absent"
    type: output_matches
    expected: "^(?![\\s\\S]*Appeler mamie)"
    errorMessage: "La tâche 'Appeler mamie' (id 2) doit être supprimée"
    successMessage: "Bravo ! Tu maîtrises l'ajout et la suppression"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Ajouter avec push"
    content: "push() ajoute un élément à la fin du tableau :"
    example: "taches.push({ id: 4, texte: \"Faire du sport\", fait: false })"
  - title: "Supprimer avec filter"
    content: "filter() garde les éléments qui passent le test. Pour supprimer id 2, on garde tout SAUF id 2 :"
    example: "const sansId2 = taches.filter(t => t.id !== 2)"
  - title: "Pourquoi filter et pas splice ?"
    content: "filter() est plus lisible et ne modifie pas le tableau original. C'est le pattern moderne recommandé."
    example: "// ✅ Moderne et clair\nconst nouveau = tableau.filter(x => x.id !== idASupprimer)"
    learnMore: "https://devjs.ch/js/objets.html"
---

# Ajouter et supprimer des objets

## 🎯 Objectif

Apprendre à **ajouter** et **supprimer** des objets dans un tableau.

## 📖 Contexte

### Ajouter un objet avec push()

`push()` **modifie directement** le tableau original en ajoutant un élément à la fin :

```javascript
const utilisateurs = [
  { nom: "Alice", age: 25 }
]

utilisateurs.push({ nom: "Bob", age: 30 })

console.log(utilisateurs)
// [{ nom: "Alice", age: 25 }, { nom: "Bob", age: 30 }]
// Le tableau 'utilisateurs' a été modifié !
```

### Supprimer un objet avec filter()

Contrairement à `push()`, `filter()` **ne modifie pas** le tableau original. Il retourne un **nouveau tableau** contenant uniquement les éléments qui passent le test :

```javascript
const produits = [
  { id: 1, nom: "Café" },
  { id: 2, nom: "Thé" },
  { id: 3, nom: "Jus" }
]

// filter() retourne un NOUVEAU tableau, il faut le stocker !
const sansProduit2 = produits.filter(p => p.id !== 2)

console.log(produits)       // Toujours 3 éléments (pas modifié !)
console.log(sansProduit2)   // 2 éléments : Café et Jus
```

::alert{type="warning"}
**Attention** : `filter()` ne touche pas au tableau d'origine. Il faut **stocker le résultat** dans une variable pour l'utiliser ensuite.
::

### Récapitulatif : qui modifie quoi ?

| Méthode | Modifie l'original ? | Retourne quoi ? |
|---------|---------------------|-----------------|
| `push()` | **Oui** | La nouvelle taille du tableau |
| `filter()` | **Non** | Un **nouveau** tableau filtré |

### Pourquoi `!==` ?

`filter()` parcourt chaque élément et **garde** ceux où la condition est `true` :

- `p.id !== 2` signifie "id différent de 2"
- On **garde** tous les objets où c'est **vrai**
- Donc on garde tout **sauf** id 2

```
Produit     Test         Résultat    Gardé ?
{ id: 1 }   1 !== 2      true        Oui
{ id: 2 }   2 !== 2      false       Non (supprimé)
{ id: 3 }   3 !== 2      true        Oui
```

## 📝 Consigne

1. **Ajoute** une nouvelle tâche avec `push()` :
   - `id: 4`
   - `texte: "Faire du sport"`
   - `fait: false`

2. **Supprime** la tâche avec `id = 2` en utilisant `filter()` :
   - Stocke le résultat dans une **nouvelle variable** (ex: `tachesFiltrees`)
   - Rappel : `filter()` retourne un nouveau tableau, il ne modifie pas `taches`

3. **Affiche** le nouveau tableau (celui retourné par `filter`, pas `taches`) :
   - Décommente le `console.log` et remplace `___` par le nom de ta variable

**Résultat attendu dans la console :**
```
Taches: [{ id: 1, ... }, { id: 3, ... }, { id: 4, ... }]
```
La tâche "Appeler mamie" (id 2) ne doit plus apparaître.

