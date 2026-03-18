---
title: "Première condition"
description: "Apprends à exécuter du code selon une condition avec if...else"
difficulty: beginner
module: 2
exerciseNumber: "2.1"
duration: 8
tags:
  - conditions
  - if
  - else
  - débutant
concepts:
  - if...else
  - Blocs de code {}
  - Conditions booléennes

starterCode: |
  // L'âge d'un utilisateur
  let age = 17

  // Écris ta condition ici

solution:
  code: |
    // L'âge d'un utilisateur
    let age = 17

    // Vérifie si l'utilisateur est majeur
    if (age >= 18) {
      console.log("Accès autorisé")
    } else {
      console.log("Accès refusé")
    }
  explanation: "La condition `age >= 18` est évaluée. Comme age vaut 17, la condition est fausse et le bloc `else` est exécuté."

validations:
  - description: "Utiliser la structure if"
    type: code_contains
    expected: "if"
    errorMessage: "Utilise la structure if pour créer une condition"
    successMessage: "Bien ! Tu utilises if"
  - description: "Utiliser la structure else"
    type: code_contains
    expected: "else"
    errorMessage: "Ajoute un bloc else pour gérer le cas contraire"
    successMessage: "Parfait ! Tu gères les deux cas"
  - description: "Comparer avec 18"
    type: code_matches
    expected: "(>=\\s*18|18\\s*<=|>\\s*17|17\\s*<)"
    errorMessage: "Compare l'âge avec 18 (ou >17) pour déterminer si la personne est majeure"
    successMessage: "Bonne comparaison !"
  - description: "Afficher 'Accès refusé' pour 17 ans"
    type: output_contains
    expected: "Accès refusé"
    errorMessage: "Avec age = 17, le message 'Accès refusé' devrait s'afficher"
    successMessage: "Bravo ! La condition fonctionne !"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "Structure d'une condition"
    content: "Une condition if...else permet d'exécuter un bloc de code si la condition est vraie, et un autre bloc si elle est fausse."
    example: "if (condition) {\n  // code si vrai\n} else {\n  // code si faux\n}"
    learnMore: "https://devjs.ch/js/conditions.html"
  - title: "Les opérateurs de comparaison"
    content: "Pour comparer des nombres, utilise >= (supérieur ou égal), <= (inférieur ou égal), > (supérieur), < (inférieur)."
    example: "age >= 18 // vrai si age est 18 ou plus"
  - title: "La solution"
    content: "Teste si l'âge est supérieur ou égal à 18 :"
    example: "if (age >= 18) {\n  console.log(\"Accès autorisé\")\n} else {\n  console.log(\"Accès refusé\")\n}"
    learnMore: "https://devjs.ch/js/conditions.html"
---

# Première condition

## 🎯 Objectif

Dans cet exercice, tu vas apprendre à :

- Créer ta première **condition** avec `if...else`
- Exécuter différents codes selon qu'une condition est **vraie** ou **fausse**
- Utiliser les **opérateurs de comparaison** (`>=`, `<=`, `>`, `<`)

## 📖 Contexte

En programmation, on a souvent besoin d'exécuter du code uniquement si certaines conditions sont remplies. C'est le rôle de la structure **if...else**.

### Syntaxe de base

```javascript
if (condition) {
  // Code exécuté si la condition est vraie
} else {
  // Code exécuté si la condition est fausse
}
```

### Exemple concret

```javascript
let temperature = 30

if (temperature > 25) {
  console.log("Il fait chaud !")
} else {
  console.log("Il fait frais")
}
// Affiche : "Il fait chaud !"
```

::alert{type="info"}
**Important** : La condition entre parenthèses doit retourner `true` (vrai) ou `false` (faux). On appelle cela une **expression booléenne**.
::

### Les opérateurs de comparaison

| Opérateur | Signification |
|-----------|---------------|
| `>` | Supérieur à |
| `<` | Inférieur à |
| `>=` | Supérieur ou égal à |
| `<=` | Inférieur ou égal à |

## 📝 Consigne

Tu développes un système de vérification d'âge pour l'accès à un site.

1. **Crée une condition** qui vérifie si `age` est supérieur ou égal à 18
2. **Si oui**, affiche `"Accès autorisé"` dans la console
3. **Sinon**, affiche `"Accès refusé"` dans la console

**Résultat attendu :**

```
Accès refusé
```

::alert{type="warning"}
**Attention** : Avec `age = 17`, le message "Accès refusé" doit s'afficher !
::

::alert{type="info"}
**Astuce** : Teste ton code en changeant la valeur de `age` pour vérifier que les deux cas fonctionnent (essaie avec 18, 20, 15...).
::
