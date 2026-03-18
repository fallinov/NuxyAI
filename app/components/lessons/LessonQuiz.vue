<script setup lang="ts">
/**
 * LessonQuiz - Quiz interactif pour valider la compréhension
 *
 * Affiche les questions une par une avec feedback immédiat.
 * Score >= 70% = leçon marquée complétée.
 * Progression sauvegardée via useLessonSupabaseProgress.
 */

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation?: string
}

const props = defineProps<{
  questions: QuizQuestion[]
  slug: string
}>()

const { saveQuizScore, completeLesson } = useLessonSupabaseProgress()

// État du quiz
const currentIndex = ref(0)
const answers = ref<Record<number, number>>({})
const checkedQuestions = ref<Set<number>>(new Set())
const isFinished = ref(false)

// Question courante
const currentQuestion = computed(() => props.questions[currentIndex.value])
const totalQuestions = computed(() => props.questions.length)
const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)

// Réponse sélectionnée pour la question courante
const selectedAnswer = computed({
  get: () => answers.value[currentIndex.value] ?? -1,
  set: (val: number) => {
    answers.value[currentIndex.value] = val
  }
})

// La question courante a été vérifiée ?
const isChecked = computed(() => checkedQuestions.value.has(currentIndex.value))

// La réponse courante est correcte ?
const isCorrect = computed(() => {
  if (!isChecked.value) return false
  return answers.value[currentIndex.value] === currentQuestion.value.correct
})

// Score final
const score = computed(() => {
  if (!isFinished.value) return 0
  let correct = 0
  for (let i = 0; i < props.questions.length; i++) {
    if (answers.value[i] === props.questions[i].correct) {
      correct++
    }
  }
  return correct
})

const scorePercent = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((score.value / totalQuestions.value) * 100)
})

const passed = computed(() => scorePercent.value >= 70)

// Options pour URadioGroup
const radioOptions = computed(() => {
  if (!currentQuestion.value) return []
  return currentQuestion.value.options.map((label, index) => ({
    label,
    value: index
  }))
})

// Vérifier la réponse
const checkAnswer = () => {
  if (selectedAnswer.value === -1) return
  checkedQuestions.value = new Set([...checkedQuestions.value, currentIndex.value])
}

// Passer à la question suivante
const nextQuestion = () => {
  if (isLastQuestion.value) {
    finishQuiz()
  } else {
    currentIndex.value++
  }
}

// Terminer le quiz
const finishQuiz = async () => {
  isFinished.value = true
  await saveQuizScore(props.slug, scorePercent.value)
  if (passed.value) {
    await completeLesson(props.slug)
  }
}

// Recommencer le quiz
const resetQuiz = () => {
  currentIndex.value = 0
  answers.value = {}
  checkedQuestions.value = new Set()
  isFinished.value = false
}

// Couleur de l'option après vérification
const getOptionClass = (optionIndex: number): string => {
  if (!isChecked.value) return ''
  if (optionIndex === currentQuestion.value.correct) {
    return 'ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
  }
  if (optionIndex === answers.value[currentIndex.value] && optionIndex !== currentQuestion.value.correct) {
    return 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20'
  }
  return 'opacity-50'
}
</script>

