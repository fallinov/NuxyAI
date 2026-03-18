---
title: "Modifier un objet dans un tableau"
description: "Utilise find pour chercher et modifier un objet"
difficulty: beginner
module: 6
exerciseNumber: "6.9"
duration: 8
tags:
  - objets
  - tableaux
  - find
  - modification
  - CRUD
concepts:
  - find() pour chercher
  - Modification de propriétés
  - Mise à jour de données

starterCode: |
  const eleves = [
    { id: 1, nom: "Alice", note: 4.5 },
    { id: 2, nom: "Bob", note: 3.5 },
    { id: 3, nom: "Clara", note: 5.0 }
  ]

  // 1. Trouve l'élève avec id = 2 (Bob)
  //    Complète la condition dans find()
  const bob = eleves.find(e => false)  // Remplace false par la bonne condition

  // 2. Change sa note à 4.0 (il a rattrapé !)


  // 3. Trouve Clara (id = 3) et change son nom en "Claire"


  console.log("Élèves mis à jour:", eleves)

solution:
  code: |
    const eleves = [
      { id: 1, nom: "Alice", note: 4.5 },
      { id: 2, nom: "Bob", note: 3.5 },
      { id: 3, nom: "Clara", note: 5.0 }
    ]

    // 1. Trouve l'élève avec id = 2 (Bob)
    const bob = eleves.find(e => e.id === 2)

    // 2. Change sa note à 4.0 (il a rattrapé !)
    bob.note = 4.0

    // 3. Trouve Clara (id = 3) et change son nom en "Claire"
    const clara = eleves.find(e => e.id === 3)
    clara.nom = "Claire"

    console.log("Élèves mis à jour:", eleves)
  explanation: "find() retourne le premier objet qui correspond. Comme c'est une référence, modifier bob.note modifie directement l'objet dans le tableau."

validations:
  - description: "Utiliser find pour Bob"
    type: code_matches
    expected: "find\\s*\\(.*id\\s*===?\\s*2"
    errorMessage: "Utilise find(e => e.id === 2) pour trouver Bob"
    successMessage: "Bien ! Tu trouves Bob"
  - description: "Modifier la note de Bob"
    type: code_matches
    expected: "\\.note\\s*=\\s*4"
    errorMessage: "Change la note de Bob à 4.0 avec bob.note = 4.0"
    successMessage: "Note mise à jour !"
  - description: "Utiliser find pour Clara"
    type: code_matches
    expected: "find\\s*\\(.*id\\s*===?\\s*3"
    errorMessage: "Utilise find(e => e.id === 3) pour trouver Clara"
    successMessage: "Clara trouvée !"
  - description: "Bob a 4.0"
    type: output_contains
    expected: "4"
    errorMessage: "La note de Bob doit être 4.0"
    successMessage: "Bob a sa nouvelle note !"
  - description: "Clara devient Claire"
    type: output_contains
    expected: "Claire"
    errorMessage: "Le nom de Clara doit devenir 'Claire'"
    successMessage: "Bravo ! Tu sais modifier des objets"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Trouver avec find"
    content: "find() retourne le premier objet qui passe le test :"
    example: "const bob = eleves.find(e => e.id === 2)\n// { id: 2, nom: \"Bob\", note: 3.5 }"
  - title: "Modifier une propriété"
    content: "Une fois l'objet trouvé, modifie ses propriétés directement :"
    example: "bob.note = 4.0\nbob.nom = \"Bobby\""
  - title: "C'est une référence !"
    content: "find() retourne l'objet original, pas une copie. Les modifications affectent le tableau."
    example: "const bob = eleves.find(e => e.id === 2)\nbob.note = 4.0\n// eleves[1].note est aussi 4.0 !"
    learnMore: "https://devjs.ch/js/objets.html"
---

# Modifier un objet dans un tableau

## 🎯 Objectif

Utiliser **find()** pour chercher un objet et modifier ses propriétés.

## 📖 Contexte

### Trouver un objet avec find()

`find()` retourne le **premier** objet qui correspond à la condition :

```javascript
const produits = [
  { id: 1, nom: "Café", prix: 4.50 },
  { id: 2, nom: "Thé", prix: 3.00 },
  { id: 3, nom: "Jus", prix: 5.00 }
]

const the = produits.find(p => p.id === 2)
// { id: 2, nom: "Thé", prix: 3.00 }

const cafe = produits.find(p => p.nom === "Café")
// { id: 1, nom: "Café", prix: 4.50 }
```

### Modifier l'objet trouvé

Une fois l'objet trouvé, on modifie ses propriétés :

```javascript
// Trouver le thé
const the = produits.find(p => p.id === 2)

// Modifier son prix
the.prix = 3.50

// Modifier son nom
the.nom = "Thé vert"

console.log(produits)
// Le produit id 2 est maintenant { id: 2, nom: "Thé vert", prix: 3.50 }
```

### C'est une référence !

`find()` retourne l'objet **original**, pas une copie. Les modifications affectent directement le tableau :

```javascript
const utilisateur = users.find(u => u.id === 1)
utilisateur.nom = "Nouveau nom"
// Le tableau users est modifié !
```

### Récapitulatif : qui modifie quoi ?

| Méthode | Modifie l'original ? | Retourne quoi ? |
|---------|---------------------|-----------------|
| `find()` | L'objet retourné **est** l'original | **Un** objet (ou undefined) |
| `filter()` | **Non** | Un **nouveau** tableau |

::alert{type="warning"}
**Attention** : `find()` retourne l'objet **original** du tableau, pas une copie. Si tu modifies l'objet trouvé, le tableau est modifié aussi !
::

```javascript
// find = un seul résultat (référence vers l'original)
const cafe = produits.find(p => p.prix > 3)
cafe.prix = 10  // modifie aussi produits[0].prix !

// filter = tous les résultats (nouveau tableau)
const chers = produits.filter(p => p.prix > 3)
```

## 📝 Consigne

1. **Complète** le `find()` pour trouver Bob (id = 2) : remplace `___` par la bonne condition
2. **Modifie** sa note à `4.0` avec `bob.note = 4.0`
3. **Trouve** Clara (id = 3) avec un deuxième `find()` et **change** son nom en `"Claire"`

**Résultat attendu :**
```
Élèves mis à jour: [{ id: 1, nom: "Alice", note: 4.5 }, { id: 2, nom: "Bob", note: 4 }, { id: 3, nom: "Claire", note: 5 }]
```
