---
title: "Le mode Plan"
description: "Apprends à utiliser le mode Plan pour explorer et planifier avant de coder — la recette des pros."
phase: 1
module: 2
lessonNumber: "2.3"
duration: 25
difficulty: intermediate
type: exercise
tags:
  - plan-mode
  - workflow
  - planification
concepts:
  - Mode Plan
  - Exploration
  - Planification
  - Implémentation
objectives:
  - Comprendre la différence entre Plan Mode et Normal Mode
  - Activer le mode Plan avec Shift+Tab
  - Suivre le workflow explore → plan → implement → commit
  - Savoir quand utiliser Plan Mode et quand s'en passer
checklist:
  - id: activate-plan
    label: "Activer le mode Plan (Shift+Tab)"
  - id: explore
    label: "Explorer un aspect du code en mode Plan"
  - id: create-plan
    label: "Demander un plan d'implémentation"
  - id: implement
    label: "Implémenter le plan en mode Normal"
---

# Le mode Plan

Tu sais ce qui différencie un développeur junior d'un senior ? Le senior **comprend** le code avant de le modifier. Il ne fonce pas tête baissée. Claude Code a un outil exactement pour ça : le **mode Plan**.

## C'est quoi le mode Plan ?

En mode Plan, Claude lit et analyse le code, mais **ne modifie rien**. C'est de la lecture seule. Il explore, il comprend, il propose — mais il ne touche pas aux fichiers.

En mode Normal (le mode par défaut), Claude peut lire **et** modifier les fichiers.

La combinaison des deux donne un workflow puissant en 4 étapes :

**Explorer → Planifier → Implémenter → Commiter**

## Activer le mode Plan

C'est simple : appuie sur **Shift+Tab** pour basculer entre les modes.

Tu verras l'indicateur changer dans l'interface :
- **Plan** : Claude explore et planifie uniquement
- **Normal** : Claude peut modifier les fichiers

Essaie maintenant. Ouvre Claude Code dans un projet et appuie sur Shift+Tab. Tu devrais voir le mode changer.

## Le workflow en 4 étapes

### Étape 1 : Explorer (mode Plan)

Commence par comprendre le code existant. Active le mode Plan et pose des questions :

::ai-conversation
user: [Mode Plan] Comment fonctionne le système d'authentification dans ce projet ? Quels fichiers sont impliqués ?
assistant: Voici comment l'authentification fonctionne dans ce projet :

1. **src/auth/login.ts** — Gère la connexion avec email/mot de passe
2. **src/auth/middleware.ts** — Vérifie le token JWT sur chaque requête
3. **src/auth/session.ts** — Gère les sessions utilisateur dans Redis

Le flux est : formulaire → login.ts → API Supabase → stockage du token → middleware vérifie à chaque requête.

Points importants :
- Les tokens expirent après 1h
- Le refresh token est stocké dans un cookie httpOnly
- Pas de gestion du "Se souvenir de moi"
::

Tu vois ? Claude a lu le code et t'a résumé le tout. Aucun fichier n'a été modifié.

### Étape 2 : Planifier (mode Plan)

Maintenant que tu comprends le code, demande un plan :

::ai-conversation
user: [Mode Plan] Je veux ajouter une option "Se souvenir de moi" qui garde la session pendant 30 jours. Fais-moi un plan d'implémentation.
assistant: Voici le plan pour implémenter "Se souvenir de moi" :

1. **src/auth/login.ts** — Ajouter un paramètre `rememberMe: boolean`
   - Si true : token avec expiration 30 jours
   - Si false : garder l'expiration actuelle (1h)

2. **src/auth/session.ts** — Adapter la durée du cookie
   - Cookie persistent si rememberMe = true
   - Cookie de session si rememberMe = false

3. **src/components/LoginForm.vue** — Ajouter la checkbox
   - Checkbox "Se souvenir de moi" sous le champ mot de passe
   - Passer la valeur au appel login()

4. **Tests** — 2 nouveaux tests dans auth.test.ts
   - Test avec rememberMe = true (vérifier l'expiration longue)
   - Test avec rememberMe = false (vérifier l'expiration courte)

Estimation : 4 fichiers modifiés, ~50 lignes ajoutées.

Tu veux que j'implémente ce plan ?
::

Tu as un plan clair. Tu sais exactement ce qui va être modifié et pourquoi.

### Étape 3 : Implémenter (mode Normal)

Bascule en mode Normal (Shift+Tab) et demande l'implémentation :

::ai-conversation
user: [Mode Normal] Implémente le plan qu'on vient de définir pour "Se souvenir de moi".
assistant: J'implémente le plan étape par étape.

[Claude modifie login.ts, session.ts, LoginForm.vue et crée les tests dans auth.test.ts.]

Tout est implémenté. 4 fichiers modifiés, 2 tests ajoutés. Lance `npm test` pour vérifier.
::

### Étape 4 : Commiter

Vérifie le résultat, lance les tests, puis commite :

::terminal-block
npm test
::

::ai-conversation
user: Les tests passent. Commite avec le message "Ajouter option Se souvenir de moi sur le login".
assistant: [Claude crée le commit avec les 4 fichiers modifiés.]
::

## Quand utiliser le mode Plan ?

### Oui, utilise-le pour :

- **Les features complexes** — Plusieurs fichiers, plusieurs étapes
- **Le code inconnu** — Un projet que tu découvres
- **Les refactorings** — Comprendre les dépendances avant de toucher
- **Les bugs obscurs** — Explorer le flux pour trouver la cause

### Non, passe-le pour :

- **Les corrections simples** — Un typo, un style CSS
- **Les petits ajouts** — Un champ dans un formulaire
- **Les tâches que tu connais par coeur** — Pas besoin de plan

La règle : si tu pourrais le faire en moins de 5 minutes sans réfléchir, mode Normal directement. Sinon, mode Plan d'abord.

## Astuce : éditer le plan

Tu peux ouvrir le plan dans ton éditeur de texte avec **Ctrl+G** (ou Cmd+G sur Mac). C'est pratique pour :

- Modifier le plan avant de l'implémenter
- Ajouter des détails que Claude a oubliés
- Réorganiser les étapes

## Ce qu'on retient

- **Shift+Tab** bascule entre mode Plan et mode Normal
- En mode Plan, Claude analyse mais **ne modifie rien**
- Le workflow pro : **Explorer → Planifier → Implémenter → Commiter**
- Utilise le mode Plan pour les tâches complexes, passe-le pour les petites corrections
- Un bon plan évite les allers-retours et les "non, pas comme ça"

Ce workflow va te faire gagner un temps fou. Les pros ne codent pas en aveugle — ils comprennent d'abord, planifient ensuite, et implémentent en dernier.
