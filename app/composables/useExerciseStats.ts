/**
 * useExerciseStats - Tracking des statistiques d'exercices
 *
 * Gère le tracking détaillé pour chaque exercice :
 * - Temps passé (avec timer)
 * - Exécutions (succès/erreurs)
 * - Indices révélés
 * - Solution consultée
 * - Logging des erreurs
 *
 * IMPORTANT: Ce composable ne modifie JAMAIS le statut d'un exercice.
 * Le statut est géré par useSupabaseProgress.
 */

import type { DebugContextData } from '~/types/database.types'

export const useExerciseStats = (exerciseSlug: string) => {
  const { from } = useNuxyDb()
  const user = useSupabaseUser()
  const { userId } = useUserId()
  const { getDebugContext } = useDebugContext()

  // Timer pour le temps passé
  const startTime = ref<number | null>(null)
  const accumulatedTime = ref(0)
  const isTracking = ref(false)

  /**
   * Helper: Récupère le statut actuel pour le préserver dans les upserts
   */
  const getCurrentStatus = async (): Promise<string> => {
    try {
      const { data } = await from('exercise_progress')
        .select('status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', exerciseSlug)
        .maybeSingle()

      return data?.status || 'in-progress'
    } catch {
      return 'in-progress'
    }
  }

  /**
   * Démarre le timer de temps passé
   */
  const startTimer = () => {
    if (!isTracking.value) {
      startTime.value = Date.now()
      isTracking.value = true
    }
  }

  /**
   * Pause le timer et accumule le temps
   */
  const pauseTimer = () => {
    if (isTracking.value && startTime.value) {
      accumulatedTime.value += Math.floor((Date.now() - startTime.value) / 1000)
      startTime.value = null
      isTracking.value = false
    }
  }

  /**
   * Retourne le temps total en secondes
   */
  const getTotalTime = (): number => {
    let total = accumulatedTime.value
    if (isTracking.value && startTime.value) {
      total += Math.floor((Date.now() - startTime.value) / 1000)
    }
    return total
  }

  /**
   * Marque la première ouverture de l'exercice
   */
  const trackFirstOpen = async () => {
    if (!user.value) return

    try {
      // Vérifier si déjà ouvert ET récupérer le statut
      const { data: existing } = await from('exercise_progress')
        .select('first_opened_at, status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', exerciseSlug)
        .maybeSingle()

      if (existing?.first_opened_at) return // Déjà ouvert

      const debugContext = getDebugContext()

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: exerciseSlug,
          status: existing?.status || 'in-progress', // Préserver le statut existant
          first_opened_at: debugContext.recorded_at,
          debug_context: debugContext
        }, {
          onConflict: 'user_id,exercise_slug'
        })
    } catch (err) {
      console.error('Track first open error:', err)
    }
  }

  /**
   * Sauvegarde le temps passé
   */
  const saveTimeSpent = async () => {
    if (!user.value) return

    const totalTime = getTotalTime()
    if (totalTime === 0) return

    try {
      const debugContext = getDebugContext()

      // Récupérer le temps existant ET le statut
      const { data: existing } = await from('exercise_progress')
        .select('time_spent_seconds, status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', exerciseSlug)
        .maybeSingle()

      const newTotal = (existing?.time_spent_seconds || 0) + totalTime

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: exerciseSlug,
          status: existing?.status || 'in-progress', // Préserver le statut existant
          time_spent_seconds: newTotal,
          debug_context: debugContext
        }, {
          onConflict: 'user_id,exercise_slug'
        })

      // Reset le temps accumulé local après sauvegarde
      accumulatedTime.value = 0
    } catch (err) {
      console.error('Save time spent error:', err)
    }
  }

  /**
   * Track une exécution de code
   */
  const trackExecution = async (success: boolean) => {
    if (!user.value) return

    try {
      const debugContext = getDebugContext()

      // Récupérer les compteurs existants ET le statut
      const { data: existing } = await from('exercise_progress')
        .select('executions_count, successful_runs, status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', exerciseSlug)
        .maybeSingle()

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: exerciseSlug,
          status: existing?.status || 'in-progress', // Préserver le statut existant
          executions_count: (existing?.executions_count || 0) + 1,
          successful_runs: (existing?.successful_runs || 0) + (success ? 1 : 0),
          debug_context: debugContext
        }, {
          onConflict: 'user_id,exercise_slug'
        })
    } catch (err) {
      console.error('Track execution error:', err)
    }
  }

  /**
   * Track une erreur avec détails pédagogiques enrichis
   */
  const trackError = async (
    errorType: string,
    errorMessage: string,
    errorLine?: number,
    codeSnapshot?: string,
    errorDetails?: {
      hint?: string
      example?: string
      codeLine?: string
      rawError?: string
    }
  ) => {
    if (!user.value) return

    try {
      const debugContext = getDebugContext()

      // Incrémenter le compteur d'erreurs ET préserver le statut
      const { data: existing } = await from('exercise_progress')
        .select('errors_count, status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', exerciseSlug)
        .maybeSingle()

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: exerciseSlug,
          status: existing?.status || 'in-progress', // Préserver le statut existant
          errors_count: (existing?.errors_count || 0) + 1,
          debug_context: debugContext
        }, {
          onConflict: 'user_id,exercise_slug'
        })

      // Enrichir le debug_context avec les détails pédagogiques
      const enrichedContext = {
        ...debugContext,
        error_details: {
          hint: errorDetails?.hint || null,
          example: errorDetails?.example || null,
          code_line_content: errorDetails?.codeLine || null,
          raw_error: errorDetails?.rawError || null
        }
      }

      // Logger l'erreur dans la table dédiée
      await from('exercise_errors')
        .insert({
          user_id: userId.value,
          exercise_slug: exerciseSlug,
          error_type: errorType,
          error_message: errorMessage,
          error_line: errorLine || null,
          code_snapshot: codeSnapshot || null,
          debug_context: enrichedContext
        })
    } catch (err) {
      console.error('Track error error:', err)
    }
  }

  /**
   * Track un indice révélé
   */
  const trackHintRevealed = async () => {
    if (!user.value) return

    try {
      const debugContext = getDebugContext()

      // Récupérer le compteur existant ET le statut
      const { data: existing } = await from('exercise_progress')
        .select('hints_revealed, status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', exerciseSlug)
        .maybeSingle()

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: exerciseSlug,
          status: existing?.status || 'in-progress', // Préserver le statut existant
          hints_revealed: (existing?.hints_revealed || 0) + 1,
          debug_context: debugContext
        }, {
          onConflict: 'user_id,exercise_slug'
        })
    } catch (err) {
      console.error('Track hint revealed error:', err)
    }
  }

  /**
   * Track la consultation de la solution
   */
  const trackSolutionViewed = async () => {
    if (!user.value) return

    try {
      const debugContext = getDebugContext()

      // Vérifier si déjà marqué ET récupérer le statut
      const { data: existing } = await from('exercise_progress')
        .select('solution_viewed, status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', exerciseSlug)
        .maybeSingle()

      if (existing?.solution_viewed) return // Déjà marqué

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: exerciseSlug,
          status: existing?.status || 'in-progress', // Préserver le statut existant
          solution_viewed: true,
          solution_viewed_at: debugContext.recorded_at,
          debug_context: debugContext
        }, {
          onConflict: 'user_id,exercise_slug'
        })
    } catch (err) {
      console.error('Track solution viewed error:', err)
    }
  }

  /**
   * Charge les stats existantes depuis Supabase
   */
  const loadStats = async () => {
    if (!user.value) return null

    try {
      const { data } = await from('exercise_progress')
        .select('time_spent_seconds, executions_count, successful_runs, errors_count, hints_revealed, solution_viewed')
        .eq('user_id', userId.value)
        .eq('exercise_slug', exerciseSlug)
        .maybeSingle()

      return data
    } catch (err) {
      console.error('Load stats error:', err)
      return null
    }
  }

  return {
    // Timer
    startTimer,
    pauseTimer,
    getTotalTime,
    isTracking: readonly(isTracking),

    // Tracking methods
    trackFirstOpen,
    saveTimeSpent,
    trackExecution,
    trackError,
    trackHintRevealed,
    trackSolutionViewed,
    loadStats
  }
}
