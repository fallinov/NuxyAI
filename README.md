# NuxyAI

Formation au développement assisté par IA avec Claude Code. Fork de [Nuxy](https://github.com/fallinov/Nuxy) (plateforme d'apprentissage JavaScript) adapté pour enseigner l'utilisation de l'IA dans le workflow de développement.

18 heures de formation, 2 phases, 7 modules. Leçons textuelles (guide, exercice, quiz, projet) avec progression synchronisée.

## Stack

- **Nuxt 4** + **Vue 3** (Composition API)
- **Nuxt UI 4** + **Tailwind CSS v4**
- **Nuxt Content v3** (leçons en Markdown)
- **Supabase** (Auth + PostgreSQL, schéma `nuxyai`)
- **TypeScript**

## Démarrage rapide

```bash
# Cloner le dépôt
git clone https://github.com/fallinov/NuxyAI.git
cd NuxyAI

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env  # Remplir les credentials Supabase

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
app/
├── components/lessons/    # Composants leçon (Header, Checklist, Quiz, etc.)
├── components/auth/       # Authentification
├── composables/           # useLessonProgress, useAuth, useClasses, useNuxyDb, etc.
├── pages/                 # index, lessons, lessons/[slug], auth/*, teacher/*
├── layouts/               # default, lesson
├── types/                 # database.types.ts
├── middleware/            # auth, teacher, guest
content/
└── lessons/               # Leçons Markdown avec frontmatter
```

## Déploiement

Déployé sur **Vercel**. Chaque push sur `main` déclenche un déploiement automatique.

```bash
npm run generate    # Build statique
npm run preview     # Prévisualiser le build
```

## Documentation

Voir `CLAUDE.md` pour la documentation technique complète (architecture, design system, conventions, guide de création de leçons).

## Licence

MIT
