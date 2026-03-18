<script setup lang="ts">
/**
 * ExerciseCard - Carte d'affichage d'un micro-exercice
 *
 * Affiche les informations essentielles d'un exercice :
 * - Titre et description
 * - Niveau de difficulté
 * - Statut de progression
 * - Bouton d'action
 */

interface Exercise {
  id: string
  title: string
  description: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  status?: 'not-started' | 'in-progress' | 'completed'
  path?: string
}

interface Props {
  exercise: Exercise
}

const props = defineProps<Props>()

// Configuration visuelle selon la difficulté
const difficultyConfig = {
  beginner: {
    label: 'Débutant',
    color: 'green' as const,
    icon: 'i-lucide-star'
  },
  intermediate: {
    label: 'Intermédiaire',
    color: 'orange' as const,
    icon: 'i-lucide-flame'
  },
  advanced: {
    label: 'Avancé',
    color: 'red' as const,
    icon: 'i-lucide-zap'
  }
}

// Configuration visuelle selon le statut
const statusConfig = {
  'not-started': {
    label: 'Commencer',
    color: 'gray' as const,
    icon: 'i-lucide-play'
  },
  'in-progress': {
    label: 'Continuer',
    color: 'blue' as const,
    icon: 'i-lucide-refresh-cw'
  },
  'completed': {
    label: 'Revoir',
    color: 'green' as const,
    icon: 'i-lucide-check-circle'
  }
}

const difficulty = computed(() => difficultyConfig[props.exercise.difficulty || 'beginner'])
const status = computed(() => statusConfig[props.exercise.status || 'not-started'])
</script>

<template>
  <NuxtLink :to="exercise.path || `/exercises/${exercise.id}`" class="block">
    <UCard class="cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
      <!-- Header avec titre et badge difficulté -->
      <template #header>
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex-1">
            {{ exercise.title }}
          </h3>
          <UBadge
            :color="difficulty.color"
            :icon="difficulty.icon"
            variant="subtle"
            size="sm"
          >
            {{ difficulty.label }}
          </UBadge>
        </div>
      </template>

      <!-- Description de l'exercice -->
      <div class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        {{ exercise.description }}
      </div>

      <!-- Footer avec indicateur d'action -->
      <template #footer>
        <div class="flex items-center justify-end text-link-color hover:text-link-hover dark:text-nuxy-teal">
          <span class="text-sm font-medium mr-2">{{ status.label }}</span>
          <UIcon :name="status.icon" class="w-4 h-4" />
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>
