<script setup lang="ts">
/**
 * Slideover pour afficher les détails complets d'un exercice élève
 *
 * Affiche :
 * - Code sauvegardé (lecture seule)
 * - Statistiques détaillées (temps, exécutions, erreurs)
 * - Liste des erreurs rencontrées
 * - Contexte de debug (navigateur, OS, etc.)
 */

import type { HtmlCssJsCode } from '~/types/htmlCssJs'
import type { ExerciseProgress, ExerciseError, DebugContextData } from '~/types/database.types'

interface Props {
  open: boolean
  studentName: string
  exerciseTitle: string
  progress: ExerciseProgress | null
  errors: ExerciseError[]
  isLoadingErrors?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoadingErrors: false
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value)
})

// Onglet actif
const activeTab = ref('code')

// Détecte le format du code (JS string ou JSON HTML/CSS/JS)
const parsedCode = computed<{ type: 'javascript'; code: string } | { type: 'html-css-js'; code: HtmlCssJsCode } | null>(() => {
  if (!props.progress?.saved_code) return null

  try {
    const parsed = JSON.parse(props.progress.saved_code)
    if (parsed && typeof parsed === 'object' && 'html' in parsed) {
      return {
        type: 'html-css-js',
        code: {
          html: typeof parsed.html === 'string' ? parsed.html : '',
          css: typeof parsed.css === 'string' ? parsed.css : '',
          js: typeof parsed.js === 'string' ? parsed.js : ''
        }
      }
    }
  } catch {
    // Pas du JSON → c'est du JavaScript
  }

  return { type: 'javascript', code: props.progress.saved_code }
})

// Couleurs et labels pour le statut
const statusConfig = computed(() => {
  switch (props.progress?.status) {
    case 'completed':
      return { color: 'success' as const, label: 'Complété', icon: 'i-lucide-check-circle' }
    case 'in-progress':
      return { color: 'warning' as const, label: 'En cours', icon: 'i-lucide-play-circle' }
    default:
      return { color: 'neutral' as const, label: 'Pas commencé', icon: 'i-lucide-circle' }
  }
})

