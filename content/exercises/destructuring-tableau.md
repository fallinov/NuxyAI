---
title: "Décomposer un tableau"
description: "Utilise le destructuring pour extraire les éléments d'un tableau en variables"
difficulty: beginner
module: 5
exerciseNumber: "5.10"
duration: 6
tags:
  - tableaux
  - destructuring
  - ES6+
concepts:
  - Destructuring de tableau
  - Ignorer des éléments
  - Rest pattern [...]

starterCode: |
  const couleurs = ["rouge", "vert", "bleu", "jaune", "violet"]

  // 1. Extrais les 3 premières couleurs en UNE ligne de destructuring
  // Exemple : const [a, b] = monTableau
  // Écris ta ligne ici :


  console.log(premiere, deuxieme, troisieme)

  // 2. Extrais la 1ère et la 3ème couleur (ignore la 2ème avec une virgule vide)
  // Exemple : const [a, , c] = monTableau
  // Écris ta ligne ici :


  console.log("Important:", important1, important2)

  // 3. Extrais la 1ère couleur et mets le reste dans un tableau
  // Exemple : const [a, ...reste] = monTableau
  // Écris ta ligne ici :


  console.log("Top:", top)
  console.log("Autres:", autres)

solution:
  code: |
    const couleurs = ["rouge", "vert", "bleu", "jaune", "violet"]

    // 1. Extrais les 3 premières couleurs dans des variables
    const [premiere, deuxieme, troisieme] = couleurs

    console.log(premiere, deuxieme, troisieme)

    // 2. Extrais seulement la 1ère et la 3ème couleur
    const [important1, , important2] = couleurs

    console.log("Important:", important1, important2)

    // 3. Extrais la 1ère couleur et mets le reste dans un tableau
    const [top, ...autres] = couleurs

    console.log("Top:", top)
    console.log("Autres:", autres)
  explanation: "Le destructuring [a, b, c] = tableau extrait les éléments en variables. On ignore un élément avec une virgule seule [a, , c]. Le rest pattern ...reste récupère tout le reste dans un nouveau tableau."

validations:
  - description: "Destructuring des 3 premières couleurs"
    type: code_matches
    expected: "const\\s*\\[\\s*premiere\\s*,\\s*deuxieme\\s*,\\s*troisieme\\s*\\]\\s*=\\s*couleurs"
    errorMessage: "Essaie const [premiere, deuxieme, troisieme] = couleurs"
    successMessage: "Bien ! Tu sais extraire des éléments"
  - description: "Ignorer un élément avec une virgule"
    type: code_matches
    expected: "const\\s*\\[\\s*important1\\s*,\\s*,\\s*important2\\s*\\]\\s*=\\s*couleurs"
    errorMessage: "Pour ignorer le 2ème, utilise une virgule vide : [important1, , important2]"
    successMessage: "Top ! Tu sais ignorer des éléments"
  - description: "Rest pattern avec ..."
    type: code_matches
    expected: "const\\s*\\[\\s*top\\s*,\\s*\\.\\.\\.autres\\s*\\]\\s*=\\s*couleurs"
    errorMessage: "Essaie const [top, ...autres] = couleurs pour le rest pattern"
    successMessage: "Bravo ! Tu maîtrises le rest pattern"
  - description: "Affichage correct"
    type: output_contains
    expected: "rouge vert bleu"
    errorMessage: "Les 3 premières couleurs doivent s'afficher"
    successMessage: "Parfait !"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Destructuring de tableau"
    content: "Au lieu d'accéder par index, on peut extraire directement :"
    example: "const [a, b, c] = [10, 20, 30]\nconsole.log(a) // 10\nconsole.log(b) // 20"
  - title: "Ignorer des éléments"
    content: "Une virgule seule saute un élément :"
    example: "const [premier, , troisieme] = [\"a\", \"b\", \"c\"]\n// premier = \"a\", troisieme = \"c\""
  - title: "Le rest pattern ..."
    content: "Les trois points récupèrent tout le reste dans un tableau :"
    example: "const [tete, ...queue] = [1, 2, 3, 4, 5]\n// tete = 1\n// queue = [2, 3, 4, 5]"
    learnMore: "https://devjs.ch/js/tableaux.html"
---

# Décomposer un tableau

## 🎯 Objectif

Utiliser le **destructuring** pour extraire les éléments d'un tableau directement dans des variables.

## 📖 Contexte

### Accès par index vs destructuring

Au lieu d'accéder aux éléments un par un avec `[0]`, `[1]`, `[2]`, on peut les extraire d'un coup :

```javascript
const fruits = ["pomme", "banane", "cerise"]

// ❌ Classique (répétitif)
const a = fruits[0]
const b = fruits[1]
const c = fruits[2]

// ✅ Destructuring (une seule ligne)
const [a, b, c] = fruits
```

![Destructuring de tableau](/images/exercises/destructuring-tableau-mockup.svg)

### Ignorer des éléments

On peut sauter des éléments avec une virgule vide `,` :

```javascript
const notes = [18, 12, 15, 9]

const [premiere, , troisieme] = notes
// premiere = 18, troisieme = 15 (la 2ème est ignorée)
```

### Le rest pattern `...`

Les trois points `...` récupèrent **tout le reste** dans un nouveau tableau :

```javascript
const jours = ["lun", "mar", "mer", "jeu", "ven"]

const [premier, ...reste] = jours
// premier = "lun"
// reste = ["mar", "mer", "jeu", "ven"]
```

## 📝 Consigne

1. Remplace les accès par index `couleurs[0]`, `couleurs[1]`... par du **destructuring**
2. Extrais la 1ère et la 3ème couleur en **ignorant** la 2ème
3. Extrais la 1ère couleur et récupère **le reste** avec `...`

**Résultat attendu :**
```
rouge vert bleu
Important: rouge bleu
Top: rouge
Autres: [vert, bleu, jaune, violet]
```
