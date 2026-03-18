/**
 * useLessonSupabaseProgress - Gestion de la progression avec Supabase
 *
 * Ce composable étend useLessonProgress pour ajouter la synchronisation Supabase :
 * - Utilisateur connecté → Sync avec Supabase
 * - Utilisateur anonyme → Fallback sur localStorage
 * - Migration automatique localStorage → Supabase au premier login
 */

import type { LessonProgress } from './useLessonProgress'

// Interface commune pour la progression (compatible avec le composable existant)
export interface LessonProgressData {
  slug: string
  status: 'not-started' | 'in-progress' | 'completed'
  completedAt?: string
  attempts: number
  lastAttemptAt?: string
  quizScore?: number
  checklistCompleted?: string[]
}

export const useLessonSupabaseProgress = () => {
  const { from } = useNuxyDb()
  const user = useSupabaseUser()
  const { userId } = useUserId()

  // Utiliser le composable existant pour le localStorage
  const localProgress = useLessonProgress()

  // État de synchronisation
  const isSyncing = ref(false)
  const syncError = ref<string | null>(null)
  const hasSyncedFromLocal = ref(false)
  const hasSyncedFromSupabase = ref(false)

  /**
   * Convertit les données Supabase vers le format local
   */
  const fromDbProgress = (db: Record<string, unknown>): LessonProgressData => ({
    slug: db.lesson_slug as string,
    status: db.status as LessonProgressData['status'],
    completedAt: (db.completed_at as string) || undefined,
    attempts: db.attempts as number,
    lastAttemptAt: (db.last_attempt_at as string) || undefined,
    quizScore: (db.quiz_score as number) ?? undefined,
    checklistCompleted: (db.checklist_completed as string[]) || undefined
  })

  /**
   * Synchronise la progression localStorage vers Supabase (premier login)
   */
  const syncFromLocalStorage = async (): Promise<void> => {
    if (!user.value || hasSyncedFromLocal.value) return

    isSyncing.value = true
    syncError.value = null

    try {
      const localData = localProgress.progress.value.lessons
      const entries = Object.values(localData)

      if (entries.length === 0) {
        hasSyncedFromLocal.value = true
        return
      }

      // Préparer les données pour upsert
      const upsertData = entries.map(entry => ({
        user_id: userId.value!,
        lesson_slug: entry.slug,
        status: entry.status,
        attempts: entry.attempts,
        completed_at: entry.completedAt || null,
        last_attempt_at: entry.lastAttemptAt || null,
        quiz_score: entry.quizScore ?? null,
        checklist_completed: entry.checklistCompleted || null
      }))

      // Upsert en batch
      const { error } = await from('lesson_progress')
        .upsert(upsertData, {
          onConflict: 'user_id,lesson_slug'
        })

      if (error) throw error

      hasSyncedFromLocal.value = true
    } catch (err: unknown) {
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
      const { data, error } = await from('lesson_progress')
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
      const remoteLessons: Record<string, LessonProgress> = {}
      for (const item of data) {
        const converted = fromDbProgress(item)
        remoteLessons[converted.slug] = {
          slug: converted.slug,
          status: converted.status,
          completedAt: converted.completedAt,
          attempts: converted.attempts,
          lastAttemptAt: converted.lastAttemptAt,
          quizScore: converted.quizScore,
          checklistCompleted: converted.checklistCompleted
        }
      }

      // Injecter dans localStorage via le composable local
      localProgress.mergeFromRemote(remoteLessons)

      hasSyncedFromSupabase.value = true
    } catch (err: unknown) {
      syncError.value = 'Erreur lors de la récupération depuis Supabase'
      console.error('Sync from Supabase error:', err)
    } finally {
      isSyncing.value = false
    }
  }

  /**
   * Charge toute la progression depuis Supabase
   */
  const loadAllProgress = async (): Promise<Record<string, LessonProgressData>> => {
    if (!user.value) {
      return localProgress.progress.value.lessons
    }

    try {
      const { data, error } = await from('lesson_progress')
        .select('*')
        .eq('user_id', userId.value)

      if (error) throw error

      const progressMap: Record<string, LessonProgressData> = {}
      for (const item of data) {
        progressMap[(item as Record<string, unknown>).lesson_slug as string] = fromDbProgress(item)
      }

      return progressMap
    } catch (err) {
      console.error('Load progress error:', err)
      return localProgress.progress.value.lessons
    }
  }

  /**
   * Récupère le statut d'une leçon
   */
  const getLessonStatus = async (slug: string): Promise<'not-started' | 'in-progress' | 'completed'> => {
    return localProgress.getLessonStatus(slug)
  }

  /**
   * Récupère la progression complète d'une leçon
   */
  const getProgress = async (slug: string): Promise<LessonProgressData | null> => {
    return localProgress.getLessonProgress(slug)
  }

  /**
   * Marque une leçon comme commencée (seulement si pas déjà complétée)
   */
  const startLesson = async (slug: string): Promise<void> => {
    const currentStatus = localProgress.getLessonStatus(slug)
    if (currentStatus === 'completed') return

    localProgress.startLesson(slug)

    if (!user.value) return

    try {
      const now = new Date().toISOString()

      const { data: existing } = await from('lesson_progress')
        .select('status, attempts')
        .eq('user_id', userId.value)
        .eq('lesson_slug', slug)
        .maybeSingle()

      if (existing?.status === 'completed') return

      await from('lesson_progress')
        .upsert({
          user_id: userId.value,
          lesson_slug: slug,
          status: 'in-progress',
          attempts: existing?.attempts || 1,
          last_attempt_at: now
        }, {
          onConflict: 'user_id,lesson_slug'
        })
    } catch (err) {
      console.error('Start lesson error:', err)
    }
  }

  /**
   * Marque une leçon comme complétée
   */
  const completeLesson = async (slug: string): Promise<void> => {
    localProgress.completeLesson(slug)

    if (!user.value) return

    try {
      const now = new Date().toISOString()

      const { data: existing } = await from('lesson_progress')
        .select('attempts')
        .eq('user_id', userId.value)
        .eq('lesson_slug', slug)
        .maybeSingle()

      await from('lesson_progress')
        .upsert({
          user_id: userId.value,
          lesson_slug: slug,
          status: 'completed',
          completed_at: now,
          last_attempt_at: now,
          attempts: (existing?.attempts || 0) + 1
        }, {
          onConflict: 'user_id,lesson_slug'
        })
    } catch (err) {
      console.error('Complete lesson error:', err)
    }
  }

  /**
   * Incrémente le nombre de tentatives
   */
  const incrementAttempts = async (slug: string): Promise<void> => {
    localProgress.incrementAttempts(slug)

    if (!user.value) return

    try {
      const now = new Date().toISOString()

      const { data: existing } = await from('lesson_progress')
        .select('attempts, status')
        .eq('user_id', userId.value)
        .eq('lesson_slug', slug)
        .maybeSingle()

      await from('lesson_progress')
        .upsert({
          user_id: userId.value,
          lesson_slug: slug,
          status: existing?.status || 'in-progress',
          attempts: (existing?.attempts || 0) + 1,
          last_attempt_at: now
        }, {
          onConflict: 'user_id,lesson_slug'
        })
    } catch (err) {
      console.error('Increment attempts error:', err)
    }
  }

  /**
   * Récupère le nombre de tentatives
   */
  const getAttempts = async (slug: string): Promise<number> => {
    return localProgress.getAttempts(slug)
  }

  /**
   * Sauvegarde le score d'un quiz et synchronise avec Supabase
   */
  const saveQuizScore = async (slug: string, score: number): Promise<void> => {
    localProgress.saveQuizScore(slug, score)

    if (!user.value) return

    try {
      const now = new Date().toISOString()

      const { data: existing } = await from('lesson_progress')
        .select('status, attempts')
        .eq('user_id', userId.value)
        .eq('lesson_slug', slug)
        .maybeSingle()

      await from('lesson_progress')
        .upsert({
          user_id: userId.value,
          lesson_slug: slug,
          status: existing?.status || 'in-progress',
          attempts: existing?.attempts || 1,
          quiz_score: score,
          last_attempt_at: now
        }, {
          onConflict: 'user_id,lesson_slug'
        })
    } catch (err) {
      console.error('Save quiz score error:', err)
    }
  }

  /**
   * Sauvegarde les items cochés d'une checklist et synchronise avec Supabase
   */
  const saveChecklist = async (slug: string, completedIds: string[]): Promise<void> => {
    localProgress.saveChecklist(slug, completedIds)

    if (!user.value) return

    try {
      const { data: existing } = await from('lesson_progress')
        .select('status, attempts')
        .eq('user_id', userId.value)
        .eq('lesson_slug', slug)
        .maybeSingle()

      await from('lesson_progress')
        .upsert({
          user_id: userId.value,
          lesson_slug: slug,
          status: existing?.status || 'in-progress',
          attempts: existing?.attempts || 0,
          checklist_completed: completedIds
        }, {
          onConflict: 'user_id,lesson_slug'
        })
    } catch (err) {
      console.error('Save checklist error:', err)
    }
  }

  /**
   * Réinitialise une leçon
   */
  const resetLesson = async (slug: string): Promise<void> => {
    localProgress.resetLesson(slug)

    if (!user.value) return

    try {
      await from('lesson_progress')
        .delete()
        .eq('user_id', userId.value)
        .eq('lesson_slug', slug)
    } catch (err) {
      console.error('Reset lesson error:', err)
    }
  }

  /**
   * Réinitialise toute la progression
   */
  const resetAllProgress = async (): Promise<void> => {
    localProgress.resetProgress()

    if (!user.value) return

    try {
      await from('lesson_progress')
        .delete()
        .eq('user_id', userId.value)
    } catch (err) {
      console.error('Reset all progress error:', err)
    }
  }

  // Synchroniser automatiquement au login / chargement de page
  watch(user, async (newUser, oldUser) => {
    if (newUser && !oldUser) {
      await syncFromLocalStorage()
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
    getLessonStatus,
    getProgress,
    startLesson,
    completeLesson,
    incrementAttempts,
    getAttempts,
    saveQuizScore,
    saveChecklist,
    resetLesson,
    resetAllProgress,

    // Accès direct au composable local (pour compatibilité)
    local: localProgress
  }
}
