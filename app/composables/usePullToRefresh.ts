/**
 * Composable pour le Pull-to-Refresh
 *
 * Permet de rafraîchir le contenu en tirant vers le bas
 * Inspiré du comportement natif iOS/Android
 */

interface PullToRefreshOptions {
  threshold?: number // Distance minimale pour déclencher (px)
  onRefresh: () => Promise<void> // Callback de refresh
}

export function usePullToRefresh(options: PullToRefreshOptions) {
  const { threshold = 80, onRefresh } = options

  const isRefreshing = ref(false)
  const pullDistance = ref(0)
  const isPulling = ref(false)

  let startY = 0
  let currentY = 0

  const canPull = () => {
    // Ne peut pull que si on est tout en haut de la page
    return window.scrollY <= 0
  }

  const handleTouchStart = (e: TouchEvent) => {
    if (!canPull() || isRefreshing.value) return
    startY = e.touches[0].clientY
    isPulling.value = true
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling.value || isRefreshing.value) return
    if (!canPull()) {
      pullDistance.value = 0
      return
    }

    currentY = e.touches[0].clientY
    const diff = currentY - startY

    if (diff > 0) {
      // Résistance pour un effet plus naturel
      pullDistance.value = Math.min(diff * 0.5, threshold * 1.5)

      // Empêcher le scroll natif pendant le pull
      if (pullDistance.value > 10) {
        e.preventDefault()
      }
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling.value) return
    isPulling.value = false

    if (pullDistance.value >= threshold && !isRefreshing.value) {
      isRefreshing.value = true
      pullDistance.value = threshold * 0.6 // Garder un peu visible pendant le refresh

      try {
        await onRefresh()
      } finally {
        isRefreshing.value = false
        pullDistance.value = 0
      }
    } else {
      pullDistance.value = 0
    }
  }

  // Progression du pull (0-100%)
  const pullProgress = computed(() => {
    return Math.min((pullDistance.value / threshold) * 100, 100)
  })

  // Monter les listeners
  const mount = () => {
    if (typeof window === 'undefined') return

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
  }

  // Démonter les listeners
  const unmount = () => {
    if (typeof window === 'undefined') return

    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  // Auto-mount/unmount
  onMounted(mount)
  onUnmounted(unmount)

  return {
    isRefreshing,
    pullDistance,
    pullProgress,
    isPulling
  }
}
