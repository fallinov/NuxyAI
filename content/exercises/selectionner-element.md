---
title: "Sélectionner un élément"
description: "Apprends la syntaxe querySelector pour cibler des éléments HTML"
difficulty: beginner
module: 7
exerciseNumber: "7.1"
duration: 8
tags:
  - DOM
  - querySelector
  - sélection
concepts:
  - document.querySelector
  - Sélecteurs CSS
  - Ciblage d'éléments

exerciseType: html-css-js

starterCode:
  html: |
    <h1 id="titre">Bienvenue</h1>
    <p class="intro">Ceci est l'introduction</p>
    <button>Clique-moi</button>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #titre {
      color: #333;
    }

    .intro {
      color: #666;
    }

    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 24px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }
  js: |
    // 1. Sélectionne l'élément avec l'id "titre"
    //    Remplace "???" par le bon sélecteur CSS
    const titre = document.querySelector("???")

    // 2. Sélectionne l'élément avec la classe "intro"
    //    Remplace "???" par le bon sélecteur CSS
    const intro = document.querySelector("???")

    // 3. Affiche le contenu texte de chaque élément
    console.log(titre.textContent)
    console.log(intro.textContent)

solution:
  html: |
    <h1 id="titre">Bienvenue</h1>
    <p class="intro">Ceci est l'introduction</p>
    <button>Clique-moi</button>
  css: |
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    #titre {
      color: #333;
    }

    .intro {
      color: #666;
    }

    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 24px;
      border: none;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }
  js: |
    // 1. Sélectionne l'élément avec l'id "titre"
    const titre = document.querySelector("#titre")

    // 2. Sélectionne l'élément avec la classe "intro"
    const intro = document.querySelector(".intro")

    // 3. Affiche le contenu texte de chaque élément
    console.log(titre.textContent)
    console.log(intro.textContent)
  explanation: "querySelector utilise les sélecteurs CSS : # pour les id, . pour les classes, et le nom de balise directement. Il retourne le premier élément trouvé (un objet Element) ou null si rien ne correspond."

validations:
  - description: "Utiliser querySelector"
    type: code_contains
    expected: "querySelector"
    errorMessage: "Utilise document.querySelector() pour sélectionner les éléments"
    successMessage: "Top ! Tu utilises querySelector"
  - description: "Sélectionner par id avec #titre"
    type: code_contains
    expected: '"#titre"'
    errorMessage: "Pour un id, utilise le sélecteur #titre entre guillemets"
    successMessage: "Bien ! Sélecteur id OK"
  - description: "Sélectionner par classe avec .intro"
    type: code_contains
    expected: '".intro"'
    errorMessage: "Pour une classe, utilise le sélecteur .intro entre guillemets"
    successMessage: "Super ! Sélecteur classe OK"
  - description: "Élément #titre existe"
    type: dom_contains
    selector: "#titre"
    errorMessage: "L'élément #titre doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Élément .intro existe"
    type: dom_contains
    selector: ".intro"
    errorMessage: "L'élément .intro doit exister"
    successMessage: "Structure HTML OK !"
    hidden: true
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "Sélecteurs CSS"
    content: "querySelector utilise exactement la même syntaxe que CSS :"
    example: "#monId     → id\n.maClasse  → classe\nbalise     → type d'élément"
  - title: "Syntaxe querySelector"
    content: "Passe le sélecteur entre guillemets comme argument :"
    example: "document.querySelector(\"#titre\")\ndocument.querySelector(\".intro\")"
  - title: "Solution"
    content: "Complète les déclarations avec querySelector :"
    example: "const titre = document.querySelector(\"#titre\")\nconst intro = document.querySelector(\".intro\")"
    learnMore: "https://devjs.ch/dom/access-elements.html"
---

# Sélectionner un élément

## 🖥️ Nouveau : l'éditeur HTML/CSS/JS

À partir de ce module, tu travailles avec de **vraies pages web** ! L'interface a changé :

**3 onglets d'édition** (à gauche) :
- **HTML** : le contenu de la page (balises, texte)
- **CSS** : le style (couleurs, tailles, marges)
- **JS** : le code JavaScript que tu vas écrire

**Aperçu web** (à droite, en haut) :
- Tu vois ta page se construire en temps réel
- C'est comme un mini-navigateur

**Console** (à droite, en bas) :
- Tes `console.log()` apparaissent ici
- Les erreurs aussi, avec des explications

::alert{type="info"}
**Comment tester ?** Écris ton code dans l'onglet **JS**, puis clique sur **Exécuter** (ou `Ctrl+Enter`). L'aperçu se met à jour et la console affiche tes résultats.
::

## 🎯 Objectif

Apprendre à **sélectionner des éléments HTML** depuis JavaScript avec `document.querySelector()`.

## 📖 Comment ça marche ?

Jusqu'ici, tu as utilisé JavaScript tout seul. Maintenant, tu vas **connecter JavaScript au HTML** pour interagir avec les éléments de la page.

### `document.querySelector()` : ta télécommande

`document.querySelector()` est une **méthode** qui cherche un élément dans la page HTML et te le retourne.

```javascript
const titre = document.querySelector("#titre")
```

Décomposons :
- **`document`** : représente toute la page HTML
- **`.querySelector()`** : cherche **le premier** élément qui correspond au sélecteur
- **`"#titre"`** : le sélecteur CSS à chercher (ici, l'élément avec `id="titre"`)

### Que retourne querySelector ?

`querySelector` retourne un **objet Element** : c'est une représentation JavaScript de l'élément HTML. Grâce à cet objet, tu peux ensuite lire ou modifier l'élément :

```javascript
const titre = document.querySelector("#titre")

// Lire son contenu texte
console.log(titre.textContent)  // "Bienvenue"

// Modifier son contenu (on verra ça à l'exercice suivant)
titre.textContent = "Salut !"
```

Si aucun élément ne correspond, `querySelector` retourne `null`.

### Les sélecteurs CSS

Tu connais déjà les sélecteurs CSS du cours 113 ! `querySelector` utilise **exactement la même syntaxe** :

| Sélecteur | Ce qu'il cible | Exemple HTML |
|-----------|---------------|--------------|
| `"#titre"` | L'élément avec `id="titre"` | `<h1 id="titre">` |
| `".intro"` | Le premier élément avec `class="intro"` | `<p class="intro">` |
| `"button"` | Le premier `<button>` de la page | `<button>` |

::alert{type="success"}
**Astuce** : c'est comme en CSS ! `#` pour les id, `.` pour les classes, et le nom de balise directement.
::

## 📝 Consigne

Regarde le HTML à gauche : il y a un `<h1 id="titre">` et un `<p class="intro">`.

Dans l'onglet **JS**, remplace les `"???"` par les bons sélecteurs CSS :
1. Pour l'id "titre" → quel sélecteur CSS cible un id ?
2. Pour la classe "intro" → quel sélecteur CSS cible une classe ?

Les `console.log()` sont déjà écrits : ils afficheront le texte de chaque élément.

**Résultat attendu dans la console :**
```
Bienvenue
Ceci est l'introduction
```
