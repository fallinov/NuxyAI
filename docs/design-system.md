# Design System

## Palette de couleurs

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

## Variables CSS

Définies dans `app/app.css` :

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

## Stratégie d'utilisation des couleurs (Style Duolingo)

| Couleur | Rôle | Usage |
|---------|------|-------|
| **Vert (#60B155)** | PRIMARY | Boutons CTA, liens nav, progression, succès, identité |
| **Teal (#33A6A6)** | SECONDARY | Boutons secondaires, info, bordures hover |
| **Or (#FFD966)** | ACHIEVEMENTS | Badges, récompenses, highlights, warnings |
| **Violet (#561E46)** | PREMIUM | Éléments spéciaux, accents sombres |
| **Rose (#D45E95)** | FUN | Notifications "nouveau", célébrations |
| **Lavande (#C8B4DC)** | SUBTIL | Backgrounds légers, bordures subtiles |

**Couleurs sémantiques (Tailwind)** : `emerald` (success), `red` (error), `amber` (warning), `blue` (info)

## Classes CSS utilitaires

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

## Classes Tailwind (via `@theme`)

```
bg-nuxy-green, text-nuxy-green, border-nuxy-green (+ -dark, -light, -medium, -pale)
bg-nuxy-teal, text-nuxy-teal, border-nuxy-teal (+ -dark, -light)
bg-nuxy-gold, text-nuxy-gold, border-nuxy-gold (+ -dark)
bg-nuxy-purple, text-nuxy-purple, border-nuxy-purple (+ -dark)
bg-nuxy-pink, text-nuxy-pink, border-nuxy-pink (+ -dark)
bg-nuxy-lavender, text-nuxy-lavender (+ -light)
```

## Typographie

Polices **100% locales** (pas de CDN externe) dans `public/fonts/`.

| Police | Usage | Fichiers |
|--------|-------|----------|
| **Inter** | Texte principal | `public/fonts/inter/*.woff2` (400-900) |
| **JetBrains Mono** | Code / Éditeur | `public/fonts/jetbrains-mono/*.woff2` (400-600) |

**Configuration** : `app/app.css` (déclarations `@font-face`)

## Ligne graphique (Style Duolingo FLAT)

Le site adopte un design **flat** inspiré de Duolingo pour être en cohérence avec le logo :
- **Pas de dégradés complexes** : utiliser des couleurs solides
- **Pas de blur effects** : éviter les `blur-xl`, `backdrop-blur`
- **Pas de grid patterns** : fonds unis (`bg-gray-950`, `bg-white`)
- **Ombres minimales** : `shadow-lg` maximum, pas de `shadow-2xl` colorées
- **Textes en couleur solide** : pas de `bg-clip-text text-transparent`
