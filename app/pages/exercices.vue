<script setup lang="ts">
/**
 * Page catalogue des exercices - Navigation améliorée
 *
 * Améliorations UX :
 * - Bandeau "Continuer" avec le prochain exercice recommandé
 * - Navigation sticky par modules (desktop)
 * - Navigation horizontale scrollable (mobile)
 * - Modules repliables (accordéon)
 * - Highlight du prochain exercice à faire
 * - Temps estimé par module
 * - Skeleton loading pendant le chargement
 * - Pull-to-refresh pour rafraîchir la progression
 * - Onboarding tour pour les nouveaux utilisateurs
 * - Confetti quand un module est complété
 * - Haptic feedback sur les interactions
 */

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Tous les exercices - Nuxy',
  description: 'Variables, fonctions, DOM, API... Choisis ton exercice et code !'
})

import { useExercisesList, type Exercise } from '~/composables/useExerciseData'

// Helper : filtrer les intros pour les stats
const isRealExercise = (ex: Exercise) => ex.exerciseType !== 'intro'

const { isAuthenticated } = useAuth()
const { exercises, loadExercises, getExercisesByModule, getModulesWithExercises } = useExercisesList()
const { loadAllProgress, progress } = useSupabaseProgress()

// UX composables
const haptic = useHaptic()
const confetti = useConfetti()

// État de chargement
const isLoading = ref(true)
const isInitialLoad = ref(true)

await loadExercises()

// Charger la progression
const progressData = ref<Record<string, { status: string }>>({})

// Welcome page visitée (côté client uniquement)
const welcomeVisited = ref(false)

// Stocker l'état précédent des modules complétés pour détecter les changements
const previousModuleCompletion = ref<Record<number, boolean>>({})

onMounted(async () => {
  welcomeVisited.value = localStorage.getItem('nuxy-welcome-visited') === 'true'

  const data = await loadAllProgress()
  progressData.value = data
  isLoading.value = false
  isInitialLoad.value = false

  // Initialiser l'état des modules complétés
  setTimeout(() => {
    activeModules.value.forEach(module => {
      const stats = getModuleStats(module.id)
      previousModuleCompletion.value[module.id] = stats.percentage === 100
    })
  }, 100)
})

// Pull-to-refresh
const refreshProgress = async () => {
  haptic.light()
  const data = await loadAllProgress()
  progressData.value = data
  haptic.success()
}

const { isRefreshing, pullDistance, pullProgress } = usePullToRefresh({
  threshold: 80,
  onRefresh: refreshProgress
})

// Modules avec exercices
const activeModules = computed(() => {
  if (!exercises.value) return []
  return getModulesWithExercises(exercises.value)
})

// État des modules repliés (par défaut tous dépliés)
const collapsedModules = ref<Set<number>>(new Set())

const toggleModule = (moduleId: number) => {
  haptic.light()
  if (collapsedModules.value.has(moduleId)) {
    collapsedModules.value.delete(moduleId)
  } else {
    collapsedModules.value.add(moduleId)
  }
}

const isModuleCollapsed = (moduleId: number) => collapsedModules.value.has(moduleId)

// Calculer les stats de progression par module (avec durée)
const getModuleStats = (moduleId: number) => {
  const moduleExercises = getExercisesByModule(exercises.value || [], moduleId)
  // Filtrer les intros pour les stats (elles ne comptent pas comme exercices à compléter)
  const realExercises = moduleExercises.filter(isRealExercise)
  const completed = realExercises.filter(ex =>
    progressData.value[ex.id]?.status === 'completed' ||
    progress.value.exercises[ex.id]?.status === 'completed'
  ).length
  const inProgress = realExercises.filter(ex => {
    const status = progressData.value[ex.id]?.status || progress.value.exercises[ex.id]?.status
    return status === 'in-progress'
  }).length

  // Calculer la durée totale du module (intros incluses pour la durée de lecture)
  const totalDuration = moduleExercises.reduce((sum, ex) => sum + (ex.duration || 5), 0)

  return {
    total: realExercises.length,
    completed,
    inProgress,
    percentage: realExercises.length > 0 ? Math.round((completed / realExercises.length) * 100) : 0,
    duration: totalDuration
  }
}

