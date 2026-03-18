<script setup lang="ts">
/**
 * Page d'accueil - Landing page NuxyAI
 *
 * Design System unifié :
 * - Cards: rounded-2xl, p-6
 * - Icons: w-12 h-12, rounded-xl
 * - Buttons: rounded-xl (via btn-cta ou class explicite)
 * - Sections: py-20 (CTA: py-24)
 * - Headers: font-bold, mb-12
 * - Hover: icon scale-110, border color change
 * - Style flat Duolingo : pas de dégradés, pas de blur
 */

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'NuxyAI - Apprends à coder avec l\'IA',
  description: 'Formation gratuite de 18h pour apprendre le développement avec Claude Code. 2 phases, 7 modules, des projets concrets.'
})

const { isAuthenticated, isTeacher } = useAuth()
</script>

<template>
  <div class="min-h-screen">
    <!-- ==================== HERO ==================== -->
    <section class="relative overflow-hidden bg-gray-950 text-white">
      <UContainer class="relative py-20 lg:py-28">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Content -->
          <div class="text-center lg:text-left">
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 mb-8">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-nuxy-green opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-nuxy-green" />
              </span>
              <span class="text-sm text-gray-300">Formation 18h</span>
            </div>

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Apprends à coder avec
              <span class="text-nuxy-green">l'IA</span>
            </h1>

            <!-- Subheadline -->
            <p class="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10">
              Tu débutes en dev ? <span class="text-white font-medium">Parfait.</span>
              Claude Code est ton copilote. 18h pour devenir autonome.
            </p>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <UButton
                v-if="isTeacher"
                to="/teacher"
                size="xl"
                icon="i-lucide-layout-dashboard"
                class="btn-cta"
              >
                Mon dashboard
              </UButton>
              <UButton
                v-else
                to="/lessons"
                size="xl"
                icon="i-lucide-play"
                class="btn-cta"
              >
                {{ isAuthenticated ? 'Continuer' : "C'est parti !" }}
              </UButton>
              <UButton
                to="/lessons"
                size="xl"
                color="neutral"
                variant="outline"
                icon="i-lucide-book-open"
                class="rounded-xl"
              >
                Explorer
              </UButton>
            </div>

            <!-- Trust badges -->
            <div class="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start text-sm text-gray-500">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-nuxy-green" />
                <span>100% Gratuit</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-nuxy-green" />
                <span>18h de formation</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-nuxy-green" />
                <span>Projets concrets</span>
              </div>
            </div>
          </div>

          <!-- Code window + Mascot -->
          <div class="relative flex justify-center lg:justify-end">
            <div class="relative bg-gray-900 rounded-2xl border border-gray-700 shadow-lg overflow-hidden w-full max-w-md">
              <!-- Window header -->
              <div class="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-white/10">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-500/80" />
                  <div class="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div class="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div class="flex-1 text-center">
                  <span class="text-xs text-gray-400 font-mono">claude-code</span>
                </div>
              </div>

              <!-- AI conversation content -->
              <div class="p-5 font-mono text-sm leading-relaxed space-y-3">
                <div>
                  <span class="text-gray-500">toi@projet $</span>
                  <span class="text-white"> claude</span>
                </div>
                <div>
                  <span class="text-nuxy-teal">Claude &gt;</span>
                  <span class="text-gray-300"> Salut ! Qu'est-ce qu'on construit</span>
                </div>
                <div>
                  <span class="text-gray-300">aujourd'hui ?</span>
                </div>
                <div class="mt-2">
                  <span class="text-nuxy-green">toi &gt;</span>
                  <span class="text-white"> Une app météo en Vue</span>
                </div>
                <div class="mt-2">
                  <span class="text-nuxy-teal">Claude &gt;</span>
                  <span class="text-gray-300"> Top ! Je crée la structure</span>
                </div>
                <div>
                  <span class="text-gray-300">du projet...</span>
                  <span class="animate-pulse text-nuxy-green">_</span>
                </div>
              </div>
            </div>

            <img
              src="/images/nuxy-tablette.svg"
              alt="Nuxy la mascotte"
              class="absolute -right-4 -bottom-4 w-40 sm:w-56 lg:w-64 z-10"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ==================== HOW IT WORKS (light) ==================== -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <UContainer>
        <!-- Section header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comment ça marche ?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            3 étapes. C'est tout.
          </p>
        </div>

        <!-- Timeline (desktop) -->
        <div class="hidden md:flex items-center justify-between mb-12 px-8">
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-nuxy-green text-white font-black text-xl hover:scale-105 transition-transform">
            1
          </div>
          <div class="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-3" />
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-nuxy-teal text-white font-black text-xl hover:scale-105 transition-transform">
            2
          </div>
          <div class="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-3" />
          <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-nuxy-gold text-nuxy-black font-black text-xl hover:scale-105 transition-transform">
            3
          </div>
        </div>

        <!-- Steps grid -->
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="flex flex-col">
            <div class="flex md:hidden items-center gap-4 mb-4">
              <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-nuxy-green text-white font-black text-xl">
                1
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Lis la leçon</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-3 flex-grow">
              Un concept, des exemples concrets, une mission claire. Tu sais exactement quoi faire.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col">
            <div class="flex md:hidden items-center gap-4 mb-4">
              <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-nuxy-teal text-white font-black text-xl">
                2
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Pratique avec Claude</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-3 flex-grow">
              Lance Claude Code sur ton ordi et code en tandem avec l'IA. Tu écris, il t'aide.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col">
            <div class="flex md:hidden items-center gap-4 mb-4">
              <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-nuxy-gold text-nuxy-black font-black text-xl">
                3
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Valide et progresse</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-3 flex-grow">
              Coche les objectifs, réponds au quiz ou soumets ton projet. Ta progression est sauvegardée.
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ==================== PHASES & MODULES (dark) ==================== -->
    <section class="py-20 bg-gray-950 text-white">
      <UContainer>
        <!-- Section header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            2 phases, <span class="text-nuxy-green">7 modules</span>
          </h2>
          <p class="text-lg text-gray-400 max-w-2xl mx-auto">
            Un parcours structuré pour passer de zéro à autonome
          </p>
        </div>

        <!-- Phases -->
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Phase 1 -->
          <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div class="flex items-center gap-3 mb-6">
              <div class="flex items-center justify-center w-10 h-10 bg-nuxy-green/20 rounded-xl">
                <UIcon name="i-lucide-wrench" class="w-5 h-5 text-nuxy-green" />
              </div>
              <div>
                <h3 class="text-lg font-bold">Phase 1</h3>
                <p class="text-sm text-gray-400">Maîtriser l'outil</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <UIcon name="i-lucide-rocket" class="w-5 h-5 text-nuxy-green shrink-0" />
                <div>
                  <p class="text-sm font-medium">Module 1 : Premiers pas</p>
                  <p class="text-xs text-gray-500">Découverte de l'IA et installation</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <UIcon name="i-lucide-message-square" class="w-5 h-5 text-nuxy-teal shrink-0" />
                <div>
                  <p class="text-sm font-medium">Module 2 : Communiquer avec l'IA</p>
                  <p class="text-xs text-gray-500">Prompts efficaces et bonnes pratiques</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <UIcon name="i-lucide-workflow" class="w-5 h-5 text-nuxy-gold shrink-0" />
                <div>
                  <p class="text-sm font-medium">Module 3 : Workflow efficace</p>
                  <p class="text-xs text-gray-500">Git, terminal et organisation</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Phase 2 -->
          <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div class="flex items-center gap-3 mb-6">
              <div class="flex items-center justify-center w-10 h-10 bg-nuxy-teal/20 rounded-xl">
                <UIcon name="i-lucide-rocket" class="w-5 h-5 text-nuxy-teal" />
              </div>
              <div>
                <h3 class="text-lg font-bold">Phase 2</h3>
                <p class="text-sm text-gray-400">Développer avec l'IA</p>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <UIcon name="i-lucide-layout" class="w-5 h-5 text-nuxy-pink shrink-0" />
                <div>
                  <p class="text-sm font-medium">Module 4 : HTML & CSS avec l'IA</p>
                  <p class="text-xs text-gray-500">Créer des pages web assisté par l'IA</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <UIcon name="i-lucide-code" class="w-5 h-5 text-nuxy-lavender shrink-0" />
                <div>
                  <p class="text-sm font-medium">Module 5 : JavaScript avec l'IA</p>
                  <p class="text-xs text-gray-500">Logique, interactivité et debugging</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <UIcon name="i-lucide-folder-open" class="w-5 h-5 text-nuxy-gold shrink-0" />
                <div>
                  <p class="text-sm font-medium">Module 6 : Projet guidé</p>
                  <p class="text-xs text-gray-500">Une app complète de A à Z</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <UIcon name="i-lucide-graduation-cap" class="w-5 h-5 text-nuxy-green shrink-0" />
                <div>
                  <p class="text-sm font-medium">Module 7 : Autonomie</p>
                  <p class="text-xs text-gray-500">Ton projet perso, sans filet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ==================== FEATURES (light) ==================== -->
    <section class="py-20 bg-white dark:bg-gray-900">
      <UContainer>
        <!-- Section header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tout ce qu'il te faut
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Pas de blabla, que du concret pour progresser
          </p>
        </div>

        <!-- Features grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Clear lessons -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-green/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-green/10 dark:bg-nuxy-green/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-book-open" class="w-6 h-6 text-nuxy-green" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Des leçons claires</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Chaque concept est expliqué simplement, avec des exemples concrets. Pas de jargon.
            </p>
          </div>

          <!-- Claude copilot -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-teal/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-teal/10 dark:bg-nuxy-teal/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-bot" class="w-6 h-6 text-nuxy-teal" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Claude Code en copilote</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Tu codes en tandem avec l'IA. Elle t'assiste, tu apprends en faisant.
            </p>
          </div>

          <!-- Progress saved -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-purple/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-purple/10 dark:bg-nuxy-purple/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-cloud-check" class="w-6 h-6 text-nuxy-purple dark:text-nuxy-pink" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Ta progression sauvegardée</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Ferme l'onglet, reviens demain. On se souvient où tu en étais.
            </p>
          </div>

          <!-- 7 modules -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-gold/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-gold/10 dark:bg-nuxy-gold/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-layers" class="w-6 h-6 text-nuxy-gold-dark" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">7 modules structurés</h3>
            <p class="text-gray-600 dark:text-gray-400">
              De l'installation à l'autonomie. Un pas après l'autre, sans se perdre.
            </p>
          </div>

          <!-- Concrete projects -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-pink/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-pink/10 dark:bg-nuxy-pink/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-folder-open" class="w-6 h-6 text-nuxy-pink" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Des projets concrets</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Pas de théorie en l'air. Tu construis de vraies apps, de A à Z.
            </p>
          </div>

          <!-- Your pace -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-lavender/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-lavender/10 dark:bg-nuxy-lavender/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-timer" class="w-6 h-6 text-nuxy-lavender" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Ton rythme</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Pas de deadline. Tu avances quand tu veux, comme tu veux.
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ==================== FINAL CTA (dark) ==================== -->
    <section class="py-24 bg-gray-950 text-white">
      <UContainer>
        <div class="flex flex-col lg:flex-row items-center justify-center gap-12">
          <!-- Mascot -->
          <img
            src="/images/nuxy-fusée.png"
            alt="Nuxy avec sa fusée"
            class="w-64 lg:w-96 h-auto order-2 lg:order-1"
          />

          <!-- Content -->
          <div class="text-center lg:text-left order-1 lg:order-2">
            <h2 class="text-4xl sm:text-5xl font-bold mb-6">
              Alors, on code avec l'IA ?
            </h2>
            <p class="text-xl text-gray-400 max-w-md mb-10">
              18h de formation gratuite. Ton premier module t'attend.
            </p>
            <UButton
              to="/lessons"
              size="xl"
              icon="i-lucide-play"
              class="btn-cta"
            >
              C'est parti !
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
