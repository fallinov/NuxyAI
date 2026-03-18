<script setup lang="ts">
/**
 * Page de présentation pour les enseignants
 *
 * Présente les fonctionnalités :
 * - Gestion des classes
 * - Suivi de progression
 * - Statistiques
 */

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Espace Enseignant - Nuxy',
  description: 'Créez des classes, invitez vos élèves et suivez leur progression en JavaScript avec Nuxy.'
})

const { isAuthenticated, isTeacher } = useAuth()
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <UContainer class="relative py-16 sm:py-24">
        <div class="text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-nuxy-gold/20 dark:bg-nuxy-gold/10 rounded-full mb-6">
            <UIcon name="i-lucide-graduation-cap" class="w-4 h-4 text-nuxy-gold-dark dark:text-nuxy-gold" />
            <span class="text-sm font-medium text-nuxy-gold-dark dark:text-nuxy-gold">
              Espace enseignant
            </span>
          </div>

          <!-- Titre -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span class="block text-gray-900 dark:text-white">Suivez la progression</span>
            <span class="block bg-gradient-to-r from-nuxy-gold to-nuxy-gold-dark bg-clip-text text-transparent">
              de vos élèves
            </span>
          </h1>

          <!-- Description -->
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            Un tableau de bord complet pour créer des classes, inviter vos élèves
            et accompagner leur apprentissage de JavaScript.
          </p>

          <!-- CTA -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              v-if="isTeacher"
              to="/teacher"
              size="xl"
              icon="i-lucide-layout-dashboard"
              class="btn-cta text-lg px-8 py-4"
            >
              Accéder au dashboard
            </UButton>
            <template v-else>
              <UButton
                to="/auth/register"
                size="xl"
                icon="i-lucide-user-plus"
                class="btn-cta text-lg px-8 py-4"
              >
                Créer un compte enseignant
              </UButton>
              <UButton
                v-if="!isAuthenticated"
                to="/auth/login"
                size="xl"
                color="gray"
                variant="outline"
                icon="i-lucide-log-in"
                class="text-lg px-8 py-4"
              >
                Se connecter
              </UButton>
            </template>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Fonctionnalités -->
    <section class="py-16 bg-white dark:bg-gray-950">
      <UContainer>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Carte 1 -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-center w-14 h-14 bg-nuxy-teal/20 dark:bg-nuxy-teal/30 rounded-xl mb-6">
              <UIcon name="i-lucide-users" class="w-7 h-7 text-nuxy-teal-dark dark:text-nuxy-teal" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Gestion des classes</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Créez autant de classes que nécessaire. Chaque classe dispose d'un code d'invitation unique
              que vos élèves utilisent pour rejoindre.
            </p>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Création illimitée de classes
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Code d'invitation régénérable
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Gestion des membres
              </li>
            </ul>
          </div>

          <!-- Carte 2 -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-center w-14 h-14 bg-nuxy-green/20 dark:bg-nuxy-green/30 rounded-xl mb-6">
              <UIcon name="i-lucide-activity" class="w-7 h-7 text-nuxy-green-dark dark:text-nuxy-green" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Suivi en temps réel</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Visualisez la progression de chaque élève exercice par exercice.
              Identifiez rapidement ceux qui ont besoin d'aide.
            </p>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Progression par élève
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Mise à jour automatique
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Dernière activité visible
              </li>
            </ul>
          </div>

          <!-- Carte 3 -->
          <div class="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
            <div class="flex items-center justify-center w-14 h-14 bg-nuxy-purple/20 dark:bg-nuxy-pink/20 rounded-xl mb-6">
              <UIcon name="i-lucide-bar-chart-3" class="w-7 h-7 text-nuxy-purple dark:text-nuxy-pink" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Statistiques détaillées</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Analysez les performances de votre classe. Identifiez les exercices
              qui posent problème pour adapter votre pédagogie.
            </p>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Taux de complétion
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Progression moyenne
              </li>
              <li class="flex items-center gap-2">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-nuxy-green" />
                Exercices difficiles identifiés
              </li>
            </ul>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Mockup Dashboard -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Un dashboard intuitif
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Toutes les informations dont vous avez besoin, en un coup d'oeil
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <!-- Barre de titre -->
            <div class="bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                <div class="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div class="flex-1 text-center">
                <span class="text-xs text-gray-500 dark:text-gray-400">Dashboard Enseignant — Nuxy</span>
              </div>
            </div>

            <div class="p-6">
              <!-- Header -->
              <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div class="w-12 h-12 bg-nuxy-green/20 dark:bg-nuxy-green/30 rounded-xl flex items-center justify-center">
                  <UIcon name="i-lucide-users" class="w-6 h-6 text-nuxy-green-dark dark:text-nuxy-green" />
                </div>
                <div class="flex-1">
                  <div class="font-bold text-lg text-gray-900 dark:text-white">Classe ESIG1</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">12 élèves inscrits</div>
                </div>
                <UBadge color="success" variant="soft" size="lg">Active</UBadge>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="text-center p-4 bg-nuxy-teal/10 dark:bg-nuxy-teal/20 rounded-xl">
                  <div class="text-3xl font-bold text-nuxy-teal-dark dark:text-nuxy-teal">85%</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Progression moyenne</div>
                </div>
                <div class="text-center p-4 bg-nuxy-green/10 dark:bg-nuxy-green/20 rounded-xl">
                  <div class="text-3xl font-bold text-nuxy-green-dark dark:text-nuxy-green">312</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Exercices complétés</div>
                </div>
                <div class="text-center p-4 bg-nuxy-gold/10 dark:bg-nuxy-gold/20 rounded-xl">
                  <div class="text-3xl font-bold text-nuxy-gold-dark dark:text-nuxy-gold">8</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">Actifs aujourd'hui</div>
                </div>
              </div>

              <!-- Liste élèves -->
              <div class="space-y-2">
                <div class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div class="w-10 h-10 bg-gradient-to-br from-nuxy-teal to-nuxy-teal-dark rounded-full flex items-center justify-center text-sm font-bold text-white">AL</div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 dark:text-white">Alice Laurent</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Dernière activité : il y a 2h</div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-32 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="w-full h-full bg-gradient-to-r from-nuxy-green to-nuxy-green-dark rounded-full"></div>
                    </div>
                    <span class="text-sm font-semibold text-nuxy-green-dark dark:text-nuxy-green w-12 text-right">100%</span>
                  </div>
                </div>
                <div class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div class="w-10 h-10 bg-gradient-to-br from-nuxy-purple to-nuxy-pink rounded-full flex items-center justify-center text-sm font-bold text-white">BM</div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 dark:text-white">Bob Martin</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Dernière activité : il y a 5h</div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-32 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="w-3/4 h-full bg-gradient-to-r from-nuxy-teal to-nuxy-teal-dark rounded-full"></div>
                    </div>
                    <span class="text-sm font-semibold text-nuxy-teal-dark dark:text-nuxy-teal w-12 text-right">75%</span>
                  </div>
                </div>
                <div class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div class="w-10 h-10 bg-gradient-to-br from-nuxy-gold to-nuxy-gold-dark rounded-full flex items-center justify-center text-sm font-bold text-white">CD</div>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium text-gray-900 dark:text-white">Claire Dubois</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400">Dernière activité : hier</div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-32 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div class="w-1/2 h-full bg-gradient-to-r from-nuxy-gold to-nuxy-gold-dark rounded-full"></div>
                    </div>
                    <span class="text-sm font-semibold text-nuxy-gold-dark dark:text-nuxy-gold w-12 text-right">50%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA Final -->
    <section class="py-16 bg-white dark:bg-gray-950">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Prêt à commencer ?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Créez votre compte enseignant gratuitement et commencez à suivre vos élèves dès aujourd'hui.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
              v-if="isTeacher"
              to="/teacher"
              size="xl"
              icon="i-lucide-layout-dashboard"
              class="btn-cta"
            >
              Ouvrir le dashboard
            </UButton>
            <template v-else>
              <UButton
                to="/auth/register"
                size="xl"
                icon="i-lucide-user-plus"
                class="btn-cta"
              >
                Créer un compte
              </UButton>
              <UButton
                to="/"
                size="xl"
                color="gray"
                variant="outline"
                icon="i-lucide-arrow-left"
              >
                Retour aux exercices
              </UButton>
            </template>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
