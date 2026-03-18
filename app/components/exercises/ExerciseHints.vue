<script setup lang="ts">
/**
 * ExerciseHints - Système de hints progressifs
 *
 * Affiche des indices pédagogiques de manière progressive
 * pour aider l'utilisateur sans tout révéler d'un coup.
 * Inspiré de LeetCode et Exercism.
 */

interface Hint {
  title: string
  content: string
  example?: string
  learnMore?: string
}

interface Props {
  hints?: Hint[]
  showAllByDefault?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hints: () => [],
  showAllByDefault: false
})

const emit = defineEmits<{
  'hint-revealed': []
}>()

// Nombre d'indices révélés
const revealedHints = ref(0)

// Révéler le prochain indice
const revealNextHint = () => {
  if (revealedHints.value < props.hints.length) {
    revealedHints.value++
    emit('hint-revealed')
  }
}

// Réinitialiser les indices
const resetHints = () => {
  revealedHints.value = 0
}

// Révéler tous les indices
const revealAllHints = () => {
  revealedHints.value = props.hints.length
}

// Au montage, afficher tous les indices si demandé
onMounted(() => {
  if (props.showAllByDefault) {
    revealAllHints()
  }
})

// Exposer les méthodes au parent
defineExpose({
  resetHints,
  revealAllHints
})
</script>

<template>
  <div v-if="hints.length > 0" class="space-y-4">
    <!-- En-tête -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-lightbulb" class="w-5 h-5 text-nuxy-gold" />
        <h3 class="font-semibold text-gray-900 dark:text-gray-100">
          Indices ({{ revealedHints }}/{{ hints.length }})
        </h3>
      </div>

      <!-- Boutons d'action -->
      <div class="flex gap-2">
        <UButton
          v-if="revealedHints < hints.length"
          size="sm"
          color="primary"
          variant="soft"
          @click="revealNextHint"
        >
          <UIcon name="i-lucide-eye" class="w-4 h-4 mr-1" />
          Révéler un indice
        </UButton>

        <UButton
          v-if="revealedHints > 0 && revealedHints < hints.length"
          size="sm"
          color="neutral"
          variant="ghost"
          @click="revealAllHints"
        >
          Tout afficher
        </UButton>

        <UButton
          v-if="revealedHints > 0"
          size="sm"
          color="neutral"
          variant="ghost"
          @click="resetHints"
        >
          <UIcon name="i-lucide-refresh-cw" class="w-4 h-4" />
        </UButton>
      </div>
    </div>

    <!-- Liste des indices (nuxy-gold pour les hints) -->
    <div class="space-y-3">
      <!-- Indices révélés -->
      <div
        v-for="(hint, index) in hints.slice(0, revealedHints)"
        :key="index"
        class="bg-nuxy-gold/10 dark:bg-nuxy-gold/20 border-l-4 border-nuxy-gold rounded-lg p-4 animate-fade-in"
      >
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 w-6 h-6 bg-nuxy-gold text-nuxy-black rounded-full flex items-center justify-center text-sm font-bold">
            {{ index + 1 }}
          </div>
          <div class="flex-1 space-y-2">
            <h4 class="font-medium text-nuxy-gold-dark dark:text-nuxy-gold">
              {{ hint.title }}
            </h4>
            <p class="text-sm text-nuxy-gold-dark/80 dark:text-nuxy-gold/90">
              {{ hint.content }}
            </p>
            <div
              v-if="hint.example"
              class="mt-3 bg-gray-900 text-gray-100 rounded-md p-3 text-sm font-mono"
            >
              <pre class="whitespace-pre-wrap">{{ hint.example }}</pre>
            </div>
            <a
              v-if="hint.learnMore"
              :href="hint.learnMore"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-2 inline-flex items-center gap-1 text-sm text-nuxy-teal hover:text-nuxy-teal-dark dark:text-nuxy-teal dark:hover:text-nuxy-teal-light transition-colors"
            >
              <UIcon name="i-lucide-external-link" class="w-3.5 h-3.5" />
              En savoir plus
            </a>
          </div>
        </div>
      </div>

      <!-- Indices non révélés (aperçu) -->
      <div
        v-for="index in hints.length - revealedHints"
        :key="`locked-${index}`"
        class="bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-300 dark:border-gray-600 rounded-lg p-4 opacity-50"
      >
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-lock" class="w-5 h-5 text-gray-400" />
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Indice {{ revealedHints + index }} verrouillé
          </span>
        </div>
      </div>
    </div>

    <!-- Message d'encouragement -->
    <div
      v-if="revealedHints === hints.length && hints.length > 0"
      class="text-center text-sm text-gray-600 dark:text-gray-400 italic"
    >
      Tu as consulté tous les indices. Utilise-les pour résoudre l'exercice !
    </div>
  </div>
</template>
