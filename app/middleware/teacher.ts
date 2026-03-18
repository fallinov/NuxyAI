/**
 * Middleware pour les routes réservées aux enseignants
 *
 * Vérifie que l'utilisateur est :
 * 1. Connecté
 * 2. A le rôle "teacher"
 * 3. Est approuvé (is_approved = true)
 *
 * Redirige vers /auth/pending si en attente d'approbation.
 * Redirige vers la page d'accueil si pas enseignant.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const { from } = useNuxyDb()
  const { userId, isAuthenticated } = useUserId()

  // Si l'utilisateur n'est pas connecté, rediriger vers login
  if (!isAuthenticated.value) {
    return navigateTo({
      path: '/auth/login',
      query: {
        redirect: to.fullPath
      }
    })
  }

  if (!userId.value) {
    return navigateTo('/')
  }

  // Vérifier le rôle et l'approbation dans le profil (schéma nuxy)
  try {
    const { data: profile, error } = await from('profiles')
      .select('role, is_approved')
      .eq('id', userId.value)
      .single()

    if (error || !profile) {
      console.error('Erreur lors de la vérification du rôle:', error)
      return navigateTo('/')
    }

    // Rediriger si pas enseignant
    if (profile.role !== 'teacher') {
      return navigateTo('/')
    }

    // Rediriger si enseignant non approuvé
    if (!profile.is_approved) {
      return navigateTo('/auth/pending')
    }
  } catch (err) {
    console.error('Erreur middleware teacher:', err)
    return navigateTo('/')
  }
})
