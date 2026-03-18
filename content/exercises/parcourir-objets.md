---
title: "Parcourir des objets"
description: "Utilise forEach pour afficher les données d'un tableau d'objets"
difficulty: beginner
module: 6
exerciseNumber: "6.5"
duration: 8
tags:
  - objets
  - tableaux
  - forEach
concepts:
  - Méthode forEach
  - Fonction callback
  - Itération sur objets

starterCode: |
  const jeux = [
    { titre: "Zelda", note: 9.5 },
    { titre: "Mario", note: 9.0 },
    { titre: "Pokemon", note: 8.5 }
  ]

  // Affiche chaque jeu sous la forme : "Zelda : 9.5/10"

solution:
  code: |
    const jeux = [
      { titre: "Zelda", note: 9.5 },
      { titre: "Mario", note: 9.0 },
      { titre: "Pokemon", note: 8.5 }
    ]

    // Affiche chaque jeu sous la forme : "Zelda : 9.5/10"
    jeux.forEach(jeu => {
      console.log(jeu.titre + " : " + jeu.note + "/10")
    })
  explanation: "forEach parcourt chaque élément du tableau. À chaque tour, 'jeu' contient l'objet courant, et on accède à ses propriétés avec jeu.titre et jeu.note."

validations:
  - description: "Utiliser forEach"
    type: code_contains
    expected: "forEach"
    errorMessage: "Utilise la méthode forEach pour parcourir le tableau"
    successMessage: "Bien ! Tu utilises forEach"
  - description: "Afficher Zelda"
    type: output_contains
    expected: "Zelda"
    errorMessage: "Le titre 'Zelda' doit s'afficher"
    successMessage: "Zelda est là !"
  - description: "Afficher Mario"
    type: output_contains
    expected: "Mario"
    errorMessage: "Le titre 'Mario' doit s'afficher"
    successMessage: "Mario aussi !"
  - description: "Format avec /10"
    type: output_contains
    expected: "/10"
    errorMessage: "Ajoute '/10' après chaque note"
    successMessage: "Parfait ! Le format est bon"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Syntaxe forEach"
    content: "forEach prend une fonction qui reçoit chaque élément :"
    example: "tableau.forEach(element => {\n  console.log(element)\n})"
  - title: "Accéder aux propriétés"
    content: "Dans la fonction, accède aux propriétés de l'objet courant :"
    example: "jeux.forEach(jeu => {\n  console.log(jeu.titre)\n})"
  - title: "Concaténer les valeurs"
    content: "Utilise + pour créer le message complet :"
    example: "jeu.titre + \" : \" + jeu.note + \"/10\""
    learnMore: "https://devjs.ch/js/objets.html"
---

# Parcourir des objets

## 🎯 Objectif

Utiliser **forEach** pour afficher tous les éléments d'un tableau d'objets.

## 📖 Contexte

La méthode `forEach` permet de parcourir un tableau :

```javascript
const fruits = [
  { nom: "Pomme", prix: 2 },
  { nom: "Banane", prix: 1.5 }
]

fruits.forEach(fruit => {
  console.log(fruit.nom + " coûte " + fruit.prix + " CHF")
})
// "Pomme coûte 2 CHF"
// "Banane coûte 1.5 CHF"
```

### Comment ça marche ?

1. `forEach` parcourt chaque élément du tableau
2. À chaque tour, l'élément est passé à la fonction
3. On accède aux propriétés avec la notation point

::alert{type="info"}
**Bon à savoir** : `forEach` ne modifie pas le tableau et ne retourne rien. Il sert uniquement à **exécuter une action** pour chaque élément (comme afficher).
::

## 📝 Consigne

Parcours le tableau `jeux` et affiche chaque jeu au format :

```
Zelda : 9.5/10
Mario : 9.0/10
Pokemon : 8.5/10
```
