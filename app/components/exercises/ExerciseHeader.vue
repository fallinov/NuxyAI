<script setup lang="ts">
/**
 * ExerciseHeader - En-tête pour les pages d'exercices
 *
 * Identique au header de default.vue avec :
 * - Indicateur de progression circulaire
 *
 * Note: L'indicateur de progression utilise ClientOnly pour éviter
 * les erreurs d'hydratation SSR (localStorage non disponible sur serveur)
 */

import { useExercisesList } from '~/composables/useExerciseData'

// Utiliser l'état partagé des exercices
const { exercises, loadExercises } = useExercisesList()

// Charger les exercices au montage (si pas déjà chargés)
onMounted(async () => {
  await loadExercises()
})

// Progression globale (utilise localStorage pour affichage immédiat)
const { stats } = useSupabaseProgress()
// Exclure les intros du compteur de progression
const totalExercises = computed(() => exercises.value?.filter(ex => ex.exerciseType !== 'intro').length || 0)

// Calcul du pourcentage de progression
const progressPercent = computed(() => {
  if (totalExercises.value === 0) return 0
  return Math.round((stats.value.completed / totalExercises.value) * 100)
})

// Paramètres du cercle de progression (SVG)
const circleRadius = 14
const circleCircumference = 2 * Math.PI * circleRadius
const progressOffset = computed(() => {
  return circleCircumference - (progressPercent.value / 100) * circleCircumference
})

// Offset par défaut (0% - utilisé pour le fallback SSR)
const defaultProgressOffset = circleCircumference
</script>

<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <UContainer>
      <nav class="flex items-center justify-between h-16">
        <!-- Gauche : Logo + Progression -->
        <div class="flex items-center gap-4">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <NuxyLogo size="header" no-shadow />
            <span class="text-2xl font-bold text-nuxy-green">Nuxy</span>
          </NuxtLink>

          <!-- Indicateur de progression circulaire (ClientOnly pour éviter hydration mismatch) -->
          <ClientOnly>
            <UTooltip :text="`${stats.completed}/${totalExercises} exercices complétés (${progressPercent}%)`">
              <div class="relative flex items-center justify-center w-9 h-9" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100" :aria-label="`Progression: ${progressPercent}%`">
                <svg class="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                  <!-- Cercle de fond -->
                  <circle
                    cx="18"
                    cy="18"
                    :r="circleRadius"
                    fill="none"
                    class="stroke-gray-200 dark:stroke-gray-700"
                    stroke-width="3"
                  />
                  <!-- Cercle de progression -->
                  <circle
                    cx="18"
                    cy="18"
                    :r="circleRadius"
                    fill="none"
                    class="stroke-primary-500 transition-all duration-500"
                    stroke-width="3"
                    stroke-linecap="round"
                    :stroke-dasharray="circleCircumference"
                    :stroke-dashoffset="progressOffset"
                  />
                </svg>
                <!-- Texte au centre -->
                <span class="absolute text-[10px] font-bold text-gray-700 dark:text-gray-300">
                  {{ progressPercent }}%
                </span>
              </div>
            </UTooltip>
            <!-- Fallback SSR : affiche 0% pour éviter le mismatch -->
            <template #fallback>
              <div class="relative flex items-center justify-center w-9 h-9">
                <svg class="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    :r="circleRadius"
                    fill="none"
                    class="stroke-gray-200 dark:stroke-gray-700"
                    stroke-width="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    :r="circleRadius"
                    fill="none"
                    class="stroke-primary-500"
                    stroke-width="3"
                    stroke-linecap="round"
                    :stroke-dasharray="circleCircumference"
                    :stroke-dashoffset="defaultProgressOffset"
                  />
                </svg>
                <span class="absolute text-[10px] font-bold text-gray-700 dark:text-gray-300">
                  0%
                </span>
              </div>
            </template>
          </ClientOnly>
        </div>

        <!-- Droite : Navigation -->
        <div class="flex items-center gap-2">
          <!-- Liens de navigation (toujours visibles) -->
          <div class="flex items-center gap-1">
            <UButton
              to="/"
              variant="ghost"
              color="neutral"
              size="sm"
              icon="i-lucide-home"
              aria-label="Accueil"
              class="text-gray-600 dark:text-gray-400 hover:text-nuxy-green dark:hover:text-nuxy-green"
            >
              <span class="hidden lg:inline">Accueil</span>
            </UButton>
            <UButton
              to="/exercices"
              variant="ghost"
              color="neutral"
              size="sm"
              icon="i-lucide-list"
              aria-label="Liste des exercices"
              class="text-gray-600 dark:text-gray-400 hover:text-nuxy-green dark:hover:text-nuxy-green"
            >
              <span class="hidden lg:inline">Exercices</span>
            </UButton>
          </div>

          <!-- Séparateur (desktop) -->
          <div class="hidden lg:block w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          <!-- Dark mode switch -->
          <UColorModeButton size="sm" />

          <!-- Menu utilisateur (gère connexion et profil) -->
          <AuthUserMenu />
        </div>
      </nav>
    </UContainer>
  </header>
</template>
