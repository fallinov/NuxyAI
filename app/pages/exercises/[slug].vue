<script setup lang="ts">
/**
 * Page dynamique pour afficher un exercice
 *
 * Cette page :
 * - Charge l'exercice depuis Nuxt Content (données consolidées)
 * - Affiche l'éditeur de code
 * - Exécute et valide le code automatiquement
 * - Sauvegarde la progression dans localStorage
 */

// Utiliser le layout exercices (plein écran, standalone)
definePageMeta({
  layout: 'exercise',
  // Force la recréation complète du composant quand le slug change
  // (évite le bug où le contenu markdown ne se recharge pas lors de la navigation SPA)
  // Note: on utilise params.slug (pas fullPath) pour éviter une recréation
  // inutile lors de changements de query params
  key: route => route.params.slug as string
})

import confetti from 'canvas-confetti'
import { useConfetti } from '~/composables/useConfetti'
import { useExerciseData, useExercisesList, type ExerciseData, type Hint, type Solution } from '~/composables/useExerciseData'
import { getDifficultyConfig, getStatusConfig, type ExerciseStatus } from '~/data/exerciseConfig'
import { generateObjectives } from '~/utils/exerciseValidator'
import type { HtmlCssJsCode, ExerciseType } from '~/types/htmlCssJs'
import type { TabsItem } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

