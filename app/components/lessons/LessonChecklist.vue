<script setup lang="ts">
/**
 * LessonChecklist - Liste d'objectifs à cocher
 *
 * Affiche des checkboxes pour chaque objectif de la leçon.
 * Quand tous les items sont cochés, la leçon est marquée complétée.
 * Progression sauvegardée via useLessonSupabaseProgress.
 */

interface ChecklistItem {
  id: string
  label: string
}

const props = defineProps<{
  items: ChecklistItem[]
  slug: string
}>()

const { getProgress, saveChecklist, completeLesson } = useLessonSupabaseProgress()

// Items cochés
const checkedIds = ref<Set<string>>(new Set())
const isLoading = ref(true)

// Charger l'état sauvegardé au montage
onMounted(async () => {
  const progress = await getProgress(props.slug)
  if (progress?.checklistCompleted) {
    checkedIds.value = new Set(progress.checklistCompleted)
  }
  isLoading.value = false
})

// Tous les items sont cochés ?
const allChecked = computed(() => {
  return props.items.length > 0 && props.items.every(item => checkedIds.value.has(item.id))
})

// Toggle un item
const toggleItem = async (itemId: string) => {
  const newSet = new Set(checkedIds.value)
  if (newSet.has(itemId)) {
    newSet.delete(itemId)
  } else {
    newSet.add(itemId)
  }
  checkedIds.value = newSet

  // Sauvegarder
  await saveChecklist(props.slug, Array.from(newSet))

  // Si tout est coché, marquer la leçon comme complétée
  if (allChecked.value) {
    await completeLesson(props.slug)
  }
}

// Vérifier si un item est coché
const isChecked = (itemId: string): boolean => {
  return checkedIds.value.has(itemId)
}
</script>

<template>
  <div class="space-y-3">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
      <UIcon name="i-lucide-list-checks" class="w-5 h-5 text-nuxy-green" />
      Objectifs de la leçon
    </h3>

    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in items.length" :key="i" class="h-6 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
    </div>

    <div v-else class="space-y-2">
      <button
        v-for="item in items"
        :key="item.id"
        class="flex items-start gap-3 w-full text-left p-3 rounded-lg transition-colors"
        :class="[
          isChecked(item.id)
            ? 'bg-nuxy-green/10 dark:bg-nuxy-green/5'
            : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
        ]"
        @click="toggleItem(item.id)"
      >
        <!-- Checkbox visuelle -->
        <div
          class="mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200"
          :class="[
            isChecked(item.id)
              ? 'bg-nuxy-green border-nuxy-green scale-110'
              : 'border-gray-300 dark:border-gray-600'
          ]"
        >
          <UIcon
            v-if="isChecked(item.id)"
            name="i-lucide-check"
            class="w-3.5 h-3.5 text-white"
          />
        </div>

        <!-- Label -->
        <span
          class="text-sm transition-all duration-200"
          :class="[
            isChecked(item.id)
              ? 'text-nuxy-green font-medium line-through decoration-nuxy-green/40'
              : 'text-gray-700 dark:text-gray-300'
          ]"
        >
          {{ item.label }}
        </span>
      </button>
    </div>

    <!-- Message de complétion -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="allChecked"
        class="flex items-center gap-2 p-3 bg-nuxy-green/10 dark:bg-nuxy-green/5 rounded-lg border border-nuxy-green/20"
      >
        <UIcon name="i-lucide-party-popper" class="w-5 h-5 text-nuxy-gold" />
        <span class="text-sm font-medium text-nuxy-green">
          Bravo, tous les objectifs sont atteints !
        </span>
      </div>
    </Transition>
  </div>
</template>
