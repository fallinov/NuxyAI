<script setup lang="ts">
/**
 * App.vue - Point d'entrée de l'application
 *
 * Contient uniquement :
 * - UApp (composant racine de Nuxt UI)
 * - NuxtPage (pour le rendu des pages)
 *
 * Les headers/footers/menus sont gérés dans les layouts :
 * - layouts/default.vue : pour les pages avec navigation
 * - layouts/lesson.vue : pour les leçons plein écran
 */

// Favicon Nuxy (dragon)
useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/favicon.svg' }
  ]
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
