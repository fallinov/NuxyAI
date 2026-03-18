<script setup lang="ts">
/**
 * Composant Pull-to-Refresh
 *
 * Affiche l'indicateur de refresh en haut de la page
 */

const props = defineProps<{
  isRefreshing: boolean
  pullDistance: number
  pullProgress: number
}>()

// Rotation de l'icône basée sur la progression
const iconRotation = computed(() => {
  return props.pullProgress * 3.6 // 360° à 100%
})

// Opacité basée sur la distance
const opacity = computed(() => {
  return Math.min(props.pullDistance / 40, 1)
})
</script>

<template>
  <div
    class="fixed top-16 left-0 right-0 z-30 flex justify-center pointer-events-none transition-transform duration-200"
    :style="{ transform: `translateY(${Math.max(props.pullDistance - 20, 0)}px)` }"
  >
    <div
      class="flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-opacity duration-150"
      :style="{ opacity }"
    >
      <!-- Spinner pendant le refresh -->
      <UIcon
        v-if="isRefreshing"
        name="i-lucide-loader-2"
        class="w-5 h-5 text-nuxy-green animate-spin"
      />
      <!-- Flèche pendant le pull -->
      <UIcon
        v-else
        name="i-lucide-arrow-down"
        class="w-5 h-5 text-nuxy-green transition-transform duration-100"
        :style="{ transform: `rotate(${iconRotation}deg)` }"
      />
    </div>
  </div>
</template>
