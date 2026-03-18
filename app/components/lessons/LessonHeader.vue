<script setup lang="ts">
/**
 * LessonHeader - En-tête pour les pages de leçons
 *
 * Affiche :
 * - Logo NuxyAI avec lien vers l'accueil
 * - Indicateur de progression circulaire (SVG)
 * - Liens de navigation (Accueil, Leçons)
 * - Dark mode toggle + Menu utilisateur
 *
 * Note: ClientOnly pour éviter les erreurs d'hydratation SSR
 */

const { lessons, loadLessons } = useLessonsList()
const { stats } = useLessonSupabaseProgress()

onMounted(async () => {
  await loadLessons()
})

// Total des leçons disponibles
const totalLessons = computed(() => lessons.value.length || 0)

// Pourcentage de progression
const progressPercent = computed(() => {
  if (totalLessons.value === 0) return 0
  return Math.round((stats.value.completed / totalLessons.value) * 100)
})

// Cercle SVG
const circleRadius = 14
const circleCircumference = 2 * Math.PI * circleRadius
const progressOffset = computed(() => {
  return circleCircumference - (progressPercent.value / 100) * circleCircumference
})
const defaultProgressOffset = circleCircumference
</script>

<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <UContainer>
      <nav class="flex items-center justify-between h-16">
        <!-- Gauche : Logo + Progression -->
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="flex items-center gap-2">
            <NuxyLogo size="header" no-shadow />
            <span class="text-2xl font-bold text-nuxy-green">NuxyAI</span>
          </NuxtLink>

          <!-- Progression circulaire -->
          <ClientOnly>
            <UTooltip :text="`${stats.completed}/${totalLessons} leçons complétées (${progressPercent}%)`">
              <div
                class="relative flex items-center justify-center w-9 h-9"
                role="progressbar"
                :aria-valuenow="progressPercent"
                aria-valuemin="0"
                aria-valuemax="100"
                :aria-label="`Progression : ${progressPercent}%`"
              >
                <svg class="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                  <circle
                    cx="18" cy="18" :r="circleRadius"
                    fill="none"
                    class="stroke-gray-200 dark:stroke-gray-700"
                    stroke-width="3"
                  />
                  <circle
                    cx="18" cy="18" :r="circleRadius"
                    fill="none"
                    class="stroke-nuxy-green transition-all duration-500"
                    stroke-width="3"
                    stroke-linecap="round"
                    :stroke-dasharray="circleCircumference"
                    :stroke-dashoffset="progressOffset"
                  />
                </svg>
                <span class="absolute text-[10px] font-bold text-gray-700 dark:text-gray-300">
                  {{ progressPercent }}%
                </span>
              </div>
            </UTooltip>

            <template #fallback>
              <div class="relative flex items-center justify-center w-9 h-9">
                <svg class="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18" cy="18" :r="circleRadius"
                    fill="none"
                    class="stroke-gray-200 dark:stroke-gray-700"
                    stroke-width="3"
                  />
                  <circle
                    cx="18" cy="18" :r="circleRadius"
                    fill="none"
                    class="stroke-nuxy-green"
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
              to="/lessons"
              variant="ghost"
              color="neutral"
              size="sm"
              icon="i-lucide-book-open"
              aria-label="Liste des leçons"
              class="text-gray-600 dark:text-gray-400 hover:text-nuxy-green dark:hover:text-nuxy-green"
            >
              <span class="hidden lg:inline">Leçons</span>
            </UButton>
          </div>

          <!-- Séparateur -->
          <div class="hidden lg:block w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

          <!-- Dark mode -->
          <UColorModeButton size="sm" />

          <!-- Menu utilisateur -->
          <AuthUserMenu />
        </div>
      </nav>
    </UContainer>
  </header>
</template>
