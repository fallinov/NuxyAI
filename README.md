# 🚀 Plateforme d'apprentissage JavaScript

![Nuxy Logo](public/images/nuxy-logo.svg)

Plateforme interactive d'apprentissage de JavaScript par la pratique avec des micro-exercices progressifs.

## ✨ Fonctionnalités

### Architecture
*   **Framework** : [Nuxt 4](https://nuxt.com) avec génération statique (SSG)
*   **UI** : [Nuxt UI v4](https://ui.nuxt.com) (Tailwind CSS v4)
*   **Contenu** : [Nuxt Content v3](https://content.nuxt.com)
*   **Déploiement** : GitHub Pages avec workflow automatique

### Pédagogie
*   ✅ **Console interactive** pour exécuter du code JavaScript en direct
*   ✅ **Micro-exercices progressifs** du débutant à l'avancé
*   ✅ **Feedback immédiat** pour valider les réponses
*   ✅ **Système de progression** (localStorage + Supabase)
*   ✅ **Architecture modulaire** pour ajouter facilement des centaines d'exercices

### Gestion de classes (Supabase)
*   ✅ **Authentification** : Inscription/connexion avec email/mot de passe
*   ✅ **Rôles** : Élèves et enseignants
*   ✅ **Classes** : Création de classes par les enseignants
*   ✅ **Codes d'invitation** : Rejoindre une classe via un code unique
*   ✅ **Progression synchronisée** : Sauvegarde automatique dans Supabase
*   ✅ **Dashboard enseignant** : Suivi de la progression des élèves en temps réel

## 🗣️ Ton & Voix (Style Duolingo)

Nuxy utilise un **ton inspiré de Duolingo** : amical, encourageant, et accessible.

### Principes clés
| Règle | Description |
|-------|-------------|
| **Tutoiement** | Toujours "tu", jamais "vous" |
| **Phrases courtes** | Direct et punchy |
| **Encourageant** | Positif, célèbre les victoires |
| **Humour léger** | Touches d'humour sans excès |

### Exemples
| ❌ Formel | ✅ Duolingo |
|-----------|-------------|
| "Apprenez JavaScript" | "Apprends JavaScript" |
| "Commencer gratuitement" | "C'est parti !" |
| "Erreur de connexion" | "Oups, ça n'a pas marché" |
| "Votre progression" | "Ta progression" |

> **📖 Détails complets** : Voir la section "🗣️ Ton & Voix" dans `CLAUDE.md`

## 📋 Prérequis

*   Node.js (v20+)
*   npm ou yarn
*   Un compte GitHub (pour le déploiement automatique)
*   Un projet Supabase (pour l'authentification et les classes)

## 🔐 Configuration Supabase

Nuxy utilise Supabase pour l'authentification et la gestion des classes. Les credentials sont stockés dans le fichier `.env` à la racine du projet.

### Variables d'environnement requises

Créez un fichier `.env` avec :

```bash
# Supabase - Connexion au projet
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_KEY=votre-clé-anon-publique

# Schéma Supabase (par défaut: nuxy)
NUXT_PUBLIC_SUPABASE_SCHEMA=nuxy
```

### Structure de la base de données

Le schéma `nuxy` contient 4 tables :
- **profiles** : Profils utilisateurs (extension de auth.users)
- **classes** : Classes créées par les enseignants
- **class_members** : Relation élèves-classes
- **exercise_progress** : Progression des exercices

Le fichier `supabase_schema.sql` contient le script complet pour créer le schéma.

## 🛠️ Installation

1.  Clonez le dépôt :
    ```bash
    git clone <votre-repo-url>
    cd <votre-repo-nom>
    ```

2.  Installez les dépendances :
    ```bash
    npm install
    ```

## 💻 Développement Local

Pour lancer le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Nuxt Studio (Local)
Pour éditer votre contenu localement avec une interface visuelle :
1.  Lancez le serveur de dev (`npm run dev`).
2.  Ouvrez les **Nuxt DevTools** (`Shift + Alt + D` ou icône en bas).
3.  Allez dans l'onglet **Studio**.

## 📁 Structure du projet

```
app/
├── components/
│   ├── auth/                        # Composants d'authentification
│   └── exercises/
│       ├── ExerciseCard.vue         # Carte d'affichage d'exercice
│       ├── ExerciseEditor.vue       # Éditeur CodeMirror avec raccourcis
│       └── ExerciseConsoleOutput.vue # Affichage pédagogique des résultats
├── composables/
│   ├── useExerciseEngine.js         # Moteur d'exécution sécurisée
│   ├── useNuxyDb.ts                 # Helper pour accès au schéma Supabase nuxy
│   ├── useAuth.ts                   # Authentification (login, register, logout)
│   ├── useProfile.ts                # Gestion du profil utilisateur
│   ├── useClasses.ts                # Gestion des classes (CRUD + Realtime)
│   └── useSupabaseProgress.ts       # Progression synchronisée (localStorage + Supabase)
├── middleware/
│   └── teacher.ts                   # Protection des routes enseignants
├── pages/
│   ├── index.vue                    # Page d'accueil
│   ├── auth/                        # Pages d'authentification
│   ├── profile/                     # Page profil utilisateur
│   ├── join/[code].vue              # Rejoindre une classe via code
│   └── teacher/                     # Dashboard enseignant
├── types/
│   └── database.ts                  # Types TypeScript pour Supabase
└── app.vue                          # Layout principal
```

## 🌍 Déploiement GitHub Pages

Le déploiement sur GitHub Pages est **automatique** via GitHub Actions.

### Configuration initiale (une seule fois)

1. **Activer GitHub Pages** dans les paramètres du repo :
   - Allez dans **Settings** > **Pages**
   - Source : **GitHub Actions**
   - Sauvegardez

2. **Merger la branche** dans `main` :
   ```bash
   # Le workflow se déclenchera automatiquement
   git checkout main
   git merge claude/setup-nuxy-js-platform-01311VXLjzMtGjDFEM58wnCc
   git push origin main
   ```

3. **Vérifier le déploiement** :
   - Allez dans l'onglet **Actions** de votre repo GitHub
   - Le workflow `Deploy to GitHub Pages` devrait être en cours
   - Une fois terminé, votre site sera disponible à : **https://fallinov.github.io/Nuxy/**

### Déploiement automatique

Chaque push sur la branche `main` déclenche automatiquement :
1. Installation des dépendances
2. Génération du site statique (`npm run generate`)
3. Déploiement sur GitHub Pages

### Build local pour tester

```bash
# Générer le site statique
npm run generate

# Prévisualiser le site généré
npx serve .output/public
```

## 🚀 Déploiement Vercel

Le déploiement sur Vercel est encore plus simple et automatique.

### Configuration initiale

1. **Connecter le repo à Vercel** :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur **"Add New..."** → **"Project"**
   - Importez votre repo GitHub `Nuxy`

2. **Configuration automatique** :
   - Vercel détecte automatiquement Nuxt
   - Le fichier `vercel.json` configure le build
   - Aucune configuration supplémentaire nécessaire !

3. **Déployer** :
   - Cliquez sur **"Deploy"**
   - Vercel build et déploie automatiquement
   - URL fournie : `https://[votre-projet].vercel.app`

### Déploiement automatique

Chaque push sur `main` déclenche automatiquement :
- Build de production
- Tests (si configurés)
- Déploiement immédiat
- Preview URL pour les pull requests

## 🗺️ Roadmap - Améliorations futures

> Analyse comparative réalisée le 23 janvier 2026 vs freeCodeCamp, Codecademy, Scrimba, Exercism

### 🔴 Priorité haute

#### 1. Mini-projets guidés (par module)
Ajouter 3-5 mini-projets pratiques pour appliquer les compétences acquises :

| Module | Projet suggéré | Compétences |
|--------|----------------|-------------|
| DOM | Todo-list simple | querySelector, événements, createElement |
| Formulaires | Formulaire d'inscription | validation, .value, submit |
| API/Fetch | Afficher la météo | fetch GET, async/await, DOM |
| Complet | Mini-Pokédex | Tous les concepts |

#### 2. Système de badges/achievements
Implémenter la gamification pour la motivation :

| Badge | Condition | Icône suggérée |
|-------|-----------|----------------|
| Premier pas | 1er exercice complété | 🎯 |
| Explorateur | 1 module complété | 🧭 |
| Persévérant | 10 exercices complétés | 💪 |
| Streak 7 jours | 7 jours consécutifs | 🔥 |
| Maître JS | Tous les exercices | 🏆 |

**Tables Supabase à créer** :
- `badges` (id, name, description, icon, condition_type, condition_value)
- `user_badges` (user_id, badge_id, earned_at)

### 🟡 Priorité moyenne

#### 3. Quiz de révision (fin de module)
Ajouter 5-10 questions QCM à la fin de chaque module :
- Format compatible WooFlash/Moodle (export XML/GIFT)
- Validation des concepts théoriques
- Score affiché dans le dashboard enseignant

#### 4. Certificat de complétion PDF
Générer un certificat personnalisé :
- Nom de l'élève
- Date de complétion
- Modules validés
- Signature numérique ESIG
- Téléchargeable en PDF

#### 5. Exercices de révision/consolidation
Ajouter des exercices de synthèse combinant plusieurs concepts :
- 1 exercice de révision par module
- Difficulté "intermédiaire+"
- Combine 2-3 concepts du module

### 🟢 Priorité basse (optionnel)

#### 6. Mode défi chronométré
Pour les élèves avancés :
- Timer optionnel par exercice
- Leaderboard par temps de complétion
- Badges spéciaux "Speed Runner"

#### 7. Leaderboard par classe
Émulation entre élèves :
- Points XP par exercice (10 XP débutant, 20 XP intermédiaire, 30 XP avancé)
- Classement hebdomadaire
- Anonymisation optionnelle

#### 8. Cheatsheets interactives
Référence rapide par module :
- Syntaxe de base
- Méthodes courantes
- Exemples de code

### 📊 Comparaison actuelle vs concurrents

| Fonctionnalité | Nuxy | freeCodeCamp | Codecademy |
|----------------|:----:|:------------:|:----------:|
| Exercices interactifs | ✅ | ✅ | ✅ |
| Messages pédagogiques | ✅ | ⚠️ | ⚠️ |
| Suivi enseignant | ✅ | ❌ | 💲 |
| Français natif | ✅ | ❌ | ⚠️ |
| Mini-projets | ❌ | ✅ | ✅ |
| Badges/Gamification | ❌ | ⚠️ | ✅ |
| Certificats | ❌ | ✅ | ✅ |
| Quiz théoriques | ❌ | ✅ | ✅ |

### 🐛 Debug et tests en cours

Avant d'implémenter les améliorations ci-dessus, finaliser :
- [ ] Tests automatisés complets
- [ ] Correction bugs console pédagogique
- [ ] Stabilisation du moteur d'exécution
- [ ] Tests cross-browser (Brave, Firefox, Chrome)
- [ ] Tests responsive (mobile, tablette)

## 🎓 Composants pédagogiques

### ExerciseEditor
Éditeur de code professionnel basé sur CodeMirror 6 :
- Coloration syntaxique JavaScript
- Thème sombre (One Dark)
- Raccourcis clavier : `Ctrl+Enter` (Windows/Linux) ou `Cmd+Enter` (Mac)
- Alternative : `Shift+Enter`
- Support des template literals (backticks)

### ExerciseConsoleOutput
Affichage pédagogique des résultats d'exécution :
- Messages d'erreur adaptés aux débutants
- Exemples de code correctif
- Liens vers documentation MDN (français)
- Warnings pour mauvaises pratiques (var, ==, etc.)
- Formatage intelligent des objets et tableaux

### ExerciseCard
Carte d'affichage d'un exercice avec :
- Titre et description
- Badge de difficulté (débutant, intermédiaire, avancé)
- Statut de progression (non commencé, en cours, complété)
- Bouton d'action contextuel

### useExerciseEngine
Composable pour l'exécution sécurisée du code :
- Exécution en mode strict (`'use strict'`)
- Sandbox avec timeout (5 secondes max)
- Capture de console.log, warn, error, info
- Persistance du contexte entre exécutions
- Détection automatique des erreurs et warnings

### pedagogicalMessages
Système de messages pédagogiques :
- Analyse des erreurs JavaScript (ReferenceError, SyntaxError, TypeError, RangeError)
- Transformation en messages compréhensibles
- Détection des warnings (var, ==, trop de console.log)
- Liens vers documentation MDN officielle

### useSupabaseProgress
Composable pour la gestion de la progression des exercices :
- Sauvegarde localStorage immédiate pour UX fluide
- Synchronisation vers Supabase en arrière-plan (si connecté)
- Permet aux enseignants de voir la progression des élèves
- API : `getExerciseStatus()`, `completeExercise()`, `saveCode()`, `syncFromLocalStorage()`
