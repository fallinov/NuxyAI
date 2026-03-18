<script setup lang="ts">
/**
 * LessonNavigation - Navigation entre leçons (précédent/suivant)
 *
 * Affiche les boutons de navigation avec titre de la leçon
 * et un indicateur de progression (position dans le module).
 */

const props = defineProps<{
  currentSlug: string
}>()

const { lessons, loadLessons, getNextLesson, getPreviousLesson } = useLessonsList()

onMounted(async () => {
  await loadLessons()
})

// Navigation
const nextLesson = computed(() => getNextLesson(props.currentSlug))
const previousLesson = computed(() => getPreviousLesson(props.currentSlug))

// Leçon courante
const currentLesson = computed(() => lessons.value.find(l => l.slug === props.currentSlug))

// Progression dans le module
const moduleLessons = computed(() => {
  if (!currentLesson.value) return []
  return lessons.value.filter(l => l.module === currentLesson.value!.module)
})

const currentPositionInModule = computed(() => {
  if (!currentLesson.value) return 0
  return moduleLessons.value.findIndex(l => l.slug === props.currentSlug) + 1
})

const totalInModule = computed(() => moduleLessons.value.length)
</script>

<template>
  <div class="border-t border-gray-200 dark:border-gray-800 pt-6 mt-8">
    <div class="flex items-center justify-between">
      <!-- Bouton Précédent -->
      <div class="flex-1">
        <UButton
          v-if="previousLesson"
          :to="previousLesson.path"
          color="neutral"
          variant="outline"
          size="lg"
          icon="i-lucide-arrow-left"
        >
          <div class="text-left">
            <div class="text-xs text-gray-500 dark:text-gray-400">Précédent</div>
            <div class="font-medium text-sm">{{ previousLesson.title }}</div>
          </div>
        </UButton>
      </div>

      <!-- Indicateur de progression -->
      <div class="flex-shrink-0 px-4 text-center">
        <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
          {{ currentPositionInModule }} / {{ totalInModule }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Leçons du module
        </div>
      </div>

      <!-- Bouton Suivant -->
      <div class="flex-1 flex justify-end">
        <UButton
          v-if="nextLesson"
          :to="nextLesson.path"
          color="primary"
          variant="solid"
          size="lg"
          trailing-icon="i-lucide-arrow-right"
        >
          <div class="text-right">
            <div class="text-xs text-white/80">Suivant</div>
            <div class="font-medium text-sm">{{ nextLesson.title }}</div>
          </div>
        </UButton>

        <!-- Dernier exercice : retour à l'accueil -->
        <UButton
          v-else
          to="/lessons"
          color="primary"
          variant="solid"
          size="lg"
          trailing-icon="i-lucide-home"
        >
          <div class="text-right">
            <div class="text-xs text-white/80">Terminé !</div>
            <div class="font-medium text-sm">Retour aux leçons</div>
          </div>
        </UButton>
      </div>
    </div>

    <!-- Barre de progression -->
    <div class="mt-6">
      <UProgress
        :model-value="totalInModule > 0 ? (currentPositionInModule / totalInModule) * 100 : 0"
        color="primary"
        size="sm"
      />
    </div>
  </div>
</template>
