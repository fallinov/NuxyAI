<script setup lang="ts">
/**
 * Skeleton loading pour la page exercices
 *
 * Affiche des placeholders animés pendant le chargement
 */

defineProps<{
  moduleCount?: number
}>()
</script>

<template>
  <div class="space-y-4 animate-pulse">
    <!-- Skeleton pour chaque module -->
    <div
      v-for="i in (moduleCount || 3)"
      :key="i"
      class="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      <!-- Header du module -->
      <div class="px-4 py-4 flex items-center gap-4">
        <!-- Icône -->
        <div class="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />

        <!-- Titre et description -->
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48" />
        </div>

        <!-- Stats -->
        <div class="flex items-center gap-2">
          <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div class="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>

      <!-- Grille d'exercices -->
      <div class="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-800">
        <div class="flex flex-wrap gap-2">
          <div
            v-for="j in (6 + i * 2)"
            :key="j"
            class="w-10 h-10 sm:w-11 sm:h-11 bg-gray-200 dark:bg-gray-700 rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
