<script setup lang="ts">
/**
 * LessonContent - Rendu du contenu markdown d'une leçon
 *
 * Utilise ContentRenderer de Nuxt Content pour afficher
 * le corps markdown avec un styling prose adapté.
 */

defineProps<{
  lesson: unknown
}>()
</script>

<template>
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <ContentRenderer :value="lesson" />
  </div>
</template>
