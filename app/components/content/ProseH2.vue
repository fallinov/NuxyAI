<script setup lang="ts">
/**
 * ProseH2 - Remplace les emojis par des icônes dans les titres h2
 *
 * Les emojis dans le markdown sont conservés pour la lisibilité en édition,
 * mais remplacés visuellement par des icônes Lucide côté client.
 *
 * Note: Les hydration mismatches (dev warnings) sont un problème connu
 * de Nuxt Content v3 avec les custom prose components.
 * Ils n'affectent pas le build SSG ni le fonctionnement.
 */

// Mapping emoji → icône Lucide (couleurs nuxy)
const iconMap: Record<string, { icon: string; color: string }> = {
  '🎯': { icon: 'i-lucide-mouse-pointer-click', color: 'text-nuxy-teal' },
  '📖': { icon: 'i-lucide-book-open', color: 'text-nuxy-teal' },
  '📚': { icon: 'i-lucide-book-open', color: 'text-nuxy-teal' },
  '📝': { icon: 'i-lucide-clipboard-list', color: 'text-nuxy-green' },
  '💡': { icon: 'i-lucide-lightbulb', color: 'text-nuxy-gold' },
  '⚠️': { icon: 'i-lucide-triangle-alert', color: 'text-orange-500' },
  '✅': { icon: 'i-lucide-check-circle', color: 'text-nuxy-green' },
  '🔧': { icon: 'i-lucide-wrench', color: 'text-gray-500' },
  '🚀': { icon: 'i-lucide-rocket', color: 'text-nuxy-purple' },
}

defineProps<{
  id?: string
}>()

const headingRef = ref<HTMLElement | null>(null)
const detectedIcon = ref<{ icon: string; color: string } | null>(null)

// Détection et remplacement côté client uniquement
onMounted(() => {
  if (!headingRef.value) return
  const text = headingRef.value.textContent || ''

  for (const [emoji, config] of Object.entries(iconMap)) {
    if (text.includes(emoji)) {
      detectedIcon.value = config
      // Retirer l'emoji du DOM (préserve le formatage inline : code, bold, etc.)
      const walker = document.createTreeWalker(headingRef.value, NodeFilter.SHOW_TEXT)
      let node
      while (node = walker.nextNode()) {
        if (node.textContent?.includes(emoji)) {
          node.textContent = node.textContent.replace(emoji, '').trimStart()
          break
        }
      }
      break
    }
  }
})
</script>

<template>
  <h2
    :id="id"
    class="flex items-center gap-2 !mt-6 !mb-3 text-xl font-bold text-gray-900 dark:text-white"
  >
    <UIcon
      v-if="detectedIcon"
      :name="detectedIcon.icon"
      :class="['w-6 h-6 flex-shrink-0', detectedIcon.color]"
    />
    <span ref="headingRef"><slot /></span>
  </h2>
</template>
