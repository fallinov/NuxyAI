<script setup lang="ts">
/**
 * SplitOutputPanel - Panneau combiné Preview + Console
 *
 * Affiche l'aperçu HTML et la console côte à côte ou empilés
 * selon l'espace disponible.
 */

import { ref, computed } from 'vue'
import type { ConsoleEntry, ErrorEntry, HtmlCssJsCode } from '~/types/htmlCssJs'

// Type pour la solution HTML/CSS/JS
interface HtmlCssJsSolution {
  html?: string
  css?: string
  js?: string
  explanation?: string
}

// Type pour les résultats de validation
interface ValidationResult {
  passed: boolean
  message: string
  rule: {
    description: string
    successMessage?: string
    errorMessage?: string
    hidden?: boolean
  }
}

// Props
interface Props {
  code: HtmlCssJsCode
  autoRefresh?: boolean
  showSolution?: boolean
  solution?: HtmlCssJsSolution | null
  validationResults?: ValidationResult[]
  exerciseStatus?: 'not-started' | 'in-progress' | 'completed'
}

const props = withDefaults(defineProps<Props>(), {
  autoRefresh: true,
  showSolution: false,
  solution: null,
  validationResults: () => [],
  exerciseStatus: 'not-started'
})

// Événements émis
const emit = defineEmits<{
  'dom-ready': []
}>()

// Filtrer les validations visibles (exclure les hidden)
const visibleValidations = computed(() => {
  return (props.validationResults || []).filter(r => !r.rule.hidden)
})

// Détection des mauvaises pratiques dans le code JS
const badPractices = computed(() => {
  const js = props.code?.js || ''
  return {
    usesInnerHTML: /innerHTML\s*=/.test(js),
    usesBackgroundShorthand: /\.style\.background\s*=/.test(js) && !/\.style\.backgroundColor\s*=/.test(js)
  }
})

// Calculer le résumé de validation (basé sur les validations visibles)
const validationSummary = computed(() => {
  const allResults = props.validationResults || []
  const visibleResults = visibleValidations.value
  // Le succès dépend de TOUTES les validations (y compris hidden)
  const allPassed = allResults.every(r => r.passed) && allResults.length > 0
  // Mais on affiche le compteur des validations visibles uniquement
  const passedCount = visibleResults.filter(r => r.passed).length
  const totalCount = visibleResults.length
  return { passedCount, totalCount, isValid: allPassed, hasResults: totalCount > 0 }
})

// Onglet actif pour la solution
const solutionTab = ref('js')

// Items pour UTabs de la solution (seulement les onglets avec du contenu)
const solutionTabItems = computed(() => {
  const items = []
  if (props.solution?.html) {
    items.push({ label: 'HTML', value: 'html' })
  }
  if (props.solution?.css) {
    items.push({ label: 'CSS', value: 'css' })
  }
  if (props.solution?.js) {
    items.push({ label: 'JavaScript', value: 'js' })
  }
  return items
})

// État
const consoleEntries = ref<Array<ConsoleEntry | ErrorEntry>>([])
const isDocumentReady = ref(false)

// Référence au PreviewPanel
const previewRef = ref<InstanceType<typeof import('./PreviewPanel.vue').default> | null>(null)

/**
 * Gère les logs console venant de l'iframe
 */
function handleConsoleLog(entry: ConsoleEntry) {
  consoleEntries.value.push(entry)
}

/**
 * Gère les erreurs console venant de l'iframe
 */
function handleConsoleError(entry: ErrorEntry) {
  consoleEntries.value.push(entry)
}

/**
 * Signale que le DOM est prêt dans l'iframe
 */
function handleDomReady() {
  isDocumentReady.value = true
  emit('dom-ready')
}

/**
 * Vide la console
 */
function clearConsole() {
  consoleEntries.value = []
}

/**
 * Rafraîchit l'aperçu et vide la console
 */
function refresh() {
  clearConsole()
  isDocumentReady.value = false
  previewRef.value?.refresh()
}

/**
 * Détermine la couleur de l'entrée console
 */
function getEntryColor(entry: ConsoleEntry | ErrorEntry): string {
  if (entry.type === 'error') return 'text-red-400'
  if (entry.type === 'warn') return 'text-yellow-400'
  if (entry.type === 'info') return 'text-blue-400'
  return 'text-gray-300'
}

