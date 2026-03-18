<script setup lang="ts">
/**
 * HtmlCssJsCodePanel - Panneau de l'éditeur multi-langages
 *
 * Affiche :
 * - L'éditeur multi-panneaux (HTML | CSS | JS)
 * - 5 boutons d'action (Run, Copy, Reset, Prettify, View Solution)
 */

import type { HtmlCssJsCode } from '~/types/htmlCssJs'

interface Props {
  initialCode: HtmlCssJsCode
  isExecuting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isExecuting: false
})

const emit = defineEmits<{
  (e: 'execute', code: HtmlCssJsCode): void
  (e: 'code-change', code: HtmlCssJsCode): void
  (e: 'reset'): void
  (e: 'view-solution'): void
}>()

const toast = useToast()

// Référence vers l'éditeur pour accéder aux méthodes exposées
const editorRef = ref<any>(null)

// Quand l'éditeur émet 'execute', on propage vers le parent
const handleExecute = (code: HtmlCssJsCode) => {
  emit('execute', code)
}

// Quand l'éditeur émet 'code-change', on propage vers le parent (auto-save)
const handleCodeChange = (code: HtmlCssJsCode) => {
  emit('code-change', code)
}

/**
 * Bouton Run - Exécute le code
 */
const handleRun = () => {
  if (!editorRef.value) return
  editorRef.value.executeCode()
}

/**
 * Bouton Copy - Copie tout le code
 */
const handleCopyCode = async () => {
  if (!editorRef.value) return
  const code = editorRef.value.getCode() as HtmlCssJsCode

  // Formater en un seul bloc copiable
  const fullCode = `<!-- HTML -->
${code.html || ''}

/* CSS */
${code.css || ''}

// JavaScript
${code.js || ''}`

  try {
    await navigator.clipboard.writeText(fullCode)
    toast.add({
      title: 'Code copié !',
      description: 'Le code HTML/CSS/JS a été copié dans le presse-papiers',
      color: 'green',
      timeout: 2000
    })
  } catch (error) {
    toast.add({
      title: 'Erreur',
      description: 'Impossible de copier le code',
      color: 'red',
      timeout: 2000
    })
  }
}

/**
 * Bouton Reset - Réinitialise le code
 */
const handleReset = () => {
  emit('reset')
}

/**
 * Bouton Prettify - Formate le code
 */
const handlePrettify = () => {
  if (!editorRef.value) return
  const code = editorRef.value.getCode() as HtmlCssJsCode

  try {
    const formatted: HtmlCssJsCode = {
      html: prettifyHtml(code.html || ''),
      css: prettifyCss(code.css || ''),
      js: prettifyJs(code.js || '')
    }
    editorRef.value.setCode(formatted)

    toast.add({
      title: 'Code formaté !',
      description: 'Le code a été reformaté',
      color: 'blue',
      timeout: 2000
    })
  } catch (error) {
    toast.add({
      title: 'Erreur de formatage',
      description: 'Impossible de formater le code',
      color: 'orange',
      timeout: 2000
    })
  }
}

/**
 * Bouton View Solution - Affiche la solution
 */
const handleViewSolution = () => {
  emit('view-solution')
}

/**
 * Formatage simple du HTML
 */
const prettifyHtml = (code: string): string => {
  let formatted = ''
  let indentLevel = 0
  const indentSize = 2

  // Split by tags while keeping tags
  const parts = code.split(/(<[^>]+>)/g).filter(Boolean)

  for (const part of parts) {
    const trimmed = part.trim()
    if (!trimmed) continue

    // Check if closing tag
    if (trimmed.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1)
    }

    const indent = ' '.repeat(indentLevel * indentSize)

    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.startsWith('<!')) {
      formatted += indent + trimmed + '\n'
      // Self-closing tags don't increase indent
      if (!trimmed.endsWith('/>') && !trimmed.match(/<(br|hr|img|input|meta|link)/i)) {
        indentLevel++
      }
    } else if (trimmed.startsWith('</')) {
      formatted += indent + trimmed + '\n'
    } else {
      formatted += indent + trimmed + '\n'
      indentLevel = Math.max(0, indentLevel - 1)
    }
  }

  return formatted.trim()
}

