<script setup lang="ts">
/**
 * Détail d'une classe - Dashboard enseignant
 *
 * - Infos classe (nom, description, lien invitation)
 * - Liste des élèves inscrits
 * - Tableau de progression temps réel
 */

import type { StudentProgressData } from '~/composables/useClasses'
import type { ExerciseProgress, ExerciseError } from '~/types/database.types'

definePageMeta({
  layout: 'default',
  middleware: 'teacher'
})

const route = useRoute()
const toast = useToast()
const classId = route.params.id as string

const {
  currentClass,
  loadClassWithMembers,
  removeStudent,
  regenerateInviteCode,
  getClassProgress,
  getClassStatistics,
  getStudentExerciseErrors,
  subscribeToProgress,
  unsubscribeFromProgress,
  getInviteUrl,
  isLoading
} = useClasses()

const { exercises, loadExercises } = useExercisesList()

// États
const studentsProgress = ref<StudentProgressData[]>([])
const statistics = ref<any>(null)
const showRemoveConfirm = ref<string | null>(null)

// État de la modal de visualisation du code
const showCodeModal = ref(false)
const selectedStudentName = ref('')
const selectedExerciseTitle = ref('')
const selectedProgress = ref<ExerciseProgress | null>(null)
const selectedErrors = ref<ExerciseError[]>([])
const isLoadingErrors = ref(false)

// Charger les données
await loadClassWithMembers(classId)
await loadExercises()

if (!currentClass.value) {
  throw createError({
    statusCode: 404,
    message: 'Classe non trouvée'
  })
}

// SEO
useSeoMeta({
  title: `${currentClass.value?.name || 'Classe'} - Nuxy`
})

// Charger la progression et les stats
const loadData = async () => {
  const [progress, stats] = await Promise.all([
    getClassProgress(classId),
    getClassStatistics(classId)
  ])
  studentsProgress.value = progress
  statistics.value = stats
}

await loadData()

// S'abonner aux mises à jour temps réel
onMounted(() => {
  subscribeToProgress(classId, async (payload) => {
    // Recharger les données quand il y a une mise à jour
    await loadData()
  })
})

onUnmounted(() => {
  unsubscribeFromProgress()
})

// Copier le lien d'invitation
const copyInviteLink = async () => {
  if (!currentClass.value) return
  const url = getInviteUrl(currentClass.value.invite_code)
  await navigator.clipboard.writeText(url)
  toast.add({
    title: 'Lien copié !',
    color: 'green',
    timeout: 2000
  })
}

// Régénérer le code d'invitation
const handleRegenerateCode = async () => {
  if (!confirm('Régénérer le code ? Les anciens liens ne fonctionneront plus.')) return

  const newCode = await regenerateInviteCode(classId)
  if (newCode) {
    toast.add({
      title: 'Code régénéré',
      description: `Nouveau code : ${newCode}`,
      color: 'green',
      timeout: 3000
    })
  }
}

// Retirer un élève
const handleRemoveStudent = async (studentId: string) => {
  const success = await removeStudent(classId, studentId)
  showRemoveConfirm.value = null

  if (success) {
    toast.add({
      title: 'Élève retiré',
      color: 'green',
      timeout: 2000
    })
    await loadData()
  } else {
    toast.add({
      title: 'Erreur',
      description: 'Impossible de retirer l\'élève.',
      color: 'red',
      timeout: 5000
    })
  }
}

// Helper pour obtenir le statut d'un exercice pour un élève
const getStudentExerciseStatus = (student: StudentProgressData, exerciseSlug: string) => {
  const progress = student.progress.find(p => p.exercise_slug === exerciseSlug)
  return progress?.status || 'not-started'
}

// Helper pour obtenir le nombre de tentatives
const getStudentAttempts = (student: StudentProgressData, exerciseSlug: string) => {
  const progress = student.progress.find(p => p.exercise_slug === exerciseSlug)
  return progress?.attempts || 0
}

// Couleurs pour les statuts
const statusColors: Record<string, string> = {
  'completed': 'bg-green-500',
  'in-progress': 'bg-orange-500',
  'not-started': 'bg-gray-300 dark:bg-gray-600'
}

