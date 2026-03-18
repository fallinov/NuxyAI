/**
 * useAuth - Composable pour l'authentification Supabase
 *
 * Fonctionnalités :
 * - Connexion / Déconnexion
 * - Inscription avec choix du rôle (élève/enseignant)
 * - Réinitialisation du mot de passe
 * - Vérification du rôle utilisateur
 */

import type { Profile, UserRole } from '~/types/database.types'

export interface AuthError {
  message: string
  code?: string
}

export const useAuth = () => {
  const { from, client: supabase } = useNuxyDb()
  const user = useSupabaseUser()
  const { userId } = useUserId()

  // État local
  const isLoading = ref(false)
  const error = ref<AuthError | null>(null)

  // Profil utilisateur (chargé depuis la table profiles)
  const profile = useState<Profile | null>('auth-profile', () => null)

  /**
   * Charge le profil utilisateur depuis Supabase
   */
  const loadProfile = async () => {
    const currentUserId = userId.value

    // Vérifier que l'utilisateur ET son id sont disponibles
    if (!currentUserId) {
      profile.value = null
      return null
    }

    try {
      const { data, error: fetchError } = await from('profiles')
        .select('*')
        .eq('id', currentUserId)
        .single()

      if (fetchError) throw fetchError

      profile.value = data as Profile
      return profile.value
    } catch (err: any) {
      console.error('Erreur lors du chargement du profil:', err)
      return null
    }
  }

  /**
   * Connexion avec email et mot de passe
   */
  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (loginError) {
        error.value = {
          message: translateAuthError(loginError.message),
          code: loginError.code
        }
        return { success: false, error: error.value }
      }

      // Charger le profil après connexion
      await loadProfile()

      return { success: true, data }
    } catch (err: any) {
      error.value = { message: 'Une erreur inattendue est survenue' }
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Inscription avec email, mot de passe et rôle
   */
  const register = async (
    email: string,
    password: string,
    fullName: string,
    role: UserRole = 'student'
  ) => {
    isLoading.value = true
    error.value = null

    try {
      const { data, error: registerError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      })

      if (registerError) {
        error.value = {
          message: translateAuthError(registerError.message),
          code: registerError.code
        }
        return { success: false, error: error.value }
      }

      // Supabase Auth ne retourne pas d'erreur pour un email existant (sécurité)
      // On détecte ce cas en vérifiant si identities est vide
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        error.value = {
          message: 'Un compte existe déjà avec cet email',
          code: 'user_already_exists'
        }
        return { success: false, error: error.value }
      }

      // Note: Le profil est créé automatiquement via le trigger Supabase
      // Attendre un peu puis charger le profil
      await new Promise(resolve => setTimeout(resolve, 500))
      await loadProfile()

      return { success: true, data }
    } catch (err: any) {
      error.value = { message: 'Une erreur inattendue est survenue' }
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Déconnexion
   * Note: On utilise scope: 'local' pour éviter l'erreur 403 quand la session
   * est déjà invalide côté serveur. Cela nettoie les tokens côté client.
   */
  const logout = async () => {
    isLoading.value = true
    error.value = null

    try {
      // Utiliser scope 'local' pour éviter les erreurs 403 si la session est déjà expirée
      const { error: logoutError } = await supabase.auth.signOut({ scope: 'local' })

      // Même si une erreur survient, on considère le logout comme réussi côté client
      // car l'utilisateur veut être déconnecté localement
      if (logoutError) {
        console.warn('Erreur de déconnexion (ignorée):', logoutError.message)
      }

      profile.value = null

      // Vider le localStorage (données safe dans Supabase)
      const { resetProgress } = useLessonProgress()
      resetProgress()

      return { success: true }
    } catch (err: any) {
      // Même en cas d'erreur, nettoyer le profil local
      profile.value = null
      console.warn('Erreur inattendue lors de la déconnexion:', err)
      return { success: true } // On considère le logout comme réussi
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Réinitialisation du mot de passe
   */
  const resetPassword = async (email: string) => {
    isLoading.value = true
    error.value = null

    try {
      // Flag localStorage pour détecter le recovery côté client
      // (l'événement PASSWORD_RECOVERY peut être raté à cause d'une race condition)
      localStorage.setItem('nuxy_pending_recovery', 'true')

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`
      })

      if (resetError) {
        localStorage.removeItem('nuxy_pending_recovery')
        error.value = {
          message: translateAuthError(resetError.message),
          code: resetError.code
        }
        return { success: false, error: error.value }
      }

      return { success: true }
    } catch (err: any) {
      localStorage.removeItem('nuxy_pending_recovery')
      error.value = { message: 'Une erreur inattendue est survenue' }
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Mise à jour du mot de passe (après reset)
   */
  const updatePassword = async (newPassword: string) => {
    isLoading.value = true
    error.value = null

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (updateError) {
        error.value = {
          message: translateAuthError(updateError.message),
          code: updateError.code
        }
        return { success: false, error: error.value }
      }

      return { success: true }
    } catch (err: any) {
      error.value = { message: 'Une erreur inattendue est survenue' }
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties pour les rôles
  const isAuthenticated = computed(() => !!user.value)
  const isTeacher = computed(() => profile.value?.role === 'teacher')
  const isStudent = computed(() => profile.value?.role === 'student')

  // Charger le profil automatiquement quand l'id utilisateur devient disponible
  watch(
    () => userId.value,
    async (newId) => {
      if (newId) {
        await loadProfile()
      } else {
        profile.value = null
      }
    },
    { immediate: true }
  )

  return {
    // State
    user,
    profile,
    isLoading,
    error,

    // Computed
    isAuthenticated,
    isTeacher,
    isStudent,

    // Methods
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    loadProfile
  }
}

/**
 * Traduit les messages d'erreur Supabase en français
 */
function translateAuthError(message: string): string {
  const translations: Record<string, string> = {
    'Invalid login credentials': 'Email ou mot de passe incorrect',
    'Email not confirmed': 'Confirme ton email avant de te connecter',
    'User already registered': 'Un compte existe déjà avec cet email',
    'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères',
    'Unable to validate email address: invalid format': 'Format d\'email invalide',
    'Signup requires a valid password': 'Un mot de passe valide est requis',
    'Email rate limit exceeded': 'Trop de tentatives, réessaie plus tard',
    'For security purposes, you can only request this once every 60 seconds': 'Pour des raisons de sécurité, attends 60 secondes avant de réessayer'
  }

  return translations[message] || message
}
