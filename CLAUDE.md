# Nuxy - Plateforme d'apprentissage JavaScript

Projet **ESIG** — contexte institutionnel, plans de cours et stack technique : voir `~/ESIG/CLAUDE.md`.

## Vue d'ensemble

Nuxy est une plateforme d'apprentissage JavaScript interactive conçue pour les débutants. Elle permet d'apprendre JavaScript à travers des micro-exercices avec un éditeur de code professionnel et un système de messages pédagogiques.

## 🏗️ Architecture technique

### Stack principal
- **Framework** : Nuxt 4 (SSG - Static Site Generation)
- **UI Framework** : Vue 3 (Composition API avec `<script setup>`)
- **UI Library** : Nuxt UI 4
- **Éditeur de code** : CodeMirror 6
- **Langage** : TypeScript + JavaScript
- **Styling** : Tailwind CSS
- **Backend** : Supabase (Auth + PostgreSQL + Realtime)
- **Déploiement** : GitHub Pages + Vercel

### Design System

#### Logo officiel
Le logo officiel Nuxy est situé dans **`public/images/nuxy-logo.svg`**.

Le logo utilise un **design flat (aplat)** sans dégradés complexes, en cohérence avec le style Duolingo adopté pour l'interface.

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

### Configuration Supabase
- **Projet** : fesou (`qsayrwlksinxvuugwhtv`)
- **Schéma** : `nuxy` (séparé du schéma `public`)
- **Credentials** : Fichier `.env` à la racine du projet
- **Documentation schéma** : `supabase_schema.sql`

### Structure du projet

```
app/
├── components/
│   ├── NuxyLogo.vue                 # Logo mascotte dragon (tailles: sm, md, lg, xl)
│   ├── auth/                        # Composants d'authentification
│   │   └── ...
│   └── exercises/
│       ├── ExerciseEditor.vue       # Éditeur CodeMirror
│       ├── ExerciseConsoleOutput.vue # Affichage console pédagogique
│       ├── ExerciseCard.vue         # Carte d'exercice
│       └── ExerciseNavigation.vue   # Navigation exercices
├── composables/
│   ├── useExerciseEngine.js         # Moteur d'exécution JavaScript (exercices JS)
│   ├── useHtmlCssJsEngine.ts        # Moteur d'exécution HTML/CSS/JS (exercices DOM)
│   ├── useExerciseStats.ts          # Tracking erreurs et exécutions → Supabase
│   ├── useExerciseProgress.ts       # Progression localStorage (legacy)
│   ├── useSupabaseProgress.ts       # Progression synchronisée Supabase
│   ├── useNuxyDb.ts                 # Helper pour accès schéma nuxy
│   ├── useAuth.ts                   # Authentification Supabase
│   ├── useProfile.ts                # Gestion profil utilisateur
│   ├── useClasses.ts                # Gestion des classes
│   └── useClassAnalytics.ts         # Analytique classes enseignant
├── middleware/
│   └── teacher.ts                   # Protection routes enseignants
├── utils/
│   └── pedagogicalMessages.ts       # Système de messages pédagogiques
├── pages/
│   ├── index.vue                    # Page d'accueil
│   ├── auth/                        # Login, Register, Callback
│   ├── profile/                     # Profil utilisateur
│   ├── join/[code].vue              # Rejoindre classe via code
│   └── teacher/                     # Dashboard enseignant
├── types/
│   ├── database.types.ts            # Types TypeScript Supabase (requis par @nuxtjs/supabase)
│   └── htmlCssJs.ts                 # Types pour l'éditeur HTML/CSS/JS
├── app.config.ts                    # Config Nuxt UI (couleurs sémantiques)
├── app.css                          # Design system (polices, variables CSS)
└── assets/
    └── css/
        └── tailwind.css

public/
├── fonts/
│   ├── inter/                       # Police Inter (400-900)
│   └── jetbrains-mono/              # Police JetBrains Mono (400-600)
├── images/
│   ├── nuxy-logo.svg                # Logo mascotte dragon
│   └── placeholder.svg              # Placeholder image (50x50, local)
├── favicon.svg                      # Logo dragon SVG
├── favicon.ico                      # Logo dragon ICO (multi-sizes)
└── ...                              # Autres fichiers statiques

.output/
└── public/                          # Build statique pour déploiement
```

