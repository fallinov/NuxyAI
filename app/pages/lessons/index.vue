<script setup lang="ts">
/**
 * Page catalogue des leçons - Navigation par phases et modules
 *
 * Structure :
 * - Bandeau "Continuer" avec la prochaine leçon
 * - Progression globale
 * - Leçons groupées par Phase > Module
 * - Modules repliables avec barre de progression
 * - Cartes de leçons avec type, durée et statut
 */

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Toutes les leçons - NuxyAI',
  description: '2 phases, 7 modules, 18h de formation. Apprends à coder avec l\'IA, à ton rythme.'
})

const { isAuthenticated } = useAuth()
const { lessons, loadLessons, getPhasesWithModules } = useLessonsList()
const { progress, stats, getLessonStatus } = useLessonSupabaseProgress()

// État de chargement
const isLoading = ref(true)

await loadLessons()

onMounted(() => {
  isLoading.value = false
})

// Phases avec modules et leçons
const phases = computed(() => getPhasesWithModules())

// État des modules repliés (par défaut tous dépliés)
const collapsedModules = ref<Set<number>>(new Set())

const toggleModule = (moduleNumber: number) => {
  if (collapsedModules.value.has(moduleNumber)) {
    collapsedModules.value.delete(moduleNumber)
  } else {
    collapsedModules.value.add(moduleNumber)
  }
}

const isModuleCollapsed = (moduleNumber: number) => collapsedModules.value.has(moduleNumber)

// Stats de progression par module
const getModuleStats = (moduleNumber: number) => {
  const moduleLessons = lessons.value.filter(l => l.module === moduleNumber)
  const completed = moduleLessons.filter(l => {
    const status = progress.value.lessons[l.slug]?.status
    return status === 'completed'
  }).length
  const inProgress = moduleLessons.filter(l => {
    const status = progress.value.lessons[l.slug]?.status
    return status === 'in-progress'
  }).length
  const totalDuration = moduleLessons.reduce((sum, l) => sum + (l.duration || 5), 0)

  return {
    total: moduleLessons.length,
    completed,
    inProgress,
    percentage: moduleLessons.length > 0 ? Math.round((completed / moduleLessons.length) * 100) : 0,
    duration: totalDuration
  }
}

// Formater la durée
const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (mins === 0) return `${hours}h`
  return `${hours}h${mins}`
}

// Obtenir le statut d'une leçon (sync depuis localStorage)
const getLessonStatusLocal = (slug: string): 'not-started' | 'in-progress' | 'completed' => {
  return progress.value.lessons[slug]?.status || 'not-started'
}

// Trouver la prochaine leçon à faire
const nextLesson = computed(() => {
  if (!lessons.value) return null
  // D'abord une leçon "in-progress"
  const inProgressLesson = lessons.value.find(l => getLessonStatusLocal(l.slug) === 'in-progress')
  if (inProgressLesson) return inProgressLesson
  // Sinon la première "not-started"
  return lessons.value.find(l => getLessonStatusLocal(l.slug) === 'not-started') || null
})

// Stats globales
const globalStats = computed(() => {
  const total = lessons.value.length
  const completed = lessons.value.filter(l => getLessonStatusLocal(l.slug) === 'completed').length
  const totalDuration = lessons.value.reduce((sum, l) => sum + (l.duration || 5), 0)
  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    duration: totalDuration
  }
})

// Badge pour le type de leçon
const getTypeBadge = (type: string) => {
  switch (type) {
    case 'guide':
      return { label: 'Guide', icon: 'i-lucide-book-open', color: 'bg-nuxy-teal/10 text-nuxy-teal' }
    case 'exercise':
      return { label: 'Exercice', icon: 'i-lucide-code', color: 'bg-nuxy-green/10 text-nuxy-green' }
    case 'quiz':
      return { label: 'Quiz', icon: 'i-lucide-brain', color: 'bg-nuxy-purple/10 text-nuxy-purple dark:text-nuxy-pink' }
    case 'project':
      return { label: 'Projet', icon: 'i-lucide-folder-open', color: 'bg-nuxy-gold/10 text-nuxy-gold-dark' }
    default:
      return { label: type, icon: 'i-lucide-file', color: 'bg-gray-100 text-gray-600' }
  }
}

