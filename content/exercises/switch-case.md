---
title: "Le switch/case"
description: "Utilise switch/case pour choisir entre plusieurs valeurs possibles"
difficulty: beginner
module: 2
exerciseNumber: "2.5"
duration: 8
tags:
  - conditions
  - switch
  - case
concepts:
  - Structure switch/case
  - Mot-clé break
  - Clause default
  - Comparaison avec if/else if

starterCode: |
  // === PARTIE 1 : Jour de la semaine ===
  // Afficher le nom du jour en français selon le numéro (1-7)
  const jour = 3

  // Remplace les ... par les bonnes valeurs
  switch (/* variable */) {
    case /* valeur */:
      console.log("lundi")
      break
    case /* valeur */:
      console.log("mardi")
      break
    // Continue pour les autres jours...

    default:
      console.log("Numéro invalide")
  }

  // === PARTIE 2 : Feu de signalisation ===
  // Afficher l'action selon la couleur du feu
  const couleurFeu = "orange"

  switch (/* variable */) {
    case /* valeur */:
      console.log("Tu peux passer")
      break
    case /* valeur */:
      console.log("Attention, ralentis")
      break
    case /* valeur */:
      console.log("Stop, arrête-toi")
      break
    default:
      console.log("Couleur inconnue")
  }

solution:
  code: |
    // === PARTIE 1 : Jour de la semaine ===
    const jour = 3

    switch (jour) {
      case 1:
        console.log("lundi")
        break
      case 2:
        console.log("mardi")
        break
      case 3:
        console.log("mercredi")
        break
      case 4:
        console.log("jeudi")
        break
      case 5:
        console.log("vendredi")
        break
      case 6:
        console.log("samedi")
        break
      case 7:
        console.log("dimanche")
        break
      default:
        console.log("Numéro invalide")
    }

    // === PARTIE 2 : Feu de signalisation ===
    const couleurFeu = "orange"

    switch (couleurFeu) {
      case "vert":
        console.log("Tu peux passer")
        break
      case "orange":
        console.log("Attention, ralentis")
        break
      case "rouge":
        console.log("Stop, arrête-toi")
        break
      default:
        console.log("Couleur inconnue")
    }
  explanation: "Le switch compare la valeur entre parenthèses avec chaque case. Quand il trouve une correspondance, il exécute le code jusqu'au break. Avec jour=3, c'est le case 3 qui s'exécute. Avec couleurFeu='orange', c'est le case 'orange'."

validations:
  - description: "Utiliser switch"
    type: code_contains
    expected: "switch"
    errorMessage: "Utilise la structure switch pour gérer les différents cas"
    successMessage: "Bien ! Tu utilises switch"
  - description: "Utiliser case"
    type: code_contains
    expected: "case"
    errorMessage: "Ajoute des case pour chaque valeur possible"
    successMessage: "Parfait ! Tu définis des case"
  - description: "Utiliser break"
    type: code_contains
    expected: "break"
    errorMessage: "N'oublie pas le break après chaque case, sinon tous les cas suivants s'exécutent aussi !"
    successMessage: "Top ! Tu n'oublies pas le break"
  - description: "Afficher mercredi pour jour=3"
    type: output_contains
    expected: "mercredi"
    errorMessage: "Avec jour=3, le mot 'mercredi' devrait s'afficher"
    successMessage: "Mercredi bien affiché !"
  - description: "Afficher l'action pour le feu orange"
    type: output_contains
    expected: "Attention, ralentis"
    errorMessage: "Avec couleurFeu='orange', le message 'Attention, ralentis' devrait s'afficher"
    successMessage: "Bravo ! Le feu de signalisation fonctionne !"
  - description: "Pas d'erreur d'exécution"
    type: no_error