// Confettis de célébration
function launchConfetti() {
  const duration = 1500
  const end = Date.now() + duration
  const colors = ['#60B155', '#33A6A6', '#FFD966', '#D45E95', '#C8B4DC']

  function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

/**
 * Vérifie si le module courant est entièrement complété
 * et lance les confettis appropriés (module ou exercice)
 */
async function launchCompletionConfetti() {
  const currentModule = exerciseData.value.module
  if (!exercises.value || exercises.value.length === 0) {
    launchConfetti()
    return
  }

  const moduleExercises = getExercisesByModule(exercises.value, currentModule)
  // Vérifier si tous les exercices du module sont complétés
  // (le slug courant vient d'être marqué completed, donc on le considère comme tel)
  const statuses = await Promise.all(
    moduleExercises.map(async ex => ex.id === slug || (await getExerciseStatus(ex.id)) === 'completed')
  )
  const allCompleted = statuses.every(Boolean)

  if (allCompleted && moduleExercises.length > 1) {
    // Dernier exercice du module → grosse célébration
    confettiComposable.moduleComplete()
  } else {
    launchConfetti()
  }
}

// Charger l'exercice depuis Nuxt Content (données consolidées)
const { data: exercise } = await useAsyncData(`exercise-${slug}`, () => {
  return queryCollection('exercises').path(`/exercises/${slug}`).first()
})

// Rediriger si l'exercice n'existe pas
if (!exercise.value) {
  throw createError({
    statusCode: 404,
    message: 'Exercice non trouvé'
  })
}

// Détecter le type d'exercice (javascript par défaut pour rétrocompatibilité)
const exerciseType = computed<ExerciseType>(() => {
  return (exercise.value?.exerciseType as ExerciseType) || 'javascript'
})

// Helper pour normaliser le starterCode selon le type
const getStarterCode = (rawCode: string | HtmlCssJsCode | undefined): string | HtmlCssJsCode => {
  if (!rawCode) {
    return exerciseType.value === 'html-css-js'
      ? { html: '', css: '', js: '' }
      : '// Écris ton code ici\n'
  }
  return rawCode
}

// Typage de l'exercice avec les données consolidées
const exerciseData = computed<ExerciseData>(() => ({
  title: exercise.value?.title || '',
  description: exercise.value?.description || '',
  difficulty: (exercise.value?.difficulty as ExerciseData['difficulty']) || 'beginner',
  module: exercise.value?.module || 1,
  exerciseNumber: exercise.value?.exerciseNumber || '',
  duration: exercise.value?.duration || 5,
  tags: exercise.value?.tags || [],
  concepts: exercise.value?.concepts || [],
  starterCode: getStarterCode(exercise.value?.starterCode),
  solution: exercise.value?.solution as Solution | undefined,
  validations: exercise.value?.validations || [],
  hints: exercise.value?.hints as Hint[] | undefined,
  body: exercise.value?.body
}))

// SEO
useSeoMeta({
  title: exerciseData.value.title,
  description: exerciseData.value.description
})

// Composables
const { executeCode, lastResult, isExecuting, executionTime, reset } = useExerciseEngine()
const { getExerciseStatus, startExercise, completeExercise, incrementAttempts, getAttempts, getSavedCode, saveCode, clearSavedCode, syncFromLocalStorage, syncFromSupabase } = useSupabaseProgress()
const { validate, getObjectives, getHints, getSolution, resetValidation, validationResult } = useExerciseData(slug)
const { exercises, loadExercises, getNextExercise, getExercisesByModule } = useExercisesList()
const confettiComposable = useConfetti()

// Stats tracking
const {
  startTimer,
  pauseTimer,
  saveTimeSpent,
  trackFirstOpen,
  trackExecution,
  trackError,
  trackHintRevealed,
  trackSolutionViewed
} = useExerciseStats(slug)

// Composable pour le mode HTML/CSS/JS
const htmlCssJsEngine = useHtmlCssJsEngine()

// Résultats de validation pour le mode HTML/CSS/JS
const htmlCssJsValidationResults = ref<Array<{ passed: boolean; message: string; rule: any }>>([])

// Flag pour indiquer qu'une validation est en attente (après exécution)
const pendingValidation = ref(false)

// Charger la liste des exercices (état partagé)
await loadExercises()

// État local
const editorKey = ref(0) // Clé pour forcer le re-render de l'éditeur
const currentCode = ref('')
const showSuccess = ref(false)
const exerciseStatus = ref<'not-started' | 'in-progress' | 'completed'>('not-started')
const attempts = ref(0)
const showHints = ref(false)

// État des onglets mobiles (Lesson/Code/Output)
const activeTab = ref('lesson')

// Définition des onglets mobiles pour UTabs
const mobileTabs: TabsItem[] = [
  { label: 'Lesson', icon: 'i-lucide-book-open', value: 'lesson' },
  { label: 'Code', icon: 'i-lucide-code', value: 'code' },
  { label: 'Output', icon: 'i-lucide-monitor', value: 'output' }
]

// État du panneau d'instructions (masquer pour plus d'espace)
const showInstructions = ref(true)

// Références vers SplitOutputPanel pour rafraîchir l'aperçu et accéder à l'iframe (desktop + mobile)
const splitOutputDesktopRef = ref<{ refresh: () => void; clearConsole: () => void; getIframeWindow: () => Window | null } | null>(null)
const splitOutputMobileRef = ref<{ refresh: () => void; clearConsole: () => void; getIframeWindow: () => Window | null } | null>(null)

// État de l'affichage de la solution dans la console
const showSolution = ref(false)
const solution = computed(() => getSolution(exerciseData.value))

// Auto-advance vers l'exercice suivant
const nextExercise = computed(() => {
  if (!exercises.value || exercises.value.length === 0) return null
  return getNextExercise(exercises.value, slug)
})
const countdownTimer = ref<ReturnType<typeof setInterval> | null>(null)
const countdownSeconds = ref(10)

// Code initial : starterCode par défaut, mis à jour avec le code sauvegardé côté client
// Note: Pour les exercices JavaScript, on s'assure que c'est toujours une string
const initialCode = ref<string>(
  typeof exerciseData.value.starterCode === 'string'
    ? exerciseData.value.starterCode
    : '// Écris ton code ici\n'
)

// Helper pour normaliser le code HTML/CSS/JS en s'assurant que toutes les propriétés sont des strings
const normalizeHtmlCssJsCode = (code: unknown): HtmlCssJsCode => {
  if (typeof code !== 'object' || code === null) {
    return { html: '', css: '', js: '' }
  }
  const obj = code as Record<string, unknown>
  return {
    html: typeof obj.html === 'string' ? obj.html : '',
    css: typeof obj.css === 'string' ? obj.css : '',
    js: typeof obj.js === 'string' ? obj.js : ''
  }
}

// Code HTML/CSS/JS initial (pour le mode html-css-js)
const initialHtmlCssJsCode = computed<HtmlCssJsCode>(() => {
  return normalizeHtmlCssJsCode(exerciseData.value.starterCode)
})

// Code HTML/CSS/JS courant (initialisé avec le starterCode)
const currentHtmlCssJsCode = ref<HtmlCssJsCode>(
  normalizeHtmlCssJsCode(exerciseData.value.starterCode)
)

// Hints de l'exercice (depuis le frontmatter consolidé)
const hints = computed(() => getHints(exerciseData.value))

// Objectifs générés depuis les validations
// Pour les exercices HTML/CSS/JS, utiliser htmlCssJsValidationResults (circuit séparé)
const objectives = computed(() => {
  if (exerciseType.value === 'html-css-js' && htmlCssJsValidationResults.value.length > 0) {
    const rulesStatus = htmlCssJsValidationResults.value.map(r => r.passed)
    return generateObjectives(exerciseData.value.validations || [], rulesStatus)
  }
  return getObjectives(exerciseData.value)
})

/**
 * Affiche la solution dans la console
 */
const handleViewSolution = () => {
  showSolution.value = true
  // Stats: Track consultation de la solution
  trackSolutionViewed()
  // Basculer automatiquement vers l'onglet Output sur mobile
  if (window.innerWidth < 1024) {
    activeTab.value = 'output'
  }
}

/**
 * Annule le countdown et la navigation automatique
 */
const cancelAutoAdvance = () => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
    countdownTimer.value = null
  }
  countdownSeconds.value = 10
}

