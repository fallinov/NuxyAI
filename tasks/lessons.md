# Leçons apprises

## 2026-03-19 — Conflit de route Nuxt pages/lessons.vue vs pages/lessons/[slug].vue

**Contexte** : Fork NuxyAI, création de la page catalogue et des pages de leçons dynamiques
**Erreur** : `pages/lessons.vue` interceptait toutes les routes `/lessons/*`, empêchant `/lessons/[slug].vue` de matcher
**Correction** : Renommer `pages/lessons.vue` → `pages/lessons/index.vue`
**Règle** : En Nuxt 4, si tu as un dossier `pages/foo/` avec des sous-routes, utilise `pages/foo/index.vue` pour la route parent, jamais `pages/foo.vue`

## 2026-03-19 — Les composants MDC ::terminal-block ne fonctionnent pas avec du contenu texte

**Contexte** : Utilisation de `::terminal-block` dans le markdown des leçons pour afficher des commandes
**Erreur** : Le contenu entre `::` et `::` est passé comme slot VNode par Nuxt Content, pas comme texte brut. Le composant affichait juste `$` sans la commande.
**Correction** : Remplacer `::terminal-block` par des blocs de code standard ` ```bash ` qui fonctionnent nativement avec Shiki (coloration + bouton copier)
**Règle** : Pour du contenu textuel simple dans le markdown, préférer la syntaxe markdown standard aux composants MDC. Réserver les composants MDC pour les cas interactifs (comme `::ai-conversation` qui a des props structurées)

## 2026-03-19 — H1 dupliqué dans les pages de leçon

**Contexte** : Le frontmatter `title` est affiché dans le header de la page, mais le markdown commence aussi par `# Titre`
**Erreur** : Le titre apparaissait deux fois visuellement
**Correction** : CSS scoped `.lesson-content :deep(h1:first-child) { display: none; }`
**Règle** : Quand le titre est déjà rendu par le composant page, cacher le H1 du contenu markdown via CSS
