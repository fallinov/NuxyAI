---
title: "CLAUDE.md : la mémoire de ton projet"
description: "Apprends à créer et maintenir un CLAUDE.md efficace — le fichier que Claude lit à chaque session."
phase: 1
module: 3
lessonNumber: "3.1"
duration: 20
difficulty: intermediate
type: guide
tags:
  - claude-md
  - configuration
  - memoire
concepts:
  - CLAUDE.md
  - Instructions persistantes
  - Conventions
  - /init
objectives:
  - Comprendre le rôle du CLAUDE.md
  - Savoir quoi inclure et quoi exclure
  - Utiliser /init pour générer un CLAUDE.md de base
  - Organiser les CLAUDE.md par dossier
---

# CLAUDE.md : la mémoire de ton projet

Tu as remarqué un truc agaçant ? À chaque nouvelle session, Claude repart de zéro. Il ne se souvient pas que tu utilises Nuxt, que tes tests sont dans `tests/`, ou que ton équipe préfère les commits en français. Résultat : tu répètes les mêmes instructions. Encore. Et encore.

La solution ? Le fichier **CLAUDE.md**. C'est un fichier Markdown que Claude lit automatiquement au début de **chaque session**. C'est la mémoire persistante de ton projet.

## Générer un CLAUDE.md avec /init

Pas besoin de partir de zéro. La commande `/init` analyse ton projet et génère un CLAUDE.md de base :

::ai-conversation
---
messages:
  - role: user
    content: "/init"
  - role: assistant
    content: "J'ai analysé ton projet. Voici ce que j'ai trouvé :\n\n- **Framework** : Nuxt 3 avec TypeScript\n- **Package manager** : npm\n- **Tests** : Vitest\n- **Linter** : ESLint\n\nJ'ai créé un fichier `CLAUDE.md` à la racine du projet avec les commandes de build, test et lint détectées."
---
::

Le fichier généré est un bon point de départ, mais il ne sera pas parfait. C'est à toi de l'éditer et de l'adapter.

::ai-conversation
---
messages:
  - role: user
    content: "Ajoute au CLAUDE.md que les commits doivent être en français et que je ne veux jamais de CDN externe."
  - role: assistant
    content: "J'ai mis à jour le CLAUDE.md avec ces deux règles :\n\n```markdown\n## Conventions\n- Commits en français\n- JAMAIS de CDN externe — tous les assets doivent être self-hosted\n```"
---
::

## Quoi mettre dans un CLAUDE.md

La règle d'or : **chaque ligne doit empêcher Claude de faire une erreur**. Si tu retires une ligne et que Claude fait toujours le bon choix, cette ligne est inutile. Supprime-la.

| Mettre | Exemple |
|--------|---------|
| Commandes que Claude ne peut pas deviner | `npm run test:unit` pour les tests, `npm run db:migrate` pour les migrations |
| Règles de code spécifiques à ton projet | « Utiliser `useNuxyDb()` au lieu de `useSupabaseClient()` » |
| Instructions de test | « Lancer Vitest avec `npm test`, coverage minimum 80% » |
| Conventions d'équipe | « Branches : `feat/`, `fix/`, `chore/`. Commits en français. » |
| Décisions architecturales | « Schéma Supabase : `nuxyai`, pas `public` » |
| Pièges courants | « Le middleware `auth.ts` redirige vers `/auth/login`, pas `/login` » |

| Ne PAS mettre | Pourquoi |
|---------------|----------|
| Ce que Claude voit en lisant le code | Il sait déjà que tu utilises Vue si `App.vue` existe |
| Les conventions standard du langage | Il connaît déjà les conventions TypeScript |
| De longues explications ou tutoriels | Un CLAUDE.md trop long est ignoré |
| La description de chaque fichier | Claude peut lire le code lui-même |

## Exemple concret

Voici un CLAUDE.md court et efficace :

::terminal-block
# Mon Projet

## Commandes
- `npm run dev` — serveur de dev
- `npm run test` — lance Vitest
- `npm run lint` — ESLint + Prettier

## Conventions
- Commits en français, branches feat/fix/chore
- IMPORTANT : toujours utiliser `useNuxyDb()` pour accéder à Supabase
- YOU MUST utiliser le schéma `nuxyai`, jamais `public`

## Architecture
- Les composants MDC sont dans `app/components/content/`
- Les leçons sont dans `content/lessons/`

## Pièges
- `useSupabaseClient()` accède au mauvais schéma — utiliser `useNuxyDb()`
- Les polices sont self-hosted, jamais de CDN externe
::

Remarque les mots **IMPORTANT** et **YOU MUST**. Quand une règle est critique et que Claude a tendance à l'oublier, ces mots renforcent l'instruction.

## Où placer les CLAUDE.md

Tu peux avoir plusieurs fichiers CLAUDE.md à différents endroits :

| Emplacement | Portée |
|-------------|--------|
| `~/.claude/CLAUDE.md` | Tous tes projets (préférences globales) |
| `CLAUDE.md` à la racine du projet | Tout le projet (conventions d'équipe) |
| `src/CLAUDE.md` dans un sous-dossier | Seulement ce dossier et ses enfants |

Claude les lit tous, du plus global au plus local. Un CLAUDE.md dans un sous-dossier peut affiner ou surcharger les règles du parent.

## Importer d'autres fichiers

Tu as déjà un README.md avec des infos utiles ? Pas besoin de tout recopier. Utilise la syntaxe `@import` :

::terminal-block
# CLAUDE.md

@README.md
@docs/git-instructions.md
@docs/api-conventions.md
::

Claude lira ces fichiers comme s'ils faisaient partie du CLAUDE.md.

## Partager avec ton équipe

Un CLAUDE.md, ça se versionne. Ajoute-le dans Git :

::terminal-block
git add CLAUDE.md
git commit -m "Ajouter le CLAUDE.md du projet"
::

Comme ça, toute l'équipe utilise les mêmes instructions. Fini le « chez moi ça marche ».

## Quand Claude ignore tes règles

Si Claude ne respecte pas une instruction du CLAUDE.md, c'est probablement que le fichier est **trop long**. Quand le CLAUDE.md fait 500 lignes, Claude perd les instructions importantes dans la masse.

Solutions :
- **Raccourcis** le fichier — garde uniquement ce qui provoque des erreurs
- **Utilise IMPORTANT ou YOU MUST** pour les règles critiques
- **Déplace les détails** dans des fichiers importés avec `@`

## Ce qu'on retient

- Le **CLAUDE.md** est lu automatiquement à chaque session — c'est ta mémoire persistante
- La commande **/init** génère un premier CLAUDE.md basé sur ton projet
- Chaque ligne doit **empêcher une erreur** — sinon, supprime-la
- Un CLAUDE.md **court et ciblé** est plus efficace qu'un document exhaustif
- Commite-le dans Git pour que toute l'équipe en profite