hints:
  - title: "La structure switch"
    content: "Le switch compare une valeur avec plusieurs cas possibles. C'est plus lisible qu'une longue chaîne de if/else if quand on compare une même variable à des valeurs fixes."
    example: "switch (variable) {\n  case valeur1:\n    // code\n    break\n  case valeur2:\n    // code\n    break\n  default:\n    // si aucun case ne correspond\n}"
    learnMore: "https://devjs.ch/js/conditions.html"
  - title: "Pourquoi le break ?"
    content: "Sans break, JavaScript continue d'exécuter les case suivants ! C'est ce qu'on appelle le 'fall-through'. Mets toujours un break sauf si tu veux volontairement regrouper des cas."
    example: "// Sans break :\nswitch (1) {\n  case 1:\n    console.log('un')   // exécuté\n  case 2:\n    console.log('deux')  // aussi exécuté !\n}"
  - title: "La solution complète"
    content: "Remplace les ___ par les bonnes valeurs :"
    example: "switch (jour) {\n  case 1:\n    console.log('lundi')\n    break\n  case 2:\n    console.log('mardi')\n    break\n  case 3:\n    console.log('mercredi')\n    break\n  // ...\n}"
    learnMore: "https://devjs.ch/js/conditions.html"
---

# Le switch/case

## 🎯 Objectif

Dans cet exercice, tu vas apprendre à :

- Utiliser la structure **switch/case** pour choisir entre plusieurs valeurs
- Comprendre le rôle du **break** et du **default**
- Savoir quand utiliser switch plutôt que if/else if

## 📖 Contexte

Quand tu dois comparer une même variable à plusieurs valeurs précises, la structure `switch/case` est plus claire qu'une longue chaîne de `if...else if`.

### Syntaxe du switch

```javascript
let fruit = "pomme"

switch (fruit) {
  case "pomme":
    console.log("C'est une pomme")
    break
  case "banane":
    console.log("C'est une banane")
    break
  default:
    console.log("Fruit inconnu")
}
// Affiche : "C'est une pomme"
```

### Comment ça fonctionne ?

1. JavaScript évalue l'expression entre parenthèses (`fruit`)
2. Il compare le résultat avec chaque `case` (comparaison stricte `===`)
3. Quand il trouve une correspondance, il exécute le code
4. Le `break` arrête l'exécution du switch
5. Si aucun case ne correspond, le bloc `default` s'exécute

### switch vs if/else if

| Utilise **switch** quand... | Utilise **if/else if** quand... |
|---|---|
| Tu compares une variable à des **valeurs fixes** | Tu testes des **plages** ou **conditions complexes** |
| `jour === 1`, `couleur === "vert"` | `note >= 4`, `age > 18 && membre` |

::alert{type="warning"}
**Attention au break !** Sans `break`, JavaScript exécute tous les `case` suivants. C'est le piège classique du switch.
::

### Exemple sans break (piège)

```javascript
let note = 1

switch (note) {
  case 1:
    console.log("un")     // exécuté
  case 2:
    console.log("deux")   // aussi exécuté !
  case 3:
    console.log("trois")  // aussi exécuté !
}
// Affiche : "un", "deux", "trois"
```

## 📝 Consigne

Tu vas utiliser `switch/case` dans deux situations concrètes.

**Partie 1** : Affiche le nom du jour en français selon le numéro (1 = lundi, 2 = mardi, ..., 7 = dimanche). La variable `jour` vaut `3`.

**Partie 2** : Affiche l'action à faire selon la couleur du feu de signalisation. La variable `couleurFeu` vaut `"orange"`.

| Couleur | Action |
|---------|--------|
| `"vert"` | `"Tu peux passer"` |
| `"orange"` | `"Attention, ralentis"` |
| `"rouge"` | `"Stop, arrête-toi"` |

**Résultat attendu :**

```
mercredi
Attention, ralentis
```

::alert{type="info"}
**Astuce** : Remplace les `___` par les bonnes valeurs. N'oublie pas le `break` après chaque case !
::

::alert{type="info"}
**Conseil** : Teste ton code en changeant la valeur de `jour` (1 à 7) et de `couleurFeu` ("vert", "orange", "rouge") pour vérifier que tous les cas fonctionnent.
::
