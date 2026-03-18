<script setup lang="ts">
/**
 * OutputPanel - Panneau de sortie (console + validation)
 *
 * Affiche :
 * - Résultats de la console
 * - Résultats de validation
 * - Progression des objectifs
 * - Solution officielle (si demandée)
 */

interface ExerciseSolution {
  code: string
  explanation?: string
}

interface Props {
  validationResult: any
  exerciseStatus: 'not-started' | 'in-progress' | 'completed'
  lastResult?: any
  executionTime?: number
  showSolution?: boolean
  solution?: ExerciseSolution | null
}

const props = defineProps<Props>()

const toast = useToast()

/**
 * Copie la solution dans le clipboard
 */
const copySolution = async () => {
  if (!props.solution) return

  try {
    await navigator.clipboard.writeText(props.solution.code)
    toast.add({
      title: 'Solution copiée !',
      description: 'La solution a été copiée dans le presse-papiers',
      color: 'green',
      timeout: 2000
    })
  } catch (error) {
    toast.add({
      title: 'Erreur',
      description: 'Impossible de copier la solution',
      color: 'red',
      timeout: 2000
    })
  }
}
</script>

<template>
  <div class="output-panel h-full flex flex-col bg-gray-50 dark:bg-gray-900">
    <!-- En-tête -->
    <div class="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-white dark:bg-gray-900">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Console
        </h3>
        <div v-if="executionTime" class="text-xs text-gray-500 dark:text-gray-400">
          ⏱️ {{ executionTime.toFixed(2) }}ms
        </div>
      </div>
    </div>

    <!-- Contenu scrollable -->
    <div class="flex-1 overflow-y-auto p-6">
      <!-- Résultats de la console -->
      <div v-if="lastResult" class="mb-6">
        <ExercisesExerciseConsoleOutput
          :logs="lastResult.logs || []"
          :errors="lastResult.errors || []"
          :warnings="lastResult.warnings || []"
        />
      </div>

      <!-- Message par défaut si pas d'exécution -->
      <div v-else class="text-center py-12">
        <UIcon name="i-lucide-monitor" class="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          Cliquez sur "Exécuter le code" pour voir les résultats
        </p>
      </div>

      <!-- Bandeau compact de validation -->
      <div
        v-if="validationResult"
        class="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
        :class="[
          validationResult.isValid
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
        ]"
      >
        <UIcon
          :name="validationResult.isValid ? 'i-lucide-check-circle' : 'i-lucide-circle-dot'"
          class="w-4 h-4 flex-shrink-0"
        />
        <span class="font-medium">
          {{ validationResult.isValid
            ? 'Exercice réussi !'
            : `${validationResult.passedRules}/${validationResult.totalRules} critères validés`
          }}
        </span>
      </div>

      <!-- Solution officielle -->
      <div v-if="showSolution && solution" class="mt-6">
        <div class="rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 overflow-hidden">
          <!-- En-tête de la solution -->
          <div class="bg-blue-100 dark:bg-blue-900/40 px-4 py-3 border-b border-blue-300 dark:border-blue-700">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <UIcon name="i-lucide-lightbulb" class="w-6 h-6" />
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-blue-900 dark:text-blue-100">
                  Solution officielle
                </h4>
                <p class="text-xs text-blue-700 dark:text-blue-300">
                  Code de référence pour cet exercice
                </p>
              </div>
            </div>
          </div>

          <!-- Contenu de la solution -->
          <div class="p-4">
            <!-- Explication -->
            <div v-if="solution.explanation" class="mb-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <p class="text-sm text-blue-900 dark:text-blue-100">
                {{ solution.explanation }}
              </p>
            </div>

            <!-- Code de la solution -->
            <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-3">
              <pre class="text-sm text-gray-100 font-mono leading-relaxed"><code>{{ solution.code }}</code></pre>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3">
              <UButton
                icon="i-lucide-clipboard"
                color="blue"
                variant="solid"
                size="sm"
                class="cursor-pointer"
                @click="copySolution"
              >
                Copier la solution
              </UButton>
            </div>

            <!-- Avertissement pédagogique -->
            <div class="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-300 dark:border-orange-700">
              <p class="text-xs text-orange-800 dark:text-orange-200 flex items-start gap-2">
                <UIcon name="i-lucide-triangle-alert" class="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Essayez de résoudre l'exercice par vous-même avant de consulter la solution. L'apprentissage est plus efficace quand on cherche activement !</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
