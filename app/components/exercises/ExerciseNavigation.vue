<script setup lang="ts">
/**
 * Navigation entre exercices
 * Utilise UButton et UProgress de Nuxt UI
 */

import { useExercisesList } from '~/composables/useExerciseData'

const props = withDefaults(
  defineProps<{
    currentSlug: string
    compact?: boolean
    allowNext?: boolean
  }>(),
  {
    compact: false,
    allowNext: true
  }
)

// Utiliser l'état partagé des exercices
const { exercises, loadExercises, getNextExercise, getPreviousExercise, getExerciseProgress } = useExercisesList()

// Charger les exercices au montage (si pas déjà chargés)
onMounted(async () => {
  await loadExercises()
})

// Navigation
const nextExercise = computed(() => {
  if (!exercises.value) return null
  return getNextExercise(exercises.value, props.currentSlug)
})
const previousExercise = computed(() => {
  if (!exercises.value) return null
  return getPreviousExercise(exercises.value, props.currentSlug)
})

// Progression
const progress = computed(() => {
  if (!exercises.value) return { current: 0, total: 0 }
  return getExerciseProgress(exercises.value, props.currentSlug)
})
const progressPercentage = computed(() => {
  if (progress.value.total === 0) return 0
  return (progress.value.current / progress.value.total) * 100
})
</script>

<template>
  <!-- Mode compact (pour le header) -->
  <div v-if="compact" class="flex items-center gap-2">
    <UButton
      v-if="previousExercise"
      :to="previousExercise.path"
      color="neutral"
      variant="ghost"
      size="sm"
      icon="i-lucide-chevron-left"
      :title="previousExercise.title"
    />
    <UButton
      v-if="nextExercise"
      :to="allowNext ? nextExercise.path : undefined"
      color="neutral"
      variant="ghost"
      size="sm"
      icon="i-lucide-chevron-right"
      trailing
      :title="allowNext ? nextExercise.title : 'Terminez cet exercice pour continuer'"
      :disabled="!allowNext"
    />
  </div>

  <!-- Mode normal (pleine largeur) -->
  <div v-else class="border-t border-gray-200 dark:border-gray-800 pt-6 mt-8">
    <div class="flex items-center justify-between">
      <!-- Bouton Précédent -->
      <div class="flex-1">
        <UButton
          v-if="previousExercise"
          :to="previousExercise.path"
          color="neutral"
          variant="outline"
          size="lg"
          icon="i-lucide-arrow-left"
          :ui="{ base: 'text-left' }"
        >
          <div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Précédent</div>
            <div class="font-medium">{{ previousExercise.title }}</div>
          </div>
        </UButton>
      </div>

      <!-- Indicateur de progression -->
      <div class="flex-shrink-0 px-4 text-center">
        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
          {{ progress.current }} / {{ progress.total }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Exercices
        </div>
      </div>

      <!-- Bouton Suivant -->
      <div class="flex-1 flex justify-end">
        <!-- Bouton désactivé (exercice non terminé) -->
        <UButton
          v-if="nextExercise && !allowNext"
          disabled
          color="neutral"
          variant="soft"
          size="lg"
          trailing-icon="i-lucide-lock"
          title="Terminez cet exercice pour continuer"
          :ui="{ base: 'text-right cursor-not-allowed' }"
        >
          <div>
            <div class="text-xs">Suivant</div>
            <div class="font-medium">{{ nextExercise.title }}</div>
          </div>
        </UButton>

        <!-- Bouton suivant actif -->
        <UButton
          v-else-if="nextExercise"
          :to="nextExercise.path"
          color="primary"
          variant="solid"
          size="lg"
          trailing-icon="i-lucide-arrow-right"
          :ui="{ base: 'text-right' }"
        >
          <div>
            <div class="text-xs text-white/80">Suivant</div>
            <div class="font-medium">{{ nextExercise.title }}</div>
          </div>
        </UButton>

        <!-- Bouton retour accueil (dernier exercice) -->
        <UButton
          v-else
          to="/"
          color="primary"
          variant="solid"
          size="lg"
          trailing-icon="i-lucide-home"
          :ui="{ base: 'text-right' }"
        >
          <div>
            <div class="text-xs text-white/80">Terminé !</div>
            <div class="font-medium">Retour à l'accueil</div>
          </div>
        </UButton>
      </div>
    </div>

    <!-- Barre de progression avec UProgress -->
    <div class="mt-6">
      <UProgress
        :model-value="progressPercentage"
        color="primary"
        size="sm"
        :ui="{ indicator: 'bg-nuxy-green' }"
      />
    </div>
  </div>
</template>
