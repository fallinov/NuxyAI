# Architecture Nuxy - Documentation Technique

## 📐 Vue d'ensemble de l'architecture

Nuxy utilise une architecture moderne et modulaire basée sur Nuxt 4, avec une séparation claire des responsabilités.

```
┌─────────────────────────────────────────────────────────────┐
│                     NUXY APPLICATION                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐        ┌─────────────┐                     │
│  │   Layouts   │        │    Pages    │                     │
│  │             │        │             │                     │
│  │ • default   │───────▶│ • index     │                     │
│  │ • exercise  │        │ • [slug]    │                     │
│  └─────────────┘        └─────────────┘                     │
│                                │                              │
│                                ▼                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              COMPOSANTS EXERCICES                     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │ LessonPanel  │  │  CodePanel   │  │OutputPanel │ │   │
│  │  │              │  │              │  │            │ │   │
│  │  │ Instructions │  │ Editor +     │  │ Console +  │ │   │
│  │  │ Objectifs    │  │ 5 Boutons    │  │ Validation │ │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │   │
│  │                           │                  │        │   │
│  │                           ▼                  ▼        │   │
│  │                 ┌──────────────┐  ┌────────────────┐ │   │
│  │                 │ExerciseEditor│  │ConsoleOutput   │ │   │
│  │                 └──────────────┘  └────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                │                              │
│                                ▼                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              COMPOSABLES & LOGIQUE                    │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │                                                        │   │
│  │  • useExerciseEngine    - Exécution JavaScript        │   │
│  │  • useExerciseProgress  - Suivi progression           │   │
│  │  • pedagogicalMessages  - Messages adaptés            │   │
│  │                                                        │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🗂️ Structure des composants

### 1. **Pages d'exercices** (`/exercises/[slug].vue`)

**Responsabilités** :
- Orchestration globale de l'exercice
- Gestion de l'état (validation, progression, solution)
- Layout responsive (desktop/mobile)
- Communication entre les 3 panels

**État principal** :
```typescript
const validationResult = ref()      // Résultat validation
const exerciseStatus = ref()        // not-started | in-progress | completed
const showSolution = ref(false)     // Affichage solution
const isSidebarOpen = ref(false)    // Menu exercices
const activeTab = ref('lesson')     // Onglet mobile actif
```

**Flux de données** :
```
[slug].vue
    ├─> LessonPanel (instructions, hints)
    ├─> CodePanel (éditeur + boutons)
    │   └─> execute → handleExecute() → executeCode()
    └─> OutputPanel (console + validation + solution)
