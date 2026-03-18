<script setup lang="ts">
/**
 * Page de réinitialisation du mot de passe
 *
 * Permet de définir un nouveau mot de passe après avoir cliqué
 * sur le lien de réinitialisation reçu par email.
 */

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Nouveau mot de passe - Nuxy'
})

const router = useRouter()
const toast = useToast()
const { updatePassword, isLoading } = useAuth()

// Formulaire
const form = reactive({
  password: '',
  confirmPassword: ''
})

// État
const passwordUpdated = ref(false)

// Validation
const passwordsMatch = computed(() => form.password === form.confirmPassword)
const isFormValid = computed(() => {
  return form.password.length >= 6 && passwordsMatch.value
})

// Messages d'erreur
const passwordError = computed(() => {
  if (form.password && form.password.length < 6) {
    return 'Le mot de passe doit contenir au moins 6 caractères'
  }
  return ''
})

const confirmPasswordError = computed(() => {
  if (form.confirmPassword && !passwordsMatch.value) {
    return 'Les mots de passe ne correspondent pas'
  }
  return ''
})

// Soumission
const handleSubmit = async () => {
  if (!isFormValid.value) return

  const result = await updatePassword(form.password)

  if (result.success) {
    passwordUpdated.value = true
    toast.add({
      title: 'C\'est fait !',
      description: 'Ton mot de passe a été mis à jour.',
      color: 'green',
      timeout: 5000
    })
  } else {
    toast.add({
      title: 'Oups',
      description: result.error?.message || 'Une erreur est survenue',
      color: 'red',
      timeout: 5000
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo et titre -->
      <div class="text-center mb-6">
        <NuxtLink to="/" class="inline-block mb-4">
          <NuxyLogo size="xl" />
        </NuxtLink>
        <h1 class="text-3xl sm:text-4xl font-bold text-white">
          Nouveau mot de passe
        </h1>
        <p class="mt-2 text-gray-400">
          Choisis un nouveau mot de passe sécurisé
        </p>
      </div>

      <!-- Confirmation -->
      <div v-if="passwordUpdated" class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div class="text-center py-4">
          <div class="w-16 h-16 mx-auto mb-4 bg-nuxy-green/20 dark:bg-nuxy-green/30 rounded-full flex items-center justify-center">
            <UIcon name="i-lucide-check-circle" class="w-8 h-8 text-nuxy-green" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            C'est fait !
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Ton mot de passe a été changé avec succès.
          </p>
          <UButton to="/" class="btn-cta">
            Retour à l'accueil
          </UButton>
        </div>
      </div>

      <!-- Formulaire -->
      <div v-else class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Nouveau mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nouveau mot de passe
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

          <!-- Confirmation -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirme ton mot de passe
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

          <!-- Bouton -->
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="w-full btn-cta py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <UIcon name="i-lucide-loader-2" class="w-5 h-5 animate-spin" />
              Mise à jour...
            </span>
            <span v-else>Changer mon mot de passe</span>
          </button>
        </form>
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
