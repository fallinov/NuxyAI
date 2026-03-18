<script setup lang="ts">
/**
 * Page de bienvenue - Présentation de JavaScript et du parcours Nuxy
 *
 * Point d'entrée pour les nouveaux élèves :
 * - Présentation de JavaScript (c'est quoi, à quoi ça sert)
 * - Comment fonctionne Nuxy (3 étapes)
 * - Aperçu du parcours (10 modules)
 * - CTA vers le premier exercice
 */

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Bienvenue sur Nuxy - Ton parcours JavaScript',
  description: 'Découvre JavaScript et ton parcours d\'apprentissage sur Nuxy. 10 modules, des micro-exercices, et un vrai éditeur de code.'
})

import { useExercisesList, modules } from '~/composables/useExerciseData'

const { exercises, loadExercises } = useExercisesList()

await loadExercises()

// Marquer la page comme visitée
onMounted(() => {
  localStorage.setItem('nuxy-welcome-visited', 'true')
})

// Trouver le premier exercice (1.1)
const firstExercise = computed(() => {
  if (!exercises.value || exercises.value.length === 0) return null
  return exercises.value[0]
})

// Exemples concrets de ce que JavaScript permet
const jsExamples = [
  { icon: 'i-lucide-mouse-pointer-click', label: 'Menus interactifs', description: 'Menus déroulants, onglets, accordéons' },
  { icon: 'i-lucide-check-circle', label: 'Validation de formulaires', description: 'Vérifier les données avant envoi' },
  { icon: 'i-lucide-sparkles', label: 'Animations', description: 'Transitions, effets visuels, carrousels' },
  { icon: 'i-lucide-database', label: 'Chargement de données', description: 'Afficher des infos depuis un serveur' },
  { icon: 'i-lucide-gamepad-2', label: 'Jeux dans le navigateur', description: 'Jeux 2D/3D directement sur le web' },
  { icon: 'i-lucide-smartphone', label: 'Applications web', description: 'Apps complètes comme Gmail ou Spotify' }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- ==================== HERO ==================== -->
    <section class="relative overflow-hidden bg-gray-950 text-white">
      <UContainer class="relative py-16 lg:py-24">
        <div class="max-w-3xl mx-auto text-center">
          <!-- Mascotte -->
          <div class="flex justify-center mb-8">
            <NuxyLogo size="xl" no-shadow />
          </div>

          <h1 class="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            Bienvenue sur <span class="text-nuxy-green">Nuxy</span> !
          </h1>

          <p class="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto">
            Tu vas apprendre <span class="text-white font-medium">JavaScript</span>, le langage qui rend les sites web interactifs.
            Prêt ? On t'explique tout.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ==================== C'EST QUOI JAVASCRIPT ? ==================== -->
    <section class="py-16 lg:py-20 bg-white dark:bg-gray-900">
      <UContainer>
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            C'est quoi JavaScript ?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Un site web, c'est <span class="font-medium text-gray-900 dark:text-white">3 langages</span> qui travaillent ensemble :
          </p>

          <!-- Le trio du web -->
          <div class="grid sm:grid-cols-3 gap-4 mb-10">
            <div class="p-5 bg-orange-50 dark:bg-orange-950/30 rounded-xl border border-orange-200 dark:border-orange-800/50 text-center">
              <div class="text-3xl mb-2">🏗️</div>
              <p class="font-bold text-gray-900 dark:text-white">HTML</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">La <span class="font-medium">structure</span> — le contenu de la page (titres, textes, images)</p>
            </div>
            <div class="p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center">
              <div class="text-3xl mb-2">🎨</div>
              <p class="font-bold text-gray-900 dark:text-white">CSS</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Le <span class="font-medium">style</span> — les couleurs, la mise en page, le design</p>
            </div>
            <div class="p-5 bg-nuxy-green/10 dark:bg-nuxy-green/10 rounded-xl border border-nuxy-green/30 text-center ring-2 ring-nuxy-green/20">
              <div class="text-3xl mb-2">⚡</div>
              <p class="font-bold text-nuxy-green-dark dark:text-nuxy-green">JavaScript</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Le <span class="font-medium">comportement</span> — les interactions, les animations, les données</p>
            </div>
          </div>

          <p class="text-lg text-gray-600 dark:text-gray-400 mb-3">
            JavaScript s'exécute directement dans ton navigateur (Brave, Firefox, Chrome...).
            C'est lui qui rend les pages web <span class="font-medium text-gray-900 dark:text-white">dynamiques et interactives</span>.
          </p>

          <p class="text-lg text-gray-600 dark:text-gray-400 mb-10">
            Concrètement, il permet de :
          </p>

          <!-- Grille d'exemples -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="example in jsExamples"
              :key="example.label"
              class="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center justify-center w-10 h-10 bg-nuxy-green/10 dark:bg-nuxy-green/20 rounded-lg shrink-0">
                <UIcon :name="example.icon" class="w-5 h-5 text-nuxy-green" />
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ example.label }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ example.description }}</p>
              </div>
            </div>
          </div>

          <p class="text-gray-500 dark:text-gray-400 text-sm mt-6">
            En résumé : si un site web fait quelque chose quand tu cliques, tapes ou scrolles — c'est JavaScript.
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ==================== COMMENT ÇA MARCHE ? ==================== -->
    <section class="py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
      <UContainer>
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comment ça marche ?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-10">
            3 étapes. C'est tout.
          </p>

          <div class="space-y-6">
            <!-- Étape 1 -->
            <div class="flex gap-4 items-start">
              <div class="flex items-center justify-center w-12 h-12 bg-nuxy-green text-white font-black text-lg rounded-xl shrink-0">
                1
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Lis la consigne</h3>
                <p class="text-gray-600 dark:text-gray-400 mt-1">
                  Chaque exercice t'explique un concept avec des exemples. Tu sais exactement quoi faire.
                </p>
              </div>
            </div>

            <!-- Étape 2 -->
            <div class="flex gap-4 items-start">
              <div class="flex items-center justify-center w-12 h-12 bg-nuxy-teal text-white font-black text-lg rounded-xl shrink-0">
                2
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Tape ton code</h3>
                <p class="text-gray-600 dark:text-gray-400 mt-1">
                  Directement dans le navigateur, avec un vrai éditeur de code. Rien à installer.
                </p>
              </div>
            </div>

            <!-- Étape 3 -->
            <div class="flex gap-4 items-start">
              <div class="flex items-center justify-center w-12 h-12 bg-nuxy-gold text-gray-900 font-black text-lg rounded-xl shrink-0">
                3
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white">Valide et passe au suivant</h3>
                <p class="text-gray-600 dark:text-gray-400 mt-1">
                  Un clic pour exécuter. Le système te dit si c'est bon — et t'aide si ça ne l'est pas.
                </p>
              </div>
            </div>
          </div>

        </div>
      </UContainer>
    </section>

    <!-- ==================== DEVJS.CH ==================== -->
    <section class="py-16 lg:py-20 bg-gray-950">
      <UContainer>
        <div class="max-w-3xl mx-auto">
          <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <!-- Icône -->
            <div class="flex items-center justify-center w-16 h-16 bg-nuxy-teal/20 rounded-2xl shrink-0">
              <UIcon name="i-lucide-book-marked" class="w-8 h-8 text-nuxy-teal" />
            </div>

            <!-- Texte -->
            <div class="text-center sm:text-left flex-1">
              <h3 class="text-xl font-bold text-white mb-2">
                Ton support de cours : devjs.ch
              </h3>
              <p class="text-gray-400">
                Toute la théorie JavaScript, les exemples et les références pour chaque chapitre.
                <span class="text-white font-medium">Nuxy = pratique</span>,
                <span class="text-nuxy-teal font-medium">devjs.ch = théorie</span>.
              </p>
            </div>

            <!-- CTA -->
            <UButton
              href="https://devjs.ch"
              target="_blank"
              size="lg"
              class="btn-cta-teal shrink-0 w-full sm:w-auto justify-center"
              trailing-icon="i-lucide-external-link"
            >
              Voir le cours
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ==================== TON PARCOURS ==================== -->
    <section class="py-16 lg:py-20 bg-white dark:bg-gray-900">
      <UContainer>
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-10">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ton parcours
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              10 modules pour maîtriser JavaScript, des bases jusqu'aux API.
            </p>
          </div>

          <!-- Grille des modules -->
          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="module in modules"
              :key="module.id"
              class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-center justify-center w-10 h-10 bg-nuxy-green/10 dark:bg-nuxy-green/20 rounded-lg shrink-0">
                <UIcon :name="module.icon" class="w-5 h-5 text-nuxy-green" />
              </div>
              <div>
                <p class="font-semibold text-gray-900 dark:text-white text-sm">
                  Module {{ module.id }} : {{ module.title }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {{ module.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- ==================== CTA ==================== -->
    <section class="py-16 lg:py-24 bg-gray-950 text-white">
      <UContainer>
        <div class="max-w-2xl mx-auto text-center">
          <div class="flex justify-center mb-6">
            <NuxyLogo size="lg" no-shadow />
          </div>

          <h2 class="text-3xl sm:text-4xl font-bold mb-4">
            Prêt à coder ?
          </h2>
          <p class="text-lg text-gray-400 mb-8">
            Ton premier exercice t'attend. C'est simple, rapide, et satisfaisant.
          </p>

          <UButton
            v-if="firstExercise"
            :to="firstExercise.path"
            size="xl"
            icon="i-lucide-play"
            class="btn-cta"
          >
            C'est parti !
          </UButton>
        </div>
      </UContainer>
    </section>
  </div>
</template>