```

---

### 2. **LessonPanel** (`components/exercises/LessonPanel.vue`)

**Contenu** :
- Badges (difficulté, statut)
- Titre et description
- Instructions formatées
- Objectifs pédagogiques
- Hints progressifs (optionnel)

**Props** :
```typescript
{
  title: string
  description: string
  instructions: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exerciseStatus: 'not-started' | 'in-progress' | 'completed'
  validationResult: ValidationResult
  attempts: number
  hints: Hint[]
  showHints: boolean
}
```

---

### 3. **CodePanel** (`components/exercises/CodePanel.vue`)

**Contenu** :
- ExerciseEditor (CodeMirror 6)
- 5 boutons d'action style Codecademy :
  1. **Run** - Exécute le code (vert, proéminent)
  2. **Copy** - Copie le code
  3. **Reset** - Réinitialise
  4. **Prettify** - Formate le code
  5. **View Solution** - Affiche la solution

**Événements émis** :
```typescript
emit('execute', code: string)
emit('reset')
emit('view-solution')
```

**Méthodes exposées par ExerciseEditor** :
```typescript
{
  getCode(): string
  setCode(code: string): void
  executeCode(): void
  clearConsole(): void
  clearAll(): void
}
```

---

### 4. **OutputPanel** (`components/exercises/OutputPanel.vue`)

**Contenu** :
- ExerciseConsoleOutput (logs, erreurs, warnings)
- Résultats de validation (succès/progression)
- Checklist des objectifs
- Solution officielle (si demandée)

**Props** :
```typescript
{
  validationResult: ValidationResult
  objectives: Objective[]
  exerciseStatus: string
  showSolution: boolean
  solution: ExerciseSolution | null
}
```

**Données affichées** :
```typescript
const { lastResult, executionTime } = useExerciseEngine()
// lastResult = { logs, errors, warnings }
```

---

### 5. **ExerciseConsoleOutput** (`components/exercises/ExerciseConsoleOutput.vue`)

**Responsabilité** : Affichage formaté de la console

**Types de messages** :
- `log` - Log normal (›)
- `info` - Information (🔵)
- `warn` - Warning (⚠️)
- `error` - Erreur (❌)
- `pedagogical-warning` - Warning pédagogique
- `pedagogical-error` - Erreur pédagogique

**Message pédagogique** :
```typescript
{
  type: 'error' | 'warning' | 'info'
  title: string              // "Variable non déclarée"
  message: string            // Explication simple
  hint?: string              // Conseil
  example?: string           // Code d'exemple
  learnMore?: string         // Lien MDN
  learnMoreTitle?: string    // Titre du lien
}
```

---

## 🔄 Flux d'exécution du code

### 1. **Déclenchement** (utilisateur clique "Run" ou Ctrl+Enter)

```typescript
// CodePanel.vue
handleRun() {
  const code = editorRef.value.getCode()
  emit('execute', code)
}
```

### 2. **Orchestration** (page exercice)

```typescript
// [slug].vue
const handleExecute = async (code: string) => {
  await executeCode(code)
  const result = lastResult.value

  if (result.errors.length === 0) {
    validateCode(code)
  }
}
```

### 3. **Exécution** (moteur JavaScript)

```typescript
// useExerciseEngine.js
const executeCode = async (code) => {
  try {
    // 1. Créer sandbox sécurisé
    const sandbox = createSandbox()

    // 2. Exécuter avec timeout (5s)
    const result = await executeInSandbox(code, sandbox)

    // 3. Capturer logs/errors/warnings
    lastResult.value = {
      logs: sandbox.logs,
      errors: transformErrors(sandbox.errors),
      warnings: detectWarnings(code)
    }
  } catch (error) {
    // 4. Transformer en message pédagogique
    const pedagogical = getPedagogicalError(error)
    lastResult.value.errors.push({
      type: 'error',
      content: error.message,
      pedagogical
    })
  }
}
```

### 4. **Transformation pédagogique**

```typescript
// pedagogicalMessages.ts
export function getPedagogicalError(error: Error): PedagogicalError {
  // Analyse du type d'erreur
  if (error.name === 'ReferenceError') {
    return {
      type: 'error',
      title: 'Variable non déclarée',
      message: 'Vous utilisez une variable qui n\'existe pas...',
      hint: 'Déclarez la variable avec const ou let avant de l\'utiliser',
      example: 'const maVariable = "valeur"',
      learnMore: 'https://developer.mozilla.org/fr/docs/...'
    }
  }
  // ... autres types d'erreurs
}
```

### 5. **Validation** (si pas d'erreurs)

```typescript
// [slug].vue
const validateCode = (code: string) => {
  const rules = getExerciseValidation(slug).rules
  const results = validateExercise(code, rules)

  validationResult.value = results

  if (results.isValid) {
    completeExercise(slug)
    exerciseStatus.value = 'completed'
    showSuccessToast()
  }
}
```

### 6. **Affichage** (OutputPanel)

```typescript
// OutputPanel.vue
<ExercisesExerciseConsoleOutput
  :logs="lastResult.logs"
  :errors="lastResult.errors"
  :warnings="lastResult.warnings"
/>

