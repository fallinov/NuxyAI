/**
 * Configuration Nuxy Design System
 *
 * Palette de couleurs basée sur la mascotte dragon :
 * - Primary : Vert action (#226347) - optimisé contraste WCAG
 * - Secondary : Teal action (#246B6B) - optimisé contraste WCAG
 * - Neutral : Slate pour un look moderne
 *
 * Voir app.css pour la palette complète (marque + action)
 */

export default defineAppConfig({
  ui: {
    // Couleurs sémantiques Nuxt UI
    colors: {
      primary: 'green',
      secondary: 'teal',
      success: 'emerald',
      info: 'cyan',
      warning: 'amber',
      error: 'red',
      neutral: 'slate'
    },

    // Surcharges de composants pour utiliser nos couleurs action
    button: {
      slots: {
        base: 'font-semibold rounded-xl'
      },
      variants: {
        // Bouton primaire : utilise action-primary pour meilleur contraste
        solid: {
          primary: 'bg-action-primary hover:bg-action-primary-hover text-white',
          secondary: 'bg-action-secondary hover:bg-action-secondary-hover text-white'
        }
      }
    },

    // Badge avec couleurs nuxy
    badge: {
      variants: {
        solid: {
          primary: 'bg-nuxy-green text-white',
          secondary: 'bg-nuxy-teal text-white'
        },
        soft: {
          primary: 'bg-nuxy-green/20 text-nuxy-green-dark',
          secondary: 'bg-nuxy-teal/20 text-nuxy-teal-dark'
        }
      }
    },

    // Liens
    link: {
      variants: {
        base: 'text-link-color hover:text-link-hover'
      }
    }
  }
})
