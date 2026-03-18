---
title: "do...while et break"
description: "Découvre do...while qui s'exécute au moins une fois, et break pour sortir d'une boucle"
difficulty: beginner
module: 3
exerciseNumber: "3.4"
duration: 8
tags:
  - boucle
  - do-while
  - break
concepts:
  - do...while
  - break
  - Sortie anticipée

starterCode: |
  // 1. Balle rebondissante : la hauteur est divisée par 2 à chaque rebond
  // La balle rebondit AU MOINS une fois → do...while !
  let hauteur = 160
  let rebonds = 0

  // Complète le calcul et la condition d'arrêt :
  // do {
  //   hauteur = ???
  //   rebonds++
  //   console.log("Rebond " + rebonds + " : " + hauteur + " cm")
  // } while (???)

  console.log("Arrêt après " + rebonds + " rebonds !")

  // 2. Cherche la lettre "S" dans "JavaScript"
  // Utilise break pour arrêter dès qu'on la trouve
  const mot = "JavaScript"

  for (const lettre of mot) {
    console.log("On vérifie :", lettre)
    if (lettre === "S") {
      console.log("Trouvé :", lettre, "!")
      // Ajoute ici le mot-clé pour sortir de la boucle
    }
  }

solution:
  code: |
    // 1. Balle rebondissante
    let hauteur = 160
    let rebonds = 0

    do {
      hauteur = hauteur / 2
      rebonds++
      console.log("Rebond " + rebonds + " : " + hauteur + " cm")
    } while (hauteur > 5)

    console.log("Arrêt après " + rebonds + " rebonds !")

    // 2. Cherche la lettre "S" dans "JavaScript"
    const mot = "JavaScript"

    for (const lettre of mot) {
      console.log("On vérifie :", lettre)
      if (lettre === "S") {
        console.log("Trouvé :", lettre, "!")
        break
      }
    }
  explanation: "do...while garantit au moins un rebond (même si la balle était très basse). break stoppe la recherche dès que la lettre est trouvée, sans vérifier les lettres restantes."

validations:
  - description: "Utiliser do...while"
    type: code_contains
    expected: "do"
    errorMessage: "N'oublie pas le mot-clé do pour ta boucle do...while"
    successMessage: "Bien ! Tu utilises do...while"
  - description: "Diviser la hauteur par 2"
    type: code_matches
    expected: "hauteur\\s*=\\s*hauteur\\s*/\\s*2|hauteur\\s*/=\\s*2"
    errorMessage: "Divise la hauteur par 2 : hauteur = hauteur / 2"
    successMessage: "Super ! La hauteur diminue à chaque rebond"
  - description: "Condition d'arrêt"
    type: code_matches
    expected: "while\\s*\\(\\s*hauteur\\s*(>\\s*5|>=\\s*6|>=\\s*10)\\s*\\)"
    errorMessage: "Essaie while (hauteur > 5) pour arrêter quand la balle est trop basse"
    successMessage: "Bien ! La balle s'arrête quand elle est trop basse"
  - description: "Utiliser break"
    type: code_contains
    expected: "break"
    errorMessage: "Ajoute break pour stopper la boucle quand tu trouves S"
    successMessage: "Parfait ! Tu arrêtes la recherche avec break"
  - description: "Rebond correct"
    type: output_contains
    expected: "Rebond 5 : 5 cm"
    errorMessage: "La balle doit faire 5 rebonds (160 → 80 → 40 → 20 → 10 → 5)"
    successMessage: "5 rebonds, bien calculé !"
  - description: "S est trouvé"
    type: output_contains
    expected: "Trouvé : S !"
    errorMessage: "La boucle doit afficher 'Trouvé : S !'"
    successMessage: "S trouvé !"
  - description: "break stoppe la recherche"
    type: output_matches
    expected: "^(?!.*On vérifie : c)[\\s\\S]*$"
    errorMessage: "Avec break, la boucle doit s'arrêter avant la lettre 'c'"
    successMessage: "Bravo ! break a bien stoppé la recherche"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Diviser par 2"
    content: "À chaque rebond, la balle perd la moitié de sa hauteur :"
    example: "hauteur = hauteur / 2\n// 160 → 80 → 40 → 20 → 10 → 5"
  - title: "Quand arrêter ?"
    content: "La balle s'arrête quand sa hauteur n'est plus assez haute (5 cm ou moins) :"
    example: "do {\n  hauteur = hauteur / 2\n} while (hauteur > 5)"
  - title: "break arrête tout"
    content: "break sort immédiatement de la boucle. Le code après break (dans la boucle) n'est pas exécuté :"
    example: "for (const c of \"ABC\") {\n  if (c === \"B\") {\n    break  // On sort ici → C jamais vérifié\n  }\n  console.log(c)\n}\n// Affiche seulement : A"
  - title: "Récapitulatif des boucles"
    content: "Choisis la bonne boucle selon ta situation :"
    example: "for       → Nombre connu (1 à 10)\nwhile     → Nombre inconnu (jusqu'à condition)\ndo..while → Au moins 1 fois\nfor..of   → Parcourir un texte/tableau\nbreak     → Sortir en avance"
    learnMore: "https://devjs.ch/js/boucles.html"
