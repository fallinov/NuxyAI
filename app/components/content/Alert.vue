<script setup lang="ts">
/**
 * Alert - Composant MDC pour les blocs d'alerte dans le markdown
 *
 * Usage dans le markdown :
 * ::alert{type="info"}
 * Contenu de l'alerte
 * ::
 *
 * Utilise UAlert de Nuxt UI 4
 */

const props = withDefaults(defineProps<{
  type?: 'info' | 'warning' | 'success' | 'error'
}>(), {
  type: 'info'
})

// Mapping des icônes par type
const iconMap = {
  info: 'i-lucide-info',
  warning: 'i-lucide-triangle-alert',
  success: 'i-lucide-check-circle',
  error: 'i-lucide-x-circle'
}
</script>

<template>
  <UAlert
    :color="type"
    :icon="iconMap[type]"
    variant="subtle"
    class="my-4 [&_[data-slot=description]]:prose-sm [&_[data-slot=description]_p]:m-0"
  >
    <template #description>
      <slot />
    </template>
  </UAlert>
</template>
