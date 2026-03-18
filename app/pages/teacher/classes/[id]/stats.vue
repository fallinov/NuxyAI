<script setup lang="ts">
/**
 * Page statistiques détaillées d'une classe.
 * 4 sections : Vue d'ensemble, Progression, Erreurs, Environnement technique.
 */

import type { StudentProgressData } from '~/composables/useClasses'
import type { ExerciseError } from '~/types/database.types'

definePageMeta({
  layout: 'default',
  middleware: 'teacher'
})

const route = useRoute()
const classId = route.params.id as string

const {
  currentClass,
  loadClassWithMembers,
  getClassProgress,
  getClassErrors
} = useClasses()

const { exercises, loadExercises } = useExercisesList()

// Charger les données
await loadClassWithMembers(classId)
await loadExercises()

if (!currentClass.value) {
  throw createError({ statusCode: 404, message: 'Classe non trouvée' })
}

useSeoMeta({
  title: `Statistiques - ${currentClass.value?.name || 'Classe'} - Nuxy`
})

const studentsProgress = ref<StudentProgressData[]>([])
const classErrors = ref<ExerciseError[]>([])
const isLoading = ref(true)

const loadData = async () => {
  isLoading.value = true
  const [progress, errors] = await Promise.all([
    getClassProgress(classId),
    getClassErrors(classId)
  ])
  studentsProgress.value = progress
  classErrors.value = errors
  isLoading.value = false
}

await loadData()

// Refs réactives pour le composable
const studentsRef = computed(() => studentsProgress.value)
const exercisesRef = computed(() => exercises.value)
const errorsRef = computed(() => classErrors.value)

const {
  // Vue d'ensemble
  overviewCards,
  topStudents,
  strugglingStudents,
  // Progression & Complétion
  completionByModuleData,
  weeklyProgressData,
  attemptsDistributionData,
  solutionViewRateData,
  // Erreurs & Difficultés
  errorTypesData,
  difficultExercisesData,
  topFrequentErrors,
  successFailureData,
  // Environnement
  browserData,
  osData,
  deviceData,
  activityHeatmapData,
  // Existants (réutilisés)
  avgAttemptsData,
  avgTimeData
} = useClassAnalytics(studentsRef, exercisesRef, errorsRef)

const hasData = computed(() => studentsProgress.value.length > 0)

// Navigation par ancres
const sections = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: 'i-lucide-layout-dashboard' },
  { id: 'progression', label: 'Progression', icon: 'i-lucide-trending-up' },
  { id: 'errors', label: 'Erreurs', icon: 'i-lucide-bug' },
  { id: 'environment', label: 'Environnement', icon: 'i-lucide-monitor' }
]

const activeSection = ref('overview')

