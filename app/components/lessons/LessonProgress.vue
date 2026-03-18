<script setup lang="ts">
/**
 * LessonProgress - Barre de progression d'un module
 *
 * Affiche le nombre de leçons complétées dans un module
 * avec une barre de progression horizontale.
 */

const props = defineProps<{
  phase: number
  module: number
}>()

const { lessons, loadLessons, getLessonsByModule } = useLessonsList()
const { stats, getLessonStatus } = useLessonSupabaseProgress()

onMounted(async () => {
  await loadLessons()
})

// Leçons du module
const moduleLessons = computed(() => getLessonsByModule(props.module))
const totalLessons = computed(() => moduleLessons.value.length)

// Compteur de leçons complétées dans le module
const completedInModule = ref(0)
const isLoading = ref(true)

// Charger le nombre de leçons complétées
const loadCompletedCount = async () => {
  let count = 0
  for (const lesson of moduleLessons.value) {
    const status = await getLessonStatus(lesson.slug)
    if (status === 'completed') count++
  }
  completedInModule.value = count
  isLoading.value = false
}

// Recharger quand les leçons ou les stats changent
watch([moduleLessons, stats], () => {
  if (moduleLessons.value.length > 0) {
    loadCompletedCount()
  }
}, { immediate: true })

// Pourcentage de progression
const progressPercent = computed(() => {
  if (totalLessons.value === 0) return 0
  return Math.round((completedInModule.value / totalLessons.value) * 100)
})
</script>

<template>
  <div class="space-y-2">
    <!-- Label -->
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-600 dark:text-gray-400">
        <template v-if="isLoading">Chargement...</template>
        <template v-else>
          <span class="font-medium text-gray-900 dark:text-white">{{ completedInModule }}</span>
          / {{ totalLessons }} leçons complétées
        </template>
      </span>
      <span
        v-if="!isLoading"
        class="font-medium"
        :class="progressPercent === 100 ? 'text-nuxy-green' : 'text-gray-500 dark:text-gray-400'"
      >
        {{ progressPercent }}%
      </span>
    </div>

    <!-- Barre de progression -->
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
      <div
        class="h-2.5 rounded-full transition-all duration-500"
        :class="progressPercent === 100 ? 'bg-nuxy-green' : 'bg-nuxy-teal'"
        :style="{ width: `${progressPercent}%` }"
      />
    </div>

    <!-- Badge complétion -->
    <div v-if="progressPercent === 100" class="flex items-center gap-1.5 text-xs text-nuxy-green font-medium">
      <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
      Module terminé !
    </div>
  </div>
</template>
