<script setup lang="ts">
/**
 * Page de leçon dynamique
 *
 * Charge une leçon par son slug et affiche :
 * - LessonHeader (navigation sticky)
 * - Métadonnées (titre, description, durée, difficulté, type, objectifs)
 * - Contenu markdown (LessonContent)
 * - Actions selon le type de leçon :
 *   - guide : bouton "J'ai compris"
 *   - exercise : checklist (LessonChecklist)
 *   - quiz : quiz interactif (LessonQuiz)
 *   - project : message "En attente de validation"
 * - Navigation précédent/suivant (LessonNavigation)
 */

definePageMeta({
  layout: 'lesson'
})

const route = useRoute()
const slug = route.params.slug as string

// Charger la leçon
const { lesson, isLoading, error } = useLessonData(`/lessons/${slug}`)

// SEO dynamique
useSeoMeta({
  title: () => lesson.value ? `${lesson.value.title} - NuxyAI` : 'Leçon - NuxyAI',
  description: () => lesson.value?.description || ''
})

// Progression
const { startLesson, completeLesson, getLessonStatus } = useLessonSupabaseProgress()

const currentStatus = ref<'not-started' | 'in-progress' | 'completed'>('not-started')
const isCompleting = ref(false)

// Marquer comme commencée au montage
onMounted(async () => {
  currentStatus.value = await getLessonStatus(slug)
  if (currentStatus.value !== 'completed') {
    await startLesson(slug)
    currentStatus.value = 'in-progress'
  }
})

// Marquer comme complétée (guides uniquement)
const markAsCompleted = async () => {
  isCompleting.value = true
  await completeLesson(slug)
  currentStatus.value = 'completed'
  isCompleting.value = false
}

// Badge de difficulté
const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return { label: 'Débutant', class: 'bg-nuxy-green/10 text-nuxy-green' }
    case 'intermediate':
      return { label: 'Intermédiaire', class: 'bg-nuxy-gold/10 text-nuxy-gold-dark' }
    case 'advanced':
      return { label: 'Avancé', class: 'bg-nuxy-pink/10 text-nuxy-pink' }
    default:
      return { label: difficulty, class: 'bg-gray-100 text-gray-600' }
  }
}