## 🎯 Fonctionnalités principales

### 1. Éditeur de code professionnel (CodeMirror 6)
- Coloration syntaxique JavaScript
- Thème sombre (One Dark)
- Auto-complétion intelligente :
  - Se déclenche automatiquement après 2+ caractères (délai 300ms)
  - Désactivée dans les strings, commentaires et regex (`ifNotIn`)
  - `selectOnOpen: false` : Enter = retour à la ligne, ↓ puis Enter pour accepter
  - Filtrage strict par préfixe (pas de fuzzy), max 10 options
  - `Ctrl+Space` pour forcer l'ouverture (⚠️ conflit macOS avec changement de source de saisie)
- Raccourcis clavier :
  - `Ctrl+Enter` (Windows/Linux) ou `Cmd+Enter` (Mac) : Exécuter le code
  - `Shift+Enter` : Exécuter le code (alternatif)

**Fichier** : `app/components/exercises/ExerciseEditor.vue`

### 2. Moteur d'exécution JavaScript sécurisé
- Exécution en mode strict (`'use strict'`)
- Sandbox avec timeout (5 secondes max)
- Capture de `console.log`, `console.warn`, `console.error`, `console.info`
- Persistance du contexte entre exécutions
- Support des template literals (backticks)

**Fichier** : `app/composables/useExerciseEngine.js`

### 3. Système de messages pédagogiques (~450 lignes)
Transforme les erreurs JavaScript techniques en messages adaptés aux débutants :

#### Types d'erreurs gérées (16+ patterns) :
- **ReferenceError** : Variable non déclarée, `document` non disponible
- **SyntaxError** : Parenthèses/accolades manquantes, `=>` manquant (arrow function), virgule manquante, template literal mal fermé, token inattendu, expression inattendue
- **TypeError** : Appel de fonction sur non-fonction, propriété sur undefined/null, erreur de casse (`.Includes` → `.includes`), `is not iterable`, assignment to constant
- **RangeError** : Récursion infinie

#### Warnings détectés :
- Usage de `var` au lieu de `let`/`const`
- Usage de `==` au lieu de `===`
- Trop de `console.log` (> 5)

#### Structure des messages :
```typescript
interface PedagogicalError {
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
  hint?: string
  example?: string
  learnMore?: string  // Lien vers documentation MDN
}
```

**Fichier** : `app/utils/pedagogicalMessages.ts`

#### Architecture iframe (exercices HTML/CSS/JS)
Les exercices DOM (module 7+) s'exécutent dans un `<iframe>` sandbox via `PreviewPanel.vue` :
- **2 blocs `<script>` séparés** : infrastructure (window.onerror, console interception) + code utilisateur. Séparer est essentiel pour capter les SyntaxError du code élève.
- **3 mécanismes d'erreur** : `try/catch` (sync), `window.onerror` (SyntaxError), `unhandledrejection` (promesses)
- **Pipeline** : iframe → `postMessage` → `PreviewPanel` → émission `@console-log` → `SplitOutputPanel.consoleEntries` → transfert vers `htmlCssJsEngine` pour validation
- `translateErrorMessage()` extrait le type d'erreur via regex depuis le message string de `window.onerror`

**Fichiers** : `app/composables/useHtmlCssJsEngine.ts`, `app/components/exercises/PreviewPanel.vue`

### 4. Console pédagogique
- Affichage des logs avec formatage intelligent
- Messages d'erreur pédagogiques avec exemples
- Warnings avec conseils
- Temps d'exécution affiché
- Support des objets, tableaux, fonctions avec troncature intelligente

**Fichier** : `app/components/exercises/ExerciseConsoleOutput.vue`

### 5. Backend Supabase (Authentification et Classes)

#### Configuration
Les credentials Supabase sont dans le fichier `.env` :
```bash
SUPABASE_URL=https://qsayrwlksinxvuugwhtv.supabase.co
SUPABASE_KEY=eyJhbGci...  # Clé anon publique
NUXT_PUBLIC_SUPABASE_SCHEMA=nuxy
```

#### Schéma de base de données (`nuxy`)

