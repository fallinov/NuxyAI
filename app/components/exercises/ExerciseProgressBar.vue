<script setup lang="ts">
/**
 * ExerciseProgressBar - Barre de progression circulaire pour les exercices
 *
 * Affiche visuellement la progression de l'utilisateur avec :
 * - Barre circulaire animée
 * - Pourcentage de complétion
 * - Nombre de critères validés
 * - Badge de réussite
 */

interface Props {
  passedRules: number
  totalRules: number
  attempts?: number
  isCompleted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  attempts: 0,
  isCompleted: false
})

// Calcul du pourcentage de progression
const percentage = computed(() => {
  if (props.totalRules === 0) return 0
  return Math.round((props.passedRules / props.totalRules) * 100)
})

// Taille du cercle SVG
const size = 120
const strokeWidth = 8
const radius = (size - strokeWidth) / 2
const circumference = 2 * Math.PI * radius

// Offset pour l'animation du cercle
const offset = computed(() => {
  return circumference - (percentage.value / 100) * circumference
})

// Couleur selon la progression (palette Nuxy dragon)
const color = computed(() => {
  if (props.isCompleted) return 'text-nuxy-green'
  if (percentage.value >= 66) return 'text-nuxy-teal'
  if (percentage.value >= 33) return 'text-nuxy-gold'
  return 'text-gray-400'
})

const strokeColor = computed(() => {
  if (props.isCompleted) return 'var(--color-nuxy-green)' // Vert dragon
  if (percentage.value >= 66) return 'var(--color-nuxy-teal)' // Teal cornes
  if (percentage.value >= 33) return 'var(--color-nuxy-gold)' // Or yeux
  return '#9ca3af' // gray-400
})
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <!-- SVG Circle Progress -->
      <svg :width="size" :height="size" class="transform -rotate-90">
        <!-- Background circle -->
        <circle
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          stroke="currentColor"
          :stroke-width="strokeWidth"
          class="text-gray-200 dark:text-gray-700"
        />
        <!-- Progress circle -->
        <circle
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          :stroke="strokeColor"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="offset"
          stroke-linecap="round"
          class="transition-all duration-500 ease-out"
        />
      </svg>

      <!-- Content au centre -->
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div :class="['text-3xl font-bold', color]">
          {{ percentage }}%
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {{ passedRules }}/{{ totalRules }}
        </div>
      </div>

      <!-- Badge de réussite -->
      <div
        v-if="isCompleted"
        class="absolute -top-2 -right-2 bg-nuxy-green text-white rounded-full p-2 shadow-lg animate-bounce"
      >
        <UIcon name="i-lucide-circle-check-big" class="w-6 h-6" />
      </div>
    </div>

    <!-- Statistiques -->
    <div class="ml-6 space-y-2">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-clipboard-check" class="w-5 h-5 text-nuxy-teal" />
        <span class="text-sm font-medium">
          {{ passedRules }}/{{ totalRules }} critères validés
        </span>
      </div>

      <div v-if="attempts > 0" class="flex items-center gap-2">
        <UIcon name="i-lucide-refresh-cw" class="w-5 h-5 text-gray-500" />
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ attempts }} tentative{{ attempts > 1 ? 's' : '' }}
        </span>
      </div>

      <div v-if="isCompleted" class="flex items-center gap-2">
        <UIcon name="i-lucide-trophy" class="w-5 h-5 text-nuxy-gold" />
        <span class="text-sm font-semibold text-nuxy-green dark:text-nuxy-green-light">
          Exercice complété !
        </span>
      </div>
    </div>
  </div>
</template>
