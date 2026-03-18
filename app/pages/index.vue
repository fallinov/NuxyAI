<script setup lang="ts">
/**
 * Page d'accueil - Landing page moderne
 *
 * Design System unifié :
 * - Cards: rounded-2xl, p-6
 * - Icons: w-12 h-12, rounded-xl
 * - Buttons: rounded-xl (via btn-cta ou class explicite)
 * - Sections: py-20 (CTA: py-24)
 * - Headers: font-bold, mb-12
 * - Hover: icon scale-110, border color change
 */

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Nuxy - Apprends JavaScript en codant',
  description: 'Maîtrise JavaScript avec des micro-exercices interactifs. Gratuit, sans inscription, avec un vrai éditeur de code.'
})

import { useExercisesList } from '~/composables/useExerciseData'

const { isAuthenticated, isTeacher } = useAuth()
const { exercises, loadExercises, getModulesWithExercises } = useExercisesList()
const supabase = useSupabaseClient()

await loadExercises()

// Modules avec exercices (pour les stats)
const activeModules = computed(() => {
  if (!exercises.value) return []
  return getModulesWithExercises(exercises.value)
})

// Stats de la communauté (vraies données Supabase)
const communityStats = ref({
  users: 0,
  exercisesCompleted: 0,
  totalAttempts: 0,
  inProgress: 0
})

