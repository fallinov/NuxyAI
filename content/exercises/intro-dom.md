---
title: "Module 7 : DOM"
description: "Sélectionne et modifie les éléments de ta page web avec JavaScript"
difficulty: intermediate
order: 70
module: 7
exerciseNumber: "7.0"
duration: 5
exerciseType: intro
tags:
  - introduction
  - script
  - HTML
concepts:
  - querySelector / querySelectorAll
  - textContent / innerHTML
  - Modifier les styles CSS
  - Modifier les attributs
  - Créer et supprimer des éléments
  - Balise script
  - Script externe
---

## Ce que tu vas apprendre

Jusqu'ici, tu as codé dans la console. C'est le moment de passer à la vitesse supérieure : **modifier directement ta page web** avec JavaScript !

Le **DOM** (Document Object Model), c'est la représentation de ta page HTML sous forme d'arbre. JavaScript peut parcourir cet arbre pour sélectionner, modifier, créer ou supprimer des éléments.

## Au programme

Dans ce module, tu vas apprendre à :

1. **Sélectionner des éléments** avec `querySelector` et `querySelectorAll`
2. **Modifier le texte** d'un élément (`textContent`, `innerHTML`)
3. **Changer les styles CSS** depuis JavaScript
4. **Modifier les attributs** (`src`, `href`, `class`...)
5. **Créer de nouveaux éléments** et les ajouter à la page
6. **Supprimer des éléments** existants

## Pourquoi c'est important

C'est **la raison d'être** de JavaScript dans le navigateur ! Sans manipulation du DOM, impossible de :

- Afficher dynamiquement les résultats d'une recherche
- Créer un panier d'achat interactif
- Mettre à jour une page sans la recharger
- Animer des éléments à l'écran

Tu passes du code "invisible" (console) au code **visible** (la page). C'est un tournant dans ton apprentissage.

## Comment lier JavaScript à ta page HTML

Avant de manipuler le DOM, tu dois savoir **comment intégrer du JavaScript** dans une page web. Il y a deux méthodes principales.

### Script inline (dans le HTML)

Le code JavaScript est directement dans la balise `<script>` :

```html
<!DOCTYPE html>
<html>
<head>
  <title>Ma page</title>
</head>
<body>
  <h1>Bonjour</h1>

  <script>
    console.log("Hello depuis le HTML !")
  </script>
</body>
</html>
```

::alert{type="warning"}
**Inconvénient** : Le code mélangé au HTML devient vite difficile à maintenir.
::

### Script externe (fichier .js séparé) — Recommandé

Le code est dans un fichier `.js` séparé, placé **juste avant `</body>`** :

**index.html**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Ma page</title>
</head>
<body>
  <h1>Bonjour</h1>

  <script src="script.js"></script>
</body>
</html>
```

**script.js**
```javascript
console.log("Hello depuis le fichier externe !")
```

::alert{type="success"}
**Avantages** : Code séparé, facile à maintenir, et tous les éléments HTML sont déjà chargés !
::

### Pourquoi placer le script avant &lt;/body&gt; ?

Quand le navigateur lit ta page :
1. Il lit le HTML **de haut en bas**
2. Quand il rencontre un `<script>`, il **arrête tout** pour l'exécuter
3. Puis continue le HTML

En plaçant le script **à la fin du body** :
- Tous les éléments HTML sont déjà créés
- Ton JavaScript peut les manipuler sans problème
- La page s'affiche rapidement

### Structure recommandée

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon site</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Contenu HTML -->
  <h1>Ma page</h1>

  <script src="script.js"></script>
</body>
</html>
```

### À éviter

```html
<!-- Code inline dans les attributs -->
<button onclick="alert('Clic!')">Cliquer</button>

<!-- Script dans le <head> sans précaution -->
<head>
  <script src="script.js"></script>
</head>
```

### Note : l'attribut `defer`

Il existe une autre méthode pour les développeurs avancés : l'attribut `defer`.

```html
<head>
  <script src="script.js" defer></script>
</head>
```

Avec `defer`, tu peux mettre le script dans le `<head>` et le navigateur attendra que le HTML soit prêt avant de l'exécuter. C'est la méthode utilisée par les frameworks comme Vue.js ou React.

Pour l'instant, reste sur la méthode simple : **script avant `</body>`**. Tu découvriras `defer` plus tard !

## Changement de format

Les exercices de ce module utilisent un **éditeur HTML/CSS/JS** : tu écriras du HTML et du JavaScript ensemble, et tu verras le résultat en direct dans un aperçu.

## Prêt ?

C'est parti pour la partie la plus visuelle du cours !
