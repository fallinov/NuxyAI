# NuxyAI - Formation au développement assisté par IA

## Vue d'ensemble

NuxyAI est une plateforme de formation au développement assisté par IA avec Claude Code, destinée aux apprentis développeurs. C'est un fork de **Nuxy** (plateforme d'apprentissage JavaScript interactive) adapté pour enseigner l'utilisation de l'IA dans le développement logiciel.

- **Durée** : 18 heures de formation
- **Structure** : 2 phases, 7 modules
- **Format** : Leçons textuelles (guide, exercise, quiz, project) au lieu d'exercices interactifs avec éditeur de code
- **Stack** : Nuxt 4 + Nuxt UI 4 + Supabase + Nuxt Content

## Architecture technique

### Stack principal

- **Framework** : Nuxt 4 (SSR)
- **UI Framework** : Vue 3 (Composition API avec `<script setup>`)
- **UI Library** : Nuxt UI 4
- **Contenu** : Nuxt Content v3 (collection `lessons`, Markdown + frontmatter)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **Backend** : Supabase (Auth + PostgreSQL)
- **Déploiement** : Vercel

### Design System

#### Palette de couleurs

Couleurs extraites de la mascotte dragon pour une identité visuelle cohérente.

**Coolors** : https://coolors.co/60b155-33a6a6-ffd966-561e46-d45e95-c8b4dc

| Couleur | Hex | Usage |
|---------|-----|-------|
| Vert dragon | `#60B155` | Primary (corps dragon) |
| Teal | `#33A6A6` | Secondary (ventre/écailles) |
| Or | `#FFD966` | Accent (cornes) |
| Violet | `#561E46` | Éléments spéciaux |
| Rose | `#D45E95` | Accents |
| Lavande | `#C8B4DC` | Yeux/accents légers |

**Neutres** : `#F8FAFC` (blanc cassé), `#0F172A` (slate 900)

**Variables CSS** (définies dans `app/app.css`) :
```css
@theme {
  --color-nuxy-green: #60B155;
  --color-nuxy-green-dark: #226347;
  --color-nuxy-green-medium: #4D9352;
  --color-nuxy-green-light: #ACDC7E;
  --color-nuxy-teal: #33A6A6;
  --color-nuxy-teal-dark: #246B6B;
  --color-nuxy-gold: #FFD966;
  --color-nuxy-gold-dark: #FFC107;
  --color-nuxy-purple: #561E46;
  --color-nuxy-pink: #D45E95;
  --color-nuxy-lavender: #C8B4DC;
}
```

#### Stratégie d'utilisation des couleurs (Style Duolingo)