| Table | Description |
|-------|-------------|
| `profiles` | Profils utilisateurs (id, email, full_name, role, avatar_url) |
| `classes` | Classes (id, name, description, teacher_id, invite_code, is_active) |
| `class_members` | Relation élève-classe (class_id, student_id, joined_at) |
| `exercise_progress` | Progression (user_id, exercise_slug, status, attempts, saved_code) |
| `exercise_errors` | Erreurs pédagogiques (user_id, exercise_slug, error_type, error_message, code_snapshot) |

**Fichier SQL** : `supabase_schema.sql`

#### Composable `useNuxyDb()`
Helper centralisé pour accéder au schéma `nuxy` :

```typescript
const { from, rpc, channel, client } = useNuxyDb()

// Requête sur une table du schéma nuxy
const { data } = await from('profiles').select('*').eq('id', userId)

// Appel RPC
const { data } = await rpc('join_class_by_code', { code: 'ABC123' })

// Realtime
const chan = channel('changes').on('postgres_changes', { schema: 'nuxy', ... })
```

**Fichier** : `app/composables/useNuxyDb.ts`

#### Composable `useAuth()`
Gestion de l'authentification :
- `login(email, password)` : Connexion
- `register(email, password, fullName, role)` : Inscription
- `logout()` : Déconnexion
- `resetPassword(email)` : Réinitialisation mot de passe
- `isTeacher`, `isStudent` : Computed pour les rôles

**Fichier** : `app/composables/useAuth.ts`

#### Composable `useClasses()`
Gestion des classes pour enseignants :
- `createClass(name, description)` : Créer une classe
- `updateClass(id, data)` : Modifier une classe
- `deleteClass(id)` : Supprimer une classe
- `regenerateInviteCode(id)` : Nouveau code d'invitation
- `getClassStatistics(id)` : Stats (élèves, exercices complétés)
- Realtime : Mise à jour automatique des membres et progression

**Fichier** : `app/composables/useClasses.ts`

#### Composable `useExerciseStats()`
Tracking des erreurs et exécutions vers Supabase :
- `trackExecution(success)` : Log une exécution (réussie ou échouée)
- `trackError(type, message, line?, code?, details?)` : Log une erreur avec contexte pédagogique
- Fonctionne pour les exercices JS-only ET HTML/CSS/JS (depuis v1.16.2)

**Fichier** : `app/composables/useExerciseStats.ts`

#### Middleware `teacher`
Protège les routes `/teacher/*` :
- Vérifie que l'utilisateur est connecté
- Vérifie que le rôle est `teacher`
- Redirige vers `/auth/login` ou `/` sinon

**Fichier** : `app/middleware/teacher.ts`

## 🔧 Commandes utiles

### Développement
```bash
npm install          # Installer les dépendances
npm run dev         # Lancer le serveur de développement (http://localhost:3000)
```

### Build et déploiement
```bash
npm run generate    # Générer le site statique (.output/public)
npm run preview     # Prévisualiser le build
```

### Tests
```bash
node test-console-pedagogique.mjs  # Exécuter les tests automatisés (23 tests)
```


## 📚 Documentation des composants

### ExerciseEditor.vue
Éditeur de code basé sur CodeMirror 6.

**Props** :
- `initialCode` (string) : Code initial à afficher
- `placeholder` (string) : Placeholder de l'éditeur
- `readOnly` (boolean) : Mode lecture seule

**Émissions** :
- `execute` : Émis quand le code doit être exécuté (via bouton ou Ctrl+Enter)
- `code-change` : Émis quand le code change

**Utilisation** :
```vue
<ExercisesExerciseEditor
  :initial-code="exerciseCode"
  @execute="handleExecute"
  @code-change="handleCodeChange"
/>
```

### useExerciseEngine()
Composable pour l'exécution du code JavaScript.

**Retour** :
```javascript
{
  executeCode,           // Function(code, options) => Promise<void>
  executionResults,      // Ref<ExecutionResult>
  isExecuting,           // Ref<boolean>
  executionTime,         // Ref<number>
  lastError,             // Ref<PedagogicalError | null>
  clearResults,          // Function() => void
  resetContext           // Function() => void
}
```

**Utilisation** :
```vue
<script setup>
const { executeCode, executionResults, isExecuting } = useExerciseEngine()

async function handleExecute(code) {
  await executeCode(code)
}
</script>
```


## 🧪 Tests

