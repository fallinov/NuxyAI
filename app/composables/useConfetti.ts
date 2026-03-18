/**
 * Composable pour les animations de confettis
 *
 * Utilise canvas-confetti pour les célébrations
 */

import confetti from 'canvas-confetti'

// Type pour les options de confetti
interface ConfettiOptions {
  particleCount?: number
  spread?: number
  startVelocity?: number
  decay?: number
  scalar?: number
  origin?: { x?: number; y?: number }
  colors?: string[]
  shapes?: string[]
  ticks?: number
  gravity?: number
  angle?: number
}

export function useConfetti() {
  /**
   * Confettis standard - pour les petits succès
   */
  const fire = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  /**
   * Confettis depuis les côtés - pour les gros succès
   */
  const fireworks = () => {
    const duration = 2000
    const end = Date.now() + duration

    const colors = ['#60B155', '#33A6A6', '#FFD966', '#D45E95']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  /**
   * Explosion de confettis - pour les modules complétés
   */
  const moduleComplete = () => {
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#60B155', '#33A6A6', '#FFD966', '#561E46', '#D45E95']
    }

    function fire(particleRatio: number, opts: ConfettiOptions) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    })
    fire(0.2, {
      spread: 60
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    })
  }

  /**
   * Étoiles - pour les achievements
   */
  const stars = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FFD966', '#FFC107', '#FFE082']
    }

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ['star']
      })

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: 0.75,
        shapes: ['circle']
      })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
  }

  /**
   * Confettis subtils - pour les exercices complétés
   */
  const subtle = () => {
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#60B155', '#ACDC7E'],
      ticks: 150,
      gravity: 1.2
    })
  }

  return {
    fire,
    fireworks,
    moduleComplete,
    stars,
    subtle
  }
}
