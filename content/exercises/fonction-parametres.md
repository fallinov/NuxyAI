---
title: "Fonction avec paramètres"
description: "Crée une fonction qui accepte des paramètres"
difficulty: beginner
module: 4
exerciseNumber: "4.2"
duration: 6
tags:
  - fonctions
  - paramètres
  - arguments
concepts:
  - Paramètres de fonction
  - Arguments
  - Personnalisation

starterCode: |
  // Crée une fonction "saluer" qui prend un paramètre "prenom"
  // et affiche "Bonjour [prenom] !"


  // Appelle la fonction avec "Marie"

  // Appelle la fonction avec "Lucas"

solution:
  code: |
    // Crée une fonction "saluer" qui prend un paramètre "prenom"
    function saluer(prenom) {
      console.log("Bonjour " + prenom + " !")
    }

    // Appelle la fonction avec "Marie"
    saluer("Marie")

    // Appelle la fonction avec "Lucas"
    saluer("Lucas")
  explanation: "Le paramètre 'prenom' reçoit la valeur passée lors de l'appel. À chaque appel, on peut passer une valeur différente."

validations:
  - description: "Fonction avec paramètre"
    type: code_matches
    expected: "function\\s+saluer\\s*\\(\\s*prenom\\s*\\)"
    errorMessage: "Déclare : function saluer(prenom) { ... }"
    successMessage: "Paramètre déclaré !"
  - description: "Afficher Marie"
    type: output_contains
    expected: "Marie"
    errorMessage: "Appelle saluer(\"Marie\")"
    successMessage: "Marie OK !"
  - description: "Afficher Lucas"
    type: output_contains
    expected: "Lucas"
    errorMessage: "Appelle saluer(\"Lucas\")"
    successMessage: "Lucas OK !"
  - description: "Format Bonjour"
    type: output_contains
    expected: "Bonjour"
    errorMessage: "Le message doit commencer par 'Bonjour'"
    successMessage: "Bravo !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Déclarer un paramètre"
    content: "Le paramètre se place entre les parenthèses :"
    example: "function saluer(prenom) {\n  // utiliser prenom ici\n}"
  - title: "Utiliser le paramètre"
    content: "Le paramètre est une variable utilisable dans la fonction :"
    example: "function saluer(prenom) {\n  console.log(\"Bonjour \" + prenom)\n}"
  - title: "Passer un argument"
    content: "Lors de l'appel, passe la valeur entre parenthèses :"
    example: "saluer(\"Marie\")  // prenom = \"Marie\""
    learnMore: "https://devjs.ch/js/fonctions.html"
---

# Fonction avec paramètres

## 🎯 Objectif

Créer une fonction qui accepte un **paramètre** pour personnaliser son comportement.

## 📖 Contexte

Un paramètre permet de passer des données à une fonction :

```javascript
function direAge(age) {
  console.log("Tu as " + age + " ans")
}

direAge(25)  // "Tu as 25 ans"
direAge(18)  // "Tu as 18 ans"
```

### Vocabulaire

- **Paramètre** : variable déclarée dans la fonction (`age`)
- **Argument** : valeur passée lors de l'appel (`25`, `18`)

### Plusieurs paramètres

Une fonction peut avoir plusieurs paramètres, séparés par des virgules :

```javascript
function presentation(prenom, ville) {
  console.log(prenom + " habite à " + ville)
}

presentation("Emma", "Genève")  // "Emma habite à Genève"
presentation("Tom", "Lausanne") // "Tom habite à Lausanne"
```

## 📝 Consigne

1. **Crée** une fonction `saluer` avec un paramètre `prenom`
2. La fonction affiche `"Bonjour [prenom] !"`
3. **Appelle** la fonction avec `"Marie"` puis `"Lucas"`

**Résultat attendu :**
```
Bonjour Marie !
Bonjour Lucas !
```