| Couleur | Rôle | Usage |
|---------|------|-------|
| **Vert (#60B155)** | PRIMARY | Boutons CTA, liens nav, progression, succès, identité |
| **Teal (#33A6A6)** | SECONDARY | Boutons secondaires, info, bordures hover |
| **Or (#FFD966)** | ACHIEVEMENTS | Badges, récompenses, highlights, warnings |
| **Violet (#561E46)** | PREMIUM | Éléments spéciaux, accents sombres |
| **Rose (#D45E95)** | FUN | Notifications "nouveau", célébrations |
| **Lavande (#C8B4DC)** | SUBTIL | Backgrounds légers, bordures subtiles |

**Couleurs sémantiques (Tailwind)** : `emerald` (success), `red` (error), `amber` (warning), `blue` (info)

**Classes CSS utilitaires disponibles** :
```css
/* Boutons CTA */
.btn-cta          /* Vert primaire - Actions principales */
.btn-cta-teal     /* Teal secondaire - Navigation */
.btn-cta-premium  /* Violet - Éléments premium */
.btn-cta-fun      /* Rose - Célébrations */
.btn-cta-accent   /* Or - Achievements */

/* Badges */
.badge-achievement  /* Or - Récompenses */
.badge-new          /* Rose - Nouveautés */
.badge-premium      /* Violet - Premium */
```

**Classes Tailwind** (via `@theme`) :
```
bg-nuxy-green, text-nuxy-green, border-nuxy-green (+ -dark, -light, -medium, -pale)
bg-nuxy-teal, text-nuxy-teal, border-nuxy-teal (+ -dark, -light)
bg-nuxy-gold, text-nuxy-gold, border-nuxy-gold (+ -dark)
bg-nuxy-purple, text-nuxy-purple, border-nuxy-purple (+ -dark)
bg-nuxy-pink, text-nuxy-pink, border-nuxy-pink (+ -dark)
bg-nuxy-lavender, text-nuxy-lavender (+ -light)
```

#### Typographie

Polices **100% locales** (pas de CDN externe) dans `public/fonts/`.

| Police | Usage | Fichiers |
|--------|-------|----------|
| **Inter** | Texte principal | `public/fonts/inter/*.woff2` (400-900) |
| **JetBrains Mono** | Code / Éditeur | `public/fonts/jetbrains-mono/*.woff2` (400-600) |

**Configuration** : `app/app.css` (déclarations `@font-face`)

#### Ligne graphique (Style Duolingo FLAT)

Le site adopte un design **flat** inspiré de Duolingo pour être en cohérence avec le logo :
- **Pas de dégradés complexes** : utiliser des couleurs solides
- **Pas de blur effects** : éviter les `blur-xl`, `backdrop-blur`
- **Pas de grid patterns** : fonds unis (`bg-gray-950`, `bg-white`)
- **Ombres minimales** : `shadow-lg` maximum, pas de `shadow-2xl` colorées
- **Textes en couleur solide** : pas de `bg-clip-text text-transparent`

## Structure du projet

```
app/
├── components/
│   ├── lessons/               # Composants leçon
│   │   ├── AiConversation.vue # Exemple de conversation IA
│   │   ├── LessonChecklist.vue# Checklist d'exercice
│   │   ├── LessonContent.vue  # Contenu Markdown rendu
│   │   ├── LessonHeader.vue   # En-tête de leçon (titre, meta)
│   │   ├── LessonNavigation.vue # Navigation prev/next
│   │   ├── LessonProgress.vue # Barre de progression
│   │   ├── LessonQuiz.vue     # Composant QCM
│   │   └── TerminalBlock.vue  # Bloc terminal stylisé
│   ├── content/               # Composants MDC (utilisés dans le Markdown)
│   │   ├── Alert.vue          # Bloc d'alerte
│   │   └── ProseH2.vue        # Heading h2 personnalisé
│   ├── auth/                  # Authentification
│   │   └── UserMenu.vue       # Menu utilisateur
│   ├── content/               # Composants MDC (rendus dans le Markdown)
│   │   ├── Alert.vue          # Bloc d'alerte
│   │   ├── AiConversation.vue # Échange IA simulé (chat bubbles)
│   │   ├── ProseH2.vue        # Heading h2 personnalisé
│   │   └── TerminalBlock.vue  # Bloc terminal (détection OS, copier)
│   └── NuxyLogo.vue           # Logo mascotte dragon
├── composables/
│   ├── useLessonProgress.ts       # Progression localStorage
│   ├── useLessonSupabaseProgress.ts # Progression synchronisée Supabase
│   ├── useLessonsList.ts          # Liste des leçons (collection)
│   ├── useLessonData.ts           # Données d'une leçon
│   ├── useAuth.ts                 # Authentification Supabase
│   ├── useNuxyDb.ts               # Helper pour accès schéma nuxyai
│   ├── useClasses.ts              # Gestion des classes
│   ├── useProfile.ts              # Gestion profil utilisateur
│   └── useUserId.ts               # Helper ID utilisateur
├── pages/
│   ├── index.vue                  # Page d'accueil (landing)
│   ├── lessons/
│   │   ├── index.vue              # Catalogue des leçons (par phase/module)
│   │   └── [slug].vue             # Page leçon individuelle
│   ├── auth/                      # Login, Register, Callback, Forgot/Reset password, Pending
│   ├── profile/                   # Profil utilisateur
│   ├── join/                      # Rejoindre classe via code
│   └── teacher/                   # Dashboard enseignant (index, classes/[id])
├── layouts/
│   ├── default.vue                # Layout par défaut
│   └── lesson.vue                 # Layout leçon (minimal)
├── types/
│   └── database.types.ts          # Types TypeScript Supabase
├── middleware/
│   ├── auth.ts                    # Protection routes authentifiées
│   ├── teacher.ts                 # Protection routes enseignants
│   └── guest.ts                   # Redirect si déjà connecté
├── app.config.ts                  # Config Nuxt UI (couleurs sémantiques)
└── app.css                        # Design system (polices, variables CSS)

content/
└── lessons/                       # 14 leçons Markdown (Phase 1)
    ├── decouverte-ia.md           # 1.1 Guide
    ├── installer-claude-code.md   # 1.2 Exercise
    ├── premier-echange.md         # 1.3 Exercise
    ├── naviguer-dans-un-projet.md # 1.4 Exercise
    ├── quiz-module-1.md           # 1.5 Quiz
    ├── art-du-prompt.md           # 2.1 Guide
    ├── donner-du-contexte.md      # 2.2 Exercise
    ├── mode-plan.md               # 2.3 Exercise
    ├── iterer-et-corriger.md      # 2.4 Exercise
    ├── quiz-module-2.md           # 2.5 Quiz
    ├── claude-md-memoire.md       # 3.1 Guide
    ├── configurer-environnement.md # 3.2 Exercise
    ├── gerer-le-contexte.md       # 3.3 Guide
    └── quiz-module-3.md           # 3.4 Quiz

public/
├── fonts/
│   ├── inter/                     # Police Inter (400-900)
│   └── jetbrains-mono/            # Police JetBrains Mono (400-600)
├── images/
│   └── nuxy-logo.svg              # Logo mascotte dragon
├── favicon.svg
└── favicon.ico
```

## Types de leçons

| Type | Description | Validation |
|------|-------------|------------|
| `guide` | Lecture seule | Bouton "J'ai compris" |
| `exercise` | Exercice pratique | Checklist d'items à cocher |
| `quiz` | QCM | Score >= 70% pour valider |
| `project` | Projet | Validation par l'enseignant |

## Création d'une leçon

### Frontmatter

Créer un fichier `content/lessons/[slug].md` :

```yaml
---
title: "Titre de la leçon"
description: "Description courte"
phase: 1                # Phase (1 ou 2)
module: 1               # Module (1-7)
lessonNumber: "1.1"     # Numéro (sert au tri)
duration: 15            # Durée estimée en minutes
difficulty: beginner    # beginner | intermediate | advanced
type: guide             # guide | exercise | quiz | project
tags:
  - ia
  - introduction
concepts:
  - Concept 1
  - Concept 2
objectives:
  - Objectif d'apprentissage 1
  - Objectif d'apprentissage 2

# Pour type: exercise — items de la checklist (objets {id, label})
checklist:
  - id: step-1
    label: "Étape 1 à réaliser"
  - id: step-2
    label: "Étape 2 à réaliser"

# Pour type: quiz — questions QCM
quiz:
  - question: "Question ?"
    options:
      - "Réponse A"
      - "Réponse B"
      - "Réponse C"
    correct: 0           # Index de la bonne réponse (0-based)
    explanation: "Explication de la bonne réponse"
---

# Contenu Markdown de la leçon

Texte en Markdown classique avec les composants MDC disponibles.
```

### Commandes terminal

Utiliser des blocs de code standard markdown (pas de composant MDC) :

````markdown
```bash
npm install something
```
````

Nuxt Content ajoute automatiquement la coloration syntaxique Shiki et un bouton "Copier".

### Composant MDC : conversations IA

Pour les exemples d'échanges avec Claude Code, utiliser le composant `::ai-conversation` avec la prop `messages` en YAML :

```markdown
::ai-conversation
---
messages:
  - role: user
    content: "Comment faire X ?"
  - role: assistant
    content: "Tu peux faire Y..."
---
::
```

### Numérotation des leçons

**Format** : `[module].[numéro dans le module]` (ex: `2.3` pour module 2, leçon 3)

- Le champ `lessonNumber` est la **seule source de tri** des leçons
- Les leçons sont triées automatiquement par `lessonNumber`
- Lors de l'ajout d'une leçon, s'assurer que `lessonNumber` est unique et suit la séquence du module

## Configuration Supabase

### Schéma

- **Schéma** : `nuxyai` (séparé du schéma `public`)
- **Credentials** : Fichier `.env` à la racine du projet

### Tables

| Table | Description |
|-------|-------------|
| `profiles` | Profils utilisateurs (id, email, full_name, role, avatar_url) |
| `classes` | Classes (id, name, description, teacher_id, invite_code, is_active) |
| `class_members` | Relation élève-classe (class_id, student_id, joined_at) |
| `lesson_progress` | Progression (user_id, lesson_slug, status, completed_at) |

### Composable `useNuxyDb()`

Helper centralisé pour accéder au schéma `nuxyai` :

```typescript
const { from, rpc, channel, client } = useNuxyDb()

// Requête sur une table du schéma nuxyai
const { data } = await from('profiles').select('*').eq('id', userId)

// Appel RPC
const { data } = await rpc('join_class_by_code', { code: 'ABC123' })

// Realtime
const chan = channel('changes').on('postgres_changes', { schema: 'nuxyai', ... })
```

### Points critiques Supabase

#### Schéma personnalisé : utiliser `useNuxyDb()`
```typescript
// Correct - accède au schéma 'nuxyai'
const { from, rpc } = useNuxyDb()
const { data } = await from('profiles').select('*')

// Incorrect - accède au schéma 'public' par défaut
const supabase = useSupabaseClient()
const { data } = await supabase.from('profiles').select('*')
```

#### ID utilisateur : utiliser `useUserId()`
```typescript
// Correct
const userId = useUserId()

// Incorrect - peut retourner undefined
const userId = user.value?.id
```

## Ton & Voix (Style Duolingo)

### Principes fondamentaux

Le site utilise un **ton inspiré de Duolingo** : amical, encourageant, et accessible. L'objectif est de rendre l'apprentissage du code moins intimidant.

| Principe | Description |
|----------|-------------|
| **Tutoiement** | Toujours "tu", jamais "vous" |
| **Phrases courtes** | Direct et punchy, pas de blabla |
| **Encourageant** | Positif, célèbre les petites victoires |
| **Humour léger** | Touches d'humour sans en faire trop |
| **Non-intimidant** | Pas de jargon, on explique simplement |

### Exemples de transformation

| Formel | Duolingo |
|--------|----------|
| "Apprenez JavaScript en pratiquant" | "Apprends JavaScript en codant" |
| "Connectez-vous pour sauvegarder votre progression" | "Connecte-toi pour retrouver ta progression" |
| "Commencer gratuitement" | "C'est parti !" |
| "Trois étapes simples pour progresser" | "3 étapes. C'est tout." |
| "Erreur de connexion" | "Oups, ça n'a pas marché" |
| "Votre avancement est enregistré" | "On se souvient où tu en étais" |
| "Bienvenue !" | "Hey, te revoilà !" |
| "Une erreur est survenue" | "Vérifie tes infos et réessaie" |

### Vocabulaire préféré

| Éviter | Préférer |
|--------|----------|
| Utilisateur | Toi, tu |
| Effectuer | Faire |
| Valider | Checker, vérifier |
| Soumettre | Envoyer |
| Inscription | Créer ton compte |
| Se connecter | Te connecter |
| Erreur survenue | Oups, y'a un souci |
| Fonctionnalité | Truc cool |
| Paramètres | Réglages |

### Toasts et messages système

```typescript
// Bon ton
toast.add({
  title: 'Hey, te revoilà !',
  description: 'Prêt à coder ?',
  color: 'success'
})

toast.add({
  title: 'Oups, ça n\'a pas marché',
  description: 'Vérifie tes identifiants et réessaie',
  color: 'error'
})

// Ton à éviter
toast.add({
  title: 'Bienvenue',
  description: 'Vous êtes maintenant connecté.',
  color: 'success'
})
```

### Messages dans les leçons

Les textes des leçons doivent être :
- **Rassurantes** : "Pas de panique, c'est normal de se tromper"
- **Explicatives** : "Voici ce qui s'est passé..."
- **Actionnables** : "Essaie plutôt..."

### Labels et boutons

| Contexte | Texte |
|----------|-------|
| CTA principal | "C'est parti !" |
| Connexion | "Te connecter" |
| Inscription | "Créer ton compte" |
| Retour | "Retour" |
| Continuer | "Continuer" |
| Leçon lue | "J'ai compris" |
| Réessayer | "On réessaie !" |

## Notes pour Claude Code

### Builds et serveurs

**Ne pas lancer automatiquement** : L'utilisateur se charge de tester les builds et de démarrer les serveurs de développement, sauf demande explicite.

### Conventions de code

- Composition API avec `<script setup>` obligatoire
- TypeScript partout
- Ton Duolingo obligatoire pour tous les textes UI (tutoiement, phrases courtes, encourageant)
- Pas de CDN externe : polices et assets self-hosted dans `public/`

### Commandes utiles

```bash
npm install          # Installer les dépendances
npm run dev          # Serveur de développement (http://localhost:3000)
npm run generate     # Générer le site statique
npm run preview      # Prévisualiser le build
```

### Credentials et configuration

Lire le fichier `.env` à la racine du projet pour accéder aux credentials. Ne jamais commiter le `.env` (déjà dans `.gitignore`).
