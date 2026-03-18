<script setup lang="ts">
/**
 * TerminalBlock - Bloc terminal stylisé pour les commandes
 *
 * Composant MDC : le contenu entre ::terminal-block et :: est passé
 * comme slot default par Nuxt Content. On extrait le texte du slot.
 *
 * Détecte l'OS du visiteur pour adapter le prompt ($ ou PS>).
 */

const slots = useSlots()
const copied = ref(false)

// Détection OS côté client
const userOS = ref<'mac' | 'windows' | 'linux'>('mac')

onMounted(() => {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) {
    userOS.value = 'windows'
  } else if (ua.includes('linux')) {
    userOS.value = 'linux'
  } else {
    userOS.value = 'mac'
  }
})

// Prompt selon l'OS
const promptChar = computed(() => userOS.value === 'windows' ? 'PS>' : '$')

// Extraire le texte brut des VNodes du slot
function extractText(nodes: unknown[]): string {
  return nodes.map((node: unknown) => {
    if (typeof node === 'string') return node
    const v = node as { children?: unknown; type?: unknown }
    if (typeof v.children === 'string') return v.children
    if (Array.isArray(v.children)) return extractText(v.children)
    return ''
  }).join('')
}

// Texte de la commande extrait du slot MDC
const commandText = computed(() => {
  if (!slots.default) return ''
  const vnodes = slots.default()
  return extractText(vnodes).trim()
})

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(commandText.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Erreur copie:', err)
  }
}
</script>

<template>
  <div class="not-prose rounded-lg bg-gray-900 overflow-hidden my-6">
    <!-- Barre de titre -->
    <div class="flex items-center justify-between px-4 py-2 bg-gray-800/60">
      <div class="flex items-center gap-2">
        <div class="flex gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div class="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <ClientOnly>
          <span class="text-xs text-gray-500 ml-2 font-mono">
            {{ userOS === 'windows' ? 'PowerShell' : 'terminal' }}
          </span>
          <template #fallback>
            <span class="text-xs text-gray-500 ml-2 font-mono">terminal</span>
          </template>
        </ClientOnly>
      </div>
      <button
        class="text-xs px-2 py-1 rounded transition-colors"
        :class="copied ? 'text-nuxy-green' : 'text-gray-400 hover:text-gray-200'"
        @click="copyCommand"
      >
        {{ copied ? 'Copié !' : 'Copier' }}
      </button>
    </div>

    <!-- Commande -->
    <div class="px-4 py-3">
      <pre class="font-mono text-sm text-green-400 whitespace-pre-wrap leading-relaxed"><ClientOnly><span class="text-gray-500 select-none">{{ promptChar }} </span><template #fallback><span class="text-gray-500 select-none">$ </span></template></ClientOnly>{{ commandText }}</pre>
    </div>
  </div>
</template>