### Tests automatisés
Le fichier `test-console-pedagogique.mjs` contient 23 tests unitaires validant :
- Détection des erreurs (ReferenceError, SyntaxError, TypeError, RangeError)
- Génération de messages pédagogiques
- Détection des warnings (var, ==, console.log)
- Formatage des valeurs (objets, tableaux, fonctions)

**Résultats** : 23/23 tests passent (100%)

### Tests manuels
Le fichier `TESTS_CONSOLE.md` contient 4 procédures de test manuels pour validation dans le navigateur.

## 📖 Références

### Documentation officielle
- **Nuxt 4** : https://nuxt.com/docs
- **Vue 3** : https://vuejs.org/guide/introduction.html
- **CodeMirror 6** : https://codemirror.net/docs/
- **Nuxt UI** : https://ui.nuxt.com/
- **Supabase** : https://supabase.com/docs
- **@nuxtjs/supabase** : https://supabase.nuxtjs.org/

### Liens MDN utilisés dans les messages pédagogiques
- Variables et déclarations : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types#déclarations
- Syntaxe de base : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types
- Fonctions : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions
- Objets et propriétés : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Working_with_objects
- Récursion : https://developer.mozilla.org/en/docs/Glossary/Recursion
- const/let : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/const
- Opérateurs de comparaison : https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_operators#opérateurs_de_comparaison

## 🎓 Philosophie pédagogique

Nuxy est conçu pour :
1. **Encourager la pratique** : Micro-exercices pour pratiquer sans se sentir dépassé
2. **Fournir un feedback immédiat** : Exécution instantanée avec messages clairs
3. **Expliquer plutôt que juger** : Messages pédagogiques adaptés aux débutants
4. **Guider vers les bonnes pratiques** : Warnings pour `var`, `==`, etc.
5. **Référencer la documentation officielle** : Liens MDN pour approfondir

## 🗣️ Ton & Voix (Style Duolingo)

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

| ❌ Avant (formel) | ✅ Après (Duolingo) |
|-------------------|---------------------|
| "Apprenez JavaScript en pratiquant" | "Apprends JavaScript en codant" |
| "Connectez-vous pour sauvegarder votre progression" | "Connecte-toi pour retrouver ta progression" |
| "Commencer gratuitement" | "C'est parti !" |
| "Trois étapes simples pour progresser" | "3 étapes. C'est tout." |
| "Erreur de connexion" | "Oups, ça n'a pas marché" |
| "Votre avancement est enregistré" | "On se souvient où tu en étais" |
| "Messages d'erreur adaptés aux débutants" | "Pas de jargon. On t'explique ce qui cloche." |
| "Bloqué ? Des indices vous guident" | "Des indices si tu bloques" |
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
// ✅ Bon ton
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

toast.add({
  title: 'Top, c\'est envoyé !',
  description: 'On te tient au courant !',
  color: 'success'
})

// ❌ Ton à éviter
toast.add({
  title: 'Bienvenue',
  description: 'Vous êtes maintenant connecté.',
  color: 'success'
})
```

### Messages d'erreur pédagogiques

Les erreurs doivent être :
- **Rassurantes** : "Pas de panique, c'est normal de se tromper"
- **Explicatives** : "Voici ce qui s'est passé..."
- **Actionnables** : "Essaie plutôt..."

```typescript
// ✅ Bon
{
  title: "Oups, variable inconnue",
  message: "Tu utilises `nom` mais tu ne l'as pas encore créée.",
  hint: "Déclare-la d'abord avec let ou const"
}

