# Lessons learned

## 2026-03-01 — defaultKeymap: false casse la navigation autocomplétion

**Contexte** : Réactivation de l'autocomplétion intelligente dans ExerciseEditor.vue
**Erreur** : `defaultKeymap: false` empêchait CodeMirror d'ajouter le `completionKeymap` à `Prec.highest`. Le keymap de complétion dans `basicSetup` a la même priorité que le keymap de mouvement du curseur, et le curseur gagne (ArrowDown déplace le curseur au lieu de naviguer la popup).
**Correction** : Retirer `defaultKeymap: false` pour que `completionKeymapExt` (Prec.highest) soit actif.
**Règle** : Ne pas désactiver `defaultKeymap` dans autocompletion() si on veut que ↓/↑/Enter fonctionnent dans la popup. Le keymap haute priorité est essentiel.

## 2026-03-01 — interactionDelay bloque les touches après ouverture du popup

**Contexte** : Configuration autocomplétion avec `interactionDelay: 150`
**Erreur** : Pendant 150ms après l'ouverture du popup, toutes les keybindings completion (ArrowDown, Enter, Tab) renvoient `false`. L'utilisateur appuie ↓ dans cette fenêtre → la touche est ignorée par la complétion.
**Correction** : Retirer `interactionDelay` (défaut 75ms). Avec `selectOnOpen: false`, la protection contre les insertions accidentelles est déjà assurée.
**Règle** : `selectOnOpen: false` rend `interactionDelay` redondant — ne pas combiner les deux.

## 2026-03-01 — Ctrl+Space ne fonctionne pas sur macOS

**Contexte** : Test de l'autocomplétion sur MacBook Pro
**Erreur** : macOS intercepte Ctrl+Space pour le changement de source de saisie avant que le navigateur ne reçoive l'événement.
**Correction** : Pas de fix côté code — c'est une limitation OS. Avec `activateOnTyping: true`, le besoin de Ctrl+Space est réduit.
**Règle** : Sur macOS, Ctrl+Space est un raccourci système. Pour le libérer : Réglages Système > Clavier > Raccourcis clavier > Sources de saisie.

## 2026-03-02 — Corruption tiles CodeMirror avec virgules rapides

**Contexte** : Taper plusieurs virgules à la suite dans un tableau `[]` dans l'éditeur CodeMirror
**Erreur** : `@codemirror/view@6.39.2` a un bug de corruption du système de "tiles" (structure interne de rendu). Provoque `TypeError: Cannot destructure property 'tile'` et `Error: No tile at position`. Le contenu de l'éditeur est corrompu visuellement.
**Correction** : Mettre à jour `@codemirror/view` vers 6.39.8+ (fix commit `4ffb314`). Après `npm update`, il faut relancer le serveur de dev avec `--force` pour vider le cache Vite pré-bundlé.
**Règle** : Toujours garder les packages `@codemirror/*` à jour. Après un `npm update` de dépendances, relancer le dev server avec `--force` si les anciens chunks sont encore servis.

## 2026-03-04 — Audit souveraineté : placehold.co en production

**Contexte** : Audit des ressources externes avec le skill `sfa-external-audit`
**Erreur** : 4 occurrences de `https://placehold.co/50` dans les exercices projet (fallback image quand `p.thumbnail` est vide). Chaque élève envoyait des requêtes HTTP à un service tiers.
**Correction** : Créé `public/images/placeholder.svg` (SVG local 252 octets) et remplacé les 4 occurrences.
**Règle** : Jamais d'URL externe pour des assets (images, polices, scripts). Toujours self-host dans `public/`. Lancer `/sfa-external-audit` périodiquement pour détecter les fuites.

## 2026-03-11 — Validations output_contains/no_error cassées pour exercices html-css-js

**Contexte** : L'exercice 7.5 (selectionner-plusieurs) échouait sur la validation « Affiche 3 » malgré un code élève correct.
**Erreur** : Circuit cassé — les logs console de l'iframe arrivaient dans `SplitOutputPanel.consoleEntries` via postMessage, mais le moteur de validation `htmlCssJsEngine` avait son propre `consoleEntries` qui restait vide. `outputContains()` et `hasNoError()` lisaient un tableau jamais alimenté.
**Correction** : Exposer `consoleEntries` dans `SplitOutputPanel.defineExpose()`, puis les transférer vers `htmlCssJsEngine` dans `handleHtmlCssJsDomReady` avant la validation.
**Règle** : Quand deux composants ont des `ref` de même nom, vérifier qu'ils partagent bien la même source de données. Un composable de validation doit recevoir ses données, pas les gérer en parallèle.

## 2026-03-11 — SyntaxError invisible dans l'iframe des exercices html-css-js

**Contexte** : Une étudiante écrit `#carte.classList.add(...)` (SyntaxError) mais aucune erreur n'apparaît dans la console pédagogique.
**Erreur** : L'interception console (`window.onerror`) et le code utilisateur étaient dans le même `<script>`. Une SyntaxError empêche le parsing de tout le bloc — y compris `window.onerror`.
**Correction** : Séparer en deux `<script>` : un premier pour l'infrastructure (toujours parsé), un second pour le code élève. Le `window.onerror` du premier capte les SyntaxError du second.
**Règle** : Toujours isoler le code non fiable dans un `<script>` séparé quand on a besoin d'un `window.onerror` fiable. Le parseur JS abandonne un bloc entier en cas de SyntaxError.

## 2026-03-11 — Messages pédagogiques toujours génériques en mode html-css-js

**Contexte** : Les exercices DOM (module 7+) affichaient des messages d'erreur bruts au lieu des messages pédagogiques adaptés.
**Erreur** : `window.onerror` transmet le message comme string (`"Uncaught ReferenceError: x is not defined"`). `translateErrorMessage` faisait `new Error(message)` → `name` toujours `"Error"`, jamais `"ReferenceError"`. `analyzePedagogicalError` tombait systématiquement dans le fallback générique.
**Correction** : Extraire le type d'erreur via regex `^(?:Uncaught\s+)?(\w+Error):\s*(.+)$` avant de reconstruire l'objet Error avec le bon `name`.
**Règle** : `window.onerror` perd le type d'erreur (reçoit une string). Toujours parser le message pour reconstruire un objet Error fidèle.

## 2026-03-11 — Erreurs async/await et fetch invisibles dans l'iframe

**Contexte** : Un `fetch()` raté ou un `await` non attrapé ne produisait aucune erreur visible.
**Erreur** : `window.onerror` ne capture pas les rejets de promesses. Seul `unhandledrejection` les intercepte.
**Correction** : Ajout de `window.addEventListener('unhandledrejection', ...)` dans le premier bloc `<script>` de l'iframe.
**Règle** : Pour une couverture complète des erreurs JS dans une sandbox, il faut TROIS mécanismes : `try/catch` (erreurs synchrones), `window.onerror` (SyntaxError et erreurs non attrapées), `unhandledrejection` (promesses rejetées).
