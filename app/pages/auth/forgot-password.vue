<script setup lang="ts">
/**
 * Page de mot de passe oublié
 *
 * Permet de demander un lien de réinitialisation par email.
 */

definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

useSeoMeta({
  title: 'Mot de passe oublié - Nuxy'
})

const toast = useToast()
const { resetPassword, isLoading } = useAuth()

// Formulaire
const email = ref('')
const emailSent = ref(false)

// Validation
const isEmailValid = computed(() => email.value.includes('@'))

// Soumission
const handleSubmit = async () => {
  if (!isEmailValid.value) return

  const result = await resetPassword(email.value)

  if (result.success) {
    emailSent.value = true
    toast.add({
      title: 'Email envoyé',
      description: 'Vérifiez votre boîte de réception.',
      color: 'green',
      timeout: 5000
    })
  } else {
    toast.add({
      title: 'Erreur',
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
          Oups, t'as oublié ?
        </h1>
        <p class="mt-2 text-gray-400">
          Pas de panique, on t'envoie un lien de réinitialisation
        </p>
      </div>

      <!-- Confirmation d'envoi -->
      <div v-if="emailSent" class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div class="text-center py-4">
          <div class="w-20 h-20 mx-auto mb-4">
            <img src="/images/nuxy-logo.svg" alt="Nuxy" class="w-full h-full" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            C'est parti !
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Si un compte existe avec l'adresse <strong>{{ email }}</strong>,
            tu recevras un lien de réinitialisation.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Pense à vérifier ton dossier spam.
          </p>
          <UButton to="/auth/login" variant="outline" class="rounded-xl">
            Retour à la connexion
          </UButton>
        </div>
      </div>

      <!-- Formulaire -->
      <div v-else class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <form @submit.prevent="handleSubmit" class="space-y-5">
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
                v-model="email"
                type="email"
                placeholder="votre@email.com"
                :disabled="isLoading"
                autocomplete="email"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nuxy-green focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <!-- Bouton envoyer -->
          <button
            type="submit"
            :disabled="!isEmailValid || isLoading"
            class="w-full btn-cta py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <UIcon name="i-lucide-loader-2" class="w-5 h-5 animate-spin" />
              Envoi en cours...
            </span>
            <span v-else>Envoyer le lien</span>
          </button>
        </form>

        <!-- Retour connexion -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-center text-gray-600 dark:text-gray-400">
            Tu te souviens ?
            <NuxtLink
              to="/auth/login"
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
