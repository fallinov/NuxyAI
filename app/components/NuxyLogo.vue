<script setup lang="ts">
/**
 * NuxyLogo - Logo dragon Nuxy
 * Affiche le dragon directement sans fond pour une meilleure lisibilité
 */

const props = defineProps<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'header'
  noShadow?: boolean
}>()

const sizeClasses = {
  xs: 'w-7 h-7',
  sm: 'w-9 h-9',
  md: 'w-11 h-11',
  lg: 'w-14 h-14',
  xl: 'w-20 h-20',
  header: 'w-14 h-14'  // Taille optimisée pour les headers
}
</script>

<template>
  <img
    :src="noShadow ? '/images/nuxy-logo.svg' : '/favicon.svg'"
    alt="Nuxy"
    :class="[sizeClasses[size || 'md'], !noShadow && 'drop-shadow-md']"
  />
</template>
