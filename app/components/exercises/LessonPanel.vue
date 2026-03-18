<script setup lang="ts">
/**
 * LessonPanel - Panneau d'instructions de l'exercice
 *
 * Affiche :
 * - Instructions et description
 * - Objectifs à atteindre
 * - Messages de motivation
 * - Indices progressifs
 */

import { getDifficultyConfig, getStatusConfig, type ExerciseStatus, type DifficultyLevel } from '~/data/exerciseConfig'

interface Props {
  exercise: any
  objectives: Array<{ label: string; completed: boolean; message?: string }>
  attempts: number
  exerciseStatus: ExerciseStatus
  hints: Array<{ title: string; content: string; example?: string }>
  showHints: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle-hints'): void
  (e: 'hint-revealed'): void
}>()

// Badge de difficulté (config centralisée)
const difficulty = computed(() => {
  return getDifficultyConfig(props.exercise?.difficulty || 'beginner')
})

// Badge de statut (config centralisée)
const status = computed(() => {
  return getStatusConfig(props.exerciseStatus)
})

// Calcul des règles passées/totales pour le composant Motivation
const passedRules = computed(() => props.objectives.filter(o => o.completed).length)
const totalRules = computed(() => props.objectives.length)
</script>

<template>
  <div class="lesson-panel h-full overflow-y-auto">
    <!-- En-tête : badges et métadonnées -->
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-2">
        <UBadge :color="difficulty.color" :icon="difficulty.icon" variant="subtle">
          {{ difficulty.label }}
        </UBadge>
        <UBadge :color="status.color" :icon="status.icon" variant="subtle">
          {{ status.label }}
        </UBadge>
      </div>
      <p class="text-gray-500 dark:text-gray-400 text-xs">
        Exercice {{ exercise?.exerciseNumber }} · {{ exercise?.duration || 5 }} min · {{ attempts }} tentative{{ attempts > 1 ? 's' : '' }}
      </p>
    </div>

    <!-- Description -->
    <div class="prose prose-sm dark:prose-invert mb-6">
      <ContentRenderer v-if="exercise?.body" :value="exercise.body" />
    </div>

    <!-- Objectifs -->
    <div id="objectives-section" class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Objectifs
      </h3>
      <ul class="space-y-2">
        <li
          v-for="(objective, index) in objectives"
          :key="index"
          class="flex items-start gap-3"
        >
          <div
            class="flex-shrink-0 w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center"
            :class="[
              objective.completed
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600'
            ]"
          >
            <UIcon
              v-if="objective.completed"
              name="i-lucide-check"
              class="w-3 h-3 text-white"
            />
          </div>
          <div class="flex-1">
            <span
              class="text-sm"
              :class="[
                objective.completed
                  ? 'text-gray-900 dark:text-gray-100 font-medium'
                  : 'text-gray-600 dark:text-gray-400'
              ]"
            >
              {{ objective.label }}
            </span>
            <!-- Message de validation (successMessage ou errorMessage) -->
            <p
              v-if="objective.message"
              class="mt-1 text-xs leading-relaxed"
              :class="[
                objective.completed
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-orange-600 dark:text-orange-400'
              ]"
            >
              {{ objective.message }}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Message de motivation -->
    <div class="mb-6">
      <ExercisesExerciseMotivation
        :attempts="attempts"
        :passed-rules="passedRules"
        :total-rules="totalRules"
        :is-completed="exerciseStatus === 'completed'"
      />
    </div>

    <!-- Indices -->
    <div v-if="hints.length > 0" class="mb-6">
      <ExercisesExerciseHints
        :hints="hints"
        :show-hints="showHints"
        @toggle-hints="emit('toggle-hints')"
        @hint-revealed="emit('hint-revealed')"
      />
    </div>
  </div>
</template>
