	# Rapport d'examen UX — Nuxy (Page Exercices)

**Date** : 18 janvier 2026
**Examinateur** : Claude Code
**Écrans examinés** : Page exercice `/exercises/hello-javascript`
**Modes testés** : Desktop (1280px), Mobile (375px), Mode sombre
**Règles UX du projet appliquées** : CLAUDE.md (Nuxy)

---

## Résumé exécutif

| Critère | Évaluation | Commentaire |
|---------|------------|-------------|
| Lisibilité | ✅ | Typographie claire, hiérarchie bien définie |
| Contraste | ✅ | Bon contraste en mode clair et sombre |
| Daltonisme | ✅ | Icônes + texte pour les statuts (pas juste couleur) |
| Lecteur d'écran | ⚠️ | Structure OK mais focus sur éléments masqués |
| Navigation clavier | ⚠️ | Focus traverse le sidebar masqué |
| Ergonomie | ✅ | Interface intuitive, conventions respectées |
| Responsive | ✅ | Excellente adaptation mobile avec onglets |

**Verdict global** : À améliorer (principalement accessibilité clavier)

---

## ❌ Problèmes bloquants (accessibilité)

| # | Problème | Impact | Utilisateurs affectés | Recommandation |
|---|----------|--------|----------------------|----------------|
| 1 | **Focus sur sidebar masqué** | Le Tab navigue vers le bouton "Fermer le menu" même quand le sidebar est caché | Utilisateurs clavier, lecteurs d'écran | Ajouter `inert` ou `tabindex="-1"` quand fermé |
| 2 | **Boutons de la toolbar sans labels explicites** | "Copy", "Reset", "Prettify" peuvent être ambigus pour lecteurs d'écran | Non-voyants | Ajouter `aria-label` descriptifs |

---

## ⚠️ Problèmes importants (utilisabilité)

| # | Problème | Impact | Recommandation |
|---|----------|--------|----------------|
| 1 | **Message console peu visible** | "Cliquez sur Exécuter le code..." en gris clair, peut passer inaperçu | Augmenter le contraste ou ajouter une icône |
| 2 | **Bouton "Terminez l'exercice" désactivé sans explication** | L'utilisateur ne sait pas pourquoi il ne peut pas terminer | Ajouter un tooltip expliquant les conditions |
| 3 | **Labels boutons en anglais** | "Run", "Copy", "Reset", "Prettify", "View solution" vs interface FR | Traduire en français pour cohérence |

---

## 💡 Améliorations suggérées

| # | Suggestion | Bénéfice |
|---|------------|----------|
| 1 | Ajouter un indicateur de progression visuel (barre ou cercle) | Motivation de l'apprenant |
| 2 | Afficher le raccourci `Ctrl+Enter` de manière plus visible | Apprentissage des raccourcis |
| 3 | Ajouter un retour haptique/visuel au clic sur "Run" | Feedback immédiat |
| 4 | Permettre de réduire/agrandir le panneau instructions | Flexibilité selon préférence |
| 5 | Ajouter un compteur de caractères dans l'éditeur | Aide pour les débutants |

---

## ✅ Points positifs

### Design et lisibilité
- **Hiérarchie visuelle claire** : Titre H1 > H2 avec icônes > paragraphes
- **Icônes de section** : Les icônes heroicons ajoutent du contexte visuel sans surcharger
- **Typographie lisible** : Taille de texte appropriée (16px corps)
- **Espacement généreux** : Bonne aération du contenu

### Responsive
- **Excellente adaptation mobile** : Système d'onglets (Lesson / Code / Output) intelligent
- **Footer adaptatif** : Informations essentielles conservées sur mobile
- **Touch targets** : Boutons suffisamment grands sur mobile

### Accessibilité partielle
- **Badges de statut** : Utilisent icônes + texte (pas uniquement la couleur)
- **Mode sombre** : Bien implémenté avec contrastes maintenus
- **Landmarks ARIA** : `<banner>`, `<navigation>`, `<contentinfo>` présents

### Ergonomie
- **CTA principal clair** : Bouton "Run" vert avec raccourci affiché
- **Progression contextuelle** : "Exercice 1 sur 5" dans le footer
- **Module context** : "Bases JavaScript" indique où on se trouve
- **Indices progressifs** : Système de hints bien pensé (verrouillés par défaut)

### Conventions respectées
- Logo en haut → lien vers accueil
- Menu hamburger à gauche
- Actions utilisateur en haut à droite (thème, profil)
- Éditeur de code avec numéros de lignes

---

## Plan d'action recommandé

### Priorité 1 — Accessibilité (immédiat)

1. **Corriger le focus du sidebar**
   ```vue
   <!-- ExerciseSidebar.vue -->
   <aside
     :inert="!isOpen"
     :class="[...]"
   >
   ```
   Ou utiliser `v-show` avec gestion du `tabindex`.

2. **Ajouter aria-labels aux boutons toolbar**
   ```vue
   <button aria-label="Copier le code dans le presse-papier">
     Copy
   </button>
   ```

### Priorité 2 — Utilisabilité (court terme)

3. **Traduire les boutons en français**
   - "Run" → "Exécuter"
   - "Copy" → "Copier"
   - "Reset" → "Réinitialiser"
   - "Prettify" → "Formater"
   - "View solution" → "Voir la solution"

4. **Améliorer le message console vide**
   ```vue
   <div class="text-gray-500 dark:text-gray-400 text-center py-8">
     <UIcon name="i-heroicons-play" class="w-8 h-8 mb-2" />
     <p>Cliquez sur <strong>Exécuter</strong> pour voir les résultats</p>
   </div>
   ```

5. **Ajouter tooltip au bouton désactivé**
   ```vue
   <UTooltip text="Complétez tous les objectifs pour terminer">
     <UButton :disabled="!allObjectivesCompleted">
       Terminez l'exercice
     </UButton>
   </UTooltip>
   ```

### Priorité 3 — Optimisation (moyen terme)

6. **Ajouter feedback visuel au bouton Run**
   - État loading pendant l'exécution
   - Animation de succès/erreur

7. **Indicateur de progression global**
   - Barre de progression ou cercle dans le header
   - Affichage du % d'exercices complétés

---

## Détails techniques

### Structure sémantique actuelle
```
<banner>           ✅ Header avec navigation
<complementary>    ✅ Sidebar (mais focus issue)
<main>             ⚠️ Non explicite (generic)
<contentinfo>      ✅ Footer
```

**Recommandation** : Ajouter `<main>` explicite autour du contenu principal.

### Ordre de tabulation observé
1. Menu hamburger
2. Logo Nuxy
3. Switch thème
4. Menu utilisateur
5. ❌ Bouton "Fermer le menu" (masqué)
6. ❌ Liens du sidebar (masqués)
7. ... suite du contenu

**Problème** : Les étapes 5-6 ne devraient pas être dans le flux de tabulation quand le sidebar est fermé.

### Contrastes vérifiés
| Élément | Ratio estimé | Conformité |
|---------|--------------|------------|
| Texte corps sur fond blanc | ~15:1 | ✅ AAA |
| Texte secondaire (gris) | ~5:1 | ✅ AA |
| Bouton Run (vert/blanc) | ~4.5:1 | ✅ AA |
| Code sur fond sombre | ~8:1 | ✅ AAA |

---

## Références

- **Don Norman** — Visibilité du statut (badges), affordances (boutons clairs)
- **Steve Krug** — Interface scannable, conventions respectées
- **WCAG 2.2** — Focus management, contraste, landmarks
- **Luke Wroblewski** — Adaptation mobile first avec onglets

---

*Rapport généré automatiquement par Claude Code*
