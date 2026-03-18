/**
 * Middleware pour les routes réservées aux invités (non connectés)
 *
 * Redirige vers la page d'accueil si l'utilisateur est déjà connecté.
 * Utile pour les pages de login/register.
 */
export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // Si l'utilisateur est déjà connecté, rediriger vers la page demandée ou l'accueil
  if (user.value) {
    const redirect = to.query.redirect as string
    return navigateTo(redirect || '/')
  }
})
