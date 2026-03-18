/**
 * useClasses - Composable pour la gestion des classes (enseignants)
 *
 * Fonctionnalités :
 * - CRUD des classes
 * - Gestion des élèves membres
 * - Statistiques et progression
 * - Régénération des codes d'invitation
 * - Abonnement temps réel pour le dashboard
 */

import type {
  Class,
  ClassWithMembers,
  ClassMemberWithStudent,
  CreateClassInput,
  UpdateClassInput,
  ClassStatistics,
  LessonProgress,
  Profile
} from '~/types/database.types'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface StudentProgressData extends Profile {
  progress: LessonProgress[]
}

export const useClasses = () => {
  const { from, channel, removeChannel, schema, client: supabase } = useNuxyDb()
  const user = useSupabaseUser()
  const { userId } = useUserId()

  // État local
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Liste des classes de l'enseignant
  const classes = ref<Class[]>([])

  // Classe actuellement sélectionnée (pour le détail)
  const currentClass = ref<ClassWithMembers | null>(null)

  // Channel Realtime pour les mises à jour
  let realtimeChannel: RealtimeChannel | null = null

  /**
   * Charge toutes les classes de l'enseignant
   */
  const loadClasses = async (): Promise<Class[]> => {
    if (!user.value) return []

    isLoading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await from('classes')
        .select('*')
        .eq('teacher_id', userId.value)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      classes.value = data as Class[]
      return classes.value
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des classes'
      console.error(err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Charge une classe avec ses membres
   */
  const loadClassWithMembers = async (classId: string): Promise<ClassWithMembers | null> => {
    if (!user.value) return null

    isLoading.value = true
    error.value = null

    try {
      // Charger la classe
      const { data: classData, error: classError } = await from('classes')
        .select('*')
        .eq('id', classId)
        .eq('teacher_id', userId.value)
        .single()

      if (classError) throw classError

      // Charger les membres avec leurs profils
      const { data: membersData, error: membersError } = await from('class_members')
        .select(`
          *,
          student:profiles(*)
        `)
        .eq('class_id', classId)

      if (membersError) throw membersError

      const classWithMembers: ClassWithMembers = {
        ...classData as Class,
        members: membersData as ClassMemberWithStudent[],
        student_count: membersData.length
      }

      currentClass.value = classWithMembers
      return classWithMembers
    } catch (err: any) {
      error.value = 'Erreur lors du chargement de la classe'
      console.error(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Crée une nouvelle classe
   */
  const createClass = async (input: CreateClassInput): Promise<Class | null> => {
    if (!user.value) {
      error.value = 'Tu dois être connecté'
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      const { data, error: createError } = await from('classes')
        .insert({
          ...input,
          teacher_id: userId.value
        })
        .select()
        .single()

      if (createError) throw createError

      const newClass = data as Class
      classes.value = [newClass, ...classes.value]

      return newClass
    } catch (err: any) {
      error.value = 'Erreur lors de la création de la classe'
      console.error(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Met à jour une classe
   */
  const updateClass = async (classId: string, updates: UpdateClassInput): Promise<Class | null> => {
    if (!user.value) {
      error.value = 'Tu dois être connecté'
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await from('classes')
        .update(updates)
        .eq('id', classId)
        .eq('teacher_id', userId.value)
        .select()
        .single()

      if (updateError) throw updateError

      const updatedClass = data as Class

      // Mettre à jour la liste locale
      const index = classes.value.findIndex(c => c.id === classId)
      if (index !== -1) {
        classes.value[index] = updatedClass
      }

      // Mettre à jour currentClass si c'est la même
      if (currentClass.value?.id === classId) {
        currentClass.value = { ...currentClass.value, ...updatedClass }
      }

      return updatedClass
    } catch (err: any) {
      error.value = 'Erreur lors de la mise à jour de la classe'
      console.error(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Supprime une classe
   */
  const deleteClass = async (classId: string): Promise<boolean> => {
    if (!user.value) {
      error.value = 'Tu dois être connecté'
      return false
    }

    isLoading.value = true
    error.value = null

    try {
      const { error: deleteError } = await from('classes')
        .delete()
        .eq('id', classId)
        .eq('teacher_id', userId.value)

      if (deleteError) throw deleteError

      // Mettre à jour la liste locale
      classes.value = classes.value.filter(c => c.id !== classId)

      // Réinitialiser currentClass si c'est la classe supprimée
      if (currentClass.value?.id === classId) {
        currentClass.value = null
      }

      return true
    } catch (err: any) {
      error.value = 'Erreur lors de la suppression de la classe'
      console.error(err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Régénère le code d'invitation
   */
  const regenerateInviteCode = async (classId: string): Promise<string | null> => {
    if (!user.value) {
      error.value = 'Tu dois être connecté'
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      // Appel RPC (fonction wrapper dans public)
      const { data, error: rpcError } = await supabase
        .rpc('regenerate_invite_code', { class_uuid: classId })

      if (rpcError) throw rpcError

      const newCode = data as string

      // Mettre à jour la liste locale
      const index = classes.value.findIndex(c => c.id === classId)
      if (index !== -1) {
        classes.value[index].invite_code = newCode
      }

      // Mettre à jour currentClass si c'est la même
      if (currentClass.value?.id === classId) {
        currentClass.value.invite_code = newCode
      }

      return newCode
    } catch (err: any) {
      error.value = 'Erreur lors de la régénération du code'
      console.error(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Retire un élève d'une classe
   */
  const removeStudent = async (classId: string, studentId: string): Promise<boolean> => {
    if (!user.value) {
      error.value = 'Tu dois être connecté'
      return false
    }

    isLoading.value = true
    error.value = null

    try {
      const { error: deleteError } = await from('class_members')
        .delete()
        .eq('class_id', classId)
        .eq('student_id', studentId)

      if (deleteError) throw deleteError

      // Mettre à jour currentClass si c'est la même
      if (currentClass.value?.id === classId) {
        currentClass.value.members = currentClass.value.members.filter(
          m => m.student_id !== studentId
        )
        currentClass.value.student_count--
      }

      return true
    } catch (err: any) {
      error.value = 'Erreur lors de la suppression de l\'élève'
      console.error(err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Charge les statistiques d'une classe
   */
  const getClassStatistics = async (classId: string): Promise<ClassStatistics | null> => {
    if (!user.value) return null

    try {
      // Appel RPC (fonction wrapper dans public)
      const { data, error: rpcError } = await supabase
        .rpc('get_class_statistics', { class_uuid: classId })

      if (rpcError) throw rpcError

      return data as ClassStatistics
    } catch (err: any) {
      console.error('Erreur lors du chargement des statistiques:', err)
      return null
    }
  }

  /**
   * Charge la progression de tous les élèves d'une classe
   */
  const getClassProgress = async (classId: string): Promise<StudentProgressData[]> => {
    if (!user.value) return []

    isLoading.value = true
    error.value = null

    try {
      // D'abord, obtenir les IDs des étudiants de la classe
      const { data: members, error: membersError } = await from('class_members')
        .select('student_id')
        .eq('class_id', classId)

      if (membersError) throw membersError

      const studentIds = members.map(m => m.student_id)

      if (studentIds.length === 0) return []

      // Charger les profils avec leur progression
      const { data: profiles, error: profilesError } = await from('profiles')
        .select('*')
        .in('id', studentIds)

      if (profilesError) throw profilesError

      // Charger la progression de tous ces étudiants
      const { data: progress, error: progressError } = await from('lesson_progress')
        .select('*')
        .in('user_id', studentIds)

      if (progressError) throw progressError

      // Assembler les données
      const studentsWithProgress: StudentProgressData[] = profiles.map(profile => ({
        ...profile as Profile,
        progress: (progress as LessonProgress[]).filter(p => p.user_id === profile.id)
      }))

      return studentsWithProgress
    } catch (err: any) {
      error.value = 'Erreur lors du chargement de la progression'
      console.error(err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  /**
   * S'abonne aux mises à jour temps réel de la progression
   */
  const subscribeToProgress = (classId: string, callback: (payload: any) => void) => {
    // D'abord nettoyer l'ancien channel
    unsubscribeFromProgress()

    // Créer un nouveau channel avec le schéma nuxy
    realtimeChannel = channel(`class-progress-${classId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: schema, // Utilise le schéma 'nuxy'
          table: 'lesson_progress'
        },
        (payload) => {
          callback(payload)
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: schema, // Utilise le schéma 'nuxy'
          table: 'class_members',
          filter: `class_id=eq.${classId}`
        },
        (payload) => {
          callback(payload)
        }
      )
      .subscribe()
  }

  /**
   * Se désabonne des mises à jour temps réel
   */
  const unsubscribeFromProgress = () => {
    if (realtimeChannel) {
      removeChannel(realtimeChannel)
      realtimeChannel = null
    }
  }

  /**
   * Génère l'URL d'invitation pour une classe
   */
  const getInviteUrl = (inviteCode: string): string => {
    if (typeof window === 'undefined') return ''
    return `${window.location.origin}/join/${inviteCode}`
  }

  // Cleanup au démontage
  onUnmounted(() => {
    unsubscribeFromProgress()
  })

  return {
    // State
    classes,
    currentClass,
    isLoading,
    error,

    // Methods
    loadClasses,
    loadClassWithMembers,
    createClass,
    updateClass,
    deleteClass,
    regenerateInviteCode,
    removeStudent,
    getClassStatistics,
    getClassProgress,
    subscribeToProgress,
    unsubscribeFromProgress,
    getInviteUrl
  }
}
