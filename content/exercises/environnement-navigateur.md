---
title: "L'environnement navigateur"
description: "Découvre les objets window, document et navigator"
difficulty: beginner
module: 1
exerciseNumber: "1.9"
duration: 10
tags:
  - window
  - document
  - navigator
  - objets natifs
  - navigateur
concepts:
  - Objet window
  - Objet document
  - Objet navigator
  - Propriétés du navigateur

starterCode: |
  // L'objet window représente la fenêtre du navigateur
  // C'est l'objet "global" en JavaScript côté navigateur

  // 1. Affiche la largeur de la fenêtre (déjà fait)
  console.log("Largeur:", window.innerWidth)

  // 2. Affiche la hauteur de la fenêtre
  //    Remplace "?" par la bonne propriété de window
  console.log("Hauteur:", "?")

  // 3. Affiche l'URL actuelle de la page
  //    Utilise window.location.href
  console.log("URL:", "?")

  // 4. Affiche le nom du navigateur (userAgent)
  //    Utilise navigator.userAgent
  console.log("Navigateur:", "?")

  // 5. Affiche le titre de la page
  //    Utilise document.title
  console.log("Titre de la page:", "?")

solution:
  code: |
    // L'objet window représente la fenêtre du navigateur
    // C'est l'objet "global" en JavaScript côté navigateur

    // 1. Affiche la largeur de la fenêtre
    console.log("Largeur:", window.innerWidth)

    // 2. Affiche la hauteur de la fenêtre
    console.log("Hauteur:", window.innerHeight)

    // 3. Affiche l'URL actuelle de la page
    console.log("URL:", window.location.href)

    // 4. Affiche le nom du navigateur (userAgent)
    console.log("Navigateur:", navigator.userAgent)

    // 5. Affiche le titre de la page (document.title)
    console.log("Titre de la page:", document.title)
  explanation: "window est l'objet global du navigateur. Il contient location (URL), navigator (infos navigateur), et document (le contenu HTML de la page)."

validations:
  - description: "Afficher la hauteur"
    type: code_contains
    expected: "innerHeight"
    errorMessage: "Utilise window.innerHeight pour la hauteur"
    successMessage: "Bien ! Tu récupères la hauteur"
  - description: "Afficher l'URL"
    type: code_matches
    expected: "(window\\.)?location\\.href"
    errorMessage: "Utilise window.location.href pour l'URL"
    successMessage: "Super ! L'URL est affichée"
  - description: "Afficher le navigateur"
    type: code_contains
    expected: "userAgent"
    errorMessage: "Utilise navigator.userAgent pour les infos navigateur"
    successMessage: "Top ! Tu connais navigator"
  - description: "Afficher le titre"
    type: code_contains
    expected: "document.title"
    errorMessage: "Utilise document.title pour le titre de la page"
    successMessage: "Bravo ! Tu connais l'environnement navigateur"
  - description: "Pas d'erreur"
    type: no_error

hints:
  - title: "window.innerHeight"
    content: "Donne la hauteur de la zone visible de la fenêtre en pixels :"
    example: "console.log(\"Hauteur:\", window.innerHeight)"
  - title: "window.location"
    content: "Contient les informations sur l'URL actuelle :"
    example: "window.location.href    // URL complète\nwindow.location.hostname // Nom de domaine"
  - title: "navigator.userAgent"
    content: "Chaîne décrivant le navigateur utilisé :"
    example: "navigator.userAgent\n// \"Mozilla/5.0 (Windows NT 10.0; Win64; x64)...\""
    learnMore: "https://devjs.ch/js/interactions-avec-lutilisateur.html"
---

# L'environnement navigateur

## 🎯 Objectif

Découvrir les **objets globaux** disponibles dans le navigateur : `window`, `document` et `navigator`.

## 📖 Contexte

Quand JavaScript s'exécute dans un navigateur, plusieurs objets sont automatiquement disponibles :

### window — La fenêtre du navigateur

`window` est l'objet **global**. Tout ce qui n'est pas dans une variable est accessible via `window` :

```javascript
// Ces deux lignes sont équivalentes :
console.log("Hello")
window.console.log("Hello")

// Propriétés utiles de window
window.innerWidth   // Largeur de la fenêtre (ex: 1920)
window.innerHeight  // Hauteur de la fenêtre (ex: 1080)
```

### window.location — L'URL

```javascript
location.href      // URL complète : "https://nuxy.ch/exercices/1"
location.hostname  // Domaine : "nuxy.ch"
location.pathname  // Chemin : "/exercices/1"
location.protocol  // Protocole : "https:"
```

### navigator — Informations sur le navigateur

```javascript
navigator.userAgent   // Description du navigateur
navigator.language    // Langue : "fr-FR"
navigator.onLine      // true si connecté à Internet
navigator.platform    // Système : "Win32", "MacIntel"
```

### document — Le contenu de la page

```javascript
document.title        // Titre de l'onglet
document.URL          // URL de la page
document.body         // L'élément <body>
document.head         // L'élément <head>
```

::alert{type="info"}
**Note** : On peut souvent omettre `window.` car c'est l'objet global.
`location.href` est équivalent à `window.location.href`
::

### Schéma de l'environnement

```
window (objet global)
├── console      → log, warn, error, table...
├── location     → href, hostname, pathname...
├── navigator    → userAgent, language, onLine...
├── document     → title, body, querySelector...
├── alert()      → Affiche une popup
├── prompt()     → Demande une saisie
└── confirm()    → Demande oui/non
```

### alert, prompt, confirm

Ces méthodes ouvrent des boîtes de dialogue (elles ne fonctionnent pas dans cet éditeur) :

```javascript
// Affiche un message
alert("Bienvenue !")

// Demande une saisie à l'utilisateur
const nom = prompt("Quel est ton nom ?")

// Demande une confirmation (OK/Annuler)
const ok = confirm("Es-tu sûr ?")  // true ou false
```

## 📝 Consigne

Remplace chaque `___` par la bonne propriété. Le premier est déjà fait en exemple :

1. La **hauteur** de la fenêtre → `window.innerHeight`
2. L'**URL** actuelle → `window.location.href`
3. Les infos du **navigateur** → `navigator.userAgent`
4. Le **titre** de la page → `document.title`

::alert{type="info"}
**Note** : Les valeurs affichées sont celles de cette page (Nuxy). C'est normal ! Dans un vrai site, tu verrais les infos de ce site.
::

**Exemple de résultat (les valeurs changent selon ton navigateur) :**

```
Largeur: 1920
Hauteur: 1080
URL: https://...
Navigateur: Mozilla/5.0 ...
Titre de la page: ...
```
