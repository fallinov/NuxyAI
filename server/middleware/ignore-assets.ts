/**
 * Middleware pour ignorer les requêtes vers des chemins d'assets
 * qui ne devraient pas passer par Vue Router.
 *
 * Contourne le bug où /_nuxt/ et /sw.js génèrent des erreurs.
 */
export default defineEventHandler((event) => {
  const path = event.path

  // Ignorer les requêtes vers /_nuxt/ (assets Vite)
  if (path.startsWith('/_nuxt/')) {
    // Retourner une réponse vide silencieusement
    setResponseStatus(event, 404)
    return ''
  }

  // Ignorer les requêtes vers sw.js (service worker inexistant)
  if (path.includes('/sw.js')) {
    setResponseStatus(event, 404)
    return ''
  }
})
