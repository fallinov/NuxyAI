<script setup lang="ts">
/**
 * LessonNavigation - Navigation entre leçons (précédent/suivant)
 *
 * Charge directement les leçons via queryCollection (pas via composable)
 * pour éviter les problèmes d'hydratation avec useAsyncData dans onMounted.
 */

const props = defineProps<{
  currentSlug: string
}>()

// Charger toutes les leçons triées au setup (pas dans onMounted)
const { data: allLessons } = await useAsyncData('nav-lessons', () =>
  queryCollection('lessons')
    .order('lessonNumber', 'ASC')
    .select('path', 'title', 'module', 'lessonNumber')
    .all()
)

const lessons = computed(() => allLessons.value || [])

const currentIndex = computed(() =>
  lessons.value.findIndex(l => l.path === `/lessons/${props.currentSlug}`)
)

const previousLesson = computed(() =>
  currentIndex.value > 0 ? lessons.value[currentIndex.value - 1] : null
)

const nextLesson = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < lessons.value.length - 1
    ? lessons.value[currentIndex.value + 1]
    : null
)

// Progression dans le module
const currentLesson = computed(() =>
  currentIndex.value >= 0 ? lessons.value[currentIndex.value] : null
)

const moduleLessons = computed(() => {
  if (!currentLesson.value) return []
  return lessons.value.filter(l => l.module === currentLesson.value!.module)
})

const positionInModule = computed(() => {
  if (!currentLesson.value) return 0
  return moduleLessons.value.findIndex(l => l.path === `/lessons/${props.currentSlug}`) + 1
})
</script>

<template>
  <div class="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
    <div class="flex items-center justify-between gap-4">
      <!-- Précédent -->
      <div class="flex-1 min-w-0">
        <NuxtLink
          v-if="previousLesson"
          :to="previousLesson.path"
          class="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <UIcon name="i-lucide-arrow-left" class="w-5 h-5 text-gray-400 group-hover:text-nuxy-green shrink-0" />
          <div class="min-w-0">
            <div class="text-xs text-gray-500 dark:text-gray-400">Précédent</div>
            <div class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ previousLesson.title }}</div>
          </div>
        </NuxtLink>
      </div>

      <!-- Position -->
      <div class="shrink-0 text-center px-2">
        <div class="text-sm font-semibold text-gray-900 dark:text-white tabular-nums">
          {{ positionInModule }} / {{ moduleLessons.length }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">du module</div>
      </div>

      <!-- Suivant -->
      <div class="flex-1 min-w-0 flex justify-end">
        <NuxtLink
          v-if="nextLesson"
          :to="nextLesson.path"
          class="group flex items-center gap-3 p-3 rounded-xl hover:bg-nuxy-green/5 dark:hover:bg-nuxy-green/10 transition-colors"
        >
          <div class="min-w-0 text-right">
            <div class="text-xs text-gray-500 dark:text-gray-400">Suivant</div>
            <div class="text-sm font-medium text-nuxy-green truncate">{{ nextLesson.title }}</div>
          </div>
          <UIcon name="i-lucide-arrow-right" class="w-5 h-5 text-nuxy-green shrink-0" />
        </NuxtLink>

        <NuxtLink
          v-else
          to="/lessons"
          class="group flex items-center gap-3 p-3 rounded-xl hover:bg-nuxy-green/5 dark:hover:bg-nuxy-green/10 transition-colors"
        >
          <div class="text-right">
            <div class="text-xs text-nuxy-green">Terminé !</div>
            <div class="text-sm font-medium text-nuxy-green">Retour aux leçons</div>
          </div>
          <UIcon name="i-lucide-home" class="w-5 h-5 text-nuxy-green shrink-0" />
        </NuxtLink>
      </div>
    </div>

    <!-- Barre de progression du module -->
    <div class="mt-4 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <div
        class="h-full bg-nuxy-green rounded-full transition-all duration-500"
        :style="{ width: moduleLessons.length > 0 ? `${(positionInModule / moduleLessons.length) * 100}%` : '0%' }"
      />
    </div>
  </div>
</template>
