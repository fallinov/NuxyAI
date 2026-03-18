<script setup lang="ts">
/**
 * Page d'inscription
 *
 * Design System unifié :
 * - Cards: rounded-2xl, p-6
 * - Buttons: btn-cta, rounded-xl
 * - Inputs: w-full, rounded-xl
 * - Colors: nuxy-green, nuxy-teal
 */

import type { UserRole } from '~/types/database.types'

definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

useSeoMeta({
  title: 'Rejoins-nous - Nuxy'
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const { register, isLoading } = useAuth()

// Formulaire
const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  role: 'student' as UserRole
})

// Options de rôle
const roleOptions = [
  {
    value: 'student' as UserRole,
    label: 'Élève',
    description: 'Je veux apprendre à coder',
    icon: 'i-lucide-graduation-cap'
  },
  {
    value: 'teacher' as UserRole,
    label: 'Prof',
    description: 'Je veux suivre mes élèves',
    icon: 'i-lucide-users'
  }
]

// Validation
const passwordsMatch = computed(() => form.password === form.confirmPassword)
const isFormValid = computed(() => {
  return (
    form.email.includes('@') &&
    form.password.length >= 6 &&
    passwordsMatch.value &&
    form.fullName.trim().length >= 2
  )
})

// Messages d'erreur en temps réel
const passwordError = computed(() => {
  if (form.password && form.password.length < 6) {
    return 'Au moins 6 caractères, tu peux le faire !'
  }
  return ''
})

const confirmPasswordError = computed(() => {
  if (form.confirmPassword && !passwordsMatch.value) {
    return 'Oups, les mots de passe ne matchent pas'
  }
  return ''
})

// Soumission
const handleSubmit = async () => {
  if (!isFormValid.value) return

  const result = await register(
    form.email,
    form.password,
    form.fullName,
    form.role
  )

  if (result.success) {
    if (form.role === 'teacher') {
      toast.add({
        title: 'Top, c\'est envoyé !',
        description: 'On valide ton compte sous 24h. On te tient au courant !',
        color: 'warning',
        timeout: 8000
      })
      await router.push('/auth/pending')
    } else {
      toast.add({
        title: 'Bienvenue dans l\'équipe !',
        description: 'Check tes emails pour confirmer ton compte.',
        color: 'success',
        timeout: 5000
      })
      const redirect = route.query.redirect as string
      await router.push(redirect || '/')
    }
  } else {
    toast.add({
      title: 'Oups, y\'a un souci',
      description: result.error?.message || 'Vérifie tes infos et réessaie',
      color: 'error',
      timeout: 5000
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Titre -->
      <div class="text-center mb-6">
        <h1 class="text-3xl sm:text-4xl font-bold text-white">
          Bienvenue !
        </h1>
        <p class="mt-2 text-gray-400">
          Crée ton compte pour garder ta progression
        </p>
      </div>

      <!-- Card formulaire -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Sélection du rôle -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Je suis
            </label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="option in roleOptions"
                :key="option.value"
                type="button"
                @click="form.role = option.value"
                :class="[
                  'p-4 rounded-xl border-2 transition-all text-left',
                  form.role === option.value
                    ? 'border-nuxy-green bg-nuxy-green/10 dark:bg-nuxy-green/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                ]"
              >
                <UIcon
                  :name="option.icon"
                  :class="[
                    'w-6 h-6 mb-2',
                    form.role === option.value
                      ? 'text-nuxy-green'
                      : 'text-gray-400'
                  ]"
                />
                <div class="font-medium text-gray-900 dark:text-white">
                  {{ option.label }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {{ option.description }}
                </div>
              </button>
            </div>

            <!-- Info enseignant -->
            <div
              v-if="form.role === 'teacher'"
              class="mt-3 p-3 bg-nuxy-gold/10 border border-nuxy-gold/30 rounded-xl"
            >
              <div class="flex gap-2 text-sm text-nuxy-gold-dark dark:text-nuxy-gold">
                <UIcon name="i-lucide-info" class="w-5 h-5 flex-shrink-0" />
                <span>Ton compte sera validé par un admin sous 24h. Patience !</span>
              </div>
            </div>
          </div>

          <!-- Nom complet -->
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom complet
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-user" class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                placeholder="Jean Dupont"
                :disabled="isLoading"
                autocomplete="name"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nuxy-green focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="votre@email.com"
                :disabled="isLoading"
                autocomplete="email"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nuxy-green focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-lock" class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                :disabled="isLoading"
                autocomplete="new-password"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nuxy-green focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <p v-if="passwordError" class="mt-1 text-sm text-red-500">{{ passwordError }}</p>
          </div>

          <!-- Confirmation mot de passe -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirmer le mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-lock" class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                placeholder="••••••••"
                :disabled="isLoading"
                autocomplete="new-password"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nuxy-green focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <p v-if="confirmPasswordError" class="mt-1 text-sm text-red-500">{{ confirmPasswordError }}</p>
          </div>

          <!-- Bouton inscription -->
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="w-full btn-cta py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <UIcon name="i-lucide-loader-2" class="w-5 h-5 animate-spin" />
              On prépare tout...
            </span>
            <span v-else>C'est parti !</span>
          </button>
        </form>

        <!-- Séparateur -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-center text-gray-600 dark:text-gray-400">
            Déjà inscrit ?
            <NuxtLink
              :to="{ path: '/auth/login', query: route.query }"
              class="text-nuxy-green font-semibold hover:text-nuxy-green-dark transition-colors"
            >
              Connecte-toi
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Retour à l'accueil -->
      <p class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          Retour à l'accueil
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
