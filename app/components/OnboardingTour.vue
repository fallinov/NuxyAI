<script setup lang="ts">
/**
 * Tour d'onboarding pour les nouveaux utilisateurs
 *
 * Affiche un guide rapide des fonctionnalités principales
 * Ne s'affiche qu'une fois (persisté en localStorage)
 * Utilise UModal de Nuxt UI
 */

const STORAGE_KEY = 'nuxy-onboarding-completed'

// État du tour
const isOpen = ref(false)
const currentStep = ref(0)

// Étapes du tour
const steps = [
  {
    icon: 'i-lucide-play-circle',
    title: 'Bienvenue sur Nuxy !',
    description: 'Ta plateforme pour apprendre JavaScript en pratiquant. Laisse-moi te faire un petit tour.',
    color: 'bg-nuxy-green'
  },
  {
    icon: 'i-lucide-target',
    title: 'Des micro-exercices',
    description: 'Chaque exercice prend 5-10 minutes. Parfait pour progresser petit à petit, sans prise de tête.',
    color: 'bg-nuxy-teal'
  },
  {
    icon: 'i-lucide-sparkles',
    title: 'Feedback instantané',
    description: 'Tu écris, tu testes, tu vois le résultat. Les erreurs sont expliquées clairement, pas de jargon.',
    color: 'bg-nuxy-gold'
  },
  {
    icon: 'i-lucide-trophy',
    title: 'Ta progression sauvegardée',
    description: 'Crée un compte pour retrouver tes exercices sur tous tes appareils. Ton prof peut suivre ton avancement.',
    color: 'bg-nuxy-pink'
  }
]

// Vérifier si c'est la première visite
onMounted(() => {
  if (typeof window !== 'undefined') {
    const completed = localStorage.getItem(STORAGE_KEY)
    if (!completed) {
      // Afficher après un court délai pour laisser la page charger
      setTimeout(() => {
        isOpen.value = true
      }, 800)
    }
  }
})

// Navigation
const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  } else {
    completeTour()
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const completeTour = () => {
  isOpen.value = false
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, 'true')
  }
}

// Progression (0 à steps.length)
const progressValue = computed(() => currentStep.value + 1)
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :dismissible="true"
    :ui="{
      width: 'max-w-sm',
      rounded: 'rounded-2xl',
      shadow: 'shadow-2xl',
      padding: 'p-0'
    }"
    @close="completeTour"
  >
    <!-- Slot vide pour le trigger (pas de bouton visible) -->
    <template #default />

    <template #content>
      <div class="overflow-hidden">
        <!-- Barre de progression avec UProgress -->
        <UProgress
          :model-value="progressValue"
          :max="steps.length"
          color="primary"
          size="2xs"
          :ui="{ indicator: 'bg-nuxy-green' }"
        />

        <!-- Contenu -->
        <div class="p-6 text-center">
          <!-- Icône -->
          <div
            class="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors duration-300"
            :class="steps[currentStep].color"
          >
            <UIcon
              :name="steps[currentStep].icon"
              class="w-8 h-8 text-white"
            />
          </div>

          <!-- Titre -->
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ steps[currentStep].title }}
          </h2>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {{ steps[currentStep].description }}
          </p>

          <!-- Indicateurs de page -->
          <div class="flex justify-center gap-1.5 mb-6">
            <button
              v-for="(_, index) in steps"
              :key="index"
              class="h-2 rounded-full transition-all duration-200"
              :class="index === currentStep
                ? 'bg-nuxy-green w-6'
                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 w-2'"
              @click="currentStep = index"
            />
          </div>

          <!-- Boutons -->
          <div class="flex gap-3">
            <UButton
              v-if="currentStep > 0"
              variant="ghost"
              color="neutral"
              class="flex-1"
              @click="prevStep"
            >
              Précédent
            </UButton>
            <UButton
              v-else
              variant="ghost"
              color="neutral"
              class="flex-1"
              @click="completeTour"
            >
              Passer
            </UButton>

            <UButton
              color="primary"
              class="flex-1"
              @click="nextStep"
            >
              {{ currentStep === steps.length - 1 ? 'C\'est parti !' : 'Suivant' }}
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
