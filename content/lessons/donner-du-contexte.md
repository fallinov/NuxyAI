---
title: "Donner du contexte à Claude"
description: "Découvre les différentes façons de fournir du contexte à Claude Code : fichiers, images, URLs et CLAUDE.md."
phase: 1
module: 2
lessonNumber: "2.2"
duration: 20
difficulty: beginner
type: exercise
tags:
  - contexte
  - fichiers
  - claude-md
concepts:
  - Références de fichiers (@)
  - Images
  - URLs
  - Pipe de données
objectives:
  - Utiliser @ pour référencer des fichiers
  - Coller des images dans Claude Code
  - Fournir des URLs de documentation
  - Créer un CLAUDE.md basique
checklist:
  - id: at-reference
    label: "Utiliser @ pour référencer un fichier"
  - id: paste-image
    label: "Coller une image ou screenshot dans Claude"
  - id: pipe-data
    label: "Envoyer des données via pipe (cat file | claude)"
  - id: create-claude-md
    label: "Créer un fichier CLAUDE.md basique"
---

# Donner du contexte à Claude

Tu sais écrire un bon prompt. Mais parfois, les mots ne suffisent pas. Claude a besoin de **voir** ton code, ton erreur, ton design. Bonne nouvelle : il y a plein de façons de lui donner du contexte.

## Référencer des fichiers avec @

Le symbole `@` suivi d'un chemin de fichier dit à Claude : "Lis ce fichier". C'est la façon la plus directe de lui montrer ton code.

::ai-conversation
---
messages:
  - role: user
    content: "@src/auth.ts — Pourquoi la fonction login ne gère pas le cas où le mot de passe est vide ?"
  - role: assistant
    content: "En regardant src/auth.ts, je vois que la fonction login vérifie uniquement que l'email est valide, mais il n'y a aucune vérification sur le mot de passe.\n\n[Claude propose d'ajouter une validation du mot de passe avant l'appel à l'API.]"
---
::

Tu peux aussi référencer des dossiers entiers :

::ai-conversation
---
messages:
  - role: user
    content: "@src/components/ — Donne-moi un aperçu de l'architecture des composants."
  - role: assistant
    content: "Le dossier contient 12 composants organisés en 3 sous-dossiers : auth/, layout/ et shared/. Voici la structure..."
---
::

L'autocomplétion t'aide : tape `@` puis commence à écrire le chemin, Claude te propose les fichiers disponibles.

## Coller des images

Claude Code accepte les images. Tu peux :

- **Glisser-déposer** un fichier image dans le terminal
- **Copier-coller** un screenshot (Ctrl+V ou Cmd+V)

C'est super utile pour :

- Montrer une maquette à implémenter
- Signaler un bug visuel
- Comparer le résultat avec le design attendu

::ai-conversation
---
messages:
  - role: user
    content: "[colle un screenshot d'une page avec un bouton mal aligné] Le bouton \"Envoyer\" devrait être centré sous le formulaire. Corrige le CSS."
  - role: assistant
    content: "Je vois le problème sur le screenshot. Le bouton utilise float: left au lieu d'être centré.\n\n[Claude modifie le CSS pour centrer le bouton avec flexbox.]"
---
::

## Envoyer des données via pipe

Tu peux envoyer le contenu d'un fichier ou d'une commande directement à Claude avec le pipe (`|`). C'est pratique pour les logs, les erreurs ou les grosses sorties de commande.

```bash
cat error.log | claude "Explique cette erreur et propose une solution"
```

```bash
npm test 2>&1 | claude "3 tests échouent, explique pourquoi et corrige"
```

```bash
git diff | claude "Résume les changements de ce diff"
```

Le pipe est parfait quand tu as une sortie de commande longue que tu ne veux pas copier-coller manuellement.

## Fournir des URLs

Tu peux coller des URLs de documentation directement dans ton prompt. Claude ira lire la page pour toi.

::ai-conversation
---
messages:
  - role: user
    content: "D'après https://nuxt.com/docs/api/configuration/nuxt-config, comment configurer le SSR dans nuxt.config.ts ?"
  - role: assistant
    content: "D'après la documentation Nuxt, tu peux configurer le SSR avec l'option ssr: true ou ssr: false dans ton nuxt.config.ts..."
---
::

C'est utile quand tu travailles avec une librairie et que tu veux que Claude suive la doc officielle plutôt que d'inventer.

## Le fichier CLAUDE.md

Le **CLAUDE.md** est un fichier spécial que Claude lit automatiquement au début de chaque session. C'est ton moyen de lui donner du contexte permanent sur ton projet.

### Où le placer ?

- **À la racine du projet** : pour les règles spécifiques au projet
- **Dans ton home** (`~/.claude/CLAUDE.md`) : pour tes préférences globales

### Quoi y mettre ?

Les choses que Claude ne peut **pas deviner** en lisant le code :

```markdown
# Mon Projet

## Commandes
- `npm run dev` — Serveur de développement
- `npm test` — Lancer les tests
- `npm run lint` — Vérifier le code

## Conventions
- Utiliser TypeScript partout
- Composants Vue avec <script setup>
- Commits en français

## Architecture
- Frontend : Nuxt 3
- Backend : Supabase
- Schéma DB : nuxyai (pas public)
```

### Quoi ne PAS y mettre ?

- Du code source (Claude peut le lire directement)
- Toute la documentation (trop long, Claude perd le focus)
- Des infos évidentes (langage, framework visible dans package.json)

### Crée ton premier CLAUDE.md

Ouvre un projet (ou ton dossier de test) et essaie :

::ai-conversation
---
messages:
  - role: user
    content: "Crée un fichier CLAUDE.md à la racine avec les commandes de build et de test du projet, et la convention que le code doit être en TypeScript."
  - role: assistant
    content: "Je crée le fichier CLAUDE.md avec les informations du projet.\n\n[Claude crée le fichier avec les commandes npm, les conventions TypeScript et la structure du projet.]\n\nLe fichier CLAUDE.md est créé. À chaque nouvelle session, je lirai automatiquement ce fichier pour connaître tes règles."
---
::

Tu peux aussi le créer à la main dans ton éditeur. L'important c'est qu'il soit à la racine du projet.

## Résumé des méthodes

| Méthode | Quand l'utiliser | Exemple |
|---------|-----------------|---------|
| `@fichier` | Montrer du code spécifique | `@src/auth.ts` |
| Image | Bug visuel, maquette, design | Glisser-déposer un screenshot |
| Pipe (`\|`) | Logs, erreurs, sorties longues | `cat error.log \| claude` |
| URL | Documentation officielle | Coller un lien de docs |
| CLAUDE.md | Règles permanentes du projet | Commandes, conventions |

## Ce qu'on retient

- `@` est ton meilleur ami pour référencer des fichiers rapidement
- Les images permettent de montrer ce que les mots ne décrivent pas bien
- Le pipe est parfait pour les logs et les sorties de commandes
- Le **CLAUDE.md** donne du contexte permanent — mets-y ce que Claude ne peut pas deviner
- Plus Claude a de contexte, meilleur sera le résultat