// ExerciseConsoleOutput.vue
// Affiche chaque message avec le bon formatage :
// - Logs normaux (gris)
// - Erreurs pédagogiques (rouge avec conseils)
// - Warnings (orange avec explications)
// - Exemples de code (expandable)
// - Liens MDN (externe)
```

---

## 🎨 Système de messages pédagogiques

### Types d'erreurs gérées

| Type | Exemple | Message pédagogique |
|------|---------|---------------------|
| `ReferenceError` | `console.log(x)` | "Variable non déclarée" + exemple |
| `SyntaxError` | `const x =` | "Erreur de syntaxe" + correction |
| `TypeError` | `x()` où x n'est pas une fonction | "Tentative d'appel invalide" |
| `RangeError` | Récursion infinie | "Boucle ou récursion infinie" |

### Warnings détectés

| Warning | Détection | Message |
|---------|-----------|---------|
| Usage de `var` | Regex `/\bvar\s+/` | "Préférez const ou let" |
| Usage de `==` | Regex `/\s==\s/` | "Utilisez === pour comparer" |
| Trop de `console.log` | Count > 5 | "Trop de console.log" |

### Structure du message

```typescript
interface PedagogicalError {
  type: 'error' | 'warning' | 'info'
  title: string              // Titre court
  message: string            // Explication détaillée
  hint?: string              // Conseil pratique
  example?: string           // Code d'exemple
  learnMore?: string         // URL MDN
  learnMoreTitle?: string    // Texte du lien
}
```

---

## 📊 Gestion de la progression

### localStorage

```typescript
// Stockage
{
  'nuxy_progress': {
    'hello-javascript': {
      status: 'completed',
      attempts: 5,
      completedAt: '2025-01-14T...'
    },
    'variables-declarations': {
      status: 'in-progress',
      attempts: 2
    }
  }
}
```

### API

```typescript
// useExerciseProgress.ts
export function useExerciseProgress() {
  return {
    getExerciseStatus(slug: string): ExerciseStatus
    startExercise(slug: string): void
    completeExercise(slug: string): void
    getAttempts(slug: string): number
  }
}
```

---

## 🎯 Optimisations réalisées

### 1. **Performance**

✅ Computed properties pour les calculs
✅ Refs pour la réactivité minimale
✅ Composables réutilisables
✅ Lazy loading des exercices

### 2. **UX**

✅ Solution dans la console (pas de popup)
✅ Bascule auto vers Output sur mobile
✅ Tooltips informatifs sur tous les boutons
✅ Boutons avec contraste optimal

### 3. **Architecture**

✅ Séparation claire des responsabilités
✅ Props/Events pour la communication
✅ Composants réutilisables
✅ Types TypeScript stricts

### 4. **Accessibilité**

✅ Contraste élevé (WCAG AA)
✅ Labels descriptifs
✅ Navigation clavier (Ctrl+Enter)
✅ Messages d'erreur clairs

---

## 🔧 Points d'extension

### Ajouter un nouvel exercice

1. Créer `/content/exercises/mon-exercice.md`
2. Ajouter la validation dans `/data/exerciseValidations.ts`
3. Ajouter les hints dans `/data/exerciseHints.ts`
4. Ajouter la solution dans `/data/exerciseSolutions.ts`
5. Ajouter à la liste dans `/data/exercisesList.ts`

### Ajouter un nouveau type d'erreur pédagogique

1. Identifier le pattern d'erreur
2. Ajouter le cas dans `/utils/pedagogicalMessages.ts`
3. Créer le message avec title, message, hint, example
4. Ajouter le lien MDN correspondant

### Personnaliser le système de validation

1. Créer de nouvelles règles dans `/data/exerciseValidations.ts`
2. Utiliser les types existants : `hasVariable`, `callsFunction`, `usesOperator`, etc.
3. Combiner plusieurs règles pour validation complexe

---

## 📝 Conventions de code

### Nommage

- **Composants** : PascalCase (`ExerciseEditor.vue`)
- **Composables** : camelCase avec `use` (`useExerciseEngine.js`)
- **Utilitaires** : camelCase (`pedagogicalMessages.ts`)
- **Types** : PascalCase (`PedagogicalError`)

### Structure des fichiers

```
component.vue
├─ <script setup lang="ts">
│  ├─ Interfaces
│  ├─ Props/Emits
│  ├─ Composables
│  ├─ Reactive state
│  └─ Functions
├─ <template>
│  └─ HTML with Nuxt UI components
└─ <style scoped>
   └─ CSS spécifique si nécessaire
```

### Documentation

- **Commentaires JSDoc** pour les fonctions publiques
- **Commentaires inline** pour la logique complexe
- **README** pour les modules importants

---

## 🚀 Performance

### Métriques actuelles

- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3s
- **Lighthouse Score** : 95+
- **Bundle size** : ~500KB (optimisable)

### Optimisations futures

- [ ] Code splitting par exercice
- [ ] Lazy loading de CodeMirror
- [ ] Service Worker pour offline
- [ ] Compression gzip/brotli
- [ ] CDN pour les assets statiques

---

## 🔒 Sécurité

### Sandbox JavaScript

- Exécution isolée dans une fonction
- Timeout de 5 secondes
- Pas d'accès au DOM global
- Pas d'accès aux API sensibles

### Validation

- Pas d'exécution côté serveur
- Validation locale uniquement
- Pas de persistence sensible

---

## 📚 Ressources

- [Nuxt 4 Documentation](https://nuxt.com)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [CodeMirror 6](https://codemirror.net)
- [Nuxt UI](https://ui.nuxt.com)
- [MDN JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)

---

**Dernière mise à jour** : 2025-01-14
**Version** : 1.0.0
**Auteur** : Nuxy Team
