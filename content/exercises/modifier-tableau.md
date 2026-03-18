---
title: "Modifier un tableau"
description: "Ajoute et supprime des éléments avec push, pop, shift et unshift"
difficulty: beginner
module: 5
exerciseNumber: "5.3"
duration: 7
tags:
  - tableaux
  - push
  - pop
  - méthodes
concepts:
  - push() - ajouter à la fin
  - pop() - supprimer à la fin
  - unshift() - ajouter au début
  - shift() - supprimer au début

starterCode: |
  const taches = ["Faire les courses", "Répondre aux emails"]

  // 1. Ajoute "Appeler le médecin" à la fin du tableau

  // 2. Ajoute "Urgent: backup" au début du tableau

  // 3. Supprime la dernière tâche

  // Affiche le tableau final
  console.log(taches)

solution:
  code: |
    const taches = ["Faire les courses", "Répondre aux emails"]

    // 1. Ajoute "Appeler le médecin" à la fin du tableau
    taches.push("Appeler le médecin")

    // 2. Ajoute "Urgent: backup" au début du tableau
    taches.unshift("Urgent: backup")

    // 3. Supprime la dernière tâche
    taches.pop()

    // Affiche le tableau final
    console.log(taches)
  explanation: "push/pop pour la fin, unshift/shift pour le début. Ces méthodes modifient le tableau original."

validations:
  - description: "Utiliser push()"
    type: code_matches
    expected: "taches\\.push\\s*\\("
    errorMessage: "Essaie taches.push() pour ajouter à la fin"
    successMessage: "Bien ! Tu sais ajouter à la fin"
  - description: "Ajouter Appeler le médecin"
    type: code_matches
    expected: "push\\s*\\([\"']Appeler le médecin[\"']\\)"
    errorMessage: "N'oublie pas d'ajouter \"Appeler le médecin\""
    successMessage: "Tâche bien ajoutée !"
  - description: "Utiliser unshift()"
    type: code_matches
    expected: "taches\\.unshift\\s*\\("
    errorMessage: "Essaie taches.unshift() pour ajouter au début"
    successMessage: "Top ! Tu maîtrises unshift()"
  - description: "Utiliser pop()"
    type: code_matches
    expected: "taches\\.pop\\s*\\(\\s*\\)"
    errorMessage: "Utilise taches.pop() pour supprimer le dernier"
    successMessage: "Bravo ! Tu sais modifier un tableau"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Méthodes de fin"
    content: "push() ajoute à la fin, pop() supprime à la fin."
    example: "const t = [1, 2]\nt.push(3)  // [1, 2, 3]\nt.pop()    // [1, 2]"
  - title: "Méthodes de début"
    content: "unshift() ajoute au début, shift() supprime au début."
    example: "const t = [1, 2]\nt.unshift(0)  // [0, 1, 2]\nt.shift()     // [1, 2]"
  - title: "Solution"
    content: "Voici les 3 opérations :"
    example: "taches.push(\"Appeler le médecin\")\ntaches.unshift(\"Urgent: backup\")\ntaches.pop()"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Modifier un tableau

## 🎯 Objectif

Utiliser les **méthodes** pour ajouter et supprimer des éléments.

## 📖 Contexte

JavaScript offre 4 méthodes principales pour modifier un tableau :

### Fin du tableau

| Méthode | Action | Retourne |
|---------|--------|----------|
| `push(élément)` | Ajoute à la fin | Nouvelle longueur |
| `pop()` | Supprime le dernier | Élément supprimé |

```javascript
const fruits = ["pomme", "banane"]
fruits.push("orange")  // ["pomme", "banane", "orange"]
fruits.pop()           // ["pomme", "banane"]
```

### Début du tableau

| Méthode | Action | Retourne |
|---------|--------|----------|
| `unshift(élément)` | Ajoute au début | Nouvelle longueur |
| `shift()` | Supprime le premier | Élément supprimé |

```javascript
const fruits = ["pomme", "banane"]
fruits.unshift("kiwi")  // ["kiwi", "pomme", "banane"]
fruits.shift()          // ["pomme", "banane"]
```

::alert{type="warning"}
**Important** : Les méthodes `push()`, `pop()`, `shift()` et `unshift()` **modifient directement** le tableau original.
::

## 📝 Consigne

Modifie le tableau `taches` :

1. Ajoute `"Appeler le médecin"` **à la fin**
2. Ajoute `"Urgent: backup"` **au début**
3. Supprime la **dernière** tâche

Résultat attendu : `["Urgent: backup", "Faire les courses", "Répondre aux emails"]`
