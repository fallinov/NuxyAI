/**
 * useProfile - Composable pour la gestion du profil utilisateur
 *
 * Fonctionnalités :
 * - Lecture et mise à jour du profil
 * - Gestion de l'avatar
 * - Récupération des classes rejointes (pour les élèves)
 */

import type { Profile, UpdateProfileInput, ClassMemberWithClass } from '~/types/database.types'

export const useProfile = () => {
  const { from, client: supabase } = useNuxyDb()
  const { userId } = useUserId()

  // État local
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Profil partagé avec useAuth
  const profile = useState<Profile | null>('auth-profile', () => null)

  // Classes rejointes par l'utilisateur (pour les élèves)
  const myClasses = ref<ClassMemberWithClass[]>([])

  /**
   * Charge le profil utilisateur
   */
  const loadProfile = async (): Promise<Profile | null> => {
    // Vérifier que l'utilisateur ET son id sont disponibles
    if (!userId.value) return null

    isLoading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await from('profiles')
        .select('*')
        .eq('id', userId.value)
        .single()

      if (fetchError) throw fetchError

      profile.value = data as Profile
      return profile.value
    } catch (err: any) {
      error.value = 'Erreur lors du chargement du profil'
      console.error(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Met à jour le profil utilisateur
   */
  const updateProfile = async (updates: UpdateProfileInput): Promise<Profile | null> => {
    if (!userId.value) {
      error.value = 'Tu dois être connecté pour modifier ton profil'
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      const { data, error: updateError } = await from('profiles')
        .update(updates)
        .eq('id', userId.value)
        .select()
        .single()

      if (updateError) throw updateError

      profile.value = data as Profile
      return profile.value
    } catch (err: any) {
      error.value = 'Erreur lors de la mise à jour du profil'
      console.error(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Charge les classes auxquelles l'utilisateur appartient
   */
  const loadMyClasses = async (): Promise<ClassMemberWithClass[]> => {
    // Vérifier que l'utilisateur ET son id sont disponibles
    if (!userId.value) return []

    isLoading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await from('class_members')
        .select(`
          *,
          class:classes(*)
        `)
        .eq('student_id', userId.value)

      if (fetchError) throw fetchError

      myClasses.value = data as ClassMemberWithClass[]
      return myClasses.value
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des classes'
      console.error(err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Quitte une classe (pour les élèves)
   */
  const leaveClass = async (classId: string): Promise<boolean> => {
    if (!userId.value) {
      error.value = 'Tu dois être connecté'
      return false
    }

    isLoading.value = true
    error.value = null

    try {
      const { error: deleteError } = await from('class_members')
        .delete()
        .eq('class_id', classId)
        .eq('student_id', userId.value)

      if (deleteError) throw deleteError

      // Mettre à jour la liste locale
      myClasses.value = myClasses.value.filter(m => m.class_id !== classId)

      return true
    } catch (err: any) {
      error.value = 'Erreur lors de la sortie de la classe'
      console.error(err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Rejoindre une classe via code d'invitation
   */
  const joinClassByCode = async (code: string): Promise<string | null> => {
    if (!userId.value) {
      error.value = 'Tu dois être connecté pour rejoindre une classe'
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      // Appel RPC (fonction wrapper dans public)
      const { data, error: joinError } = await supabase
        .rpc('join_class_by_code', { code })

      if (joinError) {
        // Traduire les erreurs courantes
        if (joinError.message.includes('invalide')) {
          error.value = 'Code d\'invitation invalide ou classe inactive'
        } else if (joinError.message.includes('déjà membre')) {
          error.value = 'Tu es déjà membre de cette classe'
        } else if (joinError.message.includes('propre classe')) {
          error.value = 'Tu ne peux pas rejoindre ta propre classe'
        } else {
          error.value = joinError.message
        }
        return null
      }

      // Recharger la liste des classes
      await loadMyClasses()

      return data as string
    } catch (err: any) {
      error.value = 'Erreur lors de l\'inscription à la classe'
      console.error(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Upload d'avatar (optionnel - nécessite Supabase Storage)
   */
  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!userId.value) {
      error.value = 'Tu dois être connecté'
      return null
    }

    isLoading.value = true
    error.value = null

    try {
      // Générer un nom de fichier unique
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId.value}/avatar.${fileExt}`

      // Upload vers Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      // Obtenir l'URL publique
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      // Mettre à jour le profil avec l'URL de l'avatar
      await updateProfile({ avatar_url: publicUrl })

      return publicUrl
    } catch (err: any) {
      error.value = 'Erreur lors de l\'upload de l\'avatar'
      console.error(err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    profile,
    myClasses,
    isLoading,
    error,

    // Methods
    loadProfile,
    updateProfile,
    loadMyClasses,
    leaveClass,
    joinClassByCode,
    uploadAvatar
  }
}