// ❌ À éviter
{
  title: "ReferenceError",
  message: "nom is not defined",
  hint: "Déclarez la variable avant de l'utiliser"
}
```

### Labels et boutons

| Contexte | Texte |
|----------|-------|
| CTA principal | "C'est parti !" |
| CTA secondaire | "Explorer" |
| Connexion | "Te connecter" |
| Inscription | "Créer ton compte" |
| Retour | "Retour" |
| Continuer | "Continuer" |
| Valider exercice | "Vérifier" |
| Voir solution | "Un coup de pouce" |
| Réessayer | "On réessaie !" |

### Pages spécifiques

#### Page d'accueil
- Hero : Accrocheur, direct ("Tu débutes en prog ? Parfait.")
- Features : Bénéfices concrets, pas de jargon
- CTA final : Engageant ("Alors, on code ?")

#### Pages auth
- Login : "Content de te revoir !"
- Register : "Bienvenue !"
- Erreurs : Toujours rassurantes

#### Exercices
- Consignes : Claires et directes
- Succès : Célébrer ! ("Bravo !", "Parfait !")
- Échec : Encourager ("Presque ! Essaie encore")

### Messages de validation des exercices

Les champs `errorMessage` et `successMessage` dans les exercices doivent respecter le ton Duolingo.

#### successMessage (quand l'élève réussit)

| ❌ À éviter | ✅ Préférer |
|-------------|-------------|
| "Correct" | "Bien joué !" |
| "push() utilisé !" | "Top ! Tu maîtrises push()" |
| "OK !" | "Parfait !" |
| "Validé" | "Bravo ! Tu as réussi" |

**Patterns recommandés :**
- "Bien ! Tu sais [action]"
- "Super ! Tu maîtrises [concept]"
- "Parfait ! [Feedback positif]"
- "Bravo ! [Encouragement final]"
- "Top ! [Compliment]"

#### errorMessage (quand l'élève se trompe)

| ❌ À éviter | ✅ Préférer |
|-------------|-------------|
| "Erreur" | "Oups, essaie encore" |
| "Utilisez X" | "Essaie X" |
| "Incorrect" | "Pas tout à fait..." |
| "Le code doit contenir..." | "N'oublie pas d'ajouter..." |

**Patterns recommandés :**
- "Essaie [suggestion]"
- "N'oublie pas [rappel]"
- "Attention, [explication]"
- "Presque ! [correction]"

#### Exemples complets

```yaml
# ✅ Bon ton
validations:
  - description: "Utiliser forEach"
    errorMessage: "Essaie prenoms.forEach() pour parcourir le tableau"
    successMessage: "Bien ! Tu utilises forEach"
  - description: "Afficher tous les prénoms"
    errorMessage: "N'oublie pas d'afficher chaque prénom"
    successMessage: "Bravo ! Tout le monde est salué"

# ❌ Ton à éviter
validations:
  - description: "Utiliser forEach"
    errorMessage: "Utilisez prenoms.forEach()"
    successMessage: "forEach utilisé"
  - description: "Afficher tous les prénoms"
    errorMessage: "La sortie est incorrecte"
    successMessage: "OK"
```


## 📝 Notes pour Claude Code

### ⚠️ BUILDS ET SERVEURS DE TEST

**Ne pas lancer automatiquement** : L'utilisateur se charge de tester les builds et de démarrer les serveurs de développement, sauf demande explicite. Cela permet de gagner du temps et d'éviter les attentes inutiles.

### ⚠️ GESTION DES EXERCICES - SOURCE UNIQUE

**Architecture consolidée** : Toutes les données d'un exercice sont dans un **seul fichier Markdown** avec frontmatter YAML.

#### Création d'un exercice

Créer un fichier `content/exercises/[slug].md` avec la structure suivante :

```yaml
---
title: "Titre de l'exercice"
description: "Description courte"
difficulty: beginner  # beginner | intermediate | advanced
module: 1             # Module (1-9)
exerciseNumber: "1.1" # Numéro affiché (sert aussi au tri)
duration: 5           # Durée estimée en minutes
tags:
  - javascript
  - console
concepts:
  - console.log
  - Chaînes de caractères

starterCode: |
  // Code initial
  // Écrivez votre code ici

solution:
  code: |
    console.log("Hello World!")
  explanation: "Explication de la solution"

validations:
  - description: "Utiliser console.log"
    type: code_contains          # Types: code_contains, code_matches, output_contains, output_matches, variable_exists, no_error
    expected: "console.log"
    errorMessage: "Utilisez console.log()"
    successMessage: "Bien joué !"

hints:
  - title: "Premier indice"
    content: "Explication du concept"
    example: "console.log('exemple')"
---

# Contenu Markdown de l'exercice

## 🎯 Objectif
...

## 📖 Contexte
...

