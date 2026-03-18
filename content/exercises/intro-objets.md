---
title: "Module 6 : Objets"
description: "Structure tes données avec les objets JavaScript"
difficulty: beginner
order: 60
module: 6
exerciseNumber: "6.0"
duration: 3
exerciseType: intro
tags:
  - introduction
concepts:
  - Création d'objets
  - Accès aux propriétés
  - Modification de propriétés
  - Méthodes d'objet
  - Parcourir un objet
  - Destructuring
---

## Ce que tu vas apprendre

Un tableau, c'est une liste. Mais parfois, tu as besoin de regrouper des informations **liées entre elles** : le nom, l'âge et l'email d'un utilisateur par exemple.

Les **objets** te permettent de structurer tes données avec des **paires clé-valeur**. C'est le format de données le plus utilisé en JavaScript (et sur le web en général, via JSON).

## Au programme

Dans ce module, tu vas maîtriser :

1. **Créer un objet** avec des propriétés
2. **Accéder aux propriétés** (notation point et crochets)
3. **Modifier et ajouter** des propriétés
4. **Les méthodes** — des fonctions dans un objet
5. **Parcourir un objet** (`for...in`, `Object.keys()`, `Object.entries()`)
6. **Le destructuring** — extraire des valeurs rapidement

## Pourquoi c'est important

Quand tu récupères des données d'une API (un utilisateur, un produit, un article), elles arrivent sous forme d'**objet**. Savoir les manipuler est indispensable :

```js
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com"
}
```

Chaque réponse d'API, chaque configuration, chaque composant utilise des objets. C'est un concept central.

## Prêt ?

On commence avec les bases, puis on monte en puissance. Tu vas adorer travailler avec les objets !