// Badge de type
const getTypeBadge = (type: string) => {
  switch (type) {
    case 'guide':
      return { label: 'Guide', icon: 'i-lucide-book-open', class: 'bg-nuxy-teal/10 text-nuxy-teal' }
    case 'exercise':
      return { label: 'Exercice', icon: 'i-lucide-code', class: 'bg-nuxy-green/10 text-nuxy-green' }
    case 'quiz':
      return { label: 'Quiz', icon: 'i-lucide-brain', class: 'bg-nuxy-purple/10 text-nuxy-purple dark:text-nuxy-pink' }
    case 'project':
      return { label: 'Projet', icon: 'i-lucide-folder-open', class: 'bg-nuxy-gold/10 text-nuxy-gold-dark' }
    default:
      return { label: type, icon: 'i-lucide-file', class: 'bg-gray-100 text-gray-600' }
  }
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- LessonHeader -->
    <LessonsLessonHeader />

    <!-- Loading -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center space-y-4">
        <div class="w-12 h-12 border-4 border-nuxy-green border-t-transparent rounded-full animate-spin mx-auto" />
        <p class="text-gray-500 dark:text-gray-400">Chargement de la leçon...</p>
      </div>
    </div>

    <!-- Erreur -->
    <div v-else-if="error || !lesson" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center space-y-4 max-w-md px-4">
        <UIcon name="i-lucide-file-x" class="w-16 h-16 text-gray-400 mx-auto" />
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Leçon introuvable</h2>
        <p class="text-gray-500 dark:text-gray-400">
          {{ error || 'Cette leçon n\'existe pas ou a été déplacée.' }}
        </p>
        <UButton to="/lessons" color="primary" variant="solid" icon="i-lucide-arrow-left">
          Retour aux leçons
        </UButton>
      </div>
    </div>

    <!-- Contenu de la leçon -->
    <template v-else>
      <UContainer class="py-8 lg:py-12 max-w-3xl">
        <!-- Métadonnées -->
        <div class="mb-8 space-y-4">
          <!-- Badges -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Type -->
            <span
              class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
              :class="getTypeBadge(lesson.type).class"
            >
              <UIcon :name="getTypeBadge(lesson.type).icon" class="w-3.5 h-3.5" />
              {{ getTypeBadge(lesson.type).label }}
            </span>
            <!-- Difficulté -->
            <span
              class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
              :class="getDifficultyBadge(lesson.difficulty).class"
            >
              {{ getDifficultyBadge(lesson.difficulty).label }}
            </span>
            <!-- Durée -->
            <span class="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 px-2.5 py-1">
              <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
              {{ lesson.duration }} min
            </span>
            <!-- Statut complété -->
            <span
              v-if="currentStatus === 'completed'"
              class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-nuxy-green/10 text-nuxy-green"
            >
              <UIcon name="i-lucide-check-circle" class="w-3.5 h-3.5" />
              Complété
            </span>
          </div>

          <!-- Titre et description -->
          <div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {{ lesson.title }}
            </h1>
            <p class="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              {{ lesson.description }}
            </p>
          </div>

          <!-- Objectifs -->
          <div v-if="lesson.objectives && lesson.objectives.length > 0" class="bg-nuxy-green/5 dark:bg-nuxy-green/10 border border-nuxy-green/20 rounded-xl p-4">
            <h2 class="text-sm font-semibold text-nuxy-green-dark dark:text-nuxy-green mb-2 flex items-center gap-2">
              <UIcon name="i-lucide-target" class="w-4 h-4" />
              Ce que tu vas apprendre
            </h2>
            <ul class="space-y-1.5">
              <li
                v-for="(objective, i) in lesson.objectives"
                :key="i"
                class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green mt-0.5 shrink-0" />
                {{ objective }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Contenu Markdown -->
        <LessonsLessonContent :lesson="lesson" />

        <!-- Actions selon le type -->
        <div class="mt-10 space-y-6">
          <!-- Guide : bouton "J'ai compris" -->
          <div v-if="lesson.type === 'guide'" class="flex justify-center">
            <UButton
              v-if="currentStatus !== 'completed'"
              size="xl"
              color="primary"
              variant="solid"
              icon="i-lucide-check-circle"
              :loading="isCompleting"
              class="btn-cta"
              @click="markAsCompleted"
            >
              J'ai compris !
            </UButton>
            <div
              v-else
              class="flex items-center gap-3 px-6 py-3 bg-nuxy-green/10 dark:bg-nuxy-green/5 rounded-xl border border-nuxy-green/20"
            >
              <UIcon name="i-lucide-party-popper" class="w-6 h-6 text-nuxy-gold" />
              <span class="font-medium text-nuxy-green">Bravo, leçon terminée !</span>
            </div>
          </div>

          <!-- Exercise : checklist -->
          <LessonsLessonChecklist
            v-if="lesson.type === 'exercise' && lesson.objectives"
            :items="lesson.objectives.map((obj: string, i: number) => ({ id: `obj-${i}`, label: obj }))"
            :slug="slug"
          />

          <!-- Quiz : composant quiz -->
          <LessonsLessonQuiz
            v-if="lesson.type === 'quiz' && lesson.quiz"
            :questions="lesson.quiz"
            :slug="slug"
          />

          <!-- Project : message d'attente -->
          <div
            v-if="lesson.type === 'project'"
            class="flex items-center gap-3 p-4 bg-nuxy-gold/10 border border-nuxy-gold/20 rounded-xl"
          >
            <UIcon name="i-lucide-hourglass" class="w-6 h-6 text-nuxy-gold-dark" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">En attente de validation</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Ton enseignant vérifiera ton projet. En attendant, passe à la leçon suivante !
              </p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <LessonsLessonNavigation :current-slug="slug" />
      </UContainer>
    </template>
  </div>
</template>