<template>
  <div class="space-y-6">
    <!-- En-tête du quiz -->
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <UIcon name="i-lucide-brain" class="w-5 h-5 text-nuxy-teal" />
        Quiz
      </h3>
      <span v-if="!isFinished" class="text-sm text-gray-500 dark:text-gray-400">
        Question {{ currentIndex + 1 }} / {{ totalQuestions }}
      </span>
    </div>

    <!-- Barre de progression -->
    <div v-if="!isFinished" class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        class="bg-nuxy-teal h-2 rounded-full transition-all duration-300"
        :style="{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }"
      />
    </div>

    <!-- Question courante -->
    <div v-if="!isFinished" class="space-y-4">
      <p class="text-base font-medium text-gray-900 dark:text-white">
        {{ currentQuestion.question }}
      </p>

      <!-- Options -->
      <div class="space-y-2">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          class="w-full text-left p-3 rounded-lg border-2 transition-all duration-200"
          :class="[
            getOptionClass(index),
            !isChecked && selectedAnswer === index
              ? 'border-nuxy-teal bg-nuxy-teal/5'
              : !isChecked
                ? 'border-gray-200 dark:border-gray-700 hover:border-nuxy-teal/50'
                : ''
          ]"
          :disabled="isChecked"
          @click="selectedAnswer = index"
        >
          <div class="flex items-center gap-3">
            <!-- Indicateur radio -->
            <div
              class="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
              :class="[
                selectedAnswer === index
                  ? 'border-nuxy-teal'
                  : 'border-gray-300 dark:border-gray-600'
              ]"
            >
              <div
                v-if="selectedAnswer === index"
                class="w-2.5 h-2.5 rounded-full bg-nuxy-teal"
              />
            </div>
            <span class="text-sm text-gray-700 dark:text-gray-300">{{ option }}</span>
          </div>
        </button>
      </div>

      <!-- Feedback -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="isChecked" class="p-4 rounded-lg" :class="isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-red-50 dark:bg-red-900/20'">
          <div class="flex items-center gap-2 mb-1">
            <UIcon
              :name="isCorrect ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
              class="w-5 h-5"
              :class="isCorrect ? 'text-emerald-600' : 'text-red-600'"
            />
            <span class="font-medium" :class="isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'">
              {{ isCorrect ? 'Bien joué !' : 'Pas tout à fait...' }}
            </span>
          </div>
          <p v-if="currentQuestion.explanation" class="text-sm text-gray-600 dark:text-gray-400 ml-7">
            {{ currentQuestion.explanation }}
          </p>
        </div>
      </Transition>

      <!-- Boutons d'action -->
      <div class="flex justify-end gap-3">
        <UButton
          v-if="!isChecked"
          :disabled="selectedAnswer === -1"
          color="primary"
          variant="solid"
          @click="checkAnswer"
        >
          Vérifier
        </UButton>
        <UButton
          v-else
          color="primary"
          variant="solid"
          trailing-icon="i-lucide-arrow-right"
          @click="nextQuestion"
        >
          {{ isLastQuestion ? 'Voir le résultat' : 'Suivante' }}
        </UButton>
      </div>
    </div>

    <!-- Résultat final -->
    <div v-else class="text-center space-y-4 py-6">
      <div
        class="inline-flex items-center justify-center w-20 h-20 rounded-full"
        :class="passed ? 'bg-nuxy-green/10' : 'bg-nuxy-gold/10'"
      >
        <UIcon
          :name="passed ? 'i-lucide-trophy' : 'i-lucide-rotate-ccw'"
          class="w-10 h-10"
          :class="passed ? 'text-nuxy-green' : 'text-nuxy-gold'"
        />
      </div>

      <div>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ score }} / {{ totalQuestions }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ scorePercent }}% de bonnes réponses
        </p>
      </div>

      <p class="text-base" :class="passed ? 'text-nuxy-green font-medium' : 'text-gray-600 dark:text-gray-400'">
        {{ passed ? 'Bravo, tu maîtrises le sujet !' : 'Encore un petit effort, tu y es presque !' }}
      </p>

      <div class="flex justify-center gap-3">
        <UButton
          v-if="!passed"
          color="primary"
          variant="solid"
          icon="i-lucide-rotate-ccw"
          @click="resetQuiz"
        >
          On réessaie !
        </UButton>
        <UButton
          v-if="passed"
          to="/lessons"
          color="primary"
          variant="soft"
          icon="i-lucide-arrow-left"
        >
          Retour aux leçons
        </UButton>
      </div>
    </div>
  </div>
</template>
