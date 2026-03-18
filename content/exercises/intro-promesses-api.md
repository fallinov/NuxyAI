---
title: "Module 9 : Promesses & API"
description: "Comprends l'asynchrone et consomme des API avec fetch"
difficulty: intermediate
order: 90
module: 9
exerciseNumber: "9.0"
duration: 3
exerciseType: intro
tags:
  - introduction
concepts:
  - Promesses
  - async / await
  - fetch
  - API REST
  - CRUD (GET, POST, PUT, DELETE)
  - Gestion d'erreurs
---

## Ce que tu vas apprendre

Jusqu'ici, ton code s'exécutait instantanément. Mais dans le monde réel, certaines opérations prennent du **temps** : charger des données depuis un serveur, envoyer un formulaire, télécharger une image...

Les **Promesses** et `async/await` te permettent de gérer ces opérations **asynchrones**. Et avec `fetch`, tu peux **communiquer avec des API** pour récupérer ou envoyer des données.

## Au programme

Ce module est divisé en deux parties :

### Partie 1 : Comprendre l'asynchrone
1. **Les Promesses** — le concept de "je te promets un résultat... plus tard"
2. **`.then()` et `.catch()`** — réagir quand la promesse est tenue (ou pas)
3. **`async / await`** — la syntaxe moderne pour écrire du code asynchrone lisible

### Partie 2 : Consommer une API
4. **`fetch` + GET** — récupérer des données
5. **`fetch` + POST** — envoyer des données
6. **`fetch` + PUT** — modifier des données
7. **`fetch` + DELETE** — supprimer des données
8. **Gestion d'erreurs** — que faire quand ça plante ?

## Pourquoi c'est important

Quasiment toutes les applications modernes communiquent avec des **API** :

- Afficher la météo → API météo
- Lister des produits → API e-commerce
- Se connecter → API d'authentification
- Publier un message → API de réseau social

C'est le dernier concept clé avant de pouvoir construire de **vraies applications web complètes**.

## Prêt ?

C'est le module le plus ambitieux. Mais tu as toutes les bases pour y arriver !
