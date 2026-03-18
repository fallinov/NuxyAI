<script setup lang="ts">
/**
 * ExerciseFooter - Footer pour les exercices (style Codecademy)
 *
 * Affiche :
 * - Gauche : Contexte du module + Pagination "Exercice X sur Y"
 * - Droite : Boutons de navigation (Précédent / Suivant)
 */

import { useExercisesList } from '~/composables/useExerciseData'

const props = defineProps<{
  currentSlug: string
  allowNext?: boolean
}>()

// Utiliser l'état partagé des exercices
const { exercises, modules, loadExercises, getNextExercise, getPreviousExercise, getExerciseBySlug } = useExercisesList()

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

// Exercice actuel
const currentExercise = computed(() => {
  if (!exercises.value) return undefined
  return getExerciseBySlug(exercises.value, props.currentSlug)
})

// Module actuel
const currentModule = computed(() => {
  if (!currentExercise.value) return null
  return modules.find(m => m.id === currentExercise.value?.moduleId)
})

// Détecter si l'exercice actuel est une intro
const isIntro = computed(() => currentExercise.value?.exerciseType === 'intro')

// Pagination (hors intros)
const realExercises = computed(() => exercises.value?.filter(ex => ex.exerciseType !== 'intro') || [])

const currentExerciseIndex = computed(() => {
  if (!realExercises.value.length) return -1
  return realExercises.value.findIndex(ex => ex.id === props.currentSlug)
})

const currentNumber = computed(() => currentExerciseIndex.value + 1)
const totalExercises = computed(() => realExercises.value.length)

// Version de l'application
const config = useRuntimeConfig()
const appVersion = computed(() => config.public.appVersion)
</script>

<template>
  <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
    <div class="flex items-center justify-between max-w-screen-2xl mx-auto">
      <!-- Gauche : Module + Pagination -->
      <div class="flex items-center gap-4">
        <!-- Contexte du module -->
        <div v-if="currentModule" class="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <UIcon :name="currentModule.icon" class="w-4 h-4 text-nuxy-green" />
          <span class="font-medium text-gray-900 dark:text-white">{{ currentModule.title }}</span>
        </div>

        <!-- Séparateur -->
        <div v-if="currentModule" class="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700"></div>

        <!-- Pagination -->
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <template v-if="isIntro">
            <span class="font-semibold text-nuxy-teal">Introduction</span>
          </template>
          <template v-else>
            Exercice <span class="font-semibold text-gray-900 dark:text-white">{{ currentNumber }}</span>
            sur
            <span class="font-semibold text-gray-900 dark:text-white">{{ totalExercises }}</span>
          </template>
        </div>

        <!-- Séparateur -->
        <div class="hidden md:block w-px h-4 bg-gray-300 dark:bg-gray-700"></div>

        <!-- Version -->
        <div class="hidden md:block text-xs text-gray-400 dark:text-gray-500">
          v{{ appVersion }}
        </div>
      </div>

      <!-- Droite : Boutons de navigation (style Codecademy) -->
      <div class="flex items-center gap-3">
        <!-- Bouton Précédent -->
        <UButton
          v-if="previousExercise"
          :to="previousExercise.path"
          color="gray"
          variant="outline"
          size="md"
          icon="i-lucide-arrow-left"
        >
          <span class="hidden sm:inline">Précédent</span>
        </UButton>

        <!-- Bouton Suivant -->
        <UButton
          v-if="nextExercise && allowNext"
          :to="nextExercise.path"
          color="primary"
          variant="solid"
          size="md"
          trailing-icon="i-lucide-arrow-right"
        >
          <span class="hidden sm:inline">Suivant</span>
        </UButton>

        <!-- Bouton Suivant (verrouillé) avec tooltip explicatif -->
        <UTooltip
          v-if="nextExercise && !allowNext"
          text="Complétez tous les objectifs de l'exercice pour débloquer le suivant"
        >
          <UButton
            disabled
            color="gray"
            variant="outline"
            size="md"
            icon="i-lucide-lock"
            aria-label="Exercice suivant verrouillé - complétez les objectifs pour continuer"
          >
            <span class="hidden sm:inline">Terminez l'exercice</span>
          </UButton>
        </UTooltip>

        <!-- Bouton Retour à l'accueil (dernier exercice) -->
        <UButton
          v-if="!nextExercise"
          to="/"
          color="green"
          variant="solid"
          size="md"
          trailing-icon="i-lucide-home"
        >
          <span class="hidden sm:inline">Terminé !</span>
        </UButton>
      </div>
    </div>
  </footer>
</template>