/**
 * Détermine l'icône de l'entrée console
 */
function getEntryIcon(entry: ConsoleEntry | ErrorEntry): string {
  if (entry.type === 'error') return 'i-lucide-x-circle'
  if (entry.type === 'warn') return 'i-lucide-triangle-alert'
  if (entry.type === 'info') return 'i-lucide-info'
  return 'i-lucide-chevron-right'
}

/**
 * Retourne la fenêtre de l'iframe (pour les validations DOM)
 */
function getIframeWindow(): Window | null {
  return previewRef.value?.getIframeWindow() || null
}

// Exposer les méthodes
defineExpose({
  refresh,
  clearConsole,
  getIframeWindow,
  consoleEntries
})
</script>

<template>
  <div class="split-output-panel h-full bg-gray-900">
    <UiResizablePanels
      direction="vertical"
      :default-size="65"
      :min-size="100"
      class="h-full"
    >
      <!-- Aperçu (premier panel) -->
      <template #first>
        <ExercisesPreviewPanel
          ref="previewRef"
          :html="code.html || ''"
          :css="code.css || ''"
          :js="code.js || ''"
          :auto-refresh="autoRefresh"
          @console-log="handleConsoleLog"
          @console-error="handleConsoleError"
          @dom-ready="handleDomReady"
        />
      </template>

      <!-- Console (second panel) -->
      <template #second>
        <div class="console-section h-full flex flex-col">
      <!-- En-tête console -->
      <div class="console-header flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
        <UIcon name="i-lucide-terminal" class="w-4 h-4 text-gray-400" />
        <span class="text-sm font-medium text-gray-300">Console</span>

        <UBadge
          v-if="consoleEntries.length > 0"
          color="neutral"
          variant="subtle"
          size="xs"
          class="ml-1"
        >
          {{ consoleEntries.length }}
        </UBadge>

        <UButton
          variant="ghost"
          color="neutral"
          icon="i-lucide-trash-2"
          size="xs"
          class="ml-auto"
          aria-label="Vider la console"
          @click="clearConsole"
        />
      </div>

      <!-- Contenu console -->
      <div class="console-content flex-1 overflow-y-auto p-3 font-mono text-sm">
        <!-- Bandeau compact de validation -->
        <div
          v-if="validationSummary.hasResults"
          class="mb-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
          :class="[
            validationSummary.isValid
              ? 'bg-green-900/30 text-green-300'
              : 'bg-orange-900/30 text-orange-300'
          ]"
        >
          <UIcon
            :name="validationSummary.isValid ? 'i-lucide-check-circle' : 'i-lucide-circle-dot'"
            class="w-4 h-4 flex-shrink-0"
          />
          <span class="font-medium">
            {{ validationSummary.isValid
              ? 'Exercice réussi !'
              : `${validationSummary.passedCount}/${validationSummary.totalCount} critères validés`
            }}
          </span>
        </div>

        <!-- Warnings mauvaises pratiques (affichés indépendamment) -->
        <div v-if="badPractices.usesInnerHTML" class="mb-3 text-xs text-yellow-400/80 bg-yellow-900/20 rounded px-2 py-1">
          <UIcon name="i-lucide-lightbulb" class="w-3 h-3 inline-block mr-1" />
          Utilise <code class="bg-gray-700 px-1 rounded">textContent</code> au lieu de <code class="bg-gray-700 px-1 rounded">innerHTML</code>. Pour du texte simple, textContent est plus sécurisé et plus performant.
        </div>
        <div v-if="badPractices.usesBackgroundShorthand" class="mb-3 text-xs text-yellow-400/80 bg-yellow-900/20 rounded px-2 py-1">
          <UIcon name="i-lucide-lightbulb" class="w-3 h-3 inline-block mr-1" />
          Utilise <code class="bg-gray-700 px-1 rounded">backgroundColor</code> au lieu de <code class="bg-gray-700 px-1 rounded">background</code>. La propriété backgroundColor est plus explicite.
        </div>

        <!-- Message si console vide et pas de validation ni solution -->
        <div
          v-if="consoleEntries.length === 0 && !showSolution && !validationSummary.hasResults"
          class="text-gray-500 italic"
        >
          La console est vide. Exécutez le code pour voir les résultats.
        </div>

        <!-- Entrées console -->
        <div
          v-for="(entry, index) in consoleEntries"
          :key="index"
          :class="[
            'console-entry flex items-start gap-2 py-1',
            getEntryColor(entry)
          ]"
        >
          <UIcon :name="getEntryIcon(entry)" class="w-4 h-4 mt-0.5 flex-shrink-0" />

          <div class="flex-1 min-w-0">
            <!-- Contenu principal -->
            <div class="whitespace-pre-wrap break-words">{{ entry.content }}</div>

            <!-- Message pédagogique pour les erreurs -->
            <div
              v-if="entry.type === 'error' && (entry as ErrorEntry).pedagogical"
              class="mt-2 p-3 bg-red-900/30 rounded-lg border border-red-800/50"
            >
              <div class="font-semibold text-red-300 mb-1">
                {{ (entry as ErrorEntry).pedagogical?.title }}
              </div>
              <div class="text-red-200/80 text-sm">
                {{ (entry as ErrorEntry).pedagogical?.message }}
              </div>
              <div
                v-if="(entry as ErrorEntry).pedagogical?.hint"
                class="mt-2 text-yellow-300/80 text-sm"
              >
                <UIcon name="i-lucide-lightbulb" class="w-4 h-4 inline-block mr-1" />
                {{ (entry as ErrorEntry).pedagogical?.hint }}
              </div>
              <pre
                v-if="(entry as ErrorEntry).pedagogical?.example"
                class="mt-2 p-2 bg-gray-800 rounded text-green-300 text-xs overflow-x-auto"
              >{{ (entry as ErrorEntry).pedagogical?.example }}</pre>
            </div>
          </div>
        </div>

        <!-- Affichage de la solution -->
        <div v-if="showSolution && solution" class="mt-4">
          <UCard
            :ui="{
              root: 'bg-yellow-900/20 border-yellow-700/50',
              header: 'bg-yellow-900/30 border-b border-yellow-700/50',
              body: 'p-0'
            }"
          >
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-lightbulb" class="w-5 h-5 text-yellow-400" />
                <span class="font-semibold text-yellow-200">Solution</span>
              </div>
            </template>

            <!-- Explication -->
            <div v-if="solution.explanation" class="p-3 bg-blue-900/20 border-b border-gray-700">
              <p class="text-blue-200 text-sm">{{ solution.explanation }}</p>
            </div>

            <!-- Onglets HTML/CSS/JS -->
            <UTabs
              v-model="solutionTab"
              :items="solutionTabItems"
              :ui="{
                list: 'bg-gray-800 border-b border-gray-700',
                trigger: 'text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700'
              }"
            />

            <!-- Code de la solution -->
            <div class="p-3 bg-gray-800/50">
              <pre
                v-if="solutionTab === 'html' && solution.html"
                class="text-sm text-orange-300 font-mono leading-relaxed whitespace-pre-wrap"
              ><code>{{ solution.html }}</code></pre>
              <pre
                v-if="solutionTab === 'css' && solution.css"
                class="text-sm text-blue-300 font-mono leading-relaxed whitespace-pre-wrap"
              ><code>{{ solution.css }}</code></pre>
              <pre
                v-if="solutionTab === 'js' && solution.js"
                class="text-sm text-yellow-300 font-mono leading-relaxed whitespace-pre-wrap"
              ><code>{{ solution.js }}</code></pre>
            </div>

            <!-- Conseil pédagogique -->
            <div class="p-3 bg-gray-800/30 border-t border-gray-700">
              <div class="flex items-start gap-2 text-xs text-gray-400">
                <UIcon name="i-lucide-graduation-cap" class="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Essayez de résoudre l'exercice par vous-même avant de consulter la solution. L'apprentissage est plus efficace quand on cherche activement !</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
        </div>
      </template>
    </UiResizablePanels>
  </div>
</template>

<style scoped>
.split-output-panel {
  min-height: 400px;
}

.console-content::-webkit-scrollbar {
  width: 8px;
}

.console-content::-webkit-scrollbar-track {
  background: var(--color-editor-scrollbar-track);
}

.console-content::-webkit-scrollbar-thumb {
  background: var(--color-editor-scrollbar-thumb);
  border-radius: 4px;
}

.console-content::-webkit-scrollbar-thumb:hover {
  background: var(--color-editor-scrollbar-hover);
}
</style>
