---
title: "Conditions multiples"
description: "Gère plusieurs cas avec else if et crée des conditions complexes"
difficulty: beginner
module: 2
exerciseNumber: "2.4"
duration: 12
tags:
  - conditions
  - else if
  - cascade
concepts:
  - Structure if...else if...else
  - Conditions en cascade
  - Ordre des conditions

starterCode: |
  // Note d'un étudiant (sur 6)
  let note = 4.5

  // Déterminer la mention selon la note :
  // - 6 : "Excellent"
  // - 5 à 5.9 : "Très bien"
  // - 4 à 4.9 : "Bien"
  // - 3 à 3.9 : "Suffisant"
  // - Moins de 3 : "Insuffisant"

solution:
  code: |
    // Note d'un étudiant (sur 6)
    let note = 4.5

    // Déterminer la mention selon la note
    if (note === 6) {
      console.log("Excellent")
    } else if (note >= 5) {
      console.log("Très bien")
    } else if (note >= 4) {
      console.log("Bien")
    } else if (note >= 3) {
      console.log("Suffisant")
    } else {
      console.log("Insuffisant")
    }
  explanation: "Les conditions sont testées dans l'ordre. Dès qu'une est vraie, son bloc s'exécute et les suivantes sont ignorées. Avec note=4.5, c'est 'Bien' qui s'affiche car 4.5 >= 4 est la première condition vraie rencontrée."

validations:
  - description: "Utiliser else if"
    type: code_contains
    expected: "else if"
    errorMessage: "Utilise 'else if' pour gérer les différentes plages de notes"
    successMessage: "Bien ! Tu utilises else if"
  - description: "Tester la note 6"
    type: code_matches
    expected: "(>=?\\s*6|===?\\s*6|6\\s*<=?|6\\s*===?)"
    errorMessage: "Vérifie le cas où la note est exactement 6"
    successMessage: "Cas note=6 géré !"
  - description: "Afficher 'Bien' pour 4.5"
    type: output_contains
    expected: "Bien"
    errorMessage: "Avec note=4.5, la mention 'Bien' devrait s'afficher (note entre 4 et 4.9)"
    successMessage: "Bravo ! La mention correspond à la note !"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "Structure else if"
    content: "Quand tu as plusieurs cas possibles, utilise else if pour les tester successivement. Dès qu'une condition est vraie, les suivantes sont ignorées."
    example: "if (condition1) {\n  // cas 1\n} else if (condition2) {\n  // cas 2\n} else {\n  // cas par défaut\n}"
  - title: "Ordre des conditions"
    content: "L'ordre est important ! Teste du plus spécifique au plus général. Si tu testes 'note >= 3' avant 'note >= 5', toute note >= 3 satisfera la première condition."
    example: "// Bon ordre :\nif (note === 6) { ... }\nelse if (note >= 5) { ... }  // 5 à 5.9\nelse if (note >= 4) { ... }  // 4 à 4.9"
  - title: "La solution complète"
    content: "Teste chaque plage de notes dans l'ordre décroissant :"
    example: "if (note === 6) {\n  console.log(\"Excellent\")\n} else if (note >= 5) {\n  console.log(\"Très bien\")\n} else if (note >= 4) {\n  console.log(\"Bien\")\n} else if (note >= 3) {\n  console.log(\"Suffisant\")\n} else {\n  console.log(\"Insuffisant\")\n}"
    learnMore: "https://devjs.ch/js/conditions.html"
---

# Conditions multiples

## 🎯 Objectif

Dans cet exercice, tu vas apprendre à :

- Gérer **plusieurs cas** avec la structure `if...else if...else`
- Organiser tes conditions dans le **bon ordre**
- Éviter les pièges des conditions en cascade

## 📖 Contexte

Quand tu as plus de deux cas possibles, un simple `if...else` ne suffit plus. La structure `else if` permet de tester plusieurs conditions successivement.

### Syntaxe if...else if...else

```javascript
let heure = 14

if (heure < 12) {
  console.log("Bonjour !")
} else if (heure < 18) {
  console.log("Bon après-midi !")
} else if (heure < 22) {
  console.log("Bonsoir !")
} else {
  console.log("Bonne nuit !")
}
// Affiche : "Bon après-midi !"
```

### Comment ça fonctionne ?

1. JavaScript teste la **première condition**
2. Si elle est **vraie**, il exécute son bloc et **ignore le reste**
3. Si elle est **fausse**, il passe à la condition suivante
4. Le bloc `else` final s'exécute si **aucune** condition n'est vraie

::alert{type="warning"}
**Attention à l'ordre !** Les conditions sont testées de haut en bas. Place les conditions les plus spécifiques en premier.
::

### Exemple de piège

```javascript
let note = 5.5

// ❌ Mauvais ordre - "Suffisant" s'affiche pour 5.5 !
if (note >= 3) {
  console.log("Suffisant")
} else if (note >= 5) {
  console.log("Très bien")  // Jamais atteint pour les notes >= 3
}

// ✅ Bon ordre
if (note >= 5) {
  console.log("Très bien")  // S'affiche pour 5.5
} else if (note >= 3) {
  console.log("Suffisant")
}
```

## 📝 Consigne

Tu développes un système de mentions pour les notes d'examen (système suisse sur 6).

Crée une structure `if...else if...else` qui affiche la mention selon la note :

| Note | Mention |
|------|---------|
| 6 | Excellent |
| 5 à 5.9 | Très bien |
| 4 à 4.9 | Bien |
| 3 à 3.9 | Suffisant |
| Moins de 3 | Insuffisant |

**Résultat attendu (avec note = 4.5) :**

```
Bien
```

::alert{type="info"}
**Avec `note = 4.5`**, le programme doit afficher `"Bien"`.
::

::alert{type="info"}
**Conseil** : Teste ton code avec différentes valeurs de `note` (6, 5.5, 4, 2.5...) pour vérifier que chaque mention s'affiche correctement !
::
