---
title: "Configurer son environnement"
description: "Personnalise Claude Code avec les permissions, les hooks et les commandes CLI pour un workflow fluide."
phase: 1
module: 3
lessonNumber: "3.2"
duration: 25
difficulty: intermediate
type: exercise
tags:
  - configuration
  - permissions
  - hooks
  - skills
concepts:
  - Permissions
  - Hooks
  - Skills
  - CLI tools
  - /permissions
objectives:
  - Configurer les permissions pour éviter les interruptions
  - Créer un hook basique
  - Comprendre les skills
  - Utiliser des outils CLI avec Claude
checklist:
  - id: permissions
    label: "Configurer les permissions avec /permissions"
  - id: hook
    label: "Créer un hook (ex: lint après chaque edit)"
  - id: skill
    label: "Explorer les skills disponibles avec /skills"
  - id: cli-tool
    label: "Utiliser un outil CLI (gh, npm) via Claude"
---

# Configurer son environnement

Tu as un CLAUDE.md, bien. Maintenant, on va configurer Claude Code pour qu'il travaille sans te déranger toutes les 30 secondes avec « puis-je exécuter cette commande ? ». On va aussi lui apprendre des automatismes et des raccourcis.

## Étape 1 : Les permissions

Par défaut, Claude te demande la permission pour chaque commande un peu sensible. C'est prudent, mais ça devient vite pénible quand tu lui fais confiance pour `npm run lint` ou `git commit`.

La commande `/permissions` te permet de configurer ce que Claude peut faire sans demander :

::ai-conversation
---
messages:
  - role: user
    content: "/permissions"
  - role: assistant
    content: "Voici tes permissions actuelles :\n\n**Autorisé automatiquement :**\n- Lire des fichiers\n- Écrire des fichiers dans le projet\n\n**Demande confirmation :**\n- Exécuter des commandes shell\n- Installer des packages\n\nTu veux modifier ces permissions ?"
  - role: user
    content: "Autorise npm run lint, npm run test et git commit sans demander."
  - role: assistant
    content: "C'est fait. Ces commandes sont maintenant autorisées automatiquement :\n- `npm run lint`\n- `npm run test`\n- `git commit`\n\nClaude n'affichera plus de popup de confirmation pour ces commandes."
---
::

Le principe : autorise les commandes **sûres** que tu lances souvent. Garde la confirmation pour les commandes destructives (`rm`, `git push --force`, etc.).

## Étape 2 : Les hooks

Les hooks sont des scripts qui s'exécutent **automatiquement** à des moments précis. Par exemple : lancer le linter après chaque modification de fichier, ou bloquer les écritures dans certains dossiers.

Le plus simple ? Demande à Claude de les créer pour toi :

::ai-conversation
---
messages:
  - role: user
    content: "Crée un hook qui lance ESLint automatiquement après chaque modification de fichier."
  - role: assistant
    content: "J'ai créé un hook dans `.claude/hooks/post-edit.sh` :\n\n```bash\n#!/bin/bash\nnpx eslint --fix \"$CLAUDE_EDITED_FILE\"\n```\n\nCe hook s'exécutera automatiquement après chaque fichier modifié par Claude. Si ESLint trouve des erreurs, elles seront affichées dans le terminal."
---
::

Tu veux voir tes hooks existants ? Utilise `/hooks` :

::terminal-block
> /hooks

Hooks configurés :
  post-edit: eslint --fix (actif)
::

Quelques idées de hooks utiles :
- **Lint après chaque edit** — pour garder un code propre en permanence
- **Tests après modification d'un fichier de test** — feedback immédiat
- **Bloquer les écritures dans `migrations/`** — éviter les erreurs accidentelles

## Étape 3 : Les skills

Les skills sont des fichiers `SKILL.md` placés dans `.claude/skills/`. Ils donnent à Claude des connaissances spécialisées sur un domaine précis. C'est comme un mini-guide d'expert que Claude consulte quand il en a besoin.

Explore les skills disponibles avec `/skills` :

::terminal-block
> /skills

Skills disponibles :
  api-conventions — Conventions pour les endpoints API
  db-migrations   — Règles pour les migrations de base de données
::

Un skill, c'est juste un fichier Markdown avec des instructions :

::terminal-block
# .claude/skills/api-conventions/SKILL.md

## Conventions API

- Tous les endpoints sont préfixés par `/api/v1/`
- Format de réponse : { data, error, meta }
- Authentification via Bearer token
- Pagination : ?page=1&limit=20
::

Quand tu travailles sur une API, Claude consultera automatiquement ce skill pour respecter tes conventions.

## Étape 4 : Utiliser des outils CLI

Claude sait utiliser les outils en ligne de commande installés sur ta machine. Les plus utiles :

**GitHub CLI (`gh`)** — pour les PRs, issues et reviews :

::ai-conversation
---
messages:
  - role: user
    content: "Crée une PR pour ma branche feat/auth avec un résumé des changements."
  - role: assistant
    content: "J'ai créé la PR :\n\n**feat/auth → main**\nTitre : Ajouter l'authentification Supabase\n\nRésumé :\n- Ajout du middleware auth.ts\n- Page de login avec email/mot de passe\n- Gestion du profil utilisateur\n\nURL : https://github.com/ton-projet/pull/42"
---
::

**npm** — pour gérer les dépendances :

::ai-conversation
---
messages:
  - role: user
    content: "Ajoute la dépendance zod pour la validation de schémas."
  - role: assistant
    content: "J'ai installé `zod` :\n\n```\nnpm install zod\n```\n\nPackage ajouté à `dependencies` dans `package.json`. Zod est une librairie de validation TypeScript-first, parfaite pour valider les données côté serveur."
---
::

**Astuce** : si Claude ne connaît pas un outil CLI, dis-lui d'apprendre :

::ai-conversation
---
messages:
  - role: user
    content: "Utilise 'supabase-cli --help' pour apprendre comment l'utiliser, puis génère un nouveau type TypeScript depuis ma base de données."
  - role: assistant
    content: "J'ai lu l'aide de supabase-cli. Voici la commande pour générer les types :\n\n```bash\nsupabase gen types typescript --project-id xyz > app/types/database.types.ts\n```\n\nLes types ont été générés et sauvegardés."
---
::

## Résumé de la configuration

| Outil | Commande | Ce que ça fait |
|-------|----------|----------------|
| Permissions | `/permissions` | Autorise des commandes sans confirmation |
| Hooks | `/hooks` | Automatise des actions (lint, tests, etc.) |
| Skills | `/skills` | Donne des connaissances spécialisées à Claude |
| CLI tools | Directement dans le prompt | Utilise gh, npm, et tout outil installé |

## Ce qu'on retient

- Configure les **permissions** pour ne pas être interrompu par des confirmations inutiles
- Les **hooks** automatisent les tâches répétitives — laisse Claude les créer pour toi
- Les **skills** ajoutent des connaissances métier spécifiques à ton projet
- Claude sait utiliser les **outils CLI** de ta machine — gh, npm, et n'importe quel outil installé
