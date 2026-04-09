# NuxyAI - Formation au développement assisté par IA

<!-- Documentation détaillée dans docs/ -->

## Vue d'ensemble

Plateforme de formation au développement assisté par IA avec Claude Code, destinée aux apprentis développeurs. Fork de **Nuxy** adapté pour enseigner l'utilisation de l'IA dans le développement logiciel.

- **Durée** : 18 heures | **Structure** : 2 phases, 7 modules
- **Format** : Leçons textuelles (guide, exercise, quiz, project)

## Stack

- **Framework** : Nuxt 4 (SSR) + Vue 3 (Composition API `<script setup>`)
- **UI** : Nuxt UI 4 + Tailwind CSS v4
- **Contenu** : Nuxt Content v3 (collection `lessons`, Markdown + frontmatter)
- **Langage** : TypeScript
- **Backend** : Supabase (Auth + PostgreSQL, schéma `nuxyai`)
- **Déploiement** : Vercel
- **Polices** : Inter + JetBrains Mono, 100% locales dans `public/fonts/`

## Structure du projet

```
app/
├── components/
│   ├── lessons/          # LessonContent, LessonHeader, LessonNavigation,
│   │                     # LessonProgress, LessonQuiz, LessonChecklist
│   ├── content/          # Composants MDC : Alert, AiConversation,
│   │                     # ProseH2, TerminalBlock
│   ├── auth/             # UserMenu
│   └── NuxyLogo.vue
├── composables/
│   ├── useLessonProgress.ts        # Progression localStorage
│   ├── useLessonSupabaseProgress.ts # Progression Supabase
│   ├── useLessonsList.ts / useLessonData.ts
│   ├── useAuth.ts / useUserId.ts
│   ├── useNuxyDb.ts                # Helper schéma nuxyai
│   ├── useClasses.ts / useProfile.ts
├── pages/
│   ├── index.vue                   # Landing
│   ├── lessons/index.vue           # Catalogue par phase/module
│   ├── lessons/[slug].vue          # Page leçon
│   ├── auth/                       # Login, Register, Callback, Reset
│   ├── profile/ / join/ / teacher/
├── layouts/
│   ├── default.vue / lesson.vue
├── middleware/
│   ├── auth.ts / teacher.ts / guest.ts
├── types/database.types.ts
├── app.config.ts                   # Couleurs sémantiques Nuxt UI
└── app.css                         # Design system (polices, variables CSS)

content/lessons/                    # 14 leçons Markdown (Phase 1)
public/fonts/ / public/images/
```

## Conventions de code

- `<script setup>` + TypeScript obligatoire partout
- Ton Duolingo pour tous les textes UI : tutoiement, phrases courtes, encourageant (voir `docs/tone-and-voice.md`)
- Pas de CDN externe : polices et assets self-hosted dans `public/`
- Design flat Duolingo : pas de dégradés, pas de blur, ombres minimales (`shadow-lg` max)

## Pièges critiques Supabase

### Toujours utiliser `useNuxyDb()` (pas `useSupabaseClient()`)

```typescript
// CORRECT - schéma 'nuxyai'
const { from, rpc } = useNuxyDb()
const { data } = await from('profiles').select('*')

// INCORRECT - schéma 'public' par défaut
const supabase = useSupabaseClient()
```

### Toujours utiliser `useUserId()` (pas `user.value?.id`)

```typescript
// CORRECT
const userId = useUserId()

// INCORRECT - peut retourner undefined
const userId = user.value?.id
```

Tables : `profiles`, `classes`, `class_members`, `lesson_progress` (détails dans `docs/supabase-config.md`)

## Types de leçons

| Type | Validation |
|------|------------|
| `guide` | Bouton "J'ai compris" |
| `exercise` | Checklist d'items à cocher |
| `quiz` | Score >= 70% |
| `project` | Validation enseignant |

- Frontmatter obligatoire : `title`, `description`, `phase`, `module`, `lessonNumber`, `duration`, `difficulty`, `type`
- `lessonNumber` = seule source de tri (format `[module].[n]`, ex: `2.3`)
- Composant MDC conversations IA : `::ai-conversation` avec prop `messages` en YAML
- Détails complets dans `docs/lesson-types.md`

## Design System (résumé)

- 6 couleurs dragon : Vert `#60B155` (primary), Teal `#33A6A6` (secondary), Or `#FFD966` (achievements), Violet `#561E46` (premium), Rose `#D45E95` (fun), Lavande `#C8B4DC` (subtil)
- Classes Tailwind : `bg-nuxy-green`, `text-nuxy-teal`, `border-nuxy-gold`, etc.
- Classes CTA : `.btn-cta`, `.btn-cta-teal`, `.btn-cta-premium`, `.btn-cta-fun`, `.btn-cta-accent`
- Badges : `.badge-achievement`, `.badge-new`, `.badge-premium`
- Détails complets dans `docs/design-system.md`

## Commandes

```bash
npm install          # Installer les dépendances
npm run dev          # Serveur de développement (http://localhost:3000)
npm run generate     # Générer le site statique
npm run preview      # Prévisualiser le build
```

## Notes pour Claude Code

- **Ne pas lancer automatiquement** les builds et serveurs de développement, sauf demande explicite.
- **Credentials** : fichier `.env` à la racine (ne jamais commiter).

## Documentation externalisée

| Fichier | Contenu |
|---------|---------|
| `docs/tone-and-voice.md` | Guide stylistique Duolingo (vocabulaire, exemples, labels) |
| `docs/design-system.md` | Palettes, typographie, classes CSS, ligne graphique |
| `docs/lesson-types.md` | Création de leçons, frontmatter, composants MDC |
| `docs/supabase-config.md` | Tables, composables, configuration Supabase |
