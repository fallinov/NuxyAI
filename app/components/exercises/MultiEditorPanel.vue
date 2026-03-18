<script setup lang="ts">
/**
 * MultiEditorPanel - Éditeur multi-panneaux pour HTML/CSS/JS
 *
 * Composant avec onglets UTabs pour éditer HTML, CSS et JavaScript
 * dans des panneaux séparés, style CodePen.
 */

import { ref, computed } from 'vue'
import type { TabsItem } from '@nuxt/ui'
import type { HtmlCssJsCode } from '~/types/htmlCssJs'

// Helper pour s'assurer qu'une valeur est une string
const ensureString = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (value === null || value === undefined) return ''
  return String(value)
}

// Props
interface Props {
  initialCode?: HtmlCssJsCode
  readOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readOnly: false,
  initialCode: () => ({ html: '', css: '', js: '' })
})

// Événements émis
const emit = defineEmits<{
  'code-change': [code: HtmlCssJsCode]
  'execute': [code: HtmlCssJsCode]
}>()

// État de l'éditeur
const activeTab = ref('html')

// Code pour chaque langage (avec normalisation explicite en string)
const htmlCode = ref(ensureString(props.initialCode?.html))
const cssCode = ref(ensureString(props.initialCode?.css))
const jsCode = ref(ensureString(props.initialCode?.js))

// Références aux éditeurs
const htmlEditor = ref<InstanceType<typeof import('./ExerciseEditor.vue').default> | null>(null)
const cssEditor = ref<InstanceType<typeof import('./ExerciseEditor.vue').default> | null>(null)
const jsEditor = ref<InstanceType<typeof import('./ExerciseEditor.vue').default> | null>(null)

// Définition des onglets pour UTabs
const tabs: TabsItem[] = [
  { label: 'HTML', icon: 'i-lucide-code', value: 'html', slot: 'html' as const },
  { label: 'CSS', icon: 'i-lucide-paintbrush', value: 'css', slot: 'css' as const },
  { label: 'JS', icon: 'i-lucide-zap', value: 'js', slot: 'js' as const }
]

// Code actuel combiné
const currentCode = computed<HtmlCssJsCode>(() => ({
  html: htmlCode.value,
  css: cssCode.value,
  js: jsCode.value
}))

// Gestionnaires de changement de code
function handleHtmlChange(code: string) {
  htmlCode.value = code
  emitCodeChange()
}

function handleCssChange(code: string) {
  cssCode.value = code
  emitCodeChange()
}

function handleJsChange(code: string) {
  jsCode.value = code
  emitCodeChange()
}

// Debounce timer pour l'émission
let debounceTimer: ReturnType<typeof setTimeout> | null = null

function emitCodeChange() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    emit('code-change', currentCode.value)
  }, 300)
}

// Exécution (émise depuis n'importe quel éditeur via Ctrl+Enter)
function handleExecute() {
  emit('execute', currentCode.value)
}

// Méthodes exposées au parent
function getCode(): HtmlCssJsCode {
  return currentCode.value
}

function setCode(code: HtmlCssJsCode) {
  if (code.html !== undefined) {
    const html = ensureString(code.html)
    htmlCode.value = html
    htmlEditor.value?.setCode(html)
  }
  if (code.css !== undefined) {
    const css = ensureString(code.css)
    cssCode.value = css
    cssEditor.value?.setCode(css)
  }
  if (code.js !== undefined) {
    const js = ensureString(code.js)
    jsCode.value = js
    jsEditor.value?.setCode(js)
  }
}

function executeCode() {
  handleExecute()
}

// Exposer les méthodes
defineExpose({
  getCode,
  setCode,
  executeCode
})

// Note: Le watch sur initialCode a été supprimé car il causait des problèmes
// de curseur qui se déplace. L'éditeur est recréé via :key quand on veut reset.
</script>

<template>
  <div class="multi-editor-panel h-full flex flex-col bg-editor-bg">
    <UTabs
      v-model="activeTab"
      :items="tabs"
      :content="false"
      :unmount-on-hide="false"
      :ui="{
        root: 'border-b border-gray-700 bg-gray-900',
        list: 'bg-transparent',
        indicator: 'hidden',
        trigger: 'data-[state=active]:bg-gray-800 data-[state=active]:text-white text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 focus:outline-none focus-visible:outline-none focus-visible:ring-0 outline-none ring-0'
      }"
    />

    <!-- Panneaux d'édition (toujours montés, visibilité contrôlée par v-show) -->
    <div class="editors-container flex-1 relative overflow-hidden">
      <!-- Panneau HTML -->
      <div
        v-show="activeTab === 'html'"
        class="absolute inset-0 h-full"
      >
        <ExercisesExerciseEditor
          ref="htmlEditor"
          :initial-code="htmlCode"
          :read-only="readOnly"
          language="html"
          placeholder="<!-- Écrivez votre HTML ici -->"
          @code-change="handleHtmlChange"
          @execute="handleExecute"
        />
      </div>

      <!-- Panneau CSS -->
      <div
        v-show="activeTab === 'css'"
        class="absolute inset-0 h-full"
      >
        <ExercisesExerciseEditor
          ref="cssEditor"
          :initial-code="cssCode"
          :read-only="readOnly"
          language="css"
          placeholder="/* Écrivez votre CSS ici */"
          @code-change="handleCssChange"
          @execute="handleExecute"
        />
      </div>

      <!-- Panneau JS -->
      <div
        v-show="activeTab === 'js'"
        class="absolute inset-0 h-full"
      >
        <ExercisesExerciseEditor
          ref="jsEditor"
          :initial-code="jsCode"
          :read-only="readOnly"
          language="javascript"
          placeholder="// Écrivez votre JavaScript ici"
          @code-change="handleJsChange"
          @execute="handleExecute"
        />
      </div>
    </div>
  </div>
</template>
