/**
 * Middleware d'authentification
 *
 * Protège les routes qui nécessitent d'être connecté.
 * Redirige vers /auth/login si non authentifié.
 */
export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // Si l'utilisateur n'est pas connecté, rediriger vers login
  if (!user.value) {
    return navigateTo({
      path: '/auth/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
})
