<script setup lang="ts">
/**
 * TerminalBlock - Bloc terminal pour les exemples de commandes
 *
 * Composant MDC pour ::terminal-block
 * Affiche une commande avec préfixe $ et bouton copier.
 * Optionnellement affiche la sortie de la commande.
 */

const props = defineProps<{
  command: string
  output?: string
}>()

const copied = ref(false)

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(props.command)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
  }
}
</script>

<template>
  <div class="rounded-lg bg-gray-900 overflow-hidden my-4">
    <!-- Barre de titre -->
    <div class="flex items-center justify-between px-4 py-2 bg-gray-800/50">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <div class="w-3 h-3 rounded-full bg-red-500/70" />
          <div class="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div class="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span class="text-xs text-gray-500 ml-2 font-mono">terminal</span>
      </div>
      <UButton
        :icon="copied ? 'i-lucide-check' : 'i-lucide-clipboard'"
        variant="ghost"
        color="neutral"
        size="xs"
        :class="copied ? 'text-nuxy-green' : 'text-gray-400 hover:text-gray-200'"
        :aria-label="copied ? 'Copié !' : 'Copier la commande'"
        @click="copyCommand"
      />
    </div>

    <!-- Commande -->
    <div class="px-4 py-3">
      <code class="font-mono text-sm text-green-400 flex items-start gap-2">
        <span class="text-gray-500 select-none flex-shrink-0">$</span>
        <span class="break-all">{{ command }}</span>
      </code>
    </div>

    <!-- Sortie (optionnelle) -->
    <div v-if="output" class="px-4 pb-3 border-t border-gray-800">
      <pre class="font-mono text-sm text-gray-400 whitespace-pre-wrap mt-2">{{ output }}</pre>
    </div>
  </div>
</template>
