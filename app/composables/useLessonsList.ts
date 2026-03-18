/**
 * useLessonsList - Listing et navigation des leçons
 *
 * Composable pour :
 * - Charger toutes les leçons via queryCollection
 * - Structurer les leçons en phases et modules
 * - Naviguer entre les leçons (précédente/suivante)
 */

export interface Lesson {
  path: string
  slug: string
  title: string
  description: string
  phase: number
  module: number
  lessonNumber: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'guide' | 'exercise' | 'quiz' | 'project'
  tags?: string[]
  concepts?: string[]
  objectives?: string[]
}

export interface Module {
  number: number
  title: string
  icon: string
  lessons: Lesson[]
}

export interface Phase {
  number: number
  title: string
  modules: Module[]
}

// Définition des modules
const MODULE_DEFINITIONS: Record<number, { title: string; icon: string }> = {
  1: { title: 'Premiers pas', icon: 'i-lucide-rocket' },
  2: { title: 'Communiquer avec l\'IA', icon: 'i-lucide-message-square' },
  3: { title: 'Workflow efficace', icon: 'i-lucide-workflow' },
  4: { title: 'HTML & CSS avec l\'IA', icon: 'i-lucide-layout' },
  5: { title: 'JavaScript avec l\'IA', icon: 'i-lucide-code' },
  6: { title: 'Projet guidé', icon: 'i-lucide-folder-open' },
  7: { title: 'Autonomie', icon: 'i-lucide-graduation-cap' }
}

// Définition des phases
const PHASE_DEFINITIONS: Record<number, { title: string; modules: number[] }> = {
  1: { title: 'Maîtriser l\'outil', modules: [1, 2, 3] },
  2: { title: 'Développer avec l\'IA', modules: [4, 5, 6, 7] }
}

export const useLessonsList = () => {
  const lessons = ref<Lesson[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Charge toutes les leçons depuis la collection de contenu
   */
  const loadLessons = async (): Promise<void> => {
    if (lessons.value.length > 0) return // Déjà chargées

    isLoading.value = true
    error.value = null

    try {
      const { data } = await useAsyncData('lessons-list', () =>
        queryCollection('lessons')
          .order('lessonNumber', 'ASC')
          .all()
      )

      if (data.value) {
        lessons.value = data.value.map(item => ({
          path: item.path,
          slug: item.path.replace(/^\/lessons\//, ''),
          title: item.title,
          description: item.description,
          phase: item.phase,
          module: item.module,
          lessonNumber: item.lessonNumber,
          duration: item.duration,
          difficulty: item.difficulty,
          type: item.type,
          tags: item.tags || undefined,
          concepts: item.concepts || undefined,
          objectives: item.objectives || undefined
        }))
      }
    } catch (err) {
      error.value = 'Erreur lors du chargement des leçons'
      console.error('Load lessons error:', err)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Retourne les leçons d'un module donné
   */
  const getLessonsByModule = (moduleNumber: number): Lesson[] => {
    return lessons.value.filter(l => l.module === moduleNumber)
  }

  /**
   * Retourne les leçons d'une phase donnée
   */
  const getLessonsByPhase = (phaseNumber: number): Lesson[] => {
    const phaseDef = PHASE_DEFINITIONS[phaseNumber]
    if (!phaseDef) return []
    return lessons.value.filter(l => phaseDef.modules.includes(l.module))
  }

  /**
   * Retourne la leçon suivante (par lessonNumber)
   */
  const getNextLesson = (currentSlug: string): Lesson | null => {
    const index = lessons.value.findIndex(l => l.slug === currentSlug)
    if (index === -1 || index >= lessons.value.length - 1) return null
    return lessons.value[index + 1]
  }

  /**
   * Retourne la leçon précédente (par lessonNumber)
   */
  const getPreviousLesson = (currentSlug: string): Lesson | null => {
    const index = lessons.value.findIndex(l => l.slug === currentSlug)
    if (index <= 0) return null
    return lessons.value[index - 1]
  }

  /**
   * Retourne les modules avec leurs leçons
   */
  const getModulesWithLessons = (): Module[] => {
    return Object.entries(MODULE_DEFINITIONS).map(([num, def]) => {
      const moduleNumber = Number(num)
      return {
        number: moduleNumber,
        title: def.title,
        icon: def.icon,
        lessons: getLessonsByModule(moduleNumber)
      }
    })
  }

  /**
   * Retourne les phases avec leurs modules et leçons
   */
  const getPhasesWithModules = (): Phase[] => {
    return Object.entries(PHASE_DEFINITIONS).map(([num, def]) => {
      const phaseNumber = Number(num)
      return {
        number: phaseNumber,
        title: def.title,
        modules: def.modules.map(moduleNum => ({
          number: moduleNum,
          title: MODULE_DEFINITIONS[moduleNum].title,
          icon: MODULE_DEFINITIONS[moduleNum].icon,
          lessons: getLessonsByModule(moduleNum)
        }))
      }
    })
  }

  return {
    // State
    lessons: readonly(lessons),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Methods
    loadLessons,
    getLessonsByModule,
    getLessonsByPhase,
    getNextLesson,
    getPreviousLesson,
    getModulesWithLessons,
    getPhasesWithModules
  }
}
