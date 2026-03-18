---
title: "L'art du prompt"
description: "Apprends à formuler des prompts efficaces pour obtenir exactement ce que tu veux de Claude Code."
phase: 1
module: 2
lessonNumber: "2.1"
duration: 20
difficulty: beginner
type: guide
tags:
  - prompt
  - communication
  - bonnes-pratiques
concepts:
  - Prompt engineering
  - Spécificité
  - Contexte
  - Contraintes
objectives:
  - Comprendre ce qui fait un bon prompt
  - Structurer ses demandes efficacement
  - Éviter les prompts trop vagues
  - Fournir le bon niveau de contexte
---

# L'art du prompt

Tu sais déjà écrire un prompt. Mais est-ce que tu écris de **bons** prompts ? La différence entre un prompt vague et un prompt précis, c'est la différence entre un résultat moyen et un résultat excellent. Voyons ça ensemble.

## Vague vs précis : le test

Regarde ces deux échanges. Même intention, résultats très différents.

::ai-conversation
---
messages:
  - role: user
    content: "fix the bug"
  - role: assistant
    content: "Je ne vois pas de bug évident dans le code. Pourrais-tu me donner plus de détails sur l'erreur que tu rencontres ?"
---
::

Pas terrible, hein ? Claude ne sait pas de quoi tu parles. Maintenant :

::ai-conversation
---
messages:
  - role: user
    content: "Le build échoue avec l'erreur \"Cannot find module './utils'\" dans src/app.ts ligne 3. Le fichier utils.ts existe dans le même dossier. Corrige l'import et vérifie que le build passe."
  - role: assistant
    content: "Je vois le problème. L'import utilise un chemin relatif incorrect. Je corrige l'import dans src/app.ts et je lance le build pour vérifier.\n\n[Claude modifie l'import et lance le build avec succès.]\n\nLe build passe maintenant. Le problème était un import sans extension — TypeScript avait besoin du chemin exact."
---
::

Tu vois la différence ? Plus tu donnes d'infos, plus Claude est efficace.

## L'anatomie d'un bon prompt

Un bon prompt contient 4 éléments :

1. **La tâche** — Qu'est-ce que tu veux ?
2. **Le contexte** — Dans quel fichier, quel framework, quelle situation ?
3. **Les contraintes** — Ce qu'il faut éviter, les règles à respecter
4. **Le résultat attendu** — Comment tu vérifies que c'est bon ?

Tu n'as pas besoin des 4 à chaque fois. Mais plus la tâche est complexe, plus tu as intérêt à les inclure.

## Le tableau des transformations

Voici des prompts vagues transformés en prompts efficaces :

| Prompt vague | Prompt efficace |
|-------------|----------------|
| "fix the bug" | "Le build échoue avec l'erreur X dans le fichier Y. Corrige-le et vérifie que le build passe." |
| "add tests" | "Écris un test pour auth.ts couvrant le cas où l'utilisateur est déconnecté. Évite les mocks." |
| "make it look better" | "Implémente ce design [colle screenshot]. Prends un screenshot et compare avec la maquette." |
| "ça marche pas" | "Quand je clique sur le bouton Login, rien ne se passe. Voici l'erreur dans la console : [erreur]." |
| "ajoute une feature" | "Ajoute un champ 'date de naissance' au formulaire d'inscription avec validation (18 ans minimum)." |

## Exemples concrets

### Exemple 1 : Demande de code

::ai-conversation
---
messages:
  - role: user
    content: "Crée une fonction validateEmail dans utils/validation.ts qui vérifie qu'un email contient un @ et un domaine valide. Retourne un objet { valid: boolean, error?: string }. Écris aussi le test unitaire."
  - role: assistant
    content: "Je crée la fonction et son test.\n\n[Claude crée utils/validation.ts avec la fonction validateEmail et utils/validation.test.ts avec les cas de test : email valide, sans @, domaine vide, format invalide.]\n\nLes deux fichiers sont créés. Lance `npm test` pour vérifier que les tests passent."
---
::

### Exemple 2 : Débogage

::ai-conversation
---
messages:
  - role: user
    content: "La page /profile affiche une erreur 500 en production mais fonctionne en dev. Le log serveur dit \"NEXT_PUBLIC_API_URL is undefined\". Trouve d'où vient le problème et corrige-le."
  - role: assistant
    content: "Le problème vient de la variable d'environnement NEXT_PUBLIC_API_URL qui n'est pas définie dans l'environnement de production.\n\n[Claude vérifie le fichier .env.example, identifie la variable manquante, et explique comment la configurer sur le serveur de production.]"
---
::

### Exemple 3 : Refactoring

::ai-conversation
---
messages:
  - role: user
    content: "Le fichier src/api/users.ts fait 400 lignes. Sépare-le en 3 fichiers logiques : users.queries.ts pour les requêtes DB, users.validators.ts pour les validations, et users.routes.ts pour les routes. Garde les mêmes exports publics."
  - role: assistant
    content: "Je vais refactoriser ce fichier en 3 modules tout en gardant la même API publique.\n\n[Claude découpe le fichier, crée les 3 nouveaux fichiers et met à jour les imports dans le reste du projet.]\n\nLe refactoring est fait. Les 3 fichiers sont créés et tous les imports dans le projet ont été mis à jour. Lance les tests pour vérifier que rien n'est cassé."
---
::

## Quand un prompt vague est OK

Parfois, un prompt court et ouvert est exactement ce qu'il te faut :

- **Explorer** : "Explique-moi comment fonctionne l'authentification dans ce projet"
- **Brainstormer** : "Quelles sont les options pour ajouter un système de notifications ?"
- **Comprendre** : "C'est quoi ce fichier middleware.ts ?"
- **Apprendre** : "Explique-moi les closures en JavaScript avec un exemple simple"

La règle : si tu veux une **action précise**, sois précis. Si tu veux **explorer ou comprendre**, reste ouvert.

## Les erreurs classiques

### 1. Le prompt trop long

Inutile d'écrire un roman. Claude n'a pas besoin de ton parcours professionnel pour corriger un bug. Va droit au but.

### 2. Plusieurs tâches en un prompt

"Corrige le bug, ajoute des tests, mets à jour le README et déploie" — c'est trop. Une tâche à la fois, ou utilise le mode Plan pour les enchaîner (on verra ça dans la leçon 2.3).

### 3. Le prompt sans contexte technique

"Ça marche pas" ne donne rien. Donne le fichier, l'erreur, ce que tu as essayé. Claude n'est pas devin.

## Ce qu'on retient

- Un bon prompt = **tâche** + **contexte** + **contraintes** + **résultat attendu**
- Plus ta demande est **spécifique**, meilleur sera le résultat
- Pour explorer ou comprendre, un prompt ouvert est parfait
- Si Claude te demande des précisions, c'est que ton prompt manquait d'infos — c'est normal

La prochaine leçon te montrera comment donner encore plus de contexte à Claude avec les fichiers, les images et le CLAUDE.md.
