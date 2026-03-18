<script setup lang="ts">
/**
 * ExerciseMotivation - Messages d'encouragement contextuels
 *
 * Affiche des messages motivants selon :
 * - Le nombre de tentatives
 * - La progression (% de critères validés)
 * - Si l'exercice est complété
 */

interface Props {
  attempts: number
  passedRules: number
  totalRules: number
  isCompleted: boolean
}

const props = defineProps<Props>()

// Calcul du pourcentage de progression
const percentage = computed(() => {
  if (props.totalRules === 0) return 0
  return Math.round((props.passedRules / props.totalRules) * 100)
})

// Messages d'encouragement selon le contexte
const motivationMessage = computed(() => {
  // Exercice complété
  if (props.isCompleted) {
    const messages = [
      { icon: 'i-lucide-rocket', text: 'Fantastique ! Tu maîtrises ce concept', color: 'green' },
      { icon: 'i-lucide-star', text: 'Bravo ! Tu progresses vite', color: 'green' },
      { icon: 'i-lucide-trophy', text: 'Excellent travail ! Continue comme ça', color: 'green' }
    ]
    return messages[props.attempts % messages.length]
  }

  // Première tentative
  if (props.attempts === 0) {
    return {
      icon: 'i-lucide-lightbulb',
      text: 'Lis bien les instructions et lance-toi !',
      color: 'blue'
    }
  }

  // Très proche de la réussite (90%+)
  if (percentage.value >= 90) {
    return {
      icon: 'i-lucide-flame',
      text: 'Tu y es presque ! Encore un petit effort',
      color: 'orange'
    }
  }

  // Bonne progression (50-89%)
  if (percentage.value >= 50) {
    return {
      icon: 'i-lucide-thumbs-up',
      text: 'Bon travail ! Tu es sur la bonne voie',
      color: 'blue'
    }
  }

  // Début de progression (1-49%)
  if (percentage.value > 0) {
    return {
      icon: 'i-lucide-trending-up',
      text: 'Tu avances bien ! Continue à essayer',
      color: 'purple'
    }
  }

  // Plusieurs tentatives sans succès
  if (props.attempts >= 5) {
    return {
      icon: 'i-lucide-help-circle',
      text: 'Besoin d\'aide ? Consultez les indices en bas',
      color: 'yellow'
    }
  }

  // Quelques tentatives (2-4)
  if (props.attempts >= 2) {
    return {
      icon: 'i-lucide-sparkles',
      text: 'Chaque tentative vous rapproche du succès',
      color: 'indigo'
    }
  }

  // Première vraie tentative
  return {
    icon: 'i-lucide-graduation-cap',
    text: 'C\'est en pratiquant qu\'on apprend ! Continuez',
    color: 'blue'
  }
})

const colorClasses = computed(() => {
  const colors = {
    green: 'bg-green-50 dark:bg-green-950 border-green-500 text-green-700 dark:text-green-300',
    blue: 'bg-blue-50 dark:bg-blue-950 border-blue-500 text-blue-700 dark:text-blue-300',
    orange: 'bg-orange-50 dark:bg-orange-950 border-orange-500 text-orange-700 dark:text-orange-300',
    purple: 'bg-purple-50 dark:bg-purple-950 border-purple-500 text-purple-700 dark:text-purple-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-950 border-yellow-500 text-yellow-700 dark:text-yellow-300',
    indigo: 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-700 dark:text-indigo-300'
  }
  return colors[motivationMessage.value.color as keyof typeof colors] || colors.blue
})
</script>

<template>
  <div
    :class="['flex items-center gap-3 p-4 rounded-lg border-l-4 transition-all duration-300', colorClasses]"
  >
    <UIcon
      :name="motivationMessage.icon"
      class="w-6 h-6 flex-shrink-0"
    />
    <p class="font-medium text-sm">
      {{ motivationMessage.text }}
    </p>
  </div>
</template>
