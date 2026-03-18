/**
 * useExerciseProgress - Gestion de la progression des exercices
 *
 * Composable pour :
 * - Sauvegarder la progression dans localStorage
 * - Récupérer le statut de chaque exercice
 * - Marquer un exercice comme complété
 * - Calculer des statistiques
 */

export interface ExerciseProgress {
  slug: string
  status: 'not-started' | 'in-progress' | 'completed'
  completedAt?: string
  attempts: number
  lastAttemptAt?: string
  savedCode?: string // Code sauvegardé par l'élève
  lastCodeSaveAt?: string // Date de dernière sauvegarde du code
}

export interface UserProgress {
  exercises: Record<string, ExerciseProgress>
  totalCompleted: number
  lastUpdated: string
}

const STORAGE_KEY = 'nuxy-exercise-progress'

/**
 * Charge la progression depuis localStorage
 */
function loadProgressFromStorage(): UserProgress {
  if (typeof window === 'undefined') {
    return {
      exercises: {},
      totalCompleted: 0,
      lastUpdated: new Date().toISOString()
    }
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la progression:', error)
  }

  return {
    exercises: {},
    totalCompleted: 0,
    lastUpdated: new Date().toISOString()
  }
}

/**
 * Sauvegarde la progression dans localStorage
 */
function saveProgressToStorage(progress: UserProgress): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la progression:', error)
  }
}

/**
 * Composable principal
 */
