---
title: "Hello JavaScript !"
description: "Ton premier pas en JavaScript : apprends à afficher du texte dans la console"
difficulty: beginner
module: 1
exerciseNumber: "1.1"
duration: 5
tags:
  - console
  - débutant
  - bases
concepts:
  - Commentaires //
  - console.log()
  - Chaînes de caractères

starterCode: |
  // Exemple : affiche "Hello" dans la console
  console.log("Hello")

  // Écris ton code ici

solution:
  code: |
    // Exemple : affiche "Hello" dans la console
    console.log("Hello")

    // Mon premier programme JavaScript
    console.log("Bonjour Nuxy !")
  explanation: "Le commentaire explique ce que fait le code, puis console.log() affiche le message dans la console."

validations:
  - description: "Écrire un commentaire personnel"
    type: code_matches
    expected: "//\\s*(?!Exemple|Écris|Tapez|\\s*$)[A-ZÀ-Ÿa-zà-ÿ0-9].*"
    errorMessage: "Ajoute un commentaire personnel (// ton texte) pour expliquer ce que fait ton code"
    successMessage: "Top ! Tu as ajouté un commentaire"
  - description: "Afficher \"Bonjour Nuxy !\""
    type: output_contains
    expected: "Bonjour Nuxy !"
    errorMessage: "Le message doit être exactement \"Bonjour Nuxy !\" avec la majuscule et le point d'exclamation"
    successMessage: "Bravo ! Tu as réussi ton premier exercice JavaScript !"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "Comprendre console.log()"
    content: "La fonction console.log() affiche du texte ou des valeurs dans la console du navigateur. C'est l'outil de base pour voir ce que fait ton code."
    example: "console.log(\"Mon premier message\")"
    learnMore: "https://devjs.ch/js/interactions-avec-lutilisateur.html"
  - title: "Les guillemets sont importants"
    content: "Pour afficher du texte (une chaîne de caractères), tu dois l'entourer de guillemets simples ' ' ou doubles \" \". Sans guillemets, JavaScript pensera que c'est le nom d'une variable."
    example: "console.log(\"Bonjour\") // Correct\nconsole.log(Bonjour)  // Erreur"
  - title: "La solution complète"
    content: "Tape exactement cette ligne de code dans l'éditeur, puis clique sur \"Exécuter\" :"
    example: "console.log(\"Bonjour Nuxy !\")"
    learnMore: "https://devjs.ch/js/interactions-avec-lutilisateur.html"
---

# Hello JavaScript !

## 🎯 Objectif

Bienvenue dans ton tout premier exercice JavaScript ! Tu vas apprendre à :

- Écrire un **commentaire** pour documenter ton code
- Utiliser la **console** pour afficher du texte avec `console.log()`

C'est la première étape pour tout développeur JavaScript. Tu vas voir, c'est facile !

## 📖 Contexte

La fonction `console.log()` est l'outil le plus utilisé par les développeurs JavaScript. Elle permet d'afficher des informations dans la console du navigateur. C'est super utile pour :

- Vérifier que ton code fonctionne
- Afficher des valeurs de variables
- Déboguer (trouver des erreurs)

### Les commentaires

En JavaScript, tu peux ajouter des **commentaires** pour expliquer ton code. Les commentaires sont ignorés par JavaScript :

```javascript
// Ceci est un commentaire sur une ligne

/* Ceci est un commentaire
   sur plusieurs lignes */
```

::alert{type="info"}
**Conseil** : Les commentaires commençant par `//` sont très pratiques pour annoter ton code !
::

### Syntaxe

```javascript
console.log("Ton message ici")
```

::alert{type="info"}
**Astuce** : Les chaînes de caractères (texte) doivent être entourées de guillemets simples `'...'` ou doubles `"..."`.
::

## 📝 Consigne

1. **Écris un commentaire** (une ligne qui commence par `//`) pour décrire ce que va faire ton code
2. **Affiche un message** dans la console avec `console.log()` :

```javascript
console.log("ton message ici")
```

`console.log()` affiche ce qu'on lui donne entre parenthèses. Le texte doit être entre guillemets `"..."`.

**Résultat attendu :**

```
Bonjour Nuxy !
```

::alert{type="warning"}
**Attention** : Le message doit être **exactement** comme indiqué, avec la majuscule et le point d'exclamation !
::