// Formatage de la date
const formatDate = (dateStr: string | null): string | null => {
  if (!dateStr) return null

  try {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('fr-CH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  } catch {
    return null
  }
}

// Formatage du temps passé
const formatDuration = (seconds: number | null | undefined): string => {
  if (!seconds || seconds === 0) return '—'

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}min`
  }
  if (minutes > 0) {
    return `${minutes}min ${secs}s`
  }
  return `${secs}s`
}

// Taux de réussite
const successRate = computed(() => {
  if (!props.progress?.executions_count || props.progress.executions_count === 0) return null
  const rate = (props.progress.successful_runs / props.progress.executions_count) * 100
  return Math.round(rate)
})

// Debug context formaté
const debugContext = computed(() => props.progress?.debug_context as DebugContextData | null)
</script>

<template>
  <USlideover v-model:open="isOpen" side="right" :ui="{ content: 'w-full max-w-2xl' }">
    <template #header>
      <div class="flex items-start justify-between gap-3 w-full">
        <div class="min-w-0">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white truncate">
            {{ studentName }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">
            {{ exerciseTitle }}
          </p>
        </div>
        <UBadge :color="statusConfig.color" variant="subtle" class="shrink-0">
          <UIcon :name="statusConfig.icon" class="w-3.5 h-3.5 mr-1" />
          {{ statusConfig.label }}
        </UBadge>
      </div>
    </template>

    <template #body>
      <!-- Onglets -->
      <UTabs
        v-model="activeTab"
        :items="[
          { label: 'Code', value: 'code', icon: 'i-lucide-code' },
          { label: 'Stats', value: 'stats', icon: 'i-lucide-bar-chart-3' },
          { label: `Erreurs (${errors.length})`, value: 'errors', icon: 'i-lucide-alert-triangle' },
          { label: 'Debug', value: 'debug', icon: 'i-lucide-bug' }
        ]"
        class="mb-4"
      />

      <!-- Tab: Code -->
      <div v-show="activeTab === 'code'">
        <!-- Code JavaScript -->
        <div v-if="parsedCode?.type === 'javascript'" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <ExercisesExerciseEditor
            :initial-code="parsedCode.code"
            :read-only="true"
            language="javascript"
          />
        </div>

        <!-- Code HTML/CSS/JS -->
        <div v-else-if="parsedCode?.type === 'html-css-js'" class="space-y-3">
          <div v-if="parsedCode.code.html" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              HTML
            </div>
            <ExercisesExerciseEditor
              :initial-code="parsedCode.code.html"
              :read-only="true"
              language="html"
            />
          </div>

          <div v-if="parsedCode.code.css" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              CSS
            </div>
            <ExercisesExerciseEditor
              :initial-code="parsedCode.code.css"
              :read-only="true"
              language="css"
            />
          </div>

          <div v-if="parsedCode.code.js" class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              JavaScript
            </div>
            <ExercisesExerciseEditor
              :initial-code="parsedCode.code.js"
              :read-only="true"
              language="javascript"
            />
          </div>
        </div>

        <!-- État vide -->
        <div v-else class="text-center py-12">
          <UIcon name="i-lucide-code-2" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Aucun code sauvegardé
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            L'élève n'a pas encore écrit de code pour cet exercice.
          </p>
        </div>
      </div>

      <!-- Tab: Statistiques -->
      <div v-show="activeTab === 'stats'">
        <div class="grid grid-cols-2 gap-3 mb-6">
          <!-- Temps passé -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
            <UIcon name="i-lucide-clock" class="w-6 h-6 mx-auto text-blue-500 mb-1" />
            <div class="text-xl font-bold text-gray-900 dark:text-white">
              {{ formatDuration(progress?.time_spent_seconds) }}
            </div>
            <div class="text-xs text-gray-500">Temps passé</div>
          </div>

          <!-- Tentatives -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
            <UIcon name="i-lucide-repeat" class="w-6 h-6 mx-auto text-orange-500 mb-1" />
            <div class="text-xl font-bold text-gray-900 dark:text-white">
              {{ progress?.attempts || 0 }}
            </div>
            <div class="text-xs text-gray-500">Tentatives</div>
          </div>

          <!-- Exécutions -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
            <UIcon name="i-lucide-play" class="w-6 h-6 mx-auto text-green-500 mb-1" />
            <div class="text-xl font-bold text-gray-900 dark:text-white">
              {{ progress?.executions_count || 0 }}
            </div>
            <div class="text-xs text-gray-500">Exécutions</div>
          </div>

          <!-- Taux de réussite -->
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center">
            <UIcon name="i-lucide-target" class="w-6 h-6 mx-auto text-purple-500 mb-1" />
            <div class="text-xl font-bold text-gray-900 dark:text-white">
              {{ successRate !== null ? `${successRate}%` : '—' }}
            </div>
            <div class="text-xs text-gray-500">Taux réussite</div>
          </div>
        </div>

        <!-- Détails supplémentaires -->
        <div class="space-y-3">
          <div class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-400 text-sm">Première ouverture</span>
            <span class="font-medium text-gray-900 dark:text-white text-sm">
              {{ formatDate(progress?.first_opened_at) || '—' }}
            </span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-400 text-sm">Dernière sauvegarde</span>
            <span class="font-medium text-gray-900 dark:text-white text-sm">
              {{ formatDate(progress?.last_code_save_at) || '—' }}
            </span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-400 text-sm">Complété le</span>
            <span class="font-medium text-gray-900 dark:text-white text-sm">
              {{ formatDate(progress?.completed_at) || '—' }}
            </span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-400 text-sm">Indices révélés</span>
            <span class="font-medium text-gray-900 dark:text-white text-sm">
              {{ progress?.hints_revealed || 0 }}
            </span>
          </div>
          <div class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span class="text-gray-600 dark:text-gray-400 text-sm">Solution consultée</span>
            <span class="font-medium text-sm" :class="progress?.solution_viewed ? 'text-orange-500' : 'text-green-500'">
              {{ progress?.solution_viewed ? `Oui (${formatDate(progress.solution_viewed_at)})` : 'Non' }}
            </span>
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-gray-600 dark:text-gray-400 text-sm">Nombre d'erreurs</span>
            <span class="font-medium text-gray-900 dark:text-white text-sm">
              {{ progress?.errors_count || 0 }}
            </span>
          </div>
        </div>
      </div>

      <!-- Tab: Erreurs -->
      <div v-show="activeTab === 'errors'">
        <div v-if="isLoadingErrors" class="text-center py-8">
          <UIcon name="i-lucide-loader-2" class="w-8 h-8 mx-auto text-gray-400 animate-spin" />
          <p class="text-gray-500 mt-2">Chargement des erreurs...</p>
        </div>

        <div v-else-if="errors.length === 0" class="text-center py-12">
          <UIcon name="i-lucide-check-circle" class="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Aucune erreur enregistrée
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            L'élève n'a pas rencontré d'erreur sur cet exercice.
          </p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="error in errors"
            :key="error.id"
            class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
          >
            <div class="flex items-start justify-between gap-2 mb-2">
              <div class="flex items-center gap-2">
                <UBadge color="error" variant="subtle" size="sm">
                  {{ error.error_type }}
                </UBadge>
                <span v-if="error.error_line" class="text-xs text-gray-500">
                  Ligne {{ error.error_line }}
                </span>
              </div>
              <span class="text-xs text-gray-500 shrink-0">
                {{ formatDate(error.created_at) }}
              </span>
            </div>
            <p class="text-sm text-red-700 dark:text-red-300 font-mono break-all">
              {{ error.error_message }}
            </p>
            <details v-if="error.code_snapshot" class="mt-2">
              <summary class="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                Voir le code au moment de l'erreur
              </summary>
              <pre class="mt-2 p-2 bg-gray-900 text-gray-100 text-xs rounded overflow-x-auto">{{ error.code_snapshot }}</pre>
            </details>
          </div>
        </div>
      </div>

      <!-- Tab: Debug -->
      <div v-show="activeTab === 'debug'">
        <div v-if="!debugContext" class="text-center py-12">
          <UIcon name="i-lucide-bug" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Aucune info de debug
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            Les informations de debug ne sont pas disponibles.
          </p>
        </div>

        <div v-else class="space-y-4">
          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <UIcon name="i-lucide-monitor" class="w-4 h-4" />
              Environnement
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Navigateur</span>
                <span class="font-medium">{{ debugContext.browser }} {{ debugContext.browser_version }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">OS</span>
                <span class="font-medium">{{ debugContext.os }} {{ debugContext.os_version }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Appareil</span>
                <span class="font-medium capitalize">{{ debugContext.device_type }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Écran</span>
                <span class="font-medium">{{ debugContext.screen_width }}×{{ debugContext.screen_height }}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <UIcon name="i-lucide-globe" class="w-4 h-4" />
              Session
            </h4>
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Version app</span>
                <span class="font-medium">{{ debugContext.app_version }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Timezone</span>
                <span class="font-medium">{{ debugContext.timezone }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Locale</span>
                <span class="font-medium">{{ debugContext.locale }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Session ID</span>
                <span class="font-mono text-xs break-all">{{ debugContext.session_id }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>