/**
 * Démarre le countdown pour passer à l'exercice suivant
 */
const startAutoAdvance = () => {
  if (!nextExercise.value) return

  const toast = useToast()
  countdownSeconds.value = 10

  // Créer le toast avec countdown
  const toastId = toast.add({
    id: 'auto-advance',
    title: 'Exercice réussi ! 🎉',
    description: `Prochain exercice dans ${countdownSeconds.value}s...`,
    icon: 'i-lucide-party-popper',
    color: 'success',
    timeout: 0, // Pas de fermeture automatique
    actions: [{
      label: 'Rester ici',
      icon: 'i-lucide-x',
      click: () => {
        cancelAutoAdvance()
        toast.remove('auto-advance')
      }
    }]
  })

  // Démarrer le countdown
  countdownTimer.value = setInterval(() => {
    countdownSeconds.value--

    // Mettre à jour le toast
    toast.update('auto-advance', {
      description: `Prochain exercice dans ${countdownSeconds.value}s...`
    })

    // Naviguer quand le countdown atteint 0
    if (countdownSeconds.value <= 0) {
      cancelAutoAdvance()
      toast.remove('auto-advance')
      router.push(nextExercise.value!.path)
    }
  }, 1000)
}

// Nettoyer le timer au démontage
onUnmounted(() => {
  cancelAutoAdvance()
})

// Charger le code sauvegardé et marquer comme commencé (côté client uniquement)
onMounted(async () => {
  // Les intros n'ont pas de tracking ni de code sauvegardé
  if (exerciseType.value === 'intro') return

  // S'assurer que la sync bidirectionnelle est terminée (no-op si déjà faite)
  await syncFromLocalStorage()
  await syncFromSupabase()

  // Lire la progression depuis localStorage (à jour après sync)
  exerciseStatus.value = await getExerciseStatus(slug)
  attempts.value = await getAttempts(slug)

  // Restaurer le code sauvegardé depuis localStorage
  const savedCode = await getSavedCode(slug)
  if (savedCode) {
    // Pour les exercices HTML/CSS/JS, le code est stocké en JSON
    if (exerciseType.value === 'html-css-js') {
      try {
        const parsedCode = JSON.parse(savedCode) as HtmlCssJsCode
        currentHtmlCssJsCode.value = parsedCode
      } catch {
        // Si parsing échoue, ignorer et garder le starterCode
      }
    } else {
      initialCode.value = savedCode
    }
    // Forcer le re-render de l'éditeur avec le code restauré
    editorKey.value++
  }

  // Marquer comme commencé si nécessaire
  if (exerciseStatus.value === 'not-started') {
    await startExercise(slug)
    exerciseStatus.value = 'in-progress'
  }

  // Stats: Marquer première ouverture et démarrer le timer
  trackFirstOpen()
  startTimer()
})