export const useExerciseProgress = () => {
  const progress = useState<UserProgress>('exercise-progress', () => loadProgressFromStorage())
  const isHydrated = useState<boolean>('exercise-progress-hydrated', () => false)

  /**
   * Hydrate la progression depuis localStorage (côté client uniquement)
   * Appelé automatiquement au premier accès côté client
   */
  const hydrateFromStorage = () => {
    if (import.meta.client && !isHydrated.value) {
      const stored = loadProgressFromStorage()
      // Seulement si le localStorage contient des données
      if (Object.keys(stored.exercises).length > 0) {
        progress.value = stored
      }
      isHydrated.value = true
    }
  }

  // Auto-hydratation côté client
  if (import.meta.client) {
    hydrateFromStorage()
  }

  /**
   * Récupère le statut d'un exercice
   */
  const getExerciseStatus = (slug: string): 'not-started' | 'in-progress' | 'completed' => {
    return progress.value.exercises[slug]?.status || 'not-started'
  }

  /**
   * Récupère la progression complète d'un exercice
   */
  const getExerciseProgress = (slug: string): ExerciseProgress | null => {
    return progress.value.exercises[slug] || null
  }

  /**
   * Récupère le nombre de tentatives pour un exercice
   */
  const getAttempts = (slug: string): number => {
    return progress.value.exercises[slug]?.attempts || 0
  }

  /**
   * Récupère le code sauvegardé pour un exercice
   */
  const getSavedCode = (slug: string): string | null => {
    return progress.value.exercises[slug]?.savedCode || null
  }

  /**
   * Sauvegarde le code d'un exercice
   */
  const saveCode = (slug: string, code: string): void => {
    if (!progress.value.exercises[slug]) {
      progress.value.exercises[slug] = {
        slug,
        status: 'in-progress',
        attempts: 0,
        savedCode: code,
        lastCodeSaveAt: new Date().toISOString()
      }
    } else {
      progress.value.exercises[slug].savedCode = code
      progress.value.exercises[slug].lastCodeSaveAt = new Date().toISOString()
    }

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Efface le code sauvegardé d'un exercice (reset)
   */
  const clearSavedCode = (slug: string): void => {
    if (progress.value.exercises[slug]) {
      delete progress.value.exercises[slug].savedCode
      delete progress.value.exercises[slug].lastCodeSaveAt
      progress.value.lastUpdated = new Date().toISOString()
      saveProgressToStorage(progress.value)
    }
  }

  /**
   * Marque un exercice comme commencé
   */
  const startExercise = (slug: string): void => {
    if (!progress.value.exercises[slug]) {
      progress.value.exercises[slug] = {
        slug,
        status: 'in-progress',
        attempts: 1,
        lastAttemptAt: new Date().toISOString()
      }
    } else if (progress.value.exercises[slug].status === 'not-started') {
      progress.value.exercises[slug].status = 'in-progress'
      progress.value.exercises[slug].attempts++
      progress.value.exercises[slug].lastAttemptAt = new Date().toISOString()
    }

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Marque un exercice comme complété
   */
  const completeExercise = (slug: string): void => {
    const wasCompleted = progress.value.exercises[slug]?.status === 'completed'

    if (!progress.value.exercises[slug]) {
      progress.value.exercises[slug] = {
        slug,
        status: 'completed',
        completedAt: new Date().toISOString(),
        attempts: 1,
        lastAttemptAt: new Date().toISOString()
      }
    } else {
      progress.value.exercises[slug].status = 'completed'
      progress.value.exercises[slug].completedAt = new Date().toISOString()
      progress.value.exercises[slug].lastAttemptAt = new Date().toISOString()
    }

    // Incrémenter le total seulement si c'était pas déjà complété
    if (!wasCompleted) {
      progress.value.totalCompleted++
    }

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Incrémente le nombre de tentatives
   */
  const incrementAttempts = (slug: string): void => {
    if (!progress.value.exercises[slug]) {
      progress.value.exercises[slug] = {
        slug,
        status: 'in-progress',
        attempts: 1,
        lastAttemptAt: new Date().toISOString()
      }
    } else {
      progress.value.exercises[slug].attempts++
      progress.value.exercises[slug].lastAttemptAt = new Date().toISOString()
    }

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Fusionne les données distantes (Supabase) dans le localStorage
   * Supabase est la source de vérité : ses données écrasent le local
   */
  const mergeFromRemote = (remoteExercises: Record<string, ExerciseProgress>): void => {
    // Fusionner : Supabase écrase le local, le local garde ce que Supabase n'a pas
    for (const [slug, remote] of Object.entries(remoteExercises)) {
      progress.value.exercises[slug] = remote
    }

    // Recalculer le total
    progress.value.totalCompleted = Object.values(progress.value.exercises)
      .filter(e => e.status === 'completed').length

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Réinitialise la progression
   */
  const resetProgress = (): void => {
    progress.value = {
      exercises: {},
      totalCompleted: 0,
      lastUpdated: new Date().toISOString()
    }
    saveProgressToStorage(progress.value)
  }

  /**
   * Réinitialise un exercice spécifique
   */
  const resetExercise = (slug: string): void => {
    if (progress.value.exercises[slug]) {
      const wasCompleted = progress.value.exercises[slug].status === 'completed'

      delete progress.value.exercises[slug]

      if (wasCompleted) {
        progress.value.totalCompleted--
      }

      progress.value.lastUpdated = new Date().toISOString()
      saveProgressToStorage(progress.value)
    }
  }

  /**
   * Statistiques globales
   */
  const stats = computed(() => {
    const exercises = Object.values(progress.value.exercises)
    const completed = exercises.filter(e => e.status === 'completed').length
    const inProgress = exercises.filter(e => e.status === 'in-progress').length
    const totalAttempts = exercises.reduce((sum, e) => sum + e.attempts, 0)

    return {
      totalExercises: exercises.length,
      completed,
      inProgress,
      totalAttempts,
      completionRate: exercises.length > 0 ? (completed / exercises.length) * 100 : 0
    }
  })

  return {
    // State
    progress: readonly(progress),
    stats,

    // Methods
    getExerciseStatus,
    getExerciseProgress,
    getAttempts,
    getSavedCode,
    saveCode,
    clearSavedCode,
    startExercise,
    completeExercise,
    incrementAttempts,
    mergeFromRemote,
    resetProgress,
    resetExercise
  }
}
