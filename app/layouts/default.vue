<script setup lang="ts">
/**
 * Layout par défaut - Page d'accueil
 *
 * Inclut :
 * - En-tête avec logo et navigation
 * - Menu de navigation
 * - Menu utilisateur (profil/connexion)
 * - Design classique de site web
 */

const { public: { appVersion } } = useRuntimeConfig()
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- En-tête et navigation -->
    <header class="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <UContainer>
        <nav class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2">
            <NuxyLogo size="header" no-shadow />
            <span class="text-2xl font-bold text-nuxy-green">NuxyAI</span>
          </NuxtLink>

          <!-- Navigation -->
          <div class="flex items-center gap-2">
            <!-- Liens de navigation (toujours visibles) -->
            <div class="flex items-center gap-1">
              <UButton
                to="/"
                variant="ghost"
                color="neutral"
                size="sm"
                icon="i-lucide-home"
                aria-label="Accueil"
                class="text-gray-600 dark:text-gray-400 hover:text-nuxy-green dark:hover:text-nuxy-green"
              >
                <span class="hidden lg:inline">Accueil</span>
              </UButton>
              <UButton
                to="/lessons"
                variant="ghost"
                color="neutral"
                size="sm"
                icon="i-lucide-book-open"
                aria-label="Liste des leçons"
                class="text-gray-600 dark:text-gray-400 hover:text-nuxy-green dark:hover:text-nuxy-green"
              >
                <span class="hidden lg:inline">Leçons</span>
              </UButton>
            </div>

            <!-- Séparateur (desktop) -->
            <div class="hidden lg:block w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

            <!-- Dark mode switch -->
            <UColorModeButton size="sm" />

            <!-- Menu utilisateur (gère connexion et profil) -->
            <AuthUserMenu />
          </div>
        </nav>
      </UContainer>
    </header>

    <!-- Contenu de la page -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="py-6 md:py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 relative overflow-hidden">
      <!-- Mascotte en arrière-plan (masquée sur mobile) -->
      <img
        src="/images/nuxy-fin-etudes.png"
        alt="Nuxy célèbre son diplôme"
        class="hidden md:block absolute right-0 top-0 w-64 lg:w-80 h-auto pointer-events-none opacity-90"
      />
      <UContainer class="relative">
        <div class="flex flex-col items-center md:items-start gap-2 md:gap-4 text-gray-600 dark:text-gray-400">
          <p class="text-sm md:text-base text-center md:text-left">
            <strong class="text-nuxy-green-dark dark:text-nuxy-green">NuxyAI</strong> - Développement avec l'IA
          </p>
          <p class="text-xs md:text-sm text-center md:text-left text-gray-500 dark:text-gray-500">
            Nuxt 4 · Vue 3 · Nuxt UI · <span class="text-gray-400 dark:text-gray-600">v{{ appVersion }}</span>
          </p>
        </div>
      </UContainer>
    </footer>
  </div>
</template>