function scrollToSection(id: string) {
  activeSection.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Formate un nombre de minutes en durée lisible */
function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

/** Formate une date relative */
function formatRelativeDate(dateStr: string | null): string {
  if (!dateStr) return 'Jamais'
  const date = new Date(dateStr)
  const now = Date.now()
  const diffDays = Math.floor((now - date.getTime()) / (24 * 60 * 60 * 1000))
  if (diffDays === 0) return 'Aujourd\'hui'
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`
  return `Il y a ${Math.floor(diffDays / 30)} mois`
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="px-4 lg:px-8 max-w-screen-2xl mx-auto">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <UBreadcrumb
          :items="[
            { label: 'Mes classes', to: '/teacher' },
            { label: currentClass?.name || 'Classe', to: `/teacher/classes/${classId}` },
            { label: 'Statistiques' }
          ]"
        />
      </nav>

      <!-- En-tête -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Statistiques
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-1">
            {{ currentClass?.name }}
          </p>
        </div>
        <UButton
          icon="i-lucide-arrow-left"
          variant="outline"
          :to="`/teacher/classes/${classId}`"
        >
          Retour à la classe
        </UButton>
      </div>

      <!-- État vide -->
      <UCard v-if="!hasData" class="text-center py-12">
        <UIcon name="i-lucide-bar-chart-3" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Pas encore de données
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Les statistiques apparaîtront quand tes élèves commenceront à coder.
        </p>
      </UCard>

      <template v-else>
        <!-- Navigation par sections -->
        <div class="flex flex-wrap gap-2 mb-8 sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 py-3 -mx-4 px-4 border-b border-gray-200 dark:border-gray-700">
          <UButton
            v-for="section in sections"
            :key="section.id"
            :icon="section.icon"
            :variant="activeSection === section.id ? 'solid' : 'ghost'"
            :color="activeSection === section.id ? 'primary' : 'neutral'"
            size="sm"
            @click="scrollToSection(section.id)"
          >
            {{ section.label }}
          </UButton>
        </div>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 1 : Vue d'ensemble
             ═══════════════════════════════════════════════════════════ -->
        <section id="overview" class="mb-12 scroll-mt-20">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <UIcon name="i-lucide-layout-dashboard" class="w-5 h-5 text-nuxy-teal" />
            Vue d'ensemble
          </h2>

          <!-- Cartes résumé -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <UCard>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {{ overviewCards.activeStudents }}<span class="text-lg text-gray-400">/{{ overviewCards.totalStudents }}</span>
                </div>
                <div class="text-sm text-gray-500 mt-1">Élèves actifs</div>
                <div class="text-xs text-gray-400">(7 derniers jours)</div>
              </div>
            </UCard>

            <UCard>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600 dark:text-green-400">
                  {{ overviewCards.completionRate }}%
                </div>
                <div class="text-sm text-gray-500 mt-1">Taux de complétion</div>
              </div>
            </UCard>

            <UCard>
              <div class="text-center">
                <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {{ overviewCards.avgAttempts }}
                </div>
                <div class="text-sm text-gray-500 mt-1">Tentatives moy.</div>
              </div>
            </UCard>

            <UCard>
              <div class="text-center">
                <div class="text-3xl font-bold text-nuxy-purple dark:text-nuxy-lavender">
                  {{ overviewCards.solutionViewRate }}%
                </div>
                <div class="text-sm text-gray-500 mt-1">Solutions consultées</div>
              </div>
            </UCard>
          </div>

          <!-- Tableaux Top / En difficulté -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Top 5 meilleurs élèves -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-trophy" class="w-4 h-4 text-nuxy-gold" />
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Top 5 meilleurs élèves</h3>
                </div>
              </template>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th class="text-left py-2 px-2 font-medium text-gray-500">#</th>
                      <th class="text-left py-2 px-2 font-medium text-gray-500">Élève</th>
                      <th class="text-center py-2 px-2 font-medium text-gray-500">Complétés</th>
                      <th class="text-center py-2 px-2 font-medium text-gray-500">Tent. moy.</th>
                      <th class="text-center py-2 px-2 font-medium text-gray-500">Temps</th>
                      <th class="text-center py-2 px-2 font-medium text-gray-500">Solutions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(student, idx) in topStudents"
                      :key="student.email"
                      class="border-b border-gray-100 dark:border-gray-700/50"
                    >
                      <td class="py-2 px-2 font-medium text-gray-400">{{ idx + 1 }}</td>
                      <td class="py-2 px-2">
                        <div class="font-medium text-gray-900 dark:text-white truncate max-w-[140px]">{{ student.name }}</div>
                      </td>
                      <td class="py-2 px-2 text-center font-semibold text-green-600 dark:text-green-400">
                        {{ student.completed }}
                      </td>
                      <td class="py-2 px-2 text-center text-gray-600 dark:text-gray-400">
                        {{ student.avgAttempts }}
                      </td>
                      <td class="py-2 px-2 text-center text-gray-600 dark:text-gray-400">
                        {{ formatDuration(student.totalTime) }}
                      </td>
                      <td class="py-2 px-2 text-center text-gray-600 dark:text-gray-400">
                        {{ student.solutionsViewed }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="topStudents.length === 0" class="text-center text-gray-400 py-4 text-sm">
                Pas encore de données
              </div>
            </UCard>

            <!-- 5 élèves en difficulté -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-heart-handshake" class="w-4 h-4 text-nuxy-pink" />
                  <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Élèves à accompagner</h3>
                </div>
              </template>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th class="text-left py-2 px-2 font-medium text-gray-500">#</th>
                      <th class="text-left py-2 px-2 font-medium text-gray-500">Élève</th>
                      <th class="text-center py-2 px-2 font-medium text-gray-500">Complétés</th>
                      <th class="text-center py-2 px-2 font-medium text-gray-500">Erreurs</th>
                      <th class="text-center py-2 px-2 font-medium text-gray-500">Dernière activité</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(student, idx) in strugglingStudents"
                      :key="student.email"
                      class="border-b border-gray-100 dark:border-gray-700/50"
                    >
                      <td class="py-2 px-2 font-medium text-gray-400">{{ idx + 1 }}</td>
                      <td class="py-2 px-2">
                        <div class="font-medium text-gray-900 dark:text-white truncate max-w-[140px]">{{ student.name }}</div>
                      </td>
                      <td class="py-2 px-2 text-center text-gray-600 dark:text-gray-400">
                        {{ student.completed }}
                      </td>
                      <td class="py-2 px-2 text-center font-semibold text-red-600 dark:text-red-400">
                        {{ student.totalErrors }}
                      </td>
                      <td class="py-2 px-2 text-center">
                        <span :class="student.inactiveDays > 7 ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'">
                          {{ formatRelativeDate(student.lastActivity) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="strugglingStudents.length === 0" class="text-center text-gray-400 py-4 text-sm">
                Pas encore de données
              </div>
            </UCard>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 2 : Progression & Complétion
             ═══════════════════════════════════════════════════════════ -->
        <section id="progression" class="mb-12 scroll-mt-20">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <UIcon name="i-lucide-trending-up" class="w-5 h-5 text-nuxy-green" />
            Progression & Complétion
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Complétion par module -->
            <UCard v-if="completionByModuleData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Complétion par module</h3>
              </template>
              <ClientOnly>
                <TeacherChartsBarChart
                  :labels="completionByModuleData.labels"
                  :data="completionByModuleData.data"
                  :colors="completionByModuleData.colors"
                  y-label="% complété"
                />
                <template #fallback>
                  <div class="h-72"><USkeleton class="w-full h-full" /></div>
                </template>
              </ClientOnly>
            </UCard>

            <!-- Progression temporelle -->
            <UCard v-if="weeklyProgressData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Progression par semaine</h3>
              </template>
              <ClientOnly>
                <TeacherChartsLineChart
                  :labels="weeklyProgressData.labels"
                  :data="weeklyProgressData.data"
                  y-label="Exercices complétés"
                  :fill="true"
                />
                <template #fallback>
                  <div class="h-72"><USkeleton class="w-full h-full" /></div>
                </template>
              </ClientOnly>
            </UCard>

            <!-- Distribution des tentatives -->
            <UCard v-if="attemptsDistributionData.data.some(d => d > 0)">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Distribution des tentatives</h3>
              </template>
              <ClientOnly>
                <TeacherChartsBarChart
                  :labels="attemptsDistributionData.labels"
                  :data="attemptsDistributionData.data"
                  :colors="attemptsDistributionData.colors"
                  y-label="Nombre d'élèves"
                  x-label="Tentatives totales"
                />
                <template #fallback>
                  <div class="h-72"><USkeleton class="w-full h-full" /></div>
                </template>
              </ClientOnly>
            </UCard>

            <!-- Consultation des solutions -->
            <UCard v-if="solutionViewRateData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Consultation des solutions</h3>
              </template>
              <ClientOnly>
                <TeacherChartsHorizontalBarChart
                  :labels="solutionViewRateData.labels"
                  :data="solutionViewRateData.data"
                  :colors="solutionViewRateData.colors"
                  x-label="% d'élèves ayant vu la solution"
                />
                <template #fallback>
                  <div class="h-72"><USkeleton class="w-full h-full" /></div>
                </template>
              </ClientOnly>
            </UCard>

            <!-- Tentatives moyennes -->
            <UCard v-if="avgAttemptsData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Tentatives moyennes par exercice</h3>
              </template>
              <ClientOnly>
                <TeacherChartsBarChart
                  :labels="avgAttemptsData.labels"
                  :data="avgAttemptsData.data"
                  :colors="avgAttemptsData.colors"
                  y-label="Tentatives"
                  x-label="Exercice"
                />
                <template #fallback>
                  <div class="h-72"><USkeleton class="w-full h-full" /></div>
                </template>
              </ClientOnly>
            </UCard>

            <!-- Temps moyen -->
            <UCard v-if="avgTimeData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Temps moyen par exercice</h3>
              </template>
              <ClientOnly>
                <TeacherChartsBarChart
                  :labels="avgTimeData.labels"
                  :data="avgTimeData.data"
                  :colors="avgTimeData.colors"
                  y-label="Minutes"
                  x-label="Exercice"
                />
                <template #fallback>
                  <div class="h-72"><USkeleton class="w-full h-full" /></div>
                </template>
              </ClientOnly>
            </UCard>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 3 : Erreurs & Difficultés
             ═══════════════════════════════════════════════════════════ -->
        <section id="errors" class="mb-12 scroll-mt-20">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <UIcon name="i-lucide-bug" class="w-5 h-5 text-red-500" />
            Erreurs & Difficultés
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Types d'erreurs (Doughnut) -->
            <UCard v-if="errorTypesData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Types d'erreurs</h3>
              </template>
              <ClientOnly>
                <TeacherChartsDoughnutChart
                  :labels="errorTypesData.labels"
                  :data="errorTypesData.data"
                  :colors="errorTypesData.colors"
                />
                <template #fallback>
                  <div class="h-64 flex items-center justify-center">
                    <USkeleton class="w-40 h-40 rounded-full" />
                  </div>
                </template>
              </ClientOnly>
            </UCard>

            <!-- Exercices les plus difficiles -->
            <UCard v-if="difficultExercisesData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Exercices les plus difficiles</h3>
              </template>
              <ClientOnly>
                <TeacherChartsHorizontalBarChart
                  :labels="difficultExercisesData.labels"
                  :data="difficultExercisesData.data"
                  :colors="difficultExercisesData.colors"
                  x-label="Score de difficulté"
                />
                <template #fallback>
                  <div class="h-80"><USkeleton class="w-full h-full" /></div>
                </template>
              </ClientOnly>
            </UCard>

            <!-- Top 5 erreurs fréquentes (Tableau) -->
            <UCard v-if="topFrequentErrors.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Erreurs les plus fréquentes</h3>
              </template>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b border-gray-200 dark:border-gray-700">
                      <th class="text-left py-2 px-2 font-medium text-gray-500">Type</th>
                      <th class="text-left py-2 px-2 font-medium text-gray-500">Message</th>
                      <th class="text-center py-2 px-2 font-medium text-gray-500">Occurrences</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(err, idx) in topFrequentErrors"
                      :key="idx"
                      class="border-b border-gray-100 dark:border-gray-700/50"
                    >
                      <td class="py-2 px-2">
                        <UBadge color="red" variant="subtle" size="xs">{{ err.type }}</UBadge>
                      </td>
                      <td class="py-2 px-2 text-gray-600 dark:text-gray-400 truncate max-w-[250px]" :title="err.message">
                        {{ err.message }}
                      </td>
                      <td class="py-2 px-2 text-center font-semibold text-gray-900 dark:text-white">
                        {{ err.count }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </UCard>

            <!-- Ratio réussite/échec (Stacked Bar) -->
            <UCard v-if="successFailureData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Ratio réussites / erreurs</h3>
              </template>
              <ClientOnly>
                <TeacherChartsStackedBarChart
                  :labels="successFailureData.labels"
                  :datasets="successFailureData.datasets"
                  y-label="Exécutions"
                  x-label="Exercice"
                />
                <template #fallback>
                  <div class="h-72"><USkeleton class="w-full h-full" /></div>
                </template>
              </ClientOnly>
            </UCard>
          </div>
        </section>

        <!-- ═══════════════════════════════════════════════════════════
             SECTION 4 : Environnement technique
             ═══════════════════════════════════════════════════════════ -->
        <section id="environment" class="mb-12 scroll-mt-20">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <UIcon name="i-lucide-monitor" class="w-5 h-5 text-nuxy-teal" />
            Environnement technique
          </h2>

          <!-- Doughnuts : Navigateurs, OS, Appareils -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <UCard v-if="browserData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Navigateurs</h3>
              </template>
              <ClientOnly>
                <TeacherChartsDoughnutChart
                  :labels="browserData.labels"
                  :data="browserData.data"
                  :colors="browserData.colors"
                />
                <template #fallback>
                  <div class="h-64 flex items-center justify-center">
                    <USkeleton class="w-40 h-40 rounded-full" />
                  </div>
                </template>
              </ClientOnly>
            </UCard>

            <UCard v-if="osData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Systèmes d'exploitation</h3>
              </template>
              <ClientOnly>
                <TeacherChartsDoughnutChart
                  :labels="osData.labels"
                  :data="osData.data"
                  :colors="osData.colors"
                />
                <template #fallback>
                  <div class="h-64 flex items-center justify-center">
                    <USkeleton class="w-40 h-40 rounded-full" />
                  </div>
                </template>
              </ClientOnly>
            </UCard>

            <UCard v-if="deviceData.labels.length > 0">
              <template #header>
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Types d'appareil</h3>
              </template>
              <ClientOnly>
                <TeacherChartsDoughnutChart
                  :labels="deviceData.labels"
                  :data="deviceData.data"
                  :colors="deviceData.colors"
                />
                <template #fallback>
                  <div class="h-64 flex items-center justify-center">
                    <USkeleton class="w-40 h-40 rounded-full" />
                  </div>
                </template>
              </ClientOnly>
            </UCard>
          </div>

          <!-- Heatmap d'activité -->
          <UCard v-if="activityHeatmapData.length > 0">
            <template #header>
              <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Activité par jour et heure</h3>
            </template>
            <TeacherChartsHeatmapChart :data="activityHeatmapData" />
          </UCard>
        </section>
      </template>
    </div>
  </div>
</template>