const statusIcons: Record<string, string> = {
  'completed': 'i-lucide-check',
  'in-progress': 'i-lucide-play',
  'not-started': ''
}

// Ouvrir la modal avec les détails complets d'un exercice
const handleCellClick = async (student: StudentProgressData, exercise: any) => {
  const progress = student.progress.find(p => p.exercise_slug === exercise.id)

  // On peut ouvrir même sans code (pour voir les stats)
  selectedStudentName.value = student.full_name || student.email
  selectedExerciseTitle.value = exercise.title
  selectedProgress.value = progress || null
  selectedErrors.value = []
  showCodeModal.value = true

  // Charger les erreurs en arrière-plan
  if (progress) {
    isLoadingErrors.value = true
    try {
      selectedErrors.value = await getStudentExerciseErrors(student.id, exercise.id)
    } catch (err) {
      console.error('Erreur lors du chargement des erreurs:', err)
    } finally {
      isLoadingErrors.value = false
    }
  }
}

// Vérifie si une cellule a du code sauvegardé
const hasSavedCode = (student: StudentProgressData, exerciseSlug: string): boolean => {
  const progress = student.progress.find(p => p.exercise_slug === exerciseSlug)
  return !!progress?.saved_code
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="px-4 lg:px-8">
      <!-- Breadcrumb -->
      <nav class="mb-6 max-w-screen-2xl mx-auto">
        <UBreadcrumb
          :items="[
            { label: 'Mes classes', to: '/teacher' },
            { label: currentClass?.name || 'Classe' }
          ]"
        />
      </nav>

      <!-- En-tête de la classe -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8 max-w-screen-2xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ currentClass?.name }}
            </h1>
            <p v-if="currentClass?.description" class="text-gray-600 dark:text-gray-400 mt-1">
              {{ currentClass.description }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <!-- Lien d'invitation -->
            <div class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <UIcon name="i-lucide-link" class="w-4 h-4 text-gray-500" />
              <code class="text-sm font-mono text-nuxy-teal-dark dark:text-nuxy-teal">
                {{ currentClass?.invite_code }}
              </code>
              <UButton
                icon="i-lucide-clipboard"
                size="xs"
                variant="ghost"
                aria-label="Copier le lien d'invitation"
                @click="copyInviteLink"
              />
              <UButton
                icon="i-lucide-refresh-cw"
                size="xs"
                variant="ghost"
                aria-label="Régénérer le code d'invitation"
                @click="handleRegenerateCode"
              />
            </div>
          </div>
        </div>

        <!-- Statistiques rapides + lien vers stats détaillées -->
        <div v-if="statistics" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center">
              <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {{ statistics.total_students }}
              </div>
              <div class="text-sm text-gray-500">Élèves</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 dark:text-green-400">
                {{ statistics.exercises_completed }}
              </div>
              <div class="text-sm text-gray-500">Exercices complétés</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {{ statistics.total_attempts }}
              </div>
              <div class="text-sm text-gray-500">Tentatives totales</div>
            </div>
          </div>
          <div v-if="studentsProgress.length > 0" class="mt-4 text-center">
            <UButton
              icon="i-lucide-bar-chart-3"
              variant="outline"
              color="primary"
              :to="`/teacher/classes/${classId}/stats`"
            >
              Statistiques détaillées
            </UButton>
          </div>
        </div>
      </div>

      <!-- Tableau de progression (PLEINE LARGEUR) -->
      <UCard v-if="studentsProgress.length > 0">
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              Progression des élèves
            </h2>
            <UBadge color="green" variant="subtle">
              Temps réel
            </UBadge>
          </div>
        </template>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300 sticky left-0 bg-white dark:bg-gray-800 z-10">
                  Élève
                </th>
                <th
                  v-for="exercise in exercises"
                  :key="exercise.id"
                  class="text-center py-3 px-2 font-medium text-gray-700 dark:text-gray-300 min-w-[60px]"
                  :title="exercise.title"
                >
                  <span class="text-xs">{{ exercise.exerciseNumber || exercise.id }}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in studentsProgress"
                :key="student.id"
                class="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td class="py-3 px-4 sticky left-0 bg-white dark:bg-gray-800 z-10">
                  <div class="flex items-center gap-3">
                    <UAvatar
                      :text="student.full_name?.charAt(0) || student.email.charAt(0).toUpperCase()"
                      size="sm"
                      :ui="{ background: 'bg-primary-100 dark:bg-primary-900/30' }"
                      class="text-primary-600 dark:text-primary-400"
                    />
                    <div class="flex-1 min-w-0">
                      <div class="font-medium text-gray-900 dark:text-white truncate">
                        {{ student.full_name || 'Sans nom' }}
                      </div>
                      <div class="text-xs text-gray-500 truncate">
                        {{ student.email }}
                      </div>
                    </div>
                    <UButton
                      icon="i-lucide-x"
                      size="xs"
                      variant="ghost"
                      color="red"
                      aria-label="Retirer l'élève de la classe"
                      @click="showRemoveConfirm = student.id"
                    />
                  </div>
                </td>
                <td
                  v-for="exercise in exercises"
                  :key="exercise.id"
                  class="py-3 px-2 text-center"
                >
                  <UTooltip
                    :text="`${exercise.title} - ${getStudentAttempts(student, exercise.id)} tentative(s)${hasSavedCode(student, exercise.id) ? ' — Clique pour voir le code' : ''}`"
                  >
                    <div
                      :class="[
                        'w-8 h-8 mx-auto rounded-lg flex items-center justify-center transition-all',
                        statusColors[getStudentExerciseStatus(student, exercise.id)],
                        hasSavedCode(student, exercise.id)
                          ? 'cursor-pointer hover:ring-2 hover:ring-primary-500 hover:scale-110'
                          : ''
                      ]"
                      @click="handleCellClick(student, exercise)"
                    >
                      <UIcon
                        v-if="statusIcons[getStudentExerciseStatus(student, exercise.id)]"
                        :name="statusIcons[getStudentExerciseStatus(student, exercise.id)]"
                        class="w-4 h-4 text-white"
                      />
                    </div>
                  </UTooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Légende -->
        <div class="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-green-500"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Complété</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-orange-500"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">En cours</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 rounded bg-gray-300 dark:bg-gray-600"></div>
            <span class="text-sm text-gray-600 dark:text-gray-400">Pas commencé</span>
          </div>
        </div>
      </UCard>

      <!-- État vide - Aucun élève -->
      <UCard v-else class="text-center py-12 max-w-screen-2xl mx-auto">
        <UIcon name="i-lucide-users" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucun élève inscrit
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Partagez le lien d'invitation pour que vos élèves puissent rejoindre la classe.
        </p>
        <UButton
          icon="i-lucide-clipboard"
          @click="copyInviteLink"
        >
          Copier le lien d'invitation
        </UButton>
      </UCard>

      <!-- Modal de confirmation de suppression -->
      <UModal v-model:open="showRemoveConfirm">
        <template #content>
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Retirer l'élève
              </h3>
            </template>

            <p class="text-gray-600 dark:text-gray-400">
              Êtes-vous sûr de vouloir retirer cet élève de la classe ?
              Il pourra toujours rejoindre à nouveau avec le code d'invitation.
            </p>

            <template #footer>
              <div class="flex justify-end gap-3">
                <UButton
                  variant="outline"
                  @click="showRemoveConfirm = null"
                >
                  Annuler
                </UButton>
                <UButton
                  color="red"
                  @click="handleRemoveStudent(showRemoveConfirm!)"
                >
                  Retirer
                </UButton>
              </div>
            </template>
          </UCard>
        </template>
      </UModal>

      <!-- Slideover de visualisation des détails élève -->
      <TeacherStudentCodeSlideover
        v-model:open="showCodeModal"
        :student-name="selectedStudentName"
        :exercise-title="selectedExerciseTitle"
        :progress="selectedProgress"
        :errors="selectedErrors"
        :is-loading-errors="isLoadingErrors"
      />
    </div>
  </div>
</template>