---

# do...while et break

## 🎯 Objectif

Découvrir **do...while** pour exécuter au moins une fois, et **break** pour sortir d'une boucle en avance.

## 📖 Contexte

### La boucle do...while

Avec `while`, la condition est vérifiée **avant** d'exécuter le bloc. Si elle est fausse dès le départ, le bloc **ne s'exécute jamais**.

Avec `do...while`, le bloc s'exécute **d'abord**, puis la condition est vérifiée. Le code tourne donc **au moins une fois** :

```javascript
// Balle rebondissante : même si elle est basse, elle rebondit au moins 1 fois
let hauteur = 100

do {
  hauteur = hauteur / 2
  console.log("Rebond : " + hauteur + " cm")
} while (hauteur > 10)
// Rebond : 50 cm
// Rebond : 25 cm
// Rebond : 12.5 cm
// Rebond : 6.25 cm
```

### while vs do...while : la preuve

```javascript
let x = 10

// while : ne s'exécute PAS (10 < 5 est false)
while (x < 5) {
  console.log("while :", x)  // Jamais affiché !
}

// do...while : s'exécute AU MOINS 1 FOIS
do {
  console.log("do...while :", x)  // Affiche 10 !
} while (x < 5)
```

### Le mot-clé break

`break` permet de **sortir immédiatement** d'une boucle, sans attendre que la condition devienne `false` :

```javascript
const texte = "Bonjour !"

for (const c of texte) {
  if (c === " ") {
    console.log("Espace trouvé !")
    break  // On sort → les caractères après l'espace ne sont pas vérifiés
  }
  console.log(c)
}
// B
// o
// n
// j
// o
// u
// r
// Espace trouvé !
```

Sans `break`, la boucle vérifierait aussi `!` pour rien.

### Récapitulatif des 4 boucles

| Boucle | Quand l'utiliser | Caractéristique |
|--------|-----------------|-----------------|
| `for` | Nombre de tours **connu** | init ; condition ; incrément |
| `while` | Nombre de tours **inconnu** | Vérifie **avant** (peut ne jamais s'exécuter) |
| `do...while` | Nombre de tours inconnu, **au moins 1 fois** | Vérifie **après** |
| `for...of` | Parcourir chaque élément d'un texte | Un caractère à la fois |

## 📝 Consigne

1. **Balle rebondissante** : Divise la hauteur par 2 (`hauteur / 2`) et stoppe quand elle est trop basse (`hauteur > 5`)
2. **Recherche** : Ajoute `break` pour stopper la boucle quand la lettre "S" est trouvée

**Résultat attendu :**
```
Rebond 1 : 80 cm
Rebond 2 : 40 cm
Rebond 3 : 20 cm
Rebond 4 : 10 cm
Rebond 5 : 5 cm
Arrêt après 5 rebonds !
On vérifie : J
On vérifie : a
On vérifie : v
On vérifie : a
On vérifie : S
Trouvé : S !
```

::alert{type="warning"}
**Sans break**, la boucle afficherait aussi "On vérifie : c", "On vérifie : r", etc. Avec `break`, elle s'arrête dès que "S" est trouvé.
::