// Sauvegarder le temps passé quand l'utilisateur quitte la page
onUnmounted(() => {
  pauseTimer()
  saveTimeSpent()
})

// Handler pour visibility change (défini en dehors pour pouvoir le retirer)
let visibilityHandler: (() => void) | null = null

// Sauvegarder le temps quand la page perd le focus (changement d'onglet, etc.)
onMounted(() => {
  visibilityHandler = () => {
    if (document.visibilityState === 'hidden') {
      pauseTimer()
      saveTimeSpent()
    } else {
      startTimer()
    }
  }
  document.addEventListener('visibilitychange', visibilityHandler)
})

// Cleanup du listener visibility
onUnmounted(() => {
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
  }
})

/**
 * Exécute et valide le code
 */
const handleExecute = async (code: string) => {
  const toast = useToast()

  currentCode.value = code

  // Réinitialiser l'état de succès
  showSuccess.value = false

  // Incrémenter les tentatives (async mais fire-and-forget pour UX fluide)
  incrementAttempts(slug)
  attempts.value++

  // Exécuter le code
  await executeCode(code)

  // Stats: Track l'exécution (succès ou erreur)
  const hasErrors = lastResult.value?.errors && lastResult.value.errors.length > 0
  trackExecution(!hasErrors)

  // Stats: Logger les erreurs avec détails pédagogiques complets
  if (hasErrors && lastResult.value?.errors) {
    for (const error of lastResult.value.errors) {
      trackError(
        error.pedagogical?.title || error.type || 'UnknownError',
        error.pedagogical?.message || error.content || 'Erreur inconnue',
        error.pedagogical?.line,
        code,
        {
          hint: error.pedagogical?.hint,
          example: error.pedagogical?.example,
          codeLine: error.pedagogical?.codeLine,
          rawError: error.content
        }
      )
    }
  }

  // Valider le résultat avec le nouveau système déclaratif
  const validation = validate(exerciseData.value, code, lastResult.value || { logs: [], errors: [] })

  // Si validé
  if (validation.isValid) {
    // Marquer comme complété si pas déjà fait
    if (exerciseStatus.value !== 'completed') {
      completeExercise(slug) // Async - sauvegarde localStorage immédiat + Supabase en arrière-plan
      exerciseStatus.value = 'completed'
      launchCompletionConfetti() // Détecte si module complet → grosse célébration

      // Passer automatiquement à l'onglet Output sur mobile
      if (window.innerWidth < 1024) {
        activeTab.value = 'output'
      }

      // Auto-advance vers l'exercice suivant (si disponible)
      if (nextExercise.value) {
        startAutoAdvance()
      } else {
        // Dernier exercice : simple notification
        toast.add({
          title: 'Félicitations !',
          description: 'Tu as terminé tous les exercices disponibles !',
          color: 'green',
          timeout: 5000
        })
      }
    }
    // Exercice déjà complété et re-validé : pas de toast (le panel montre le succès)
  } else if (lastResult.value?.errors && lastResult.value.errors.length > 0) {
    // Notification d'erreur
    toast.add({
      title: 'Erreur dans le code',
      description: 'Corrigez les erreurs et réessayez.',
      color: 'red',
      timeout: 4000
    })
  } else {
    // Notification de validation partielle
    toast.add({
      title: `${validation.passedRules}/${validation.totalRules} critères validés`,
      description: 'Vous y êtes presque ! Continuez.',
      color: 'orange',
      timeout: 3000
    })
  }

  // Toujours afficher le résultat de validation
  showSuccess.value = validation.isValid

  // Scroller vers les objectifs pour montrer les résultats
  scrollToObjectives()
}

/**
 * Sauvegarde automatique du code (appelée par l'éditeur)
 * Async mais fire-and-forget pour UX fluide
 */
const handleCodeChange = (code: string) => {
  currentCode.value = code
  // Sauvegarder seulement si le code est différent du starterCode
  if (code !== exerciseData.value.starterCode) {
    saveCode(slug, code) // Async - localStorage immédiat + Supabase en arrière-plan
  }
}

/**
 * Scrolle le volet instructions vers la section Objectifs
 * Utilise nextTick pour attendre la mise à jour du DOM (résultats de validation)
 */
