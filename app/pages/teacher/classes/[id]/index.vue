<script setup lang="ts">
/**
 * Détail d'une classe - Dashboard enseignant
 *
 * - Infos classe (nom, description, lien invitation)
 * - Liste des élèves inscrits
 * - Tableau de progression (leçons complétées, dernière activité)
 */

import type { StudentProgressData } from '~/composables/useClasses'

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
  subscribeToProgress,
  unsubscribeFromProgress,
  getInviteUrl,
  isLoading
} = useClasses()

// États
const studentsProgress = ref<StudentProgressData[]>([])
const statistics = ref<any>(null)
const showRemoveConfirm = ref<string | null>(null)

// Charger les données
await loadClassWithMembers(classId)

if (!currentClass.value) {
  throw createError({
    statusCode: 404,
    message: 'Classe non trouvée'
  })
}

// SEO
useSeoMeta({
  title: `${currentClass.value?.name || 'Classe'} - NuxyAI`
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
  subscribeToProgress(classId, async () => {
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

// Helpers pour les stats par élève
const getCompletedLessons = (student: StudentProgressData): number => {
  return student.progress.filter(p => p.status === 'completed').length
}

const getLastActivity = (student: StudentProgressData): string | null => {
  if (student.progress.length === 0) return null

  const dates = student.progress
    .map(p => p.last_attempt_at || p.updated_at)
    .filter(Boolean)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  return dates[0] || null
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMs / 3600000)
  const diffD = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return 'À l\'instant'
  if (diffMin < 60) return `Il y a ${diffMin} min`
  if (diffH < 24) return `Il y a ${diffH}h`
  if (diffD < 7) return `Il y a ${diffD}j`
  return date.toLocaleDateString('fr-FR')
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

        <!-- Statistiques rapides -->
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
              <div class="text-sm text-gray-500">Leçons complétées</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {{ statistics.total_attempts }}
              </div>
              <div class="text-sm text-gray-500">Tentatives totales</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tableau de progression -->
      <UCard v-if="studentsProgress.length > 0" class="max-w-screen-2xl mx-auto">
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
                <th class="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Élève
                </th>
                <th class="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Leçons complétées
                </th>
                <th class="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Dernière activité
                </th>
                <th class="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="student in studentsProgress"
                :key="student.id"
                class="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <UAvatar
                      :text="student.full_name?.charAt(0) || student.email.charAt(0).toUpperCase()"
                      size="sm"
                      :ui="{ background: 'bg-primary-100 dark:bg-primary-900/30' }"
                      class="text-primary-600 dark:text-primary-400"
                    />
                    <div class="min-w-0">
                      <div class="font-medium text-gray-900 dark:text-white truncate">
                        {{ student.full_name || 'Sans nom' }}
                      </div>
                      <div class="text-xs text-gray-500 truncate">
                        {{ student.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4 text-center">
                  <span class="font-semibold text-nuxy-green-dark dark:text-nuxy-green">
                    {{ getCompletedLessons(student) }}
                  </span>
                </td>
                <td class="py-3 px-4 text-center text-sm text-gray-500">
                  <template v-if="getLastActivity(student)">
                    {{ formatDate(getLastActivity(student)!) }}
                  </template>
                  <span v-else class="italic">Aucune</span>
                </td>
                <td class="py-3 px-4 text-right">
                  <UButton
                    icon="i-lucide-x"
                    size="xs"
                    variant="ghost"
                    color="red"
                    aria-label="Retirer l'élève de la classe"
                    @click="showRemoveConfirm = student.id"
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
    </div>
  </div>
</template>
