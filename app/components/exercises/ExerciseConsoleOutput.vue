<script setup lang="ts">
/**
 * ExerciseConsoleOutput - Affichage pédagogique de la console
 *
 * Composant d'affichage des résultats d'exécution avec :
 * - Formatage professionnel des logs, erreurs, warnings
 * - Messages pédagogiques adaptés aux débutants
 * - Conseils et exemples pour les erreurs courantes
 * - Code couleur pour faciliter la lecture
 */

import { computed } from 'vue'
import type { PedagogicalError } from '~/utils/pedagogicalMessages'

interface ConsoleLog {
  type: 'log' | 'error' | 'warn' | 'info' | 'success' | 'table'
  content: string
  data?: any
  pedagogical?: PedagogicalError
}

interface Props {
  logs?: ConsoleLog[]
  errors?: ConsoleLog[]
  warnings?: PedagogicalError[]
  isExecuting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  logs: () => [],
  errors: () => [],
  warnings: () => [],
  isExecuting: false
})

// Combiner tous les messages dans l'ordre
// 1. Logs (résultats de console) en premier
// 2. Warnings pédagogiques (remarques)
// 3. Erreurs (avec messages pédagogiques)
const allMessages = computed(() => {
  const messages: any[] = []

  // Ajouter les logs en PREMIER (résultats de console)
  props.logs?.forEach(log => {
    messages.push(log)
  })

  // Ajouter les warnings pédagogiques APRÈS (remarques, astuces)
  props.warnings?.forEach(warning => {
    messages.push({
      type: 'pedagogical-warning',
      pedagogical: warning
    })
  })

  // Ajouter les erreurs EN DERNIER (avec messages pédagogiques)
  props.errors?.forEach(error => {
    messages.push(error)
  })

  return messages
})

// Afficher le code d'exemple en mode étendu
const expandedExamples = ref<Set<number>>(new Set())

const toggleExample = (index: number) => {
  if (expandedExamples.value.has(index)) {
    expandedExamples.value.delete(index)
  } else {
    expandedExamples.value.add(index)
  }
}
</script>