const scrollToObjectives = () => {
  nextTick(() => {
    document.getElementById('objectives-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

/**
 * Exécute et valide le code HTML/CSS/JS
 * Note: La validation des règles DOM se fait dans handleDomReady après le chargement de l'iframe
 */
const handleExecuteHtmlCssJs = async (code: HtmlCssJsCode) => {
  currentHtmlCssJsCode.value = code

  // Réinitialiser l'état de succès
  showSuccess.value = false
  htmlCssJsEngine.clearResults()
  htmlCssJsValidationResults.value = []

  // Incrémenter les tentatives
  incrementAttempts(slug)
  attempts.value++

  // Stats: Track l'exécution ici (le détail erreurs sera dans handleHtmlCssJsDomReady)
  trackExecution(true)

  // Marquer qu'une validation est en attente (sera faite après dom-ready)
  pendingValidation.value = true

  // Rafraîchir l'aperçu (exécute le code dans l'iframe)
  // La validation sera déclenchée par l'événement dom-ready
  splitOutputDesktopRef.value?.refresh()
  splitOutputMobileRef.value?.refresh()

  // Switch automatique vers Output sur mobile après exécution
  if (window.innerWidth < 1024) {
    activeTab.value = 'output'
  }
}

/**
 * Gère l'événement dom-ready de l'iframe et lance la validation
 */
const handleHtmlCssJsDomReady = () => {
  // Si pas de validation en attente, ignorer
  if (!pendingValidation.value) return
  pendingValidation.value = false

  const toast = useToast()

  // Obtenir la fenêtre de l'iframe pour les validations DOM
  const iframeWindow = splitOutputDesktopRef.value?.getIframeWindow() ||
                       splitOutputMobileRef.value?.getIframeWindow()

  // Passer l'iframe au moteur pour les validations DOM
  if (iframeWindow) {
    htmlCssJsEngine.setIframeWindow(iframeWindow)
  }

  // Transférer les logs console du SplitOutputPanel vers le moteur de validation
  const panelEntries = splitOutputDesktopRef.value?.consoleEntries || splitOutputMobileRef.value?.consoleEntries
  if (panelEntries) {
    for (const entry of panelEntries) {
      if (entry.type === 'error') {
        const errorEntry = entry as import('~/types/htmlCssJs').ErrorEntry
        htmlCssJsEngine.addError(errorEntry)

        // Stats: Logger l'erreur avec détails pédagogiques
        const codeSnapshot = [
          currentHtmlCssJsCode.value.html ? `<!-- HTML -->\n${currentHtmlCssJsCode.value.html}` : '',
          currentHtmlCssJsCode.value.css ? `/* CSS */\n${currentHtmlCssJsCode.value.css}` : '',
          currentHtmlCssJsCode.value.js ? `// JS\n${currentHtmlCssJsCode.value.js}` : ''
        ].filter(Boolean).join('\n\n')

        trackError(
          errorEntry.pedagogical?.title || 'Erreur HTML/CSS/JS',
          errorEntry.pedagogical?.message || errorEntry.content || 'Erreur inconnue',
          errorEntry.line,
          codeSnapshot,
          {
            hint: errorEntry.pedagogical?.hint,
            example: errorEntry.pedagogical?.example,
            rawError: errorEntry.content
          }
        )
      } else {
        htmlCssJsEngine.addConsoleEntry(entry as import('~/types/htmlCssJs').ConsoleEntry)
      }
    }
  }

  // Valider avec le moteur HTML/CSS/JS
  const validationResults = htmlCssJsEngine.validateCode(
    currentHtmlCssJsCode.value,
    exerciseData.value.validations || []
  )
  htmlCssJsValidationResults.value = validationResults
  const passedCount = validationResults.filter(r => r.passed).length
  const totalCount = validationResults.length
  const allPassed = passedCount === totalCount && totalCount > 0

  // Si validé
  if (allPassed) {
    // Marquer comme complété si pas déjà fait
    if (exerciseStatus.value !== 'completed') {
      completeExercise(slug)
      exerciseStatus.value = 'completed'
      launchCompletionConfetti() // Détecte si module complet → grosse célébration

      // Auto-advance vers l'exercice suivant
      if (nextExercise.value) {
        startAutoAdvance()
      } else {
        toast.add({
          title: 'Félicitations !',
          description: 'Tu as terminé tous les exercices disponibles !',
          color: 'green',
          timeout: 5000
        })
      }
    }
    // Exercice déjà complété et re-validé : pas de toast (le panel montre le succès)
  } else if (totalCount > 0) {
    toast.add({
      title: `${passedCount}/${totalCount} critères validés`,
      description: 'Vous y êtes presque ! Continuez.',
      color: 'orange',
      timeout: 3000
    })
  }

  showSuccess.value = allPassed

  // Scroller vers les objectifs pour montrer les résultats
  scrollToObjectives()
}

/**
 * Sauvegarde automatique du code HTML/CSS/JS
 */
const handleCodeChangeHtmlCssJs = (code: HtmlCssJsCode) => {
  currentHtmlCssJsCode.value = code
  // Sauvegarder en JSON
  const codeJson = JSON.stringify(code)
  saveCode(slug, codeJson)
}

/**
 * Réinitialise le code de l'éditeur
 */
const handleReset = () => {
  // Effacer le code sauvegardé (async, fire-and-forget)
  clearSavedCode(slug)

  // Réinitialiser selon le type d'exercice
  if (exerciseType.value === 'html-css-js') {
    currentHtmlCssJsCode.value = normalizeHtmlCssJsCode(exerciseData.value.starterCode)
    htmlCssJsEngine.clearResults()
  } else {
    currentCode.value = exerciseData.value.starterCode as string
  }

  resetValidation()
  showSuccess.value = false
  reset()
}

/**
 * Émet vers l'éditeur pour réinitialiser le code
 */
const resetEditor = () => {
  editorKey.value++
  handleReset()
}

/**
 * Badge de difficulté (config centralisée)
 */
const difficulty = computed(() => {
  return getDifficultyConfig(exerciseData.value.difficulty)
})

/**
 * Badge de statut (config centralisée)
 */
const status = computed(() => {
  return getStatusConfig(exerciseStatus.value)
})
</script>

<template>
  <!-- Layout plein écran avec header, sidebar et footer -->
  <div class="h-screen flex flex-col">
    <!-- Header compact -->
    <ExercisesExerciseHeader />

    <!-- Main sémantique pour le contenu principal -->
    <main class="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">

    <!-- Mode Introduction : contenu plein écran, pas d'éditeur ni console -->
    <div v-if="exerciseType === 'intro'" class="flex-1 overflow-y-auto">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <!-- Badge + durée -->
        <div class="flex items-center gap-3 mb-6">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-nuxy-teal/10 dark:bg-nuxy-teal/20 text-nuxy-teal-dark dark:text-nuxy-teal text-sm font-medium rounded-full">
            <UIcon name="i-lucide-book-open" class="w-4 h-4" />
            Introduction
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
            {{ exerciseData.duration }} min de lecture
          </span>
        </div>

        <!-- Titre -->
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
          {{ exerciseData.title }}
        </h1>

        <!-- Contenu markdown -->
        <div class="prose prose-lg dark:prose-invert max-w-none">
          <ContentRenderer v-if="exercise" :value="exercise" />
        </div>

        <!-- CTA vers l'exercice suivant -->
        <div v-if="nextExercise" class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Prochain exercice</p>
              <p class="font-semibold text-gray-900 dark:text-white">{{ nextExercise.title }}</p>
            </div>
            <UButton
              :to="nextExercise.path"
              size="lg"
              color="primary"
              trailing-icon="i-lucide-arrow-right"
              class="w-full sm:w-auto justify-center"
            >
              C'est parti !
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Mode Exercice : éditeur + console -->
    <template v-else>

    <!-- Desktop : Panels redimensionnables -->
    <div class="flex-1 overflow-hidden hidden lg:flex">
      <!-- Bouton pour réafficher les instructions (quand masquées) -->
      <div
        v-if="!showInstructions"
        class="flex-shrink-0 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex items-start pt-4"
      >
        <UTooltip text="Afficher les instructions" :popper="{ placement: 'right' }">
          <UButton
            icon="i-lucide-panel-left-open"
            color="neutral"
            variant="ghost"
            size="sm"
            class="mx-1"
            @click="showInstructions = true"
          />
        </UTooltip>
      </div>

      <!-- Layout avec instructions -->
      <UiResizablePanels
        v-if="showInstructions"
        direction="horizontal"
        :default-size="33.33"
        :min-size="250"
        class="flex-1"
      >
        <!-- Panel 1 : Instructions (scrollable) -->
        <template #first>
          <div class="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 relative">
            <!-- Bouton pour masquer les instructions -->
            <UTooltip text="Masquer les instructions" :popper="{ placement: 'right' }">
              <UButton
                icon="i-lucide-panel-left-close"
                color="neutral"
                variant="ghost"
                size="xs"
                class="absolute top-2 right-2 z-10"
                @click="showInstructions = false"
              />
            </UTooltip>

            <ExercisesLessonPanel
              class="p-6"
              :attempts="attempts"
              :exercise-status="exerciseStatus"
              :exercise="exercise"
              :objectives="objectives"
              :hints="hints"
              :show-hints="showHints"
              @toggle-hints="showHints = !showHints"
              @hint-revealed="trackHintRevealed"
            />
          </div>
        </template>

        <!-- Panel 2 : Éditeur + Console/Preview -->
        <template #second>
        <UiResizablePanels
          direction="horizontal"
          :default-size="60"
          :min-size="300"
          class="h-full bg-gray-900"
        >
          <!-- Éditeur JavaScript (mode classique) -->
          <template #first v-if="exerciseType === 'javascript'">
            <ExercisesCodePanel
              :key="editorKey"
              :initial-code="initialCode as string"
              :is-executing="isExecuting"
              @execute="handleExecute"
              @code-change="handleCodeChange"
              @reset="resetEditor"
              @view-solution="handleViewSolution"
            />
          </template>

          <!-- Éditeur HTML/CSS/JS (mode multi-panneaux) -->
          <template #first v-else>
            <ExercisesHtmlCssJsCodePanel
              :key="editorKey"
              :initial-code="currentHtmlCssJsCode"
              :is-executing="isExecuting"
              @execute="handleExecuteHtmlCssJs"
              @code-change="handleCodeChangeHtmlCssJs"
              @reset="resetEditor"
              @view-solution="handleViewSolution"
            />
          </template>

          <!-- Console à droite (mode JavaScript) -->
          <template #second v-if="exerciseType === 'javascript'">
            <ExercisesOutputPanel
              :validation-result="validationResult"
              :exercise-status="exerciseStatus"
              :last-result="lastResult"
              :execution-time="executionTime"
              :show-solution="showSolution"
              :solution="solution"
            />
          </template>

          <!-- Preview + Console (mode HTML/CSS/JS) -->
          <template #second v-else>
            <ExercisesSplitOutputPanel
              ref="splitOutputDesktopRef"
              :code="currentHtmlCssJsCode"
              :auto-refresh="true"
              :show-solution="showSolution"
              :solution="solution"
              :validation-results="htmlCssJsValidationResults"
              :exercise-status="exerciseStatus"
              @dom-ready="handleHtmlCssJsDomReady"
            />
          </template>
        </UiResizablePanels>
      </template>
    </UiResizablePanels>

      <!-- Layout sans instructions (plein écran éditeur + console) -->
      <UiResizablePanels
        v-else
        direction="horizontal"
        :default-size="50"
        :min-size="300"
        class="flex-1 bg-gray-900"
      >
        <!-- Éditeur JavaScript (mode classique) -->
        <template #first v-if="exerciseType === 'javascript'">
          <ExercisesCodePanel
            :key="editorKey"
            :initial-code="initialCode as string"
            :is-executing="isExecuting"
            @execute="handleExecute"
            @code-change="handleCodeChange"
            @reset="resetEditor"
            @view-solution="handleViewSolution"
          />
        </template>

        <!-- Éditeur HTML/CSS/JS (mode multi-panneaux) -->
        <template #first v-else>
          <ExercisesHtmlCssJsCodePanel
            :key="editorKey"
            :initial-code="currentHtmlCssJsCode"
            :is-executing="isExecuting"
            @execute="handleExecuteHtmlCssJs"
            @code-change="handleCodeChangeHtmlCssJs"
            @reset="resetEditor"
            @view-solution="handleViewSolution"
          />
        </template>

        <!-- Console à droite (mode JavaScript) -->
        <template #second v-if="exerciseType === 'javascript'">
          <ExercisesOutputPanel
            :validation-result="validationResult"
            :exercise-status="exerciseStatus"
            :last-result="lastResult"
            :execution-time="executionTime"
            :show-solution="showSolution"
            :solution="solution"
          />
        </template>

        <!-- Preview + Console (mode HTML/CSS/JS) -->
        <template #second v-else>
          <ExercisesSplitOutputPanel
            ref="splitOutputDesktopRef"
            :code="currentHtmlCssJsCode"
            :auto-refresh="true"
            :show-solution="showSolution"
            :solution="solution"
            :validation-results="htmlCssJsValidationResults"
            :exercise-status="exerciseStatus"
            @dom-ready="handleHtmlCssJsDomReady"
          />
        </template>
      </UiResizablePanels>
    </div>

    <!-- Mobile : Onglets (Lesson/Code/Output) -->
    <div class="flex-1 overflow-hidden lg:hidden flex flex-col">
      <!-- Onglets de navigation mobile (UTabs) -->
      <div class="p-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <UTabs
          v-model="activeTab"
          :items="mobileTabs"
          :content="false"
          variant="pill"
          :ui="{
            list: 'gap-2',
            trigger: 'flex-1 justify-center'
          }"
        />
      </div>

      <!-- Contenu des onglets -->
      <div class="flex-1 overflow-hidden">
      <!-- Lesson -->
      <div
        v-show="activeTab === 'lesson'"
        class="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6"
      >
        <ExercisesLessonPanel
          :attempts="attempts"
          :exercise-status="exerciseStatus"
          :exercise="exercise"
          :objectives="objectives"
          :hints="hints"
          :show-hints="showHints"
          @toggle-hints="showHints = !showHints"
              @hint-revealed="trackHintRevealed"
        />
      </div>

      <!-- Code (mode JavaScript) -->
      <div
        v-show="activeTab === 'code' && exerciseType === 'javascript'"
        class="h-full"
      >
        <ExercisesCodePanel
          :key="editorKey"
          :initial-code="initialCode as string"
          :is-executing="isExecuting"
          @execute="handleExecute"
          @code-change="handleCodeChange"
          @reset="resetEditor"
          @view-solution="handleViewSolution"
        />
      </div>

      <!-- Code (mode HTML/CSS/JS) -->
      <div
        v-show="activeTab === 'code' && exerciseType === 'html-css-js'"
        class="h-full"
      >
        <ExercisesHtmlCssJsCodePanel
          :key="editorKey"
          :initial-code="currentHtmlCssJsCode"
          :is-executing="isExecuting"
          @execute="handleExecuteHtmlCssJs"
          @code-change="handleCodeChangeHtmlCssJs"
          @reset="resetEditor"
          @view-solution="handleViewSolution"
        />
      </div>

      <!-- Output (mode JavaScript) -->
      <div
        v-show="activeTab === 'output' && exerciseType === 'javascript'"
        class="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6"
      >
        <ExercisesOutputPanel
          :validation-result="validationResult"
          :exercise-status="exerciseStatus"
          :last-result="lastResult"
          :execution-time="executionTime"
          :show-solution="showSolution"
          :solution="solution"
        />
      </div>

      <!-- Output (mode HTML/CSS/JS - Preview + Console) -->
      <div
        v-show="activeTab === 'output' && exerciseType === 'html-css-js'"
        class="h-full"
      >
        <ExercisesSplitOutputPanel
          ref="splitOutputMobileRef"
          :code="currentHtmlCssJsCode"
          :auto-refresh="true"
          :show-solution="showSolution"
          :solution="solution"
          :validation-results="htmlCssJsValidationResults"
          :exercise-status="exerciseStatus"
          @dom-ready="handleHtmlCssJsDomReady"
        />
      </div>
      </div>
    </div>
    </template>
    </main>

    <!-- Footer avec pagination et navigation (style Codecademy) -->
    <ExercisesExerciseFooter
      :current-slug="slug"
      :allow-next="true"
    />
  </div>
</template>