// Charger les stats côté client uniquement (via RPC dans schema public)
onMounted(async () => {
  try {
    const { data, error } = await supabase.rpc('get_community_stats')
    if (error) throw error

    if (data) {
      communityStats.value = {
        users: data.users || 0,
        exercisesCompleted: data.exercisesCompleted || 0,
        totalAttempts: data.totalAttempts || 0,
        inProgress: data.inProgress || 0
      }
    }
  } catch (error) {
    console.error('Erreur chargement stats:', error)
  }
})
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
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-nuxy-green opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-nuxy-green" />
              </span>
              <span class="text-sm text-gray-300">{{ exercises?.length || 0 }} exercices disponibles</span>
            </div>

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Apprends
              <span class="text-nuxy-green">JavaScript</span>
              <br />en codant
            </h1>

            <!-- Subheadline -->
            <p class="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10">
              Tu débutes en prog ? <span class="text-white font-medium">Parfait.</span>
              Des mini-exercices, du feedback instantané, zéro prise de tête.
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
                to="/welcome"
                size="xl"
                icon="i-lucide-play"
                class="btn-cta"
              >
                {{ isAuthenticated ? 'Continuer' : "C'est parti !" }}
              </UButton>
              <UButton
                to="/exercices"
                size="xl"
                color="neutral"
                variant="outline"
                icon="i-lucide-library"
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
                <span>Sans inscription</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-nuxy-green" />
                <span>Aucune installation</span>
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
                  <span class="text-xs text-gray-400 font-mono">script.js</span>
                </div>
              </div>

              <!-- Code content -->
              <div class="p-5 font-mono text-sm leading-relaxed">
                <div class="mb-1">
                  <span class="text-purple-400">let</span>
                  <span class="text-white"> message </span>
                  <span class="text-gray-400">=</span>
                  <span class="text-yellow-300"> "Hello World!"</span>
                </div>
                <div class="mb-1">
                  <span class="text-blue-400">console</span><span class="text-white">.</span><span class="text-green-400">log</span><span class="text-white">(message)</span>
                </div>
                <div class="mt-3 pt-3 border-t border-white/10">
                  <span class="text-gray-500">// Output:</span>
                  <span class="text-green-400"> Hello World!</span>
                </div>
              </div>
            </div>

            <img
              src="/images/nuxy-tablette.svg"
              alt="Nuxy la mascotte"
              class="absolute -right-4 -bottom-4 w-40 sm:w-56 lg:w-64 z-10 drop-shadow-2xl"
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
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Lis la consigne</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-3 flex-grow">
              Un concept, des exemples, une mission. Tu sais exactement quoi faire.
            </p>
            <img
              src="/images/screenshots/step1-consigne.png"
              alt="Capture de la consigne"
              class="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg w-full mt-4"
            />
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col">
            <div class="flex md:hidden items-center gap-4 mb-4">
              <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-nuxy-teal text-white font-black text-xl">
                2
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Tape ton code</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-3 flex-grow">
              Direct dans le navigateur. Rien à installer, rien à configurer.
            </p>
            <img
              src="/images/screenshots/step2-editeur.png"
              alt="Capture de l'éditeur"
              class="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg w-full mt-4"
            />
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col">
            <div class="flex md:hidden items-center gap-4 mb-4">
              <div class="flex items-center justify-center w-14 h-14 rounded-2xl bg-nuxy-gold text-nuxy-black font-black text-xl">
                3
              </div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Valide et passe au suivant</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-3 flex-grow">
              Un clic, tu vois si c'est bon. Vert = bravo, rouge = on réessaie !
            </p>
            <img
              src="/images/screenshots/step3-console.png"
              alt="Capture de la console"
              class="rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg w-full mt-4"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ==================== SOCIAL PROOF (dark) ==================== -->
    <section class="py-20 bg-gray-950">
      <UContainer>
        <!-- Section header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span class="text-lg">🐣</span>
            <span class="text-sm text-gray-300 font-medium">Fraîchement lancé</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            On grandit <span class="text-nuxy-green">ensemble</span>
          </h2>
          <p class="text-lg text-gray-400 max-w-md mx-auto">
            Des stats modestes qu'on assume avec fierté
          </p>
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Users -->
          <div class="group">
            <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800 group-hover:border-nuxy-green transition-colors duration-200">
              <div class="flex items-center gap-3 mb-4">
                <div class="flex items-center justify-center w-12 h-12 bg-nuxy-green/20 rounded-xl group-hover:scale-110 transition-transform">
                  <UIcon name="i-lucide-users" class="w-6 h-6 text-nuxy-green" />
                </div>
                <span class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Pionniers</span>
              </div>
              <div class="text-4xl sm:text-5xl font-black text-white mb-1 tabular-nums">
                {{ communityStats.users || '—' }}
              </div>
              <div class="text-gray-400 text-sm">utilisateurs inscrits</div>
              <div class="mt-3 pt-3 border-t border-white/5 text-xs text-gray-500 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-nuxy-green rounded-full animate-pulse" />
                dont 1 prof très motivé
              </div>
            </div>
          </div>

          <!-- Exercises completed -->
          <div class="group">
            <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800 group-hover:border-nuxy-teal transition-colors duration-200">
              <div class="flex items-center gap-3 mb-4">
                <div class="flex items-center justify-center w-12 h-12 bg-nuxy-teal/20 rounded-xl group-hover:scale-110 transition-transform">
                  <UIcon name="i-lucide-check-circle-2" class="w-6 h-6 text-nuxy-teal" />
                </div>
                <span class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Victoires</span>
              </div>
              <div class="text-4xl sm:text-5xl font-black text-white mb-1 tabular-nums">
                {{ communityStats.exercisesCompleted || '—' }}
              </div>
              <div class="text-gray-400 text-sm">exercices validés</div>
              <div class="mt-3 pt-3 border-t border-white/5 text-xs text-gray-500 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-nuxy-teal rounded-full animate-pulse" />
                et ce n'est que le début
              </div>
            </div>
          </div>

          <!-- In progress -->
          <div class="group">
            <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800 group-hover:border-nuxy-gold transition-colors duration-200">
              <div class="flex items-center gap-3 mb-4">
                <div class="flex items-center justify-center w-12 h-12 bg-nuxy-gold/20 rounded-xl group-hover:scale-110 transition-transform">
                  <UIcon name="i-lucide-clock" class="w-6 h-6 text-nuxy-gold" />
                </div>
                <span class="text-xs text-gray-500 uppercase tracking-wider font-semibold">En cours</span>
              </div>
              <div class="text-4xl sm:text-5xl font-black text-white mb-1 tabular-nums">
                {{ communityStats.inProgress || '—' }}
              </div>
              <div class="text-gray-400 text-sm">exercices commencés</div>
              <div class="mt-3 pt-3 border-t border-white/5 text-xs text-gray-500 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-nuxy-gold rounded-full animate-pulse" />
                pause café incluse ☕
              </div>
            </div>
          </div>

          <!-- Total attempts -->
          <div class="group">
            <div class="bg-gray-900 rounded-2xl p-6 border border-gray-800 group-hover:border-nuxy-pink transition-colors duration-200">
              <div class="flex items-center gap-3 mb-4">
                <div class="flex items-center justify-center w-12 h-12 bg-nuxy-pink/20 rounded-xl group-hover:scale-110 transition-transform">
                  <UIcon name="i-lucide-play" class="w-6 h-6 text-nuxy-pink" />
                </div>
                <span class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Exécutions</span>
              </div>
              <div class="text-4xl sm:text-5xl font-black text-white mb-1 tabular-nums">
                {{ communityStats.totalAttempts || '—' }}
              </div>
              <div class="text-gray-400 text-sm">runs de code</div>
              <div class="mt-3 pt-3 border-t border-white/5 text-xs text-gray-500 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-nuxy-pink rounded-full animate-pulse" />
                erreurs = apprentissage 💪
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
          <!-- Editor (large) -->
          <div class="md:col-span-2 lg:col-span-2 group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-green/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center gap-3 mb-4">
              <div class="flex items-center justify-center w-12 h-12 bg-nuxy-green/10 dark:bg-nuxy-green/20 rounded-xl group-hover:scale-110 transition-transform">
                <UIcon name="i-lucide-code-2" class="w-6 h-6 text-nuxy-green" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Un vrai éditeur de code</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Coloration, auto-complétion, raccourcis clavier.
            </p>
            <p class="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Comme les pros.
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono">Ctrl</kbd> +
              <kbd class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-mono">Enter</kbd>
              pour exécuter.
            </p>
          </div>

          <!-- Feedback -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-green/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-green/10 dark:bg-nuxy-green/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-message-circle" class="w-6 h-6 text-nuxy-green" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Des erreurs qui t'aident</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Pas de jargon incompréhensible. On t'explique ce qui cloche.
            </p>
          </div>

          <!-- Progress -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-teal/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-teal/10 dark:bg-nuxy-teal/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-trending-up" class="w-6 h-6 text-nuxy-teal" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Ta progression sauvegardée</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Ferme l'onglet, reviens demain. On se souvient où tu en étais.
            </p>
          </div>

          <!-- Modules -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-purple/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-purple/10 dark:bg-nuxy-purple/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-layers" class="w-6 h-6 text-nuxy-purple dark:text-nuxy-pink" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ activeModules.length }} modules bien rangés</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Variables, fonctions, DOM, API... Un pas après l'autre.
            </p>
          </div>

          <!-- Hints -->
          <div class="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-nuxy-gold/50 hover:shadow-lg transition-all duration-300">
            <div class="flex items-center justify-center w-12 h-12 bg-nuxy-gold/10 dark:bg-nuxy-gold/20 rounded-xl mb-4 group-hover:scale-110 transition-transform">
              <UIcon name="i-lucide-lightbulb" class="w-6 h-6 text-nuxy-gold" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Des indices si tu bloques</h3>
            <p class="text-gray-600 dark:text-gray-400">
              On te donne un coup de pouce, pas la réponse. Tu gardes le mérite !
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
              Alors, on code ?
            </h2>
            <p class="text-xl text-gray-400 max-w-md mb-10">
              Rejoins les pionniers. Ton premier exercice t'attend.
            </p>
            <UButton
              to="/welcome"
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
