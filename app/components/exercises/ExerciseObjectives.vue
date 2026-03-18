<template>
  <!-- Utilise nuxy-teal pour les objectifs (brand secondary) -->
  <UCard class="bg-nuxy-teal/10 dark:bg-nuxy-teal/20 border-l-4 border-nuxy-teal">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-clipboard-check" class="w-5 h-5 text-nuxy-teal" />
        <h3 class="text-lg font-semibold text-nuxy-teal-dark dark:text-nuxy-teal">
          Objectifs à valider
        </h3>
      </div>
    </template>

    <div class="space-y-3">
      <div
        v-for="(objective, index) in objectives"
        :key="index"
        class="flex items-start gap-3 p-3 rounded-lg transition-all"
        :class="objective.completed ? 'bg-nuxy-green/20 dark:bg-nuxy-green/30' : 'bg-white dark:bg-gray-900'"
      >
        <!-- Icône de validation -->
        <div class="flex-shrink-0 mt-0.5">
          <UIcon
            v-if="objective.completed"
            name="i-lucide-circle-check-big"
            class="w-6 h-6 text-nuxy-green"
          />
          <UIcon
            v-else
            name="i-lucide-minus-circle"
            class="w-6 h-6 text-gray-400 dark:text-gray-600"
          />
        </div>

        <!-- Texte de l'objectif -->
        <div class="flex-1">
          <p
            class="text-sm font-medium"
            :class="objective.completed ? 'text-nuxy-green-dark dark:text-nuxy-green-light line-through' : 'text-gray-700 dark:text-gray-300'"
          >
            {{ objective.label }}
          </p>
          <p
            v-if="objective.description"
            class="text-xs mt-1"
            :class="objective.completed ? 'text-nuxy-green dark:text-nuxy-green-light' : 'text-gray-500 dark:text-gray-500'"
          >
            {{ objective.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Progression -->
    <template #footer>
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-400">
          Progression
        </span>
        <span class="font-semibold" :class="allCompleted ? 'text-nuxy-green' : 'text-nuxy-teal'">
          {{ completedCount }}/{{ objectives.length }} objectifs
        </span>
      </div>
      <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          class="h-2 rounded-full transition-all duration-500"
          :class="allCompleted ? 'bg-nuxy-green' : 'bg-nuxy-teal'"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
interface Objective {
  label: string
  description?: string
  completed: boolean
}

const props = defineProps<{
  objectives: Objective[]
}>()

const completedCount = computed(() => {
  return props.objectives.filter(obj => obj.completed).length
})

const progressPercentage = computed(() => {
  return (completedCount.value / props.objectives.length) * 100
})

const allCompleted = computed(() => {
  return completedCount.value === props.objectives.length
})
</script>