// Formater la durée en heures/minutes
const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours}h`
  return `${hours}h${mins}`
}

// Obtenir le statut d'un exercice
const getExerciseStatus = (exerciseId: string): 'not-started' | 'in-progress' | 'completed' => {
  const supabaseStatus = progressData.value[exerciseId]?.status
  const localStatus = progress.value.exercises[exerciseId]?.status
  return (supabaseStatus || localStatus || 'not-started') as 'not-started' | 'in-progress' | 'completed'
}

// Trouver le prochain exercice à faire (premier non complété, hors intros)
const nextExercise = computed(() => {
  if (!exercises.value) return null

  const realExercises = exercises.value.filter(isRealExercise)

  // Chercher d'abord un exercice "in-progress"
  const inProgressExercise = realExercises.find(ex => getExerciseStatus(ex.id) === 'in-progress')
  if (inProgressExercise) return inProgressExercise

  // Sinon, le premier exercice "not-started"
  return realExercises.find(ex => getExerciseStatus(ex.id) === 'not-started') || null
})

// Vérifier si un exercice est le "prochain" recommandé
const isNextExercise = (exerciseId: string) => {
  return nextExercise.value?.id === exerciseId
}

// Stats globales (sans les intros)
const globalStats = computed(() => {
  const realExercises = exercises.value?.filter(isRealExercise) || []
  const total = realExercises.length
  const completed = realExercises.filter(ex => getExerciseStatus(ex.id) === 'completed').length
  const totalDuration = exercises.value?.reduce((sum, ex) => sum + (ex.duration || 5), 0) || 0
  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    duration: totalDuration
  }
})

// Couleurs selon le statut
const getStatusColor = (status: string, isNext: boolean = false) => {
  if (isNext) {
    return 'bg-nuxy-green ring-2 ring-nuxy-green ring-offset-2 dark:ring-offset-gray-900 animate-pulse'
  }
  switch (status) {
    case 'completed':
      return 'bg-nuxy-green hover:bg-nuxy-green-dark'
    case 'in-progress':
      return 'bg-nuxy-gold hover:bg-nuxy-gold-dark'
    default:
      return 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
  }
}

// Icône selon le statut
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return 'i-lucide-check'
    case 'in-progress':
      return 'i-lucide-pencil'
    default:
      return null
  }
}

// Scroll vers un module
const scrollToModule = (moduleId: number) => {
  haptic.light()
  const element = document.getElementById(`module-${moduleId}`)
  if (element) {
    // S'assurer que le module est déplié
    collapsedModules.value.delete(moduleId)
    // Scroll avec offset pour le header sticky
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}

// Détecter quand un module vient d'être complété pour lancer les confettis
watch(progressData, () => {
  activeModules.value.forEach(module => {
    const stats = getModuleStats(module.id)
    const wasCompleted = previousModuleCompletion.value[module.id]
    const isNowCompleted = stats.percentage === 100

    // Si le module vient d'être complété
    if (!wasCompleted && isNowCompleted) {
      haptic.celebration()
      confetti.moduleComplete()
    }

    previousModuleCompletion.value[module.id] = isNowCompleted
  })
}, { deep: true })

// Module actif (pour la navigation sticky)
const activeModuleId = ref<number | null>(null)

// Observer les modules pour la navigation sticky
// Utilise une approche basée sur la position plutôt que IntersectionObserver pour plus de précision
onMounted(() => {
  const updateActiveModule = () => {
    const scrollTop = window.scrollY
    const viewportHeight = window.innerHeight
    const scrollHeight = document.documentElement.scrollHeight
    const headerOffset = 120 // Hauteur du header sticky

    // Si on est en bas de page, activer le dernier module
    if (scrollHeight - scrollTop - viewportHeight < 50) {
      const lastModule = activeModules.value[activeModules.value.length - 1]
      if (lastModule) {
        activeModuleId.value = lastModule.id
        return
      }
    }

    // Trouver le module le plus visible dans la viewport
    let bestModule: number | null = null
    let bestVisibility = -Infinity

    activeModules.value.forEach((module) => {
      const element = document.getElementById(`module-${module.id}`)
      if (!element) return

      const rect = element.getBoundingClientRect()
      const elementTop = rect.top - headerOffset
      const elementBottom = rect.bottom

      // Calculer la visibilité : on préfère le module dont le haut est juste sous le header
      // Score basé sur la proximité du haut de l'élément avec le haut de la viewport
      if (elementTop <= 50 && elementBottom > headerOffset) {
        // Le module est visible et son haut est passé sous le header
        const visibility = -elementTop // Plus le haut est haut (négatif), meilleur le score
        if (visibility > bestVisibility) {
          bestVisibility = visibility
          bestModule = module.id
        }
      }
    })

    // Si aucun module n'est "passé", prendre le premier visible
    if (bestModule === null) {
      for (const module of activeModules.value) {
        const element = document.getElementById(`module-${module.id}`)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top < viewportHeight && rect.bottom > 0) {
          bestModule = module.id
          break
        }
      }
    }

    if (bestModule !== null) {
      activeModuleId.value = bestModule
    }
  }

  // Throttle pour limiter les appels
  let ticking = false
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveModule()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  // Initialiser au montage
  setTimeout(updateActiveModule, 200)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

// Référence pour le scroll horizontal des tabs mobiles
const mobileNavRef = ref<HTMLElement | null>(null)

// Scroll le tab actif dans la vue sur mobile
const scrollActiveTabIntoView = () => {
  if (!mobileNavRef.value || !activeModuleId.value) return
  const activeTab = mobileNavRef.value.querySelector(`[data-module="${activeModuleId.value}"]`)
  if (activeTab) {
    activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }
}

// Observer le changement de module actif pour scroller le tab mobile
watch(activeModuleId, () => {
  scrollActiveTabIntoView()
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
    <!-- Onboarding tour (première visite) -->
    <OnboardingTour />

    <!-- Pull-to-refresh indicator -->
    <PullToRefresh
      :is-refreshing="isRefreshing"
      :pull-distance="pullDistance"
      :pull-progress="pullProgress"
    />
    <!-- Header avec CTA "Continuer" -->
    <section class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <UContainer class="py-6 lg:py-8">
        <!-- Bandeau "Continuer" -->
        <div
          v-if="nextExercise"
          class="mb-5 p-3 sm:p-4 bg-nuxy-green/10 dark:bg-nuxy-green/20 border border-nuxy-green/30 rounded-xl"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="flex items-center justify-center w-10 h-10 bg-nuxy-green rounded-full shrink-0">
                <UIcon name="i-lucide-play" class="w-5 h-5 text-white" />
              </div>
              <div class="min-w-0">
                <p class="text-xs sm:text-sm text-nuxy-green-dark dark:text-nuxy-green font-medium">
                  {{ getExerciseStatus(nextExercise.id) === 'in-progress' ? 'Reprends où tu en étais' : 'Prochain exercice' }}
                </p>
                <p class="font-semibold text-gray-900 dark:text-white truncate">
                  {{ nextExercise.exerciseNumber }} — {{ nextExercise.title }}
                </p>
              </div>
            </div>
            <UButton
              :to="nextExercise.path"
              color="primary"
              size="lg"
              class="shrink-0 w-full sm:w-auto justify-center min-h-[48px] active:scale-[0.98] transition-transform"
            >
              <UIcon name="i-lucide-play" class="w-4 h-4 mr-1.5" />
              Continuer
            </UButton>
          </div>
        </div>

        <!-- Titre et stats -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Tous les exercices
            </h1>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {{ globalStats.total }} exercices · {{ activeModules.length }} modules · {{ formatDuration(globalStats.duration) }}
            </p>
          </div>

          <!-- Progression globale -->
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="text-right">
              <p class="text-xl sm:text-2xl font-bold text-nuxy-green">{{ globalStats.percentage }}%</p>
              <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{{ globalStats.completed }}/{{ globalStats.total }}</p>
            </div>
            <div class="w-12 h-12 sm:w-16 sm:h-16 relative">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" class="stroke-gray-200 dark:stroke-gray-700" stroke-width="3" />
                <circle
                  cx="18" cy="18" r="14" fill="none"
                  class="stroke-nuxy-green transition-all duration-500"
                  stroke-width="3" stroke-linecap="round"
                  :stroke-dasharray="87.96"
                  :stroke-dashoffset="87.96 - (globalStats.percentage / 100) * 87.96"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Légende (masquée sur mobile pour gagner de l'espace) -->
        <div class="hidden sm:flex flex-wrap items-center gap-4 mt-5 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-3.5 h-3.5 rounded bg-gray-200 dark:bg-gray-700" />
            <span class="text-gray-600 dark:text-gray-400">Pas commencé</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3.5 h-3.5 rounded bg-nuxy-gold" />
            <span class="text-gray-600 dark:text-gray-400">En cours</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3.5 h-3.5 rounded bg-nuxy-green" />
            <span class="text-gray-600 dark:text-gray-400">Complété</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3.5 h-3.5 rounded bg-nuxy-green ring-2 ring-nuxy-green ring-offset-2" />
            <span class="text-gray-600 dark:text-gray-400">Prochain</span>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Navigation mobile par modules (tabs horizontaux scrollables) -->
    <div class="lg:hidden sticky top-[64px] z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm safe-area-x">
      <nav
        ref="mobileNavRef"
        class="flex gap-1.5 px-2 py-2 overflow-x-auto scrollbar-none snap-x snap-mandatory"
      >
        <button
          v-for="module in activeModules"
          :key="module.id"
          :data-module="module.id"
          class="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors shrink-0 snap-start min-h-[40px] active:scale-95"
          :class="activeModuleId === module.id
            ? 'bg-nuxy-green text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 active:bg-gray-200 dark:active:bg-gray-700'"
          @click="scrollToModule(module.id)"
        >
          <UIcon :name="module.icon" class="w-4 h-4 shrink-0" />
          <span class="hidden min-[400px]:inline">{{ module.id }}. {{ module.title }}</span>
          <span
            class="text-[10px] px-1.5 py-0.5 rounded-full tabular-nums"
            :class="activeModuleId === module.id
              ? 'bg-white/20 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
          >
            {{ getModuleStats(module.id).completed }}/{{ getModuleStats(module.id).total }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Contenu principal avec navigation sticky -->
    <section class="py-6 lg:py-8">
      <UContainer>
        <div class="flex gap-6 lg:gap-8">
          <!-- Navigation sticky (desktop) -->
          <aside class="hidden lg:block w-48 xl:w-56 shrink-0">
            <div class="sticky top-20">
              <h2 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Modules
              </h2>
              <nav class="space-y-1">
                <button
                  v-for="module in activeModules"
                  :key="module.id"
                  class="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition-colors"
                  :class="activeModuleId === module.id
                    ? 'bg-nuxy-green/10 text-nuxy-green-dark dark:text-nuxy-green font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'"
                  @click="scrollToModule(module.id)"
                >
                  <UIcon :name="module.icon" class="w-4 h-4 shrink-0" />
                  <span class="truncate flex-1">{{ module.id }}. {{ module.title }}</span>
                  <span class="text-xs tabular-nums">
                    {{ getModuleStats(module.id).completed }}/{{ getModuleStats(module.id).total }}
                  </span>
                </button>
              </nav>

              <!-- Temps total estimé -->
              <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-3">
                <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <UIcon name="i-lucide-clock" class="w-4 h-4" />
                  <span>Temps total : {{ formatDuration(globalStats.duration) }}</span>
                </div>
                <div v-if="isAuthenticated" class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <UIcon name="i-lucide-cloud-check" class="w-4 h-4 text-nuxy-green" />
                  <span>Progression sauvegardée</span>
                </div>
              </div>
            </div>
          </aside>

          <!-- Liste des modules -->
          <div class="flex-1 min-w-0 space-y-4">
            <!-- Skeleton loading -->
            <ExercisesSkeleton v-if="isInitialLoad" :module-count="activeModules.length || 5" />

            <!-- Modules (affichés quand chargé) -->
            <template v-else>
            <div
              v-for="module in activeModules"
              :key="module.id"
              :id="`module-${module.id}`"
              class="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden scroll-mt-[120px] lg:scroll-mt-20"
            >
              <!-- En-tête du module (cliquable pour replier) -->
              <button
                class="w-full px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-2.5 sm:gap-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800/50 active:bg-gray-100 dark:active:bg-gray-800/50 transition-colors touch-manipulation"
                @click="toggleModule(module.id)"
              >
                <!-- Icône et titre -->
                <div class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-nuxy-green/20 dark:bg-nuxy-green/30 rounded-lg shrink-0">
                  <UIcon :name="module.icon" class="w-4 h-4 sm:w-5 sm:h-5 text-nuxy-green-dark dark:text-nuxy-green" />
                </div>
                <div class="flex-1 min-w-0">
                  <h2 class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                    Module {{ module.id }} : {{ module.title }}
                  </h2>
                  <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate hidden min-[400px]:block">
                    {{ module.description }}
                  </p>
                  <div class="hidden sm:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <UIcon name="i-lucide-clock" class="w-3 h-3" />
                    {{ formatDuration(getModuleStats(module.id).duration) }}
                  </div>
                </div>

                <!-- Stats et chevron -->
                <div class="flex items-center gap-1.5 sm:gap-4 shrink-0">
                  <!-- Barre de progression mini (desktop) -->
                  <div class="hidden sm:flex items-center gap-2 min-w-[100px]">
                    <div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-nuxy-green rounded-full transition-all duration-500"
                        :style="{ width: `${getModuleStats(module.id).percentage}%` }"
                      />
                    </div>
                    <span class="text-xs font-medium text-gray-600 dark:text-gray-400 tabular-nums w-7">
                      {{ getModuleStats(module.id).percentage }}%
                    </span>
                  </div>

                  <!-- Stats compactes (mobile) -->
                  <span class="sm:hidden text-[11px] font-medium text-gray-500 dark:text-gray-400 tabular-nums bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                    {{ getModuleStats(module.id).completed }}/{{ getModuleStats(module.id).total }}
                  </span>

                  <!-- Chevron -->
                  <UIcon
                    name="i-lucide-chevron-down"
                    class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 shrink-0"
                    :class="{ '-rotate-180': !isModuleCollapsed(module.id) }"
                  />
                </div>
              </button>

              <!-- Grille d'exercices (collapsible) -->
              <Transition
                enter-active-class="transition-all duration-300 ease-out overflow-hidden"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-[1000px]"
                leave-active-class="transition-all duration-200 ease-in overflow-hidden"
                leave-from-class="opacity-100 max-h-[1000px]"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-show="!isModuleCollapsed(module.id)">
                  <div class="px-3 sm:px-5 pb-4 sm:pb-5 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800">
                    <!-- Durée du module (mobile) -->
                    <div class="sm:hidden flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2.5">
                      <UIcon name="i-lucide-clock" class="w-3 h-3" />
                      <span>{{ formatDuration(getModuleStats(module.id).duration) }} estimé</span>
                    </div>

                    <div class="flex flex-wrap gap-1.5 sm:gap-2">
                      <!-- Module 1 : lien vers la page Bienvenue en premier -->
                      <UTooltip
                        v-if="module.id === 1"
                        text="Bienvenue sur Nuxy"
                        :popper="{ placement: 'top' }"
                      >
                        <NuxtLink to="/welcome" class="block touch-manipulation">
                          <div
                            class="w-9 h-9 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                            :class="welcomeVisited ? 'bg-nuxy-green hover:bg-nuxy-green-dark' : 'bg-nuxy-teal hover:bg-nuxy-teal-dark'"
                          >
                            <UIcon name="i-lucide-book-open" class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                        </NuxtLink>
                      </UTooltip>

                      <UTooltip
                        v-for="exercise in getExercisesByModule(exercises || [], module.id)"
                        :key="exercise.id"
                        :text="`${exercise.exerciseNumber} — ${exercise.title}`"
                        :popper="{ placement: 'top' }"
                      >
                        <NuxtLink
                          :to="exercise.path"
                          class="block touch-manipulation"
                        >
                          <!-- Intro : icône livre, toujours verte -->
                          <div
                            v-if="exercise.exerciseType === 'intro'"
                            class="w-9 h-9 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95 bg-nuxy-teal hover:bg-nuxy-teal-dark"
                          >
                            <UIcon name="i-lucide-book-open" class="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>

                          <!-- Exercice normal : carré avec statut -->
                          <div
                            v-else
                            class="w-9 h-9 min-[400px]:w-10 min-[400px]:h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                            :class="getStatusColor(getExerciseStatus(exercise.id), isNextExercise(exercise.id))"
                          >
                            <!-- Icône de statut ou numéro -->
                            <UIcon
                              v-if="getStatusIcon(getExerciseStatus(exercise.id))"
                              :name="getStatusIcon(getExerciseStatus(exercise.id))!"
                              class="w-4 h-4 sm:w-5 sm:h-5"
                              :class="getExerciseStatus(exercise.id) === 'completed' ? 'text-white' : 'text-nuxy-black'"
                            />
                            <span
                              v-else
                              class="text-xs font-semibold"
                              :class="isNextExercise(exercise.id) ? 'text-white' : 'text-gray-500 dark:text-gray-400'"
                            >
                              {{ exercise.exerciseNumber.split('.')[1] }}
                            </span>
                          </div>
                        </NuxtLink>
                      </UTooltip>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            </template>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<style scoped>
/* Cacher la scrollbar sur les tabs mobiles */
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

/* Safe area pour les appareils avec encoche */
.safe-area-x {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Désactiver le highlight bleu sur tap iOS/Android */
.touch-manipulation {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* Animation pulse plus subtile sur mobile */
@media (max-width: 640px) {
  .animate-pulse {
    animation-duration: 2.5s;
  }
}
</style>
