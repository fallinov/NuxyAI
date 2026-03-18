/**
 * useLessonProgress - Gestion de la progression des leçons
 *
 * Composable pour :
 * - Sauvegarder la progression dans localStorage
 * - Récupérer le statut de chaque leçon
 * - Marquer une leçon comme complétée
 * - Gérer les quiz et checklists
 * - Calculer des statistiques
 */

export interface LessonProgress {
  slug: string
  status: 'not-started' | 'in-progress' | 'completed'
  completedAt?: string
  attempts: number
  lastAttemptAt?: string
  quizScore?: number
  checklistCompleted?: string[]
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>
  totalCompleted: number
  lastUpdated: string
}

const STORAGE_KEY = 'nuxyai-lesson-progress'

/**
 * Charge la progression depuis localStorage
 */
function loadProgressFromStorage(): UserProgress {
  if (typeof window === 'undefined') {
    return {
      lessons: {},
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
    lessons: {},
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
export const useLessonProgress = () => {
  const progress = useState<UserProgress>('lesson-progress', () => loadProgressFromStorage())
  const isHydrated = useState<boolean>('lesson-progress-hydrated', () => false)

  /**
   * Hydrate la progression depuis localStorage (côté client uniquement)
   */
  const hydrateFromStorage = () => {
    if (import.meta.client && !isHydrated.value) {
      const stored = loadProgressFromStorage()
      if (Object.keys(stored.lessons).length > 0) {
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
   * Récupère le statut d'une leçon
   */
  const getLessonStatus = (slug: string): 'not-started' | 'in-progress' | 'completed' => {
    return progress.value.lessons[slug]?.status || 'not-started'
  }

  /**
   * Récupère la progression complète d'une leçon
   */
  const getLessonProgress = (slug: string): LessonProgress | null => {
    return progress.value.lessons[slug] || null
  }

  /**
   * Récupère le nombre de tentatives pour une leçon
   */
  const getAttempts = (slug: string): number => {
    return progress.value.lessons[slug]?.attempts || 0
  }

  /**
   * Marque une leçon comme commencée
   */
  const startLesson = (slug: string): void => {
    if (!progress.value.lessons[slug]) {
      progress.value.lessons[slug] = {
        slug,
        status: 'in-progress',
        attempts: 1,
        lastAttemptAt: new Date().toISOString()
      }
    } else if (progress.value.lessons[slug].status === 'not-started') {
      progress.value.lessons[slug].status = 'in-progress'
      progress.value.lessons[slug].attempts++
      progress.value.lessons[slug].lastAttemptAt = new Date().toISOString()
    }

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Marque une leçon comme complétée
   */
  const completeLesson = (slug: string): void => {
    const wasCompleted = progress.value.lessons[slug]?.status === 'completed'

    if (!progress.value.lessons[slug]) {
      progress.value.lessons[slug] = {
        slug,
        status: 'completed',
        completedAt: new Date().toISOString(),
        attempts: 1,
        lastAttemptAt: new Date().toISOString()
      }
    } else {
      progress.value.lessons[slug].status = 'completed'
      progress.value.lessons[slug].completedAt = new Date().toISOString()
      progress.value.lessons[slug].lastAttemptAt = new Date().toISOString()
    }

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
    if (!progress.value.lessons[slug]) {
      progress.value.lessons[slug] = {
        slug,
        status: 'in-progress',
        attempts: 1,
        lastAttemptAt: new Date().toISOString()
      }
    } else {
      progress.value.lessons[slug].attempts++
      progress.value.lessons[slug].lastAttemptAt = new Date().toISOString()
    }

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Sauvegarde le score d'un quiz
   */
  const saveQuizScore = (slug: string, score: number): void => {
    if (!progress.value.lessons[slug]) {
      progress.value.lessons[slug] = {
        slug,
        status: 'in-progress',
        attempts: 1,
        lastAttemptAt: new Date().toISOString(),
        quizScore: score
      }
    } else {
      progress.value.lessons[slug].quizScore = score
      progress.value.lessons[slug].lastAttemptAt = new Date().toISOString()
    }

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Sauvegarde les items cochés d'une checklist
   */
  const saveChecklist = (slug: string, completedIds: string[]): void => {
    if (!progress.value.lessons[slug]) {
      progress.value.lessons[slug] = {
        slug,
        status: 'in-progress',
        attempts: 0,
        checklistCompleted: completedIds
      }
    } else {
      progress.value.lessons[slug].checklistCompleted = completedIds
    }

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Fusionne les données distantes (Supabase) dans le localStorage
   * Supabase est la source de vérité : ses données écrasent le local
   */
  const mergeFromRemote = (remoteLessons: Record<string, LessonProgress>): void => {
    for (const [slug, remote] of Object.entries(remoteLessons)) {
      progress.value.lessons[slug] = remote
    }

    // Recalculer le total
    progress.value.totalCompleted = Object.values(progress.value.lessons)
      .filter(l => l.status === 'completed').length

    progress.value.lastUpdated = new Date().toISOString()
    saveProgressToStorage(progress.value)
  }

  /**
   * Réinitialise la progression
   */
  const resetProgress = (): void => {
    progress.value = {
      lessons: {},
      totalCompleted: 0,
      lastUpdated: new Date().toISOString()
    }
    saveProgressToStorage(progress.value)
  }

  /**
   * Réinitialise une leçon spécifique
   */
  const resetLesson = (slug: string): void => {
    if (progress.value.lessons[slug]) {
      const wasCompleted = progress.value.lessons[slug].status === 'completed'

      delete progress.value.lessons[slug]

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
    const lessons = Object.values(progress.value.lessons)
    const completed = lessons.filter(l => l.status === 'completed').length
    const inProgress = lessons.filter(l => l.status === 'in-progress').length
    const totalAttempts = lessons.reduce((sum, l) => sum + l.attempts, 0)

    return {
      totalLessons: lessons.length,
      completed,
      inProgress,
      totalAttempts,
      completionRate: lessons.length > 0 ? (completed / lessons.length) * 100 : 0
    }
  })

  return {
    // State
    progress: readonly(progress),
    stats,

    // Methods
    getLessonStatus,
    getLessonProgress,
    getAttempts,
    startLesson,
    completeLesson,
    incrementAttempts,
    saveQuizScore,
    saveChecklist,
    mergeFromRemote,
    resetProgress,
    resetLesson
  }
}
