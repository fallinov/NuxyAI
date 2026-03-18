<script setup lang="ts">
/**
 * Page de leçon dynamique
 *
 * Layout clean, centré, avec :
 * - Header sticky NuxyAI
 * - Métadonnées (badges, titre, description, objectifs)
 * - Contenu markdown pleine largeur
 * - Actions selon le type (guide/exercise/quiz/project)
 * - Navigation prev/next
 */

definePageMeta({
  layout: 'lesson'
})

const route = useRoute()
const slug = route.params.slug as string

// Charger la leçon
const { data: lesson } = await useAsyncData(`lesson-${slug}`, () =>
  queryCollection('lessons').path(`/lessons/${slug}`).first()
)

// 404 si introuvable
if (!lesson.value) {
  throw createError({ statusCode: 404, message: 'Leçon introuvable' })
}

// SEO
useSeoMeta({
  title: `${lesson.value.title} - NuxyAI`,
  description: lesson.value.description
})

// Progression
const { startLesson, completeLesson, getLessonStatus } = useLessonSupabaseProgress()
const currentStatus = ref<'not-started' | 'in-progress' | 'completed'>('not-started')
const isCompleting = ref(false)

onMounted(async () => {
  currentStatus.value = await getLessonStatus(slug)
  if (currentStatus.value !== 'completed') {
    await startLesson(slug)
    currentStatus.value = 'in-progress'
  }
})

const markAsCompleted = async () => {
  isCompleting.value = true
  await completeLesson(slug)
  currentStatus.value = 'completed'
  isCompleting.value = false
}

// Badge helpers
const typeBadges: Record<string, { label: string; icon: string; class: string }> = {
  guide: { label: 'Guide', icon: 'i-lucide-book-open', class: 'bg-nuxy-teal/10 text-nuxy-teal-dark dark:text-nuxy-teal' },
  exercise: { label: 'Exercice', icon: 'i-lucide-code', class: 'bg-nuxy-green/10 text-nuxy-green-dark dark:text-nuxy-green' },
  quiz: { label: 'Quiz', icon: 'i-lucide-brain', class: 'bg-nuxy-purple/10 text-nuxy-purple dark:text-nuxy-pink' },
  project: { label: 'Projet', icon: 'i-lucide-folder-open', class: 'bg-nuxy-gold/10 text-nuxy-gold-dark' }
}

const difficultyBadges: Record<string, { label: string; class: string }> = {
  beginner: { label: 'Débutant', class: 'bg-nuxy-green/10 text-nuxy-green-dark dark:text-nuxy-green' },
  intermediate: { label: 'Intermédiaire', class: 'bg-nuxy-gold/10 text-nuxy-gold-dark' },
  advanced: { label: 'Avancé', class: 'bg-nuxy-pink/10 text-nuxy-pink' }
}

const typeBadge = typeBadges[lesson.value.type] || typeBadges.guide
const diffBadge = difficultyBadges[lesson.value.difficulty] || difficultyBadges.beginner
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <!-- Header -->
    <LessonsLessonHeader />

    <!-- Contenu principal -->
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <!-- Badges -->
      <div class="flex flex-wrap items-center gap-2 mb-6">
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full"
          :class="typeBadge.class"
        >
          <UIcon :name="typeBadge.icon" class="w-4 h-4" />
          {{ typeBadge.label }}
        </span>
        <span
          class="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full"
          :class="diffBadge.class"
        >
          {{ diffBadge.label }}
        </span>
        <span class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
          <UIcon name="i-lucide-clock" class="w-4 h-4" />
          {{ lesson.duration }} min
        </span>
        <span
          v-if="currentStatus === 'completed'"
          class="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full bg-nuxy-green/10 text-nuxy-green"
        >
          <UIcon name="i-lucide-check-circle" class="w-4 h-4" />
          Complété
        </span>
      </div>

      <!-- Titre -->
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {{ lesson.title }}
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        {{ lesson.description }}
      </p>

      <!-- Objectifs -->
      <div
        v-if="lesson.objectives?.length"
        class="bg-nuxy-green/5 dark:bg-nuxy-green/10 border border-nuxy-green/20 rounded-xl p-5 mb-10"
      >
        <h2 class="text-sm font-semibold text-nuxy-green-dark dark:text-nuxy-green mb-3 flex items-center gap-2">
          <UIcon name="i-lucide-target" class="w-4 h-4" />
          Ce que tu vas apprendre
        </h2>
        <ul class="space-y-2">
          <li
            v-for="(obj, i) in lesson.objectives"
            :key="i"
            class="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
          >
            <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green mt-0.5 shrink-0" />
            {{ obj }}
          </li>
        </ul>
      </div>

      <!-- Contenu Markdown (h1 caché car déjà affiché au-dessus) -->
      <div class="lesson-content prose prose-gray dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
        prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-base prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
        prose-li:text-gray-700 dark:prose-li:text-gray-300
        prose-strong:text-gray-900 dark:prose-strong:text-white
        prose-code:text-nuxy-teal prose-code:bg-nuxy-teal/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-a:text-nuxy-green prose-a:no-underline hover:prose-a:underline
        prose-table:text-sm
      ">
        <ContentRenderer v-if="lesson" :value="lesson" />
      </div>

      <!-- ==================== ACTIONS ==================== -->
      <div class="mt-12 space-y-6">
        <!-- Guide : bouton "J'ai compris" -->
        <div v-if="lesson.type === 'guide'" class="flex justify-center">
          <UButton
            v-if="currentStatus !== 'completed'"
            size="xl"
            color="primary"
            icon="i-lucide-check-circle"
            :loading="isCompleting"
            class="btn-cta px-8"
            @click="markAsCompleted"
          >
            J'ai compris !
          </UButton>
          <div
            v-else
            class="inline-flex items-center gap-3 px-6 py-3 bg-nuxy-green/10 rounded-xl border border-nuxy-green/20"
          >
            <UIcon name="i-lucide-party-popper" class="w-6 h-6 text-nuxy-gold" />
            <span class="font-medium text-nuxy-green">Bravo, leçon terminée !</span>
          </div>
        </div>

        <!-- Exercise : checklist -->
        <LessonsLessonChecklist
          v-if="lesson.type === 'exercise' && lesson.checklist?.length"
          :items="lesson.checklist"
          :slug="slug"
        />

        <!-- Quiz -->
        <LessonsLessonQuiz
          v-if="lesson.type === 'quiz' && lesson.quiz?.length"
          :questions="lesson.quiz"
          :slug="slug"
        />

        <!-- Project -->
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
    </div>
  </div>
</template>

<style scoped>
/* Cacher le h1 dans le contenu markdown (déjà affiché dans les métadonnées) */
.lesson-content :deep(h1:first-child) {
  display: none;
}
</style>
