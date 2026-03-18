---
description: Teste les exercices Nuxy avec Playwright (simule un parcours élève)
---

# Test automatisé des exercices Nuxy avec Playwright

## Objectif
Simuler le parcours d'un élève sur la plateforme Nuxy en testant chaque exercice avec Playwright MCP.

## Prérequis
- Le site doit être accessible (soit en local via `npx serve .output/public`, soit sur https://www.nuxy.ch)
- Les outils Playwright MCP doivent être disponibles

## Étapes

### 1. Déterminer l'URL de base
Demander à l'utilisateur ou détecter automatiquement :
- **Production** : `https://www.nuxy.ch`
- **Local** : `http://localhost:3000` (dev) ou lancer `npx serve .output/public -l 4173` en background et utiliser `http://localhost:4173`

### 2. Lister les exercices à tester
Lire les fichiers Markdown dans `content/exercises/*.md` avec Glob.
Pour chaque fichier, extraire avec Read :
- `title` : titre de l'exercice
- `exerciseNumber` : numéro (pour le tri)
- `module` : module
- `exerciseType` : type (javascript ou html-css-js)
- `starterCode` : code initial
- `solution.code` : code solution
- `validations` : règles de validation
- `hints` : indices avec learnMore URLs

### 3. Pour chaque exercice JavaScript (exerciseType != html-css-js)

#### 3a. Test avec la SOLUTION (doit réussir)
1. **Naviguer** vers `{baseURL}/exercises/{slug}` avec `browser_navigate`
2. **Attendre** que l'éditeur CodeMirror soit chargé avec `browser_wait_for` (selector: `.cm-editor`)
3. **Prendre un screenshot** initial avec `browser_take_screenshot`
4. **Cliquer** dans l'éditeur CodeMirror avec `browser_click` sur `.cm-content`
5. **Sélectionner tout** le texte avec `browser_press_key` : `Control+a` (ou `Meta+a` sur Mac)
6. **Taper** le code solution avec `browser_type` (le code solution du frontmatter)
7. **Exécuter** le code avec `browser_press_key` : `Control+Enter` (ou `Meta+Enter` sur Mac)
8. **Attendre** le résultat (1-2 secondes) avec `browser_wait_for`
9. **Vérifier** le succès :
   - Chercher un indicateur de succès dans le snapshot DOM (`browser_snapshot`)
   - Le texte "Bravo" ou une indication de validation réussie doit être présent
   - Vérifier qu'il n'y a PAS de message d'erreur
10. **Prendre un screenshot** du résultat

#### 3b. Test avec le STARTER CODE (doit échouer partiellement)
1. **Recharger** la page
2. **Exécuter** le starter code (sans modification)
3. **Vérifier** que des messages d'aide/erreur apparaissent
4. **Vérifier** que les indices sont accessibles

### 4. Pour chaque exercice HTML/CSS/JS

Pour les exercices de type `html-css-js` :
1. **Naviguer** vers la page
2. **Vérifier** que les onglets HTML, CSS, JS sont présents
3. **Entrer** le code solution dans chaque onglet
4. **Exécuter** et vérifier le succès
5. **Prendre un screenshot** du résultat dans l'aperçu

### 5. Vérifier les liens learnMore
Pour chaque exercice qui a des hints avec `learnMore` :
1. Extraire les URLs depuis les fichiers Markdown
2. Tester chaque URL avec `WebFetch` pour vérifier qu'elle ne retourne pas 404
3. Reporter les liens cassés

### 6. Rapport final
Générer un rapport avec :
- Nombre d'exercices testés / réussis / échoués
- Liste des exercices en erreur avec détails
- Liste des liens learnMore cassés
- Screenshots des problèmes détectés

## Notes importantes
- Utiliser `Meta+a` et `Meta+Enter` sur macOS (pas Ctrl)
- Les exercices CodeMirror nécessitent de cliquer dans `.cm-content` avant de taper
- Attendre suffisamment entre l'exécution et la vérification (le moteur est asynchrone)
- Ne pas tester plus de 5 exercices en parallèle (pour éviter de surcharger le navigateur)
- Trier les exercices par `exerciseNumber` pour un parcours logique

## Paramètres optionnels
- Si l'utilisateur spécifie un module (ex: `/test-exercises 3`), ne tester que les exercices de ce module
- Si l'utilisateur spécifie un slug (ex: `/test-exercises hello-javascript`), ne tester que cet exercice
