---
title: "La boucle while"
description: "Répète des instructions quand on ne sait pas combien de fois"
difficulty: beginner
module: 3
exerciseNumber: "3.1"
duration: 8
tags:
  - boucle
  - while
  - condition
concepts:
  - while
  - Condition d'arrêt
  - Nombre d'itérations inconnu

starterCode: |
  // 1. Tu as 1 CHF. Chaque jour, ton argent double.
  // Combien de jours pour dépasser 1000 CHF ?
  let argent = 1
  let jours = 0

  // Complète la condition et le calcul du doublement :
  // while (???) {
  //   argent = ???
  //   jours++
  //   console.log("Jour " + jours + " : " + argent + " CHF")
  // }

  console.log("Il faut " + jours + " jours pour dépasser 1000 CHF !")

  // 2. Combat : tu as 100 PV et perds 7 PV par tour
  // Combien de tours avant le K.O. ?
  let pv = 100
  let tours = 0

  // Complète la condition et la perte de PV :
  // while (???) {
  //   pv = ???
  //   tours++
  //   console.log("Tour " + tours + " : " + pv + " PV")
  // }

  console.log("K.O. après " + tours + " tours !")

solution:
  code: |
    // 1. Tu as 1 CHF. Chaque jour, ton argent double.
    let argent = 1
    let jours = 0

    while (argent < 1000) {
      argent = argent * 2
      jours++
      console.log("Jour " + jours + " : " + argent + " CHF")
    }

    console.log("Il faut " + jours + " jours pour dépasser 1000 CHF !")

    // 2. Combat : tu as 100 PV et perds 7 PV par tour
    let pv = 100
    let tours = 0

    while (pv > 0) {
      pv = pv - 7
      tours++
      console.log("Tour " + tours + " : " + pv + " PV")
    }

    console.log("K.O. après " + tours + " tours !")
  explanation: "while est idéal quand on ne sait pas combien de fois répéter : on double l'argent sans savoir quand il dépassera 1000, on perd des PV sans savoir quand ce sera le K.O."

validations:
  - description: "Condition while pour l'argent"
    type: code_matches
    expected: "while\\s*\\(\\s*argent\\s*<=?\\s*(999|1000|1001)\\s*\\)"
    errorMessage: "Essaie while (argent < 1000) pour doubler tant que tu n'as pas 1000 CHF"
    successMessage: "Bien ! On continue tant que l'argent est sous 1000"
  - description: "Doubler l'argent"
    type: code_matches
    expected: "argent\\s*=\\s*(argent\\s*\\*\\s*2|2\\s*\\*\\s*argent)|argent\\s*\\*=\\s*2"
    errorMessage: "Double l'argent avec argent = argent * 2"
    successMessage: "Super ! L'argent double chaque jour"
  - description: "Condition while pour les PV"
    type: code_matches
    expected: "while\\s*\\(\\s*pv\\s*>=?\\s*(0|1)\\s*\\)"
    errorMessage: "Essaie while (pv > 0) pour continuer tant que tu as des PV"
    successMessage: "Bien ! Le combat continue tant que tu as des PV"
  - description: "Perdre des PV"
    type: code_matches
    expected: "pv\\s*=\\s*pv\\s*-\\s*7|pv\\s*-=\\s*7"
    errorMessage: "Perds 7 PV par tour : pv = pv - 7"
    successMessage: "Parfait ! Tu perds 7 PV par tour"
  - description: "Résultat du doublement"
    type: output_contains
    expected: "10 jours"
    errorMessage: "Il faut 10 jours pour dépasser 1000 CHF en doublant (1→2→4→...→1024)"
    successMessage: "10 jours, la puissance des doublements !"
  - description: "Résultat du combat"
    type: output_contains
    expected: "15 tours"
    errorMessage: "Le K.O. devrait arriver après 15 tours (100 - 15×7 = -5)"
    successMessage: "Bravo ! Tu maîtrises while"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Quand utiliser while ?"
    content: "Utilise while quand tu NE SAIS PAS combien de fois répéter. Ici, combien de doublements pour dépasser 1000 ? On ne le sait pas à l'avance !"
    example: "let argent = 1\n\nwhile (argent < 1000) {\n  argent = argent * 2\n}\n// Résultat : 1024 (après 10 doublements)"
  - title: "Tant que les PV sont positifs"
    content: "Le combat continue tant qu'il reste des PV (pv > 0). À chaque tour, on perd 7 PV :"
    example: "while (pv > 0) {\n  pv = pv - 7\n  // Tour 1 : 93 PV\n  // Tour 2 : 86 PV\n  // ...\n  // Tour 15 : -5 PV → K.O. !\n}"
  - title: "while vs for"
    content: "Utilise for quand tu SAIS combien de fois (ex: de 1 à 10). Utilise while quand tu NE SAIS PAS (ex: doubler jusqu'à dépasser 1000)."
    learnMore: "https://devjs.ch/js/boucles.html"
---

# La boucle while

## 🎯 Objectif

Utiliser **while** pour répéter des instructions quand on **ne sait pas combien de fois** il faudra répéter.

## 📖 Contexte

### Quand utiliser while ?

`while` est utile quand le **nombre de répétitions est inconnu**. On sait juste quand s'arrêter :

```javascript
// On double l'argent jusqu'à dépasser un seuil
let argent = 1

while (argent < 1000) {
  argent = argent * 2
}

console.log(argent)  // 1024
```

On ne savait pas que ça prendrait **10 doublements**. C'est `while` qui a compté pour nous !

### Comment ça fonctionne ?

1. **Vérifier** la condition → `argent < 1000` ?
2. Si `true` → **exécuter** le bloc
3. **Revenir** à l'étape 1
4. Si `false` → **sortir** de la boucle

### while vs for

| Boucle | Quand l'utiliser | Exemple |
|--------|-----------------|---------|
| `for` | Nombre de répétitions **connu** | Afficher de 1 à 10 |
| `while` | Nombre de répétitions **inconnu** | Doubler jusqu'à dépasser 1000 |

```javascript
// for : on SAIT qu'on veut 5 tours
for (let i = 1; i <= 5; i++) {
  console.log(i)
}

// while : on NE SAIT PAS combien de tours
let n = 1
while (n < 100) {
  n = n * 3  // 3, 9, 27, 81, 243 → 5 tours ? On ne le savait pas !
}
```

::alert{type="warning"}
**Attention aux boucles infinies !** Si la condition reste toujours `true`, la boucle ne s'arrête jamais et le navigateur se bloque. Assure-toi que quelque chose change dans le bloc pour que la condition finisse par devenir `false`.
::

## 📝 Consigne

1. **Argent** : Remplace `___` par la condition `argent < 1000` et le doublement `argent * 2`
2. **Combat** : Remplace `___` par la condition `pv > 0` et la perte `pv - 7`

**Résultat attendu :**
```
Jour 1 : 2 CHF
Jour 2 : 4 CHF
Jour 3 : 8 CHF
Jour 4 : 16 CHF
Jour 5 : 32 CHF
Jour 6 : 64 CHF
Jour 7 : 128 CHF
Jour 8 : 256 CHF
Jour 9 : 512 CHF
Jour 10 : 1024 CHF
Il faut 10 jours pour dépasser 1000 CHF !
Tour 1 : 93 PV
Tour 2 : 86 PV
...
Tour 14 : 2 PV
Tour 15 : -5 PV
K.O. après 15 tours !
```
