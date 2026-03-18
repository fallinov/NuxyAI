/**
 * Composable pour charger et gérer les données d'exercice
 *
 * Charge toutes les données depuis le frontmatter Nuxt Content :
 * - Métadonnées (title, description, etc.)
 * - Validations
 * - Hints
 * - Solution
 *
 * Élimine le besoin de fichiers TypeScript séparés.
 */

import { validateExerciseCode, generateObjectives, type ValidationRule, type ExecutionResult, type ValidationResult } from '~/utils/exerciseValidator'

export interface Hint {
  title: string
  content: string
  example?: string
  learnMore?: string
}

export interface Solution {
  code: string
  explanation?: string
}

export interface ExerciseData {
  // Métadonnées
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  module: number
  exerciseNumber: string
  duration: number
  tags?: string[]
  concepts?: string[]

  // Code
  starterCode: string

  // Données consolidées
  solution?: Solution
  validations?: ValidationRule[]
  hints?: Hint[]

  // Corps markdown
  body: any
}

/**
 * Charge les données d'un exercice depuis Nuxt Content
 */
export function useExerciseData(slug: string) {
  // État réactif
  const validationResult = ref<ValidationResult | null>(null)

  /**
   * Valide le code utilisateur contre les règles de l'exercice
   */
  const validate = (exercise: ExerciseData, code: string, executionResult: ExecutionResult): ValidationResult => {
    if (!exercise.validations || exercise.validations.length === 0) {
      return {
        isValid: true,
        passedRules: 0,
        totalRules: 0,
        rulesStatus: [],
        messages: ['Aucune validation configurée pour cet exercice'],
        hints: []
      }
    }

    const result = validateExerciseCode(code, executionResult, exercise.validations)
    validationResult.value = result
    return result
  }

  /**
   * Génère les objectifs à afficher depuis les règles de validation
   */
  const getObjectives = (exercise: ExerciseData) => {
    if (!exercise.validations) return []
    return generateObjectives(exercise.validations, validationResult.value?.rulesStatus)
  }

  /**
   * Récupère les hints de l'exercice
   */
  const getHints = (exercise: ExerciseData): Hint[] => {
    return exercise.hints || []
  }

  /**
   * Récupère la solution de l'exercice
   */
  const getSolution = (exercise: ExerciseData): Solution | null => {
    return exercise.solution || null
  }

  /**
   * Réinitialise l'état de validation
   */
  const resetValidation = () => {
    validationResult.value = null
  }

  return {
    validationResult,
    validate,
    getObjectives,
    getHints,
    getSolution,
    resetValidation
  }
}

/**
 * Types pour la liste d'exercices (navigation)
 */
export interface Exercise {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exerciseNumber: string
  path: string
  moduleId: number
  exerciseType: 'javascript' | 'html-css-js' | 'intro'
  duration: number
}

/**
 * Compare deux numéros d'exercice (ex: "1.4" < "1.5" < "2.1")
 */
function compareExerciseNumbers(a: string, b: string): number {
  const [moduleA, numA] = a.split('.').map(Number)
  const [moduleB, numB] = b.split('.').map(Number)
  if (moduleA !== moduleB) return moduleA - moduleB
  return numA - numB
}

export interface Module {
  id: number
  title: string
  description: string
  icon: string
}

/**
 * Liste des modules du cours (statique car rarement modifiée)
 */
export const modules: Module[] = [
  {
    id: 1,
    title: 'Bases JavaScript',
    description: 'Variables, types, opérateurs et manipulation de texte',
    icon: 'i-lucide-graduation-cap'
  },
  {
    id: 2,
    title: 'Conditions',
    description: 'Structures conditionnelles et opérateurs logiques',
    icon: 'i-lucide-minimize-2'
  },
  {
    id: 3,
    title: 'Boucles',
    description: 'Répéter des actions avec while, for et for...of',
    icon: 'i-lucide-repeat'
  },
  {
    id: 4,
    title: 'Fonctions',
    description: 'Déclaration, paramètres et fonctions fléchées',
    icon: 'i-lucide-code'
  },
  {
    id: 5,
    title: 'Tableaux',
    description: 'Manipulation de tableaux avec filter, map et sort',
    icon: 'i-lucide-list'
  },
  {
    id: 6,
    title: 'Objets',
    description: 'Créer, accéder et manipuler des objets JavaScript',
    icon: 'i-lucide-box'
  },
  {
    id: 7,
    title: 'DOM',
    description: 'Sélectionner et modifier les éléments HTML',
    icon: 'i-lucide-mouse-pointer-click'
  },
  {
    id: 8,
    title: 'Événements & Formulaires',
    description: 'Gérer les interactions et valider les données',
    icon: 'i-lucide-hand'
  },
  {
    id: 9,
    title: 'Promesses & API',
    description: 'Comprendre les Promises et consommer une API avec fetch',
    icon: 'i-lucide-rocket'
  },
  {
    id: 10,
    title: 'Mini-projet : Gestion de produits',
    description: 'Construire une app complète avec DummyJSON (CRUD, recherche, tri)',
    icon: 'i-lucide-layout-dashboard'
  }
]