/**
 * Formatage simple du CSS
 */
const prettifyCss = (code: string): string => {
  return code
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/;\s*/g, ';\n  ')
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/\n\s*\n/g, '\n')
    .replace(/  }/g, '}')
    .trim()
}

/**
 * Formatage simple du JavaScript
 */
const prettifyJs = (code: string): string => {
  let indentLevel = 0
  const indentSize = 2
  const lines = code.split('\n')
  const result: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
      indentLevel = Math.max(0, indentLevel - 1)
    }

    const indent = ' '.repeat(indentLevel * indentSize)
    result.push(indent + trimmed)

    if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
      indentLevel++
    }
  }

  return result.join('\n')
}
</script>

<template>
  <div class="code-panel h-full flex flex-col bg-gray-900">
    <!-- Éditeur multi-panneaux (flex-1 pour prendre toute la hauteur disponible) -->
    <div class="flex-1 overflow-hidden">
      <ExercisesMultiEditorPanel
        ref="editorRef"
        :initial-code="initialCode"
        @execute="handleExecute"
        @code-change="handleCodeChange"
      />
    </div>

    <!-- 5 boutons d'action -->
    <div class="border-t border-gray-700 bg-gray-800 p-4">
      <div class="flex items-center gap-3 flex-wrap">
        <!-- 1. Exécuter - Lance le code -->
        <UTooltip text="Exécuter">
          <UButton
            :icon="props.isExecuting ? '' : 'i-lucide-play'"
            :loading="props.isExecuting"
            :disabled="props.isExecuting"
            size="lg"
            color="green"
            variant="solid"
            :class="[
              'btn-run font-semibold shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-xl active:translate-y-0',
              props.isExecuting
                ? '!bg-green-600 !text-white'
                : '!bg-green-500 !text-blue-900 hover:!bg-green-400'
            ]"
            aria-label="Exécuter le code"
            @click="handleRun"
          >
            {{ props.isExecuting ? 'Exécution...' : 'Exécuter' }}
            <span v-if="!props.isExecuting" class="ml-2 text-xs hidden md:inline">
              <kbd class="px-1.5 py-0.5 bg-blue-900/30 rounded text-blue-900">Ctrl+Enter</kbd>
            </span>
          </UButton>
        </UTooltip>

        <!-- 2. Copier - Copie le code dans le presse-papiers -->
        <UTooltip text="Copier le code">
          <UButton
            icon="i-lucide-copy"
            size="md"
            color="gray"
            variant="soft"
            class="!text-gray-200 hover:!text-white cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0"
            aria-label="Copier le code"
            @click="handleCopyCode"
          />
        </UTooltip>

        <!-- 3. Réinitialiser - Remet le code de départ -->
        <UTooltip text="Réinitialiser">
          <UButton
            icon="i-lucide-refresh-cw"
            size="md"
            color="orange"
            variant="soft"
            class="!text-orange-200 hover:!text-white cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0"
            aria-label="Réinitialiser le code"
            @click="handleReset"
          />
        </UTooltip>

        <!-- 4. Formater - Indente correctement le code -->
        <UTooltip text="Formater le code">
          <UButton
            icon="i-lucide-sparkles"
            size="md"
            color="blue"
            variant="soft"
            class="!text-blue-200 hover:!text-white cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0"
            aria-label="Formater le code"
            @click="handlePrettify"
          />
        </UTooltip>

        <!-- Spacer pour pousser Voir solution à droite -->
        <div class="flex-1"></div>

        <!-- 5. Voir solution - Affiche la solution (aligné à droite) -->
        <UTooltip text="Voir la solution">
          <UButton
            icon="i-lucide-lightbulb"
            size="md"
            color="yellow"
            variant="soft"
            class="!text-yellow-200 hover:!text-white cursor-pointer transition-all duration-200 hover:-translate-y-px hover:shadow-lg active:translate-y-0"
            aria-label="Afficher la solution"
            @click="handleViewSolution"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>