<template>
  <div class="font-mono text-sm leading-relaxed p-4 min-h-[150px] max-h-[400px] overflow-y-auto">
    <!-- Messages de console -->
    <div
      v-for="(message, index) in allMessages"
      :key="index"
      class="mb-3"
    >
      <!-- Warning pédagogique -->
      <div
        v-if="message.type === 'pedagogical-warning'"
        class="p-4 rounded-lg border-l-4 mb-4 bg-amber-50 dark:bg-amber-500/10 border-l-amber-500"
      >
        <div class="flex items-center gap-2 mb-2 font-semibold">
          <UIcon
            :name="message.pedagogical.type === 'warning' ? 'i-lucide-triangle-alert' : 'i-lucide-info'"
            :class="{
              'text-orange-500': message.pedagogical.type === 'warning',
              'text-blue-500': message.pedagogical.type === 'info'
            }"
            class="w-5 h-5"
          />
          <span class="text-gray-800 dark:text-gray-100">{{ message.pedagogical.title }}</span>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{{ message.pedagogical.message }}</p>
        <p
          v-if="message.pedagogical.hint"
          class="flex items-start gap-2 p-3 bg-yellow-400/10 dark:bg-yellow-400/15 rounded-md text-yellow-900 dark:text-yellow-300 mb-3"
        >
          <UIcon name="i-lucide-lightbulb" class="w-4 h-4 inline shrink-0 mt-0.5" />
          {{ message.pedagogical.hint }}
        </p>
        <div v-if="message.pedagogical.example" class="mt-3">
          <button
            class="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm cursor-pointer bg-transparent border-none py-1 transition-colors hover:text-gray-800 dark:hover:text-gray-100"
            @click="toggleExample(index)"
          >
            <UIcon
              :name="expandedExamples.has(index) ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
              class="w-4 h-4"
            />
            Voir un exemple
          </button>
          <pre
            v-if="expandedExamples.has(index)"
            class="mt-2 p-3 bg-slate-800 text-slate-200 rounded-md overflow-x-auto text-[13px] leading-relaxed"
          >{{ message.pedagogical.example }}</pre>
        </div>
      </div>

      <!-- Log normal -->
      <div
        v-else-if="message.type === 'log'"
        class="flex items-start gap-2 py-1.5 border-l-2 border-transparent pl-2 text-gray-700 dark:text-gray-300"
      >
        <span class="text-gray-400 font-bold shrink-0">›</span>
        <span class="flex-1 break-words whitespace-pre-wrap">{{ message.content }}</span>
      </div>

      <!-- Info -->
      <div
        v-else-if="message.type === 'info'"
        class="flex items-start gap-2 py-1.5 border-l-2 pl-2 text-blue-500 border-l-blue-500"
      >
        <UIcon name="i-lucide-info" class="w-4 h-4 shrink-0 mt-0.5" />
        <span class="flex-1 break-words whitespace-pre-wrap">{{ message.content }}</span>
      </div>

      <!-- Warning -->
      <div
        v-else-if="message.type === 'warn'"
        class="flex items-start gap-2 py-1.5 border-l-2 pl-2 text-amber-500 border-l-amber-500"
      >
        <UIcon name="i-lucide-triangle-alert" class="w-4 h-4 shrink-0 mt-0.5" />
        <span class="flex-1 break-words whitespace-pre-wrap">{{ message.content }}</span>
      </div>

      <!-- Success -->
      <div
        v-else-if="message.type === 'success'"
        class="flex items-start gap-2 py-1.5 border-l-2 pl-2 text-emerald-500 border-l-emerald-500"
      >
        <UIcon name="i-lucide-check-circle" class="w-4 h-4 shrink-0 mt-0.5" />
        <span class="flex-1 break-words whitespace-pre-wrap">{{ message.content }}</span>
      </div>

      <!-- Table -->
      <div
        v-else-if="message.type === 'table'"
        class="py-1.5 border-l-2 pl-2 border-l-purple-500"
      >
        <div class="flex items-center gap-2 text-purple-500 mb-1">
          <UIcon name="i-lucide-table" class="w-4 h-4 shrink-0" />
          <span class="text-xs font-medium">console.table</span>
        </div>
        <pre class="text-gray-700 dark:text-gray-300 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">{{ message.content }}</pre>
      </div>

      <!-- Erreur avec message pédagogique -->
      <div
        v-else-if="message.type === 'error' && message.pedagogical"
        class="p-4 rounded-lg border-l-4 mb-4 bg-red-50 dark:bg-red-500/10 border-l-red-500"
      >
        <div class="flex items-center gap-2 mb-2 font-semibold">
          <UIcon name="i-lucide-x-circle" class="text-red-500 w-5 h-5" />
          <span class="text-gray-800 dark:text-gray-100">{{ message.pedagogical.title }}</span>
        </div>
        <!-- Ligne de code fautive (si disponible) -->
        <div
          v-if="message.pedagogical.line"
          class="mb-3 rounded-md overflow-hidden border border-red-200 dark:border-red-500/30"
        >
          <div class="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 text-xs font-medium">
            <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />
            <span>Ligne {{ message.pedagogical.line }}</span>
          </div>
          <code
            v-if="message.pedagogical.codeLine"
            class="block px-3 py-2 bg-slate-800 text-red-300 text-sm font-mono whitespace-pre"
          >{{ message.pedagogical.codeLine }}</code>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{{ message.pedagogical.message }}</p>
        <p
          v-if="message.pedagogical.hint"
          class="flex items-start gap-2 p-3 bg-yellow-400/10 dark:bg-yellow-400/15 rounded-md text-yellow-900 dark:text-yellow-300 mb-3"
        >
          <UIcon name="i-lucide-lightbulb" class="w-4 h-4 inline text-yellow-500 shrink-0 mt-0.5" />
          <span><strong>Conseil :</strong> {{ message.pedagogical.hint }}</span>
        </p>
        <div v-if="message.pedagogical.example" class="mt-3">
          <button
            class="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm cursor-pointer bg-transparent border-none py-1 transition-colors hover:text-gray-800 dark:hover:text-gray-100"
            @click="toggleExample(index)"
          >
            <UIcon
              :name="expandedExamples.has(index) ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
              class="w-4 h-4"
            />
            Voir un exemple
          </button>
          <pre
            v-if="expandedExamples.has(index)"
            class="mt-2 p-3 bg-slate-800 text-slate-200 rounded-md overflow-x-auto text-[13px] leading-relaxed"
          >{{ message.pedagogical.example }}</pre>
        </div>
        <p
          v-if="message.pedagogical.learnMore"
          class="flex items-center gap-2 mt-3 pt-3 border-t border-black/10 dark:border-white/10 text-gray-500 dark:text-gray-400 text-sm"
        >
          <UIcon name="i-lucide-book-open" class="w-4 h-4 inline" />
          <span>En savoir plus :</span>
          <a
            :href="message.pedagogical.learnMore"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center font-semibold text-blue-500 dark:text-blue-400 no-underline transition-all border-b border-transparent hover:text-blue-600 dark:hover:text-blue-300 hover:border-blue-600 dark:hover:border-blue-300"
          >
            {{ message.pedagogical.learnMoreTitle || 'Documentation MDN' }}
            <UIcon name="i-lucide-external-link" class="w-3 h-3 inline ml-1" />
          </a>
        </p>
        <!-- Erreur technique (collapsed par défaut) -->
        <details class="mt-3 pt-3 border-t border-black/10 dark:border-white/10">
          <summary class="cursor-pointer text-gray-500 dark:text-gray-400 text-[13px] select-none">Détails techniques</summary>
          <code class="block mt-2 p-2 bg-slate-800 text-red-500 rounded text-xs overflow-x-auto">{{ message.content }}</code>
        </details>
      </div>

      <!-- Erreur simple (sans message pédagogique) -->
      <div
        v-else-if="message.type === 'error'"
        class="flex items-start gap-2 py-1.5 border-l-2 pl-2 text-red-500 border-l-red-500"
      >
        <UIcon name="i-lucide-x-circle" class="w-4 h-4 shrink-0 mt-0.5" />
        <span class="flex-1 break-words whitespace-pre-wrap">{{ message.content }}</span>
      </div>
    </div>

    <!-- Indicateur de chargement -->
    <div
      v-if="isExecuting"
      class="flex items-start gap-2 py-1.5 border-l-2 pl-2 text-blue-500 border-l-blue-500 animate-pulse"
    >
      <UIcon name="i-lucide-refresh-cw" class="w-4 h-4 shrink-0 mt-0.5 animate-spin" />
      <span class="flex-1 break-words whitespace-pre-wrap">Exécution en cours...</span>
    </div>

    <!-- Message par défaut si vide - amélioré pour être plus visible -->
    <div
      v-if="allMessages.length === 0 && !isExecuting"
      class="flex flex-col items-center justify-center min-h-[150px] text-gray-400"
    >
      <div>
        <UIcon name="i-lucide-circle-play" class="w-12 h-12 text-nuxy-green dark:text-nuxy-green-light" />
      </div>
      <p class="text-gray-700 dark:text-gray-300 text-base font-medium mt-3">
        Cliquez sur <span class="text-nuxy-green-dark dark:text-nuxy-green font-semibold">Exécuter</span> pour voir les résultats
      </p>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
        Raccourci : <kbd class="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs font-mono">Ctrl+Enter</kbd>
      </p>
    </div>
  </div>
</template>
