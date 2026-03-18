---
title: "L'opérateur ternaire"
description: "Ecris des conditions courtes en une seule ligne avec l'opérateur ternaire"
difficulty: beginner
module: 2
exerciseNumber: "2.6"
duration: 6
tags:
  - conditions
  - ternaire
  - condition
concepts:
  - Opérateur ternaire (condition ? valeur1 : valeur2)
  - Assignation conditionnelle
  - Raccourci pour if/else simple

starterCode: |
  // === PARTIE 1 : Majeur ou mineur ? ===
  const age = 17

  // Utilise l'opérateur ternaire pour définir statut
  // Si age >= 18 → "majeur", sinon → "mineur"
  // Exemple : const x = condition ? "oui" : "non"
  const statut = /* ton ternaire ici */ "?"

  console.log(statut)

  // === PARTIE 2 : Réussi ou échoué ? ===
  const note = 4.5

  // Si note >= 4 → "Réussi", sinon → "Échoué"
  const resultat = /* ton ternaire ici */ "?"

  console.log(resultat)

  // === PARTIE 3 : Chaud ou frais ? ===
  const temperature = 32

  // Si temperature >= 25 → "Chaud", sinon → "Frais"
  const meteo = /* ton ternaire ici */ "?"

  console.log(meteo)

solution:
  code: |
    // === PARTIE 1 : Majeur ou mineur ? ===
    const age = 17

    const statut = age >= 18 ? "majeur" : "mineur"

    console.log(statut)

    // === PARTIE 2 : Réussi ou échoué ? ===
    const note = 4.5

    const resultat = note >= 4 ? "Réussi" : "Échoué"

    console.log(resultat)

    // === PARTIE 3 : Chaud ou frais ? ===
    const temperature = 32

    const meteo = temperature >= 25 ? "Chaud" : "Frais"

    console.log(meteo)
  explanation: "L'opérateur ternaire fonctionne comme un if/else condensé en une ligne. La condition avant le ? est évaluée : si elle est vraie, la valeur avant les : est retournée, sinon c'est la valeur après les :."

validations:
  - description: "Utiliser l'opérateur ternaire (? :)"
    type: code_matches
    expected: "\\?.*:"
    errorMessage: "Utilise l'opérateur ternaire avec la syntaxe : condition ? valeur1 : valeur2"
    successMessage: "Bien ! Tu utilises l'opérateur ternaire"
  - description: "Afficher 'mineur' pour age=17"
    type: output_contains
    expected: "mineur"
    errorMessage: "Avec age=17, le statut devrait être 'mineur'"
    successMessage: "Parfait ! 17 ans = mineur"
  - description: "Afficher 'Réussi' pour note=4.5"
    type: output_contains
    expected: "Réussi"
    errorMessage: "Avec note=4.5, le résultat devrait être 'Réussi' (>= 4)"
    successMessage: "Top ! 4.5 c'est réussi"
  - description: "Afficher 'Chaud' pour temperature=32"
    type: output_contains
    expected: "Chaud"
    errorMessage: "Avec temperature=32, la météo devrait être 'Chaud' (>= 25)"
    successMessage: "Bravo ! Tu maîtrises l'opérateur ternaire !"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "La syntaxe ternaire"
    content: "L'opérateur ternaire est un raccourci pour un if/else simple. Il s'écrit en une seule ligne et retourne directement une valeur."
    example: "// Avec if/else :\nlet resultat\nif (condition) {\n  resultat = 'oui'\n} else {\n  resultat = 'non'\n}\n\n// Avec ternaire :\nconst resultat = condition ? 'oui' : 'non'"
    learnMore: "https://devjs.ch/js/conditions.html"
  - title: "Comment le lire ?"
    content: "Lis-le comme une question : 'Est-ce que la condition est vraie ? Si oui, prends cette valeur. Sinon, prends celle-là.'"
    example: "const statut = age >= 18 ? 'majeur' : 'mineur'\n//             ^^^^^^^^    ^^^^^^^^   ^^^^^^^^\n//             condition   si vrai    si faux"
  - title: "La solution complète"
    content: "Remplace chaque ___ par une expression ternaire :"
    example: "const statut = age >= 18 ? 'majeur' : 'mineur'\nconst resultat = note >= 4 ? 'Réussi' : 'Échoué'\nconst meteo = temperature >= 25 ? 'Chaud' : 'Frais'"
    learnMore: "https://devjs.ch/js/conditions.html"
---

# L'opérateur ternaire

## 🎯 Objectif

Dans cet exercice, tu vas apprendre à :

- Écrire des conditions **courtes** avec l'opérateur ternaire
- Assigner une valeur à une variable **selon une condition**
- Savoir quand utiliser le ternaire plutôt que if/else

## 📖 Contexte

Parfois, tu as juste besoin d'assigner une valeur selon une condition simple. Au lieu d'écrire 5 lignes de if/else, l'opérateur ternaire te permet de le faire en **une seule ligne**.

### Syntaxe

```javascript
const resultat = condition ? valeurSiVrai : valeurSiFaux
```

C'est l'équivalent de :

```javascript
let resultat
if (condition) {
  resultat = valeurSiVrai
} else {
  resultat = valeurSiFaux
}
```

### Exemples concrets

```javascript
const age = 20
const acces = age >= 18 ? "autorisé" : "refusé"
console.log(acces)  // "autorisé"

const heure = 14
const salut = heure < 12 ? "Bonjour" : "Bonsoir"
console.log(salut)  // "Bonsoir"

const score = 85
const niveau = score >= 50 ? "Réussi" : "Échoué"
console.log(niveau)  // "Réussi"
```

### Quand utiliser le ternaire ?

| Utilise le **ternaire** quand... | Utilise **if/else** quand... |
|---|---|
| Tu assignes **une valeur** selon une condition simple | Tu as **plusieurs instructions** à exécuter |
| Le code reste **lisible sur une ligne** | La logique est **complexe** |
| C'est un choix entre **deux options** | Tu as **plus de deux cas** |

::alert{type="warning"}
**Attention** : N'imbrique pas les ternaires ! `a ? b ? c : d : e` est illisible. Utilise if/else dans ce cas.
::

### Utilisation directe dans console.log

Tu peux aussi utiliser le ternaire directement dans un `console.log` :

```javascript
const connecte = true
console.log(connecte ? "En ligne" : "Hors ligne")
// Affiche : "En ligne"
```

## 📝 Consigne

Utilise l'opérateur ternaire pour assigner des valeurs à trois variables selon des conditions.

**Partie 1** : `age = 17` → assigne `"majeur"` ou `"mineur"` à `statut` (seuil : 18)

**Partie 2** : `note = 4.5` → assigne `"Réussi"` ou `"Échoué"` à `resultat` (seuil : 4)

**Partie 3** : `temperature = 32` → assigne `"Chaud"` ou `"Frais"` à `meteo` (seuil : 25)

**Résultat attendu :**

```
mineur
Réussi
Chaud
```

::alert{type="info"}
**Astuce** : Remplace chaque `___` par une expression ternaire de la forme `condition ? valeur1 : valeur2`.
::

::alert{type="info"}
**Conseil** : Teste ton code en changeant les valeurs de `age`, `note` et `temperature` pour vérifier que les deux cas fonctionnent à chaque fois !
::
