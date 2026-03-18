/**
 * Liste centralisée de tous les exercices disponibles
 * Organisés par modules selon le plan de cours 122
 */

export interface Exercise {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  order: number
  path: string
  moduleId: number
}

export interface Module {
  id: number
  title: string
  description: string
  icon: string
}

/**
 * Liste des modules du cours
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
    title: 'API',
    description: 'Consommer une API avec fetch et async/await',
    icon: 'i-lucide-rocket'
  }
]

/**
 * Liste complète des exercices dans l'ordre
 */
export const exercises: Exercise[] = [
  // Module 1 - Bases JavaScript
  {
    id: 'hello-javascript',
    title: 'Hello JavaScript !',
    description: 'Votre premier pas en JavaScript : apprenez à afficher du texte dans la console',
    difficulty: 'beginner',
    order: 1,
    path: '/exercises/hello-javascript',
    moduleId: 1
  },
  {
    id: 'variables-declarations',
    title: 'Variables et Déclarations',
    description: 'Apprenez à stocker des valeurs avec let et const, et comprenez la différence entre les deux',
    difficulty: 'beginner',
    order: 2,
    path: '/exercises/variables-declarations',
    moduleId: 1
  },
  {
    id: 'types-donnees',
    title: 'Types de Données',
    description: 'Découvrez les types de base en JavaScript : string, number et boolean',
    difficulty: 'beginner',
    order: 3,
    path: '/exercises/types-donnees',
    moduleId: 1
  },
  {
    id: 'operations-mathematiques',
    title: 'Opérations Mathématiques',
    description: 'Maîtrisez les opérations de base : addition, soustraction, multiplication et division',
    difficulty: 'beginner',
    order: 4,
    path: '/exercises/operations-mathematiques',
    moduleId: 1
  },
  {
    id: 'manipuler-texte',
    title: 'Manipuler du Texte',
    description: 'Découvrez les méthodes pour manipuler les chaînes de caractères : length, toUpperCase, toLowerCase',
    difficulty: 'beginner',
    order: 5,
    path: '/exercises/manipuler-texte',
    moduleId: 1
  }
]

/**
 * Récupère un exercice par son slug
 */
export function getExerciseBySlug(slug: string): Exercise | undefined {
  return exercises.find(ex => ex.id === slug)
}

/**
 * Récupère les exercices d'un module
 */
export function getExercisesByModule(moduleId: number): Exercise[] {
  return exercises.filter(ex => ex.moduleId === moduleId)
}

/**
 * Récupère les modules qui ont des exercices
 */
export function getModulesWithExercises(): Module[] {
  const moduleIdsWithExercises = [...new Set(exercises.map(ex => ex.moduleId))]
  return modules.filter(m => moduleIdsWithExercises.includes(m.id))
}

/**
 * Récupère l'exercice suivant
 */
export function getNextExercise(currentSlug: string): Exercise | null {
  const currentIndex = exercises.findIndex(ex => ex.id === currentSlug)
  if (currentIndex === -1 || currentIndex === exercises.length - 1) {
    return null
  }
  return exercises[currentIndex + 1]
}

/**
 * Récupère l'exercice précédent
 */
export function getPreviousExercise(currentSlug: string): Exercise | null {
  const currentIndex = exercises.findIndex(ex => ex.id === currentSlug)
  if (currentIndex <= 0) {
    return null
  }
  return exercises[currentIndex - 1]
}

/**
 * Récupère la progression (nombre actuel / total)
 */
export function getExerciseProgress(currentSlug: string): { current: number; total: number } {
  const currentIndex = exercises.findIndex(ex => ex.id === currentSlug)
  return {
    current: currentIndex + 1,
    total: exercises.length
  }
}
