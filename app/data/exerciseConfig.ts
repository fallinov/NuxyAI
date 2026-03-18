/**
 * Configuration partagée pour les exercices
 * Centralise les configurations visuelles utilisées dans plusieurs composants
 */

/**
 * Configuration des badges de difficulté
 */
export const difficultyConfig = {
  beginner: {
    label: 'Débutant',
    color: 'green' as const,
    icon: 'i-lucide-star'
  },
  intermediate: {
    label: 'Intermédiaire',
    color: 'orange' as const,
    icon: 'i-lucide-flame'
  },
  advanced: {
    label: 'Avancé',
    color: 'red' as const,
    icon: 'i-lucide-zap'
  }
} as const

export type DifficultyLevel = keyof typeof difficultyConfig

/**
 * Configuration des badges de statut
 */
export const statusConfig = {
  'not-started': {
    label: 'Non commencé',
    color: 'gray' as const,
    icon: 'i-lucide-circle-play'
  },
  'in-progress': {
    label: 'En cours',
    color: 'blue' as const,
    icon: 'i-lucide-refresh-cw'
  },
  'completed': {
    label: 'Complété',
    color: 'green' as const,
    icon: 'i-lucide-check-circle'
  }
} as const

export type ExerciseStatus = keyof typeof statusConfig

/**
 * Helper pour obtenir la config de difficulté
 */
export function getDifficultyConfig(level: DifficultyLevel = 'beginner') {
  return difficultyConfig[level]
}

/**
 * Helper pour obtenir la config de statut
 */
export function getStatusConfig(status: ExerciseStatus) {
  return statusConfig[status]
}