## 📝 Consigne
...
```

#### Types de validation disponibles

| Type | Description | Paramètres |
|------|-------------|------------|
| `code_contains` | Le code contient le texte | `expected` |
| `code_matches` | Le code match la regex | `expected` (regex) |
| `output_contains` | La sortie contient le texte | `expected` |
| `output_matches` | La sortie match la regex | `expected` (regex) |
| `variable_exists` | Une variable existe | `variable` |
| `no_error` | Pas d'erreur d'exécution | (aucun) |

#### Checklist

```
□ 1. Créer content/exercises/[slug].md avec frontmatter complet
□ 2. Vérifier le build : npm run generate
```

C'est tout ! Plus besoin de modifier plusieurs fichiers TypeScript.

#### Placeholders dans le starterCode

**⚠️ Ne jamais utiliser `___` comme placeholder** — cause un `ReferenceError` à l'exécution.

| ✅ Utiliser | ❌ Éviter |
|-------------|-----------|
| `"?"` (string) | `___` (identifiant invalide) |
| `/* ton code ici */` (commentaire) | Variable pré-déclarée que l'élève doit écrire |
| `false` (valeur par défaut) | |

Ne pas pré-déclarer avec `const` les variables que l'élève doit créer → cause une `SyntaxError` de redéclaration.

#### Numérotation des exercices

**Format** : `[module].[numéro dans le module]` (ex: `8.4` pour module 8, exercice 4)

- Le champ `exerciseNumber` est la **seule source de tri** des exercices
- Les exercices sont triés automatiquement par `exerciseNumber` (1.1 < 1.2 < 2.1 < 2.2...)
- Lors de l'ajout d'un exercice, s'assurer que `exerciseNumber` est unique et suit la séquence du module

### Credentials et configuration
**Lire le fichier `.env`** à la racine du projet pour accéder aux credentials nécessaires.

#### Variables d'environnement actuelles :
```bash
# Supabase - Projet Fesou (schéma: nuxy)
SUPABASE_URL=https://qsayrwlksinxvuugwhtv.supabase.co
SUPABASE_KEY=eyJhbGci...  # Clé anon publique

# Schéma Supabase personnalisé
NUXT_PUBLIC_SUPABASE_SCHEMA=nuxy
```

#### Projet Supabase :
- **Nom** : fesou
- **ID** : qsayrwlksinxvuugwhtv
- **Schéma** : `nuxy` (exposé dans les paramètres API)
- **Dashboard** : https://supabase.com/dashboard/project/qsayrwlksinxvuugwhtv

⚠️ Ne jamais commiter le `.env` (déjà dans `.gitignore`)

### Points d'attention
- Toujours tester le build avec `npm run generate` avant de commiter
- Les raccourcis clavier doivent être cross-platform (utiliser `Mod-Enter`)
- Les messages pédagogiques doivent être clairs et bienveillants
- Éviter les template literals dans le code qui sera évalué dynamiquement
- Les liens doivent pointer vers MDN en français quand disponible
- **⚠️ TON DUOLINGO OBLIGATOIRE** : Tous les textes UI doivent utiliser le tutoiement ("tu"), être courts et encourageants. Voir section "🗣️ Ton & Voix" pour les guidelines complètes.

### ⚠️ Supabase - Points critiques

#### Progression : utiliser `useSupabaseProgress()`
```typescript
// ✅ Correct - synchronise localStorage ET Supabase
const { stats, getExerciseStatus, completeExercise, syncFromLocalStorage } = useSupabaseProgress()

// ❌ Incorrect - localStorage uniquement, invisible pour les enseignants
const { stats } = useExerciseProgress()  // DÉPRÉCIÉ
```

#### ID utilisateur : utiliser `getUserId()`
Le module `@nuxtjs/supabase` retourne le payload JWT où l'ID est dans `sub`, pas `id` :
```typescript
// ✅ Correct
const getUserId = () => user.value?.id || (user.value as any)?.sub || null
const userId = getUserId()

// ❌ Incorrect - peut retourner undefined
const userId = user.value?.id
```

#### Schéma personnalisé : utiliser `useNuxyDb()`
```typescript
// ✅ Correct - accède au schéma 'nuxy'
const { from, rpc } = useNuxyDb()
const { data } = await from('profiles').select('*')

// ❌ Incorrect - accède au schéma 'public' par défaut
const supabase = useSupabaseClient()
const { data } = await supabase.from('profiles').select('*')
```

### Conventions spécifiques Nuxy
- TypeScript pour les utilitaires, JavaScript pour les composables
- Utilitaires : camelCase (pedagogicalMessages.ts)

> Les conventions générales (Composition API, nommage, Nuxt UI, accessibilité) sont dans `~/.claude/rules/`.
