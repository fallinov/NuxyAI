/**
 * Composable pour le feedback haptique (vibration)
 *
 * Utilise l'API Vibration sur les appareils compatibles
 * Échoue silencieusement si non supporté
 */

export function useHaptic() {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator

  /**
   * Vibration légère - pour les interactions simples
   */
  const light = () => {
    if (isSupported) {
      navigator.vibrate(10)
    }
  }

  /**
   * Vibration moyenne - pour les confirmations
   */
  const medium = () => {
    if (isSupported) {
      navigator.vibrate(25)
    }
  }

  /**
   * Vibration forte - pour les succès/réussites
   */
  const success = () => {
    if (isSupported) {
      // Pattern: court-pause-court-pause-long
      navigator.vibrate([20, 50, 20, 50, 50])
    }
  }

  /**
   * Vibration d'erreur
   */
  const error = () => {
    if (isSupported) {
      navigator.vibrate([50, 30, 50])
    }
  }

  /**
   * Célébration - pour les achievements
   */
  const celebration = () => {
    if (isSupported) {
      navigator.vibrate([30, 50, 30, 50, 30, 100, 60])
    }
  }

  return {
    isSupported,
    light,
    medium,
    success,
    error,
    celebration
  }
}
