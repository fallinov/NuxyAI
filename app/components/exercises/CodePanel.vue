<script setup lang="ts">
/**
 * CodePanel - Panneau de l'éditeur de code
 *
 * Affiche :
 * - L'éditeur CodeMirror
 * - 5 boutons d'action style Codecademy (Run, Copy, Reset, Prettify, View Solution)
 */

interface Props {
  initialCode: string
  isExecuting?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isExecuting: false
})
const emit = defineEmits<{
  (e: 'execute', code: string): void
  (e: 'code-change', code: string): void
  (e: 'reset'): void
  (e: 'view-solution'): void
}>()

const toast = useToast()

// Référence vers l'éditeur pour accéder aux méthodes exposées
const editorRef = ref<any>(null)

// Le code est maintenu par l'éditeur
// Quand l'éditeur émet 'execute', on propage vers le parent
const handleExecute = (code: string) => {
  emit('execute', code)
}

// Quand l'éditeur émet 'code-change', on propage vers le parent (auto-save)
const handleCodeChange = (code: string) => {
  emit('code-change', code)
}

/**
 * Bouton Run - Exécute le code
 */
const handleRun = () => {
  if (!editorRef.value) return
  // Appeler executeCode() de l'éditeur pour exécuter le code
  editorRef.value.executeCode()
}

/**
 * Bouton Copy File - Copie le code dans le clipboard
 */
const handleCopyCode = async () => {
  if (!editorRef.value) return
  const code = editorRef.value.getCode()

  try {
    await navigator.clipboard.writeText(code)
    toast.add({
      title: 'Code copié !',
      description: 'Le code a été copié dans le presse-papiers',
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
 * Bouton Prettify - Formate le code JavaScript
 */
const handlePrettify = () => {
  if (!editorRef.value) return
  const code = editorRef.value.getCode()

  try {
    // Formatage simple du code JavaScript
    const formatted = prettifyCode(code)
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
 * Fonction de formatage simple du code
 */
const prettifyCode = (code: string): string => {
  let formatted = code
  let indentLevel = 0
  const indentSize = 2
  const lines = code.split('\n')
  const result: string[] = []

  for (let line of lines) {
    const trimmed = line.trim()

    // Décrémenter l'indentation avant les accolades fermantes
    if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
      indentLevel = Math.max(0, indentLevel - 1)
    }

    // Ajouter l'indentation
    const indent = ' '.repeat(indentLevel * indentSize)
    result.push(indent + trimmed)

    // Incrémenter l'indentation après les accolades ouvrantes
    if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
      indentLevel++
    }
  }

  return result.join('\n')
}
</script>

<template>
  <div class="code-panel h-full flex flex-col bg-gray-900">
    <!-- Éditeur (flex-1 pour prendre toute la hauteur disponible) -->
    <div class="flex-1 overflow-hidden">
      <ExercisesExerciseEditor
        ref="editorRef"
        :initial-code="initialCode"
        @execute="handleExecute"
        @code-change="handleCodeChange"
      />
    </div>

    <!-- 5 boutons d'action style Codecademy -->
    <div class="border-t border-gray-700 bg-gray-800 p-4">
      <div class="flex items-center gap-3 flex-wrap">
        <!-- 1. Exécuter - Lance le code JavaScript -->
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
            aria-label="Exécuter le code JavaScript"
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
            aria-label="Copier le code dans le presse-papiers"
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
            aria-label="Réinitialiser le code au contenu initial"
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
            aria-label="Formater le code automatiquement"
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
            aria-label="Afficher la solution de l'exercice"
            @click="handleViewSolution"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>
