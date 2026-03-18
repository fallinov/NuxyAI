/**
 * Plugin client-side pour gérer l'authentification
 *
 * Gère :
 * - La redirection PASSWORD_RECOVERY (lien valide)
 * - Le fallback via localStorage si l'événement PASSWORD_RECOVERY est raté (race condition)
 * - Les erreurs de lien expiré/invalide (otp_expired, access_denied)
 */
export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()

  let recoveryHandled = false

  // 1. Écouter l'événement PASSWORD_RECOVERY (fonctionne si enregistré avant l'échange du code)
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY' && !recoveryHandled) {
      recoveryHandled = true
      router.replace('/auth/reset-password')
    }
  })

  // 2. Fallback : si un code PKCE est dans l'URL et qu'on a un flag localStorage
  //    (l'événement PASSWORD_RECOVERY peut être raté si @nuxtjs/supabase échange le code avant nous)
  const hasCode = route.query.code
  const pendingRecovery = localStorage.getItem('nuxy_pending_recovery')

  if (hasCode && pendingRecovery) {
    localStorage.removeItem('nuxy_pending_recovery')

    // Attendre que l'utilisateur soit authentifié (le code est en cours d'échange)
    const unwatch = watch(
      () => user.value,
      (newUser) => {
        if (newUser && !recoveryHandled) {
          recoveryHandled = true
          unwatch()
          router.replace('/auth/reset-password')
        }
      },
      { immediate: true }
    )

    // Timeout de sécurité : arrêter le watch après 10s
    setTimeout(() => unwatch(), 10000)
  }

  // 3. Gérer les erreurs dans les query params (lien expiré/invalide)
  const error = route.query.error as string | undefined
  const errorCode = route.query.error_code as string | undefined

  if (error || errorCode) {
    // Nettoyer le flag si présent
    localStorage.removeItem('nuxy_pending_recovery')

    const messages: Record<string, { title: string; description: string }> = {
      otp_expired: {
        title: 'Lien expiré',
        description: 'Ce lien n\'est plus valide. Demande-en un nouveau.'
      },
      access_denied: {
        title: 'Accès refusé',
        description: 'Ce lien n\'est plus valide. Réessaie depuis la page de connexion.'
      }
    }

    const msg = messages[errorCode as string] || messages[error as string] || {
      title: 'Oups, y\'a un souci',
      description: 'Le lien ne fonctionne pas. Réessaie.'
    }

    toast.add({
      title: msg.title,
      description: msg.description,
      color: 'warning',
      timeout: 8000
    })

    router.replace('/auth/forgot-password')
  }
})
