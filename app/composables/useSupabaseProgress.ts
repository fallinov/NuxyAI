/**
 * useSupabaseProgress - Gestion de la progression avec Supabase
 *
 * Ce composable étend useExerciseProgress pour ajouter la synchronisation Supabase :
 * - Utilisateur connecté → Sync avec Supabase
 * - Utilisateur anonyme → Fallback sur localStorage
 * - Migration automatique localStorage → Supabase au premier login
 */

import type { ExerciseProgress as DbExerciseProgress } from '~/types/database.types'

// Interface commune pour la progression (compatible avec le composable existant)
export interface ExerciseProgressData {
  slug: string
  status: 'not-started' | 'in-progress' | 'completed'
  completedAt?: string
  attempts: number
  lastAttemptAt?: string
  savedCode?: string
  lastCodeSaveAt?: string
}

export const useSupabaseProgress = () => {
  const { from } = useNuxyDb()
  const user = useSupabaseUser()
  const { userId } = useUserId()

  // Utiliser le composable existant pour le localStorage
  const localProgress = useExerciseProgress()

  // État de synchronisation
  const isSyncing = ref(false)
  const syncError = ref<string | null>(null)
  const hasSyncedFromLocal = ref(false)
  const hasSyncedFromSupabase = ref(false)

  /**
   * Convertit les données Supabase vers le format local
   */
  const fromDbProgress = (db: DbExerciseProgress): ExerciseProgressData => ({
    slug: db.exercise_slug,
    status: db.status as ExerciseProgressData['status'],
    completedAt: db.completed_at || undefined,
    attempts: db.attempts,
    lastAttemptAt: db.last_attempt_at || undefined,
    savedCode: db.saved_code || undefined,
    lastCodeSaveAt: db.last_code_save_at || undefined
  })

  /**
   * Synchronise la progression localStorage vers Supabase (premier login)
   */
  const syncFromLocalStorage = async (): Promise<void> => {
    if (!user.value || hasSyncedFromLocal.value) return

    isSyncing.value = true
    syncError.value = null

    try {
      const localData = localProgress.progress.value.exercises
      const entries = Object.values(localData)

      if (entries.length === 0) {
        hasSyncedFromLocal.value = true
        return
      }

      // Préparer les données pour upsert
      const upsertData = entries.map(entry => ({
        user_id: userId.value!,
        exercise_slug: entry.slug,
        status: entry.status,
        attempts: entry.attempts,
        completed_at: entry.completedAt || null,
        last_attempt_at: entry.lastAttemptAt || null,
        saved_code: entry.savedCode || null,
        last_code_save_at: entry.lastCodeSaveAt || null
      }))

      // Upsert en batch
      const { error } = await from('exercise_progress')
        .upsert(upsertData, {
          onConflict: 'user_id,exercise_slug'
        })

      if (error) throw error

      hasSyncedFromLocal.value = true
    } catch (err: any) {
      syncError.value = 'Erreur lors de la synchronisation'
      console.error('Sync error:', err)
    } finally {
      isSyncing.value = false
    }
  }

  /**
   * Synchronise la progression Supabase vers localStorage
   * Appelé après syncFromLocalStorage pour avoir le localStorage à jour
   */
  const syncFromSupabase = async (): Promise<void> => {
    if (!user.value || hasSyncedFromSupabase.value) return

    isSyncing.value = true
    syncError.value = null

    try {
      const { data, error } = await from('exercise_progress')
        .select('*')
        .eq('user_id', userId.value)

      if (error) throw error

      // Vider localStorage avant de remplir (Supabase = source de vérité)
      localProgress.resetProgress()

      if (!data || data.length === 0) {
        hasSyncedFromSupabase.value = true
        return
      }

      // Convertir les données Supabase vers le format localStorage
      const remoteExercises: Record<string, import('./useExerciseProgress').ExerciseProgress> = {}
      for (const item of data as DbExerciseProgress[]) {
        const converted = fromDbProgress(item)
        remoteExercises[converted.slug] = {
          slug: converted.slug,
          status: converted.status,
          completedAt: converted.completedAt,
          attempts: converted.attempts,
          lastAttemptAt: converted.lastAttemptAt,
          savedCode: converted.savedCode,
          lastCodeSaveAt: converted.lastCodeSaveAt
        }
      }

      // Injecter dans localStorage via le composable local
      localProgress.mergeFromRemote(remoteExercises)

      hasSyncedFromSupabase.value = true
    } catch (err: any) {
      syncError.value = 'Erreur lors de la récupération depuis Supabase'
      console.error('Sync from Supabase error:', err)
    } finally {
      isSyncing.value = false
    }
  }

  /**
   * Charge toute la progression depuis Supabase
   */
  const loadAllProgress = async (): Promise<Record<string, ExerciseProgressData>> => {
    if (!user.value) {
      return localProgress.progress.value.exercises
    }

    try {
      const { data, error } = await from('exercise_progress')
        .select('*')
        .eq('user_id', userId.value)

      if (error) throw error

      const progressMap: Record<string, ExerciseProgressData> = {}
      for (const item of data as DbExerciseProgress[]) {
        progressMap[item.exercise_slug] = fromDbProgress(item)
      }

      return progressMap
    } catch (err) {
      console.error('Load progress error:', err)
      return localProgress.progress.value.exercises
    }
  }

  /**
   * Récupère le statut d'un exercice
   * Lit depuis localStorage (synchronisé au login via syncFromSupabase)
   */
  const getExerciseStatus = async (slug: string): Promise<'not-started' | 'in-progress' | 'completed'> => {
    return localProgress.getExerciseStatus(slug)
  }

  /**
   * Récupère la progression complète d'un exercice
   * Lit depuis localStorage (synchronisé au login via syncFromSupabase)
   */
  const getProgress = async (slug: string): Promise<ExerciseProgressData | null> => {
    return localProgress.getExerciseProgress(slug)
  }

  /**
   * Récupère le code sauvegardé
   * Lit depuis localStorage (synchronisé au login via syncFromSupabase)
   */
  const getSavedCode = async (slug: string): Promise<string | null> => {
    return localProgress.getSavedCode(slug)
  }

  /**
   * Sauvegarde le code d'un exercice
   */
  const saveCode = async (slug: string, code: string): Promise<void> => {
    // Toujours sauvegarder en local (fallback)
    localProgress.saveCode(slug, code)

    if (!user.value) return

    try {
      const now = new Date().toISOString()

      // Récupérer le statut actuel pour ne pas écraser un exercice complété
      const { data: existing } = await from('exercise_progress')
        .select('status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', slug)
        .maybeSingle()

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: slug,
          status: existing?.status || 'in-progress', // Préserver le statut existant
          saved_code: code,
          last_code_save_at: now
        }, {
          onConflict: 'user_id,exercise_slug'
        })
    } catch (err) {
      console.error('Save code error:', err)
    }
  }

  /**
   * Marque un exercice comme commencé (seulement si pas déjà complété)
   */
  const startExercise = async (slug: string): Promise<void> => {
    // Vérifier d'abord si déjà complété localement (ne pas régresser)
    const currentStatus = localProgress.getExerciseStatus(slug)
    if (currentStatus === 'completed') return

    // Mettre à jour en local
    localProgress.startExercise(slug)

    if (!user.value) return

    try {
      const now = new Date().toISOString()

      // Vérifier le statut dans Supabase avant d'écraser
      const { data: existing } = await from('exercise_progress')
        .select('status, attempts')
        .eq('user_id', userId.value)
        .eq('exercise_slug', slug)
        .maybeSingle()

      // Ne pas régresser un exercice complété
      if (existing?.status === 'completed') return

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: slug,
          status: 'in-progress',
          attempts: existing?.attempts || 1, // Préserver attempts si existe
          last_attempt_at: now
        }, {
          onConflict: 'user_id,exercise_slug'
        })
    } catch (err) {
      console.error('Start exercise error:', err)
    }
  }

  /**
   * Marque un exercice comme complété
   */
  const completeExercise = async (slug: string): Promise<void> => {
    // Toujours mettre à jour en local
    localProgress.completeExercise(slug)

    if (!user.value) return

    try {
      const now = new Date().toISOString()

      // Récupérer d'abord le nombre de tentatives actuel
      const { data: existing } = await from('exercise_progress')
        .select('attempts')
        .eq('user_id', userId.value)
        .eq('exercise_slug', slug)
        .maybeSingle()

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: slug,
          status: 'completed',
          completed_at: now,
          last_attempt_at: now,
          attempts: (existing?.attempts || 0) + 1
        }, {
          onConflict: 'user_id,exercise_slug'
        })
    } catch (err) {
      console.error('Complete exercise error:', err)
    }
  }

  /**
   * Incrémente le nombre de tentatives
   */
  const incrementAttempts = async (slug: string): Promise<void> => {
    // Toujours mettre à jour en local
    localProgress.incrementAttempts(slug)

    if (!user.value) return

    try {
      const now = new Date().toISOString()

      // Récupérer le nombre actuel de tentatives
      const { data: existing } = await from('exercise_progress')
        .select('attempts, status')
        .eq('user_id', userId.value)
        .eq('exercise_slug', slug)
        .maybeSingle()

      await from('exercise_progress')
        .upsert({
          user_id: userId.value,
          exercise_slug: slug,
          status: existing?.status || 'in-progress',
          attempts: (existing?.attempts || 0) + 1,
          last_attempt_at: now
        }, {
          onConflict: 'user_id,exercise_slug'
        })
    } catch (err) {
      console.error('Increment attempts error:', err)
    }
  }

  /**
   * Récupère le nombre de tentatives
   * Lit depuis localStorage (synchronisé au login via syncFromSupabase)
   */
  const getAttempts = async (slug: string): Promise<number> => {
    return localProgress.getAttempts(slug)
  }

  /**
   * Efface le code sauvegardé (reset)
   */
  const clearSavedCode = async (slug: string): Promise<void> => {
    // Toujours mettre à jour en local
    localProgress.clearSavedCode(slug)

    if (!user.value) return

    try {
      await from('exercise_progress')
        .update({
          saved_code: null,
          last_code_save_at: null
        })
        .eq('user_id', userId.value)
        .eq('exercise_slug', slug)
    } catch (err) {
      console.error('Clear saved code error:', err)
    }
  }

  /**
   * Réinitialise un exercice
   */
  const resetExercise = async (slug: string): Promise<void> => {
    // Toujours mettre à jour en local
    localProgress.resetExercise(slug)

    if (!user.value) return

    try {
      await from('exercise_progress')
        .delete()
        .eq('user_id', userId.value)
        .eq('exercise_slug', slug)
    } catch (err) {
      console.error('Reset exercise error:', err)
    }
  }

  /**
   * Réinitialise toute la progression
   */
  const resetAllProgress = async (): Promise<void> => {
    // Toujours mettre à jour en local
    localProgress.resetProgress()

    if (!user.value) return

    try {
      await from('exercise_progress')
        .delete()
        .eq('user_id', userId.value)
    } catch (err) {
      console.error('Reset all progress error:', err)
    }
  }

  // Synchroniser automatiquement au login / chargement de page
  watch(user, async (newUser, oldUser) => {
    if (newUser && !oldUser) {
      // 1. Pousser le localStorage vers Supabase (données locales non synchronisées)
      await syncFromLocalStorage()
      // 2. Tirer Supabase vers localStorage (récupérer code + progression complète)
      await syncFromSupabase()
    }
  }, { immediate: true })

  return {
    // State
    isSyncing,
    syncError,
    hasSyncedFromLocal,
    hasSyncedFromSupabase,

    // Fallback vers localStorage pour les stats (sync)
    stats: localProgress.stats,
    progress: localProgress.progress,

    // Methods async pour Supabase
    syncFromLocalStorage,
    syncFromSupabase,
    loadAllProgress,
    getExerciseStatus,
    getProgress,
    getSavedCode,
    saveCode,
    startExercise,
    completeExercise,
    incrementAttempts,
    getAttempts,
    clearSavedCode,
    resetExercise,
    resetAllProgress,

    // Accès direct au composable local (pour compatibilité)
    local: localProgress
  }
}
