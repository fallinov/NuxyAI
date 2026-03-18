/**
 * useUserId - Composable centralisé pour obtenir l'ID utilisateur
 *
 * Le module @nuxtjs/supabase retourne le payload JWT où l'ID
 * peut être dans `id` ou `sub` selon le contexte.
 * Ce composable centralise cette logique pour éviter la duplication.
 */

export const useUserId = () => {
  const user = useSupabaseUser()

  /**
   * Retourne l'ID de l'utilisateur connecté ou null
   */
  const userId = computed(() => {
    if (!user.value) return null
    return user.value.id ?? (user.value as any)?.sub ?? null
  })

  /**
   * Vérifie si un utilisateur est connecté
   */
  const isAuthenticated = computed(() => !!userId.value)

  return {
    userId,
    isAuthenticated
  }
}