// Couleur du statut
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'completed':
      return 'border-nuxy-green/30 bg-nuxy-green/5'
    case 'in-progress':
      return 'border-nuxy-gold/30 bg-nuxy-gold/5'
    default:
      return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return { name: 'i-lucide-check-circle', class: 'text-nuxy-green' }
    case 'in-progress':
      return { name: 'i-lucide-clock', class: 'text-nuxy-gold' }
    default:
      return null
  }
}

// Couleur de la phase
const getPhaseColor = (phaseNumber: number) => {
  return phaseNumber === 1
    ? { bg: 'bg-nuxy-green/10', text: 'text-nuxy-green', border: 'border-nuxy-green/20' }
    : { bg: 'bg-nuxy-teal/10', text: 'text-nuxy-teal', border: 'border-nuxy-teal/20' }
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Header avec CTA "Continuer" -->
    <section class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <UContainer class="py-6 lg:py-8">
        <!-- Bandeau "Continuer" -->
        <div
          v-if="nextLesson"
          class="mb-5 p-3 sm:p-4 bg-nuxy-green/10 dark:bg-nuxy-green/20 border border-nuxy-green/30 rounded-xl"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <div class="flex items-center justify-center w-10 h-10 bg-nuxy-green rounded-full shrink-0">
                <UIcon name="i-lucide-play" class="w-5 h-5 text-white" />
              </div>
              <div class="min-w-0">
                <p class="text-xs sm:text-sm text-nuxy-green-dark dark:text-nuxy-green font-medium">
                  {{ getLessonStatusLocal(nextLesson.slug) === 'in-progress' ? 'Reprends où tu en étais' : 'Prochaine leçon' }}
                </p>
                <p class="font-semibold text-gray-900 dark:text-white truncate">
                  {{ nextLesson.lessonNumber }} — {{ nextLesson.title }}
                </p>
              </div>
            </div>
            <UButton
              :to="nextLesson.path"
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
              Toutes les leçons
            </h1>
            <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {{ globalStats.total }} leçons · 7 modules · {{ formatDuration(globalStats.duration) }}
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

        <!-- Légende -->
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
        </div>
      </UContainer>
    </section>

    <!-- Contenu principal -->
    <section class="py-6 lg:py-8">
      <UContainer>
        <div class="space-y-8">
          <!-- Skeleton loading -->
          <div v-if="isLoading" class="space-y-6">
            <div v-for="i in 3" :key="i" class="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          </div>

          <!-- Phases et modules -->
          <template v-else>
            <div v-for="phase in phases" :key="phase.number" class="space-y-4">
              <!-- En-tête de phase -->
              <div
                class="flex items-center gap-3 px-4 py-3 rounded-xl"
                :class="[getPhaseColor(phase.number).bg, getPhaseColor(phase.number).border, 'border']"
              >
                <UIcon
                  :name="phase.number === 1 ? 'i-lucide-wrench' : 'i-lucide-rocket'"
                  class="w-5 h-5"
                  :class="getPhaseColor(phase.number).text"
                />
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">
                  Phase {{ phase.number }} : {{ phase.title }}
                </h2>
              </div>

              <!-- Modules de la phase -->
              <div class="space-y-3 pl-2 sm:pl-4">
                <div
                  v-for="mod in phase.modules"
                  :key="mod.number"
                  class="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                >
                  <!-- En-tête du module (cliquable pour replier) -->
                  <button
                    class="w-full px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-2.5 sm:gap-4 text-left hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                    @click="toggleModule(mod.number)"
                  >
                    <!-- Icône -->
                    <div class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-nuxy-green/20 dark:bg-nuxy-green/30 rounded-lg shrink-0">
                      <UIcon :name="mod.icon" class="w-4 h-4 sm:w-5 sm:h-5 text-nuxy-green-dark dark:text-nuxy-green" />
                    </div>

                    <!-- Titre et description -->
                    <div class="flex-1 min-w-0">
                      <h3 class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                        Module {{ mod.number }} : {{ mod.title }}
                      </h3>
                      <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        <span>{{ mod.lessons.length }} leçons</span>
                        <span>·</span>
                        <span>{{ formatDuration(getModuleStats(mod.number).duration) }}</span>
                      </div>
                    </div>

                    <!-- Stats et chevron -->
                    <div class="flex items-center gap-1.5 sm:gap-4 shrink-0">
                      <!-- Barre de progression (desktop) -->
                      <div class="hidden sm:flex items-center gap-2 min-w-[100px]">
                        <div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-nuxy-green rounded-full transition-all duration-500"
                            :style="{ width: `${getModuleStats(mod.number).percentage}%` }"
                          />
                        </div>
                        <span class="text-xs font-medium text-gray-600 dark:text-gray-400 tabular-nums w-7">
                          {{ getModuleStats(mod.number).percentage }}%
                        </span>
                      </div>

                      <!-- Stats compactes (mobile) -->
                      <span class="sm:hidden text-[11px] font-medium text-gray-500 dark:text-gray-400 tabular-nums bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                        {{ getModuleStats(mod.number).completed }}/{{ getModuleStats(mod.number).total }}
                      </span>

                      <!-- Chevron -->
                      <UIcon
                        name="i-lucide-chevron-down"
                        class="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-200 shrink-0"
                        :class="{ '-rotate-180': !isModuleCollapsed(mod.number) }"
                      />
                    </div>
                  </button>

                  <!-- Liste des leçons (collapsible) -->
                  <Transition
                    enter-active-class="transition-all duration-300 ease-out overflow-hidden"
                    enter-from-class="opacity-0 max-h-0"
                    enter-to-class="opacity-100 max-h-[2000px]"
                    leave-active-class="transition-all duration-200 ease-in overflow-hidden"
                    leave-from-class="opacity-100 max-h-[2000px]"
                    leave-to-class="opacity-0 max-h-0"
                  >
                    <div v-show="!isModuleCollapsed(mod.number)">
                      <div class="px-3 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-gray-200 dark:border-gray-800 space-y-2">
                        <NuxtLink
                          v-for="lesson in mod.lessons"
                          :key="lesson.slug"
                          :to="lesson.path"
                          class="block p-3 rounded-lg border transition-all duration-200 hover:shadow-sm active:scale-[0.99]"
                          :class="getStatusStyle(getLessonStatusLocal(lesson.slug))"
                        >
                          <div class="flex items-center gap-3">
                            <!-- Icône de statut -->
                            <div class="shrink-0">
                              <div
                                v-if="getStatusIcon(getLessonStatusLocal(lesson.slug))"
                                class="w-8 h-8 flex items-center justify-center"
                              >
                                <UIcon
                                  :name="getStatusIcon(getLessonStatusLocal(lesson.slug))!.name"
                                  class="w-5 h-5"
                                  :class="getStatusIcon(getLessonStatusLocal(lesson.slug))!.class"
                                />
                              </div>
                              <div v-else class="w-8 h-8 flex items-center justify-center">
                                <div class="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                              </div>
                            </div>

                            <!-- Contenu -->
                            <div class="flex-1 min-w-0">
                              <div class="flex items-center gap-2 flex-wrap">
                                <span class="text-xs text-gray-500 dark:text-gray-400 tabular-nums">{{ lesson.lessonNumber }}</span>
                                <h4 class="font-medium text-sm text-gray-900 dark:text-white truncate">
                                  {{ lesson.title }}
                                </h4>
                              </div>
                              <div class="flex items-center gap-2 mt-1">
                                <!-- Badge type -->
                                <span
                                  class="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded-full"
                                  :class="getTypeBadge(lesson.type).color"
                                >
                                  <UIcon :name="getTypeBadge(lesson.type).icon" class="w-3 h-3" />
                                  {{ getTypeBadge(lesson.type).label }}
                                </span>
                                <!-- Durée -->
                                <span class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <UIcon name="i-lucide-clock" class="w-3 h-3" />
                                  {{ lesson.duration }} min
                                </span>
                              </div>
                            </div>

                            <!-- Flèche -->
                            <UIcon name="i-lucide-chevron-right" class="w-4 h-4 text-gray-400 shrink-0" />
                          </div>
                        </NuxtLink>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Footer info -->
        <div v-if="isAuthenticated" class="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center">
          <UIcon name="i-lucide-cloud-check" class="w-4 h-4 text-nuxy-green" />
          <span>Ta progression est sauvegardée</span>
        </div>
      </UContainer>
    </section>
  </div>
</template>