/**
 * Composable pour la liste des exercices (navigation)
 * Utilise un état global partagé via useState pour éviter les problèmes de chargement
 */
export function useExercisesList() {
  // État global partagé entre tous les composants
  const exercises = useState<Exercise[]>('exercises-list', () => [])
  const isLoaded = useState<boolean>('exercises-loaded', () => false)

  /**
   * Charge tous les exercices depuis Nuxt Content (une seule fois)
   */
  const loadExercises = async (): Promise<Exercise[]> => {
    // Si déjà chargé, retourner le cache
    if (isLoaded.value && exercises.value.length > 0) {
      return exercises.value
    }

    // Charger depuis Nuxt Content
    const data = await queryCollection('exercises').all()

    if (!data || data.length === 0) return []

    const mappedExercises = data.map(ex => ({
      id: ex.stem?.split('/').pop() || '',
      title: ex.title || '',
      description: ex.description || '',
      difficulty: (ex.difficulty as Exercise['difficulty']) || 'beginner',
      exerciseNumber: ex.exerciseNumber || '0.0',
      path: `/exercises/${ex.stem?.split('/').pop() || ''}`,
      moduleId: ex.module || 1,
      exerciseType: (ex.exerciseType as Exercise['exerciseType']) || 'javascript',
      duration: ex.duration || 5
    }))

    // Trier par exerciseNumber (ex: "1.4" < "1.5" < "2.1")
    mappedExercises.sort((a, b) => compareExerciseNumbers(a.exerciseNumber, b.exerciseNumber))

    // Mettre en cache dans l'état global
    exercises.value = mappedExercises
    isLoaded.value = true

    return mappedExercises
  }

  /**
   * Récupère les exercices (depuis le cache ou les charge)
   */
  const getExercises = (): Exercise[] => {
    return exercises.value
  }

  /**
   * Récupère un exercice par son slug
   */
  const getExerciseBySlug = (exercises: Exercise[], slug: string): Exercise | undefined => {
    return exercises.find(ex => ex.id === slug)
  }

  /**
   * Récupère les exercices d'un module
   */
  const getExercisesByModule = (exercises: Exercise[], moduleId: number): Exercise[] => {
    return exercises.filter(ex => ex.moduleId === moduleId)
  }

  /**
   * Récupère les modules qui ont des exercices
   */
  const getModulesWithExercises = (exercises: Exercise[]): Module[] => {
    const moduleIdsWithExercises = [...new Set(exercises.map(ex => ex.moduleId))]
    return modules.filter(m => moduleIdsWithExercises.includes(m.id))
  }

  /**
   * Récupère l'exercice suivant
   */
  const getNextExercise = (exercises: Exercise[], currentSlug: string): Exercise | null => {
    const sortedExercises = [...exercises].sort((a, b) => compareExerciseNumbers(a.exerciseNumber, b.exerciseNumber))
    const currentIndex = sortedExercises.findIndex(ex => ex.id === currentSlug)
    if (currentIndex === -1 || currentIndex === sortedExercises.length - 1) {
      return null
    }
    return sortedExercises[currentIndex + 1]
  }

  /**
   * Récupère l'exercice précédent
   */
  const getPreviousExercise = (exercises: Exercise[], currentSlug: string): Exercise | null => {
    const sortedExercises = [...exercises].sort((a, b) => compareExerciseNumbers(a.exerciseNumber, b.exerciseNumber))
    const currentIndex = sortedExercises.findIndex(ex => ex.id === currentSlug)
    if (currentIndex <= 0) {
      return null
    }
    return sortedExercises[currentIndex - 1]
  }

  /**
   * Récupère la progression (nombre actuel / total)
   */
  const getExerciseProgress = (exercises: Exercise[], currentSlug: string): { current: number; total: number } => {
    const sortedExercises = [...exercises].sort((a, b) => compareExerciseNumbers(a.exerciseNumber, b.exerciseNumber))
    const currentIndex = sortedExercises.findIndex(ex => ex.id === currentSlug)
    return {
      current: currentIndex + 1,
      total: exercises.length
    }
  }

  return {
    // État partagé (réactif)
    exercises,
    isLoaded,
    // Données statiques
    modules,
    // Fonctions
    loadExercises,
    getExercises,
    getExerciseBySlug,
    getExercisesByModule,
    getModulesWithExercises,
    getNextExercise,
    getPreviousExercise,
    getExerciseProgress
  }
}
